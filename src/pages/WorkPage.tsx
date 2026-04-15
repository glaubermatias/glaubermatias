import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import Footer from '@/components/Footer';
import { projects, ProjectCategory, ProjectData } from '@/data/projects';

const WorkProjectCard = ({ project, index }: { project: ProjectData; index: number }) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      'executive-decks': t.work.categories.executiveDecks,
      'templates': t.work.categories.templates,
      'tech-events': t.work.categories.techEvents,
      'hr-initiatives': t.work.categories.hrInitiatives,
      'side-projects': t.work.categories.sideProjects,
    };
    return categoryMap[category] || category;
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link to={`/${project.id}`} className="block h-full">
        <div className="bg-muted rounded-[2rem] overflow-hidden transition-all duration-300 h-full flex flex-col">
          <div className="p-5 pb-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl select-none">
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                draggable={false}
              />

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background select-none"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background select-none"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {project.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex ? 'bg-background w-4' : 'bg-background/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="p-6 space-y-3 flex-1 flex flex-col">
            <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-sm flex-1 text-[#676f79]">{project.description}</p>

            <div className="pt-2 mt-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-normal">
                {getCategoryLabel(project.category)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-primary font-normal text-sm group-hover:gap-3 transition-all duration-300 pb-3">
              <span>{t.work.viewProject}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

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

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <PageLayout>
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-left mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
              {t.work.title}
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
                    : 'text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary'
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

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <WorkProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </main>
    </PageLayout>
  );
};

export default WorkPage;
