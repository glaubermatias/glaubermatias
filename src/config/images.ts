/**
 * Centralized image catalog.
 *
 * Folder convention under /public/images/:
 *   homepage/
 *   about/
 *   project-cards/<project-id>/
 *   projects/<project-id>/header/
 *   projects/<project-id>/before-and-after/
 *   projects/<project-id>/carousel/
 *   projects/<project-id>/bento-grid/<category>/
 *
 * STRICT RULE: never map a /public/images/ path unless real files
 * are actually present in that folder. When a folder is empty, fall
 * back to the STOCK URLs or local src/assets imports defined below.
 */

// ────────────────────────────────────────────────────────────────────────────
// Local asset imports (kept as fallbacks — DO NOT DELETE)
// ────────────────────────────────────────────────────────────────────────────
import glauberPortrait from '@/assets/glauber-portrait.png';
import glauberPhoto from '@/assets/glauber-photo.jpg';
import glauberHero from '@/assets/glauber-hero.jpg';
import glauberAboutHeader from '@/assets/glauber-about-header.jpg';
import smileIcon from '@/assets/smile-icon.png';
import gradientBg from '@/assets/gradient-bg.png';

// ────────────────────────────────────────────────────────────────────────────
// Path helper — properly encodes each segment so spaces/brackets survive.
// ────────────────────────────────────────────────────────────────────────────
const img = (...segments: string[]) =>
  '/' + ['images', ...segments].map(encodeURIComponent).join('/');

// ────────────────────────────────────────────────────────────────────────────
// Site-wide images (Home, About, shared)
// ────────────────────────────────────────────────────────────────────────────
export const siteImages = {
  hero: {
    portrait: glauberPortrait,
    photo: glauberHero,
  },
  about: {
    header: glauberAboutHeader,
    sectionPhoto: glauberPhoto,
    smileIcon,
  },
  shared: {
    gradientBg,
  },
  homepage: {
    // Files placed under /public/images/homepage/ are referenced here.
  },
} as const;

