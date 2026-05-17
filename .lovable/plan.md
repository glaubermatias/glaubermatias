# Project Detail Page — Friction & Cognitive-Load Audit

Scope: the end-to-end flow on a `/work/:projectId` page (e.g. `/leadership-academy`) — from arrival, through the long-form case study, to exit/related work.

Below: friction points grouped by theme, each with a concrete simplification. Ranked high → low impact at the end.

---

## 1. Information architecture & narrative flow

**F1. Two "big numbers" blocks repeat the same data.**
The overview (top) and the closing (bottom) render the exact same `bigNumbers.slice(0, 2)`. Readers who scrolled the full case study see no payoff at the end — just a duplicate.
→ Closing should show *outcome/impact* numbers only, or replace with a single headline metric + the quote. If only two numbers exist, drop the second block entirely and let the quote close the page.

**F2. Three narrative blocks (Context / Problem / Strategy) + Trade-offs are visually identical and physically separated by a giant bento grid.**
By the time the reader reaches "Trade-offs," they've forgotten the Strategy section it refers to.
→ Group narrative into one continuous section: Context → Problem → Strategy → Trade-offs, *before* the visual proof (bento). Visuals become the reward, not an interruption.

**F3. Two near-identical carousels ("Initial" and "Live") sandwich the narrative.**
Users can't tell what makes them different — both render with `HeroCarousel`, same layout, same controls.
→ Either (a) label them with a short caption ("Final delivery" / "In the room"), or (b) merge into a single carousel with grouped slides. Today they read as a bug.

**F4. The Before/After comparison appears *after* the bento grid, with no lead-in.**
It's a powerful artifact buried mid-scroll with only a centered "Before and After" title.
→ Promote it to immediately follow Strategy ("Here's the shift"), or pair it with a 1-line caption stating the design decision it embodies.

---

## 2. Gallery switcher (related-project buttons above bento)

**F5. Pills truncate at 200px and expand to 520px on hover.**
The expansion is a clever escape hatch but the *default* state hides the value: users see three identical-length pills with cut-off titles and no obvious cue that hovering reveals more.
→ Either size pills to fit content with a sensible cap (e.g. `max-w-[320px]`), or add a subtle "…" + tooltip on hover so the affordance is discoverable without movement.

**F6. The active pill uses `layoutId` animation, which is great — but the gallery itself swaps with no transition.**
Click → pill slides → grid hard-cuts. The mismatch feels broken.
→ Wrap the bento in `AnimatePresence` with a 200ms cross-fade keyed on `active.id`.

**F7. Switching galleries silently changes what the lightbox shows.**
`lightboxIndex` indexes into `derived.processImages` (always the current project), but the bento now shows *another* project's tiles. Clicking a related-project image opens the *wrong* lightbox image.
→ This is a real bug, not just friction. The lightbox source must follow `active.images`.

**F8. No indication that these pills lead to *other projects*' work.**
A first-time reader sees three project names as buttons with no header. The mental model "this is filtering the current project" is the default — the reality "this is previewing other projects' work" is hidden.
→ Add a small label above the pills: "See similar work from" — and consider making each pill a card preview (thumbnail + title) instead of a text-only chip.

---

## 3. Carousel & lightbox interactions

**F9. Two carousel paradigms on the same page.**
The page uses `HeroCarousel` (fade), and `CenterStageCarousel` exists in the same file (3-up scaling). If both ever render on a project, the user re-learns the controls.
→ Pick one paradigm for the whole site. Recommend `HeroCarousel` for simplicity.

**F10. Carousel arrows are white on full-bleed photos with no scrim.**
On light images the arrows disappear. There's no shadow/backdrop now that the request removed it.
→ Add a 24px radial scrim under each arrow (very subtle), or a 1px white stroke. Keeps the minimal look but guarantees contrast.

**F11. Pagination dots overlay the bottom of the photo.**
On photos with content at the bottom (faces, text), the dots collide.
→ Either auto-bias to top-bottom based on image luminance, or keep dots overlay but add a 2-stop gradient mask behind them (`bg-gradient-to-t from-black/40 to-transparent` over the bottom 48px).

