import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Card Container */}
        <motion.div 
          className="bg-cream rounded-3xl p-8 md:p-12 lg:p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="text-left">
            {/* Hi there Badge */}
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center px-6 py-2 rounded-full bg-accent text-accent-foreground text-sm font-normal">
                {t.hero.welcome}
              </span>
            </motion.div>

            {/* Main Headline - 2 lines max with smaller font */}
            <motion.h1
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.15] mb-6 text-foreground max-w-4xl"
              variants={headlineVariants}
              initial="hidden"
              animate="visible"
            >
              {t.hero.headline}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal leading-relaxed max-w-2xl mb-10"
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
            >
              {t.hero.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
            >
              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground btn-filled-dark rounded-full hover:bg-dark-accent transition-all duration-300 hover:-translate-y-1"
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
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-foreground/20 text-foreground font-normal rounded-full hover:border-foreground hover:bg-foreground/5 transition-all duration-300"
              >
                Get in touch
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
