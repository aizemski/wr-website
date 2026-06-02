# Hero image (post-write)

Every published insight needs a **main hero image** in frontmatter (`heroImage`). The image is created **after the article draft is complete**, not during research or first draft.

## When it runs

| Step | Agent / action |
|------|----------------|
| 1–3 | Research → write → save markdown under `src/content/insights/` |
| **4** | **`blog-image`** — read finished post, generate hero, save asset, update frontmatter |
| 5–6 | `blog-seo` → `blog-reviewer` |

Do not skip step 4 for production publishes. Placeholder paths (`blog-placeholder-*.jpg`) are for local dev only until the hero step runs.

## Asset location

| Item | Path |
|------|------|
| Image file | `src/assets/blog/{slug}.{webp\|jpg\|png}` |
| Slug | Filename of the markdown file without extension (e.g. `investor-demo-vs-production-mvp`) |

Create `src/assets/blog/` if it does not exist.

### Frontmatter path (relative to markdown file)

| Article folder | `heroImage` value |
|----------------|-------------------|
| `insights/{persona}/{slug}.md` | `../../../assets/blog/{slug}.webp` |
| `insights/services/{service}/{slug}.md` | `../../../../assets/blog/{slug}.webp` |

`resolveHeroImage()` in `src/utils/blog.ts` resolves by **filename**; the relative prefix must match depth so Astro content validation passes.

Optional: add a short `heroImageAlt` in a comment above the file for the author—article templates use empty `alt` on hero today; prefer descriptive alt when the layout supports it.

## Creative brief (White Raven)

Derive the prompt from the **finished** post:

- Title, meta `description`, primary persona, service pillar
- Dominant H2 theme (problem/outcome, not keyword stuffing)
- Visual mode: **Editorial** or **UI/Web** (tech posts); avoid generic “AI brain” clipart

**Brand-aligned art direction**

- Palette: navy (`#020617` / `#0067FF` accents), clean whites, restrained contrast
- Mood: professional, production-focused, credible B2B software—not stock “handshake” or sci-fi glow
- Composition: 16:9, safe center crop for cards (~1200×630), no embedded text in the image
- No logos, no “White Raven” wordmark in the image (site header carries brand)

**Avoid**

- Literal ravens unless conceptually central to the article
- Busy dashboards with unreadable UI
- Faces of recognizable public figures
- Taboo visual clichés matching BRAND.md copy bans

## Generation methods (try in order)

1. **Cursor `blog-image` agent** (preferred) — uses `GenerateImage` after reading the post; writes into `src/assets/blog/`.
2. **`/blog image` skill** (if `nanobanana-mcp` is configured) — 16:9, Editorial mode; copy output into `src/assets/blog/` and update frontmatter.
3. **Manual** — designer-provided file; same path and frontmatter rules.

If generation fails after retries, keep a placeholder for dev but **block publish** until a real hero exists.

## Orchestrator prompt template

After `blog-writer` saves the file:

```text
Run the blog-image agent on src/content/insights/{path}/{slug}.md.
Generate a 16:9 hero from the completed article, save to src/assets/blog/{slug}.webp,
and update heroImage in frontmatter. Report the final path and alt text.
```

## Quality checks

- [ ] File exists under `src/assets/blog/`
- [ ] Frontmatter `heroImage` points at that file (correct `../` depth)
- [ ] Image matches article topic and persona (not a generic placeholder)
- [ ] `npm run build` succeeds (Astro image pipeline picks up new asset)
- [ ] No page URLs used as `heroImage`—local assets only

See [writing-guide.md](./writing-guide.md) and [publishing.md](./publishing.md).
