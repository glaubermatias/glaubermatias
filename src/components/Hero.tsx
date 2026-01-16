import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

  const badgeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.7,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.0,
        duration: 0.6,
      },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.4, duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome Badge */}
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            className="inline-block mb-8"
          >
            <span className="inline-flex items-center px-6 py-2 rounded-full bg-secondary text-foreground text-sm font-medium">
              {t.hero.welcome}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-8 text-foreground"
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
          >
            {t.hero.headline}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto mb-12"
            variants={descriptionVariants}
            initial="hidden"
            animate="visible"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
          >
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-accent transition-all duration-300 hover:-translate-y-1"
            >
              {t.hero.cta}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-foreground/20 text-foreground font-medium rounded-full hover:border-foreground hover:bg-foreground/5 transition-all duration-300"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-6 h-6 text-foreground/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;