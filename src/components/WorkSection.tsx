import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects, ProjectData, ProjectCategory } from '@/data/projects';

const WorkSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: t.work.categories.all },
    { key: 'executive-decks', label: t.work.categories.executiveDecks },
    { key: 'templates', label: t.work.categories.templates },
    { key: 'tech-events', label: t.work.categories.techEvents },
    { key: 'hr-initiatives', label: t.work.categories.hrInitiatives },
    { key: 'side-projects', label: t.work.categories.sideProjects },
  ];

  const getFilteredProjects = () => {
    if (activeCategory === 'all') {
      return projects.filter((p) => p.featured).slice(0, 6);
    }
    return projects.filter((p) => p.category === activeCategory);
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section id="work" className="pt-8 pb-6 lg:pt-10 lg:pb-8 py-[4px]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-left mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
            {t.work.title}
          </h2>
          <p className="text-base md:text-lg max-w-2xl text-[#78726d]">
            {t.work.subtitle}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-normal transition-all duration-300 ${
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
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* View All Projects Link */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-primary font-normal hover:gap-4 transition-all duration-300 text-lg"
          >
            {t.work.viewAll}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
