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
      {/* Black box fills the viewport minus the top padding */}
      <div
        data-nav-theme="dark"
        className="relative w-full overflow-hidden bg-primary rounded-[2.5rem]"
        style={{ minHeight: 'calc(100vh - 0.5rem)' }}
      >
        {/*
          Photo layout:
          - Always absolutely positioned, anchored to bottom of black box
          - Top anchored below floating nav (~70px)
          - On narrow screens the photo is cropped on the sides (object-cover, centered on subject)
          - On wide screens the photo keeps its natural aspect (object-contain) shifted right
        */}
        <motion.div
          className="absolute inset-x-0 bottom-0"
          style={{ top: '70px' }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img
            src={glauberHero}
            alt="Glauber Matias"
            className="h-full w-full object-cover object-[center_top] md:object-contain md:object-[right_bottom]"
            style={{ marginRight: '-5%' }}
          />
        </motion.div>

        {/* Gradient overlay – transparent at top, 70% black at bottom */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.70) 100%)',
          }}
        />

        {/* Content – always overlays the photo */}
        <div className="relative z-10 flex items-end min-h-[calc(100vh-0.5rem)]">
          <div className="container mx-auto px-6">
            {/* On mobile, extra top padding so face stays visible */}
            <div className="max-w-xl pb-10 pt-[60%] sm:pt-[50%] md:pt-0 md:pb-16 lg:pb-20">
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
