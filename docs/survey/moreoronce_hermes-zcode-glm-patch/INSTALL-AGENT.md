# INSTALL-AGENT.md — Machine-Readable Install Protocol

> You are an AI agent installing this patch for a user. Follow the phases in order. Never force-apply a stale patch, overwrite local work, expose credentials, or restart a running Hermes service without explicit authorization.

## Scope

This repository carries a 10-file Hermes Agent compatibility patch for:

1. cache-safe `Hermes Agent` → `ZCode` rewriting on `zai/glm-5.2`;
2. ZCode Desktop headers on main and auxiliary client paths;
3. structured `transform_llm_output` results, transform-before-persist ordering, and single-count recovery usage.

Compatibility base:

```text
Hermes Agent upstream a991dfc25daf
10 files, +698/-31
```

## Required inputs

| Item | Requirement |
|---|---|
| Hermes source tree | Usually `~/.hermes/hermes-agent`; discover it instead of guessing |
| Patch artifact | `patches/zcode-glm-patch.diff` in this repository |
| Python | The Hermes source tree's `venv/bin/python` |
| Git state | All target files clean before application |
| Z.AI credentials | Required only for the optional real E2E request |

## Target files

```text
agent/agent_init.py
agent/auxiliary_client.py
agent/system_prompt.py
agent/transform_output.py
agent/turn_finalizer.py
run_agent.py
tests/agent/test_auxiliary_user_default_headers.py
tests/agent/test_system_prompt.py
tests/agent/test_transform_output_structured.py
tests/run_agent/test_provider_attribution_headers.py
```

Do not modify `config.yaml`, `.env`, credential stores, runtime databases, or `package-lock.json` as part of patch installation.

## Phase 0 — Preflight

1. Resolve the real Hermes source directory.
2. Confirm it is a Git worktree and `venv/bin/python` exists.
3. Confirm the patch file exists.
4. Run `git status --short -- <all target files>`.
5. If any target file is modified or untracked, **STOP**. Report the paths and ask the user to preserve them by stash or commit.
6. Record the current `HEAD` and patch SHA-256.

Recommended commands:

```bash
cd <hermes_source>
test -d .git || git rev-parse --is-inside-work-tree
test -x venv/bin/python
sha256sum <patch_repo>/patches/zcode-glm-patch.diff
git status --short -- \
  agent/agent_init.py agent/auxiliary_client.py agent/system_prompt.py \
  agent/transform_output.py agent/turn_finalizer.py run_agent.py \
  tests/agent/test_auxiliary_user_default_headers.py \
  tests/agent/test_system_prompt.py \
  tests/agent/test_transform_output_structured.py \
  tests/run_agent/test_provider_attribution_headers.py
```

## Phase 1 — Backup

Create a unique rollback anchor. Never overwrite an existing tag:

```bash
cd <hermes_source>
stamp=$(date +%Y%m%d-%H%M%S)
git tag "pre-zcode-patch-$stamp"
```

Remember the exact tag name. The tag protects committed source state; target files must already be clean from Phase 0.

## Phase 2 — Dry run

```bash
cd <hermes_source>
git apply --check <patch_repo>/patches/zcode-glm-patch.diff
```

- Exit 0: proceed.
- Exit non-zero: **STOP**. Do not use `--reject`, `--3way`, whitespace suppression, or manual partial application.

A failed dry run means upstream has diverged. The correct response is an isolated-worktree rebase: understand the new prompt cache, client construction paths, finalizer ordering, and accounting before porting behavior. Blindly pasting old hunks is unsafe.

## Phase 3 — Apply

```bash
cd <hermes_source>
git apply <patch_repo>/patches/zcode-glm-patch.diff
git diff --check
```

Verify Git shows exactly the ten target files and nothing else. If application is partial or the file set differs, reverse the patch or restore the backup tag before continuing.

## Phase 4 — Static checks

```bash
cd <hermes_source>
venv/bin/python -m compileall -q \
  agent/transform_output.py agent/turn_finalizer.py agent/system_prompt.py \
  agent/agent_init.py agent/auxiliary_client.py run_agent.py

venv/bin/python -m ruff check \
  agent/transform_output.py agent/turn_finalizer.py agent/system_prompt.py \
  agent/agent_init.py agent/auxiliary_client.py run_agent.py \
  tests/agent/test_transform_output_structured.py \
  tests/agent/test_auxiliary_user_default_headers.py \
  tests/agent/test_system_prompt.py \
  tests/run_agent/test_provider_attribution_headers.py
```

A pre-existing Ruff warning may be printed, but the command must exit 0.

## Phase 5 — Regression suite

```bash
cd <hermes_source>
venv/bin/python -m pytest \
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

Expected on the compatibility snapshot: `222 passed`.

Any failure means **STOP**. Report the exact failing test and preserve the tree for diagnosis unless the user requests rollback.

## Phase 6 — Local behavioral verification

Without exposing secrets, verify:

- `build_zcode_headers()` returns a `User-Agent` beginning with `ZCode/3.1.8 `;
- `X-ZCode-Agent == glm`;
- session ID begins with `sess_`;
- strict hostname tests reject `api.z.ai.attacker.example`;
- prompt tests prove non-Z.AI providers retain `Hermes Agent`;
- structured transform tests prove persistence runs once and hook exceptions still invalidate the durable tail.

Do not print API keys, config contents, auth files, or complete environment variables.

## Phase 7 — Optional real E2E

A live provider call consumes quota and requires user authorization and configured Z.AI credentials. If authorized:

```bash
cd <hermes_source>
venv/bin/hermes chat -Q --provider zai -m glm-5.2 --reasoning none \
  --max-turns 3 -q 'Reply with exactly: ZCODE_E2E_OK'
```

Success requires exit 0, the exact marker, and no 429/1305.

For refusal-recovery integration, use a harmless synthetic refusal and verify all three outputs:

1. plugin report says `status: recovered`;
2. SQLite contains the recovered assistant text, not the original refusal;
3. `api_call_count == 2` for one main call plus one recovery call. A value of 3 indicates duplicate accounting.

Do not manufacture harmful requests just to trigger a refusal.

## Phase 8 — Restart boundary

Client-level headers do not hot-reload. A new process/session is required. **Do not restart Gateway, Desktop, or another user's service unless the user explicitly authorizes it.** Report that restart is required and stop at the boundary when authorization is absent.

## Rollback

If the tree has not diverged after installation:

```bash
cd <hermes_source>
git apply -R <patch_repo>/patches/zcode-glm-patch.diff
```

If it has diverged, preserve newer work first, then restore from the exact timestamped `pre-zcode-patch-*` tag. Never run a destructive reset before showing what would be discarded.

## Report format

Return:

1. base HEAD and patch SHA-256;
2. exact file count;
3. static-check result;
4. regression count;
5. live E2E result, or `not run` with the reason;
6. current service state and restart requirement;
7. rollback anchor.

## Non-negotiable rules

- Never force-apply a failed dry run.
- Never skip failed tests or claim unrun tests passed.
- Never replace strict hostname matching with substring matching.
- Never rewrite only the joined prompt while leaving cached static bytes untouched.
- Never move transcript synchronization inside the hook success path.
- Never add manual recovery accounting without checking whether upstream auxiliary accounting already covers the plugin call.
- Never include or publish user configuration, credentials, session databases, or unrelated lockfile changes.
