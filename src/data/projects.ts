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
  isNDA?: boolean;
  /** Hidden projects stay in the registry but never surface in the UI. */
  hidden?: boolean;
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
  beforeAfter?: { before: string; after: string } | null;
}


const _projectsRaw: ProjectData[] = [
  {
    isNDA: true,
    id: 'leadership-academy',
    title: 'High Performance Teams',
    headerTitle: 'Leadership Academy',
    galleryLabel: 'High Performance Teams',
    cardDescription: 'Transforming dense narratives into sharp visual frameworks for 260+ leaders',
    description: 'Leadership development materials for senior executives.',
    category: 'tech-events',
    company: 'QuintoAndar',
    cardCategory: 'Events',
    duration: '3 weeks per edition',
    role: 'Lead Presentation Designer',
    meaningfulTitle: 'Transforming dense narratives into sharp visual frameworks for 260+ leaders',
    tldr: 'The Leadership Academy is QuintoAndar\'s bet to strengthen its senior leadership team. My role was to translate around 40 pages of dense text per edition into sharp visual frameworks, allowing 260+ executives to quickly absorb and cascade core messages to their teams. The initiative was a hit, sustaining an average NPS of 4.6/5.',
    context: 'QuintoAndar believes its people are the engine driving the company forward, and keeping everyone moving in the same direction requires a strong leadership team equipped to lead the way. That\'s why the Leadership Academy was created. Every edition kicked off with the Learning & Development (L&D) team handing over a 20 to 40-page document detailing a core strategic theme tied to the company\'s momentum.',
    problem: 'Topics like "Hiring", "Equity", and "AI" are incredibly dense. Imagine handing executives a 40-page wall of text for each subject. We would lose them before they even started reading. The risk here is that if these messages failed to land, our top management would just leave the room misaligned and unprepared to guide their teams. By stepping in, my goal was to turn these heavy narratives into engaging visual frameworks, tailoring them to both the subject and the distinct delivery styles of our C-level speakers.',
    strategy: 'Before jumping into any design software, my first step was to figure out the actual story we needed to tell. Making a slide look pretty? Sure, super doable. But to make the message truly resonate, I needed to find the reason why the audience should care. Once we had that anchor, the next step was translating those abstract concepts into concrete visual assets that matched the natural speaking cadence of our executives. Thus, the presentation became a real stage tool, rather than just some background decoration.',
    bentoGalleries: projectImages['leadership-academy'].bentoGalleries,
    images: projectImages['leadership-academy'].images,
    cardImages: projectImages['leadership-academy'].cardImages,
    beforeAfter: projectImages['leadership-academy'].beforeAfter,
    year: '2025',
    client: 'QuintoAndar',
    featured: true,
    stakeholders: 'C-level speakers, L&D team, 260+ senior leaders',
    tools: 'Google Slides, Adobe Illustrator',
    tradeoffs: 'Getting time on a global executive\'s calendar is always a challenge. To keep things moving async, I prioritized the most complex slides right after every sync, giving the speakers more time to digest the heaviest content. Along with that, I also had to balance technical recommendations with their personal preferences, pointing out the pros and cons but leaving the final call to them, since they are the ones who need to feel comfortable and confident to deliver the subjects.',
    bigNumbers: [
      { value: '4.6/5', label: 'Audience satisfaction', description: 'Average NPS rating sustained across four editions.' },
      { value: '200+', label: 'Leadership feedback', description: 'Written responses praising the content and the clear visual structure.' },
      { value: '100+', label: 'Slide layouts', description: 'Reusable layouts shipped into the production system.' },
    ],
    overview: 'Leadership Academy overview kept as legacy metadata only.',
    challenge: 'Legacy challenge kept only for archive compatibility.',
    solution: 'Legacy solution kept only for archive compatibility.',
    closingParagraph: "At the end of the day, my job wasn't just making the slides look good. It was turning complex information into a clear message that leaders could act on. By clearing the noise and structuring the narrative, I made sure the leadership team didn't have to guess what to do next. The biggest win was changing the room's reaction from \"what do we do with this?\" to \"when do we start?\".\n",
    results: ['Successfully deployed across 5 leadership cohorts', 'Increased participant engagement by 40%', 'Became the standard template for all leadership programs'],
  },
  {
    isNDA: true,
    id: 'investor-deck',
    title: 'Investor deck',
    headerTitle: 'Investor deck',
    cardDescription: 'Turning quarterly performance into a story investors can follow in one sitting',
    description: 'Strategic investor deck designed to communicate value propositions and secure funding.',
    category: 'executive-decks',
    company: 'QuintoAndar',
    cardCategory: 'Executive decks',
    meaningfulTitle: 'Turning quarterly performance into a story investors can follow in one sitting',
    tldr: 'I worked with the finance and strategy teams to shape the deck QuintoAndar uses when talking to investors, taking spreadsheets full of operational data and giving them a narrative arc, a consistent chart language, and a pace that holds up in a room where every minute counts.',
    context: 'Investor conversations happen on a tight clock, and the material has to work both as a live presentation and as a document people reread later. The starting point was usually a mix of spreadsheets, internal memos, and a few slides inherited from previous rounds, each with its own style.',
    problem: 'The numbers were solid, but they were scattered across charts that used different scales, colors, and levels of detail, so the audience spent energy decoding the format instead of following the argument. There was also no clear hierarchy between the headline story and the supporting evidence.',
    strategy: 'I started by mapping the argument, what we were claiming, what proved it, and what the audience would push back on, then built a chart system with one visual rule per data type so comparisons became obvious. Slide titles carry the takeaway, the visuals back it up, and the appendix holds the depth for whoever wants to dig in.',
    tradeoffs: 'Confidentiality limited how much detail could stay on screen, so a few charts were simplified and the granular version moved to the appendix. We also kept some legacy slides that leadership was already comfortable presenting, since familiarity on stage was worth more than a fully rebuilt deck.',
    bigNumbers: [
      { value: '60+', label: 'Slides restructured', description: 'Main narrative plus a supporting appendix built for deeper questions.' },
      { value: '1', label: 'Chart language', description: 'A single visual rule set applied to every data type across the deck.' },
    ],
    closingParagraph: 'What changed was not the data, it was how quickly someone could grasp it. The deck became a reference the team reuses each cycle instead of rebuilding from scratch.',
    role: 'Lead Presentation Designer',
    duration: '4 weeks',
    stakeholders: 'Finance, Strategy, and C-level leadership',
    tools: 'Google Slides, Figma, Adobe Illustrator',
    images: projectImages['investor-deck'].images,
    year: '2026',
    client: 'QuintoAndar',
    featured: true,
  },
  {
    isNDA: true,
    id: 'summit',
    title: 'Summit',
    headerTitle: 'Summit',
    meaningfulTitle: 'Designing the visual language of a company-wide summit, from keynote to stage',
    cardDescription: 'Keynote and stage visuals for a company-wide summit with thousands of attendees',
    description: 'High-impact keynote and session presentations for major corporate summit events with thousands of attendees.',
    category: 'tech-events',
    company: 'QuintoAndar',
    cardCategory: 'Events',
    tldr: 'The Summit brings the whole company together for a day of announcements and strategy. I designed the keynote and the supporting session decks, creating a visual language that held up on a large stage and stayed consistent across a dozen speakers with very different styles.',
    context: 'Content arrived from several teams at once, each with its own deck, its own fonts, and its own idea of what a good slide looks like. Everything had to converge into one show that felt intentional from the first slide to the last.',
    problem: 'On a big screen, small inconsistencies get loud. Beyond the visual mismatch, some talks were written to be read rather than presented, which meant dense slides competing with the speaker instead of supporting them.',
    strategy: 'I set up a stage-first template with typography sized for the back of the room, then ran short sessions with each speaker to cut text down to what actually needed to be seen. Rehearsals drove the final edits, since a slide that works on a laptop does not always work under stage lighting.',
    tradeoffs: 'Content kept changing until the last rehearsal, so I locked the visual system early and left the copy flexible. A couple of speakers preferred keeping their own slides, and I adapted those to the system instead of forcing a redesign that would have shaken their confidence on stage.',
    bigNumbers: [
      { value: '12', label: 'Speakers supported', description: 'Keynote and breakout sessions aligned to one visual system.' },
      { value: '1,000+', label: 'Attendees', description: 'Employees following the event live, in person and remotely.' },
    ],
    closingParagraph: 'By the end of the day the slides had done their job quietly, which is exactly the point. People left talking about the announcements, not about the deck.',
    role: 'Lead Presentation Designer',
    duration: '6 weeks',
    stakeholders: 'Internal Comms, Events, and executive speakers',
    tools: 'Google Slides, Figma, Adobe Illustrator',
    images: projectImages['summit'].images,
    year: '2023',
    client: 'QuintoAndar',
    featured: true,
  },
  {
    isNDA: false,
    id: 'template-library',
    title: 'Template library',
    headerTitle: 'Template library',
    cardDescription: 'A shared slide system that lets any team build on-brand decks without a designer',
    description: 'Comprehensive library of presentation templates enabling teams to create consistent, on-brand materials quickly.',
    category: 'templates',
    company: 'QuintoAndar',
    cardCategory: 'Templates',
    meaningfulTitle: 'A shared slide system that lets any team build on-brand decks without a designer',
    tldr: 'Most decks inside the company were built from copies of older decks, so quality depended on which file someone happened to duplicate. I built a template library organized by what people actually need to show, bullet points, timelines, charts, frameworks, and org charts, so a good starting point is always one click away.',
    context: 'Design requests were piling up for slides that did not really need a designer, they needed a decent layout. Meanwhile teams were shipping material with stretched logos, mismatched colors, and charts nobody could read.',
    problem: 'A generic template library would not solve it. People do not search for a layout, they search for a job to be done, and if the library does not speak that language it gets ignored within a month.',
    strategy: 'I audited hundreds of existing slides to find the recurring patterns, then rebuilt each one as a flexible layout with clear rules for spacing, color, and typography. Every category got usage notes and a filled example, so people could see the intent, not just the empty frame.',
    tradeoffs: 'Flexibility and consistency pull in opposite directions. I kept the system tight where brand perception is at stake and loose where teams need room, and I resisted adding every requested variation, since a library nobody can navigate is worse than a small one.',
    bigNumbers: [
      { value: '5', label: 'Slide categories', description: 'Bullet points, timelines, charts, frameworks, and org charts.' },
      { value: '100+', label: 'Ready-made layouts', description: 'Documented templates available to every team, no design request needed.' },
    ],
    closingParagraph: 'The library took the repetitive work off the design queue and gave teams a starting point they trust, which freed up time for the projects that actually need design thinking.',
    role: 'Lead Presentation Designer',
    duration: '8 weeks',
    stakeholders: 'Brand, Internal Comms, and cross-functional teams',
    tools: 'Google Slides, Figma, Adobe Illustrator',
    images: projectImages['template-library'].images,
    year: '2025',
    client: 'QuintoAndar',
    featured: true,
  },
  {
    isNDA: false,
    id: 'design-masterclasses',
    title: 'Design masterclasses',
    headerTitle: 'Design masterclasses',
    cardDescription: 'Teaching non-designers how to make their slides work harder',
    description: 'A series of internal masterclasses teaching presentation design fundamentals and visual storytelling.',
    category: 'side-projects',
    company: 'QuintoAndar',
    cardCategory: 'Side projects',
    meaningfulTitle: 'Teaching non-designers how to make their slides work harder',
    tldr: 'I ran a series of internal masterclasses on impactful presentations and data visualization, aimed at people who build their own decks every week. The goal was practical, give them a handful of decisions they can repeat, rather than a design theory lecture they forget by Friday.',
    context: 'Even with templates available, plenty of colleagues were still unsure about the basics, how much text is too much, which chart to pick, when color helps and when it just adds noise. Those questions kept coming back in one-on-one requests.',
    problem: 'Answering individually did not scale, and generic design content found online rarely matches the reality of a corporate deck built the night before a review.',
    strategy: 'I built two sessions around real slides from the company, showing the before and the after and explaining the reasoning behind each change. Participants worked on their own material during the class, so they left with an improved deck instead of a set of notes.',
    tradeoffs: 'I had to cut a lot of nuance to fit each session into an hour people would actually attend. Some topics got simplified into rules of thumb, which is not how design really works, but a rule someone applies beats a principle nobody remembers.',
    bigNumbers: [
      { value: '2', label: 'Masterclass tracks', description: 'Impactful presentations and data visualization, taught internally.' },
      { value: '150+', label: 'Colleagues trained', description: 'People building their own decks across different teams.' },
    ],
    closingParagraph: 'The clearest sign it worked was the drop in basic design requests, replaced by sharper conversations about narrative and structure.',
    role: 'Instructor and Presentation Designer',
    duration: 'Ongoing',
    stakeholders: 'L&D team and cross-functional participants',
    tools: 'Google Slides, Figma, Adobe Illustrator',
    images: projectImages['design-masterclasses']?.images ?? [],
    year: '2026',
    client: 'QuintoAndar',
    featured: true,
  },
  {
    isNDA: true,
    id: 'institutional-deck',
    title: 'Institutional deck',
    headerTitle: 'Institutional deck',
    cardDescription: 'One story about the company that every team can tell the same way',
    description: 'Institutional deck telling the company\'s story to external audiences.',
    category: 'executive-decks',
    company: 'QuintoAndar',
    cardCategory: 'Executive decks',
    meaningfulTitle: 'One story about the company that every team can tell the same way',
    tldr: 'Sales, partnerships, and recruiting were each explaining the company in their own words. I designed a single institutional deck with a modular structure, so every team tells a consistent story while still adapting the depth to their audience.',
    context: 'QuintoAndar shows up in a lot of external conversations, from partner meetings to hiring pitches, and each of those rooms had its own homemade version of the company story.',
    problem: 'Different versions meant different numbers, outdated claims, and a brand that felt slightly off depending on who was presenting. Keeping all of them updated was impossible.',
    strategy: 'I built the deck in modules, a fixed core that carries the positioning and the proof points, plus optional sections teams can add depending on the audience. Copy was written to be spoken out loud, and the data lives in a single place so updates happen once.',
    tradeoffs: 'Modularity risks turning into a mess of variations, so I capped the number of optional sections and documented when to use each one. Some teams wanted deeper product detail, which we moved into dedicated decks instead of inflating the institutional story.',
    bigNumbers: [
      { value: '3', label: 'Audience versions', description: 'Partners, clients, and talent, built from the same core narrative.' },
      { value: '1', label: 'Source of truth', description: 'A single deck teams update instead of maintaining private copies.' },
    ],
    closingParagraph: 'The company now sounds like one company in external rooms, which matters more than any individual slide in the deck.',
    role: 'Lead Presentation Designer',
    duration: '5 weeks',
    stakeholders: 'Brand, Communications, and Sales leadership',
    tools: 'Google Slides, Figma, Adobe Illustrator',
    images: projectImages['institutional-deck'].images,
    year: '2026',
    client: 'QuintoAndar',
  },
  {
    isNDA: false,
    id: 'tech-talks',
    title: 'Tech talks',
    headerTitle: 'Tech talks',
    cardDescription: 'Helping engineers turn deep technical work into talks people want to watch',
    description: 'Engaging presentation materials for technology community talks and knowledge-sharing sessions.',
    category: 'tech-events',
    company: 'QuintoAndar',
    cardCategory: 'Events',
    meaningfulTitle: 'Helping engineers turn deep technical work into talks people want to watch',
    tldr: 'I partnered with engineering teams on talks about the conversational platform, the design system, and generative AI, translating architecture diagrams and technical decisions into visuals that hold an audience without dumbing down the content.',
    context: 'These talks are how the tech organization shares what it is building, both internally and with the wider community. The speakers know their subject inside out, which is exactly what makes editing hard.',
    problem: 'Slides were often screenshots of documentation, dense diagrams and code pasted straight from the source. The information was all there, but the audience had to work to find the point of each slide.',
    strategy: 'I sat with each speaker to find the one idea per slide worth defending, then rebuilt the diagrams with a consistent visual grammar so layers, flows, and dependencies read the same way across every talk. Code stayed only where it earned its place, cropped to the lines that matter.',
    tradeoffs: 'Simplifying an architecture diagram always loses something, so we agreed on what could be abstracted and kept the full version available for questions. Deadlines were tight around conference dates, which meant prioritizing the opening and the core sections over polishing every slide.',
    bigNumbers: [
      { value: '3', label: 'Talk tracks', description: 'Conversational platform, design system, and generative AI.' },
      { value: '40+', label: 'Diagrams rebuilt', description: 'Technical visuals redrawn with one consistent visual grammar.' },
    ],
    closingParagraph: 'Good technical talks are not about fewer details, they are about better sequencing. Once the structure was right, the depth became an asset instead of a barrier.',
    role: 'Presentation Designer',
    duration: '2 weeks per talk',
    stakeholders: 'Engineering speakers and Tech Brand team',
    tools: 'Figma, Google Slides, Adobe Illustrator',
    images: projectImages['tech-talks'].images,
    year: '2025',
    client: 'QuintoAndar',
  },
  {
    hidden: true,
    isNDA: false,
    id: 'newsletter',
    title: 'Newsletter',
    headerTitle: 'Newsletter',
    description: 'Professional newsletter design and templates for people & technology communications.',
    category: 'hr-initiatives',
    company: 'QuintoAndar',
    cardCategory: 'HR initiatives',
    images: projectImages['newsletter'].images,
    year: '2025',
    client: 'QuintoAndar',
  },
  {
    hidden: true,
    isNDA: false,
    id: 'tech-conferences',
    title: 'Tech conferences',
    headerTitle: 'Tech conferences',
    description: 'Conference-grade presentations for major technology events featuring cinematic visuals and compelling narratives.',
    category: 'tech-events',
    company: 'QuintoAndar',
    cardCategory: 'Events',
    images: projectImages['tech-conferences'].images,
    year: '2024',
    client: 'QuintoAndar',
  },
  {
    isNDA: false,
    id: 'ny-trip-itinerary',
    title: 'NY trip itinerary',
    headerTitle: 'NY trip itinerary',
    cardDescription: 'A ten-day New York itinerary designed to be read on the move',
    description: 'Beautifully designed travel itinerary presentation combining practical information with visual storytelling.',
    category: 'side-projects',
    company: 'Personal project',
    cardCategory: 'Side projects',
    meaningfulTitle: 'A ten-day New York itinerary designed to be read on the move',
    tldr: 'A personal project where I planned a trip to New York and turned the research into a vertical, phone-first itinerary, with each day laid out so I could check the next stop in a couple of seconds while walking down the street.',
    context: 'Planning the trip generated a pile of links, maps, opening hours, and restaurant recommendations spread across notes and browser tabs. None of it was useful in the moment, which is when you actually need it.',
    problem: 'Travel documents are usually built for the desk, not the sidewalk. Reading a wide landscape PDF on a phone, in the sun, with one hand free, does not work.',
    strategy: 'I designed everything vertically, one card per moment of the day, with time, place, and the single detail that matters, like a reservation code or which subway line to take. Photos set the mood for each neighborhood, and color coding separates the days so flipping through feels instant.',
    tradeoffs: 'Keeping each card short meant leaving out context I had researched, so links carry the depth for whoever wants it. I also kept the plan deliberately loose, since an itinerary designed down to the minute stops being a trip and becomes a schedule.',
    bigNumbers: [
      { value: '10', label: 'Days mapped', description: 'Each day designed as its own vertical, phone-first sequence.' },
      { value: '9:16', label: 'Built for the phone', description: 'Vertical format made for reading while walking, not at a desk.' },
    ],
    closingParagraph: 'It started as a way to organize a holiday and turned into a small case on designing for context, since the same information behaves very differently depending on where someone reads it.',
    role: 'Designer',
    duration: '2 weeks',
    stakeholders: 'Personal project',
    tools: 'Figma, Adobe Illustrator',
    images: projectImages['ny-trip-itinerary'].images,
    year: '2024',
    client: 'Personal project',
  },
  {
    isNDA: false,
    id: 'booklet',
    title: 'Booklet',
    headerTitle: 'Booklet',
    cardDescription: 'A printed booklet exploring layout, grid, and typography end to end',
    description: 'Print and digital booklet design showcasing creative layout techniques and typography exploration.',
    category: 'side-projects',
    company: 'UCLA',
    cardCategory: 'Side projects',
    meaningfulTitle: 'A printed booklet exploring layout, grid, and typography end to end',
    tldr: 'A booklet designed during my studies at UCLA, where I worked through the full editorial process, grid, typographic scale, image pacing, and print output, to understand how a reader moves through a physical piece rather than a screen.',
    context: 'Most of my daily work lives on slides, where the reader follows the speaker. Print flips that, the reader sets the pace and can jump anywhere, so the structure has to hold on its own.',
    problem: 'Without a presenter to fill the gaps, every layout decision has to carry meaning by itself, and the sequence of spreads becomes the narrative.',
    strategy: 'I built the piece on a modular grid that stays consistent while allowing a few deliberate breaks for emphasis, then paced the spreads so dense pages are followed by breathing room. Type sizes and margins were tested on paper, not just on screen, because both behave differently.',
    tradeoffs: 'Print leaves no room for a later fix, so a few ideas were dropped once the proofs showed they would not survive the bind and the trim. Working within a fixed page count also forced some content to be cut rather than compressed into unreadable type.',
    bigNumbers: [
      { value: '1', label: 'Modular grid', description: 'A single structure holding the whole publication together.' },
      { value: '100%', label: 'Print tested', description: 'Every typographic decision validated on paper before the final output.' },
    ],
    closingParagraph: 'Designing for print sharpened how I think about slides, since both come down to guiding attention through a sequence someone else controls.',
    role: 'Designer',
    duration: '6 weeks',
    stakeholders: 'UCLA Extension course',
    tools: 'Adobe InDesign, Adobe Illustrator, Adobe Photoshop',
    images: projectImages['booklet'].images,
    year: '2024',
    client: 'UCLA',
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
  role: 'Lead Presentation Designer',
  duration: '3 weeks',
  stakeholders: 'Cross-functional stakeholders and executive sponsors',
  tools: 'Figma, Google Slides, Adobe Illustrator',
};

const PLACEHOLDER_BIG_NUMBERS: BigNumber[] = [
  { value: '4.6/5', label: 'Audience satisfaction', description: 'Placeholder metric — edit to reflect actual impact.' },
  { value: '120+', label: 'Slides delivered', description: 'Placeholder metric — edit to reflect actual scope.' },
  { value: '3x', label: 'Faster turnaround', description: 'Placeholder metric — edit to reflect actual efficiency gain.' },
];

const makeProcessTiles = (p: ProjectData): ProcessImage[] => {
  const source = p.processImages && p.processImages.length > 0
    ? p.processImages
    : p.images.map((src) => ({ src }));

  // Render exactly as many tiles as there are source images — no padding,
  // no truncation. The bento grid layout adapts to the actual count.
  return source;
};

const PROJECT_ORDER = [
  'leadership-academy',
  'summit',
  'investor-deck',
  'institutional-deck',
  'template-library',
  'design-masterclasses',
  'tech-talks',
  'tech-conferences',
  'ny-trip-itinerary',
  'booklet',
  'newsletter',
];

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
    role: p.role ?? EDITORIAL_PLACEHOLDERS.role,
    duration: p.duration ?? EDITORIAL_PLACEHOLDERS.duration,
    stakeholders: p.stakeholders ?? EDITORIAL_PLACEHOLDERS.stakeholders,
    tools: p.tools ?? EDITORIAL_PLACEHOLDERS.tools,
    bigNumbers: p.bigNumbers && p.bigNumbers.length > 0 ? p.bigNumbers : PLACEHOLDER_BIG_NUMBERS,
    bentoGalleries: p.bentoGalleries && p.bentoGalleries.length > 0
      ? p.bentoGalleries.map((gallery) => ({
        ...gallery,
        images: gallery.images && gallery.images.length > 0 ? gallery.images : makeProcessTiles(p),
      }))
      : [{ id: `${p.id}-gallery`, label: galleryLabel, images: makeProcessTiles(p) }],
  };
})
  .filter((p) => p.hidden !== true)
  .sort((a, b) => PROJECT_ORDER.indexOf(a.id) - PROJECT_ORDER.indexOf(b.id));

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

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const fillers = normalizedProjects.filter(
    (p) => p.id !== projectId && !sameCategory.some((s) => s.id === p.id),
  );

  return [...sameCategory, ...fillers].slice(0, limit);
};

/** Categories that currently have at least one visible project. */
export const getActiveCategories = (): ProjectCategory[] =>
  Array.from(new Set(normalizedProjects.map((p) => p.category)));

export const getFeaturedProjects = (limit: number = 6): ProjectData[] => {
  return normalizedProjects.filter(p => p.featured).slice(0, limit);
};
