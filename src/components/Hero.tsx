import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import glauberPhoto from '@/assets/glauber-photo.jpg';

const Hero = () => {
  const { t } = useLanguage();
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-28 pb-8">
      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Card Container */}
        <motion.div 
          className="bg-cream rounded-[2.5rem] p-8 md:p-12 lg:p-16"
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

            {/* Main Headline with Photo Button */}
            <motion.div
              className="mb-8"
              variants={headlineVariants}
              initial="hidden"
              animate="visible"
            >
              {/* First line: I'm + Photo + Glauber */}
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground">
                  I'm
                </h1>
                
                {/* Photo Button - Pill shaped like reference */}
                <div 
                  className="relative inline-block"
                  onMouseEnter={() => setIsPhotoHovered(true)}
                  onMouseLeave={() => setIsPhotoHovered(false)}
                >
                  <motion.div
                    className="relative overflow-hidden cursor-pointer rounded-full"
                    animate={{
                      width: isPhotoHovered ? 180 : 100,
                      height: isPhotoHovered ? 64 : 48,
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Link to="/about" className="block w-full h-full">
                      <img
                        src={glauberPhoto}
                        alt="Glauber Matias"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 20%' }}
                      />
                      
                      {/* Hover overlay with "Get to know me" */}
                      <AnimatePresence>
                        {isPhotoHovered && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-2 px-4"
                          >
                            <span className="text-primary-foreground text-sm font-normal whitespace-nowrap">
                              Get to know me
                            </span>
                            <ArrowRight className="w-4 h-4 text-primary-foreground" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground">
                  Glauber
                </h1>
              </div>

              {/* Second line */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.3] text-foreground max-w-5xl">
                Designer of visual stories that turn your message into impact
              </h1>
            </motion.div>

            {/* Description - smaller and muted gray */}
            <motion.p
              className="text-sm sm:text-base md:text-lg text-muted-foreground font-normal leading-relaxed max-w-2xl mb-10"
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
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <ChevronDown className="w-5 h-5" />
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
