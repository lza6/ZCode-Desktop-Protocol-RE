# ZCode (GLM Coding Plan) 自建号池渠道 — 调研规划 v1

> 2026-xx · 基于 17 个 GitHub 仓库静态分析（13 个已深读，4 个未覆盖见 §7）
> 仓库本地副本：`D:/apk-analysis/zcode-survey/`

---

## 0. 一页结论

1. **上游协议已被社区 100% 还原**，且多仓库交叉印证一致，无协议悬念。
2. **所有仓库都没有"批量注册/接码"代码** — 入池路径全是 OAuth device-flow 登录已有账号或粘贴 JWT。注册环节（chat.z.ai，国内手机号+短信码）是**唯一需要自研的环节**，也是最大的未知面（登录风控零情报）。
3. **new-api 对接无阻碍**：多个仓库直接暴露 OpenAI `/v1/chat/completions`，建一个 OpenAI 类型 channel 填 base_url 即可；更优路线是把号池引擎自建/改造后作为独立 sidecar 挂给 new-api。
4. **推荐底座组合**：号池引擎骨架取 `3366434156/zcode-hub`（运营级，注意 AGPL-3.0）或 `yellowpeachxgp/zcode-relay`；风控状态机/保号逻辑抄 `dengyie/zcode2api` + `angusdevgo/ZCode2api`；协议情报以 `hj01857655/Zcode2api` docs/ 六件套 + `vibe-coding-labs/zcodeReverseEngineering` 为准。

---

## 1. 上游协议底座（多仓交叉实证）

### 1.1 核心通道（扣订阅额度的正确通道）

```
POST https://zcode.z.ai/api/v1/zcode-plan/anthropic/v1/messages
Authorization: Bearer <zcodejwttoken>
```

⚠️ 大坑：`api.z.ai/api/anthropic` 是 **API Key 按量计费通道**（x-api-key），**不扣 Coding Plan 免费额度**。旧中转站拿 JWT 当 x-api-key 打这个端点是错的。

- 计费：`GET /api/v1/zcode-plan/billing/current`（plans/total/used/available_units）、`billing/balance`
- 免费额度表（无需认证）：`GET /api/v1/client/configs` — Start Plan：GLM-5.3 每日 3M token + GLM-5-Turbo/Flash 每日 2M
- 活动套餐：`billing/preview` + `billing/claim`（需阿里云无痕验证码 `X-Aliyun-Captcha-Verify-Param`；周五 18:00 起抢周末额度；300M 窗口按北京时区）

### 1.2 鉴权链（OAuth，可脚本化、无 PKCE、无 client_secret）

```
chat.z.ai/api/oauth/authorize  (client_id=client_P8X5CMWmlaRO9gyO-KSqtg)
  → zcode.z.ai/api/v1/oauth/token      换 access_token（仅 1h 寿命）
  → api.z.ai/api/auth/z/login           换长效 zcode JWT  ← 业务凭据
  → api.z.ai/api/biz/v1/organization/.../api_keys   可兑换 API Key 作回退通道
```

CLI device-flow 变体：`/api/v1/oauth/cli/init` → 浏览器授权 → `GET poll/{flow_id}`。

本地凭据解密（用于从 ZCode 桌面客户端白嫖已登录账号）：
AES-256-GCM，密钥 = SHA256(`ZCODE_CREDENTIAL_SECRET` || fallback `zcode-credential-fallback:<platform>:<home>:<username>`)。

### 1.3 风控面（三个独立关口）

| 关口 | 机制 | 解法（社区已验证） |
|---|---|---|
| **system 指纹（3012）** | 只认官方客户端三段 system 前缀（~10703 字符，seg0+seg1 白名单），用户 system 降级插首条 user 消息 | angusdevgo 内嵌 `zcode-profile.json` 官方 system 原文；hj 仓有备选 8599c 前缀逃生通道。**头/UA/TLS/IP 均不校验** |
| **版本形状（405/3012 团灭）** | CLI 形态钉 3.16.3 → 200；跟 3.17.1 新形状 → 整池 405/3012 | 3366434156 仓实测教训：伪装形状**永远钉旧版**，监控 3012 自动熔断 |
| **阿里云无痕验证码（F001/3007）** | billing/claim、部分数据中心 IP 场景要求 `X-Aliyun-Captcha-Verify-Param` | ① 3366434156 的 captcha_node（happy-dom+字节码 VM+鼠标仿真，免浏览器，全批最硬）；② yourhoneypomelo 的 Playwright+真机 Chrome；③ gakiyukr 的 rod 浏览器池。**数据中心 IP 必现 F001，需住宅代理** |

### 1.4 高级签名（TriDefender / zcode-relay 独有）

