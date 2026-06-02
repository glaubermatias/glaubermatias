// Cache flush: 2026-06-02T02:00:00Z — removed artificial-intelligence bento category.
/**
 * Centralized image catalog — AUTO-DISCOVERED from src/assets/images/.
 *
 * Drop a `.webp` (or .jpg/.jpeg/.png) inside any of these folders and it
 * will be picked up at build time. NO manual array updates required.
 * Because everything flows through Vite's module graph, the URLs are
 * hashed, copied to dist/assets, and guaranteed to work in production.
 *
 *   src/assets/images/project-cards/<project-id>/
 *   src/assets/images/projects/<project-id>/header/
 *   src/assets/images/projects/<project-id>/before-and-after/
 *   src/assets/images/projects/<project-id>/carousel/
 *   src/assets/images/projects/<project-id>/bento-grid/<category>/
 *
 * When a folder is empty, the STOCK fallbacks defined below are used so
 * the UI never breaks.
 */

import glauberPortrait from "@/assets/glauber-portrait.png";
import glauberPhoto from "@/assets/glauber-photo.jpg";
import glauberHero from "@/assets/glauber-hero.jpg";
import glauberAboutHeader from "@/assets/glauber-about-header.jpg";
import smileIcon from "@/assets/smile-icon.png";

