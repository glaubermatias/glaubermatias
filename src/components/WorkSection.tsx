import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

export type ProjectCategory = 'all' | 'executive-decks' | 'external-events' | 'templates' | 'freelance' | 'personal-projects';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  images: string[];
  year: string;
  client: string;
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'TechVenture Series A Pitch',
    description: 'Strategic pitch deck that helped secure $12M in funding. Focused on clear data visualization and compelling storytelling.',
    category: 'executive-decks',
    images: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'TechVenture Inc.',
  },
  {
    id: 'project-2',
    title: 'Global Summit Keynote',
    description: 'Opening keynote presentation for a 5,000+ attendee conference. Cinematic visuals with powerful narrative flow.',
    category: 'external-events',
    images: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'Innovation Summit',
  },
  {
    id: 'project-3',
    title: 'Corporate Template System',
    description: 'Scalable presentation template system for a Fortune 500 company. Consistent branding across all departments.',
    category: 'templates',
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
    ],
    year: '2023',
    client: 'Fortune 500 Company',
  },
  {
    id: 'project-4',
    title: 'Startup Pitch Deck',
    description: 'Investor presentation for a fintech startup disrupting traditional banking. Clean, data-forward design.',
    category: 'freelance',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    ],
    year: '2023',
    client: 'FinanceFlow',
  },
  {
    id: 'project-5',
    title: 'The Art of Visual Thinking',
    description: 'Personal exploration of design principles through a self-initiated presentation series.',
    category: 'personal-projects',
    images: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
    ],
    year: '2023',
    client: 'Personal Project',
  },
  {
    id: 'project-6',
    title: 'Annual Conference Deck',
    description: 'Comprehensive training deck for executive leadership program. Interactive and engaging format.',
    category: 'external-events',
    images: [
      'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
    ],
    year: '2024',
    client: 'Corporate Training Co.',
  },
];

const WorkSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: t.work.categories.all },
    { key: 'executive-decks', label: t.work.categories.executiveDecks },
    { key: 'external-events', label: t.work.categories.externalEvents },
    { key: 'templates', label: t.work.categories.templates },
    { key: 'freelance', label: t.work.categories.freelance },
    { key: 'personal-projects', label: t.work.categories.personalProjects },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
            {t.work.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.work.subtitle}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary'
              }`}
            >
              {activeCategory === cat.key && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;