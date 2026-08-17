import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProjectData } from '@/data/projects';
import { projectImages } from '@/config/images';

interface ProjectGridCardProps {
  project: ProjectData;
  index?: number;
  /** Tailwind radius class for the image container */
  radiusClass?: string;
}

/**
 * Card used on the homepage and on /work.
 * 16:9 image, glass pills (tools + category) on the top-left of the image,
 * and three text lines below: short title, meaningful title, year • company.
 */
const ProjectGridCard = ({ project, index = 0, radiusClass = 'rounded-xl' }: ProjectGridCardProps) => {
  const assets = projectImages[project.id];
  const image =
    (assets?.cardImages && assets.cardImages[0]) ||
    (project.cardImages && project.cardImages[0]) ||
    project.images?.[0];

  const toolLogos = assets?.toolLogos ?? [];


  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="group"
    >
      <Link to={`/${project.id}`} className="block">
        <div className={`relative w-full aspect-video overflow-hidden bg-muted ${radiusClass}`}>
          {image && (
            <img
              src={image}
              alt={project.headerTitle ?? project.title}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          )}

          {/* Glass pills */}
          <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2">
            {tools.length > 0 && (
              <span className="glass-pill">
                {tools.map((tool, i) => (
                  <span key={tool} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true" className="opacity-50">·</span>}
                    {tool}
                  </span>
                ))}
              </span>
            )}
            {project.cardCategory && (
              <span className="glass-pill">{project.cardCategory}</span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground leading-tight">
            {project.headerTitle ?? project.title}
          </h3>
          <p className="mt-1 font-sans text-sm md:text-base text-muted-foreground leading-snug">
            {project.meaningfulTitle ?? project.cardDescription}
          </p>
          <p className="mt-2 font-sans text-xs md:text-sm text-muted-foreground/80">
            {project.year}
            <span aria-hidden="true">{'\u2002•\u2002'}</span>
            {project.company ?? project.client}
          </p>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProjectGridCard;
