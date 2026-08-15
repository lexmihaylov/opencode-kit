---
name: memory
description: Use when reading durable project memory or deciding whether project knowledge should be archived.
---

# Memory

- Use `.opencode/memory/` for durable reusable project knowledge only.
- Read `.opencode/memory/index.md` first; it should contain only one-line links to memory files.
- Read only linked memory files relevant to the task.
- Do not load all memory by default.
- `@archive` creates, updates, compresses, and saves durable memory. `@orchestrate` decides when to route work there.
- Archive-worthy topics: architecture, module boundaries, domain rules, implementation patterns, integrations, API/error flows, async/background jobs, persistence rules, decisions, non-obvious constraints.
- Never store secrets, credentials, tokens, customer/account data, temporary task details, or branch-only information.
- Memories should be focused, topic-named files; one concept per file; summary + read-when note.
- `archive` updates `index.md` with one concise link entry only; do not store rules or examples in the index.
