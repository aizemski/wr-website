---
title: 'Enterprise Engineering: Modernize With Strangler Patterns, Not a Big-Bang Rewrite'
description: 'How engineering leaders migrate React and APIs incrementally while the roadmap keeps shipping, with security review on their side.'
pubDate: '2026-03-05'
heroImage: '../../../assets/blog/strangler-migration-without-freeze.png'
personas: ['Enterprise Engineering']
services: ['Product Engineering', 'Cloud & DevOps']
technologies: ['React & Next.js', 'JavaScript & TypeScript', 'AWS & Serverless', 'CI/CD & DevOps']
industries: ['Enterprise Software', 'Regulated & Compliance']
---

[McKinsey](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/tech-debt-reclaiming-tech-equity) estimates large organizations carry substantial **tech debt** that slows every new feature. Enterprise leaders feel it when modernization stalls in committee while product still ships on a brittle stack. The pattern is familiar: a slide deck promises a clean rewrite, the business asks for Q3 roadmap items anyway, and engineering maintains two worlds until morale drops.

The alternative is incremental modernization: stable boundaries around legacy, highest-churn surfaces first, customer value every sprint. This article covers strangler migrations for React 18 UIs, GraphQL and REST APIs, CI/CD, IAM, and security review.

> **At a Glance**
> - Strangler fig patterns replace slices of legacy behind stable facades.
> - React 18 and module boundaries let teams migrate route by route.
> - GraphQL or REST gateways keep frontend teams unblocked on monolith releases.
> - CI/CD and observability evidence help security reviewers say yes.
> - Progress is measured in traffic meters and retired modules, not slide milestones.

## Why do big-bang rewrites fail?