**Client Signing V4**（703 行，live-verified 2026-10-12）：
HMAC 握手 `POST /api/paas/c1f3a7e2/v2/client` → HKDF-SHA256 派生 → 服务器下发 AES-GCM 加密 Ed25519 私钥 → 每请求签名 `{apiKeyId}\n{ts}\n{ver}\n{sessionId}\n{nonce}` + 8-bit PoW，头 `X-Client-Ts/Sig/Nonce/Pow/App-Id`；401 VERIFY 重握手，二次失败永久 bypass（fail-open）。
→ 说明上游正在加签名层，**自研方案需预留 Signing V4 模块**。

### 1.5 其他还原细节

- 服务端动态端点重映射：`GET /api/v1/agent/configs` 下发 mapping → `/api/v1/ultra[-zai]/...`，TTL 300s fail-open
- `metadata.user_id` = `{device_id, account_uuid, session_id}` JSON 字符串
- 每账号独立派生恒定 device_id/session_id（sha256(jwt) 派生 device_mid 防 3001）— 多号共享设备痕迹是池子最大破绽
- 首启仿真：`client/configs` + `app_launch`/`app_daily_active` 事件上报
- GLM thinking 块带 `signature`，工具循环必须回放签名块（opq007 独有踩坑）
- prompt 改写需三层 parts 分别替换后 join，保缓存前缀字节一致

---

## 2. 17 仓库对比矩阵

| 仓库 | 栈 | 形态 | 号池 | 验证码 | 签名V4 | 评级 |
|---|---|---|---|---|---|---|
| dengyie/zcode2api | Python FastAPI | 网关 | ★★★ 状态机+保号最全 | Node 无痕 | ✗ | **高** |
| gakiyukr/zcode2api-plus | Go | 网关 | ★★★ 代理绑定+访客捐号 | 浏览器池(最稳) | ✗ | **高** |
| hj01857655/Zcode2api | Go 零依赖 | 网关 | ★★ | Node PoW | ✗ | 中（**docs/ 情报最值钱**） |
| D3-vin/Zcode2Api | Go+SQLite | 网关 | ★★ 预热+代理轮换 | 多求解器 | ✗ | 中 |
| angusdevgo/ZCode2api | Node 单文件零依赖 | 网关 | ★★★ 加权+粘性+熔断 | ✗ | ✗ | **高** |
| yourhoneypomelo-cell/zcode2api | Python FastAPI | 网关 | ★★ round-robin | 阿里云✅ | ✗ | **高** |
| opq007/glm-zcode-2api | Go | 单用户网关 | ✗ | ✗ | ✗ | 低（thinking回放+mimic可摘） |
| vibe-coding-labs/zcodeReverseEngineering | VitePress 文档 | 情报库 | — | — | — | **高（情报母本）** |
| Ebonyhtx/zcode-hub | Rust Tauri | 桌面切换器 | 存档切换 | ✗ | ✗ | 中（token 交换链参考） |
| 3366434156/zcode-hub | Python FastAPI | 网关 | ✅ 运营级 | ✅ 免浏览器 | ✗ | **高**（⚠️AGPL-3.0） |
| moreoronce/hermes-zcode-glm-patch | git patch | 补丁 | ✗ | ✗ | ✗ | 中（9 项指纹表可整表迁移） |
| TriDefender/zcode-api | TS 23k行 | 本地代理 | 单凭证 | ✅ token池 | ✅ | **高** |
| yellowpeachxgp/zcode-relay | Bun 23k行 | 网关 | ✅ round-robin | ✅ | ✅ | **高** |
| aimod-cc/Agent2API | — | 未分析 | — | — | — | 待补 |
| YahooYuan666/BargainProxy | — | 未分析 | — | — | — | 待补 |
| MisterBread1/bridge-x-agent-gateway | — | 未分析 | — | — | — | 待补 |
| genevatrkassulkusc82-collab/zcode-proxy | — | 未分析 | — | — | — | 待补 |

---

## 3. 账号获取 — 关键现实与接码方案

### 3.1 既有仓库的事实

**全部 13 个仓库零注册自动化、零接码集成。** 入池路径：
1. OAuth CLI device-flow（需已有账号）
2. 手动粘贴 JWT / tokens.txt 批量导入
3. 从桌面客户端凭据库解密提取
4. 访客捐号（gakiyukr `/guest`，邀请码+IP 日配额）

### 3.2 注册链路（需自研，情报空白区）

- 注册入口在 **chat.z.ai 主站**，**需国内手机号 + 短信验证码**（vibe-coding-labs 逆向报告实证；海外手机号能否注册：待验证）
- 注册页大概率有图形/Turnstile 类验证（待探明）
- 新号注册礼包：4 天 × (3M+5M) token 窗口（待验证）
- 登录/注册环节的风控（IP、设备指纹、频控）：**零情报**，这批仓库完全没碰

### 3.3 接码方案要点（规划）

- 国内手机号接码平台（长租/批量卡）→ 注册链路自动化是独立工程，需先人工跑通一次注册流程抓包（端点、参数、验证码类型、频控）再谈批量
- 量化参考：单号 Start Plan 每日 ~3M+2M+2M token，扩容核心 = 池规模 × 活动套餐领取（claim 自动化四仓已实现）× 周末活动额度

