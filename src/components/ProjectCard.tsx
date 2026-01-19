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
      <a href={`/project/${project.id}`} className="block h-full">
        {/* Card Container - No shadow, using #f0f1f3 background */}
        <div className="bg-muted rounded-[2rem] overflow-hidden transition-all duration-300 h-full flex flex-col">
          {/* Image Carousel with padding */}
          <div className="p-5 pb-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
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
          </div>

          {/* Content - Increased lateral padding */}
          <div className="p-6 space-y-3 flex-1 flex flex-col">
            <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            
            {/* Full description without truncation */}
            <p className="text-muted-foreground text-sm flex-1">
              {project.description}
            </p>

            {/* Category Tag and View Project - Fixed at bottom */}
            <div className="pt-2 mt-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-foreground text-xs font-normal">
                {getCategoryLabel(project.category)}
              </span>
            </div>

            {/* View Project */}
            <div className="flex items-center gap-2 text-primary font-normal text-sm group-hover:gap-3 transition-all duration-300">
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
