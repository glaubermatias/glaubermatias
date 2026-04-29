import { AnimatePresence, motion } from 'framer-motion';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import glauberPortrait from '@/assets/glauber-portrait.png';

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
  // Widest word reserves the inline width so layout doesn't jump
  const widestWord = WORDS.reduce((a, b) => (b.length > a.length ? b : a), WORDS[0]);

  return (
    <section
      data-nav-theme="dark"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #000000 0%, #0a0a0a 100%)' }}
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(160px,240px)_minmax(0,880px)] gap-6 md:gap-8 lg:gap-10 items-center justify-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex justify-center md:justify-start"
          >
            <Link to="/about-me" className="block group">
              <img
                src={glauberPortrait}
                alt="Glauber Matias"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className="w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                style={{ borderRadius: '38%' }}
              />
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
              Designer of visual stories that amplify the impact of{'\u00A0'}
              <Link
                to="/work"
                className="relative inline-flex cursor-pointer align-baseline"
                style={{
                  height: '1.2em',
                  lineHeight: 1.2,
                  verticalAlign: 'baseline',
                  overflow: 'hidden',
                }}
                aria-live="polite"
              >
                {/* Invisible spacer = widest word, reserves inline width so layout doesn't jump */}
                <span
                  aria-hidden="true"
                  className="invisible whitespace-nowrap"
                  style={{ lineHeight: 1.2 }}
                >
                  {widestWord}
                </span>

                {/* Only the active word is ever rendered. Old word slides up & out, new word slides up & in. */}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={activeWord}
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: ANIM, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute left-0 top-0 whitespace-nowrap"
                    style={{
                      color: '#e85102',
                      lineHeight: 1.2,
                      height: '1.2em',
                    }}
                  >
                    {activeWord}
                  </motion.span>
                </AnimatePresence>
              </Link>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
