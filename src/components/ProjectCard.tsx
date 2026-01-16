import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Project } from './WorkSection';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
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

  // Map category key to label
  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      'executive-decks': t.work.categories.executiveDecks,
      'external-events': t.work.categories.externalEvents,
      'templates': t.work.categories.templates,
      'freelance': t.work.categories.freelance,
      'personal-projects': t.work.categories.personalProjects,
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
      className="group"
    >
      <a href={`/project/${project.id}`} className="block">
        {/* Card Container */}
        <div className="project-card-bg rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          {/* Image Carousel */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.img
              key={currentImageIndex}
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Carousel Navigation */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {project.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex 
                          ? 'bg-background w-4' 
                          : 'bg-background/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            
            <p className="text-muted-foreground text-sm line-clamp-2">
              {project.description}
            </p>

            {/* Category Tag */}
            <div className="pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-foreground text-xs font-medium">
                {getCategoryLabel(project.category)}
              </span>
            </div>

            {/* View Project */}
            <div className="flex items-center gap-2 pt-2 text-accent font-medium text-sm group-hover:gap-3 transition-all duration-300">
              <span>{t.work.viewProject}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  );
};

export default ProjectCard;