# Hermes Agent → ZCode / GLM-5.2 Compatibility Patch

Fixes the misleading **429 / code 1305 "overloaded"** failure seen when Hermes Agent uses `zai/glm-5.2` through the Z.AI Coding Plan. The current patch also preserves structured `transform_llm_output` results so a refusal-recovery plugin can replace the final answer, persist the exact delivered text, and account for its extra LLM call once.

[English](./README.md) | [中文](./README.zh-CN.md)

## Why the 429 is not ordinary rate limiting

Two independent compatibility gates are involved:

| Layer | Trigger | Symptom |
|---|---|---|
| System-prompt filter | The phrase `Hermes Agent` appears in the outgoing prompt | Z.AI returns 429/1305 disguised as overload |
| Client fingerprint | Requests do not resemble ZCode Desktop | Cloudflare 1010, silent throttling, or another opaque 4xx |

Changing API keys or shrinking the request does not repair either gate. Both the prompt and client identity must be handled.

## What the patch changes

### 1. Cache-safe prompt rewrite

`agent/system_prompt.py` rewrites `Hermes Agent` to `ZCode` only when:

```text
provider == zai
model contains glm-5.2
```

Hermes now builds the system prompt in `stable`, `context`, and `volatile` cache tiers. The patch rewrites all three tiers through one provider-gated helper and uses the same helper when reconstructing `_cached_system_prompt_static` after session restore. Rewriting only the final joined string is no longer correct because it leaves the cached static prefix byte-inconsistent.

The rewrite is in memory. Skills, memories, docs, rules, and stored source files are not edited.

### 2. ZCode Desktop fingerprint across main and auxiliary clients

`build_zcode_headers()` emits the ZCode Desktop 3.1.8 identity:

| Header | Value |
|---|---|
| `User-Agent` | `ZCode/3.1.8 ai-sdk/anthropic/3.0.81` |
| `X-ZCode-App-Version` | `3.1.8` |
| `X-ZCode-Agent` | `glm` |
| `x-zcode-trace-id` | Random hex |
| `x-request-id` | Random hex |
| `x-session-id` | Process-stable `sess_<24hex>` |
| `x-query-id` | Random hex |
| `HTTP-Referer` | `https://zcode.z.ai` |
| `X-Title` | `Z Code` |

The version can be overridden with `ZCODE_APP_VERSION`.

The fingerprint is injected only when the parsed hostname is exactly `api.z.ai` or `open.bigmodel.cn`. A lookalike such as `api.z.ai.attacker.example` does not match. The patch covers:

- initial main-client construction;
- credential rotation / main-client rebuild;
- provider-pool and credential-backed auxiliary clients;
- custom auxiliary endpoints;
- named/direct provider auxiliary clients;
- synchronous-to-asynchronous auxiliary conversion.

Operator-configured custom headers are merged on custom endpoints and remain able to override or extend the defaults.

> The random IDs are generated when an OpenAI client is constructed, not for every HTTP request made by that client.

### 3. Structured final-output transforms

Current upstream runs `transform_llm_output` after persistence and accepts replacement strings only. This patch adds `agent/transform_output.py` and changes finalization to:

```text
prepare transcript
→ verifier / completion explanation
→ transform_llm_output
→ synchronize the final assistant row
→ persist exactly once
→ post_llm_call
```

A hook may return either a legacy string or:

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

The replacement becomes both the delivered response and the durable assistant row. Token/cost/API-call accounting is folded into the session and SQLite once. Transcript synchronization still runs if the plugin throws, preventing stale `_db_persisted` markers from suppressing the final write.

## Files changed

| File | Purpose |
|---|---|
| `agent/agent_init.py` | ZCode headers on initial main client |
| `agent/auxiliary_client.py` | Header builder, strict host matcher, auxiliary coverage |
| `agent/system_prompt.py` | Cache-tier prompt rewrite and static-prefix reconstruction |
| `agent/transform_output.py` | Structured transform parsing, accounting, transcript sync |
| `agent/turn_finalizer.py` | Transform-before-persist ordering |
| `run_agent.py` | Headers on main-client rebuild / credential rotation |
| `tests/agent/test_auxiliary_user_default_headers.py` | Auxiliary and operator-header coverage |
| `tests/agent/test_system_prompt.py` | Prompt-tier and cache-prefix coverage |
| `tests/agent/test_transform_output_structured.py` | Persistence, exception, and accounting coverage |
| `tests/run_agent/test_provider_attribution_headers.py` | Main-client fingerprint and lookalike-host coverage |

