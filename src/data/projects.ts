export type ProjectCategory = 'all' | 'executive-decks' | 'templates' | 'tech-events' | 'hr-initiatives' | 'side-projects';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  images: string[];
  year: string;
  client: string;
  featured?: boolean;
  // Detail page fields
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
}

export const projects: ProjectData[] = [
  // Executive decks (4)
  {
    id: 'leadership-academy',
    title: 'Leadership Academy',
    description: 'Comprehensive leadership development program presentation materials designed for executive training initiatives.',
    category: 'executive-decks',
    images: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'Corporate Client',
    featured: true,
    overview: 'A comprehensive presentation system designed to support leadership development programs across multiple organizational levels.',
    challenge: 'Creating engaging and impactful materials that could effectively communicate complex leadership concepts while maintaining consistency across various training modules.',
    solution: 'Developed a modular presentation system with clear visual hierarchies, interactive elements, and a cohesive design language that adapts to different leadership topics.',
    results: [
      'Successfully deployed across 5 leadership cohorts',
      'Increased participant engagement by 40%',
      'Became the standard template for all leadership programs',
    ],
  },
  {
    id: 'pitch-decks',
    title: 'Pitch Decks',
    description: 'Strategic investor pitch decks designed to communicate value propositions and secure funding for innovative ventures.',
    category: 'executive-decks',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'Various Startups',
    featured: true,
    overview: 'Collection of investor-ready pitch decks crafted to tell compelling stories and present data in visually impactful ways.',
    challenge: 'Each startup had unique value propositions that needed to be communicated clearly to sophisticated investors in a short time frame.',
    solution: 'Created narrative-driven decks with progressive disclosure, custom infographics, and clear data visualization that made complex information instantly understandable.',
    results: [
      'Helped secure over $20M in combined funding',
      '90% positive investor feedback on presentation clarity',
      'Established reusable pitch frameworks for future rounds',
    ],
  },
  {
    id: 'all-hands-and-leadership-meetings',
    title: 'All Hands & Leadership Meetings',
    description: 'Engaging company-wide and leadership meeting presentations that align teams and communicate strategic vision.',
    category: 'executive-decks',
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'Enterprise Company',
    overview: 'Presentation materials for quarterly all-hands meetings and monthly leadership sync sessions.',
    challenge: 'Maintaining engagement across diverse audiences while effectively communicating company updates, metrics, and strategic initiatives.',
    solution: 'Developed a consistent visual framework with dynamic data visualizations, celebration moments, and clear action items that kept audiences engaged.',
    results: [
      'Improved meeting satisfaction scores by 35%',
      'Reduced presentation preparation time by 50%',
      'Created reusable templates for future meetings',
    ],
  },
  {
    id: 'summit',
    title: 'Summit',
    description: 'High-impact keynote and session presentations for major corporate summit events with thousands of attendees.',
    category: 'executive-decks',
    images: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'Global Corporation',
    featured: true,
    overview: 'Complete presentation package for annual corporate summit including keynotes, breakout sessions, and workshop materials.',
    challenge: 'Creating presentations that would be impactful in large venue settings while maintaining brand consistency across multiple speakers.',
    solution: 'Designed bold, high-contrast visuals optimized for large screens with carefully timed animations that supported speaker delivery.',
    results: [
      'Highest-rated summit in company history',
      '4.9/5 average session rating',
      'Presentation style adopted for all future events',
    ],
  },

  // Templates (3)
  {
    id: 'templates-library',
    title: 'Templates Library',
    description: 'Comprehensive library of presentation templates enabling teams to create consistent, on-brand materials quickly.',
    category: 'templates',
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'Enterprise Client',
    featured: true,
    overview: 'A scalable template system with 100+ slide layouts covering every business communication need.',
    challenge: 'Multiple departments were creating presentations with inconsistent branding, leading to a fragmented company image.',
    solution: 'Built a comprehensive template library with intuitive categorization, easy customization options, and built-in brand guidelines.',
    results: [
      'Adopted by 95% of the organization',
      'Reduced presentation creation time by 60%',
      'Achieved consistent brand representation across all departments',
    ],
  },
  {
    id: 'presentation-templates',
    title: 'Presentation Templates',
    description: 'Purpose-built presentation templates for specific use cases including sales, proposals, and reports.',
    category: 'templates',
    images: [
      'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'Various Clients',
    overview: 'Specialized templates designed for specific business functions and communication objectives.',
    challenge: 'Generic templates were not meeting the specific needs of different business functions, leading to excessive customization time.',
    solution: 'Created purpose-built templates with pre-configured layouts, color schemes, and content structures for each use case.',
    results: [
      'Reduced customization time by 70%',
      'Improved presentation quality consistency',
      'Enabled non-designers to create professional materials',
    ],
  },
  {
    id: 'presentation-masterclasses',
    title: 'Presentation Masterclasses',
    description: 'Educational materials and workshop presentations teaching effective presentation design and delivery techniques.',
    category: 'templates',
    images: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop',
    ],
    year: '2023',
    client: 'Corporate Training',
    overview: 'Comprehensive training program materials teaching the art and science of effective presentations.',
    challenge: 'Many professionals struggle with creating and delivering impactful presentations despite having access to tools.',
    solution: 'Developed an interactive masterclass series with hands-on exercises, before/after examples, and practical frameworks.',
    results: [
      'Trained over 500 professionals',
      '92% reported improved presentation skills',
      'Created a self-service learning library',
    ],
  },

  // Tech events (2)
  {
    id: 'tech-meetups',
    title: 'Tech Meetups',
    description: 'Engaging presentation materials for technology community meetups and knowledge-sharing sessions.',
    category: 'tech-events',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'Tech Community',
    featured: true,
    overview: 'Presentation designs for regular technology meetups featuring code-forward layouts and technical diagrams.',
    challenge: 'Technical content often becomes dry and hard to follow when presented in traditional slide formats.',
    solution: 'Created dynamic layouts with syntax-highlighted code blocks, animated diagrams, and progressive disclosure of complex concepts.',
    results: [
      'Increased meetup attendance by 50%',
      'Improved audience engagement scores',
      'Established a recognizable visual brand for the meetup series',
    ],
  },
  {
    id: 'tech-conference',
    title: 'Tech Conference',
    description: 'Conference-grade presentations for major technology events featuring cinematic visuals and compelling narratives.',
    category: 'tech-events',
    images: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'Major Tech Conference',
    overview: 'Keynote and session presentations designed for large-scale technology conferences.',
    challenge: 'Conference presentations need to stand out among hundreds of sessions while effectively communicating complex technical concepts.',
    solution: 'Designed bold, memorable visuals with strong narrative arcs and audience engagement moments.',
    results: [
      'Sessions consistently rated in top 10%',
      'Received invitations to speak at additional conferences',
      'Presentations shared widely on social media',
    ],
  },

  // HR initiatives (2)
  {
    id: 'tech-interns-onboarding',
    title: 'Brilliant Youth',
    description: 'Engaging onboarding program for technology interns creating an impactful first impression and accelerating productivity.',
    category: 'hr-initiatives',
    images: [
      'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'Tech Company HR',
    featured: true,
    overview: 'Complete onboarding experience for technology interns including orientation materials, training modules, and mentorship resources.',
    challenge: 'Creating an onboarding experience that would engage young professionals and quickly integrate them into the company culture.',
    solution: 'Developed a visually engaging, interactive onboarding journey with gamification elements and clear milestones.',
    results: [
      'Reduced time-to-productivity by 40%',
      'Achieved 98% intern satisfaction rating',
      'Increased intern-to-full-time conversion rate',
    ],
  },
  {
    id: 'tech-newsletter',
    title: 'P&T External Newsletter',
    description: 'Professional newsletter design and templates for external technology and people communications.',
    category: 'hr-initiatives',
    images: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'People & Technology Team',
    overview: 'External-facing newsletter design showcasing company culture, technology innovations, and career opportunities.',
    challenge: 'Creating a newsletter format that would effectively communicate to external audiences while maintaining employer brand standards.',
    solution: 'Designed a modular newsletter template with engaging visuals, clear hierarchy, and compelling storytelling formats.',
    results: [
      'Increased newsletter open rates by 45%',
      'Grew subscriber base by 200%',
      'Enhanced employer brand perception',
    ],
  },

  // Side projects (4)
  {
    id: 'ALDI-case-study',
    title: 'ALDI Case Study',
    description: 'Strategic analysis and presentation case study for retail optimization and market positioning.',
    category: 'side-projects',
    images: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'Personal Project',
    featured: true,
    overview: 'In-depth case study analyzing retail strategies and presenting recommendations for market expansion.',
    challenge: 'Transforming complex business analysis into a visually compelling and easily digestible presentation format.',
    solution: 'Created a narrative-driven case study with clear data visualizations, competitive analysis frameworks, and actionable recommendations.',
    results: [
      'Featured in design portfolio showcases',
      'Used as teaching material in business courses',
      'Demonstrated strategic thinking capabilities',
    ],
  },
  {
    id: 'Uberall-dashboard',
    title: 'Uberall Dashboard',
    description: 'Dashboard design and data visualization project for location marketing analytics platform.',
    category: 'side-projects',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
    ],
    year: '2023',
    client: 'Personal Project',
    overview: 'Conceptual dashboard design exploring data visualization approaches for location-based marketing analytics.',
    challenge: 'Presenting complex multi-location data in a way that enables quick insights and decision-making.',
    solution: 'Designed an intuitive dashboard with hierarchical data views, interactive filtering, and clear visual indicators.',
    results: [
      'Explored innovative data visualization techniques',
      'Refined dashboard design skills',
      'Created reusable component library',
    ],
  },
  {
    id: 'booklet',
    title: 'Graphic Design Project',
    description: 'Print and digital booklet design showcasing creative layout techniques and typography exploration.',
    category: 'side-projects',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
    ],
    year: '2023',
    client: 'Personal Project',
    overview: 'Creative exploration of editorial design through a multi-page booklet format.',
    challenge: 'Pushing creative boundaries while maintaining readability and visual coherence across multiple pages.',
    solution: 'Experimented with unconventional layouts, typography treatments, and visual storytelling techniques.',
    results: [
      'Expanded design skill set beyond digital',
      'Explored print production techniques',
      'Created portfolio-worthy creative work',
    ],
  },
  {
    id: 'ny-trip-itinerary',
    title: 'NY Trip Itinerary',
    description: 'Beautifully designed travel itinerary presentation combining practical information with visual storytelling.',
    category: 'side-projects',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
    ],
    year: '2023',
    client: 'Personal Project',
    overview: 'A personal project transforming a travel itinerary into an engaging visual presentation.',
    challenge: 'Organizing complex travel information in a way that is both beautiful and practically useful.',
    solution: 'Created a visually rich itinerary with maps, timelines, and curated recommendations in an easy-to-follow format.',
    results: [
      'Demonstrated versatility in design applications',
      'Created shareable travel resource',
      'Explored infographic and timeline design',
    ],
  },
];

// Helper function to get project by ID
export const getProjectById = (id: string): ProjectData | undefined => {
  return projects.find(project => project.id === id);
};

// Helper function to get related projects (same category, excluding current)
export const getRelatedProjects = (projectId: string, limit: number = 3): ProjectData[] => {
  const currentProject = getProjectById(projectId);
  if (!currentProject) return [];
  
  return projects
    .filter(p => p.category === currentProject.category && p.id !== projectId)
    .slice(0, limit);
};

// Helper function to get featured projects
export const getFeaturedProjects = (limit: number = 6): ProjectData[] => {
  return projects.filter(p => p.featured).slice(0, limit);
};
