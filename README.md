# opencode-kit

Starter framework for OpenCode projects. It installs project-local agent guidance, skills, and memory conventions for human-led AI-assisted engineering.

The framework is designed for small, reviewable changes, compact communication, reusable project memory, strong security defaults, and engineer ownership of the final result.

## Mission

`opencode-kit` exists to make AI-assisted engineering better and safer.

The goal is not to replace the development process or move decision-making away from the engineer. The goal is to help engineers work faster with AI while keeping them firmly in charge of architecture, coding style, optimization, tradeoffs, and the full context of the codebase.

In practice, this means the engineer defines the intent and constraints, the agent helps execute scoped work inside those boundaries, and the engineer reviews the output, corrects direction when needed, and accepts responsibility for what gets built.

The framework acts like a lightweight operating system for human-led agentic work: gather only relevant context, make small safe changes, preserve durable knowledge, respect security boundaries, and produce work that is easy to review, verify, and maintain.

## Install

Run from the root of the project where you want to install the framework.

Install the default OpenCode setup from the GitHub repository:

```sh
npx github:lexmihaylov/opencode-kit
```

Install from a specific branch, tag, or commit:

```sh
npx github:lexmihaylov/opencode-kit#<ref>
```

Install from the full Git URL:

```sh
npx git+https://github.com/lexmihaylov/opencode-kit.git
```

If framework files already exist, the installer stops instead of overwriting them. Use `--force` only when you intentionally want to replace existing framework files:

```sh
npx github:lexmihaylov/opencode-kit --force
```

Restart OpenCode after installing so it reloads instructions, skills, and memory.

Existing `.opencode/memory/` is protected. The installer copies starter memory only when `.opencode/memory/` does not exist; `--force` does not overwrite existing project memories or `.opencode/memory/index.md`.

## Installed Files

The OpenCode harness under `opencode/` copies these files into `.opencode/`:

- `.opencode/opencode.json`
- `.opencode/agents/`
- `.opencode/instructions/`
- `.opencode/skills/`
- `.opencode/memory/`

The installer is intentionally conservative. It will not replace existing files unless `--force` is used. Existing `.opencode/memory/` is always skipped to protect project memories.

## Framework Goals

- Keep the built-in `build` agent as the default implementation agent.
- Add only a small number of focused custom agents.
- Keep the engineer in control of architecture, style, optimization, and final approval.
- Prefer clean, simple, readable code with as little unnecessary branching or checking as possible.
- Prefer small, reviewable, secure changes over broad rewrites.
- Keep communication compact and easy to scan.
- Save durable project knowledge in compressed memory files.
- Use OpenCode permissions for enforceable safety rules where available.
- Treat the agent as a collaborator that accelerates work, not as a replacement for engineering judgment.

## OpenCode Configuration

`opencode/opencode.json` keeps the default agent as the built-in `build` agent:

```json
"default_agent": "build"
```

It also loads shared instructions and the memory index:

```json
"instructions": [
  ".opencode/instructions/communication.md",
  ".opencode/instructions/coding-policy.md",
  ".opencode/memory/index.md"
]
```

Skills are loaded from the project-local skills directory:

```json
"skills": {
  "paths": [".opencode/skills"]
}
```

## Included Agents

The custom agents live in `opencode/agents/` and are installed under `.opencode/agents/`. The built-in `build` agent remains the default; `plan` is also available for direct OpenCode use.

| Agent | Mode | Purpose |
| --- | --- | --- |
| `orchestrate` | primary | Read-only coordinator for routing, approval gates, delegated implementation, verification, review, and memory capture. |
| `specify` | all | Turns product requests into provider-neutral, implementation-ready tasks with scope, non-goals, acceptance criteria, constraints, and handoff to the appropriate direct agent. |
| `organize` | subagent | Plans and replans non-trivial work, recording scope, checkpoints, acceptance criteria, invariants, non-goals, and affected contracts. |
| `develop` | subagent | Implements approved, scoped changes using the narrowest safe approach and returns blockers to the orchestrator. |
| `debug` | subagent | Diagnoses failures, stack traces, failed commands, flaky behavior, and runtime bugs before implementation. Read-only. |
| `review` | all | Reviews approved scope for correctness, security, regressions, contracts, overengineering, and reviewability. Read-only. |
| `design` | subagent | Produces implementation-ready UX, visual design, design-system, component, responsive, and accessibility guidance. Read-only. |
| `research` | all | Researches tools, integrations, architecture options, compatibility, licensing, maintenance, and tradeoffs before planning. Read-only; web research enabled. |
| `document` | all | Writes code-backed Markdown documentation for features, flows, architecture, APIs, setup, and operations. Edits only `docs/**/*.md`. |
| `archive` | subagent | Compresses durable, reusable project knowledge into focused `.opencode/memory/*.md` files. Edits only memory files and cannot use Bash. |

