import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
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
        delay: 1.4,
        duration: 0.6,
      },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.8, duration: 0.8 },
    },
  };

  // Split greeting into words
  const greetingParts = t.hero.greeting.split(' ');
  const nameIndex = greetingParts.findIndex(word => word.toLowerCase().includes('glauber'));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Greeting */}
          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-tight mb-8 text-primary-foreground"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {greetingParts.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className={`inline-block mr-[0.25em] ${
                  index >= nameIndex ? 'text-golden-orange' : ''
                }`}
                style={{ perspective: '500px' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-primary-foreground/90 font-light leading-relaxed max-w-4xl mx-auto"
            variants={taglineVariants}
            initial="hidden"
            animate="visible"
          >
            {t.hero.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
          >
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-cream text-primary font-medium rounded-full hover:bg-golden-orange hover:text-primary transition-all duration-300 hover:-translate-y-1"
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
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-primary-foreground/30 text-primary-foreground font-medium rounded-full hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
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
            <ArrowDown className="w-6 h-6 text-primary-foreground/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