// ────────────────────────────────────────────────────────────────────────────
// AUTO-DISCOVERY — Vite glob over src/assets/images
// ────────────────────────────────────────────────────────────────────────────
// Eager + ?url means each file is registered as a module, hashed by Rollup,
// and the value Vite hands back is the final deploy-safe URL.
const PROJECT_FILES = import.meta.glob("/src/assets/images/projects/**/*.{webp,jpg,jpeg,png,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const CARD_FILES = import.meta.glob("/src/assets/images/project-cards/**/*.{webp,jpg,jpeg,png,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const BEYOND_WORK_FILES = import.meta.glob(
  "/src/assets/images/about/beyond-work/*.{webp,jpg,jpeg,png,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const FUN_FACTS_FILES = import.meta.glob("/src/assets/images/about/fun-facts/*.{webp,jpg,jpeg,png,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const funFactUrl = (file: string): string => FUN_FACTS_FILES[`/src/assets/images/about/fun-facts/${file}`] ?? "";

// ────────────────────────────────────────────────────────────────────────────
// Site-wide images
// ────────────────────────────────────────────────────────────────────────────
export const siteImages = {
  hero: { portrait: glauberPortrait, photo: glauberHero },
  about: { header: glauberAboutHeader, sectionPhoto: glauberPhoto, smileIcon },
  homepage: {},
} as const;

// Natural sort so "02" comes before "10".
const naturalSortKeys = (a: [string, string], b: [string, string]) =>
  a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: "base" });

export const aboutImages = {
  beyondWork: Object.entries(BEYOND_WORK_FILES)
    .sort(naturalSortKeys)
    .map(([, url]) => url),
  funFacts: {
    japaneseFood: funFactUrl("japanese-food.png"),
    taylorSwift: funFactUrl("taylor-swift.png"),
    fernandoDeNoronha: funFactUrl("fernando-de-noronha.jpg"),
    theOffice: funFactUrl("the-office.png"),
    whiteChicks: funFactUrl("white-chicks.jpg"),
    openWaterSwimming: funFactUrl("open-water-swimming.jpg"),
  } as const,
} as const;

// Natural sort so "02" comes before "10".
const naturalSort = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

interface Bucket {
  header: string[];
  carousel: string[];
  beforeAfter: string[];
  bento: Record<string, string[]>;
  card: string[];
}

const makeBucket = (): Bucket => ({
  header: [],
  carousel: [],
  beforeAfter: [],
  bento: {},
  card: [],
});

// Pair each file with its key so we can sort by source filename, then keep URLs.
const sortedByKey = (entries: Array<[string, string]>) =>
  entries.sort(([a], [b]) => naturalSort(a, b)).map(([, url]) => url);

const buckets: Record<string, Bucket> = {};
// Temporary holders so we can sort by source filename, not by hashed URL.
const tmp: Record<
  string,
  {
    header: Array<[string, string]>;
    carousel: Array<[string, string]>;
    beforeAfter: Array<[string, string]>;
    bento: Record<string, Array<[string, string]>>;
    card: Array<[string, string]>;
  }
> = {};

const ensureTmp = (id: string) => (tmp[id] ||= { header: [], carousel: [], beforeAfter: [], bento: {}, card: [] });

for (const [key, url] of Object.entries(PROJECT_FILES)) {
  // Radar inteligente: acha onde a palavra '/projects/' começa, ignorando o tamanho do caminho
  const projectsIndex = key.indexOf("/projects/");
  if (projectsIndex === -1) continue;

  const relativePath = key.substring(projectsIndex + "/projects/".length);
  const parts = relativePath.split("/");

  const id = parts[0];
  const folder = parts[1];
  const filename = parts[parts.length - 1];

  if (!id || !folder || !filename) continue;

  const t = ensureTmp(id);

  if (folder === "header") t.header.push([filename, url]);
  else if (folder === "carousel") t.carousel.push([filename, url]);
  else if (folder === "before-and-after") t.beforeAfter.push([filename, url]);
  else if (folder === "bento-grid" && parts.length >= 4) {
    const category = parts[2];
    (t.bento[category] ||= []).push([filename, url]);
  }
}

for (const [key, url] of Object.entries(CARD_FILES)) {
  const cardsIndex = key.indexOf("/project-cards/");
  if (cardsIndex === -1) continue;

  const relativePath = key.substring(cardsIndex + "/project-cards/".length);
  const parts = relativePath.split("/");

  const id = parts[0];
  const filename = parts[parts.length - 1];

  if (!id || !filename) continue;

  const t = ensureTmp(id);
  t.card.push([filename, url]);
}

// Materialize sorted buckets.
for (const [id, t] of Object.entries(tmp)) {
  const b = makeBucket();
  b.header = sortedByKey(t.header);
  b.carousel = sortedByKey(t.carousel);
  b.beforeAfter = sortedByKey(t.beforeAfter);
  b.card = sortedByKey(t.card);
  for (const [cat, list] of Object.entries(t.bento)) {
    b.bento[cat] = sortedByKey(list);
  }
  buckets[id] = b;
}

// ────────────────────────────────────────────────────────────────────────────
// STOCK fallbacks — used wherever a folder is empty.
// ────────────────────────────────────────────────────────────────────────────
const STOCK = {
  exec1: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
  exec2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
  exec3: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
  meeting1: "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop",
  summit1: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop",
  summit2: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
  summit3: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop",
  template1: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop",
  interns1: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
  news1: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop",
  aldi1: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop",
  aldi2: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
  aldi3: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
  dash1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
  pitch1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
  bento_eq1: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&auto=format&fit=crop",
  bento_eq2: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop",
  bento_eq3: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop",
  bento_eq4: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop",
  bento_hr1: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&auto=format&fit=crop",
  bento_hr2: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop",
  bento_hr3: "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=1200&auto=format&fit=crop",
  bento_hr4: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&auto=format&fit=crop",
  ba_before: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop",
  ba_after: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop",
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

// ────────────────────────────────────────────────────────────────────────────
// Per-project bento category metadata — controls label + ordering.
// ────────────────────────────────────────────────────────────────────────────
const BENTO_META: Record<string, Array<{ id: string; label: string }>> = {
  "leadership-academy": [
    { id: "high-performance-teams", label: "High Performance Teams" },
    { id: "artificial-intelligence", label: "Artificial Intelligence" },
    { id: "equity", label: "Equity" },
    { id: "hiring", label: "Hiring" },
  ],
};

const prettify = (id: string) => id.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// Stock fallbacks per-project — used only when the folder is empty.
const STOCK_FALLBACK: Record<string, string[]> = {
  "investor-deck": [STOCK.exec2, STOCK.exec1, STOCK.pitch1],
  summit: [STOCK.summit1, STOCK.summit2, STOCK.summit3],
  "template-library": [STOCK.exec3, STOCK.meeting1, STOCK.exec1],
  "institutional-deck": [STOCK.exec1, STOCK.exec3, STOCK.template1],
  "tech-talks": [STOCK.summit2, STOCK.summit3, STOCK.summit1],
  newsletter: [STOCK.news1, STOCK.interns1, STOCK.exec3],
  "all-hands": [STOCK.exec3, STOCK.meeting1, STOCK.exec1],
  "brilliant-youth": [STOCK.meeting1, STOCK.interns1, STOCK.exec2],
  "tech-conferences": [STOCK.summit3, STOCK.summit1, STOCK.summit2],
  "ny-trip-itinerary": [STOCK.aldi3, STOCK.aldi1, STOCK.aldi2],
  booklet: [STOCK.aldi2, STOCK.aldi1, STOCK.aldi3],
  "aldi-case-study": [STOCK.aldi1, STOCK.aldi2, STOCK.aldi3],
  "uberall-dashboard": [STOCK.dash1, STOCK.exec2, STOCK.aldi2],
  "leadership-academy": [STOCK.exec1, STOCK.exec2, STOCK.exec3, STOCK.meeting1],
};

const STOCK_CARDS: Record<string, string[]> = {
  "leadership-academy": [STOCK.exec1, STOCK.exec2, STOCK.exec3, STOCK.meeting1],
};

const STOCK_BENTO_FALLBACK: { id: string; label: string; images: { src: string }[] }[] = [
  {
    id: "equity",
    label: "Equity",
    images: [{ src: STOCK.bento_eq1 }, { src: STOCK.bento_eq2 }, { src: STOCK.bento_eq3 }, { src: STOCK.bento_eq4 }],
  },
  {
    id: "hiring",
    label: "Hiring",
    images: [{ src: STOCK.bento_hr1 }, { src: STOCK.bento_hr2 }, { src: STOCK.bento_hr3 }, { src: STOCK.bento_hr4 }],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Build the public registry — auto-discovery first, fallback when empty.
// ────────────────────────────────────────────────────────────────────────────
const ALL_PROJECT_IDS = Array.from(new Set([...Object.keys(buckets), ...Object.keys(STOCK_FALLBACK)]));

function buildEntry(id: string): ProjectImageEntry {
  const b = buckets[id] ?? makeBucket();
  const stock = STOCK_FALLBACK[id] ?? [STOCK.exec1, STOCK.exec2, STOCK.exec3];

  const carousel = b.carousel.length > 0 ? b.carousel : stock;
  const header = b.header[0];
  const cardImages = b.card.length > 0 ? b.card : (STOCK_CARDS[id] ?? stock);

  const beforeAfter =
    b.beforeAfter.length >= 2
      ? { before: b.beforeAfter[0], after: b.beforeAfter[1] }
      : { before: STOCK.ba_before, after: STOCK.ba_after };

  const meta = BENTO_META[id] ?? [];
  const seen = new Set<string>();
  const galleries: NonNullable<ProjectImageEntry["bentoGalleries"]> = [];

  for (const { id: catId, label } of meta) {
    const files = b.bento[catId];
    if (files && files.length > 0) {
      galleries.push({ id: catId, label, images: files.map((src) => ({ src })) });
    } else if (id === "leadership-academy") {
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

export const projectImages: Record<string, ProjectImageEntry> = Object.fromEntries(
  ALL_PROJECT_IDS.map((id) => [id, buildEntry(id)]),
);