Invoke an agent with its name, for example:

```text
@debug diagnose this failing test output
@orchestrate implement the approved payment flow
```

All read-only agents are prohibited from editing. `orchestrate` delegates file changes to `develop`; `archive` owns all memory writes. Agent-specific permissions are defined in each agent file and merged with the shared permissions in `opencode/opencode.json`.

## Included Skills

Skills live in `opencode/skills/<name>/SKILL.md`, are installed under `.opencode/skills/`, and are loaded from that directory by `opencode/opencode.json`. Each skill is triggered by the matching work context:

| Skill | Use for |
| --- | --- |
| `conventions` | Project coding conventions, architecture, organization, reuse, reviewability, and implementation preferences. |
| `testing` | Selecting or running tests, fixtures, mocks, regression coverage, and verification commands. |
| `security` | Authentication, authorization, validation, secrets, logging, errors, file/network access, dependencies, supply-chain risk, and data exposure. |
| `frontend` | UI, React components, styling, accessibility, responsive layouts, forms, loading states, and client-side state. |
| `strict-lean-react-next` | React/Next.js code, hooks, components, App Router, server actions, route handlers, UI state, file splitting, and maintainability. |
| `interaction-flow-spec` | User journeys, forms, multi-step and async flows, destructive actions, permissions, and recovery paths. |
| `web-accessibility` | Accessible interactive UI, forms, navigation, widgets, dialogs, responsive reflow, motion, and evidence-based audits. |
| `usability-validation` | Validating whether users can complete meaningful tasks and planning or evaluating usability testing. |
| `visual-character-review` | Visual direction, hierarchy, typography, density, color, imagery, repetition, and generic-looking layouts. |
| `api` | API routes, handlers, clients, contracts, request/response shapes, auth boundaries, errors, and integrations. |
| `dependencies` | Adding, removing, upgrading, or evaluating packages, tools, frameworks, plugins, generated code, and lockfiles. |
| `data-change-safety` | Database schemas, persisted data, migrations, backfills, retention, imports, exports, and data repair. |
| `observability` | Production logs, metrics, traces, alerts, health checks, correlation IDs, and operational diagnostics. |
| `git-change-safety` | Inspecting changes, staging, commits, conflict resolution, rebasing, pushing, and repository-history safety. |
| `evidence-based-verification` | Completion claims, verification sufficiency, acceptance-criterion evidence, and residual-risk reporting. |
| `skill-authoring` | Creating, updating, reviewing, evaluating, and defining trigger boundaries for framework skills. |
| `memory` | Reading durable project memory and deciding what project knowledge should be archived. |

## Shared Instructions

`opencode/instructions/communication.md` and `opencode/instructions/coding-policy.md` apply globally through `opencode/opencode.json`.

Together they define the global behavior expected from every agent.

### Coding Policy

Global coding policy keeps codebases readable and maintainable:

- Prefer small, focused files with a clear primary responsibility.
- Separate presentation, orchestration, business logic, and integration/data-access concerns when practical.
- Extract cohesive units before a module becomes hard to scan.
- Prefer incremental refactoring and composition over growing monolithic files.

### Compact Communication

User-facing output should stay compact:

- Prefer 1-3 bullets or one short paragraph.
- Preserve context with file paths, command names, and outcomes.
- Avoid narrating routine steps.
- Final responses should focus on what changed, verification, blockers, and useful next steps.

### Focused Context Gathering

Agents should avoid loading unnecessary context:

- Search before broad reads.
- Read only files and sections needed for the current decision.
- Use memory indexes as routing tables.
- Avoid command output dumps unless needed.

### Decision Confidence

