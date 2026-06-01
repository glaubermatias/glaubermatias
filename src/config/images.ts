/**
 * Centralized image catalog — AUTO-DISCOVERED from /public/images/.
 *
 * Drop a `.webp` (or .jpg/.jpeg/.png) inside any of these folders and it
 * will be picked up at build time. NO manual array updates required.
 *
 *   public/images/project-cards/<project-id>/
 *   public/images/projects/<project-id>/header/
 *   public/images/projects/<project-id>/before-and-after/
 *   public/images/projects/<project-id>/carousel/
 *   public/images/projects/<project-id>/bento-grid/<category>/
 *
 * When a folder is empty, the STOCK fallbacks defined below are used so
 * the UI never breaks.
 */

import glauberPortrait from '@/assets/glauber-portrait.png';
import glauberPhoto from '@/assets/glauber-photo.jpg';
import glauberHero from '@/assets/glauber-hero.jpg';
import glauberAboutHeader from '@/assets/glauber-about-header.jpg';
import smileIcon from '@/assets/smile-icon.png';
import gradientBg from '@/assets/gradient-bg.png';

// ────────────────────────────────────────────────────────────────────────────
// Path helper — encodes each segment so spaces/brackets survive at runtime.
// ────────────────────────────────────────────────────────────────────────────
const img = (...segments: string[]) =>
  '/' + ['images', ...segments].map(encodeURIComponent).join('/');

// ────────────────────────────────────────────────────────────────────────────
// Site-wide images
// ────────────────────────────────────────────────────────────────────────────
export const siteImages = {
  hero: { portrait: glauberPortrait, photo: glauberHero },
  about: { header: glauberAboutHeader, sectionPhoto: glauberPhoto, smileIcon },
  shared: { gradientBg },
  homepage: {},
} as const;

export const aboutImages = {
  beyondWork: [
    img('about', '01.jpeg'), img('about', '02.jpeg'), img('about', '03.jpeg'),
    img('about', '04.jpg'),  img('about', '05.jpeg'), img('about', '06.jpeg'),
    img('about', '07.jpeg'), img('about', '08.jpg'),  img('about', '09.jpg'),
    img('about', '10.jpeg'),
  ] as const,
  funFacts: {
    japaneseFood:      img('about', 'japanese-food.png'),
    taylorSwift:       img('about', 'taylor-swift.png'),
    fernandoDeNoronha: img('about', 'fernando-de-noronha.jpg'),
    theOffice:         img('about', 'the-office.png'),
    whiteChicks:       img('about', 'white-chicks.jpg'),
    openWaterSwimming: img('about', 'open-water-swimming.jpg'),
  } as const,
} as const;

// ────────────────────────────────────────────────────────────────────────────
// AUTO-DISCOVERY — Vite glob over /public/images/projects + /project-cards
// ────────────────────────────────────────────────────────────────────────────
// We use eager glob with `?url` so Vite resolves real served URLs in both
// dev and build. The map keys are absolute project paths like
//   /public/images/projects/<id>/bento-grid/<cat>/<file>.webp
// We only need the keys to bucket files by folder; the values are the
// runtime URLs to feed to <img src>.
// We only need the keys; we derive the served URL by stripping `/public`.
// Using `query: '?url'` is intentionally avoided here because Vite warns
// when /public assets are imported as modules. Eager glob with no query
// still gives us the key list, which is all we need.
const PROJECT_FILES = import.meta.glob(
  '/public/images/projects/**/*.{webp,jpg,jpeg,png,JPG,JPEG,PNG,WEBP}',
  { eager: true },
) as Record<string, unknown>;

const CARD_FILES = import.meta.glob(
  '/public/images/project-cards/**/*.{webp,jpg,jpeg,png,JPG,JPEG,PNG,WEBP}',
  { eager: true },
) as Record<string, unknown>;

