/**
 * Centralized image catalog.
 *
 * Single source of truth for every image rendered in the app.
 *
 * ── Where images live ──────────────────────────────────────────────
 * 1. /public/images/...      → Scalable, designer-friendly folder
 *                              structure. Drop files in and they are
 *                              served at the matching URL. Preferred
 *                              for all new project imagery.
 * 2. src/assets/...          → Legacy/local fallbacks. Imported so
 *                              Vite hashes them. Kept intact until
 *                              the matching /public/images/ files
 *                              are uploaded.
 * 3. Remote URLs              → Temporary stock fallbacks while real
 *                              project imagery is being produced.
 *
 * ── Folder convention under /public/images/ ────────────────────────
 *   homepage/
 *   about/
 *   project-cards/<project-id>/
 *   projects/<project-id>/header/
 *   projects/<project-id>/before-and-after/
 *   projects/<project-id>/carousel/
 *   projects/<project-id>/bento-grid/<category>/
 */

// ────────────────────────────────────────────────────────────────────────────
// Local asset imports (kept as fallbacks — DO NOT DELETE yet)
// ────────────────────────────────────────────────────────────────────────────
import glauberPortrait from '@/assets/glauber-portrait.png';
import glauberPhoto from '@/assets/glauber-photo.jpg';
import glauberHero from '@/assets/glauber-hero.jpg';
import glauberAboutHeader from '@/assets/glauber-about-header.jpg';
import smileIcon from '@/assets/smile-icon.png';
import gradientBg from '@/assets/gradient-bg.png';

// ────────────────────────────────────────────────────────────────────────────
// Helper — builds a /public/images/... path
// ────────────────────────────────────────────────────────────────────────────
const img = (...segments: string[]) => `/images/${segments.join('/')}`;

// ────────────────────────────────────────────────────────────────────────────
// Site-wide images (Home, About, shared)
// Local fallbacks remain in case the homepage/ folder is empty.
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
    // Example: hero: img('homepage', 'hero.jpg'),
  },
} as const;

// ────────────────────────────────────────────────────────────────────────────
// About page imagery — now served from /public/images/about/
// (source files copied from src/assets/about/ — fallback originals kept)
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
    japaneseFood:       img('about', 'japanese-food.png'),
    taylorSwift:        img('about', 'taylor-swift.png'),
    fernandoDeNoronha:  img('about', 'fernando-de-noronha.jpg'),
    theOffice:          img('about', 'the-office.png'),
    whiteChicks:        img('about', 'white-chicks.jpg'),
    openWaterSwimming:  img('about', 'open-water-swimming.jpg'),
  } as const,
} as const;

// ────────────────────────────────────────────────────────────────────────────
// Project image registry
// ────────────────────────────────────────────────────────────────────────────
export interface ProjectImageEntry {
  /** Card image on landing/work grids — /public/images/project-cards/<id>/ */
  card?: string;
  /** Hero image on project detail page — /public/images/projects/<id>/header/ */
  header?: string;
  /** Before/after pair — /public/images/projects/<id>/before-and-after/ */
  beforeAfter?: { before: string; after: string };
  /** Carousel images shown across the app */
  images: string[];
  /** Bento gallery — keyed by category folder name under bento-grid/ */
  bentoGalleries?: {
    id: string;
    label: string;
    images: { src: string }[];
  }[];
}

/**
 * Scalable path helpers per project. Use these when wiring real imagery:
 *
 *   projectPaths('leadership-academy').carousel('01.jpg')
 *   projectPaths('leadership-academy').bento('hiring', '02.jpg')
 */
export const projectPaths = (projectId: string) => ({
  card:        (file: string) => img('project-cards', projectId, file),
  header:      (file: string) => img('projects', projectId, 'header', file),
  beforeAfter: (file: string) => img('projects', projectId, 'before-and-after', file),
  carousel:    (file: string) => img('projects', projectId, 'carousel', file),
  bento:       (category: string, file: string) =>
    img('projects', projectId, 'bento-grid', category, file),
});

