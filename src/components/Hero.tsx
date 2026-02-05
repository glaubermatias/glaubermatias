import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import glauberHero from '@/assets/glauber-hero.jpg';

const Hero = () => {
  const {
    t
  } = useLanguage();

  const headlineVariants = {
    hidden: {
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-4">
      <div className="container mx-auto px-6">
        {/* Hero box with rounded corners */}
        <div className="relative h-[calc(100vh-2rem)] flex items-center overflow-hidden bg-primary rounded-[2.5rem]">
      {/* Background Photo - Right Side */}
      <motion.div 
        className="absolute right-6 top-0 bottom-0 w-full md:w-2/3 lg:w-[55%]"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <img 
          src={glauberHero} 
          alt="Glauber Matias" 
          className="w-full h-full object-contain object-right-top"
        />
        {/* Gradient overlay to blend with black background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
      </motion.div>

      {/* Content */}
          <div className="px-8 md:px-12 relative z-10 pt-24 pb-12">
            <div className="max-w-xl">
          {/* Main Headline */}
          <motion.div className="mb-8" variants={headlineVariants} initial="hidden" animate="visible">
            {/* First line */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] mb-4" style={{ color: '#666769' }}>
              I'm Glauber.
            </h1>

            {/* Second line */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-primary-foreground">
              Designer of visual stories that turn your message into impact
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p 
              className="text-base sm:text-lg leading-relaxed max-w-lg mb-10 font-normal text-primary-foreground/60" 
            variants={descriptionVariants} 
            initial="hidden" 
            animate="visible"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="flex flex-col sm:flex-row gap-4" variants={ctaVariants} initial="hidden" animate="visible">
            <a 
              href="#work" 
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground btn-filled-dark rounded-full hover:bg-accent/90 transition-all duration-300 hover:-translate-y-1"
            >
                View my work
              <motion.span 
                animate={{ y: [0, 4, 0] }} 
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.span>
            </a>
            <a 
              href="#contact" 
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-primary-foreground/30 text-primary-foreground font-normal rounded-full hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
            >
              Let's connect
            </a>
          </motion.div>
        </div>
      </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;