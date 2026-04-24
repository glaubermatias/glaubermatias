import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import WorkCard from './WorkCard';

const WorkSection = () => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="work" className="pt-12 pb-8 lg:pt-20 lg:pb-12">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Top divider */}
        <div className="border-t border-foreground/10" />

        {/* Projects List — dividers handled per card */}
        <div>
          {featuredProjects.map((project, index) => (
            <WorkCard
              key={project.id}
              project={project}
              index={index}
              totalCount={featuredProjects.length}
            />
          ))}
        </div>

        {/* View all — left aligned */}
        <motion.div
          className="text-left mt-10"
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
      </div>
    </section>
  );
};

export default WorkSection;