// Fallback: derive a served URL from the glob key (strip leading /public).
const keyToUrl = (key: string) =>
  // /public/images/foo.webp → /images/foo.webp ; segments are already encoded-safe (no spaces) at the path level we glob.
  '/' + key.replace(/^\/public\//, '').split('/').map(encodeURIComponent).join('/');

// Natural sort so "02" comes before "10".
const naturalSort = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

interface Bucket {
  header: string[];
  carousel: string[];
  beforeAfter: string[];
  bento: Record<string, string[]>;
  card: string[];
}

const makeBucket = (): Bucket => ({
  header: [], carousel: [], beforeAfter: [], bento: {}, card: [],
});

const buckets: Record<string, Bucket> = {};

for (const key of Object.keys(PROJECT_FILES)) {
  // key example: /public/images/projects/leadership-academy/bento-grid/equity/foo.webp
  const path = key.replace(/^\/public/, '');
  const parts = path.split('/').filter(Boolean); // ['images','projects',id,folder,...]
  if (parts[0] !== 'images' || parts[1] !== 'projects') continue;
  const id = parts[2];
  const folder = parts[3];
  if (!id || !folder) continue;
  const b = (buckets[id] ||= makeBucket());
  const served = keyToUrl(key);

  if (folder === 'header') b.header.push(served);
  else if (folder === 'carousel') b.carousel.push(served);
  else if (folder === 'before-and-after') b.beforeAfter.push(served);
  else if (folder === 'bento-grid' && parts.length >= 6) {
    const category = parts[4];
    (b.bento[category] ||= []).push(served);
  }
}

for (const key of Object.keys(CARD_FILES)) {
  const path = key.replace(/^\/public/, '');
  const parts = path.split('/').filter(Boolean); // ['images','project-cards',id,...]
  if (parts[0] !== 'images' || parts[1] !== 'project-cards') continue;
  const id = parts[2];
  if (!id) continue;
  const b = (buckets[id] ||= makeBucket());
  b.card.push(keyToUrl(key));
}

// Sort every bucket array deterministically.
for (const b of Object.values(buckets)) {
  b.header.sort(naturalSort);
  b.carousel.sort(naturalSort);
  b.beforeAfter.sort(naturalSort);
  b.card.sort(naturalSort);
  for (const k of Object.keys(b.bento)) b.bento[k].sort(naturalSort);
}

// ────────────────────────────────────────────────────────────────────────────
// STOCK fallbacks — used wherever a /public/images/ folder is empty.
// ────────────────────────────────────────────────────────────────────────────
const STOCK = {
  exec1: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
  exec2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
  exec3: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
  meeting1: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop',
  summit1: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
  summit2: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
  summit3: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop',
  template1: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
  interns1: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
  news1: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop',
  aldi1: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop',
  aldi2: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
  aldi3: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
  dash1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
  pitch1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
  bento_eq1: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&auto=format&fit=crop',
  bento_eq2: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop',
  bento_eq3: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop',
  bento_eq4: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop',
  bento_hr1: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&auto=format&fit=crop',
  bento_hr2: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop',
  bento_hr3: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=1200&auto=format&fit=crop',
  bento_hr4: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&auto=format&fit=crop',
  ba_before: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop',
  ba_after:  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop',
};

// ────────────────────────────────────────────────────────────────────────────
// Public registry type
// ────────────────────────────────────────────────────────────────────────────
export interface ProjectImageEntry {
  card?: string;
  cardImages?: string[];
  header?: string;
  beforeAfter?: { before: string; after: string };
  images: string[];
  bentoGalleries?: {
    id: string;
    label: string;
    images: { src: string }[];
  }[];
}

export const projectPaths = (projectId: string) => ({
  card:        (file: string) => img('project-cards', projectId, file),
  header:      (file: string) => img('projects', projectId, 'header', file),
  beforeAfter: (file: string) => img('projects', projectId, 'before-and-after', file),
  carousel:    (file: string) => img('projects', projectId, 'carousel', file),
  bento:       (category: string, file: string) =>
    img('projects', projectId, 'bento-grid', category, file),
});

// ────────────────────────────────────────────────────────────────────────────
// Per-project bento category metadata — controls label + ordering.
// Categories not listed here still render (auto-discovered) with a
// prettified label derived from the folder name.
// ────────────────────────────────────────────────────────────────────────────
const BENTO_META: Record<string, Array<{ id: string; label: string }>> = {
  'leadership-academy': [
    { id: 'high-performance-teams', label: 'High Performance Teams' },
    { id: 'artificial-intelligence', label: 'Artificial Intelligence' },
    { id: 'equity', label: 'Equity' },
    { id: 'hiring', label: 'Hiring' },
  ],
};

const prettify = (id: string) =>
  id.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// Stock fallbacks per-project — used only when the folder is empty.
const STOCK_FALLBACK: Record<string, string[]> = {
  'investor-deck':      [STOCK.exec2, STOCK.exec1, STOCK.pitch1],
  'summit':             [STOCK.summit1, STOCK.summit2, STOCK.summit3],
  'template-library':   [STOCK.exec3, STOCK.meeting1, STOCK.exec1],
  'institutional-deck': [STOCK.exec1, STOCK.exec3, STOCK.template1],
  'tech-talks':         [STOCK.summit2, STOCK.summit3, STOCK.summit1],
  'newsletter':         [STOCK.news1, STOCK.interns1, STOCK.exec3],
  'all-hands':          [STOCK.exec3, STOCK.meeting1, STOCK.exec1],
  'brilliant-youth':    [STOCK.meeting1, STOCK.interns1, STOCK.exec2],
  'tech-conferences':   [STOCK.summit3, STOCK.summit1, STOCK.summit2],
  'ny-trip-itinerary':  [STOCK.aldi3, STOCK.aldi1, STOCK.aldi2],
  'booklet':            [STOCK.aldi2, STOCK.aldi1, STOCK.aldi3],
  'aldi-case-study':    [STOCK.aldi1, STOCK.aldi2, STOCK.aldi3],
  'uberall-dashboard':  [STOCK.dash1, STOCK.exec2, STOCK.aldi2],
  'leadership-academy': [STOCK.exec1, STOCK.exec2, STOCK.exec3, STOCK.meeting1],
};

const STOCK_CARDS: Record<string, string[]> = {
  'leadership-academy': [STOCK.exec1, STOCK.exec2, STOCK.exec3, STOCK.meeting1],
};

const STOCK_BENTO_FALLBACK: { id: string; label: string; images: { src: string }[] }[] = [
  { id: 'equity',  label: 'Equity',  images: [
    { src: STOCK.bento_eq1 }, { src: STOCK.bento_eq2 },
    { src: STOCK.bento_eq3 }, { src: STOCK.bento_eq4 },
  ]},
  { id: 'hiring', label: 'Hiring', images: [
    { src: STOCK.bento_hr1 }, { src: STOCK.bento_hr2 },
    { src: STOCK.bento_hr3 }, { src: STOCK.bento_hr4 },
  ]},
];

// ────────────────────────────────────────────────────────────────────────────
// Build the public registry — auto-discovery first, fallback when empty.
// ────────────────────────────────────────────────────────────────────────────
const ALL_PROJECT_IDS = Array.from(new Set([
  ...Object.keys(buckets),
  ...Object.keys(STOCK_FALLBACK),
]));

function buildEntry(id: string): ProjectImageEntry {
  const b = buckets[id] ?? makeBucket();
  const stock = STOCK_FALLBACK[id] ?? [STOCK.exec1, STOCK.exec2, STOCK.exec3];

  const carousel = b.carousel.length > 0 ? b.carousel : stock;
  const header   = b.header[0];
  const cardImages = b.card.length > 0 ? b.card : (STOCK_CARDS[id] ?? stock);

  const beforeAfter = b.beforeAfter.length >= 2
    ? { before: b.beforeAfter[0], after: b.beforeAfter[1] }
    : { before: STOCK.ba_before, after: STOCK.ba_after };

  // Build bento galleries from discovered folders; only include categories
  // that actually have files. Order/label via BENTO_META when available;
  // unknown categories are appended with a prettified label.
  const meta = BENTO_META[id] ?? [];
  const seen = new Set<string>();
  const galleries: NonNullable<ProjectImageEntry['bentoGalleries']> = [];

  for (const { id: catId, label } of meta) {
    const files = b.bento[catId];
    if (files && files.length > 0) {
      galleries.push({ id: catId, label, images: files.map((src) => ({ src })) });
    } else if (id === 'leadership-academy') {
      // Keep STOCK fallback for the LA categories until real files exist.
      const stub = STOCK_BENTO_FALLBACK.find((g) => g.id === catId);
      if (stub) galleries.push(stub);
    }
    seen.add(catId);
  }
  for (const [catId, files] of Object.entries(b.bento)) {
    if (seen.has(catId) || !files || files.length === 0) continue;
    galleries.push({
      id: catId,
      label: prettify(catId),
      images: files.map((src) => ({ src })),
    });
  }

  const entry: ProjectImageEntry = {
    header,
    cardImages,
    beforeAfter,
    images: carousel,
  };
  if (galleries.length > 0) entry.bentoGalleries = galleries;
  return entry;
}

export const projectImages: Record<string, ProjectImageEntry> =
  Object.fromEntries(ALL_PROJECT_IDS.map((id) => [id, buildEntry(id)]));
