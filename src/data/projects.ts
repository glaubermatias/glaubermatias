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
    company: 'QUINTOANDAR',
    cardCategory: 'Executive Decks',
    duration: '3 weeks per edition',
    role: 'Lead Presentation Designer',
    meaningfulTitle: 'Transforming dense narratives into sharp visual frameworks for 260+ leaders',
    tldr: 'The Leadership Academy is QuintoAndar\'s bet to strengthen its senior leadership team. My role was to translate around 40 pages of dense text per edition into sharp visual frameworks so 260+ leaders could truly absorb and cascade the core messages to their teams. The result? An average NPS of 4.6/5.',
    context: 'QuintoAndar believes its people are the true engine driving the company forward. Preparing the leadership team to tackle complex challenges is a crucial strategy to keep the entire organization moving in the same direction. To make this happen, every Academy edition kicked off with the L&D team handing over a 20 to 40-page document detailing a core theme tied to the company\'s momentum.',
    problem: 'Topics like "Hiring", "Equity", "AI", and "High Performance Teams" are notoriously dense. The risk here was that if the message failed to land, it would not resonate with our top management, leaving them ill-equipped to guide their teams. I needed to turn these heavy narratives into engaging visual frameworks, tailored to both the specific subject and the distinct delivery styles of our C-level speakers.',
    strategy: 'Instead of jumping straight into design software, I started by decoding the brief into a clear vision of the core message and the reason why the audience should care about it. After structuring the information hierarchy, I translated these abstract concepts into concrete visual assets, ensuring they matched the natural cadence of the speakers. This turned the presentation into a powerful stage tool rather than mere background decoration.',
    bentoGalleries: projectImages['leadership-academy'].bentoGalleries,
    images: projectImages['leadership-academy'].images,
    year: '2024',
    client: 'QUINTOANDAR',
    featured: true,
    stakeholders: 'C-level speakers, L&D team, Executive sponsors',
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
    closingParagraph: 'The real win here went beyond surviving tight deadlines or making information look good. The true value was unlocking the full potential of these strategic initiatives, making their messages clear and impactful. By stepping into the shoes of both the L&D team and the C-level speakers, I turned a potential bottleneck of heavy text into a clear path for action. When it comes down to it, great presentation design clears the noise so that the leaders don\'t have to guess their next step to keep moving forward. They know it.',
    results: ['Successfully deployed across 5 leadership cohorts', 'Increased participant engagement by 40%', 'Became the standard template for all leadership programs'],
  },
  {
    id: 'pitch-decks',
    title: 'Hiring',
    headerTitle: 'Hiring',
    meaningfulTitle: 'Turning recruiting strategy into a sharper executive narrative.',
    cardDescription: 'Strategic investor pitch decks to communicate value and secure funding',
    description: 'Strategic investor pitch decks designed to communicate value propositions and secure funding for innovative ventures.',
    category: 'executive-decks',
    company: 'Various Startups',
    cardCategory: 'Executive Decks',
    duration: '2 Months',
    images: projectImages['pitch-decks'].images,
    year: '2024',
    client: 'Various Startups',
    featured: true,
    stakeholders: 'Founders, CFOs, Investor relations',
    tools: 'Figma, Keynote, PowerPoint',
    tradeoffs: 'Each deck was tailored from scratch rather than templated, since investor narratives demanded uniqueness. This raised production time, but raised average investor response quality significantly.',
    bigNumbers: [
      { value: '$20M+', label: 'Combined funding secured', description: 'Capital raised across the supported pitch rounds.' },
      { value: '90%', label: 'Positive investor feedback', description: 'Sentiment captured in post-pitch investor feedback.' },
      { value: '15+', label: 'Startups served', description: 'Early-stage teams supported end-to-end.' },
    ],
    overview: 'Collection of investor-ready pitch decks crafted to tell compelling stories and present data in visually impactful ways.',
    challenge: 'Each startup had unique value propositions that needed to be communicated clearly to sophisticated investors in a short time frame.',
    solution: 'Created narrative-driven decks with progressive disclosure, custom infographics, and clear data visualization.',
    results: ['Helped secure over $20M in combined funding', '90% positive investor feedback on presentation clarity', 'Established reusable pitch frameworks'],
  },
  {
    id: 'all-hands-and-leadership-meetings',
    title: 'All Hands & Leadership Meetings',
    headerTitle: 'All Hands & Leadership Meetings',
    meaningfulTitle: 'Aligning company-wide updates with clear, executive-ready storytelling.',
    description: 'Engaging company-wide and leadership meeting presentations that align teams and communicate strategic vision.',
    category: 'executive-decks',
    cardCategory: 'Executive Decks',
    images: projectImages['all-hands-and-leadership-meetings'].images,
    year: '2024',
    client: 'Enterprise Company',
    bigNumbers: [
      { value: '+35%', label: 'Satisfaction scores', description: 'Reported satisfaction in post-event surveys.' },
      { value: '-50%', label: 'Preparation time', description: 'Cut in time spent preparing recurring meetings.' },
      { value: '20+', label: 'Meetings designed', description: 'Recurring leadership and all-hands sessions designed.' },
    ],
    overview: 'Presentation materials for quarterly all-hands meetings and monthly leadership sync sessions.',
    challenge: 'Maintaining engagement across diverse audiences while effectively communicating company updates.',
    solution: 'Developed a consistent visual framework with dynamic data visualizations and clear action items.',
    results: ['Improved meeting satisfaction scores by 35%', 'Reduced presentation preparation time by 50%', 'Created reusable templates'],
  },
  {
    id: 'summit',
    title: 'Summit',
    headerTitle: 'Summit',
    meaningfulTitle: 'Building high-impact keynote systems for large-scale corporate stages.',
    cardDescription: 'High-impact keynote presentations for major corporate summit events',
    description: 'High-impact keynote and session presentations for major corporate summit events with thousands of attendees.',
    category: 'executive-decks',
    company: 'Global Corporation',
    cardCategory: 'Executive Decks',
    duration: '4 Months',
    images: projectImages['summit'].images,
    year: '2024',
    client: 'Global Corporation',
    featured: true,
    stakeholders: 'CEO, Comms team, Event production',
    tools: 'Figma, Keynote, After Effects',
    tradeoffs: 'Cinematic motion was constrained to keynote-only moments to preserve clarity for breakout sessions, where speakers needed slides that worked even with weak rehearsal time.',
    bigNumbers: [
      { value: '4.9/5', label: 'Average session rating', description: 'Average rating across designed sessions.' },
      { value: '2K+', label: 'Attendees', description: 'In-person and remote attendees reached.' },
      { value: '12', label: 'Sessions designed', description: 'Stage-ready sessions designed end-to-end.' },
    ],
    overview: 'Complete presentation package for annual corporate summit.',
    challenge: 'Creating presentations impactful in large venue settings while maintaining brand consistency.',
    solution: 'Designed bold, high-contrast visuals optimized for large screens with carefully timed animations.',
    results: ['Highest-rated summit in company history', '4.9/5 average session rating', 'Style adopted for all future events'],
  },
  {
    id: 'templates-library',
    title: 'Templates Library',
    cardDescription: 'Scalable template system enabling consistent, on-brand materials',
    description: 'Comprehensive library of presentation templates enabling teams to create consistent, on-brand materials quickly.',
    category: 'templates',
    company: 'Enterprise Client',
    cardCategory: 'Templates',
    duration: '6 Months',
    images: projectImages['templates-library'].images,
    year: '2024',
    client: 'Enterprise Client',
    featured: true,
    stakeholders: 'Brand team, Marketing, Sales enablement',
    tools: 'Figma, PowerPoint, Keynote',
    tradeoffs: 'PowerPoint was chosen as the master format over Figma to maximize adoption, even though it constrained typographic and motion options. Governance won over creative ceiling.',
    bigNumbers: [
      { value: '95%', label: 'Adoption rate', description: 'Share of teams actively using the system.' },
      { value: '-60%', label: 'Creation time', description: 'Reduction in average deck creation time.' },
      { value: '100+', label: 'Slide layouts', description: 'Reusable layouts shipped into the production system.' },
    ],
    overview: 'A scalable template system with 100+ slide layouts.',
    challenge: 'Multiple departments creating presentations with inconsistent branding.',
    solution: 'Built a comprehensive template library with intuitive categorization and built-in brand guidelines.',
    results: ['Adopted by 95% of the organization', 'Reduced creation time by 60%', 'Consistent brand representation'],
  },
  {
    id: 'presentation-templates',
    title: 'Presentation Templates',
    description: 'Purpose-built presentation templates for specific use cases including sales, proposals, and reports.',
    category: 'templates',
    cardCategory: 'Templates',
    images: projectImages['presentation-templates'].images,
    year: '2024',
    client: 'Various Clients',
    bigNumbers: [
      { value: '-70%', label: 'Customization time', description: 'Reduction in template customization effort.' },
      { value: '30+', label: 'Templates created', description: 'Templates shipped across business functions.' },
      { value: '8', label: 'Business functions', description: 'Distinct functions covered by the system.' },
    ],
    overview: 'Specialized templates designed for specific business functions.',
    challenge: 'Generic templates not meeting the needs of different business functions.',
    solution: 'Created purpose-built templates with pre-configured layouts for each use case.',
    results: ['Reduced customization time by 70%', 'Improved quality consistency', 'Enabled non-designers to create professional materials'],
  },
  {
    id: 'presentation-masterclasses',
    title: 'Presentation Masterclasses',
    description: 'Educational materials and workshop presentations teaching effective presentation design and delivery techniques.',
    category: 'templates',
    cardCategory: 'Templates',
    images: projectImages['presentation-masterclasses'].images,
    year: '2023',
    client: 'Corporate Training',
    bigNumbers: [
      { value: '500+', label: 'Professionals trained', description: 'Practitioners trained across the program.' },
      { value: '92%', label: 'Reported improvement', description: 'Participants reporting tangible skill improvement.' },
      { value: '12', label: 'Workshop modules', description: 'Modules built into the masterclass curriculum.' },
    ],
    overview: 'Comprehensive training program materials.',
    challenge: 'Many professionals struggle with creating impactful presentations.',
    solution: 'Developed an interactive masterclass series with hands-on exercises.',
    results: ['Trained over 500 professionals', '92% reported improved skills', 'Created a self-service learning library'],
  },
  {
    id: 'tech-meetups',
    title: 'Tech Meetups',
    cardDescription: 'Dynamic presentation materials for tech community meetups',
    description: 'Engaging presentation materials for technology community meetups and knowledge-sharing sessions.',
    category: 'tech-events',
    company: 'Tech Community',
    cardCategory: 'Tech Events',
    duration: 'Ongoing',
    images: projectImages['tech-meetups'].images,
    year: '2024',
    client: 'Tech Community',
    featured: true,
    stakeholders: 'Engineering leads, DevRel, Community organizers',
    tools: 'Figma, Keynote, Notion',
    tradeoffs: 'Speakers received a tight visual system instead of full creative freedom, ensuring brand consistency across talks at the cost of individual stylistic flourishes.',
    bigNumbers: [
      { value: '+50%', label: 'Attendance increase', description: 'Sustained attendance growth across editions.' },
      { value: '24', label: 'Events designed', description: 'Community events shaped from concept to stage.' },
      { value: '4.8/5', label: 'Speaker satisfaction', description: 'Reported satisfaction in post-event surveys.' },
    ],
    overview: 'Presentation designs for regular technology meetups.',
    challenge: 'Technical content often becomes dry in traditional slide formats.',
    solution: 'Created dynamic layouts with syntax-highlighted code blocks and animated diagrams.',
    results: ['Increased meetup attendance by 50%', 'Improved audience engagement', 'Established a recognizable visual brand'],
  },
  {
    id: 'tech-conference',
    title: 'Tech Conference',
    description: 'Conference-grade presentations for major technology events featuring cinematic visuals and compelling narratives.',
    category: 'tech-events',
    cardCategory: 'Tech Events',
    images: projectImages['tech-conference'].images,
    year: '2024',
    client: 'Major Tech Conference',
    bigNumbers: [
      { value: 'Top 10%', label: 'Session ratings', description: 'Average rating across designed sessions.' },
      { value: '5', label: 'Conference invites', description: 'Repeat invitations earned the following year.' },
      { value: '10K+', label: 'Social shares', description: 'Organic shares across community channels.' },
    ],
    overview: 'Keynote and session presentations for large-scale technology conferences.',
    challenge: 'Presentations need to stand out among hundreds of sessions.',
    solution: 'Designed bold, memorable visuals with strong narrative arcs.',
    results: ['Sessions consistently rated in top 10%', 'Received additional conference invitations', 'Widely shared on social media'],
  },
  {
    id: 'tech-interns-onboarding',
    title: 'Brilliant Youth',
    cardDescription: 'Engaging onboarding experience for technology interns',
    description: 'Engaging onboarding program for technology interns creating an impactful first impression and accelerating productivity.',
    category: 'hr-initiatives',
    company: 'Tech Company HR',
    cardCategory: 'HR Initiatives',
    duration: '2 Months',
    images: projectImages['tech-interns-onboarding'].images,
    year: '2024',
    client: 'Tech Company HR',
    featured: true,
    stakeholders: 'HR, Tech hiring managers, Intern program leads',
    tools: 'Figma, Keynote, Notion',
    tradeoffs: 'Gamified elements were kept lightweight to avoid overshadowing the technical content, balancing playful tone with the seriousness of a real engineering onboarding.',
    bigNumbers: [
      { value: '-40%', label: 'Time-to-productivity', description: 'Faster ramp from day one to full contribution.' },
      { value: '98%', label: 'Intern satisfaction', description: 'Reported satisfaction across the intern cohorts.' },
      { value: '60+', label: 'Interns onboarded', description: 'Reported satisfaction across the intern cohorts.' },
    ],
    overview: 'Complete onboarding experience for technology interns.',
    challenge: 'Creating an onboarding experience that engages young professionals.',
    solution: 'Developed a visually engaging, interactive onboarding journey with gamification elements.',
    results: ['Reduced time-to-productivity by 40%', '98% intern satisfaction', 'Increased intern-to-full-time conversion'],
  },
  {
    id: 'tech-newsletter',
    title: 'P&T External Newsletter',
    description: 'Professional newsletter design and templates for external technology and people communications.',
    category: 'hr-initiatives',
    cardCategory: 'HR Initiatives',
    images: projectImages['tech-newsletter'].images,
    year: '2024',
    client: 'People & Technology Team',
    bigNumbers: [
      { value: '+45%', label: 'Open rate increase', description: 'Lift in average newsletter open rate.' },
      { value: '+200%', label: 'Subscriber growth', description: 'Growth in active newsletter subscribers.' },
      { value: '24', label: 'Editions designed', description: 'Editions designed across the publishing year.' },
    ],
    overview: 'External-facing newsletter design.',
    challenge: 'Creating a newsletter that effectively communicates to external audiences.',
    solution: 'Designed a modular newsletter template with engaging visuals.',
    results: ['Increased open rates by 45%', 'Grew subscriber base by 200%', 'Enhanced employer brand perception'],
  },
  {
    id: 'ALDI-case-study',
    title: 'ALDI Case Study',
    cardDescription: 'Strategic analysis for retail optimization and market positioning',
    description: 'Strategic analysis and presentation case study for retail optimization and market positioning.',
    category: 'side-projects',
    company: 'Personal Project',
    cardCategory: 'Side Projects',
    duration: '1 Month',
    images: projectImages['ALDI-case-study'].images,
    year: '2024',
    client: 'Personal Project',
    featured: true,
    stakeholders: 'Self-initiated, mentor reviewers',
    tools: 'Figma, Keynote, Excel',
    tradeoffs: 'Scope was narrowed to three core markets to keep the analysis honest within the available data, rather than diluting the case with surface-level global claims.',
    bigNumbers: [
      { value: '3', label: 'Markets analyzed', description: 'Geographies analyzed in the case study.' },
      { value: '40+', label: 'Data points', description: 'Quantitative inputs powering the analysis.' },
      { value: '15', label: 'Recommendations', description: 'Strategic recommendations delivered.' },
    ],
    overview: 'In-depth case study analyzing retail strategies.',
    challenge: 'Transforming complex business analysis into visually compelling format.',
    solution: 'Created a narrative-driven case study with clear data visualizations.',
    results: ['Featured in portfolio showcases', 'Used as teaching material', 'Demonstrated strategic thinking'],
  },
  {
    id: 'Uberall-dashboard',
    title: 'Uberall Dashboard',
    description: 'Dashboard design and data visualization project for location marketing analytics platform.',
    category: 'side-projects',
    cardCategory: 'Side Projects',
    images: projectImages['Uberall-dashboard'].images,
    year: '2023',
    client: 'Personal Project',
    bigNumbers: [
      { value: '50+', label: 'Data visualizations', description: 'Custom data visualizations crafted.' },
      { value: '8', label: 'Dashboard views', description: 'Distinct dashboard views designed.' },
      { value: '3', label: 'User personas', description: 'User personas guiding the experience.' },
    ],
    overview: 'Conceptual dashboard design exploring data visualization.',
    challenge: 'Presenting complex multi-location data for quick insights.',
    solution: 'Designed an intuitive dashboard with hierarchical data views.',
    results: ['Explored innovative visualization techniques', 'Refined dashboard design skills', 'Created reusable component library'],
  },
  {
    id: 'booklet',
    title: 'Graphic Design Project',
    description: 'Print and digital booklet design showcasing creative layout techniques and typography exploration.',
    category: 'side-projects',
    cardCategory: 'Side Projects',
    images: projectImages['booklet'].images,
    year: '2023',
    client: 'Personal Project',
    bigNumbers: [
      { value: '32', label: 'Pages designed', description: 'Editorial pages laid out end-to-end.' },
      { value: '4', label: 'Typography styles', description: 'Type families paired across the system.' },
      { value: '2', label: 'Print editions', description: 'Editions designed across the publishing year.' },
    ],
  },
  {
    id: 'ny-trip-itinerary',
    title: 'NY Trip Itinerary',
    description: 'Beautifully designed travel itinerary presentation combining practical information with visual storytelling.',
    category: 'side-projects',
    cardCategory: 'Side Projects',
    images: projectImages['ny-trip-itinerary'].images,
    year: '2023',
    client: 'Personal Project',
    bigNumbers: [
      { value: '7', label: 'Days planned', description: 'Days mapped across the full itinerary.' },
      { value: '25+', label: 'Curated spots', description: 'Hand-picked locations woven into the route.' },
      { value: '5', label: 'Infographic maps', description: 'Custom maps illustrating the journey.' },
    ],
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

  if (source.length === 0) return [];

  return Array.from({ length: 8 }, (_, index) => source[index % source.length]);
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