// Remote stock fallbacks — replace with real assets dropped into
// /public/images/projects/<id>/carousel/ as they become available.
const STOCK = {
  exec1: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
  exec2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
  exec3: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
  meeting1: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop',
  summit1: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
  summit2: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
  summit3: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop',
  template1: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
  master1: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop',
  master2: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop',
  interns1: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
  news1: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop',
  aldi1: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop',
  aldi2: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
  aldi3: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
  dash1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
  bento_hpt1: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop',
  bento_hpt2: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop',
  bento_hpt3: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop',
  bento_hpt4: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop',
  bento_ai1: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop',
  bento_ai2: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop',
  bento_ai3: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=1200&auto=format&fit=crop',
  bento_ai4: 'https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?w=1200&auto=format&fit=crop',
  bento_eq1: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&auto=format&fit=crop',
  bento_eq2: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop',
  bento_eq3: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop',
  bento_eq4: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop',
  bento_hr1: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&auto=format&fit=crop',
  bento_hr2: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop',
  bento_hr3: 'https://images.unsplash.com/photo-1560264280-88b68371db39?w=1200&auto=format&fit=crop',
  bento_hr4: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&auto=format&fit=crop',
  pitch1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
};

/**
 * Per-project image map. Each entry will, in time, point exclusively at
 * /public/images/projects/<id>/... files. Until then, remote stock URLs
 * stand in as fallbacks so the UI never breaks.
 *
 * To replace a fallback: drop the real file under the matching folder
 * and swap the value for `projectPaths('<id>').carousel('<file>')`.
 */
export const projectImages: Record<string, ProjectImageEntry> = {
  'leadership-academy': {
    images: [STOCK.exec1, STOCK.exec2, STOCK.exec3],
    bentoGalleries: [
      {
        id: 'high-performance-teams',
        label: 'High Performance Teams',
        images: [
          { src: STOCK.bento_hpt1 }, { src: STOCK.bento_hpt2 },
          { src: STOCK.bento_hpt3 }, { src: STOCK.bento_hpt4 },
        ],
      },
      {
        id: 'artificial-intelligence',
        label: 'Artificial Intelligence',
        images: [
          { src: STOCK.bento_ai1 }, { src: STOCK.bento_ai2 },
          { src: STOCK.bento_ai3 }, { src: STOCK.bento_ai4 },
        ],
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
  'investor-deck': {
    images: [STOCK.exec2, STOCK.exec1, STOCK.pitch1],
  },
  'summit': {
    images: [STOCK.summit1, STOCK.summit2, STOCK.summit3],
  },
  'template-library': {
    images: [STOCK.exec3, STOCK.meeting1, STOCK.exec1],
  },
  'institutional-deck': {
    images: [STOCK.exec1, STOCK.exec3, STOCK.template1],
  },
  'tech-talks': {
    images: [STOCK.summit2, STOCK.summit3, STOCK.summit1],
  },
  'newsletter': {
    images: [STOCK.news1, STOCK.interns1, STOCK.exec3],
  },
  'all-hands': {
    images: [STOCK.exec3, STOCK.meeting1, STOCK.exec1],
  },
  'brilliant-youth': {
    images: [STOCK.meeting1, STOCK.interns1, STOCK.master1],
  },
  'tech-conferences': {
    images: [STOCK.summit3, STOCK.summit1, STOCK.summit2],
  },
  'ny-trip-itinerary': {
    images: [STOCK.aldi3, STOCK.aldi1, STOCK.aldi2],
  },
  'booklet': {
    images: [STOCK.aldi2, STOCK.aldi1, STOCK.aldi3],
  },
  'aldi-case-study': {
    images: [STOCK.aldi1, STOCK.aldi2, STOCK.aldi3],
  },
  'uberall-dashboard': {
    images: [STOCK.dash1, STOCK.exec2, STOCK.aldi2],
  },
};
