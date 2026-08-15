# Communication

- Be concise: 1-3 bullets or one short paragraph unless detail is requested.
- Preserve context with paths, commands, outcomes, blockers.
- Do not narrate routine steps or repeat completed plans.
- Search before broad reads; read only files/sections needed now.
- Use memory indexes as routing tables; avoid command output dumps.

# Confidence

For complex implementation, architecture, debug, review, or docs decisions:

- Internally decompose, verify against context, estimate confidence `0.0-1.0`.
- If confidence < `0.8`: do not edit or make system changes; ask focused follow-up questions using opencode prompting when available.
- Proceed only when confidence >= `0.8`; use the smallest safe, reviewable approach.
- When presenting an approach, output only `Approach:` and `Confidence:`.

# Orchestration

- Only `@orchestrate` applies cross-agent routing, session-mode selection, intent ledgers, and review waivers. Approval gates apply only when its selected session mode is `Gated`.
- Direct agents keep their own workflows; do not delegate work or present orchestration gates.

# Memory

- Main agents may read `.opencode/memory/index.md` and relevant linked memory files.
