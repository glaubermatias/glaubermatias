import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

  const nameWords = t.hero.greeting.split(' ');
  const taglineWords = t.hero.tagline.split(' ');

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
        delay: 1.2,
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
        delay: 1.6,
        duration: 0.6,
      },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 2, duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-warm opacity-50" />
      
      {/* Floating accent shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-terracotta/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-golden/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Name */}
          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {nameWords.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className={`inline-block mr-[0.25em] ${
                  index === nameWords.length - 1 || index === nameWords.length - 2
                    ? 'text-gradient'
                    : ''
                }`}
                style={{ perspective: '500px' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light mb-12"
            variants={taglineVariants}
            initial="hidden"
            animate="visible"
          >
            {taglineWords.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-[0.3em] ${
                  word.toLowerCase() === 'strategic' ||
                  word.toLowerCase() === 'estratégico' ||
                  word.toLowerCase() === 'estratégico'
                    ? 'text-foreground font-medium'
                    : ''
                }`}
              >
                {word}
              </span>
            ))}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-warm-solid text-primary-foreground font-medium rounded-full hover:shadow-lg hover:shadow-terracotta/20 transition-all duration-300 hover:-translate-y-1"
            >
              {t.hero.cta}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                →
              </motion.span>
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
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
