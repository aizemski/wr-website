# Voice Context — White Raven

> Auto-loaded by blog agents and skills. Last updated: 2026-06-02.

## Pronoun stance

Mixed: **second-person (“you”)** for advice and pain points; **first-person plural (“we”)** sparingly for delivery experience (`[PERSONAL EXPERIENCE]`). Avoid salesy “we’re the best”; prefer “teams we work with often see…”.

## Lexical rules

- **Contractions**: Partial — use naturally (“it’s”, “don’t”, “you’ll”) but not in every sentence.
- **Sentence ceiling**: 25 words default (professional tier); 30 max for deeply technical sections.
- **Paragraph ceiling**: 150 words hard max; target 40–80 words.
- **Summary label**: `Key Takeaways` (Startup Steve / Operations Oliver); `What You'll Learn` for tutorial-style posts; `At a Glance` for executive-skimmable Enterprise Elena pieces.

## Headline patterns

- **Favor**: Question H2s (~60–70%), concrete promises (“How to … without …”), numbers when honest (“3 signs your MVP is demoware”).
- **Avoid**: Clickbait (“You won’t believe…”), vague “Everything you need to know”, puns that obscure the topic.

## Voice fingerprint (default — override per persona in `docs/blog/personas.md`)

- Funny vs serious: **0.75** (mostly serious, occasional dry clarity)
- Formal vs casual: **0.55** (professional but conversational)
- Respectful vs irreverent: **0.85** (respectful; challenge ideas, not readers)
- Enthusiastic vs matter-of-fact: **0.60** (grounded enthusiasm; no hype)

## Readability target

- **Audience tier**: Professional (engineering and ops leaders)
- **Flesch Grade**: 8–10
- **Flesch Ease**: 55–65
- **Sentence target**: 15–20 words average; vary length for rhythm.

## Persona quick picks

| Persona | Summary label | Grade | Tone shift |
|---------|---------------|-------|------------|
| Startup Steve | Key Takeaways | 7–8 | Faster pace, runway and traction language |
| Enterprise Elena | At a Glance | 8–10 | Risk, compliance, incremental migration |
| Operations Oliver | Key Takeaways | 7–8 | Plain ops vocabulary, adoption-first |
| Small Business Sarah | What You'll Learn | 6–8 | Jargon-light, cost and time saved |

## Reference samples

- Existing posts in `src/content/insights/` — practitioner tone, minimal self-promotion.
- Audience pages: `/for/startup-founders`, `/for/enterprise-engineering`, `/for/operations-leaders`, `/for/small-business`.
- Service pages under `/services/*` for outcome language and pain points.

## Anti-patterns (enforce in review)

- Zero em dashes in published copy.
- Max **one** brand mention in article body (author bio aside).
- Educational tone; no promotional CTAs mid-article.
- Every statistic: named source + year in inline citation format.
