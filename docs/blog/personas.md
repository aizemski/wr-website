# Buyer Personas for Blog Content

Four personas align with White Raven services and live site pages. Use them to pick **angle**, **vocabulary**, and **proof points**—not to write four different brands.

| Internal name | Site / marketing label | Primary `/for` page |
|---------------|------------------------|---------------------|
| Startup Steve | Startup founders | `/for/startup-founders` |
| Enterprise Elena | Enterprise engineering leaders | `/for/enterprise-engineering` |
| Operations Oliver | Operations leaders | `/for/operations-leaders` |
| Small Business Sarah | Small business owners (ops digitization) | `/for/small-business` |

---

## Startup Steve

**Profile:** Founder or technical co-founder at pre–Series A through early growth. Runway and investor narrative matter as much as architecture.

**Goals**

- Ship an MVP real users can sign up for and pay for—not a wireframe demo.
- Make technical choices that survive the first senior hire.
- Add AI only where it strengthens the pitch and the product.

**Pain points** (from site copy)

- Investors want traction, not prototypes that break under real users.
- Full-time senior hires are expensive; freelancers and no-code create hidden debt.
- Stack decisions feel permanent; wrong choices waste the Series A engineering budget.

**Services to emphasize**

| Service | Blog angles |
|---------|-------------|
| Custom Product Engineering | MVP scope, React/Next.js foundations, API contracts, test coverage before scale |
| Applied AI | LLM PoCs with LangChain/Streamlit, fast feedback loops, avoid science-project features |
| Cloud & DevOps | Lean AWS/serverless for first production, CI/CD before the team grows |

**Voice**

- Summary box: **Key Takeaways**
- Readability: Grade 7–8; shorter sentences; concrete timelines (“weeks”, “before runway”).
- Words that resonate: traction, demo vs production, runway, scope, weekly demos, architecture that scales.
- Avoid: enterprise committee language, heavy compliance jargon.

**Example titles**

- “What belongs in a market-ready MVP (and what to cut)”
- “Why your investor demo breaks under real signups”
- “LLM features that help your pitch match what ships”

---

## Enterprise Elena

**Profile:** VP Engineering, Director of Platform, or senior architect at a regulated or process-heavy organization. Risk, security review, and roadmap continuity dominate.

**Goals**

- Modernize React/legacy stacks without a big-bang rewrite or feature freeze.
- Make releases routine: pipelines, staging parity, rollbacks.
- Satisfy security and leadership with IAM, logging, and observability evidence.

**Pain points**

- Modernization stuck in committee while features still fight legacy constraints.
- Releases treated as high-risk events; staging ≠ production.
- Security audits surface IAM sprawl and gaps that pause delivery.

**Services to emphasize**

| Service | Blog angles |
|---------|-------------|
| Custom Product Engineering | Strangler migrations, React 18 modernization, GraphQL/AppSync at scale |
| Cloud & DevOps | Serverless (Lambda, SQS, EventBridge), CI/CD (Docker, K8s, GitHub Actions), CloudWatch |
| Applied AI | RAG for internal knowledge, governed LLM use, data trust (secondary) |

**Voice**

- Summary box: **At a Glance**
- Readability: Grade 8–10; allow technical depth on IAM, pipelines, observability.
- Words that resonate: incremental, risk, compliance, strangler, evidence, release predictability.
- Avoid: “move fast break things”, shallow startup hype.

**Example titles**

- “Strangler migrations when the committee won’t approve a rewrite”
- “Staging that matches production: what actually reduces release risk”
- “IAM baselines engineering can maintain without freezing the roadmap”

---

## Operations Oliver

**Profile:** COO, Head of Operations, or operations manager owning field teams, reporting, and data trust. Adoption beats feature count.

**Goals**

- One source of truth instead of conflicting spreadsheets.
- Field capture without re-keying; offline when connectivity fails.
- Automate reporting so Fridays aren’t lost to PDF assembly.

**Pain points**

- Truth lives in spreadsheets; leadership distrusts the numbers.
- Paper/phone capture → office re-keying → billing and customer errors.
- Reporting cycles are always a week behind reality.

**Services to emphasize**

| Service | Blog angles |
|---------|-------------|
| Workflow Automation | PWAs, offline sync, multi-tenant dashboards, ETL/scraping, PDF/report automation |
| Applied AI | Document search, triage, validation pipelines—not chatbot shelfware |
| Product Engineering | Only when portal UX or API integration is the bottleneck |

**Voice**

- Summary box: **Key Takeaways**
- Readability: Grade 7–8; plain language; name the workflow step before the library.
- Words that resonate: adoption, field, re-keying, source of truth, exceptions vs manual assembly.
- Avoid: developer-insider jargon without a one-line plain definition.

**Example titles**

- “Why your ops portal failed adoption (and how to fix the first week)”
- “Offline PWAs for crews: what to sync and what to leave local”
- “ETL pipelines that replace Friday report marathons”

---

## Small Business Sarah

**Profile:** Owner or GM at a small business (often 5–50 employees) digitizing manual processes without an IT department. Budget and time are tighter than enterprise; clarity beats novelty.

**Goals**

- Replace paper, email chains, and personal phones with something staff will actually use.
- See ROI in hours saved and fewer billing mistakes—not architecture diagrams.
- Buy tailored software when SaaS templates do not fit the process.

**Pain points** (aligned with workflow automation service page)

- Manual steps and re-keying cause delays and customer complaints.
- Generic SaaS forces process changes the team resists.
- No in-house team to maintain complex systems.

**Services to emphasize**

| Service | Blog angles |
|---------|-------------|
| Workflow Automation | Custom portals, simple dashboards, automated client comms/PDFs |
| Product Engineering | Light—only when explaining maintainable custom vs template SaaS |
| Cloud / AI | Light—practical benefits (reliability, smart validation), not stack tours |

**Voice**

- Summary box: **What You'll Learn**
- Readability: Grade 6–8; define acronyms; dollars and hours over microservices.
- Words that resonate: time back, mistakes, billing, daily work, simple, tailored.
- Avoid: assuming a platform team, deep Kubernetes tangents.

**Example titles**

- “Custom portal vs another SaaS subscription: a decision checklist”
- “Automating client updates without hiring a developer full-time”
- “What ‘offline-capable’ means for a small field team”

---

## Persona × service matrix

Use this when planning a post: pick **one primary persona** and **one service pillar**.

```
                    │ Product Eng │ Applied AI │ Workflow │ Cloud/DevOps
────────────────────┼─────────────┼────────────┼──────────┼─────────────
Startup Steve       │     ●●      │     ●●     │    ●     │      ●
Enterprise Elena    │     ●●      │     ●      │    ●     │     ●●
Operations Oliver   │     ●       │     ●●     │   ●●     │      ●
Small Business Sarah│     ●       │     ●      │   ●●     │      ○
```

●● = primary fit · ● = strong secondary · ○ = mention only when relevant

---

## Choosing a persona for a draft

1. Who will forward this link internally? (founder → Steve; platform lead → Elena; ops lead → Oliver; owner → Sarah)
2. What decision does the post help them make in the next 30 days?
3. Which service page CTA is the honest next step? Link that page once in the conclusion or internal-link zone.

When two personas fit, **write for the primary** and add a short “Also relevant for…” callout only if it does not dilute the opening hook.
