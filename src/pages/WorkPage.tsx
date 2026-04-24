import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
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

  return (
    <PageLayout>
      <main className="pt-28 pb-16">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          {/* Header */}
          <motion.div
            className="text-left mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
              Work
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t.work.subtitle}
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-normal transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground bg-secondary/40 hover:bg-secondary/60'
                }`}
              >
                {activeCategory === cat.key && (
                  <motion.div
                    layoutId="activeCategoryWork"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Projects List — same layout as Selected Work */}
          <div className="border-t border-foreground/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProjects.map((project, index) => (
                  <WorkCard
                    key={project.id}
                    project={project}
                    index={index}
                    totalCount={filteredProjects.length}
                  />
                ))}
                {filteredProjects.length === 0 && (
                  <p className="py-20 text-center text-muted-foreground">
                    No projects in this category yet.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default WorkPage;