Big-bang rewrites fail because they pause value delivery while engineering absorbs hidden coupling in one cutover. [Martin Fowler](https://martinfowler.com/bliki/StranglerFigApplication.html) documented the strangler fig pattern because full replacements rarely finish before requirements change. Product leaders still get customer pressure; engineering maintains legacy while the rewrite slips.

### What risk concentrates in a single cutover?

A single cutover concentrates **functional**, **operational**, and **organizational** risk in one weekend:

- **Functional risk**: edge cases discovered only under production traffic.
- **Operational risk**: rollback plans that were never tested at scale.
- **Organizational risk**: teams that have not shipped together on the new stack.

### How does incremental delivery change the conversation?

Incremental delivery reframes modernization as a product discipline. Each slice has a user-visible outcome, a measurable traffic shift, and a retirement criterion for legacy code. Executives see progress in quarters, not in a mythical "switch flip" date. Security and compliance reviewers see evidence accumulate release by release instead of a panic packet before audit.

**Citation capsule:** Fowler's strangler fig metaphor describes how new capability grows around legacy until the old system can be removed. The pattern works because each increment is independently deployable and reversible, which is why enterprises adopt it when rewrite programs stall ([Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html), Martin Fowler, 2004).

## What is a strangler migration in practice?

A strangler migration introduces a **facade** (API gateway, BFF, or UI shell) that routes traffic to legacy or modern implementations. New code lives behind that facade. Legacy code shrinks as traffic meters move. You never ask users to tolerate a multi-month feature freeze while engineering rebuilds everything behind the curtain.

### What are the core building blocks?

| Building block | Role during migration | Example |
|----------------|----------------------|---------|
| **Edge facade** | Routes requests to legacy or modern | CloudFront + ALB, API Gateway |
| **BFF or gateway** | Stabilizes contracts for clients | Express BFF, AWS AppSync |
| **UI shell** | Hosts new routes beside legacy | Next.js app shell, module federation |
| **Traffic meter** | Proves when legacy can retire | Metrics on route, feature flag % |
| **Rollback lever** | Reverts bad slices fast | Flag off, gateway rule change |

Each release moves one capability:

1. **Auth and session** on a well-tested service.
2. **High-traffic read paths** to React 18 or Next.js with server components where they help.
3. **Write paths** after read paths prove stable in production.
4. **Retire legacy modules** when traffic meters hit zero for a sustained window (typically 30 to 90 days, depending on release cadence and compliance needs).

GraphQL or REST gateways (Express, AWS AppSync) keep contracts explicit so frontend teams are not blocked on monolith releases. The gateway becomes the contract your mobile app, web app, and partner integrations all trust.

### What does "facade" mean for engineering day to day?

For engineers, the facade is the stable interface. Legacy can be messy behind it as long as the facade honors the same auth, error shapes, and observability tags. When a team migrates "order history," they do not wait for the entire orders domain to move. They implement order history behind the gateway, shift a percentage of read traffic, watch error budgets, then expand.

[UNIQUE INSIGHT] The most impactful facade decision is usually **auth and session**, not the flashiest UI route. Once identity is consistent, every subsequent slice inherits the same security baseline and logging context.

## Which surfaces should you migrate first?

Migrate surfaces that combine **high business churn**, **high incident cost**, and **low coupling** to the rest of the monolith. A quarterly planning screen that changes every sprint is often a better first target than a stable reporting module buried under twelve shared libraries.

### How do you score migration candidates?

Use a simple scorecard. Rate each candidate 1 to 5 on four dimensions, then sort by total score and tie-break with engineering gut-check on hidden coupling.

| Dimension | Question to ask | High score means |
|-----------|-----------------|------------------|
| **Churn** | How often does product change this flow? | Frequent roadmap touch |
| **Pain** | How often does this flow cause incidents or support load? | On-call or ticket pain |
| **Coupling** | How many legacy modules does it import? | Few dependencies |
| **Visibility** | Will stakeholders notice improvement? | Clear user or ops win |

Typical first slices:

- **Login, session refresh, and password flows** (establishes IAM and audit patterns).
- **Read-heavy dashboards** (validates React 18 data loading and caching).
- **Self-service settings** (low write risk, high support ticket reduction).

Defer until later:

- **Batch jobs** with fragile scheduling unless they block everything else.
- **Admin tools** used twice a year unless compliance mandates them.
- **Shared libraries** with no direct user surface (refactor as you touch routes, not as a standalone program).

### Why start with reads before writes?

Read paths tolerate partial rollout. You can serve cached or eventually consistent data, compare responses between legacy and modern implementations, and shadow traffic before users see the new UI. Write paths need idempotency keys, conflict handling, and clearer rollback semantics. [Google's DORA research](https://dora.dev/) consistently links smaller batch sizes and frequent deployment to better stability. Read-first slices match that rhythm.

## How do React 18 and module boundaries support incremental UI work?

React 18 modernization works best when you treat **routes** as migration units, not the entire SPA. Module boundaries (route-based code splitting, lazy-loaded islands, or a Next.js shell wrapping legacy pages) let two UI stacks coexist while users experience one product.

### What React 18 features matter for brownfield?

| Feature | Migration use | Practical note |
|---------|---------------|----------------|
| **Concurrent rendering** | Smoother transitions between legacy and modern islands | Reduces jank when both stacks mount |
| **`createRoot`** | Required baseline for new code | Plan a single cutover per route, not per component |
| **Suspense boundaries** | Isolate loading states per slice | Prevents one slow legacy iframe from blanking the shell |
| **Server Components (Next.js)** | Move data fetching off the client on hot read paths | Cuts bundle size on dashboard-style routes |

You do not need to convert every class component in week one. You need a **shell** that can host new routes, shared design tokens, and a consistent auth context. [Custom product engineering](/services/product-engineering) teams often standardize on a thin Next.js shell early so each migrated route inherits the same layout, telemetry, and error boundary.

### How do module boundaries prevent "second monolith"?

Define rules before the second route ships:

- New routes live in a `modern/` tree (or equivalent) with no imports from legacy folders.
- Legacy may call shared **design system** packages; modern may not import legacy business logic.
- Cross-cutting concerns (auth, analytics, feature flags) go through adapters, not copy-paste.

[PERSONAL EXPERIENCE] We have seen migrations stall when teams skip the adapter layer and copy auth helpers into every new route. Six months later, "modern" code duplicates the same coupling the rewrite was meant to escape. One adapter per concern beats six slightly different implementations.

### What about micro-frontends?

Module federation helps when multiple teams ship independently, but it adds operational overhead. For most programs, a **single shell with lazy routes** is enough until team count and release cadence demand federation.

## What role do GraphQL and REST APIs play during cutover?

APIs are the hinge. Front-end speed dies when backends are inconsistent, versioning is informal, and mobile clients break silently when a monolith deploys. During a strangler migration, the gateway layer is where you enforce contracts while legacy and modern services diverge internally.

### When should you choose GraphQL vs REST?

| Factor | REST | GraphQL |
|--------|------|---------|
| **Client diversity** | Few clients, cache-friendly resources | Many clients, varied field needs |
| **Aggregation** | Simple resources, CDN cache wins | Complex reads spanning services |
| **Team familiarity** | Strong HTTP caching culture | Strong schema governance culture |
| **Migration phase** | Excellent for slice-by-slice resources | Excellent for BFF aggregation over legacy + modern |

REST stays excellent for stable, cache-friendly resources (`GET /orders/{id}`). GraphQL helps when web and mobile need different field sets from the same underlying services, or when a BFF must aggregate legacy monolith responses with new microservice responses during transition.

### How do you version without breaking consumers?

Practical rules:

- **Never** break existing clients on a gateway route. Add fields, deprecate with timelines.
- Use **schema registries** or OpenAPI diff checks in CI for breaking-change detection.
- Publish an **error shape** standard (`code`, `message`, `requestId`) across legacy and modern handlers.

**Citation capsule:** Explicit API contracts reduce coordination cost during partial migration because clients depend on the gateway schema, not on monolith release timing. Teams that treat the gateway as the product surface ship frontend changes without waiting for backend deploy windows, which matches how [enterprise engineering leaders](/for/enterprise-engineering) typically measure program health: releases per week, not milestones per year.

### What belongs in the BFF vs downstream services?

The BFF handles **client-specific** shaping: pagination defaults, field masking, combining legacy and modern responses. Domain services handle **business rules**. Keep routing at the gateway and the BFF thin enough to test with contract tests alone.

## How do you keep security review from blocking delivery?

Security review blocks delivery when evidence arrives as a surprise packet before launch. Strangler migrations succeed when IAM baselines, secret handling, and logging are **documented as you migrate**, not reconstructed from memory before audit.

### What IAM baseline should every slice inherit?

| Control | Minimum standard | Reviewer question answered |
|---------|-------------------|---------------------------|
| **Identity** | OIDC or SAML via central IdP; no bespoke auth per route | Who authenticated this request? |
| **Authorization** | Role or attribute checks at gateway and service | Who is allowed to do this? |
| **Secrets** | Manager-backed secrets; no long-lived keys in repos | How do we rotate credentials? |
| **Network** | Private subnets for services; WAF at edge where applicable | What is exposed to the internet? |
| **Logging** | Structured logs with `requestId`, user id, action | What happened during an incident? |
| **Data** | Encryption in transit and at rest; PII tagged in logs | What data leaves the boundary? |

Least-privilege IAM roles per service, no shared "god" roles for convenience, and break-glass procedures documented for on-call. [Cloud architecture and DevOps consulting](/services/cloud-architecture) engagements often map these controls to AWS IAM, Secrets Manager, and CloudWatch first so later slices copy a proven template.

### How do you make security review repeatable?

Build a **migration security packet** template updated every sprint:

1. Architecture diagram showing facade, new service, legacy touchpoints.
2. Data flow for PII and retention.
3. Threat model delta for this slice (STRIDE-lite is enough).
4. Pipeline evidence: test results, staging deploy, rollback runbook link.
5. Pen test or SAST exceptions filed with expiry dates.

When reviewers see the fifth slice with the same structure as the first, approval cycles shrink.

### What about third-party and supply chain risk?

Pin dependencies in lockfiles, run SCA in CI, and block merges on critical CVEs without a documented exception. Security teams care whether your pipeline **proves** you know when dependencies change.

## What should CI/CD look like when two stacks run in parallel?

Pipelines must deploy **both** stacks until cutover completes. Feature flags and traffic percentages de-risk partial rollouts. Staging must mirror production closely; otherwise every release still feels like roulette.

### Dual-stack pipeline checklist

| Stage | Legacy stack | Modern stack | Shared gate |
|-------|--------------|--------------|-------------|
| **PR** | Unit + integration tests | Unit + integration tests | Lint, SCA, contract diff |
| **Merge** | Build artifact | Build artifact | Version tag, changelog |
| **Staging** | Deploy + smoke | Deploy + smoke | E2E on critical paths |
| **Production** | Deploy (may be no-op) | Deploy behind flag | Canary metrics alarm |
| **Rollback** | Revert deploy or flag | Flag off or revert | Runbook tested quarterly |

Minimum bar: tests and lint on every PR, build once and promote through stages, rollback in minutes, staging that mirrors production IAM and gateway rules.

### How do feature flags interact with migration?

Use flags for **traffic percentage**, not for hiding unfinished work in production. A flag should mean "this slice is production-ready but limited for observation," not "we skipped tests because demo day is tomorrow." Pair flags with metrics: error rate, p95 latency, and a business metric (completed checkout, saved settings, etc.).

[UNIQUE INSIGHT] The teams that finish modernization are rarely the ones with the boldest architecture slides. They are the ones that ship the smallest migratable slice every sprint, with CI/CD that makes each slice boring to deploy.

### What observability proves a slice is ready to expand?

Before raising traffic from 5% to 50%, confirm:

- Error rate parity (modern within agreed margin of legacy).
- No new secret leaks or auth failures in logs.
- Support ticket volume stable for the migrated flow.
- On-call runbook updated with modern-specific failure modes.

Dashboards for leadership are optional. On-call runbooks and request-scoped tracing are not.

## How do you measure progress without freezing the roadmap?

Measure progress in **retired legacy modules**, **traffic shifted**, and **roadmap items shipped on modern paths**. Avoid measuring only "percent of slides complete" or "lines of code rewritten," which incentivize churn without user value.

### Sample program metrics

| Metric | Why it matters | Healthy signal |
|--------|----------------|----------------|
| **Traffic on modern** | Proves real usage | Steady climb, no rollback spikes |
| **Legacy modules retired** | Proves debt shrink | Monotonic down over quarters |
| **Deploy frequency (modern)** | Proves operability | Weekly or better |
| **Mean time to restore** | Proves rollback works | Stable or improving |
| **Roadmap items on modern** | Proves business continuity | Majority of new work lands in new stack |

Review these monthly with product and security stakeholders.

### How do you report to executives without hype?

Report **outcomes**, not file counts: traffic on modern, error rate vs legacy, and retirement dates tied to meters. Executives fund continued investment when customer-visible flows improve and incident load drops.

## What does a worked migration slice look like?

Consider **order history**: a read-heavy flow, frequent product tweaks, moderate coupling to the orders domain.

### Phase 0: Baseline (1 to 2 sprints)

- Document current API responses and error cases from legacy.
- Add gateway route `GET /v1/orders/history` proxying to legacy unchanged.
- Instrument request counts and p95 latency at gateway.

### Phase 1: Modern read path (2 to 3 sprints)

- Implement React 18 route in the shell with Suspense boundary.
- Build modern service or query resolver backed by read replica or cached legacy API.
- Shadow-compare responses in staging; fix field mismatches.

### Phase 2: Partial traffic (1 sprint)

- Enable feature flag at 5% production traffic.
- Watch error budget and support tags for "missing orders."
- Expand to 25%, then 50%, pausing if business metrics diverge.

### Phase 3: Write-adjacent work (later program)

- Do **not** migrate "cancel order" in the same slice unless scope is tiny.
- Plan write paths as separate slices with idempotency and rollback drills.

### Phase 4: Retire legacy UI (1 sprint)

- Route 100% traffic through modern for 30 to 90 days.
- Remove legacy route components and delete dead gateway branches.
- Update architecture diagram and security packet for auditors.

This slice might take one quarter. The full program might take 12 to 24 months for large surfaces, but value shows in the first quarter when a critical flow moves.

## FAQ

**Can we modernize without React?**  
Yes. Some enterprises standardize on Vue, Angular, or platform-native clients. Most teams we work with target React 18 for hiring depth and ecosystem maturity, but the strangler pattern is stack-agnostic. The facade and gateway matter more than the view library.

**How long does incremental migration take?**  
Often **12 to 24 months** for large surfaces spanning multiple domains. Value usually appears in the first quarter when a high-traffic read path or auth flow moves. Programs that show no traffic shift by month six usually have a facade or ownership problem, not a tooling problem.

**Do we need a platform team on day one?**  
Not on day one. You need clear **ownership per slice**, a gateway contract everyone respects, and a security packet template. A platform team helps once three or more product squads migrate in parallel and shared adapters need full-time curators.

**What if legacy is a single undeployable monolith?**  
Start with a gateway proxy and the thinnest BFF you can test. You do not need to split the monolith before the first slice. You need a stable edge contract and the ability to route one endpoint to new code. Split services when slices prove boundaries, not before.

**How do we handle database migration?**  
Prefer **strangler at the API layer** first. Dual-write and dual-read patterns are powerful and dangerous: use them only with clear reconciliation jobs and monitors. Many programs keep legacy as system of record for months while modern reads from replicas or materialized views.

**Will security approve partial traffic rollouts?**  
They usually will when you provide evidence: IAM baselines, logging, rollback runbooks, and prior slice approvals that match the same template. Partial rollout is often **safer** than big-bang because blast radius stays bounded.

**How do GraphQL and REST coexist during migration?**  
Common pattern: REST at the edge for cache-friendly public resources, GraphQL BFF for aggregated authenticated reads. Document which clients use which surface and enforce breaking-change checks on both in CI.

**When can we delete legacy code?**  
When traffic meters read zero (or agreed minimum), support tickets for legacy-specific bugs are gone, and no batch jobs silently import the module. Schedule deletion as a sprint goal with rollback artifacts archived, not as a Friday afternoon cleanup.

## Closing thought

Modernization is a product discipline: measurable slices, stable interfaces, and releases that keep shipping customer value while debt shrinks underneath. Big-bang rewrites promise a clean finish line; strangler migrations deliver a series of small wins that compound. Start with auth, pick a high-churn read path, prove your pipeline and security packet once, then repeat until legacy is a memory and the roadmap never stopped moving.