---

## 4. new-api 渠道设计

### 4.1 架构（推荐）

```
new-api ──OpenAI channel──▶ ZCode 号池网关(自建 sidecar) ──▶ zcode.z.ai
                              ├─ 号池存储 + 调度 + 状态机
                              ├─ 验证码求解器
                              ├─ 注册/接码模块（自研）
                              └─ 住宅代理出口池
```

- 快速路线：直接部署 `3366434156/zcode-hub` 或 `yellowpeachxgp/zcode-relay` 当 sidecar，new-api 建标准 OpenAI channel 填其 base_url + key，模型映射 `GLM-5.3 / GLM-5.3-Flash / GLM-5-Turbo`
- 自研路线：拿 `dengyie`（状态机/保号）+ `angusdevgo`（调度/指纹派生）+ `yourhoneypomelo`（验证码/多端点回退）+ `TriDefender`（Signing V4）拼装，许可干净（MIT 系为主，避开 AGPL 的 3366434156）

### 4.2 new-api 侧配置要点

- Channel type: OpenAI（或 Anthropic 直连 `/v1/messages` 可省翻译层）
- 模型名映射：小写别名 → 官方大小写敏感名（3366434156 有现成映射表）
- 失败重试交给号池网关做（new-api 层不必重复）

### 4.3 号池运营核心机制（抄最佳实现）

| 机制 | 来源 |
|---|---|
| 账号状态机 ACTIVE/EXHAUSTED/COOLING/DISABLED/INVALID | dengyie |
| 3012 真风控识别 → 熔断 DISABLED 保号（不是冷却） | dengyie |
| 差异化冷却：429 按 Retry-After / 5xx 300s / 3012 10min / 连败指数熔断封顶 6h | angusdevgo |
| 加权随机调度（余额×10 + 闲置补偿 + 成功率×3）+ 30min 粘性会话保 prompt cache | angusdevgo |
| 每账号独立派生恒定 device_id/session_id | angusdevgo |
| 形状钉旧版 3.16.3 + 版本跟进开关 | 3366434156 |
| claim 1005 名额恢复退避、周五 18:00 抢周末额度 | dengyie / angusdevgo |
| 额度轮询错峰防 WAF、fail-open 双刃剑监控 | gakiyukr / zcode-relay |
| 入池预热：event/report×2 → preview → 逐套餐 claim | D3-vin warm.go |

---

## 5. 风险清单

| # | 风险 | 等级 | 缓解 |
|---|---|---|---|
| R1 | 注册/登录环节风控零情报，批量注册可能第一步就被卡 | **高** | 先人工+半自动跑通单号注册抓包，验证频控面 |
| R2 | claim/验证码在数据中心 IP 下必现 F001 | 高 | 住宅代理池（账号级代理绑定，gakiyukr 已实现） |
| R3 | 3012/405 随官方客户端升级漂移 → 整池团灭 | 高 | 钉旧版形状 + 3012 监控熔断 + 自动告警 |
| R4 | claim 必须**直连中国出口**（US 出口报 unusual activity） | 中 | claim 与 messages 分离出口路由 |
| R5 | Signing V4 未来强制化 → 无签名实现集体 401 | 中 | 提前集成 TriDefender V4 模块（fail-open 设计可平滑） |
| R6 | AGPL-3.0 传染（3366434156/zcode-hub、liu5269 血缘） | 中 | 自研路线避开；仅参考思路不抄代码 |
| R7 | 设备指纹关联风控（多号同 device 派生痕迹） | 中 | 每账号独立恒定派生 + 独立代理 |
| R8 | ToS 违规：批量注册+风控对抗违反智谱服务条款，号池随时可能被批量封禁 | 固有 | 接受清零风险；不与主渠道混用 |

---

## 6. 下一步（按序）

1. **补盲**：分析剩余 4 仓（aimod-cc/Agent2API、BargainProxy、bridge-x-agent-gateway、zcode-proxy）
2. **注册链路抓包**：人工跑通 chat.z.ai 注册一次（接码平台取号），摸清端点/验证码类型/频控 — 这是全项目最大未知面
3. **单号 PoC**：拿 1 个真实账号验证 dengyie 或 3366434156 网关端到端出 token
4. **拍板路线**：直接部署现成网关 vs 自研号池引擎（建议先前者跑通，再决定是否自研）
5. new-api 建 channel + 模型映射 + 压测

---

## 7. 未覆盖项（诚实声明）

- 批次4 代理拒绝执行，以下 4 仓未分析：`aimod-cc/Agent2API`（996 文件，可能含多 provider 通用架构）、`YahooYuan666/BargainProxy`、`MisterBread1/bridge-x-agent-gateway`、`genevatrkassulkusc82-collab/zcode-proxy`（40 文件小仓）
- 本文档全部结论来自静态分析，无实网验证 — 所有"已验证"均指仓库作者实测记录的转述
- 海外手机号可否注册：待验证
- 新号礼包窗口、注册页验证码类型：待验证
