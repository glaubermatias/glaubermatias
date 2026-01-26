import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import glauberPhoto from '@/assets/glauber-photo.jpg';

const AboutSection = () => {
  const { t } = useLanguage();

  const stats = [
    { number: '7+', label: 'Years of experience' },
    { number: '200+', label: 'Projects delivered' },
    { number: '50+', label: 'Happy clients' },
    { number: '$300M+', label: 'Funding raised by clients' },
  ];

  return (
    <section id="about" className="py-8 lg:py-10">
      <div className="container mx-auto px-6">
        {/* Header - Left aligned */}
        <motion.div
          className="text-left mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
            {t.about.title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Content - Horizontal layout */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Photo - Smaller size */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="shrink-0"
          >
            <img
              src={glauberPhoto}
              alt="Glauber Matias"
              className="w-48 md:w-56 rounded-[2rem] object-cover aspect-[3/4]"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.about.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center md:text-left"
                >
                  <div className="font-display text-2xl md:text-3xl font-semibold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Link to About Page */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-4"
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-normal hover:gap-3 transition-all duration-300"
              >
                <span>Get to know me even better</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