For complex implementation, architecture, debugging, review, or documentation decisions, agents should estimate confidence before proceeding.

Rules:

- If confidence is below `0.8`, do not edit files or make system changes.
- Ask focused follow-up questions and wait for clarification.
- Use opencode's prompting/question functionality for clarification when available.
- Proceed only after clarification raises confidence to `0.8` or higher.
- If confidence is `0.8` or higher, proceed with the smallest safe, reviewable approach.

When presenting an approach, agents should include only:

```text
Approach: <one short sentence>
Confidence: <0.0-1.0>
```

### Orchestration Routing

Only `@orchestrate` delegates specialized work to subagents:

- Failures, stack traces, root-cause analysis, and flaky behavior go to `debug`.
- Code review, security review, regressions, and test-gap analysis go to `review`.
- Creating, updating, compressing, or saving memory goes to `archive`.
- Delegations stay focused on the exact task or artifact needed. Direct `@build` and `@plan` sessions retain their built-in workflows and do not inherit these routing or approval rules.

### Memory Access

Main agents may read `.opencode/memory/index.md` and only the linked memory files relevant to the current task. Memory is a routing table, not a place for general rules or task narration.

## Permissions

Shared permission rules live in `opencode/opencode.json`.

Global rules:

- Allow normal project reads and searches.
- Deny common secret files and credential locations.
- Allow normal edits for the default `build` agent while denying secret paths.
- Ask before bash commands by default.
- Deny common environment-reading shell commands.

Agent-specific permissions only define differences from the global base. This keeps agent files small while preserving shared security behavior.

Examples:

- `review` and `debug` set `edit: deny`.
- `document` narrows edits to Markdown files under `docs/`.
- `archive` narrows edits to `.opencode/memory/*.md`.

opencode merges global and agent permissions. Agent rules take precedence.

## Project Memory

The framework installs a minimal `.opencode/memory/index.md`. Specific memory files are created as development work uncovers durable project knowledge.

Memory writes are handled by the `archive` subagent. In direct sessions, switch to `@archive` to save durable memory; `@orchestrate` handles that routing in orchestration sessions.

Use `.opencode/memory/index.md` as the entry point. It is a pure routing table and should contain only concise links to focused memory files.

Memory rules and examples live in `opencode/skills/memory/SKILL.md` and `opencode/agents/archive.md`, not in `opencode/memory/index.md`. This keeps the always-loaded index small and project-specific.

Example memory files:

- `.opencode/memory/external-billing-integration.md`
- `.opencode/memory/api-integration.md`
- `.opencode/memory/auth-session-flow.md`
- `.opencode/memory/api-error-handling.md`
- `.opencode/memory/background-jobs.md`
- `.opencode/memory/test-data-fixtures.md`

Memory should capture durable knowledge that helps future agents work without rediscovering the same context. Keep each file small and specific so agents can reference only the context they need.

## Recommended Workflow

Use the built-in OpenCode `build` agent for normal development work.

Use focused agents or workflow skills when the task matches their narrow purpose:

- `document` for docs in `docs/`.
- `review` for code and security review.
- `debug` for diagnosis before implementation.
- `archive` for compressed durable memory.
- `research` for pre-implementation option research.
- `design` for UX/UI and design-system guidance.
- `organize` for planning and replanning.
- `specify` for implementation-ready product tasks and acceptance criteria.
- `develop` for scoped implementation work.

The intended workflow is human-led:

1. The engineer defines the goal, constraints, and success criteria.
2. The agent helps break the work into smaller steps and executes scoped tasks.
3. The engineer reviews the output, adjusts direction, and decides what should change next.
4. The engineer remains responsible for the architecture, code quality, and final result.

For product-task preparation, use `@specify` before `@document` or `@orchestrate`. Keep external issue-tracker mappings in tool-specific skills and require explicit approval before MCP writes.

For low-confidence or ambiguous work, clarify first. The framework intentionally blocks edits when confidence is below `0.8`.

## Updating The Framework

After changing files under `opencode/`, restart OpenCode. Running sessions keep using previously loaded configuration.

To reinstall into a project and replace existing framework files except project memory:

```sh
npx github:lexmihaylov/opencode-kit --force
```

Use `--force` carefully. It replaces installed framework files, but preserves existing `.opencode/memory/`.
