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
    cardDescription: 'Turning financial results into a visually engaging investor deck',
    description: 'Strategic investor deck designed to communicate value propositions and secure funding.',
    category: 'executive-decks',
    company: 'QuintoAndar',
    cardCategory: 'Executive decks',
    meaningfulTitle: 'Turning financial results into a visually engaging investor deck',
    tldr:  "The CEO and CFO needed to pitch the company's latest results and AI initiatives to key investors. My role was to balance the CFO's highly analytical, data-driven approach with the CEO's desire to tell a vibrant story that showcased the company's identity. The result was a visually sharp narrative that investors praised for being both powerful and easy to follow.",
    context:  "The CEO and CFO were gearing up for a roadshow to present QuintoAndar's latest financial results and future perspectives to key investors, reinforcing our position as the leading proptech in Latin America. They already had the raw numbers and a clear storyline. My job was to establish a strong visual hierarchy, turning that data into a compelling business case.",
    problem:  "Pitching to investors requires a delicate balance. On one hand, the presentation needs to be highly objective and minimalist to highlight the financial data. On the other hand, it needs enough energy to project brand leadership and humanize the numbers. My challenge was to blend these two complementary visions, keeping the executives confident and the audience engaged.",
    strategy:  "I started by organizing the content into a clear and logical structure. Once the data had room to breathe, I applied our brand assets to highlight key takeaways. This approach brought the energetic vibe the CEO envisioned while keeping the information straightforward and highly analytical. By stripping away the noise and using color deliberately to guide the eye, I made sure the story practically told itself.",
    tradeoffs:  "With only one week to pull this off, the biggest constraint was time. I worked closely with the Finance directors, jumping on quick calls to refine the content and approve layouts on the fly. The main trade-off was deciding when to use bold visuals and when to let the numbers speak for themselves. I had to ensure that every creative choice respected both the analytical rigor and the brand's identity without missing a beat.",
    bigNumbers: [
      { value: '', label: '', description: '' },
      { value: '25', label: 'OUTPUT', description: 'Slides built to support the main narrative.' },
    ],
    closingParagraph:  "Finding the sweet spot between a highly analytical report and an energetic pitch was the highlight of this project. The fact that investors ultimately praised the narrative as powerful and easy to follow proved that our collaborative approach paid off. It is a solid reminder that good design does not compete with the data. In fact, it makes the message land exactly where it needs to.",
    role: 'Presentation Designer',
    duration: '1 week',
    stakeholders: 'CEO, CFO, Finance Directors, Investors',
    tools: 'Google Slides, Illustrator',
    images: projectImages['investor-deck'].images,
    year: '2026',
    client: 'QuintoAndar',
    featured: true,
  },
  {
    isNDA: true,
    id: 'summit',
    title: 'Summit 2023',
    headerTitle: 'Summit 2023',
    meaningfulTitle: 'Orchestrating the visual narrative for a 3,500+ audience in just one month',
    cardDescription: 'Keynote and stage visuals for a company-wide summit with thousands of attendees',
    description: 'High-impact keynote and session presentations for major corporate summit events with thousands of attendees.',
    category: 'tech-events',
    company: 'QuintoAndar',
    cardCategory: 'Events',
    tldr: "The 2023 Summit was the biggest event in QuintoAndar's history, bringing together over 3,500 people across multiple countries. My role was to partner with C-level executives, an external agency, and our internal marketing team to build a unified visual narrative in just four weeks. It was a wild ride, but we secured a 4.4/5 satisfaction score. A meaningful impact!",
    context: "QuintoAndar's 2023 Summit wasn't an average corporate meeting. It featured a huge venue, a big stage, thousands of employees buzzing with energy in person, and a live broadcast reaching eight different countries. The motto was \"Simplify & Delight\", and the goal was to celebrate the company's ten-year anniversary while getting everyone excited for the future, connecting people from all around the globe.",
    problem: "This was the first time we brought employees from multiple countries together in person. The challenge was keeping people from entirely different departments and cultures on the same page, fully energized about our vision to become THE destination for housing. For that, I had one month to make sure that a diverse mix of C-level executives, an external agency, and our internal marketing team were all speaking the same language and respecting the event's storyline.",
    strategy: 'To make this happen, I acted as the translator between our C-level speakers, the marketing team, and the external agency. Following the branding guidelines, my goal went beyond slide-polishing. I nudged the speakers to tie their talking points to the "Simplify & Delight" motto. Throughout the one-month sprint, I kept our daily syncs tight and managed the agency reviews, keeping the backstage energy light when the pressure spiked.',
    tradeoffs: 'Under tight time constraints, you have to pick your battles. Sometimes an executive had a strong vision for a slide that drifted from the narrative, and I eventually had to adapt their ideas to fit the broader storyline. In the end, the speakers had to be comfortable with their content in order to deliver their message confidently.',
    bigNumbers: [
      { value: '4.4/5', label: 'SATISFACTION', description: 'Overall score from over 3,500 attendees.' },
      { value: '8', label: 'GLOBAL REACH', description: 'Countries connected via live broadcast.' },
    ],
    closingParagraph: "This event was a huge team effort, and my contribution was making sure 10 different C-level speakers had what they needed to succeed. From the early pre-event rehearsals to sitting in the technical booth calling the shots during the live broadcast, I was there to support them and keep the visual narrative on track. I don't play any instruments, but it was a lot of fun being the conductor behind the visual narrative of an event that made company history.",
    role: 'Lead Presentation Designer',
    duration: '1 month',
    stakeholders: 'C-suite executives, Marketing team, External agency',
    tools: 'Powerpoint, Google Slides',
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
    cardDescription: "Building a self-serve slide system to give the People team design autonomy",
    description: 'Comprehensive library of presentation templates enabling teams to create consistent, on-brand materials quickly.',
    category: 'templates',
    company: 'QuintoAndar',
    cardCategory: 'Templates',
    meaningfulTitle: "Building a self-serve slide system to give the People team total design autonomy",
    tldr: "Most presentations across the People team were built by duplicating older files, which naturally led to materials that drifted a bit from our brand guidelines over time. To fix this, I built a centralized plug-and-play slide library with over 300 pre-formatted layouts mapped to their actual daily needs. This system gave them total autonomy to build polished decks on their own and freed up my schedule to focus on high-stakes executive projects.",
    context: "Design requests were piling up for basic slides that didn’t actually require a designer. At the same time, teams were circulating materials that occasionally drifted from our core visual identity. Interestingly, a personal Google Slides file I had originally created for the Internal Comms team organically started spreading across other departments as more people saw the value in having everything in one place. I affectionately called it the “Posto Ipiranga,” referencing a famous Brazilian commercial about a gas station that has absolutely everything you need.",
    problem: "Creating a generic template library would hardly fix the core issue. I needed to dig deeper. After surveying 28 team members and leaders, I discovered their biggest struggles were condensing text and presenting data clearly. If I just handed them an empty branded frame, they would still face the cognitive load of figuring out where to put titles, metrics, and supporting text. I needed to build a system that made those structural decisions for them.",
    strategy: "I cross-referenced the survey data with hundreds of past slides to pinpoint the exact formats the team needed most. From there, I organized 19 distinct categories in a shared Google Drive folder. Instead of handing over blank canvases, I created highly structured layouts that drastically reduced cognitive load by mapping out exactly where every title, text block, and number should go. Everything was fully plug-and-play with our typography and colors already applied, meaning the only job left for the user was picking the right format and pasting their data.",
    tradeoffs: "The biggest challenge was giving people enough options without turning the library into a messy maze. I established clear visual rules to protect the brand identity while keeping the content areas flexible enough to fit different narratives. To keep things manageable and useful, I prioritized building more variations of the specific slides the team requested most in the survey results.",
    bigNumbers: [
      { value: "19", label: "CATEGORIES", description: "Slide types mapped from user research." },
      { value: "300+", label: " LAYOUTS", description: "Plug-and-play templates aligned with brand guidelines." },
    ],
    closingParagraph: "Honestly, the biggest win here was watching the team gain the confidence to build their own materials without second-guessing every layout choice. The system gave them a clear starting point without getting in the way, so they could spend less time worrying about design and more time focusing on what actually mattered.",
    role: "Presentation Designer",
    duration: "1 month",
    stakeholders: "People team",
    tools: 'Google Slides, Illustrator',
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
    tools: 'Google Slides, Illustrator',
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
     meaningfulTitle: "Translating the QuintoAndar story into an impactful master deck",
     tldr: "Different departments used to rely on distinct, outdated presentations to pitch the company to clients, partners, and new hires. Partnering with the Employer Branding and PR teams, I designed a master deck that translated an 11-page institutional narrative document into a highly visual format. The result gave teams the autonomy to adapt their pitches to specific needs while keeping the company's core story completely solid and consistent.",
     context: "QuintoAndar shows up in a lot of external conversations, from partner meetings to hiring pitches. The issue was that each of those rooms had its own homemade version of the company story. The Employer Branding team, alongside PR, had just written an 11-page document to establish a unified narrative. My job was to turn that text into a functional master deck that any team could use to present the company with confidence.",
     problem: "Having dozens of fragmented pitch decks floating around meant external audiences were getting conflicting numbers, outdated claims, and a brand identity that felt slightly off. To solve this issue, I needed to build a single institutional deck that consolidated the brand's vision. At the same time, this new asset had to remain flexible enough for different stakeholders to use without sounding robotic.",
     strategy: "Starting from the narrative document, I split the content into four core modules. Then, by following the brand guidelines, I made sure the most important messages grabbed the spotlight. I went through the presentation slide by slide, deciding what actually needed to be on screen versus what belonged in the speaker notes, so we could hit the right mark. This structure also gave the Employer Branding team full autonomy to adapt the presentation for different audiences in the future.",
     tradeoffs: "The biggest challenge here was synthesizing this rich narrative into a few slides while keeping them clear and impactful. Based on each specific need, we evaluated what should be broken down into multiple slides and what should be left to the presenter’s speech. Keeping the slides clean encouraged the speakers to bring their own humanity to the pitch, which helped create a genuine connection with the audience.",
    bigNumbers: [
       { value: "11", label: "CONTENT SYNTHESIS", description: "Pages of dense strategy translated into scannable slides." },
       { value: "4", label: "MODULARITY", description: "Adaptable sections to segment the story for different audiences." },
    ],
     closingParagraph: "At the end of the day, a company’s brand is only as strong as the story its people tell. Giving the Employer Branding team the autonomy to tailor this deck for different audiences was a huge step forward. We built a flexible system designed to leave a lasting impression, with plenty of breathing room for the presenter to build real trust and connection with the audience.",
    role: 'Lead Presentation Designer',
     duration: "2 weeks",
     stakeholders: "Employer Branding, Internal Comms, PR",
     tools: "Google Slides",
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
