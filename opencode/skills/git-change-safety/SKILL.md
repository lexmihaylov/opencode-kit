---
name: git-change-safety
description: Use when inspecting Git changes, staging, committing, resolving conflicts, rebasing, pushing, or deciding whether repository history is safe to modify.
---

# Git Change Safety

- Inspect repository status and the relevant diff before staging, committing, rebasing, restoring, or pushing.
- Stage only files within the approved task scope; do not alter or revert unrelated work in a dirty worktree.
- Review staged content separately from unstaged content before committing.
- Use non-interactive Git commands and preserve history unless the user explicitly requests a history-changing operation.
- Ask before destructive or remote-affecting operations, including reset, clean, restore, rebase, force-push, or conflict resolution that discards changes.
- Do not commit, amend, push, or create pull requests unless explicitly requested.
- Treat merge conflicts as a scope and behavior decision: inspect both sides, preserve intended changes, and verify the resolved result.
