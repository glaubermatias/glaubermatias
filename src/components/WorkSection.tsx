import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import WorkCard from './WorkCard';

const WorkSection = () => {
  const { t } = useLanguage();

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <section id="work" className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-left mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold">
            Work
          </h2>
        </motion.div>

        {/* Projects List - Stacked */}
        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects Link */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-foreground font-normal hover:gap-4 transition-all duration-300 text-lg"
          >
            {t.work.viewAll}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
