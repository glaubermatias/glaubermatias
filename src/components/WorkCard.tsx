import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectData } from '@/data/projects';

interface WorkCardProps {
  project: ProjectData;
  index: number;
}

const WorkCard = ({ project, index }: WorkCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  const bigNumbers = project.bigNumbers || [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/${project.id}`} className="block">
        <div
          className="bg-card-warm rounded-[2rem] overflow-hidden p-3 md:p-5 flex flex-col md:flex-row gap-6 md:gap-10 transition-all duration-500 ease-out"
          style={{
            boxShadow: '0 0 0 0 rgba(232, 81, 2, 0)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              '0 0 30px 6px rgba(232, 81, 2, 0.25), 0 0 80px 20px rgba(241, 96, 1, 0.1)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              '0 0 0 0 rgba(232, 81, 2, 0)';
          }}
        >
          {/* Image Carousel - Left */}
          <div className="relative w-full md:w-[45%] shrink-0 aspect-[4/3] md:aspect-auto md:min-h-[280px] overflow-hidden rounded-xl select-none">
            <motion.img
              key={currentImageIndex}
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover pointer-events-none absolute inset-0"
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

          {/* Content - Right */}
          <div className="flex-1 flex flex-col justify-between py-2 px-1 md:px-3">
            <div>
              <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">
                {project.description}
              </p>
            </div>

            {/* Big Numbers */}
            {bigNumbers.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {bigNumbers.map((stat, idx) => (
                  <div key={idx} className="text-left">
                    <div className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 text-foreground font-normal text-sm group-hover:gap-3 transition-all duration-300">
              <span>View project</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default WorkCard;
