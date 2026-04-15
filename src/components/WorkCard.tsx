import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 4000);
  }, [project.images.length]);

  useEffect(() => {
    if (autoPlay && project.images.length > 1) {
      startAutoPlay();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, startAutoPlay, project.images.length]);

  const handleNav = (e: React.MouseEvent, direction: 'prev' | 'next') => {
    e.preventDefault();
    e.stopPropagation();
    setAutoPlay(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const counterLabel = `WORK ${String(index + 1).padStart(2, '0')}/${String(totalCount).padStart(2, '0')}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/${project.id}`} className="block">
        {/* Counter */}
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 font-sans">
          {counterLabel}
        </p>

        {/* Title + description on same line like carrd reference */}
        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-1 leading-tight">
          {project.title}
          <span className="text-muted-foreground font-sans font-normal text-lg md:text-xl lg:text-2xl ml-3">
            – {project.cardDescription || project.description}
          </span>
        </h3>

        {/* Image carousel with neon shadow */}
        <div
          className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl select-none transition-shadow duration-500 ease-out mt-8"
          style={{
            boxShadow: '0 4px 20px -4px rgba(0,0,0,0.08)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              '0 0 25px 5px rgba(232, 81, 2, 0.15), 0 0 50px 12px rgba(241, 96, 1, 0.06)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              '0 4px 20px -4px rgba(0,0,0,0.08)';
          }}
        >
          <motion.img
            key={currentImageIndex}
            src={project.images[currentImageIndex]}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            draggable={false}
          />

          {/* Discrete navigation arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => handleNav(e, 'prev')}
                className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-start pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
              </button>
              <button
                onClick={(e) => handleNav(e, 'next')}
                className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Three columns below image — following carrd reference */}
        <div className="grid grid-cols-3 gap-8 mt-8">
          {/* Column 1: Client / Category / Duration */}
          <div className="col-span-1 space-y-1.5">
            {project.company && (
              <p className="text-sm text-foreground">
                <span className="font-medium">Company:</span>{' '}
                <span className="text-muted-foreground">{project.company}</span>
              </p>
            )}
            {project.cardCategory && (
              <p className="text-sm text-foreground">
                <span className="font-medium">Category:</span>{' '}
                <span className="text-muted-foreground">{project.cardCategory}</span>
              </p>
            )}
            {project.duration && (
              <p className="text-sm text-foreground">
                <span className="font-medium">Duration:</span>{' '}
                <span className="text-muted-foreground">{project.duration}</span>
              </p>
            )}
          </div>

          {/* Column 2: Problem */}
          <div className="col-span-1">
            <p className="text-sm text-foreground font-medium mb-1">Problem:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.challenge || project.description}
            </p>
          </div>

          {/* Column 3: Solution */}
          <div className="col-span-1">
            <p className="text-sm text-foreground font-medium mb-1">Solution:</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.solution || project.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default WorkCard;
