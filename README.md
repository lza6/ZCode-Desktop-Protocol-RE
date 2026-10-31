# ZCode-Desktop-Protocol-RE

ZCode Desktop 3.16.3 (win-x64, Electron) 全量逆向产物 + GLM Coding Plan 协议还原 + 17 个 zcode2api 社区仓库调研。

> ⚠️ 仅用于安全研究与协议学习。反编译产物版权归 ZAI 所有，侵权请联系删除。

## 目录

| 路径 | 内容 |
|---|---|
| [`docs/PROTOCOL-REPORT.md`](docs/PROTOCOL-REPORT.md) | **核心报告**：端点清单 / OAuth 全链路 / 请求头指纹 / Signing V4 (Ed25519+PoW) / Aliyun Captcha SDK 完整链路 / billing claim / 事件上报 |
| `docs/extracted/` | app.asar 全量解包（out/main、host、renderer、scheduler、preload），minify 未混淆 |
| `docs/extracted-node/glm/` | CLI 运行时（zcode.cjs 24MB 单文件 + 16 个插件包） |
| `docs/pretty/` | prettier 美化后的 5 个核心协议文件（host.index.js 103k 行等） |
| `docs/protocol-map.json` | 关键协议字符串 → 源文件偏移映射表 |
| `docs/survey/` | 17 个 zcode2api 相关 GitHub 仓库快照（去 .git）+ 调研规划文档 |

## 关键结论速览

1. **上游通道**：`POST https://zcode.z.ai/api/v1/zcode-plan/anthropic/v1/messages`，Bearer `zcodejwttoken`（⚠️ `api.z.ai/api/anthropic` 是按量计费通道，不扣 Plan 额度）
2. **OAuth 可全自动脚本化**：`cli/init` 的 pollToken 就是本地 `randomBytes(32).hex`，无 PKCE、无 client_secret；zai token 无 refresh 接口
3. **Signing V4 fail-open**：`/api/paas/c1f3a7e2/v2/client` 握手 → HKDF → AES-GCM 下发 Ed25519 私钥 → 8-bit PoW；两次验证失败客户端自动永久 unsigned —— 可先直发明文请求
4. **device_mid = 随机 UUID v4**，非机器指纹；凭据 `~/.zcode/v2/credentials.json` 用 `sha256(fallback secret)` 做 AES-256-GCM 密钥，可离线全解
5. **Aliyun Captcha**：sceneId/region/prefix 由免鉴权的 `/api/v1/client/configs` 动态下发；仅 start-plan 免费档需要；traceless 无感优先；certifyId 一次性（F008 防重放）
6. **桌面端无注册流**（静态确认零 sms/phone/register 命中），注册只在 web (chat.z.ai)

## 反编译流水线

```
NSIS exe --7z--> app-64.7z --7z--> Electron app/ --@electron/asar--> app.asar 解包
--> prettier 美化核心 chunk --> 协议字符串定位（protocol-map.json）--> 源码级还原
```

参照开源仓：zai-org/ZCode v3.14.0（签名 V4 / captcha / claim 均为 3.16.x 闭源新增）。
