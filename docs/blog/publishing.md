# Publishing Insights (Astro)

Articles live in **`src/content/insights/`**, organized by audience or service hub—not a flat `/blog` folder.

## Content folders

| Path | URL pattern |
|------|-------------|
| `insights/startup-founders/*.md` | `/insights/startup-founders/{slug}/` |
| `insights/enterprise-engineering/*.md` | `/insights/enterprise-engineering/{slug}/` |
| `insights/operations-leaders/*.md` | `/insights/operations-leaders/{slug}/` |
| `insights/small-business/*.md` | `/insights/small-business/{slug}/` |
| `insights/services/product-engineering/*.md` | `/insights/services/product-engineering/{slug}/` |
| `insights/services/applied-ai/*.md` | `/insights/services/applied-ai/{slug}/` |
| `insights/services/workflow-automation/*.md` | `/insights/services/workflow-automation/{slug}/` |
| `insights/services/cloud-architecture/*.md` | `/insights/services/cloud-architecture/{slug}/` |

Hub index pages: `/blog/`, `/blog/{tag}/`. Legacy `/insights/*` URLs redirect via `astro.config.mjs`.

## Hero image (required before publish)

Generated **after** the article is written—not during research.

| Step | Detail |
|------|--------|
| When | After `blog-writer` saves the markdown |
| Agent | `blog-image` (see [hero-image.md](./hero-image.md)) |
| Asset | `src/assets/blog/{slug}.webp` (or `.jpg` / `.png`) |
| Frontmatter | See depth table in [hero-image.md](./hero-image.md) |

Placeholders (`blog-placeholder-*.jpg`) are for local dev until the hero step completes.

## Frontmatter template

```yaml
---
title: 'Post Title'
description: '150–160 character meta description.'
pubDate: '2026-06-02'
heroImage: '../../../assets/blog/your-post-slug.webp'
personas: ['Startup Founders']
services: ['Product Engineering']
technologies: ['React & Next.js', 'JavaScript & TypeScript']
industries: ['Startups & SaaS']
---
```

For files under `insights/services/...`, use **four** levels: `heroImage: '../../../../assets/blog/your-post-slug.webp'`.

Replace `your-post-slug` with the markdown filename (without extension). The `blog-image` agent sets this automatically after generation.

### Personas (required, 1+)

From `INSIGHT_PERSONAS` in `src/content.config.ts`:

- `Startup Founders`
- `Enterprise Engineering`
- `Operations Leaders`
- `Small Business`

### Services (optional)

- `Product Engineering`, `Applied AI`, `Workflow Automation`, `Cloud & DevOps`

### Technologies (optional)

- `React & Next.js`, `JavaScript & TypeScript`, `Python`, `AWS & Serverless`, `AI & LLMs`, `CI/CD & DevOps`, `Data & ETL`

### Industries (optional)

- `Startups & SaaS`, `Enterprise Software`, `Field & Offline Operations`, `SMB & Professional Services`, `Regulated & Compliance`

All tags link to hub pages. See [topics-and-tags.md](./topics-and-tags.md).

## Local development

```bash
npm run dev
```

Preview hubs and articles at `/blog/...`. Run `npm run build` before merge.

### Scheduled posts (`pubDate` in the future)

Articles with a **future** `pubDate` are hidden from the blog index, tag hubs, RSS, and article routes until that date (UTC calendar day). Listing and static paths use `filterPublishedInsights()` in `src/utils/insights.ts`.

On a static deploy, a post goes live on the **first build on or after** its `pubDate`. Schedule CI or redeploys accordingly, or set `pubDate` to today when you want immediate visibility.

## Related code

| File | Role |
|------|------|
| `src/content.config.ts` | `insights` collection schema |
| `src/utils/insights.ts` | URLs, hubs, filters, reading time |
| `src/pages/blog/**` | Hub and article routes |
| `src/components/InsightCard.astro` | Card UI |
