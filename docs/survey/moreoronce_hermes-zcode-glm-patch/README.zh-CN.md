# Hermes Agent → ZCode / GLM-5.2 兼容补丁

解决 Hermes Agent 使用 `zai/glm-5.2`（Z.AI Coding Plan）时出现的误导性 **429 / code 1305 "overloaded"**。当前补丁也补齐了结构化 `transform_llm_output`：refusal-recovery 插件恢复最终回答后，返回文本、持久化 transcript 和额外 LLM 用量保持一致。

[English](./README.md) | 中文

## 为什么这不是普通限流

问题同时包含两道独立兼容门槛：

| 层级 | 触发条件 | 表现 |
|---|---|---|
| System Prompt 过滤 | 发出的 prompt 中出现 `Hermes Agent` | Z.AI 用 429/1305 伪装成过载 |
| 客户端指纹检测 | 请求不像真实 ZCode Desktop | Cloudflare 1010、静默限速或其他不透明 4xx |

换 API Key、缩短请求都修不了这两道门槛。Prompt 和客户端身份必须同时处理。

## 补丁做了什么

### 1. 不破坏缓存的 Prompt 改写

`agent/system_prompt.py` 仅在以下条件成立时将 `Hermes Agent` 改为 `ZCode`：

```text
provider == zai
model 包含 glm-5.2
```

新版 Hermes 把 system prompt 分为 `stable`、`context`、`volatile` 三个缓存层。补丁通过同一个 provider-gated helper 改写三层，并在 session restore 重建 `_cached_system_prompt_static` 时复用。只替换最后的 joined 字符串已经是错误做法，会导致完整 prompt 与静态缓存前缀字节不一致。

改写只发生在内存里，不修改磁盘上的 skills、memories、docs、rules 或历史 session 文件。

### 2. 主客户端和 Auxiliary 全路径 ZCode 指纹

`build_zcode_headers()` 生成 ZCode Desktop 3.1.8 指纹：

| Header | 值 |
|---|---|
| `User-Agent` | `ZCode/3.1.8 ai-sdk/anthropic/3.0.81` |
| `X-ZCode-App-Version` | `3.1.8` |
| `X-ZCode-Agent` | `glm` |
| `x-zcode-trace-id` | 随机 hex |
| `x-request-id` | 随机 hex |
| `x-session-id` | 进程稳定的 `sess_<24hex>` |
| `x-query-id` | 随机 hex |
| `HTTP-Referer` | `https://zcode.z.ai` |
| `X-Title` | `Z Code` |

版本号可用 `ZCODE_APP_VERSION` 覆盖。

只有解析后的 hostname 精确等于 `api.z.ai` 或 `open.bigmodel.cn` 才注入；`api.z.ai.attacker.example` 不会误命中。覆盖范围包括：

- 主客户端首次构造；
- 凭据轮换和主客户端重建；
- provider pool / credential auxiliary；
- custom auxiliary endpoint；
- named/direct provider auxiliary；
- sync → async auxiliary 转换。

Custom endpoint 会在 ZCode 默认头上合并 operator 自定义 headers，不会吞掉显式配置。

> 随机 ID 在 OpenAI client 构造时生成，不是该 client 每发一个 HTTP request 都重新生成。

### 3. 结构化 Final Output Transform

当前上游在持久化之后才调用 `transform_llm_output`，并且只接受字符串。补丁新增 `agent/transform_output.py`，将顺序改为：

```text
准备 transcript
→ verifier / completion explanation
→ transform_llm_output
→ 对齐最终 assistant 行
→ 只持久化一次
→ post_llm_call
```

Hook 可返回旧式字符串，也可返回：

```python
{
    "text": "replacement",
    "provider": "zai",
    "model": "glm-5.2",
    "usage": {
        "input_tokens": 100,
        "output_tokens": 20,
        "total_tokens": 120,
        "cost_usd": 0.0,
    },
}
```

替换文本同时成为用户收到的回答和数据库中的 assistant 行。Token、cost、API call 会折叠进 session 与 SQLite，而且只记一次。即使插件抛异常，transcript sync 仍会执行，防止陈旧 `_db_persisted` 标记让最终写入被跳过。

## 涉及文件

