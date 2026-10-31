# ZCode 桌面客户端 3.16.3 协议还原报告

> 证据来源：`D:/apk-analysis/zcode-desktop-3163/pretty/` 反编译产物，开源参照 `D:/参考项目/zai-org__ZCode` v3.14.0。
> 反编译流水线：NSIS 安装包 → app-64.7z → app.asar 全解包 → prettier 美化。标注 `待验证` 的为静态未确认项。

---

## 一、域名与端点总清单

### 域名（host.chunk-plan.js:24447-24454）
| 域名 | 角色 |
|---|---|
| `https://zcode.z.ai` | 主控（OAuth/plan/billing/configs/遥测），备用 `zcode.chatglm.site` |
| `https://api.z.ai` | 业务上游（z/login、/api/biz/*、/api/pay/*），备用 `api.chatglm.site` |
| `https://chat.z.ai` | OAuth authorize（浏览器跳转） |
| `https://api.z.ai/api/paas/v4`、`open.bigmodel.cn/api/anthropic` | LLM 兼容端点（bigmodel 家族） |
| `https://dev.bigmodel.cn` | bigmodel 测试 |

### 端点表
| 端点 | 方法 | 鉴权 | 说明 |
|---|---|---|---|
| `/api/v1/oauth/cli/init` | POST | Bearer **pollToken**（本地 randomBytes(32).hex） | body `{"provider":"zai"\|"bigmodel"}` → `{flow_id, authorize_url, expires_at, poll_interval_sec}`（host.index.js:56119, zcode.cli.js:208033-208068） |
| `/api/v1/oauth/cli/poll/{flow_id}` | GET | Bearer pollToken | `{status: pending\|failed\|ready}`；ready 带 `token(zcodejwttoken)/user/zai{access_token}/bigmodel{access_token,refresh_token}`（zcode.cli.js:208054-208145） |
| `/api/v1/oauth/token` | POST | 无 | 深链回调 code 交换：`{provider, code, redirect_uri:"zcode://oauth/callback", state}` → `data.token + data.zai.access_token`（host.index.js:55312-55345） |
| `chat.z.ai/api/oauth/authorize` | GET(浏览器) | — | `redirect_uri=zcode://oauth/callback&response_type=code&client_id=client_P8X5CMWmlaRO9gyO-KSqtg&state=<hex64>`，无 PKCE（host.index.js:55282-55289） |
| `api.z.ai/api/auth/z/login` | POST | 无 | body `{"token":"<oauth access_token>"}` → 业务 token + expires_in，缓存至过期前 300s（host.index.js:55084-55115） |
| `/api/biz/customer/getCustomerInfo` | GET | Bearer 业务token | 用户信息（host.index.js:54741） |
| `/api/v1/zcode-plan/*` | — | Bearer **zcodejwttoken** | OpenAI(`…/zcode-plan`)、Anthropic(`…/zcode-plan/anthropic`)、billing（见 §七） |
| `/api/v1/zcode-plan/billing/current` | GET | zcodejwttoken | 当前套餐（renderer 层，`待验证`） |
| `/api/v1/client/configs` | GET | — | `?app_version&platform`；下发 forceUpdate、`captcha:{enabled,skip_model_request}` 等配置，1h 缓存（main.chunk-auth.js:34452） |
| `/api/v1/agent/configs` | GET | `x-api-key-id`（apiKey JWT claim） | **端点路由映射表**：重写请求 URL 到其它 host，特殊路径 `/api/v1/ultra`,`/api/v1/ultra-zai` 追加 `X-ZCode-Authorization`；TTL 300s（zcode.cli.js:196118-196324） |
| `/api/paas/c1f3a7e2/v2/client` | POST | Bearer apiKey JWT | 签名握手（见 §四） |
| `/api/v1/event/report` | POST | 可选 | 遥测（见 §五） |
| `/api/v1/coding-plan/reset` | — | — | 套餐重置（host.index.js:63495） |
| `/api/v1/off-peak/ticket/availability\|ticket\|ticket/status` | — | — | 闲时推理票务；上游 `/api/v1/off-peak/anthropic/v1/messages`（host.index.js:78080-78102） |
| `/api/v1/remote/device`（register/delete）、`/api/v1/remote/token`、`/remote/ws2` | POST | — | 远程设备通道（main.chunk-auth.js:35084） |
| `/api/v1/marketing/touch(/action)`、`/api/v1/client/scenes` | POST/— | — | 归因与场景（host.index.js:7687,64943） |
| `/api/v1/mcp/usage` | — | — | MCP 用量（host.index.js:63268） |
| `/api/biz/subscription/list` | — | 业务token | 订阅列表（host.index.js:58424） |

**拦截前缀**：`/api/biz/`、`/api/pay/` 走业务 token 校验（host.index.js:54697）。

---

## 二、OAuth 全链路

### 流程 A：CLI 轮询（设备码变体，非标准 device_code）
```
pollToken = randomBytes(32).hex（纯本地，无服务端预注册）
POST https://zcode.z.ai/api/v1/oauth/cli/init
  H: Authorization: Bearer <pollToken>
  B: {"provider":"zai"}                    ← 无 client_id/scopes！
  → {flow_id, authorize_url(https), expires_at(unix秒), poll_interval_sec(≥1)}
浏览器打开 authorize_url（zai 追加 redirect_uri=zcode://oauth/callback；state 由服务端生成嵌在 URL 里）
循环 GET /oauth/cli/poll/<flow_id>（间隔=poll_interval_sec*1000，下限1s，总超时300s）
  pending → 继续；408/429/5xx 静默重试；其余 4xx 失败
  ready → {token, user{user_id,name,email,avatar}, zai:{access_token}, ...}
```
（zcode.cli.js:740378-740606, 208033-208145；host.index.js:56118-56300）

### 流程 B：深链回调（桌面壳）
- `state = randomBytes(32).hex`，**本地随机、无签名**
- code 交换 `POST /api/v1/oauth/token`：`{provider:"zai", code, redirect_uri:"zcode://oauth/callback", state}` → `{code:0, data:{token, zai:{access_token}, user?, expires_in?}}`（host.index.js:55312-55345）
- **无 PKCE**（全文件 grep 零命中）

### client_id
- zai：`client_P8X5CMWmlaRO9gyO-KSqtg`；bigmodel：`client_RzngVdSk8sYsG2_3HzOMdQ`（zcode.cli.js:30688-30689）

### 刷新
- **zai 无 refresh 接口**：`refreshToken()` 直接报"暂未提供 refresh token 交换接口，请重新登录"（host.index.js:56416-56418）。续命靠 z/login 换新 business token。
- bigmodel poll 存了 refresh_token 但代码未见实际刷新调用，`待验证`。

### zcodejwttoken
- ZCode 后端会话 JWT = poll/token 响应的 `data.token`，持久落盘，`Bearer` 调 `/api/v1/zcode-plan/*`；401 即要求重登（host.index.js:89869）。

### 凭据存储（已验证，弱加密）
- 路径：`~/.zcode/v2/credentials.json`（`ZCODE_DATA_BASE_DIR` 可重定向），扁平 `{ "<key>": "<enc:v1:...>" }`
- 密钥：`ZCODE_CREDENTIAL_SECRET` 环境变量，缺省 fallback `zcode-credential-fallback:{platform}:{homedir}:{username}`
- 派生：**直接 `sha256(secret)` → 32 字节**，无 salt 无 KDF（zcode.cli.js:208242-208253）
- 加密：`aes-256-gcm`，IV 12B 随机，格式 `enc:v1:<iv b64url>.<tag b64url>.<ct b64url>`（host.index.js:18994-19034）
- 键：`oauth:active_provider, oauth:zai:access_token, oauth:zai:refresh_token, oauth:zai:user_info, oauth:bigmodel:*, zcodejwttoken`（zcode.cli.js:208607-208616）

> **可利用点**：拿到 credentials.json 即可离线全解（默认无 ZCODE_CREDENTIAL_SECRET 时 fallback 可推）；知晓 flow_id+pollToken 可接管轮询。

---

## 三、请求头指纹全套

| 头 | 生成逻辑 |
|---|---|
| `User-Agent` | `ZCode/<appVersion>`，版本常量 `3.16.3`（main.chunk-auth.js:34083, 34020-34033） |
| `X-Title` | `Z Code@cli`（CLI）/ `Z Code@electron`（桌面壳写死）（zcode.cli.js:740628, 771143） |
| `HTTP-Referer` | 端点 origin，默认 zcode.z.ai |
| `X-Device-Mid` | **纯随机 UUID v4**（非机器指纹），持久化 `~/.zcode/v2/telemetry-state.json`，全机器共用一个（zcode.cli.js:47305-47315, 188954-188988） |
| `X-ZCode-App-Version` | `3.16.3` |
| `X-Platform` | `win32-x64` 等 `<platform>-<arch>` |
| `X-Release-Channel` / `X-Client-Language` / `X-Client-Timezone` / `X-Os-Category`(windows) / `X-Os-Version`(`os.release()`) | 常规注入 |
| `x-request-id` | `crypto.randomUUID()`，重试换新（zcode.cli.js:189239, 189272） |
| `x-zcode-trace-id` | randomUUID（62439） |
| `x-zcode-session-type` | 会话类型枚举 |
| `x-session-id` | `sess_<uuid>` 剥前缀后发；子代理 `subagent_agent_`、query `query_`（189162-189196） |
| 签名组 | `X-Client-Ts/Version/Sig/Nonce/App-Id:zcode/Client-Pow`（见 §四） |

- 所有值过 `normalizeZCodeSourceHeaderValue`：trim + `/^[\x20-\x7e]+$/`
- **anthropic metadata**（请求体内）：`device_id: deviceMid, account_uuid: "", session_id: <sess_...剥前缀>`（zcode.cli.js:189509-189515）
- 打 `/api/v1/agent/configs` 时额外带 `x-api-key-id`（JWT `api_key` claim）
- 签名重签前清 `x-client-sig/x-client-pow/x-aliyun-captcha-verify-param`（51571）

---

## 四、签名层 `/api/paas/c1f3a7e2/v2/client`（V4）

**仅 CLI 业务 fetch 包装；fail-open**——origin 不匹配或两次验证失败后 `bypassSigning=true` 永久明文发（zcode.cli.js:175567-175600）。**这就是最省事的 2API 路线：先试 unsigned 请求。**

1. **凭证**：apiKey 是 JWT，`{alg:HS256, typ:JWT, sign_type:"SIGN"}` + payload `{token_use:"project_access", api_key}` → `apiKeyId = payload.api_key`，`secret = 原 JWT`（51376, 51538）
2. **HKDF**：salt=`"WD_CLIENT_SIGN_KDF_SALT"`，label `ed25519_priv` / `getSignKey_hmac`，SHA-256 256bit（175351-175357）
3. **握手** POST（HTTPS 必须，10s 超时）：
   - `sig = base64(HMAC-SHA256(HKDF(secret,"getSignKey_hmac"), "get_sign_key\n<apiKeyId>\n<ts>\n<nonce>"))`
   - body `{accessToken, nonce, sig, ts}` → `code===200` → `data.privateCipher`
   - 私钥解密：AES-GCM key=HKDF(secret,"ed25519_priv")，iv=cipher 前 12B，AAD=apiKeyId，明文 PKCS8 **Ed25519** 私钥（175245-175272, 175750-175858）
4. **每请求**（需 X-Session-Id）：
   - **PoW**：appId="zcode"，8 bit；`seed=sha256("<apiKeyId>\nzcode\n<sessionId>\n<ts>")` 前 12 字节 hex，遍历 candidate 使 `sha256("<seed>\n<candidate>")` 前 8 bit 全 0 → `X-Client-Pow`（175281-175308）
   - **Ed25519 签名串**：`apiKeyId\nts\nclientVersion\nsessionId\nnonce` → `X-Client-Sig`（base64）
   - 头组：`X-Client-Ts, X-Client-Version, X-Client-Sig, X-Session-Id, X-Client-Nonce, X-App-Id:zcode, X-Client-Pow`（175681-175687）
5. **重试**：`VERIFY_SIGNATURE_INVALID/VERIFY_APIKEY_EXPIRED/3007` → 重握手重签一次；再失败永久 unsigned

---

## 五、事件上报（main.chunk-events.js）

- 端点：`POST https://zcode.z.ai/api/v1/event/report`，超时 5s，重试 2 次（408/429/5xx），退避 300ms/429 时 1s（:2541-2760）
- Body（:2774-2793）：
```json
{"event_id":"uuid", "client_timezone","client_language",
 "element_name":"app_launch|app_daily_active|session_create",
 "event_region":"app", "event_type":"view", "event_text":"",
 "event_extra_detail":{...脱敏}, "user_id", "screen_resolution",
 "app_version":"3.16.3", "device_os_category":"windows",
 "device_os_version", "device_mid":"<uuid>", "mac_id":"",
 "marketing_params":"{...}", "talk_id?","message_id?"}
```
- 时机：`app_launch` 每次启动都发；`app_daily_active` 按 clientTimezone 本地日去重（state 文件 `lastDailyActiveDate`），**每天每设备一次**
- 风控关联：带 `X-Device-Mid` + 可选 Authorization，服务端可做 device↔user 关联；客户端无"上报成功才放行"逻辑（静态确认纯遥测）

---

## 六、Aliyun-Captcha 与错误码

- **触发面**：`mode==="start-plan"` 且 client/configs 下发 `captcha:{enabled,skip_model_request}`（host.chunk-plan.js:25836-25841）。widget SDK（SceneId/instanceId）在未提供的 renderer 层，`待验证`
- **信号**：业务码 **3007** 或消息含 "security verification"；空流 + captcha 头也合成 3007/403（zcode.cli.js:193087-193157）
- **回传头**：`X-Aliyun-Captcha-Verify-Param`（+可选 `X-Aliyun-Captcha-Verify-Region`），用于 claim 与模型请求重试（host.chunk-plan.js:25817-25826）
- **重试**：3007 → 仅**一次** `captcha-retry`（弹验证码拿 verifyParam 后重发），用完即止（zcode.cli.js:193097-193125）
- 错误码表（zcode.cli.js:188144-188445）：**3007**=InvalidModelRequest+AuthFailed（触发重签名+captcha）；**3008/3009/3010**=ModelRateLimited，start-plan 流恢复最多 10 轮，延迟 1-2s；**1005/1308/1310/1313/1316/2056/20097/insufficient_quota** 等=quota 停止集；401=账号级 token 刷新重试。**3012/F001 客户端无专属处理**（`待验证`，可能仅服务端语义）

---

## 七、billing/claim 领取流程

- **preview**：`GET /api/v1/zcode-plan/billing/preview?app_version&platform`，Bearer（zcodejwttoken，可缺失也发）→ 可手动领取套餐列表 `{plans:[{plan_id,name,entitlements:[{grant_units,meter,period,capabilities}]}], server_time}`（host.index.js:57551-57605）
- **claim**：`POST /api/v1/zcode-plan/billing/claim`，`Bearer zcodejwttoken` + `{plan_id}` + 验证码头 + `X-ZCode-App-Version/X-Platform`（host.index.js:57606-57671）
  - 成功 `code===0 && data.plan` → `{user_plan_id,status,starts_at,ends_at,entitlements}`，随后 balance 刷新
  - 失败 → `{success:false, code, message, failureEndsAt:data.plan.ends_at}`；客户端不重试、不登出
- **1005/1003**：claim 响应码客户端不翻译、透传 UI；1003/1004/F001 在四个 chunk 中 0 命中，`待验证`。**北京时间窗口逻辑客户端不存在**——完全依赖服务端 code + ends_at 倒计时
- **balance**：`GET /api/v1/zcode-plan/billing/balance?app_version=3.16.3` → `{plans[], balances[{show_name, capabilities:["model:xxx"]}], server_time}`，用 server_time 本地改写过期套餐（host.index.js:57323-57410）

---

## 八、账号/注册

**桌面端未暴露注册流**（静态确认）：`register/sign-up/sms/phone/send-code` 全量 grep 命中均为无关项。注册必须走 web；桌面端登录面只有 OAuth（浏览器跳转 chat.z.ai authorize）。

---

## 九、system prompt 指纹

分节拼装（`systemPromptSections`，zcode.cli.js:678409，遥测打点 `system_prompt`/`systemPromptSectionCount`）：
1. **身份段**：`"You are ZCode, an interactive coding agent"`（:236281）/ 无 output style 时 `"You are an interactive ZCode agent that helps users with software engineering tasks."`，section 名 "Agent Identity"，`cacheHint:"stable"`
2. **Harness 段**：展示/权限模式/hooks 说明
3. **环境段**（每请求注入）：cwd、platform、shell、osVersion、`You are powered by the model named ${providerId}/${modelId}`、gitBranch/gitUser（:236425-236445）
- **版本号不写入 prompt**（仅遥测埋点带）；子代理用 `<env>` 块（:656152）

---

## 十、与开源 v3.14.0 差异

| 体系 | 开源 v3.14.0 | 3.16.3 |
|---|---|---|
| OAuth cli/init+poll | ✅ 一致 | 一致 |
| 签名 V4（paas/c1f3a7e2、X-Client-Sig/Pow） | ❌ 无 | **闭源新增** |
| Aliyun captcha 重试 | ❌ 无 | **闭源新增** |
| zcode-plan billing preview/claim | ❌ 无 | **闭源新增** |
| off-peak 票务、ultra、remote device | ❌ 无 | 闭源新增 |
| provider 模板（bigmodel api.z.ai/api/paas/v4 等） | ✅ 部分 | 继承 |

---

## 十一、2API 复刻要点（汇总）

1. **登录**：pollToken 随机 32B hex → cli/init → 浏览器授权 → poll ready 拿 zcodejwttoken + zai access_token；无刷新接口，过期重登
2. **模型请求**：`POST https://zcode.z.ai/api/v1/zcode-plan[/anthropic]` + Bearer zcodejwttoken + §三全头（UA=`ZCode/3.16.3`, `X-Title: Z Code@electron` 可冒充桌面）+ 请求体内 anthropic metadata
3. **签名可先跳过**：fail-open，unsigned 大概率放行（`待验证`，需实测）；被拒再实现 §四（纯 WebCrypto，无 native 依赖）
4. **验证码**：start-plan 模式遇 3007 需 Aliyun verifyParam（需 renderer 层 SDK 配置，`待验证`）
5. **device_mid 一号一 UUID**：随机生成即可，无需真实机器指纹；但需与 event/report 中 `device_mid` 一致以维持画像一致性
6. **凭据弱加密**：sha256 fallback 密钥，号池本地存储可自定格式，不必复刻

---

## 十二、Aliyun Captcha SDK 完整链路（renderer 层深挖，静态确认）

### 12.1 配置下发：sceneId 是服务端动态配置（关键结论）

**sceneId/region/prefix 没有硬编码值**——完整链路：

```
GET /api/v1/client/configs?app_version=3.16.3&platform=<os>   （无需鉴权）
  → data.configs.captcha = { enabled, skip_model_request, region, prefix, sceneId }
     ├─ host 层提取：readRequestVerificationConfig（host/index.js: getRequestVerificationConfig → NL(configs)）
     └─ renderer 经 RPC codingPlanSubscriptionService.getRequestVerificationConfig() 获取，60s 内存缓存
```

- `FR(config)` 校验：`enabled===false` 或缺 `region/prefix/sceneId` 任一 → 跳过验证码（视作不需要）
- `Vrs(mode, config)`（zcode.cjs:807876）：**仅 `mode==="start-plan"` 且 enabled!==false 且 skip_model_request!==true 时才需要**——即只有 Start Plan（免费档）模型请求要验证码，付费 plan 和 API Key 通道不要
- ⚠️ 所以想拿具体 sceneId：直接 curl 一次 `https://zcode.z.ai/api/v1/client/configs?app_version=3.16.3&platform=win32-x64` 即可（待验证：需实网抓）

### 12.2 SDK 加载与调用（renderer/assets/styles-CQuzX8si.js @2462404-2476200）

- **SDK 脚本**：`https://o.alicdn.com/captcha-frontend/aliyunCaptcha/AliyunCaptcha.js`（阿里官方 captcha2.0），注入 `<head>` 后调 `window.initAliyunCaptcha`
- **init 参数**：`{SceneId: config.sceneId, mode: "popup", language: "cn"|"en"（zh-CN→cn，其它→en）, element: "#<挂载div>", showErrorTip: false, getInstance}`
- **全局注入**：`window.AliyunRequestVerificationConfig = {region, prefix}`（SDK 从 window 读 scene 上下文）
- **实例缓存**：configKey=`region::prefix::sceneId::mode::lang::logoImg`，20 分钟内复用；求解全程全局互斥（同一时刻仅一个验证流程）
- **序列化锁**：provider 级 FIFO 队列（`zcode-plan verification queue`），多请求串行过验证码

### 12.3 求解模式：traceless 优先（无感验证）

- `Vwt(config, {allowInteractive, timeoutMs: 120s})`：默认 `auto` 模式——先尝试**无感通过（traceless_passed）**，风控判定需交互才弹滑块（`interactive_displayed`，触发 `onInteractiveChallenge` 回调）
- 成功产物：`captchaVerifyParam`（字符串，内含 JSON `certifyId`），入 provider 级缓存 Map
- **certifyId 防重放**：与上一轮相同会告警"F008 重复提交"风险（SDK verifyCode F008=重复校验）；发送后缓存即清
- ARMS 埋点：每次求解上报 `{name: "aliyun_captcha_verification", result: traceless_passed|interactive_displayed, source: send_preflight|captcha-retry, provider_id}`

### 12.4 结果判定与错误码（renderer 消费 SDK 回调）

| SDK 返回 | 判定 |
|---|---|
| `success===true && verifyResult===true`，或 verifyCode=`T006` | 终态通过 |
| `verifyResult===false && (无verifyCode 或 F015)` | awaitingUpgrade（等待升级，非终败） |
| verifyCode=`F008` | 重复提交 |
| `X-Aliyun-Captcha-Verify-Param` / `X-Aliyun-Captcha-Verify-Region` | 请求头注入（host r5 函数），claim 与 3007 重试共用 |

### 12.5 对号池网关的落地意义

1. **免浏览器求解可行**：SDK 是标准阿里 captcha2.0 + traceless 无感模式——`region/prefix/sceneId` 三元组从 client/configs 拿到后，可用社区 captcha_node（happy-dom+鼠标仿真）或打码平台直接过，无需真实 Electron
2. **付费 plan / API Key 通道完全免验证码**（skip_model_request 或非 start-plan mode）——号池如果用 OAuth 免费档才需要过这关
3. **verifyParam 有 certifyId 一次性语义**：不能复用，每次模型请求前现解（F008 会拒）
4. 下发开关在服务端手里：`client/configs` 的 `captcha.enabled=false` 可一键全网关闭（也可能一键全开）——网关需每次请求前查配置缓存
