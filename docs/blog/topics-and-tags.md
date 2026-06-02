# Insights Taxonomy

Articles use four dimensions. Each label links to a **dedicated hub** (tags are not filter-only).

## Personas (audience)

| Label | Hub |
|-------|-----|
| Startup Founders | `/insights/startup-founders/` |
| Enterprise Engineering | `/insights/enterprise-engineering/` |
| Operations Leaders | `/insights/operations-leaders/` |
| Small Business | `/insights/small-business/` |

## Services

| Label | Hub |
|-------|-----|
| Product Engineering | `/insights/services/product-engineering/` |
| Applied AI | `/insights/services/applied-ai/` |
| Workflow Automation | `/insights/services/workflow-automation/` |
| Cloud & DevOps | `/insights/services/cloud-architecture/` |

## Technologies

| Label | Hub |
|-------|-----|
| React & Next.js | `/insights/technologies/react-nextjs/` |
| JavaScript & TypeScript | `/insights/technologies/javascript-typescript/` |
| Python | `/insights/technologies/python/` |
| AWS & Serverless | `/insights/technologies/aws-serverless/` |
| AI & LLMs | `/insights/technologies/ai-llms/` |
| CI/CD & DevOps | `/insights/technologies/cicd-devops/` |
| Data & ETL | `/insights/technologies/data-etl/` |

## Industries

| Label | Hub |
|-------|-----|
| Startups & SaaS | `/insights/industries/startups-saas/` |
| Enterprise Software | `/insights/industries/enterprise-software/` |
| Field & Offline Operations | `/insights/industries/field-operations/` |
| SMB & Professional Services | `/insights/industries/smb-professional-services/` |
| Regulated & Compliance | `/insights/industries/regulated-compliance/` |

## Frontmatter

```yaml
personas: ['Startup Founders']          # required, min 1
services: ['Product Engineering']     # optional
technologies: ['React & Next.js']       # optional
industries: ['Startups & SaaS']       # optional
```

Enums live in `src/constants/insights-taxonomy.ts` (validated by `src/content.config.ts`).

## Tag colors (UI)

- **Persona & service** — blue (audience / offering)
- **Technology** — green (stack)
- **Industry** — amber (market context)

## Filing content

- Persona-led article → `src/content/insights/{persona-slug}/`
- Service-led article → `src/content/insights/services/{service-slug}/`

Set all relevant `personas`, `services`, `technologies`, and `industries` so the article appears on every matching hub.
