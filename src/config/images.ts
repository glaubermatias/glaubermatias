/**
 * Centralized image catalog.
 *
 * All UI components and data files import images from here so we have
 * a single source of truth. Replace the right-hand side of any entry
 * to swap an image across the whole site.
 *
 * - Local assets live under `src/assets` (imported so Vite hashes them)
 * - Public assets can live under `/public/images/...` and be referenced
 *   as plain strings (e.g. `'/images/my-photo.jpg'`)
 * - Remote URLs are kept inline for now.
 */

// ────────────────────────────────────────────────────────────────────────────
// Local asset imports
// ────────────────────────────────────────────────────────────────────────────
import glauberPortrait from '@/assets/glauber-portrait.png';
import glauberPhoto from '@/assets/glauber-photo.jpg';
import glauberHero from '@/assets/glauber-hero.jpg';
import glauberAboutHeader from '@/assets/glauber-about-header.jpg';
import smileIcon from '@/assets/smile-icon.png';
import gradientBg from '@/assets/gradient-bg.png';

/* about ── single folder for "About" page imagery */
import beyond01 from '@/assets/about/01.jpeg';
import beyond02 from '@/assets/about/02.jpeg';
import beyond03 from '@/assets/about/03.jpeg';
import beyond04 from '@/assets/about/04.jpg';
import beyond05 from '@/assets/about/05.jpeg';
import beyond06 from '@/assets/about/06.jpeg';
import beyond07 from '@/assets/about/07.jpeg';
import beyond08 from '@/assets/about/08.jpg';
import beyond09 from '@/assets/about/09.jpg';
import beyond10 from '@/assets/about/10.jpeg';

import japaneseFood from '@/assets/about/japanese-food.png';
import taylorSwift from '@/assets/about/taylor-swift.png';
import fernandoDeNoronha from '@/assets/about/fernando-de-noronha.jpg';
import theOffice from '@/assets/about/the-office.png';
import whiteChicks from '@/assets/about/white-chicks.jpg';
import openWaterSwimming from '@/assets/about/open-water-swimming.jpg';

// ────────────────────────────────────────────────────────────────────────────
// Site-wide images (Home, About, etc.)
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
} as const;

/* aboutImages ── groups all imagery shown on the About page */
export const aboutImages = {
  beyondWork: [
    beyond01, beyond02, beyond03, beyond04, beyond05,
    beyond06, beyond07, beyond08, beyond09, beyond10,
  ] as const,
  funFacts: {
    japaneseFood,
    taylorSwift,
    fernandoDeNoronha,
    theOffice,
    whiteChicks,
    openWaterSwimming,
  } as const,
} as const;

// ────────────────────────────────────────────────────────────────────────────
// Project images — carousels & bento galleries
// Keyed by project id (matches `src/data/projects.ts`).
// ────────────────────────────────────────────────────────────────────────────
export interface ProjectImageEntry {
  images: string[];
  bentoGalleries?: {
    id: string;
    label: string;
    images: { src: string }[];
  }[];
}

export const projectImages: Record<string, ProjectImageEntry> = {
  'leadership-academy': {
    images: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
    ],
    bentoGalleries: [
      {
        id: 'high-performance-teams',
        label: 'High Performance Teams',
        images: [
          { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop' },
          { src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop' },
          { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop' },
          { src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop' },
        ],
      },
      {
        id: 'artificial-intelligence',
        label: 'Artificial Intelligence',
        images: [
          { src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop' },
          { src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop' },
          { src: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=1200&auto=format&fit=crop' },
          { src: 'https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?w=1200&auto=format&fit=crop' },
        ],
      },
      {
        id: 'equity',
        label: 'Equity',
        images: [
          { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&auto=format&fit=crop' },
          { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&auto=format&fit=crop' },
          { src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop' },
          { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop' },
        ],
      },
      {
        id: 'hiring',
        label: 'Hiring',
        images: [
          { src: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&auto=format&fit=crop' },
          { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&auto=format&fit=crop' },
          { src: 'https://images.unsplash.com/photo-1560264280-88b68371db39?w=1200&auto=format&fit=crop' },
          { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&auto=format&fit=crop' },
        ],
      },
    ],
  },
  'pitch-decks': {
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    ],
  },
  'all-hands-and-leadership-meetings': {
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
    ],
  },
  'summit': {
    images: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop',
    ],
  },
  'templates-library': {
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
    ],
  },
  'presentation-templates': {
    images: [
      'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
    ],
  },
  'presentation-masterclasses': {
    images: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop',
    ],
  },
  'tech-meetups': {
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
    ],
  },
  'tech-conference': {
    images: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
    ],
  },
  'tech-interns-onboarding': {
    images: [
      'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop',
    ],
  },
  'tech-newsletter': {
    images: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
    ],
  },
  'ALDI-case-study': {
    images: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
    ],
  },
  'Uberall-dashboard': {
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
    ],
  },
  'booklet': {
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
    ],
  },
  'ny-trip-itinerary': {
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
    ],
  },
};
