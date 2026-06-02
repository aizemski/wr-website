# White Raven Insights Documentation

Guides for humans and AI agents writing content for the site. Articles live in **`src/content/insights/`** with persona- and service-specific hub pages—not a single flat `/blog` list.

## Hub URLs

| Hub | URL |
|-----|-----|
| All insights | `/insights/` |
| Startup founders | `/insights/startup-founders/` |
| Enterprise engineering | `/insights/enterprise-engineering/` |
| Operations leaders | `/insights/operations-leaders/` |
| Small business | `/insights/small-business/` |
| Product engineering (service) | `/insights/services/product-engineering/` |
| Applied AI (service) | `/insights/services/applied-ai/` |
| Workflow automation (service) | `/insights/services/workflow-automation/` |
| Cloud & DevOps (service) | `/insights/services/cloud-architecture/` |
| Technology (e.g. React & Next.js) | `/insights/technologies/react-nextjs/` |
| Industry (e.g. Field & Offline Operations) | `/insights/industries/field-operations/` |

Full taxonomy: [topics-and-tags.md](./topics-and-tags.md). Legacy `/blog` URLs redirect via `astro.config.mjs`.

## Doc index

| Doc | Purpose |
|-----|---------|
| [Personas](./personas.md) | Buyer personas, pains, voice |
| [Topics & taxonomy](./topics-and-tags.md) | `personas` / `services` fields and filing rules |
| [Writing guide](./writing-guide.md) | Structure, length, checklist |
| [Hero image](./hero-image.md) | Post-write main image generation |
| [Publishing](./publishing.md) | Frontmatter, folders, build |

## Canonical brand files (project root)

- [`BRAND.md`](../../BRAND.md)
- [`VOICE.md`](../../VOICE.md)

## Cursor agents

| Agent | Role |
|-------|------|
| `blog-researcher` | Stats, gaps, inline image URLs |
| `blog-writer` | Full draft → save under `src/content/insights/` |
| **`blog-image`** | **Hero image after draft** → `src/assets/blog/` + frontmatter |
| `blog-seo` | On-page SEO |
| `blog-reviewer` | Quality gate |

Point drafts at the `insights` collection and `src/utils/insights.ts` for URLs.
