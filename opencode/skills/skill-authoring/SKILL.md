---
name: skill-authoring
description: Use when creating, updating, reviewing, or evaluating framework SKILL.md files and their trigger boundaries.
---

# Skill Authoring

- Define one narrow responsibility and concrete trigger language before writing a skill.
- Use standard frontmatter with a lowercase hyphenated name matching the directory and a specific `Use when...` description.
- Reuse existing skills and global instructions; do not duplicate broad policies or introduce conflicting workflows.
- Keep instructions actionable, minimal, and framework-neutral unless a project-specific constraint requires otherwise.
- Specify handoff boundaries, permissions, and non-goals when the skill could overlap an agent or another skill.
- Validate trigger fit against representative requests and remove rules that are redundant, ambiguous, or impossible to enforce.
- Do not add dependencies, scripts, remote content, or license-restricted material without an explicit need and review.
