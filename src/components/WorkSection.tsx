import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
export type ProjectCategory = 'all' | 'executive-decks' | 'templates' | 'tech-events' | 'hr-initiatives' | 'side-projects';
export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  images: string[];
  year: string;
  client: string;
  featured?: boolean;
}
const projects: Project[] = [
// Executive decks (5)
{
  id: 'project-1',
  title: 'TechVenture Series A Pitch',
  description: 'Strategic pitch deck that helped secure $12M in funding. Focused on clear data visualization and compelling storytelling.',
  category: 'executive-decks',
  images: ['https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop'],
  year: '2024',
  client: 'TechVenture Inc.',
  featured: true
}, {
  id: 'project-2',
  title: 'FinanceFlow Investor Deck',
  description: 'Investor presentation for a fintech startup disrupting traditional banking. Clean, data-forward design.',
  category: 'executive-decks',
  images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop'],
  year: '2024',
  client: 'FinanceFlow',
  featured: true
}, {
  id: 'project-3',
  title: 'GlobalCorp Strategy Review',
  description: 'Annual strategy presentation for Fortune 500 executive committee. Comprehensive visual analysis of market position.',
  category: 'executive-decks',
  images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop'],
  year: '2024',
  client: 'GlobalCorp'
}, {
  id: 'project-4',
  title: 'StartupX Seed Round',
  description: 'Seed funding deck for AI-powered SaaS platform. Minimalist design with focus on product demo visuals.',
  category: 'executive-decks',
  images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop'],
  year: '2023',
  client: 'StartupX'
}, {
  id: 'project-5',
  title: 'MedTech Board Presentation',
  description: 'Quarterly board meeting deck for healthcare technology company. Complex data simplified for decision-makers.',
  category: 'executive-decks',
  images: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop'],
  year: '2023',
  client: 'MedTech Solutions'
},
// Templates (5)
{
  id: 'project-6',
  title: 'Corporate Template System',
  description: 'Scalable presentation template system for a Fortune 500 company. Consistent branding across all departments.',
  category: 'templates',
  images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop'],
  year: '2024',
  client: 'Fortune 500 Company',
  featured: true
}, {
  id: 'project-7',
  title: 'Sales Enablement Kit',
  description: 'Complete sales deck template suite with 50+ slides. Designed for easy customization by sales teams.',
  category: 'templates',
  images: ['https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop'],
  year: '2024',
  client: 'SalesForce Partner'
}, {
  id: 'project-8',
  title: 'Consulting Proposal Template',
  description: 'Professional proposal template system for management consulting firm. Built for rapid customization.',
  category: 'templates',
  images: ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop'],
  year: '2023',
  client: 'McKinsey-style Firm'
}, {
  id: 'project-9',
  title: 'Startup Pitch Template',
  description: 'Versatile pitch deck template for early-stage startups. Includes investor-ready layouts and data viz components.',
  category: 'templates',
  images: ['https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop'],
  year: '2023',
  client: 'Open Source'
}, {
  id: 'project-10',
  title: 'Training Materials System',
  description: 'Educational presentation templates for corporate training programs. Interactive and engaging format.',
  category: 'templates',
  images: ['https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop'],
  year: '2023',
  client: 'Corporate Training Co.'
},
// Tech events (3)
{
  id: 'project-11',
  title: 'Global Tech Summit Keynote',
  description: 'Opening keynote presentation for a 5,000+ attendee conference. Cinematic visuals with powerful narrative flow.',
  category: 'tech-events',
  images: ['https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop'],
  year: '2024',
  client: 'Innovation Summit',
  featured: true
}, {
  id: 'project-12',
  title: 'Developer Conference Talk',
  description: 'Technical presentation for major developer conference. Code-forward design with animated diagrams.',
  category: 'tech-events',
  images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop'],
  year: '2024',
  client: 'AWS re:Invent'
}, {
  id: 'project-13',
  title: 'Product Launch Event',
  description: 'High-impact product reveal presentation for tech company launch event. Apple-inspired aesthetics.',
  category: 'tech-events',
  images: ['https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop'],
  year: '2023',
  client: 'TechStartup Inc.'
},
// HR initiatives (4)
{
  id: 'project-14',
  title: 'Employee Onboarding Program',
  description: 'Comprehensive onboarding presentation system for new employees. Engaging and informative design.',
  category: 'hr-initiatives',
  images: ['https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop'],
  year: '2024',
  client: 'Global Corp HR',
  featured: true
}, {
  id: 'project-15',
  title: 'Employer Brand Campaign',
  description: 'Internal communications campaign showcasing company culture and values. Video-integrated presentations.',
  category: 'hr-initiatives',
  images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=800&auto=format&fit=crop'],
  year: '2024',
  client: 'Tech Company'
}, {
  id: 'project-16',
  title: 'Leadership Development',
  description: 'Training deck for executive leadership program. Interactive modules with assessment components.',
  category: 'hr-initiatives',
  images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop'],
  year: '2023',
  client: 'Corporate Academy'
}, {
  id: 'project-17',
  title: 'Culture & Values Rollout',
  description: 'Company-wide presentation for culture transformation initiative. Emotional storytelling with data.',
  category: 'hr-initiatives',
  images: ['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop'],
  year: '2023',
  client: 'Enterprise Co.'
},
// Side projects (4)
{
  id: 'project-18',
  title: 'The Art of Visual Thinking',
  description: 'Personal exploration of design principles through a self-initiated presentation series.',
  category: 'side-projects',
  images: ['https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop'],
  year: '2024',
  client: 'Personal Project',
  featured: true
}, {
  id: 'project-19',
  title: 'Design Systems Handbook',
  description: 'Educational presentation series on building effective design systems. Open source contribution.',
  category: 'side-projects',
  images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop'],
  year: '2023',
  client: 'Open Source'
}, {
  id: 'project-20',
  title: 'Data Storytelling Guide',
  description: 'Comprehensive guide on transforming data into compelling visual narratives. Educational resource.',
  category: 'side-projects',
  images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop'],
  year: '2023',
  client: 'Personal Project'
}, {
  id: 'project-21',
  title: 'Motion Design Experiments',
  description: 'Collection of animated presentation experiments exploring motion in slide design.',
  category: 'side-projects',
  images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop'],
  year: '2023',
  client: 'Personal Project'
}];
const WorkSection = () => {
  const {
    t
  } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const categories: {
    key: ProjectCategory;
    label: string;
  }[] = [{
    key: 'all',
    label: t.work.categories.all
  }, {
    key: 'executive-decks',
    label: t.work.categories.executiveDecks
  }, {
    key: 'templates',
    label: t.work.categories.templates
  }, {
    key: 'tech-events',
    label: t.work.categories.techEvents
  }, {
    key: 'hr-initiatives',
    label: t.work.categories.hrInitiatives
  }, {
    key: 'side-projects',
    label: t.work.categories.sideProjects
  }];
  const getFilteredProjects = () => {
    if (activeCategory === 'all') {
      // Show only 6 featured projects for "All"
      return projects.filter(p => p.featured).slice(0, 6);
    }
    return projects.filter(p => p.category === activeCategory);
  };
  const filteredProjects = getFilteredProjects();
  return <section id="work" className="py-6 lg:py-8">
      <div className="container mx-auto px-6">
        {/* Header - Left aligned */}
        <motion.div className="text-left mb-4" initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }}>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
            {t.work.title}
          </h2>
          <p className="text-base md:text-lg max-w-2xl text-[#78726d]">
            {t.work.subtitle}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div className="flex flex-wrap gap-3 mb-8" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }}>
          {categories.map(cat => <button key={cat.key} onClick={() => setActiveCategory(cat.key)} className={`relative px-5 py-2.5 rounded-full text-sm font-normal transition-all duration-300 ${activeCategory === cat.key ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary'}`}>
              {activeCategory === cat.key && <motion.div layoutId="activeCategory" className="absolute inset-0 bg-primary rounded-full" transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.6
          }} />}
              <span className="relative z-10">{cat.label}</span>
            </button>)}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
          {filteredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </motion.div>

        {/* View All Projects Link - Always show */}
        <motion.div className="text-center mt-10" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }}>
          <Link to="/projects" className="inline-flex items-center gap-2 text-primary font-normal hover:gap-4 transition-all duration-300 text-lg">
            {t.work.viewAll}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>;
};
export default WorkSection;