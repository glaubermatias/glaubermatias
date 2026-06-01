# Cleanup & Reorganize `/src/assets/`

## Current mess (verified)

Stray duplicates at the root of `src/assets/`:
- `src/assets/about/` — 16 files (10 numbered + 6 named fun facts)
- `src/assets/beyond-work/` — same 10 numbered files
- `src/assets/fun-facts/` — same 6 named files

Inside `src/assets/images/about/` everything is also flattened into one folder (16 files mixed together). There are **no** `beyond-work/` or `fun-facts/` subfolders yet, and **no** `src/assets/images/project-cards/` directory exists at all — card images are currently being filled in by stock fallbacks via `STOCK_CARDS`.

Only `src/config/images.ts` references these asset paths (via `import.meta.glob`). `AboutPage.tsx` consumes them through the typed `aboutImages` export, and project cards flow through `projectImages[id].cardImages`. So all path changes are contained to `images.ts`.

## Target structure (single source of truth)

```text
src/assets/images/
├── about/
│   ├── beyond-work/        ← 10 numbered photos (01–10)
│   └── fun-facts/          ← 6 named photos
├── project-cards/
│   └── <project-id>/       ← one folder per project (15 total)
└── projects/
    └── <project-id>/{header,carousel,before-and-after,bento-grid}/
```

One folder per concept. Homepage and `/work` both read `projectImages[id].cardImages`, which globs `src/assets/images/project-cards/<id>/` — so they automatically share the same source.

## Steps

1. **Move `about/` images into the proper subfolders**
   - Move `src/assets/images/about/{01..10}.{jpeg,jpg}` → `src/assets/images/about/beyond-work/`
   - Move the 6 named files (`japanese-food.png`, `taylor-swift.png`, `fernando-de-noronha.jpg`, `the-office.png`, `white-chicks.jpg`, `open-water-swimming.jpg`) → `src/assets/images/about/fun-facts/`

2. **Delete stray duplicate folders** at the root of `src/assets/`:
   - `src/assets/about/`
   - `src/assets/beyond-work/`
   - `src/assets/fun-facts/`

3. **Create the 15 empty `project-cards/<id>/` folders** (with `.gitkeep`) so they're ready for uploads and the glob has a stable shape:
   `aldi-case-study, all-hands, booklet, brilliant-youth, institutional-deck, investor-deck, leadership-academy, newsletter, ny-trip-itinerary, summit, tech-conferences, tech-talks, template-library, uberall-dashboard` (+ any 15th id confirmed against `src/data/projects.ts`).

4. **Update `src/config/images.ts`**
   - Replace the flat `aboutUrl(file)` helper with two narrower globs:
     - `BEYOND_WORK_FILES` → `/src/assets/images/about/beyond-work/*`
     - `FUN_FACTS_FILES`   → `/src/assets/images/about/fun-facts/*`
   - Rebuild `aboutImages.beyondWork` as a naturally-sorted array of `BEYOND_WORK_FILES` URLs (no hand-listed filenames).
   - Rebuild `aboutImages.funFacts` by looking up the six known filenames in `FUN_FACTS_FILES`.
   - `CARD_FILES` glob already points to `/src/assets/images/project-cards/**/*`; with the new folders present it just works. Remove `STOCK_CARDS` fallback usage from `buildEntry` so empty card folders fall through to the carousel images (matching the existing `cardImages || images` pattern in `ProjectCard.tsx`), or keep stock as a last-resort fallback — confirm preference (default: keep stock fallback to avoid blank cards during the transition).

5. **No other component edits required.** `AboutPage.tsx`, `ProjectCard.tsx`, `WorkCard.tsx`, and `WorkSection.tsx` already read through `aboutImages` / `projectImages` — they pick up the new structure automatically.

6. **Verify**
   - Typecheck passes.
   - `/about` still renders all 10 Beyond Work photos and 6 fun facts.
   - Homepage `WorkSection` and `/work` page show identical card images for each project (both sourced from `projectImages[id].cardImages`).
   - Production build: confirm the new URLs are hashed under `dist/assets/` (proves the glob is part of the module graph and won't 404).

## Typography guarantee

This is a pure file-move + glob-rewrite. No font loading, no Suspense boundary, no JS gating of text. Skeletons in `SmartImage` continue to be the only image-loading UI, and headings/body render immediately as before.

## Out of scope

- Re-uploading actual card artwork (folders will be empty until the user drops files in).
- Touching `glauber-*` root assets or `smile-icon.png` — those stay where they are.
- AVIF variants / `vite-imagetools` / CDN transforms.
