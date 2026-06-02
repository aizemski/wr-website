# Brand Context — White Raven

> Auto-loaded by blog agents and skills. Last updated: 2026-06-02.

## Audience

- **Primary**: Engineering and operations leaders at startups, mid-market companies, and enterprises who buy custom software (not off-the-shelf SaaS templates).
- **Secondary**: Startup founders without a full in-house team; small business owners digitizing manual workflows.
- **Expertise**: Mixed — posts may be practitioner-level (React, AWS) or outcome-focused (MVP speed, compliance, field ops). Match depth to the persona in `docs/blog/personas.md`.
- **Active problems**:
  - Ship an MVP or modernize legacy apps without a costly rewrite or roadmap freeze.
  - Integrate AI/LLMs where they improve workflows, not as demo fluff.
  - Replace spreadsheets, paper, and re-keying with portals, PWAs, and reliable pipelines.
  - Harden AWS/serverless, CI/CD, and observability so releases and incidents are predictable.
- **Common misconceptions**:
  - “We need a big-bang rewrite to modernize.” (Incremental strangler patterns work.)
  - “AI means we need a custom model day one.” (PoCs, RAG, and API integrations often win first.)
  - “No-code or cheapest freelancers are enough until Series A.” (Technical debt shows up in hiring cost and investor demos.)
  - “Serverless is always cheaper.” (Right-sizing and architecture matter more than the label.)

## Positioning

- **Mission**: White Raven helps teams ship production-ready software—MVPs, modernized platforms, applied AI, workflow automation, and cloud/DevOps—so business outcomes improve, not just repos grow.
- **Distinctive POV**: Outcomes and adoption beat feature lists. We scope AI, cloud, and automation to what operators and engineers will actually run in production.
- **What we are NOT**: A generic dev shop listing technologies; a hype-driven “AI transformation” vendor; a body-shop that hands off unmaintainable throwaway prototypes; a one-size-fits-all SaaS reseller.
- **Competitors** (positioning lines — verify before citing in posts):
  - Large consultancies: We ship incremental, in-place modernization without freezing the roadmap for a multi-year program.
  - Offshore body shops: Senior engineers, direct access, and architecture chosen for your next hire—not ticket throughput.
  - No-code / low-code platforms: Custom portals and PWAs when your process does not fit a vendor template.

## Editorial Rules

### Always do

- Lead with the reader’s problem (runway, compliance, field sync, release risk) before stack names.
- Tie capabilities to service pillars: Product Engineering, Applied AI, Workflow Automation, Cloud & DevOps.
- Use sourced statistics for claims; name Tier 1–3 sources with year and link.
- Prefer answer-first sections: direct answer in the first 40–60 words under each H2.
- Link internally to `/for/*` audience pages and `/services/*` when relevant (max one subtle brand mention in body; see `VOICE.md`).
- Use `personas`, `services`, `technologies`, and `industries` from `src/content.config.ts` only.
- Publish under the correct insights hub path (see `docs/blog/publishing.md`).

### Never do

- Publish unsourced or rounded “industry standard” percentages.
- Use fear-mongering or guaranteed ROI language.
- Stuff keywords or write listicles with no practitioner insight.
- Name clients without permission; invent case studies or metrics.
- Contradict live site copy on services or audience pages without updating those pages too.

### Taboo phrases

- “In today’s digital landscape”, “game-changer”, “revolutionize”, “seamlessly”, “cutting-edge”, “harness the power of”
- “Leverage” as a verb (prefer “use”, “apply”, “build on”)
- “Dive into”, “navigate the landscape”, “it’s important to note”
- Em dashes (—) in prose — use commas, hyphens, colons, or split sentences
- Empty superlatives: “world-class”, “best-in-class”, “industry-leading” without proof

### Required disclosures

- If citing White Raven project experience, label it `[PERSONAL EXPERIENCE]` or “In our delivery work…” without naming clients unless approved.
- Affiliate or partner links: disclose relationship in the post footer.
- AI-assisted drafts: follow internal review before publish; no claim of human-only authorship if policy requires disclosure.

## Topic Scope

- **In scope**: MVP delivery, React/Next.js modernization, GraphQL/REST APIs, LLM PoCs and RAG, ML in production, PWAs and offline ops, ETL/scraping, dashboards, AWS serverless, CI/CD, IAM/compliance basics, observability, digital transformation for ops and engineering leaders.
- **Partial scope**: Generic career advice, vendor fanboy posts, pure crypto/Web3, consumer apps unrelated to B2B delivery.
- **Out of scope**: Politics, unrelated lifestyle content, unsupported legal/tax advice, competitor hit pieces.
- **Recurring formats** (optional): “Field notes” (ops/automation lessons), “Ship log” (MVP → production patterns), “Architecture clinic” (incremental modernization).

## Services ↔ Content Map

| Service pillar | Primary personas | Example angles |
|----------------|------------------|----------------|
| Custom Product Engineering & Modernization | Startup Steve, Enterprise Elena | MVP scope, strangler migrations, API contracts, test strategy |
| Applied AI & Machine Learning | Startup Steve, Operations Oliver | LLM PoCs, RAG for internal search, data quality automation |
| Workflow Automation & Custom Portals | Operations Oliver, Small Business Sarah | PWAs, ETL, reporting automation, adoption |
| Cloud Architecture & DevOps Consulting | Enterprise Elena, Startup Steve | Serverless patterns, CI/CD, IAM, CloudWatch |

See `docs/blog/personas.md` and `docs/blog/topics-and-tags.md` for persona voice and topic matrices.
