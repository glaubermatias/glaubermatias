import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import glauberHero from '@/assets/glauber-hero.jpg';

const Hero = () => {
  const { t } = useLanguage();

  const headlineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
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
        delay: 0.5,
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
      transition: { delay: 0.8, duration: 0.6 },
    },
  };

  return (
    <section className="px-2 pt-2 pb-10 lg:pb-8">
      <div
        data-nav-theme="dark"
        className="relative w-full overflow-hidden bg-primary rounded-[2.5rem]"
      >
        {/*
          Photo layout:
          - Mobile: flow element → sets the container height (no crop, full image)
          - Desktop (md+): absolutely positioned, h-full w-auto, anchored top & bottom & right
        */}
        <motion.div
          className="md:absolute md:bottom-0 flex justify-end"
          style={{ top: '70px', right: '-10%' }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img
            src={glauberHero}
            alt="Glauber Matias"
            className="block w-full md:w-auto md:h-full object-contain"
          />
        </motion.div>

        {/* Mobile gradient overlay – transparent at top, 70% black at bottom */}
        <div
          className="absolute inset-0 md:hidden z-[5] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.70) 100%)',
          }}
        />

        {/* Content – absolute on mobile (overlays the photo), relative on desktop */}
        <div className="absolute inset-0 md:relative z-10 flex items-end md:items-center md:min-h-[calc(100vh-1rem)]">
          <div className="container mx-auto px-6">
            {/* pt-[55%] on mobile pushes text down so the face is visible */}
            <div className="max-w-xl pt-[55%] pb-10 md:pt-0 md:pb-0 md:py-12">
              {/* Main Headline */}
              <motion.div
                className="mb-8"
                variants={headlineVariants}
                initial="hidden"
                animate="visible"
              >
                <h1
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.1] mb-4 lg:text-6xl"
                  style={{ color: '#666769' }}
                >
                  Hi! I'm Glauber.
                </h1>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.1] text-primary-foreground lg:text-6xl">
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
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={ctaVariants}
                initial="hidden"
                animate="visible"
              >
                <a
                  href="#work"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#8C1414] text-white btn-filled-dark rounded-full hover:bg-[#8C1414]/90 transition-all duration-300 hover:-translate-y-1"
                >
                  View my work
                  <motion.span
                    animate={{ y: [0, 4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'easeInOut',
                    }}
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
