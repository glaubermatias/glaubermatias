import { projectImages } from '@/config/images';

export type ProjectCategory = 'all' | 'executive-decks' | 'templates' | 'tech-events' | 'hr-initiatives' | 'side-projects';

export interface BigNumber {
  value: string;
  label: string;
  description?: string;
}

export interface ProcessImage {
  src: string;
  caption?: string;
}

export interface BentoGallery {
  id: string;
  label: string;
  images?: ProcessImage[];
}

export interface Quote {
  text: string;
  author?: string;
  role?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  cardDescription?: string;
  category: ProjectCategory;
  images: string[];
  /** Optional override for card carousels. Falls back to `images` when omitted. */
  cardImages?: string[];
  year: string;
  client: string;
  company?: string;
  cardCategory?: string;
  duration?: string;
  featured?: boolean;
  bigNumbers?: BigNumber[];
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  /** Optional richer fields used by the project detail page */
  headerImage?: string;
  /** Header H1. Independent from `title` so the bento label and header don't share text. */
  headerTitle?: string;
  /** Label shown in the bento gallery selector. Independent from `title`. */
  galleryLabel?: string;
  /** Independent bento selector pills. Never sourced from related projects. */
  bentoGalleries?: BentoGallery[];
  tldr?: string;
  meaningfulTitle?: string;
  context?: string;
  /** Problem block on the detail page. Independent from `challenge`. */
  problem?: string;
  strategy?: string;
  processImages?: ProcessImage[];
  tradeoffs?: string;
  liveImages?: string[];
  quote?: Quote;
  closingParagraph?: string;
  role?: string;
  skills?: string[];
  stakeholders?: string;
  tools?: string;
  beforeAfter?: { before: string; after: string };
}


