---
name: data-change-safety
description: Use when changing database schemas, persisted data, migrations, backfills, retention, imports, exports, or data repair.
---

# Data Change Safety

- Identify affected data, readers and writers, compatibility requirements, and rollback or recovery path before changing persisted state.
- Prefer additive, backward-compatible schema changes when old and new application versions can overlap.
- Make migrations, backfills, and repairs idempotent or safely resumable when practical; bound batch size and execution impact for large data.
- Validate on representative data and state how correctness, partial failure, and recovery are checked.
- Do not run destructive data changes, production migrations, or irreversible backfills without explicit user approval.
- Keep schema, application, API, and documentation changes coordinated when they share a persisted contract.
- Record durable data rules, migration constraints, and recovery decisions through `archive` when they will matter again.
