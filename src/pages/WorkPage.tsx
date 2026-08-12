import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import WorkCard from '@/components/WorkCard';

import { projects, ProjectCategory } from '@/data/projects';

const WorkPage = () => {
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

  const filteredProjects = useMemo(
    () =>
      activeCategory === 'all'
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  const header = (
    <PageHeader>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-8">
        Work
      </h1>

      {/* Filter buttons — selected = solid white pill, others = minimal text */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative px-5 py-2 rounded-full text-sm font-normal transition-colors duration-300 ${
                isActive
                  ? 'text-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeWorkFilter"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </PageHeader>
  );

  return (
    <PageLayout header={header}>
      <main className="site-shell pt-12 md:pt-16 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
          >
            {filteredProjects.map((project, index) => (
              <ProjectGridCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
        {filteredProjects.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">
            No projects in this category yet.
          </p>
        )}
      </main>
    </PageLayout>
  );

};

export default WorkPage;