| 文件 | 作用 |
|---|---|
| `agent/agent_init.py` | 主客户端初次构造时注入 ZCode headers |
| `agent/auxiliary_client.py` | 指纹生成、严格 host 匹配、auxiliary 全路径覆盖 |
| `agent/system_prompt.py` | 三层 prompt 改写和 static prefix 重建 |
| `agent/transform_output.py` | 结构化返回解析、用量统计、transcript 对齐 |
| `agent/turn_finalizer.py` | transform-before-persist 顺序 |
| `run_agent.py` | 主客户端重建和凭据轮换 headers |
| `tests/agent/test_auxiliary_user_default_headers.py` | auxiliary 和 operator header 测试 |
| `tests/agent/test_system_prompt.py` | prompt 三层与缓存前缀测试 |
| `tests/agent/test_transform_output_structured.py` | 持久化、异常和用量测试 |
| `tests/run_agent/test_provider_attribution_headers.py` | 主客户端指纹与伪造 host 测试 |

**10 个文件，+698/-31。** 不包含 `config.yaml`、凭据、运行时数据库或 `package-lock.json`。

## 当前兼容快照

补丁已在以下 Hermes Agent 上游提交验证可直接应用：

```text
a991dfc25daf
```

2026-08-04 实测：

```text
针对性回归：222 passed
真实 zai/glm-5.2 请求：ZCODE_E2E_OK
refusal-recovery E2E：原始拒绝被替换为 "1 + 1 = 2"
SQLite api_call_count：2（主调用 1 次 + recovery 1 次）
```

Hermes 上游变化极快，应用前必须先跑 `git apply --check`。

## 安装

### 1. 克隆

```bash
git clone https://github.com/moreoronce/hermes-zcode-glm-patch.git /tmp/zcode-patch
cd ~/.hermes/hermes-agent
```

### 2. 检查并备份

禁止覆盖十个目标文件里已有的本地修改：

```bash
git status --short -- \
  agent/agent_init.py agent/auxiliary_client.py agent/system_prompt.py \
  agent/transform_output.py agent/turn_finalizer.py run_agent.py \
  tests/agent/test_auxiliary_user_default_headers.py \
  tests/agent/test_system_prompt.py \
  tests/agent/test_transform_output_structured.py \
  tests/run_agent/test_provider_attribution_headers.py
```

如果有输出，先 stash 或 commit。然后创建回滚锚点：

```bash
git tag pre-zcode-patch-$(date +%Y%m%d-%H%M%S)
```

### 3. 应用

```bash
git apply --check /tmp/zcode-patch/patches/zcode-glm-patch.diff
git apply /tmp/zcode-patch/patches/zcode-glm-patch.diff
```

Dry-run 失败就停。禁止强行套过期 diff；必须在隔离 worktree 按新上游人工移植并重跑测试。

### 4. 验证

```bash
source venv/bin/activate
python -m pytest \
  tests/agent/test_transform_output_structured.py \
  tests/agent/test_turn_finalizer_final_response_persistence.py \
  tests/agent/test_turn_finalizer_cleanup_guard.py \
  tests/agent/test_auxiliary_user_default_headers.py \
  tests/agent/test_auxiliary_client.py \
  tests/agent/test_auxiliary_client_resolve_dedup.py \
  tests/agent/test_auxiliary_client_base_url_host_validation_52608.py \
  tests/agent/test_system_prompt.py \
  tests/run_agent/test_provider_attribution_headers.py -q
```

本快照预期结果是 `222 passed`。

### 5. 重启并发起真实请求

client-level headers 不会热加载。测试通过后，重启 Hermes CLI、Desktop 或 Gateway，再开一个新的 `zai/glm-5.2` session。

一次性 smoke test：

```bash
hermes chat -Q --provider zai -m glm-5.2 --reasoning none \
  -q 'Reply with exactly: ZCODE_E2E_OK'
```

## 回滚

重启前最直接的反向应用是：

```bash
git apply -R /tmp/zcode-patch/patches/zcode-glm-patch.diff
```

如果安装后仓库又产生了新修改，先保存新工作，再按安装时创建的时间戳 tag 回滚。

## 上游维护规则

- 大更新后重新枚举所有 main / auxiliary OpenAI client 构造路径。
- Hostname 必须严格匹配，禁止对 `api.z.ai` 做字符串包含判断。
- Prompt 三层和 static-prefix reconstruction 必须共用同一个改写 helper。
- 如果上游开始给插件 `call_llm` 传非空 task，重新审计用量统计，否则手工折叠可能变成双记。
- 最终 assistant 行同步必须放在 transform hook 的 `try/except` 外。
- 必须让 Git 直接生成 patch，并在干净 detached worktree 验证；文件非空不等于补丁完整。

## 致谢

- [Hermes Agent](https://github.com/NousResearch/hermes-agent) — Nous Research
- 根因线索：[Deep Router — Hermes Agent 优化：解决 GLM-5.2 模型 429](https://deeprouter.org/article/hermes-agent-optimization-fix-glm-5-2-model-429-1305-overloaded)

## License

MIT
