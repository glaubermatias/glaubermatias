# Beyond Work — fix overlap, height, and alignment

## Problem
The featured photo currently uses `object-cover` and `aspect-[4/3]` at 7/12 width while the adjacent grid is 5/12 with 3 rows. The grid's intrinsic height (3 rows of 4/3 thumbnails at narrower width) is taller than the featured photo's 4/3 box, so the grid pushes the section taller and visually appears to overflow next to the feature. Using `object-cover` also crops the featured image instead of showing it whole.

## Fix (single change in `src/pages/AboutPage.tsx`, `BeyondWorkGallery`)

1. Swap the column proportions so the grid is wider than the feature:
   - Feature card: `md:col-span-5` (was 7).
   - Adjacent grid: `md:col-span-7` (was 5).
   This makes each thumbnail cell wider, so 3 rows of `4/3` cells naturally match the feature's `4/3` height.

2. Keep the feature card sized by `aspect-[4/3]` only (no fixed height), and switch the image to `object-contain` so the photo appears in full inside the card without cropping. Card background already `bg-muted` for letterbox space.

3. Adjacent grid:
   - `grid grid-cols-3 grid-rows-3 gap-3 md:h-full`
   - Each thumbnail: remove `aspect-[4/3]` on desktop (it's what causes overflow). Use `w-full h-full min-h-0` so the 9 cells split the feature's height evenly. Keep `aspect-[4/3]` only at the mobile breakpoint (single column collapse).
   - Continue rendering all 9 photos that aren't the active one (already in place).

4. Use `md:items-stretch` on the parent grid so both columns share the same height (driven by the feature's aspect ratio).

## Result
- Left (5/12): featured photo shown in full via `object-contain`, height set by `aspect-[4/3]`.
- Right (7/12): 3×3 grid of the other 9 photos, total height equals the feature's height, no overflow, edges aligned top and bottom.
- Overall section height is reduced because the feature column is narrower (5/12 of `4/3` is shorter than 7/12 of `4/3`).

## Files
- `src/pages/AboutPage.tsx` — `BeyondWorkGallery` only.