const _projectsRaw: ProjectData[] = [
  {
    id: 'leadership-academy',
    title: 'High Performance Teams',
    headerTitle: 'Leadership Academy',
    galleryLabel: 'High Performance Teams',
    cardDescription: 'Transforming dense narratives into sharp visual frameworks for 260+ leaders',
    description: 'Leadership development materials for senior executives.',
    category: 'executive-decks',
    company: 'QuintoAndar',
    cardCategory: 'Executive Decks',
    duration: '3 weeks per edition',
    role: 'Lead Presentation Designer',
    meaningfulTitle: 'Transforming dense narratives into sharp visual frameworks for 260+ leaders',
    tldr: 'The Leadership Academy is QuintoAndar\'s bet to strengthen its senior leadership team. My role was to translate around 40 pages of dense text per edition into sharp visual frameworks so 260+ leaders could absorb and cascade the core messages to their teams. The result? An average NPS of 4.6/5.',
    context: 'QuintoAndar believes its people are the true engine driving the company forward. Preparing the leadership team to tackle complex challenges is a crucial strategy to keep the entire organization moving in the same direction. To make this happen, every Academy edition kicked off with the L&D team handing over a 20 to 40-page document detailing a core theme tied to the company\'s momentum.',
    problem: 'Topics like "Hiring", "Equity", "AI", and "High Performance Teams" are notoriously dense. The risk here was that if the message failed to land, it would not resonate with our top management, leaving them ill-equipped to guide their teams. I needed to turn these heavy narratives into engaging visual frameworks, tailored to both the specific subject and the distinct delivery styles of our C-level speakers.',
    strategy: 'Instead of jumping straight into design software, I started by decoding the brief into a clear vision of the core message and the reason why the audience should care about it. After structuring the information hierarchy, I translated these abstract concepts into concrete visual assets, ensuring they matched the natural cadence of the speakers. This turned the presentation into a powerful stage tool rather than mere background decoration.',
    bentoGalleries: projectImages['leadership-academy'].bentoGalleries,
    images: projectImages['leadership-academy'].images,
    cardImages: projectImages['leadership-academy'].cardImages,
    beforeAfter: projectImages['leadership-academy'].beforeAfter,
    year: '2025',
    client: 'QuintoAndar',
    featured: true,
    stakeholders: 'C-level speakers, L&D team, 260+ senior leaders',
    tools: 'Google Slides, Adobe Illustrator, Figma',
    tradeoffs: 'No sugar coating: getting time on a global executive\'s calendar is no easy task. To keep asynchronous reviews moving, I prioritized the most complex slides right after every sync, giving the speakers more time to digest the most critical content. From time to time, I also had to balance my technical design recommendations with their personal preferences, pointing out visual risks but leaving the final decision to them. At the end of the day, my golden rule is that stage confidence outweighs design purity.',
    bigNumbers: [
      { value: '4.6/5', label: 'Audience satisfaction', description: 'Average NPS rating sustained across four editions.' },
      { value: '~21%', label: 'Content clarity', description: 'Average share of open-ended feedback praising the content and its clear structure.' },
      { value: '100+', label: 'Slide layouts', description: 'Reusable layouts shipped into the production system.' },
    ],
    overview: 'Leadership Academy overview kept as legacy metadata only.',
    challenge: 'Legacy challenge kept only for archive compatibility.',
    solution: 'Legacy solution kept only for archive compatibility.',
    closingParagraph: 'The true value was unlocking the full potential of these strategic initiatives, making their messages clear and impactful. By stepping into the shoes of both the L&D team and the C-level speakers, I turned a potential bottleneck of heavy text into a clear path for action. When it comes down to it, great presentation design clears the noise so that the leaders don\'t have to guess their next step to keep moving forward. They know it.',
    results: ['Successfully deployed across 5 leadership cohorts', 'Increased participant engagement by 40%', 'Became the standard template for all leadership programs'],
  },
  {
    id: 'investor-deck',
    title: 'Investor deck',
    headerTitle: 'Investor deck',
    cardDescription: 'Strategic investor narrative to communicate value and secure funding',
    description: 'Strategic investor deck designed to communicate value propositions and secure funding.',
    category: 'executive-decks',
    company: 'QuintoAndar',
    cardCategory: 'Executive Decks',
    images: projectImages['investor-deck'].images,
    year: '2026',
    client: 'QuintoAndar',
    featured: true,
  },
  {
    id: 'summit',
    title: 'Summit',
    headerTitle: 'Summit',
    meaningfulTitle: 'Building high-impact keynote systems for large-scale corporate stages.',
    cardDescription: 'High-impact keynote presentations for major corporate summit events',
    description: 'High-impact keynote and session presentations for major corporate summit events with thousands of attendees.',
    category: 'executive-decks',
    company: 'QuintoAndar',
    cardCategory: 'Executive Decks',
    images: projectImages['summit'].images,
    year: '2023',
    client: 'QuintoAndar',
    featured: true,
  },
  {
    id: 'template-library',
    title: 'Template library',
    headerTitle: 'Template library',
    cardDescription: 'Scalable template system enabling consistent, on-brand materials',
    description: 'Comprehensive library of presentation templates enabling teams to create consistent, on-brand materials quickly.',
    category: 'templates',
    company: 'QuintoAndar',
    cardCategory: 'Templates',
    images: projectImages['template-library'].images,
    year: '2025',
    client: 'QuintoAndar',
    featured: true,
  },
  {
    id: 'institutional-deck',
    title: 'Institutional deck',
    headerTitle: 'Institutional deck',
    cardDescription: 'Institutional narrative communicating the company\'s vision and brand.',
    description: 'Institutional deck telling the company\'s story to external audiences.',
    category: 'executive-decks',
    company: 'QuintoAndar',
    cardCategory: 'Executive Decks',
    images: projectImages['institutional-deck'].images,
    year: '2026',
    client: 'QuintoAndar',
  },
  {
    id: 'tech-talks',
    title: 'Tech talks',
    headerTitle: 'Tech talks',
    cardDescription: 'Dynamic presentation materials for tech community talks',
    description: 'Engaging presentation materials for technology community talks and knowledge-sharing sessions.',
    category: 'tech-events',
    company: 'QuintoAndar',
    cardCategory: 'Tech Events',
    images: projectImages['tech-talks'].images,
    year: '2025',
    client: 'QuintoAndar',
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    headerTitle: 'Newsletter',
    description: 'Professional newsletter design and templates for people & technology communications.',
    category: 'hr-initiatives',
    company: 'QuintoAndar',
    cardCategory: 'HR Initiatives',
    images: projectImages['newsletter'].images,
    year: '2025',
    client: 'QuintoAndar',
  },
  {
    id: 'all-hands',
    title: 'All Hands',
    headerTitle: 'All Hands',
    meaningfulTitle: 'Aligning company-wide updates with clear, executive-ready storytelling.',
    description: 'Engaging company-wide all-hands presentations that align teams and communicate strategic vision.',
    category: 'executive-decks',
    company: 'QuintoAndar',
    cardCategory: 'Executive Decks',
    images: projectImages['all-hands'].images,
    year: '2026',
    client: 'QuintoAndar',
  },
  {
    id: 'brilliant-youth',
    title: 'Brilliant Youth',
    headerTitle: 'Brilliant Youth',
    cardDescription: 'Engaging onboarding experience for young talent',
    description: 'Engaging onboarding program creating an impactful first impression and accelerating productivity.',
    category: 'hr-initiatives',
    company: 'QuintoAndar',
    cardCategory: 'HR Initiatives',
    images: projectImages['brilliant-youth'].images,
    year: '2025',
    client: 'QuintoAndar',
  },
  {
    id: 'tech-conferences',
    title: 'Tech conferences',
    headerTitle: 'Tech conferences',
    description: 'Conference-grade presentations for major technology events featuring cinematic visuals and compelling narratives.',
    category: 'tech-events',
    company: 'QuintoAndar',
    cardCategory: 'Tech Events',
    images: projectImages['tech-conferences'].images,
    year: '2025',
    client: 'QuintoAndar',
  },
  {
    id: 'ny-trip-itinerary',
    title: 'NY trip itinerary',
    headerTitle: 'NY trip itinerary',
    description: 'Beautifully designed travel itinerary presentation combining practical information with visual storytelling.',
    category: 'side-projects',
    company: 'Personal endeavor',
    cardCategory: 'Side Projects',
    images: projectImages['ny-trip-itinerary'].images,
    year: '2024',
    client: 'Personal endeavor',
  },
  {
    id: 'booklet',
    title: 'Booklet',
    headerTitle: 'Booklet',
    description: 'Print and digital booklet design showcasing creative layout techniques and typography exploration.',
    category: 'side-projects',
    company: 'UCLA bootcamp',
    cardCategory: 'Side Projects',
    images: projectImages['booklet'].images,
    year: '2024',
    client: 'UCLA bootcamp',
  },
  {
    id: 'aldi-case-study',
    title: 'ALDI case study',
    headerTitle: 'ALDI case study',
    cardDescription: 'Strategic analysis for retail optimization and market positioning',
    description: 'Strategic analysis and presentation case study for retail optimization and market positioning.',
    category: 'side-projects',
    company: 'ALDI',
    cardCategory: 'Side Projects',
    images: projectImages['aldi-case-study'].images,
    year: '2023',
    client: 'ALDI',
  },
  {
    id: 'uberall-dashboard',
    title: 'Uberall Dashboard',
    headerTitle: 'Uberall Dashboard',
    description: 'Dashboard design and data visualization project for location marketing analytics platform.',
    category: 'side-projects',
    company: 'Uberall',
    cardCategory: 'Side Projects',
    images: projectImages['uberall-dashboard'].images,
    year: '2023',
    client: 'Uberall',
  },
];

