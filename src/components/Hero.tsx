import { AnimatePresence, motion } from 'framer-motion';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { siteImages } from '@/config/images';

const glauberPortrait = siteImages.hero.portrait;

const WORDS = [
  'presentations',
  'pitch decks',
  'events',
  'internal comms',
  'templates',
  'reports',
];

// Duration constants (seconds)
const HOLD = 2.2;
const ANIM = 0.55;

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, (HOLD + ANIM) * 1000);
    return () => clearInterval(id);
  }, []);

  const activeWord = WORDS[index];
  const widestWord = WORDS.reduce((a, b) => (b.length > a.length ? b : a), WORDS[0]);

  return (
    <section data-nav-theme="dark" className="bg-background pt-[88px] md:pt-[92px]">
      <div className="site-shell">
        <div className="relative overflow-hidden rounded-[2rem] bg-black px-6 py-16 md:px-14 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(160px,240px)_minmax(0,880px)] gap-6 md:gap-8 lg:gap-10 items-center justify-center">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex justify-center md:justify-start"
            >
              <Link
                to="/about"
                aria-label="About Glauber"
                className="relative block group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 overflow-hidden"
                style={{ borderRadius: '38%' }}
              >
                <img
                  src={glauberPortrait}
                  alt="Glauber Matias"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  draggable={false}
                  className="w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 object-cover pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-5 pt-12 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0) 100%)' }}
                >
                  <span className="text-xs tracking-[0.22em] uppercase text-white font-sans">
                    About me
                  </span>
                </div>
              </Link>
            </motion.div>

            <div className="text-center md:text-left">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="font-sans text-base md:text-lg mb-4"
                style={{ color: '#999999' }}
              >
                Hello there, I'm Glauber
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-display text-white font-semibold text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem]"
                style={{ lineHeight: 1.2 }}
              >
                <span className="md:hidden">Designer of visual stories that amplify the impact of</span>
                <span className="hidden md:inline">Designer of visual stories that amplify the impact of{'\u00A0'}</span>
                <Link
                  to="/work"
                  className="cursor-pointer flex justify-center md:justify-start md:inline-flex max-w-full align-baseline"
                  style={{
                    height: '1.45em',
                    lineHeight: 1.2,
                    verticalAlign: 'baseline',
                    overflow: 'hidden',
                  }}
                  aria-live="polite"
                >
                  <span
                    className="relative inline-block max-w-full"
                    style={{ height: '1.45em', lineHeight: 1.2 }}
                  >
                    <span
                      aria-hidden="true"
                      className="invisible whitespace-nowrap"
                      style={{ lineHeight: 1.2 }}
                    >
                      {widestWord}
                    </span>

                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={activeWord}
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: ANIM, ease: [0.65, 0, 0.35, 1] }}
                        className="absolute inset-0 whitespace-nowrap text-center md:text-left"
                        style={{
                          color: '#e85102',
                          lineHeight: 1.2,
                        }}
                      >
                        {activeWord}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </Link>
              </motion.h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
