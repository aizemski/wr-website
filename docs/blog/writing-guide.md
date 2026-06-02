# Blog Writing Guide

Standards for White Raven posts: credible for practitioners, extractable for search and AI citations, aligned with [`BRAND.md`](../../BRAND.md) and [`VOICE.md`](../../VOICE.md).

---

## Before you write

1. **Persona** — Pick one primary reader from [personas.md](./personas.md).
2. **Service pillar** — Tie the narrative to one of the four services (see [topics-and-tags.md](./topics-and-tags.md)).
3. **Taxonomy** — Set `personas` (required) and `services` (optional) in frontmatter; file under the correct hub folder (see [publishing.md](./publishing.md)).
4. **Brief** — Working title, 3–5 question H2s, where stats and images are needed.
5. **Research** — Tier 1–3 sources only; no fabricated percentages (use `blog-researcher` agent or manual equivalent).

---

## Article structure

| Section | Guidance |
|---------|----------|
| **Title (H1)** | Specific promise or question; primary keyword near the front |
| **Meta description** | 150–160 chars; include one sourced stat when honest |
| **Introduction** | 100–150 words; hook with a problem + one stat with source |
| **Key Takeaways** | 3–5 bullets after intro; label per persona (see VOICE.md) |
| **Body H2s** | ~60–70% as questions; each opens **answer-first** (40–60 words, stat + source) |
| **H3s** | Substeps, comparisons, checklists; never skip H2 → H4 |
| **Visuals** | Image or chart every 300–500 words; alternate types |
| **FAQ** | 3–5 items; 40–60 word answers; stats where natural |
| **Conclusion** | 100–150 words; takeaways + one soft CTA (contact or relevant service) |

### Answer-first template (each H2)

```markdown
## Why do releases still feel like events?

According to [Source](url), **X%** of teams … (one sentence). The short answer: …
(40–60 words total in the opening paragraph.)

### What to change first

…
```

### Information gain markers

Include **2–3** per post where truthful:

- `[ORIGINAL DATA]` — Your surveys, benchmarks, anonymized delivery metrics
- `[PERSONAL EXPERIENCE]` — White Raven delivery patterns (no client names without approval)
- `[UNIQUE INSIGHT]` — Non-obvious framing backed by cited data

### Citation capsules

After major H2 sections, ensure one **40–60 word** passage that stands alone: claim + number + source — quotable by AI overviews.

---

## Statistics and sources

- Minimum **~8 unique sourced statistics** per ~2,000-word post (scale down for shorter posts proportionally).
- Inline format: `([Source Name](url), year)` or equivalent consistent style.
- Replace any legacy unsourced stats during rewrites.
- Do not cite competitor marketing pages as primary evidence.

---

## Self-promotion and tone

- **Maximum one** White Raven mention in the article body (bio/footer excluded).
- Educational tone; no mid-article “hire us” blocks.
- Challenge misconceptions listed in BRAND.md with evidence.

---

## Anti-AI-slop checklist

- Vary sentence length (mix ~8-word and ~25-word).
- Rhetorical question every ~200–300 words where natural.
- Contractions used naturally.
- Hedging where honest: “in our experience”, “teams often find”.
- **No em dashes** in copy.
- Ban list: see BRAND.md taboo phrases + blog-writer agent list.

---

## Paragraph and sentence limits

| Metric | Target | Hard limit |
|--------|--------|------------|
| Paragraph | 40–80 words | 150 words |
| Sentence | 15–20 words avg | 25–30 (persona-dependent) |
| H2 opening | 40–60 words with stat | — |

---

## Draft markers (for agents)

Use these in markdown drafts before publish:

```markdown
[IMAGE: Description — search terms for stock photo]
[CHART: bar chart — metric comparison — source name]
[INTERNAL-LINK: strangler migration → /services/product-engineering]
```

Remove or replace markers before production publish.

---

## Target length (White Raven)

Long-form posts on this site target **15–20 minute** read time. Reading time uses **200 words per minute** (`getReadingTime` in `src/utils/insights.ts`):

| Read time | Approximate word count (body) |
|-----------|-------------------------------|
| 15 min | 3,000 |
| 18 min | 3,600 |
| 20 min | 4,000 |

Persona and service pillar posts should land in that range: multiple H2/H3 sections, expanded FAQ (6+ items), tables or checklists, and worked examples—not 500-word overviews.

---

## Quality checklist (pre-publish)

- [ ] Primary persona obvious in intro and examples
- [ ] Service pillar clear; tags match `BLOG_TAGS`
- [ ] Every H2 answer-first with sourced stat where applicable
- [ ] No paragraph > 150 words; heading hierarchy H1 → H2 → H3
- [ ] FAQ present (3–5); meta description 150–160 chars
- [ ] ≤ 1 brand mention in body; no taboo phrases; no em dashes
- [ ] 2–3 information gain markers (if applicable)
- [ ] Internal links to relevant `/for` or `/services` pages
- [ ] Hero image generated post-write: file in `src/assets/blog/`, `heroImage` frontmatter valid (see [hero-image.md](./hero-image.md))
- [ ] `pubDate` / optional `updatedDate` correct

---

## Agent workflow (Cursor)

1. Load `BRAND.md` + `VOICE.md` + persona section from this doc.
2. **blog-researcher** — stats, competitor gaps, verified URLs for **inline** images only.
3. **blog-writer** — full draft with markers; save markdown under `src/content/insights/`.
4. **blog-image** — **required after step 3** — read finished post, generate 16:9 hero, save to `src/assets/blog/{slug}.webp`, update `heroImage` frontmatter. See [hero-image.md](./hero-image.md).
5. **blog-seo** — title, meta, headings, links.
6. **blog-reviewer** — brand, persona fit, checklist above (including hero asset).
7. Human edit → [publishing.md](./publishing.md).

Optional global skills (if installed): `/blog write`, `/blog brief`, `/blog seo-check`, `/blog image` — they read root `BRAND.md` / `VOICE.md` automatically. For heroes on this Astro site, prefer the **`blog-image` Cursor agent** so files land in `src/assets/blog/`.

---

## Rewriting existing posts

1. Read full post; preserve genuine practitioner insights.
2. Add answer-first H2 openings and sources for any number claims.
3. Align tags with topic; add FAQ if missing.
4. Set `updatedDate` in frontmatter when materially revised.