**F12. Lightbox lacks counter & captions are easy to miss.**
"3 of 12" tells the user how much further they can go — without it the lightbox feels infinite.
→ Add a small `idx + 1 / total` counter near the close button.

---

## 4. Before/After slider

**F13. No on-image hint of the split direction or labels.**
Once dragged, the user can't tell which side is "before" vs "after."
→ Add two corner chips: `BEFORE` (top-left of left panel) and `AFTER` (top-right of right panel), fading to 40% opacity after first interaction.

**F14. The "drag to compare" tooltip and the handle pulse are two hints for the same affordance.**
Doubling up creates noise.
→ Keep the handle pulse on viewport entry; remove the tooltip (or vice versa). Pick one cue.

---

## 5. Metadata block (Role / Stakeholders / Tools / Duration)

**F15. Inline `dt: dd` runs together visually.**
"Role: Lead Designer / Stakeholders: …" stacked in one column reads as a single paragraph at a glance.
→ Two-column key/value layout, or hairline divider per row. Labels in uppercase eyebrow style, values one size larger.

**F16. "Duration: —" renders literally when missing.**
An em-dash placeholder looks like a typo.
→ Hide the row when the value is `'—'` or empty.

---

## 6. Header & wayfinding

**F17. The H1 is the only header content — no eyebrow, no one-line summary above the fold.**
Users have to scroll past the hero to learn what the project is.
→ Add the tagline (`Company • Year • Category`) above the H1 in the header itself; remove it from the overview section to avoid duplication.

**F18. "Back to Work" is the only escape, top-left, small, 70% white.**
On a dark hero with a bright background photo, it's the lowest-contrast element on screen.
→ Bump to `text-white/90`, add a hover underline, and keep it sticky as a small pill (top-left) for the first viewport so it's reachable mid-scroll.

**F19. Title can be very long (e.g. "Leadership Academy: …") and wraps awkwardly at lg:text-7xl.**
→ Cap H1 at `max-w-[20ch]` and reduce to `text-5xl md:text-6xl` for titles over 30 chars (measured at render).

---

## 7. Visual hierarchy & rhythm

**F20. Many section paddings (`pt-12`, `pt-14`, `pt-16`, `pt-20`, `pt-24`) — no consistent vertical rhythm.**
The eye can't predict where the next block starts.
→ Standardize on two spacings: `py-16 md:py-20` between *sections*, `py-8` between sub-blocks within a section. Remove all ad-hoc paddings.

**F21. Two different content widths (`max-w-[1400px]` for visuals, `max-w-[845px]` for narrative) shift the reading center on every section.**
→ Keep this asymmetry — it's intentional — but align the *left edge* of the narrow column with the visuals' left edge instead of centering it. Reader's eye stays put.

**F22. The "Meaningful title" in `#b7b7b7` on white is ~3:1 contrast.**
Fails WCAG AA for text. Also visually competes with the H1 from the hero.
→ Use `text-muted-foreground` token (already designed for this) and reduce size to `text-3xl md:text-4xl`. Save `text-6xl` for the primary H1.

---

## 8. Quick wins (low-effort, high-clarity)

| # | Fix | Effort |
|---|------|--------|
| F7 | Lightbox uses active gallery, not always current project | XS — 1-line fix |
| F16 | Hide metadata rows with em-dash placeholder | XS |
| F22 | Replace `#b7b7b7` with `text-muted-foreground` | XS |
| F10 | Add subtle scrim under carousel arrows | S |
| F12 | Add slide counter in lightbox | S |
| F14 | Pick one cue (tooltip OR pulse) on Before/After | S |
| F1 | Drop duplicate big-numbers at closing | S |
| F8 | Add "See similar work from" label above pills | S |

---

## Priority order to ship

1. **F7** — fix the lightbox/gallery bug (correctness)
2. **F2 + F3 + F4** — reorder sections so narrative reads continuously and visuals reward the reader
3. **F1** — remove the closing big-numbers duplicate
4. **F5 + F8** — make the gallery switcher self-explanatory
5. **F13 + F14** — clarify Before/After
6. **F20 + F21 + F22** — tighten visual rhythm and contrast
7. Remaining polish (F10, F12, F15–F19)

This sequence trades the heaviest cognitive-load problems first (duplicate/bug/ordering) before moving to micro-polish.