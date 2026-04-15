import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import WorkCard from './WorkCard';

const WorkSection = () => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="work" className="pt-16 pb-8 lg:pt-24 lg:pb-12">
      <div className="container mx-auto px-6">
        {/* Header — centered */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold">
            Selected Work
          </h2>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-20">
          {featuredProjects.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} totalCount={featuredProjects.length} />
          ))}
        </div>

        {/* View All Projects Link */}
        <motion.div
          className="text-center mt-16 mb-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
