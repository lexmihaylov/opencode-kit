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

## OpenCode Agents

### `document`

Skill for creating and updating Markdown documentation.

Use it when you want documentation for:

- Features
- Implementation approaches
- Architecture and module boundaries
- Data flow
- APIs
- Setup and operational behavior
- Durable project knowledge

Permissions:

- Can read/search normal project files through inherited global permissions.
- Can edit only `docs/*.md` and `docs/**/*.md`.
- Can run only `mkdir docs` and `mkdir -p docs`.
- Cannot edit source code, tests, config, scripts, package files, generated files, or memory files.

Invoke with:

```text
@document document the auth session flow
```

### `research`

Skill for pre-implementation research and decision shaping.

Use it when you want help with:

- Integration possibilities
- Library and tool selection
- Architecture alternatives
- Feasibility and tradeoff analysis
- External ecosystem checks and best practices

Permissions:

- Inherits global read/search permissions.
- Cannot edit files.
- Can delegate only to read-only subagents (`explore`, `scout`).
- Inherits global bash policy: normal commands are allowed; potentially destructive commands require approval; environment-reading commands are denied.
- Can use web fetching for external research.
- Verifies low-confidence claims with web search and source fetches before concluding.

Invoke with:

```text
@research compare background job options for this project
```

Expected output is grounded options, tradeoffs, a recommendation, and a concise "Ready for @plan" handoff.

### `review`

Skill for code and security review.

Use it when you want a skeptical review for:

- Correctness bugs
- Regressions
- Security risks
- Data exposure
- Authentication and authorization issues
- Input validation gaps
- Unsafe logging
- File or network access risks
- Dependency risks
- Overengineering
- Hard-to-review diffs
- Convention violations

Permissions:

- Inherits global read/search permissions.
- Cannot edit files.
- Inherits global bash policy: normal commands are allowed; potentially destructive commands require approval; environment-reading commands are denied.

Invoke with:

```text
@review review the current changes
```

The main `build` agent may also use this subagent when a focused review pass is useful.

### `debug`

Skill for diagnosing failures before implementation.

Use it when working with:

- Stack traces
- Failed command output
- Runtime bugs
- Flaky behavior
- Bug reports
- Unknown root causes

Permissions:

- Inherits global read/search permissions.
- Cannot edit files.
- Inherits global bash policy: normal commands are allowed; potentially destructive commands require approval; environment-reading commands are denied.

Invoke with:

```text
@debug diagnose this failing test output
```

The expected output is the likely root cause, supporting evidence, and the smallest safe fix.

### `archive`

Skill for saving durable project knowledge into memory.

All memory creation, updates, compression, and saving should be delegated to `archive`. Other agents may read memory for context, but should not write memory files directly.

Use it when you want to:

- Save a convention
- Archive an implementation approach
- Preserve architecture or flow knowledge
- Record integration details
- Capture important decisions

Permissions:

- Inherits global read/search permissions.
- Can edit only `.opencode/memory/*.md`.
- Cannot use bash.

Invoke with:

```text
@archive save this API error handling convention
```

Memory should be compressed as much as possible without losing context. The agent removes narrative and temporary details while preserving exact constraints, reasons, file paths, naming conventions, module boundaries, domain rules, integration details, and decisions.

## Skills

### `conventions`

Applies project coding conventions and implementation preferences.

Core rules:

- Prefer small, reviewable changes.
- Keep files small and easy to scan.
- Apply the global coding policy: keep responsibilities focused and separate concerns before files become monolithic.
- Separate functionality into services and helpers when it improves reuse or clarity.
- Reuse existing helpers, services, modules, and patterns before adding new ones.
- Avoid overengineered approaches and speculative abstractions.
- Apply security conventions and best practices heavily.

### `testing`

Guides test selection, fixtures, mocks, regression coverage, and verification commands.

### `security`

Applies stricter handling for auth, authorization, validation, secrets, logging, errors, file/network access, dependencies, and data exposure.

### `frontend`

Guides UI, React, styling, accessibility, responsive layouts, forms, loading states, and client-side state.

### `interaction-flow-spec`

Guides user journeys, forms, state transitions, consequential actions, recovery, and responsive interaction behavior.

### `web-accessibility`

Guides accessible UI implementation and evidence-based audits without making conformance claims.

### `usability-validation`

Guides task-focused usability testing, findings, and retest recommendations.

### `visual-character-review`

Guides product-specific visual direction and critiques that avoid generic-looking layouts.

### `api`

Guides API routes, handlers, clients, contracts, request/response shapes, auth boundaries, errors, and integrations.

### `dependencies`

Guides package, tool, framework, plugin, generated-code, and lockfile changes.

### `evidence-based-verification`

Guides acceptance-criterion evidence, targeted verification, and residual-risk reporting.

### `skill-authoring`

Guides creation, maintenance, trigger boundaries, and evaluation of framework skills.

### `data-change-safety`

Guides schema changes, migrations, backfills, data repairs, compatibility, and recovery.

### `observability`

Guides production logs, metrics, traces, alerts, health checks, and diagnostic instrumentation.

### `git-change-safety`

Guides scoped Git inspection, staging, history changes, conflict resolution, and remote safety.

### `memory`

Guides how durable project knowledge is read, created, and updated.

Core rules:

- Use `.opencode/memory/index.md` as a routing table.
- Read only relevant memory files.
- Delegate memory creation, updates, compression, and saving to `archive`.
- Add memory only for durable, reusable project knowledge.
- Keep each memory file focused on one concept.
- Never store secrets, credentials, customer data, or temporary task details.

## Shared Instructions

`opencode/instructions/communication.md` and `opencode/instructions/coding-policy.md` apply globally through `opencode/opencode.json`.

It defines two important behaviors.

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

Memory writes are handled by the `archive` subagent. Main agents should read memory when relevant and delegate memory-saving work to `archive` instead of editing `.opencode/memory/` directly.

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
- `develop` for scoped implementation work.

The intended workflow is human-led:

1. The engineer defines the goal, constraints, and success criteria.
2. The agent helps break the work into smaller steps and executes scoped tasks.
3. The engineer reviews the output, adjusts direction, and decides what should change next.
4. The engineer remains responsible for the architecture, code quality, and final result.

For low-confidence or ambiguous work, clarify first. The framework intentionally blocks edits when confidence is below `0.8`.

## Updating The Framework

After changing files under `opencode/`, restart OpenCode. Running sessions keep using previously loaded configuration.

To reinstall into a project and replace existing framework files except project memory:

```sh
npx github:lexmihaylov/opencode-kit --force
```

Use `--force` carefully. It replaces installed framework files, but preserves existing `.opencode/memory/`.
