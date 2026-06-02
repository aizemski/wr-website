---
title: 'React 18 Concurrent Migration: An Enterprise Checklist'
description: 'State of JS 2024 shows React still dominates frontends. Use this checklist for createRoot, Suspense, transitions, and streaming without a big-bang rewrite.'
pubDate: '2026-09-02'
heroImage: '../../../assets/blog/react-18-concurrent-migration-checklist.webp'
personas: ['Enterprise Engineering']
services: ['Product Engineering']
technologies: ['React & Next.js', 'JavaScript & TypeScript']
industries: ['Enterprise Software']
---

React 18's concurrent renderer is not a marketing label. It changes how updates interrupt, how loading states compose, and how server components pair with client hydration in Next.js App Router apps. According to the [State of JavaScript 2024 survey](https://stateofjs.com/en-US), **React remains the most used front-end framework** among respondents, with large enterprises still carrying years of class components, legacy context, and custom bundlers beside greenfield routes.

The risk is treating "upgrade React" as a dependency bump. Concurrent features reward apps that already separate urgent from non-urgent updates. They punish apps that render huge trees synchronously and rely on `useEffect` for every data fetch. According to [Chrome Developers' Core Web Vitals guidance](https://developer.chrome.com/docs/performance/understanding-the-metrics), **INP** now sits beside LCP as a core signal for responsive sites. React 18 hooks and Suspense are levers for INP when used with intent, not as checkbox upgrades.

This checklist is for engineering leaders planning an incremental migration without a roadmap freeze. Use it as a release gate document: roots, boundaries, transitions, Next.js alignment, tests, and rollout metrics for each slice.

> **At a Glance**
> - Audit render roots, Strict Mode, and third-party libraries before you flip concurrent on in production.
> - Migrate `ReactDOM.render` to `createRoot`, then introduce Suspense boundaries where data fetching already splits.
> - Use `useTransition` and `useDeferredValue` for search and filters, not as decoration on every click.
> - Align Next.js streaming and React Server Components with your API and cache contracts.
> - Ship behind feature flags with error budgets; measure p95 and support tags per route.
> - Document rollback: flag off, revert deploy, and legacy route still wired at the gateway.

## Why does React 18 concurrent rendering matter for enterprise apps?

According to the [JetBrains Developer Ecosystem 2024](https://www.jetbrains.com/lp/devecosystem-2024/), **JavaScript** remains the most used language among professional developers, with **TypeScript** adoption continuing to climb in large teams. Framework choice increasingly ties to **time-to-interactive** and operational cost, not syntax fashion. The short answer: concurrent rendering lets React **pause, resume, and prioritize** work so typing and navigation stay responsive while heavier trees update in the background.

Enterprise apps feel the difference when:

- **Global filters** re-render thousand-row tables on every keystroke.
- **Dashboard shells** block on slow widgets instead of showing skeleton states.
- **Hydration mismatches** force full client re-renders on marketing or logged-in home pages.
- **Legacy class components** assume synchronous mount/unmount timing.

React 18 does not fix architecture debt automatically. It gives you primitives to **contain** debt while you strangler-migrate route by route. Pair this checklist with incremental modernization patterns on [enterprise engineering](/for/enterprise-engineering) and [product engineering](/services/product-engineering) when you split shells from legacy bundles.

**Citation capsule:** State of JS 2024 confirms React's continued dominance in professional frontends. Concurrent features pay off when teams separate urgent UI updates from heavy data refreshes; bumping the package without boundary design rarely moves Core Web Vitals ([State of JavaScript 2024](https://stateofjs.com/en-US), 2024).

## What should you audit before changing the renderer?

According to [npm trends data on core React packages](https://npmtrends.com/react-vs-vue-vs-angular), download velocity for `react` and `react-dom` stays in the top tier year over year, which means **ecosystem compatibility** matters as much as your code. Audit libraries and roots before production concurrent mode.

### Baseline audit checklist

| Area | What to verify | Failure signal |
|------|----------------|----------------|
| **Entry roots** | Every mount uses `createRoot` | Legacy `ReactDOM.render` warnings |
| **Strict Mode** | Enabled in dev staging | Double-invoke effects surfacing missing cleanup |
| **Libraries** | Data grid, maps, editors document React 18 support | Ref access warnings, broken batching |
| **Effects** | Data fetch moving to routers/loaders | Waterfalls and layout shift |
| **Tests** | RTL tests await async UI | Flaky tests after upgrade |
| **SSR / RSC** | Server and client component boundaries documented | Hydration errors in error tracker |

Run the audit on **one production-like route** first: heaviest table, richest editor, or most visited settings page.

[PERSONAL EXPERIENCE] Teams we work with often find **one unmaintained root** in an admin micro-frontend or legacy iframe blocking the whole program until it is migrated or isolated.

## How do you migrate from ReactDOM.render to createRoot?

The [React 18 upgrade guide](https://react.dev/blog/2022/03/29/react-v18) states that `createRoot` enables concurrent features and is the supported entry API. Treat root migration as **sprint zero**, not a side task.

### Step-by-step root migration

1. **Inventory mounts** across shell apps, micro-frontends, and Storybook environments.
2. **Replace** `ReactDOM.render(<App />, el)` with `createRoot(el).render(<App />)`.
3. **Enable Strict Mode** in non-production first; fix effect cleanup and deprecated APIs.
4. **Smoke test** authentication flows, modals, and portals (they share the root tree).
5. **Deploy** behind a flag if multiple roots release independently.

### What breaks most often at this stage?

- **i18n and datetime providers** that assumed single mount timing.
- **Third-party widgets** that patched DOM outside React's tree.
- **Global CSS** relying on synchronous paint before hydration completes.

Document each break in a shared migration log so parallel teams do not rediscover the same library.

## Where should Suspense boundaries live?

According to [Google's web.dev guidance on user-centric metrics](https://web.dev/articles/vitals), **Interaction to Next Paint (INP)** and **Largest Contentful Paint (LCP)** reward progressive rendering. Suspense is how React 18 exposes that progress in component trees.

Place boundaries where **independent data regions** can fail or load without freezing the shell:

- Route-level layouts for Next.js App Router segments.
- Widget cards on dashboards (each card owns its async child).
- Heavy charts or maps below the fold, not around the entire page.

Anti-patterns:

- One boundary around the whole app (masks which widget failed).
- Suspense without error boundaries (users stare at spinners forever).
- Fetching inside child components without shared cache keys (duplicate requests).

### Server Components vs client Suspense

In Next.js, default **Server Components** fetch on the server; client components use Suspense for browser-only data. Draw a line: server fetches authoritative records; client fetches personalization or live metrics that cannot run on the server.

[CHART: Grouped bar - Time to interactive before vs after route-level Suspense on enterprise dashboard (illustrative ranges; validate in your RUM) - source: web.dev Core Web Vitals guidance]

**Citation capsule:** web.dev documents INP and LCP as user-centric success metrics. Suspense boundaries align React trees with those metrics when each region loads independently instead of blocking the shell ([Core Web Vitals](https://web.dev/articles/vitals), Google, ongoing).

## When should you use useTransition and useDeferredValue?

According to [Deloitte's 2024 enterprise software trends](https://www2.deloitte.com/us/en/pages/consulting/articles/tech-trends.html), **AI-assisted development** and legacy modernization run in parallel at most large enterprises. Concurrent hooks are modernization tools, not mandatory sprinkles.

### useTransition: user-initiated navigation and filters

Use `startTransition` when the UI should **stay responsive** while a expensive re-render or fetch runs:

- Typing in global search that filters large lists.
- Switching tabs that mount heavy subtrees.
- Applying facet filters on catalog or admin grids.

Do not wrap every `setState`. Urgent updates (text input caret, button pressed state) should stay outside the transition.

### useDeferredValue: derived views of fast-changing state

`useDeferredValue` helps when a child tree is expensive and props lag slightly behind input is acceptable (preview panes, secondary summaries). Pair with memoized children to avoid wasted work.

### Measurement

Track **INP** and **input delay** on filtered views before and after. If p95 latency rises, the transition may be hiding duplicate fetches, not fixing them.

[UNIQUE INSIGHT] Teams that sprinkle transitions without removing **synchronous JSON.parse of huge payloads** on every keystroke often see no gain. Fix data volume first, then prioritize rendering.

## How does this checklist map to Next.js App Router?

According to the [Next.js 15 release blog](https://nextjs.org/blog/next-15), the framework continues to tighten defaults around caching, React 19 readiness, and server/client boundaries. Enterprise programs on Next 13+ should align three contracts:

| Contract | Owner | Migration note |
|----------|-------|----------------|
| **Route segments** | Platform team | One layout per major product area; avoid mega-layouts |
| **Cache tags / revalidation** | Backend + frontend | Document stale times per entity |
| **Client bundle budget** | Feature squads | `"use client"` only where interaction required |

### Streaming HTML and nested Suspense

Enable streaming for marketing and logged-in home routes where LCP elements are static but personalized rails are slow. Nest Suspense so the **hero ships first**, widgets stream second.

### Parallel routes and intercepting modals

Parallel routes help enterprise patterns (inbox + detail, catalog + preview). Migrate one modal-heavy flow first; verify deep links and back-button behavior with integration tests.

## What testing and observability do you need?

According to [Datadog's 2024 state of observability report](https://www.datadoghq.com/state-of-observability/), **high-maturity teams** correlate frontend signals with backend traces more often than low-maturity peers. React 18 migrations need the same correlation.

Minimum bar before raising traffic:

- **Error tracking** tagged with `react_version`, route, and `suspense` boundary name.
- **Real User Monitoring** on INP, LCP, and JS error rate for migrated routes.
- **Synthetic checks** for login, checkout or submit, and top admin list views.
- **Bundle analysis** in CI when client components grow.

### Test pyramid adjustments

- Component tests: await `findBy` patterns, not only `getBy`.
- Integration: MSW or contract tests for loaders and actions.
- E2E: one happy path and one slow-third-party path per migrated route.

## How do you roll out without freezing the roadmap?

According to [Gartner's 2024 legacy modernization research](https://www.gartner.com/en/newsroom/press-releases/2024-10-22-gartner-forecasts-worldwide-it-spending-to-grow-9-8-percent-in-2025), **IT spending** continues to rise while teams are pushed to deliver feature work alongside debt reduction. Successful React 18 programs **pair** migration slices with product outcomes.

### Rollout pattern

| Phase | Scope | Success metric |
|-------|-------|----------------|
| **0** | Roots + Strict Mode in staging | Zero critical effect loops |
| **1** | One low-risk route (settings, profile) | Error parity with legacy |
| **2** | Dashboard card Suspense | INP improved or flat |
| **3** | Search / filter transitions | Support tickets stable |
| **4** | Retire legacy bundle for that slice | Traffic 100% on modern 30 days |

Use feature flags for **traffic percentage**, not for hiding untested work. Rollback must be practiced: flag off, revert deploy, gateway route to legacy within minutes.

Report to leadership in **outcomes**: INP on top flows, incident count, and features shipped on modern routes, not "percent of files migrated."

## How do you split legacy bundles during a concurrent migration?

According to [HTTP Archive's 2024 JavaScript analysis](https://httparchive.org/reports/state-of-javascript), median JavaScript bytes on mobile pages remain high enough that **bundle discipline** still affects INP even after React 18. Concurrent features do not shrink bundles by themselves.

Practical split strategy:

1. **Identify shared vendors** (design system, data grid) and pin one version in the modern shell.
2. **Lazy-load** legacy routes behind the router until their slice migrates.
3. **Measure** with source-map explorer in CI when client components grow.
4. **Delete dead exports** when traffic hits 100% on modern for 30 days.

Micro-frontend programs should migrate **one remote at a time** to `createRoot`, not wait for all teams to align on a single release train.

### Library compatibility matrix (sample)

| Library class | React 18 note | Action |
|---------------|---------------|--------|
| Data grids | Verify batching with transitions | Load test filter paths |
| Maps | Often imperative; wrap in client-only | Avoid SSR mismatch |
| Rich text | Heavy; isolate in client island | Suspense + error boundary |
| Charts | Canvas timing vs concurrent paint | Defer until visible |

[PERSONAL EXPERIENCE] The costliest delay is often a **single unmaintained grid license** blocking Strict Mode fixes while three other routes were production-ready.

## What operating model keeps squads aligned?

According to [McKinsey's 2024 developer productivity research](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/unleashing-developer-productivity-with-generative-ai), platform teams that publish **golden paths** see faster adoption than mandate-only upgrades. For React 18, publish:

- A **migration log** template (root, route, owner, status).
- A **Suspense cookbook** with approved layout patterns.
- **Performance budgets** per route (JS KiB, INP p75).
- Office hours twice weekly during the first quarter of the program.

Squads own feature work; platform owns roots, shared lint rules, and observability tags. Security reviews **server component data boundaries** once per program, not per button.

According to [Stack Overflow's 2024 developer survey](https://survey.stackoverflow.co/2024/), **professional developers** increasingly expect AI-assisted coding tools, which can accelerate migrations but also introduce inconsistent patterns. Enforce eslint rules for hooks and `"use client"` placement so generated code does not sprawl.

**Citation capsule:** McKinsey's 2024 productivity research links golden paths to faster adoption of new engineering practices. React 18 programs need shared migration logs and performance budgets, not a single big-bang training deck ([Developer productivity with generative AI](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/unleashing-developer-productivity-with-generative-ai), McKinsey, 2024).

## FAQ

**Is React 18 a breaking change for class components?**  
Most class components run, but lifecycle assumptions and third-party refs need audit. Plan time for Strict Mode double-invoke issues in dev.

**Do we need React 19 to get concurrent benefits?**  
No. React 18 delivers concurrent rendering and transitions. Align Next.js and library versions with your LTS policy separately.

**Will Suspense fix slow APIs?**  
No. It improves perceived performance and composition. Slow APIs still need caching, pagination, or backend fixes.

**Can we migrate Create React App shells inside a micro-frontend program?**  
Yes. Isolate roots per micro-frontend; migrate the shell last so shared dependencies do not block squad progress.

**How long should a first slice take?**  
One to three sprints for a single route or dashboard region, including tests and observability, not a year for the first user-visible win.

**Does Strict Mode belong in production builds?**  
Enable in development and staging always. Production Strict Mode is optional; focus on fixing effect hygiene discovered in dev.

**What about React Server Components security?**  
Treat server components as server code: auth at data boundaries, no secrets in client bundles, audit third-party server packages.

**When should we stop and refactor instead of migrate?**  
If a route's bundle is unmaintained and untested, migrating in place may cost more than replacing the slice behind the same URL with a smaller App Router segment.

## How do design systems and tokens interact with concurrent UI?

Design systems reduce rerender cost when primitives are stable. According to [Figma's 2024 state of the design systems report](https://www.figma.com/blog/state-of-design-systems-2024/), teams with mature systems ship UI faster with fewer one-off styles. For React 18, that means:

- Memoize expensive list items when transitions wrap filters.
- Avoid passing new object literals through context on every keystroke.
- Load design tokens once; do not recompute theme objects per render.

Storybook environments should use the same `createRoot` path as production so Strict Mode issues surface in design review, not only in QA.

## What errors should you expect in hydration and RSC logs?

According to [Sentry's 2024 JavaScript error trends report](https://sentry.io/resources/javascript-report-2024/), hydration mismatches and third-party script failures remain top frontend error categories. React 18 plus RSC adds new log signatures teams should tag in the tracker:

- **Text content mismatch** between server HTML and client render.
- **Hydration failed** when browser extensions modify DOM before React attaches.
- **Invalid hook call** when duplicate React copies load across micro-frontends.
- **Suspense boundary** without matching error boundary (infinite spinner incidents).

Run a weekly triage during migration: group by route, fix top two causes before expanding traffic. Extensions and marketing tags are frequent culprits on logged-in home pages.

### Accessibility during migration

Concurrent rendering should not regress focus management. Test keyboard paths on modals and comboboxes after Suspense splits. According to [WebAIM's 2024 million-page study](https://webaim.org/projects/million/), a large share of home pages still fail basic accessibility checks; enterprise apps are not exempt. Include axe or equivalent checks in CI for migrated routes.

## Closing thought

React 18 concurrent features reward disciplined UI architecture: clear roots, bounded Suspense, intentional transitions, and honest measurement. They do not replace strangler planning, contract tests, or API performance work.

Run the audit, migrate roots, pick one route that hurts users today, and ship behind flags with rollback drilled. Expand only where error budgets and INP hold. That is how enterprise teams modernize JavaScript without telling product to wait a year.

For program structure and gateway patterns alongside this checklist, see [enterprise engineering](/for/enterprise-engineering) and [product engineering](/services/product-engineering) for how incremental slices stay on the roadmap.

**Next step:** Pick the route with the worst INP or the noisiest support tags. Run the root audit and Suspense sketch this sprint, even if the feature freeze is tight. One measurable win beats a quarter of dependency slides.

Keep a living **migration scorecard** in the repo: route name, traffic percent on modern, last eval date, open risks. Review it in the same forum as release planning so concurrent React work stays funded next to product milestones. Scorecards beat slide decks when executives ask what shipped on modern this quarter.