**10 files, +698/-31.** No `config.yaml`, credentials, runtime database, or `package-lock.json` is included.

## Compatibility snapshot

The distributed patch currently applies cleanly to Hermes Agent upstream:

```text
a991dfc25daf
```

Verification performed on 2026-08-04:

```text
Targeted regression suite: 222 passed
Real zai/glm-5.2 request: ZCODE_E2E_OK
Refusal-recovery E2E: original refusal replaced with "1 + 1 = 2"
SQLite api_call_count: 2 (one main call + one recovery call)
```

Hermes upstream changes rapidly. Always run `git apply --check` before applying this snapshot.

## Installation

### 1. Clone

```bash
git clone https://github.com/moreoronce/hermes-zcode-glm-patch.git /tmp/zcode-patch
cd ~/.hermes/hermes-agent
```

### 2. Check and back up

Do not apply over local changes to the ten target files:

```bash
git status --short -- \
  agent/agent_init.py agent/auxiliary_client.py agent/system_prompt.py \
  agent/transform_output.py agent/turn_finalizer.py run_agent.py \
  tests/agent/test_auxiliary_user_default_headers.py \
  tests/agent/test_system_prompt.py \
  tests/agent/test_transform_output_structured.py \
  tests/run_agent/test_provider_attribution_headers.py
```

If the command prints anything, stash or commit those changes first. Then create a rollback anchor:

```bash
git tag pre-zcode-patch-$(date +%Y%m%d-%H%M%S)
```

### 3. Apply

```bash
git apply --check /tmp/zcode-patch/patches/zcode-glm-patch.diff
git apply /tmp/zcode-patch/patches/zcode-glm-patch.diff
```

If the dry run fails, stop. Do not force-apply a stale diff. Port the behavior onto the new upstream in an isolated worktree and rerun the tests.

### 4. Verify

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

For this snapshot, the expected result is `222 passed`.

### 5. Restart and perform a real request

Existing clients do not hot-reload client-level headers. Restart the Hermes CLI, Desktop app, or Gateway only after tests pass, then start a new `zai/glm-5.2` session.

A one-shot CLI smoke test is:

```bash
hermes chat -Q --provider zai -m glm-5.2 --reasoning none \
  -q 'Reply with exactly: ZCODE_E2E_OK'
```

## Rollback

Before a restart, the safest direct reversal is:

```bash
git apply -R /tmp/zcode-patch/patches/zcode-glm-patch.diff
```

If the tree has diverged after installation, reset to the timestamped backup tag you created only after preserving any newer work.

## Upstream maintenance rules

- Re-enumerate every main and auxiliary OpenAI-client construction path after large upstream updates.
- Keep strict hostname matching; never use substring matching for `api.z.ai`.
- Rewrite every prompt cache tier and static-prefix reconstruction through the same helper.
- Re-audit plugin LLM accounting if upstream begins passing a non-empty task to `call_llm`; otherwise manual accounting could become a double count.
- Keep final assistant synchronization outside the transform hook's `try/except`.
- Generate the patch directly with Git and verify it in a clean detached worktree; file size alone does not prove a patch is complete.

## Credits

- [Hermes Agent](https://github.com/NousResearch/hermes-agent) — Nous Research
- Root-cause lead: [Deep Router — Hermes Agent 优化：解决 GLM-5.2 模型 429](https://deeprouter.org/article/hermes-agent-optimization-fix-glm-5-2-model-429-1305-overloaded)

## License

MIT

---

<p align="center">
  <a href="https://x.com/moreoronce">
    <img src="https://img.shields.io/badge/X-Follow_@moreoronce-black?style=for-the-badge&logo=x&logoColor=white" height="40" alt="X @moreoronce">
  </a>
</p>
