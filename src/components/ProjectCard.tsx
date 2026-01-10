import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from './WorkSection';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { t } = useLanguage();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <a href={`/project/${project.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[4/3] bg-secondary">
          <motion.img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* View Project Button */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
          >
            <span className="text-primary-foreground font-medium">
              {t.work.viewProject}
            </span>
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{project.client}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>{project.year}</span>
          </div>
          
          <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
      </a>
    </motion.article>
  );
};

export default ProjectCard;