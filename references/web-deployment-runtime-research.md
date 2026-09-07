# General Web Deployment / Runtime Research

Status: **non-normative research evidence**

Date checked: **2026-09-07**

Current normative owners remain:

- Deployment shape / environment orchestration → `docs/10-project-management.md`
- Release / rollback / recovery → `docs/09-maintenance.md`
- Reliability → `docs/05-performance-reliability.md`
- Secrets / permissions → `docs/06-security.md`
- Deployment verification → `docs/07-testing-quality.md`
- Runtime diagnostics → `docs/15-development-observability.md`

This file records current external evidence and promotion rationale only.

## Evidence map

### AWS Well-Architected — Mitigate deployment risks

Sources checked:

- https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/mitigate-deployment-risks.html
- https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_mit_deploy_risks_auto_testing_and_rollback.html

Current guidance emphasizes planning for unsuccessful changes, testing deployments, choosing safe deployment strategies, and having rapid recovery / rollback tied to observable outcomes.

Promotion implication:

- `deployment completed` is not the completion oracle; deployed behavior must be verified.
- Recovery planning should exist before risky changes rather than being improvised only after production failure.
- Advanced rollout strategies are risk-control options, not universal requirements for small projects.

### AWS deployment strategies

Source checked:

- https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/deployment-strategies.html

AWS documents multiple strategies such as in-place, rolling, blue/green and canary, with selection depending on trade-offs such as risk, speed, cost and control.

Promotion implication:

- The Common Guide should not prescribe one deployment strategy.
- Projects should choose the minimum deployment mechanism that satisfies their availability, rollback and compatibility needs.
- If old and new revisions can coexist, compatibility between them becomes part of the deployment contract.

### Vercel environments / environment variables

Sources checked:

- https://vercel.com/kb/environments
- https://vercel.com/academy/vercel-foundations/vercel-settings

Current Vercel guidance distinguishes development, preview and production contexts and supports environment-scoped configuration.

Promotion implication:

- Environment roles are useful when they provide different evidence or isolate different risks; the Common Guide should not require a staging environment by name for every project.
- Configuration and secrets need explicit environment scope rather than scattered branch-specific hardcoding.

## Decision synthesis

The Common Guide should strengthen:

1. hosting/runtime selection from required capabilities rather than provider popularity;
2. Local / Preview / Staging / Production roles without mandatory environment proliferation;
3. configuration authority and secret/public boundaries;
4. URL / origin / OAuth / CORS / webhook environment consistency;
5. temporary preview lifecycle and cleanup;
6. background / scheduled runtime deployment considerations;
7. deployed-environment smoke / health verification;
8. rollback / recovery and old/new revision compatibility;
9. migration away from a hosting model when workarounds no longer satisfy product requirements safely.

## Over-application boundaries

Do **not** require every project to have:

- staging infrastructure;
- blue/green or canary rollout;
- containers or Kubernetes;
- multiple cloud providers;
- automatic rollback;
- preview databases;
- full production synthetic monitoring.

The deployment system should be proportionate to product risk, runtime requirements and recovery cost.
