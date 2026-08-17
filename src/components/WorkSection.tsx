import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import ProjectGridCard from './ProjectGridCard';

// Homepage showcase order requested by Glauber.
const FEATURED_IDS = [
  'leadership-academy',
  'summit',
  'investor-deck',
  'institutional-deck',
  'template-library',
  'design-masterclasses',
];

const WorkSection = () => {
  const featuredProjects = FEATURED_IDS.map((id) =>
    projects.find((p) => p.id === id),
  ).filter(Boolean) as typeof projects;

  return (
    <section id="work" className="site-shell pt-8 md:pt-10 pb-8 lg:pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {featuredProjects.map((project, index) => (
          <ProjectGridCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <motion.div
        className="text-left mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-foreground font-normal hover:gap-4 transition-all duration-300 text-lg"
        >
          View all my projects
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
};

export default WorkSection;
