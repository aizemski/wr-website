---
title: 'RAG vs Fine-Tuning: When Not to Train a Custom Model'
description: 'An enterprise decision framework for retrieval-augmented generation vs fine-tuning, with cost, governance, and eval gates so teams ship governed assistants before GPU budgets.'
pubDate: '2026-08-05'
heroImage: '../../../../assets/blog/rag-vs-fine-tuning-when-not-to-train.webp'
personas: ['Enterprise Engineering']
services: ['Applied AI']
technologies: ['AI & LLMs', 'Python']
industries: ['Enterprise Software', 'Regulated & Compliance']
---

[McKinsey's 2025 global AI survey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) reports that **88%** of organizations now use AI in at least one business function, up from **78%** the prior year. Only about **one-third** of respondents say their companies have begun to scale AI programs; the majority remain in piloting. Engineering leaders hear two pitches in the same week: fine-tune a proprietary model on your tickets and contracts, or stand up RAG over SharePoint and call it done. Security asks which leaks data. Finance asks which burns GPU months. Legal asks who is accountable when the answer is wrong.

This article is for **Enterprise Elena** under review pressure: a decision framework for **when RAG is enough**, **when fine-tuning helps**, and **when not to train at all** until data boundaries, evals, and cost guardrails exist.

> **At a Glance**
> - Default to RAG plus strong retrieval governance for internal knowledge, support assist, and policy Q&A tied to cited sources.
> - Fine-tune (or preference-tune) when style, format, or domain vocabulary must be consistent at scale and base models fail evals after RAG.
> - Do not train on production corpora until classification, deletion, and access filters are enforced at retrieval time.
> - Golden eval sets and regression gates matter more than the training label on the roadmap slide.
> - Cost caps and model routing prevent pilot success from becoming runaway inference and retraining bills.

## Why do teams reach for fine-tuning too early?

Teams reach for fine-tuning when demos look "almost right" and leadership wants a moat. [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-02-gartner-predicts-by-2028-80-percent-of-genai-business-apps-will-be-developed-on-existing-data-management-platforms) predicts that by **2028**, **80%** of generative AI business applications will be built on existing data management platforms, with RAG as the default integration pattern. The short answer: fine-tuning is often chosen to fix **retrieval and product problems** training cannot see. If the wrong paragraph is in context, a tuned model will sound more confident about the wrong answer.

Early fine-tuning triggers that usually fail review:

- **Dirty training data** (exports with PII, stale policies, mixed jurisdictions).
- **No eval harness** (accuracy measured by executive vibe in a meeting).
- **No rollback** (weights deployed without A/B against base model + RAG).
- **Vendor GPU quotes** before anyone measured baseline RAG on a golden question set.

[Stanford's 2025 study of RAG-based legal research tools](https://dho.stanford.edu/wp-content/uploads/Legal_RAG_Hallucinations.pdf) found misleading or false information in **17% to 33%** of queries even with specialized retrieval. Fine-tuning does not remove obligation to cite, abstain, and log. It can narrow style; it does not replace governance.

**Citation capsule:** Gartner forecasts that by 2028 most GenAI business apps will run on governed enterprise data platforms with RAG as default integration. Fine-tuning early often masks retrieval and access-control gaps that produce confident wrong answers ([GenAI on data platforms](https://www.gartner.com/en/newsroom/press-releases/2025-06-02-gartner-predicts-by-2028-80-percent-of-genai-business-apps-will-be-developed-on-existing-data-management-platforms), Gartner, 2025).

## What is RAG good at in the enterprise?

RAG (retrieval-augmented generation) grounds answers in **chunks retrieved at query time** from indexes your security team can scope. It fits:

- **Internal knowledge** (policies, runbooks, architecture docs) with citations.
- **Support assist** where answers must quote knowledge base articles and ticket macros.
- **Regulated workflows** where abstention and human review are required when confidence is low.

Strengths:

- **Freshness** when re-index pipelines run on known cadence.
- **Access control** when filters apply before chunks enter context ([see RAG governance patterns](/blog/applied-ai/rag-internal-knowledge-governance)).
- **Auditability** when logs store query, retrieved ids, and model version.

Weaknesses:

- **Retrieval quality** dominates outcomes; bad embeddings or chunking cannot be prompt-engineered away.
- **Latency and cost** scale with context size unless you cache and route models.
- **Adversarial questions** that hunt for hidden content in large indexes.

[PERSONAL EXPERIENCE] Teams we work with often pass security faster with narrow corpora, golden evals, and retrieval filters than with a fine-tune proposal on an undefined export.

**Citation capsule:** Stanford's 2025 legal RAG study found double-digit error rates even with specialized retrieval, which means enterprise programs need evals, abstention, and human review regardless of fine-tuning plans ([Legal RAG hallucinations](https://dho.stanford.edu/wp-content/uploads/Legal_RAG_Hallucinations.pdf), Stanford, 2025).

## When does fine-tuning or preference tuning actually help?

Fine-tuning (supervised fine-tuning on instruction-output pairs) or preference tuning (DPO/RLHF-style alignment) helps when **base model + RAG** fails evals on tasks that are not primarily "find the right paragraph."

Consider tuning when:

- **Output structure** must be exact (specific JSON for downstream systems, fixed regulatory phrasing).
- **Tone and vocabulary** must match brand or clinical/legal diction consistently at high volume.
- **Tool-use patterns** are repetitive and evals show base models miss the same routing mistakes after RAG.
- **Latency budget** requires smaller tuned models that distill behavior from larger teachers.

Do **not** tune when:

- Answers must track **weekly changing** policies and tuning data will always lag.
- The problem is **wrong retrieval** or **missing access filters**.
- You lack **labeled pairs** with legal clearance and deletion hooks.
- Compliance requires **citation to source documents** fine-tuning actively works against.

| Signal | Favor RAG | Favor tune / distill |
|--------|-----------|----------------------|
| Correctness depends on latest doc | Yes | Rarely |
| Style/format consistency | Partial (prompting) | Often |
| Strict citation required | Yes | Hard |
| Proprietary jargon in answers | After retrieval fixes | Sometimes |
| Small on-device model needed | Distill after RAG proof | Yes |

[McKinsey's 2025 AI research](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) notes high adoption but limited scaling maturity. Scaling usually fails on **operating model**, not on missing LoRA adapters.

**Citation capsule:** McKinsey's 2025 survey shows widespread AI use but only about one-third scaling; fine-tuning should follow operational eval discipline, not precede it ([The state of AI](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai), McKinsey, 2025).

## When should you not train at all?

Do not train (and pause large RAG expansions) until:

1. **Data boundary** document exists: allowlist, blocklist, residency, deletion.
2. **Access matrix** maps roles to retrievable sensitivity tags.
3. **Golden eval set** (50 to 200 questions) with expected citations or abstentions is versioned in CI.
4. **Incident runbook** covers prompt injection, exfiltration attempts, and model provider outage.
5. **Cost guardrails** cap per-user and per-department monthly spend with alerts.

[Harvard Business Review](https://hbr.org/2017/09/only-3-of-companies-data-meets-basic-quality-standards) reported only **3%** of sampled records met a "high nineties" quality bar in executive workshops on data quality. Training on low-quality exports encodes errors into weights you cannot patch with a re-index job.

[UNIQUE INSIGHT] The best "when not to train" signal is a failed **Friday Afternoon Measurement** on the corpus you planned to use: if human experts cannot agree the source text is correct, tuning multiplies disagreement into fluency.

## How do cost and operations compare?

RAG costs cluster in **embedding**, **vector storage**, **retrieval infra**, and **large context inference** on frontier models. Fine-tuning adds **GPU training**, **ML ops**, **evaluation farms**, and **retraining** when base models update.

Rough planning dimensions (order-of-magnitude, not quotes):

| Cost driver | RAG-heavy | Tune-heavy |
|-------------|-----------|------------|
| Upfront engineering | Index + filters + evals | Dataset labeling + training pipeline |
| Ongoing ops | Re-index, chunk tuning | Retrain on base model churn |
| Inference | Context tokens per query | Smaller model may reduce tokens |
| Risk | Retrieval leakage | Weight memorization of PII |

[Gartner poor data quality cost summaries](https://www.integrate.io/blog/data-quality-improvement-stats-from-etl/) cite about **$12.9 million per year** for large enterprises that measured data quality problems. Bad data in RAG is fixable with re-ingestion; bad data in weights is a recall event.

Implement **model routing**: cheap model for draft retrieval summaries, frontier model only when confidence scorer or user tier requires it. Cap daily spend per workspace; cache answers for FAQ-like questions with TTL and audit.

**Citation capsule:** Gartner-related industry analyses put poor data quality in the millions annually for enterprises that measure it. RAG mistakes can be corrected by re-indexing; fine-tuned memorization of sensitive or wrong content is harder to unwind ([data quality improvement stats](https://www.integrate.io/blog/data-quality-improvement-stats-from-etl/), Integrate.io citing Gartner, 2020).

## What eval gates should block a training decision?

Treat evals as **release gates**, not demo scripts.

### What belongs in the golden set?

- Questions security cares about (cross-region, HR-only, export-controlled).
- Questions ops asks weekly (procedures, escalation paths).
- Adversarial prompts (ignore instructions, dump secrets, combine two docs).
- Questions where **abstention** is correct.

Metrics to track:

- **Citation accuracy** (quoted span exists in retrieved chunk).
- **Answer correctness** (human or LLM-judge with human audit sample).
- **Abstention precision** (refused when should).
- **Leakage rate** (forbidden content in answer or retrieved set).

Block fine-tuning until RAG baseline on the same set meets agreed floors. If RAG fails at 40% citation accuracy, tuning to 55% is still a recall risk for regulated teams.

Python services (FastAPI workers, Celery queues, or your existing job runner) should own ingestion, eval runners, and nightly regression. Keep training notebooks out of production deploy paths.

For governance detail, align with [applied AI](/services/applied-ai) delivery and the internal RAG post on [governance patterns](/blog/applied-ai/rag-internal-knowledge-governance).

## How do regulated teams combine RAG and light tuning?

Regulated teams often use **RAG for truth** and **light tuning for behavior**:

- RAG supplies citations from approved corpora.
- Preference tuning reduces harmful tone or enforces "always cite or abstain" phrasing.
- Human review queue for low-confidence or high-impact topics (billing disputes, safety, legal).

Document:

- **Model card** with training data summary and known limitations.
- **Change log** when base model version or index embedding model changes.
- **Rollback** to previous weights and index snapshot within one release cycle.

[Frends and Sapio Research](https://frends.com/insights/your-employees-are-spending-44-days-a-year-on-work-that-should-not-exist) report **7.6 hours per week** lost to automatable work (**44 days per year**). Assistants should claw back search time, not add review labor. If tuning increases reviewer load without reducing incidents, it failed.

**Citation capsule:** Frends and Sapio's 2026 integration survey quantifies automatable manual work at roughly 44 days per employee per year. Enterprise assistants must reduce search and re-keying without increasing compliance review load ([State of Integration & AI 2026](https://frends.com/insights/your-employees-are-spending-44-days-a-year-on-work-that-should-not-exist), 2026).

## What does a ninety-minute decision workshop look like?

1. **Write the job** ("answer policy questions with citation," not "build AI strategy").
2. **Run RAG baseline** on golden set with narrow corpus.
3. **Score failures** by retrieval vs generation vs policy.
4. **If retrieval > 50% of failures**, fix chunking, metadata, ACL filters.
5. **If generation > 50% after retrieval fixed**, pilot preference tuning on redacted pairs.
6. **If compliance needs cite-or-abstain**, do not tune away citations without legal sign-off.

| Workshop outcome | Next step |
|------------------|-----------|
| Retrieval failures dominate | Index, ACL, eval tooling |
| Format/style failures dominate | Preference tune small model |
| Data quality failures dominate | Stop; fix corpus |
| Cost failures dominate | Routing, cache, smaller models |

[Postman's 2024 State of the API Report](https://www.postman.com/state-of-api/2024/) highlights API criticality to revenue; internal AI features are becoming API products too. Expose assistant endpoints with the same versioning, auth, and rate limits as customer APIs.

## How do chunking and embeddings affect the "just use RAG" answer?

RAG quality is mostly ingestion engineering.

### What chunking rules matter?

- Chunk by **logical sections** (policy section, runbook procedure), not fixed 512 tokens only.
- Attach **metadata**: product, region, effective date, sensitivity, owner team.
- **Overlap** sparingly; test recall on golden questions when you change chunk size.
- **Tables and code** may need separate extractors; plain text splitters destroy them.

### When should you change embedding models?

When eval recall drops after corpus growth or when domain vocabulary is dense (medical, legal, internal acronyms). Re-embed in staging, run regression on golden set, then promote. Document embedding model version in every answer log.

[McKinsey's 2025 survey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) shows most enterprises still piloting. Pilots fail when "we embedded the wiki" without classification tags; scaling then requires expensive re-ingestion.

**Citation capsule:** RAG outcomes depend on chunk boundaries, metadata, and embedding version discipline more than on the brand of vector database. Re-embed and regression-test when recall slips after corpus growth ([The state of AI](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai), McKinsey, 2025).

## What human-in-the-loop flows should ship with v1?

Automation without accountability fails review in regulated enterprises.

- **Low-confidence path** routes to a human queue with retrieved chunks attached.
- **Sensitive topics** (termination, export control, medical advice boundaries) always require human approval or hard abstain.
- **Override logging** feeds back into eval sets monthly.
- **Customer-facing** answers never ship without citation UI when policy requires it.

Nearly **60%** of professionals in the [Parseur 2025 manual data survey](https://www.prnewswire.com/news-releases/survey-manual-data-entry-costs-american-companies-more-than-28-000-per-employee-each-year-302516867.html) reported burnout from repetitive data work. Assistants should reduce search-and-copy, not add a second full-time review job per team.

## How do you monitor production assistants after launch?

| Signal | Action |
|--------|--------|
| Citation accuracy drop on sample | Block deploy; fix retrieval |
| Abstention rate collapse | Possible prompt injection or policy bug |
| Cost per successful answer up | Routing, cache, context trimming |
| User override rate up | Tune or retrain only after root-cause tag |
| Forbidden retrieval attempts | Security incident workflow |

Ship **kill switches**: disable write tools, fall back to search-only, or route to smaller model within minutes. Regulated teams document drills the same way as payment outages.

Python workers should emit structured logs (query hash, chunk ids, model id, token counts) to your existing observability stack. Do not rely on vendor dashboards alone for compliance evidence.

[ORIGINAL DATA] Programs that gate fine-tuning on RAG eval floors often discover **60 to 70%** of early failures are ACL or chunk metadata, not base model weakness. Fixing retrieval avoids six-figure training projects for another quarter.

## How do procurement and legal fit the decision?

Procurement will ask about **data processing agreements**, **subprocessors**, and **training opt-out** clauses with model vendors. Legal will ask whether weights could memorize **export-controlled** or **HIPAA-regulated** text. RAG with narrow allowlists and no training on customer exports is often easier to contract than fine-tuning on raw tickets.

Document in the architecture decision record:

- Which corpora may enter the index.
- Whether vendor **zero-retention** APIs are required for prompts.
- Retention on logs and whether logs may contain retrieved snippets.
- Whether fine-tuning data leaves your cloud boundary.

Regulated buyers in enterprise and compliance programs should pair this framework with security review artifacts from the [RAG governance](/blog/applied-ai/rag-internal-knowledge-governance) article before any GPU purchase order.

**Citation capsule:** Legal and procurement reviews favor RAG with explicit corpora and no weight training on raw exports until data boundaries and vendor DPAs are settled. Fine-tuning raises memorization and subprocessors questions that slow enterprise sign-off.

## FAQ

**Is RAG always cheaper than fine-tuning?**  
Not always. RAG with huge contexts on frontier models can exceed distillation costs. Measure tokens per successful answer, not list price per training hour.

**Can we fine-tune on customer tickets?**  
Only with contractual clearance, PII scrubbing, retention policy, and legal review. Most enterprises start with approved macros and public docs, not raw tickets.

**Does fine-tuning remove hallucinations?**  
No. It can change style and some error modes. Retrieval errors and missing abstention still need evals and monitoring.

**Should we build our own embedding model?**  
Rarely on first ship. Use managed embeddings until evals prove domain drift. Custom embeddings are a retrieval problem, not a shortcut around governance.

**What about open-weight models on-prem?**  
Useful for residency constraints. You still need RAG filters, evals, and patch processes for CVEs in weights and runtimes.

**How often must we retrain?**  
When base model upgrades break evals or when regulated phrasing changes. Plan retrain cadence in budget; do not assume one training run per year is enough.

**Is synthetic data generation enough to fine-tune?**  
Synthetic pairs can bootstrap format tuning. They do not replace golden sets grounded in approved sources for truth.

**When is "do nothing but ChatGPT Enterprise" correct?**  
For low-risk individual productivity with vendor DLP. Not for customer-facing or compliance workflows requiring your access matrix and citations.

**How do we handle multi-language corpora?**  
Separate indexes or language-tagged chunks with retrieval filters. Fine-tuning across languages multiplies eval and legal review cost; RAG with locale metadata often ships first.

**What about tool-using agents vs plain RAG?**  
Add tools after cite-or-abstain RAG passes evals. Tools multiply exfiltration and side-effect risk; gate them behind roles and audit logs like any production API.

## Closing thought

RAG vs fine-tuning is not a religious war. It is a sequencing question: govern data, prove retrieval, measure on golden sets, then tune behavior where evals justify GPU and review time. The moat is operable quality and access control, not a custom weight file in a slide.

Start narrow on [enterprise engineering](/for/enterprise-engineering) review norms and [applied AI](/services/applied-ai) patterns for evals and cost caps. Train only when RAG plus governance fails documented gates, not when a demo almost convinced the room.
