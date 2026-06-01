# Plan: Fix production 404s and slow image UX

## Issue 1 — Diagnosis: why prod 404s, but preview works

The current `src/config/images.ts` uses:

```ts
import.meta.glob('/public/images/projects/**/*.{webp,jpg,...}', { eager: true })
```

and then derives runtime URLs by hand:

```ts
'/' + key.replace(/^\/public\//, '').split('/').map(encodeURIComponent).join('/')
```

Three things conspire to break this in the published build:

1. `**/public` is not part of Vite's module graph.** Globbing into `/public` is explicitly discouraged by Vite. In dev the filesystem scan happens to work, so the preview iframe is fine. In the production build the glob can return an **empty record** (or a partial one, depending on Vite/Rollup version), so `buckets[id].bento['high-performance-teams']` ends up empty and the registry silently falls back to stock — except for categories where we *do* keep a synthetic entry, and there we end up emitting URLs that were never copied into `dist/` with the right casing.
2. **Double/Won't-match encoding.** Filenames like `Portfolio_Glauber Matias Leadership Academy_High Performance Teams (01).webp` get `encodeURIComponent`'d per segment. That's correct for a browser request, but if the file on disk in `dist/images/...` keeps the literal spaces/parentheses, the static host still serves it; if any deploy step normalizes filenames (lowercasing, stripping parens) the encoded URL no longer matches. We have no guarantee of byte-for-byte filename preservation through `/public` in production.
3. **No build-time failure signal.** Because we wrap everything in stock fallbacks, a missing asset never throws — it just 404s at runtime in the new tab.

Net effect: preview = dev server reads disk directly, looks fine. Published build = glob/URL pair doesn't line up with what actually shipped → 404.

## Issue 1 — Fix: put the images inside the module graph

Stop globbing `/public`. Move the project image tree to `src/assets/projects/...` (mirroring the same `header / carousel / before-and-after / bento-grid/<category>` structure) and rewrite the discovery to:

```ts
const FILES = import.meta.glob(
  '/src/assets/projects/**/*.{webp,jpg,jpeg,png}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;
```

Why this fixes prod:

- Every asset is now a real module. Rollup hashes it, copies it to `dist/assets/`, and the value Vite hands us is the **final, deploy-safe URL** — no hand-rolled `encodeURIComponent`, no `/public/` stripping, no filename drift.
- Missing folders return `{}` deterministically in both dev and build, so the stock-fallback branch behaves identically in both environments.
- Card images get the same treatment under `src/assets/project-cards/...`.

Keep the existing bucketing logic (`header`, `carousel`, `beforeAfter`, `bento[category]`, `card`) and the `BENTO_META` ordering — only the source of the URL changes. Stock Unsplash fallbacks stay untouched.

Cleanup:

- `Delete the ENTIRE \`/public/images `tree. Migrate` /public/images/about `and` /public/images/homepage `to` src/assets/images `as well to maintain structural consistency.`
- Remove the `img()` + `keyToUrl()` helpers and the `projectPaths()` export if nothing else consumes them.

## Issue 2 — Fix: instant skeletons, non-blocking text

Typography is already independent (fonts loaded via CSS, no JS gate). The work is purely on the image pipeline.

1. **Reserve layout up front.** Every bento tile and carousel slide already has a fixed aspect-ratio container — confirm and standardize via `aspect-[w/h]` so the skeleton has real dimensions on first paint (no CLS, skeleton visible at t=0).
2. **Harden `SmartImage`:**
  - Render the `animate-pulse` skeleton as a sibling that fills the parent (parent must be `relative` — assert in the component or wrap defensively).
  - Use `onLoad` AND `onError` to clear the skeleton (already done) and add a `useEffect` that flips `loaded` to true synchronously if `img.complete` is already truthy (covers cache hits where `onLoad` may not fire).
  - Add `decoding="async"` by default; allow override.
3. **Loading strategy:**
  - Hero / first header image: `loading="eager"`, `fetchpriority="high"`, plus a `<link rel="preload" as="image">` in `index.html` for the LCP candidate per project page (or via a `<Helmet>`-style head update on `ProjectDetailPage`).
  - Bento / carousel / below-the-fold: `loading="lazy"`, `decoding="async"`, `fetchpriority="low"`.
4. **Bundle hygiene:** because images now flow through Rollup, they'll be content-hashed and long-cached automatically; no extra config needed. Optionally add `vite-imagetools` later for AVIF/WebP variants, but it is **not** required to ship this fix.
5. **Typography guarantee:** no change. All `<img>` work is below the fold or wrapped in `SmartImage`, which never blocks render. Fonts continue to load via the existing CSS pipeline with `font-display: swap` (verify in `index.css`; flag if missing — independent fix).

## Step-by-step execution order

1. `Create mirrors for the ENTIRE image architecture in \`src/assets/images `(including projects, project-cards, homepage, and about). Move all existing files from` /public/images `to` src/assets/images`.`
2. Rewrite the two `import.meta.glob` calls in `src/config/images.ts` to target `/src/assets/...` with `{ eager: true, query: '?url', import: 'default' }`. Remove `img()`, `keyToUrl()`, and the `/public/` strip logic. Keep bucketing, sorting, `BENTO_META`, and stock fallbacks intact.
3. `Delete the now-empty \`/public/images `directory completely. Update all imports and glob logic across the entire app to target the new` src/assets/images `paths.`
4. Harden `SmartImage` with the `img.complete` effect and default `decoding="async"`; assert the parent is `relative`.
5. Audit `ProjectDetailPage`, `WorkCard`, `ProjectCard` consumers: confirm every image container has an aspect-ratio class so the skeleton has real dimensions; confirm eager/lazy attribution matches the above-the-fold rule.
6. Add an LCP `<link rel="preload">` for the active project header image on `ProjectDetailPage` (route-level, via a small effect that injects/removes the tag).
7. Verify in a production build: `bun run build && bun run preview`, open `/leadership-academy` in a fresh tab, confirm HPT + Equity tiles return 200s, and that skeletons appear before each image paints.

## Out of scope (call out, don't do now)

- AVIF/WebP responsive variants via `vite-imagetools`.
- A CDN image transformer.
- Refactoring `aboutImages` / `siteImages` (those don't exhibit the bug).