// ────────────────────────────────────────────────────────────────────────────
// About page imagery — served from /public/images/about/
// ────────────────────────────────────────────────────────────────────────────
export const aboutImages = {
  beyondWork: [
    img('about', '01.jpeg'),
    img('about', '02.jpeg'),
    img('about', '03.jpeg'),
    img('about', '04.jpg'),
    img('about', '05.jpeg'),
    img('about', '06.jpeg'),
    img('about', '07.jpeg'),
    img('about', '08.jpg'),
    img('about', '09.jpg'),
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
// Project image registry
// ────────────────────────────────────────────────────────────────────────────
export interface ProjectImageEntry {
  card?: string;
  /** Card carousel images (e.g. WorkCard/ProjectCard). Falls back to `images` when omitted. */
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
// Remote stock fallbacks — used wherever a public/images/ folder is empty.
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
  // Bento fallbacks
  bento_eq1: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&auto=format&fit=crop',
  bento_eq2: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop',
  bento_eq3: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop',
  bento_eq4: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop',
  bento_hr1: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&auto=format&fit=crop',
  bento_hr2: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop',
  bento_hr3: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=1200&auto=format&fit=crop',
  bento_hr4: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&auto=format&fit=crop',
  // Before/after generic fallback
  ba_before: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop',
  ba_after:  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop',
};

// ────────────────────────────────────────────────────────────────────────────
// Leadership Academy — only folders with real .webp files are mapped.
//   header/                     → 1 file  ✅
//   carousel/                   → 10 files ✅
//   bento-grid/high-performance-teams/ → 12 files ✅
//   bento-grid/artificial-intelligence/ → 8 files ✅
//   bento-grid/equity/          → EMPTY → STOCK fallback
//   bento-grid/hiring/          → EMPTY → STOCK fallback
//   project-cards/              → EMPTY → STOCK fallback (no card override)
//   before-and-after/           → EMPTY → STOCK fallback
// ────────────────────────────────────────────────────────────────────────────
const LA = projectPaths('leadership-academy');

const LA_HEADER = LA.header('Leadership-academy-Header.webp');

const LA_CAROUSEL = [
  '01.webp','02.webp','03.webp','04.webp','05.webp',
  '06.webp','07.webp','08.webp','09.webp','10.webp',
].map(LA.carousel);

const LA_HPT = [
  '[Portfolio_Glauber Matias] Leadership Academy_High Performance Teams (01).webp',
  '[Portfolio_Glauber Matias] Leadership Academy_High Performance Teams (02).webp',
  '[Portfolio_Glauber Matias] Leadership Academy_High Performance Teams (03).webp',
  '[Portfolio_Glauber Matias] Leadership Academy_High Performance Teams (04).webp',
  '[Portfolio_Glauber Matias] Leadership Academy_High Performance Teams (05).webp',
  '[Portfolio_Glauber Matias] Leadership Academy_High Performance Teams (06).webp',
  '[Portfolio_Glauber Matias] Leadership Academy_High Performance Teams (07).webp',
  '[Portfolio_Glauber Matias] Leadership Academy_High Performance Teams (08).webp',
  '[Portfolio_Glauber Matias] Leadership Academy_High Performance Teams (09).webp',
  '[Portfolio_Glauber Matias] Leadership Academy_High Performance Teams (10).webp',
  '[Portfolio_Glauber Matias] Leadership Academy_High Performance Teams (11).webp',
  '[Portfolio_Glauber Matias] Leadership Academy_High Performance Teams (12).webp',
].map((f) => LA.bento('high-performance-teams', f));

const LA_AI = [
  'Portfolio_Glauber-Matias_-Leadership-Academy_AI-_1_.webp',
  'Portfolio_Glauber-Matias_-Leadership-Academy_AI-_2_.webp',
  'Portfolio_Glauber-Matias_-Leadership-Academy_AI-_3_.webp',
  'Portfolio_Glauber-Matias_-Leadership-Academy_AI-_4_.webp',
  'Portfolio_Glauber-Matias_-Leadership-Academy_AI-_5_.webp',
  'Portfolio_Glauber-Matias_-Leadership-Academy_AI-_6_.webp',
  'Portfolio_Glauber-Matias_-Leadership-Academy_AI-_7_.webp',
  'Portfolio_Glauber-Matias_-Leadership-Academy_AI-_8_.webp',
].map((f) => LA.bento('artificial-intelligence', f));

export const projectImages: Record<string, ProjectImageEntry> = {
  'leadership-academy': {
    // Header ONLY from header folder. Never from carousel.
    header: LA_HEADER,
    // No card override — let consumers fall back to header/carousel[0].
    // No before/after — folder empty, restore STOCK fallback.
    beforeAfter: { before: STOCK.ba_before, after: STOCK.ba_after },
    images: LA_CAROUSEL,
    bentoGalleries: [
      {
        id: 'high-performance-teams',
        label: 'High Performance Teams',
        images: LA_HPT.map((src) => ({ src })),
      },
      {
        id: 'artificial-intelligence',
        label: 'Artificial Intelligence',
        images: LA_AI.map((src) => ({ src })),
      },
      {
        id: 'equity',
        label: 'Equity',
        images: [
          { src: STOCK.bento_eq1 }, { src: STOCK.bento_eq2 },
          { src: STOCK.bento_eq3 }, { src: STOCK.bento_eq4 },
        ],
      },
      {
        id: 'hiring',
        label: 'Hiring',
        images: [
          { src: STOCK.bento_hr1 }, { src: STOCK.bento_hr2 },
          { src: STOCK.bento_hr3 }, { src: STOCK.bento_hr4 },
        ],
      },
    ],
  },

  // All other projects: /public/images/ folders are still empty — keep
  // STOCK fallbacks until real .webp files are dropped in.
  'investor-deck':      { images: [STOCK.exec2, STOCK.exec1, STOCK.pitch1] },
  'summit':             { images: [STOCK.summit1, STOCK.summit2, STOCK.summit3] },
  'template-library':   { images: [STOCK.exec3, STOCK.meeting1, STOCK.exec1] },
  'institutional-deck': { images: [STOCK.exec1, STOCK.exec3, STOCK.template1] },
  'tech-talks':         { images: [STOCK.summit2, STOCK.summit3, STOCK.summit1] },
  'newsletter':         { images: [STOCK.news1, STOCK.interns1, STOCK.exec3] },
  'all-hands':          { images: [STOCK.exec3, STOCK.meeting1, STOCK.exec1] },
  'brilliant-youth':    { images: [STOCK.meeting1, STOCK.interns1, STOCK.exec2] },
  'tech-conferences':   { images: [STOCK.summit3, STOCK.summit1, STOCK.summit2] },
  'ny-trip-itinerary':  { images: [STOCK.aldi3, STOCK.aldi1, STOCK.aldi2] },
  'booklet':            { images: [STOCK.aldi2, STOCK.aldi1, STOCK.aldi3] },
  'aldi-case-study':    { images: [STOCK.aldi1, STOCK.aldi2, STOCK.aldi3] },
  'uberall-dashboard':  { images: [STOCK.dash1, STOCK.exec2, STOCK.aldi2] },
};