const EDITORIAL_PLACEHOLDERS = {
  meaningfulTitle: 'Strategic presentation system built to make complex work clear, memorable, and easy to act on.',
  tldr: 'A concise project summary will live here, written in the same editorial tone and visual system as the rest of the portfolio.',
  context: 'Context placeholder: describe the business moment, audience, and conditions that shaped this project.',
  problem: 'Problem placeholder: describe the core communication challenge, risk, or friction the work needed to solve.',
  strategy: 'Strategy placeholder: describe the narrative, design system, and production choices that guided the solution.',
  tradeoffs: 'Trade-offs placeholder: describe the constraints, compromises, and decisions that shaped the final direction.',
  closingParagraph: 'Closing placeholder: summarize the impact of the project and the final takeaway for the audience.',
};

const makeProcessTiles = (p: ProjectData): ProcessImage[] => {
  const source = p.processImages && p.processImages.length > 0
    ? p.processImages
    : p.images.map((src) => ({ src }));

  // Render exactly as many tiles as there are source images — no padding,
  // no truncation. The bento grid layout adapts to the actual count.
  return source;
};

const normalizedProjects: ProjectData[] = _projectsRaw.map((p) => {
  const galleryLabel = p.galleryLabel ?? p.headerTitle ?? p.title;

  return {
    ...p,
    headerTitle: p.headerTitle ?? p.title,
    galleryLabel,
    meaningfulTitle: p.meaningfulTitle ?? EDITORIAL_PLACEHOLDERS.meaningfulTitle,
    tldr: p.tldr ?? EDITORIAL_PLACEHOLDERS.tldr,
    context: p.context ?? EDITORIAL_PLACEHOLDERS.context,
    problem: p.problem ?? EDITORIAL_PLACEHOLDERS.problem,
    strategy: p.strategy ?? EDITORIAL_PLACEHOLDERS.strategy,
    tradeoffs: p.tradeoffs ?? EDITORIAL_PLACEHOLDERS.tradeoffs,
    closingParagraph: p.closingParagraph ?? EDITORIAL_PLACEHOLDERS.closingParagraph,
    bentoGalleries: p.bentoGalleries && p.bentoGalleries.length > 0
      ? p.bentoGalleries.map((gallery) => ({
        ...gallery,
        images: gallery.images && gallery.images.length > 0 ? gallery.images : makeProcessTiles(p),
      }))
      : [{ id: `${p.id}-gallery`, label: galleryLabel, images: makeProcessTiles(p) }],
  };
});

export const projects: ProjectData[] = normalizedProjects;


export const getProjectById = (id: string): ProjectData | undefined => {
  return normalizedProjects.find(project => project.id === id);
};

export const getRelatedProjects = (projectId: string, limit: number = 3): ProjectData[] => {
  const currentProject = getProjectById(projectId);
  if (!currentProject) return [];
  const sameCategory = normalizedProjects
    .filter(p => p.category === currentProject.category && p.id !== projectId)
    .filter(p => Boolean(p.headerTitle && p.meaningfulTitle && p.tldr));

  return sameCategory
    .slice(0, limit);
};

export const getFeaturedProjects = (limit: number = 6): ProjectData[] => {
  return normalizedProjects.filter(p => p.featured).slice(0, limit);
};
