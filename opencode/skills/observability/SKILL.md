---
name: observability
description: Use when adding or changing production logs, metrics, traces, alerts, health checks, correlation IDs, or operational diagnostics.
---

# Observability

- Start from the operational question: what failure, latency, throughput, or state transition must be diagnosable?
- Use structured, stable fields and correlation identifiers that let related events be connected without exposing sensitive data.
- Log meaningful boundaries and failures, not routine internal noise; keep volume, cardinality, cost, and retention proportionate.
- Never emit secrets, credentials, tokens, raw personal data, or sensitive request and response bodies.
- Define useful success and failure signals before adding an alert; avoid alerts without an actionable owner or response.
- Preserve existing telemetry conventions and avoid adding vendors, SDKs, or background exporters without a concrete requirement.
- Verify observability changes with a representative local or test signal when feasible, and state any production-only uncertainty.
