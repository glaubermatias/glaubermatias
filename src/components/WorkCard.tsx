import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectData } from '@/data/projects';

interface WorkCardProps {
  project: ProjectData;
  index: number;
  totalCount: number;
}

const WorkCard = ({ project, index, totalCount }: WorkCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((p) => (p + 1) % project.images.length);
    }, 4000);
  }, [project.images.length]);

  useEffect(() => {
    if (autoPlay && project.images.length > 1) startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, startAutoPlay, project.images.length]);

  const handleNav = (e: React.MouseEvent, direction: 'prev' | 'next') => {
    e.preventDefault();
    e.stopPropagation();
    setAutoPlay(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentImageIndex((p) =>
      direction === 'next'
        ? (p + 1) % project.images.length
        : (p - 1 + project.images.length) % project.images.length,
    );
  };

  const tagLabel = `WORK ${String(index + 1).padStart(2, '0')}/${String(totalCount).padStart(2, '0')}`;
  const isLast = index === totalCount - 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`group transition-colors duration-300 hover:bg-[#f8f6f5] ${
        isLast ? '' : 'border-b border-foreground/10'
      }`}
    >
      <Link to={`/${project.id}`} className="block py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* LEFT — Text content */}
          <div className="md:col-span-6 lg:col-span-5">
            {/* Tag */}
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-5 font-sans">
              {tagLabel}
            </p>

            {/* Short name */}
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground leading-tight">
              {project.title}
            </h3>

            {/* Descriptive subtitle */}
            <p className="font-display text-xl md:text-2xl font-normal mt-2 leading-snug" style={{ color: '#b7b7b7' }}>
              {project.cardDescription || project.description}
            </p>

            {/* Problem & Solution */}
            <div className="mt-8 space-y-5 max-w-md">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Problem</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.challenge || project.description}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Solution</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.solution || project.description}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 inline-flex items-center gap-2 text-foreground text-sm font-normal group-hover:gap-3 transition-all duration-300">
              <span className="border-b border-foreground/40 pb-0.5">View project</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* RIGHT — Carousel */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl select-none bg-muted">
              <motion.img
                key={currentImageIndex}
                src={project.images[currentImageIndex]}
                alt={`${project.title} – ${currentImageIndex + 1}`}
                className="w-full h-full object-cover absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                draggable={false}
              />

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => handleNav(e, 'prev')}
                    className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-start pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-white/80 hover:text-white transition-colors" />
                  </button>
                  <button
                    onClick={(e) => handleNav(e, 'next')}
                    className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-white/80 hover:text-white transition-colors" />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {project.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/40 w-1.5'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default WorkCard;
