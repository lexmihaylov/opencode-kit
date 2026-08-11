---
name: interaction-flow-spec
description: Use when designing or changing user journeys, forms, multi-step flows, async actions, destructive actions, permissions, or recovery paths.
---

# Interaction Flow Specification

- Define the user goal, entry point, success condition, constraints, and the shortest happy path before prescribing UI.
- Map key transitions, decisions, and ownership across screens or components; keep information hierarchy and next actions obvious.
- Specify loading, empty, error, success, disabled, cancellation, retry, and recovery behavior where applicable.
- For destructive or consequential actions, make the effect, scope, confirmation, and undo or recovery path proportionate to risk.
- Define keyboard behavior, focus movement, and small-screen adaptations for interactive paths.
- Reuse existing patterns and terminology; introduce a new flow pattern only when the current system cannot express the task clearly.
- Exclude static styling and component-only changes; use `design` for overall visual direction and system decisions.
