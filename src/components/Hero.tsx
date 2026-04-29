import { motion, useAnimationControls } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import glauberPortrait from '@/assets/glauber-portrait.png';

const WORDS = [
  'presentations',
  'pitch decks',
  'events',
  'internal comms',
  'templates',
  'reports',
];

// Triplicate to fake an infinite loop
const LOOP_WORDS = [...WORDS, ...WORDS, ...WORDS];
const ITEM_HEIGHT = 1.1; // in em, matches line-height of hero text

const Hero = () => {
  // Start at the middle block
  const [currentIndex, setCurrentIndex] = useState(WORDS.length);
  const controls = useAnimationControls();
  const isAnimatingRef = useRef(false);

  // Animate scroll whenever index changes
  useEffect(() => {
    const run = async () => {
      isAnimatingRef.current = true;
      await controls.start({
        y: `-${currentIndex * ITEM_HEIGHT}em`,
        transition: { type: 'spring', stiffness: 90, damping: 18, mass: 0.9 },
      });
      isAnimatingRef.current = false;

      // Silent jump back to middle block when entering the last third
      if (currentIndex >= WORDS.length * 2) {
        const normalized = currentIndex - WORDS.length;
        controls.set({ y: `-${normalized * ITEM_HEIGHT}em` });
        setCurrentIndex(normalized);
      }
    };
    run();
  }, [currentIndex, controls]);

  // Auto-play
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((i) => i + 1);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const activeWordIdx = currentIndex % WORDS.length;

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
              className="font-display text-white font-semibold text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[2.75rem]"
              style={{ lineHeight: 1.1 }}
            >
              <span className="block">Designer of visual stories</span>
              <span className="inline-flex items-baseline flex-wrap">
                <span>that amplify the impact of&nbsp;</span>

                {/* Roulette anchor: zero-weight in centralization.
                    A single-line slot reveals the active word; absolutely
                    positioned siblings render the adjacent words above/below
                    so they don't push surrounding layout. */}
                <span
                  className="relative inline-block align-baseline"
                  style={{
                    height: '1.1em',
                    // Reserve enough width for the longest word so the
                    // following layout (none here) stays calm; tracked via ch.
                    minWidth: '8ch',
                    overflow: 'visible',
                    verticalAlign: 'baseline',
                  }}
                  aria-live="polite"
                >
                  {/* Clipped viewport for the active word only */}
                  <span
                    className="absolute left-0 top-0"
                    style={{
                      height: '1.1em',
                      lineHeight: 1.1,
                      overflow: 'hidden',
                      width: '100%',
                    }}
                  >
                    <motion.span
                      animate={controls}
                      initial={{ y: `-${currentIndex * ITEM_HEIGHT}em` }}
                      className="flex flex-col"
                      style={{ willChange: 'transform' }}
                    >
                      {LOOP_WORDS.map((w, i) => {
                        const isActive = i === currentIndex;
                        return (
                          <span
                            key={`active-${i}`}
                            style={{
                              height: '1.1em',
                              lineHeight: 1.1,
                              color: isActive ? '#e85102' : 'transparent',
                              transition: 'color 350ms ease',
                            }}
                          >
                            {w}
                          </span>
                        );
                      })}
                    </motion.span>
                  </span>

                  {/* Adjacent words (above + 2 below) drawn in #2f1106.
                      They sit absolutely so they never affect centralization. */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 pointer-events-none"
                    style={{
                      height: '1.1em',
                      lineHeight: 1.1,
                      width: '100%',
                      overflow: 'visible',
                    }}
                  >
                    <motion.span
                      animate={controls}
                      initial={{ y: `-${currentIndex * ITEM_HEIGHT}em` }}
                      className="flex flex-col"
                      style={{ willChange: 'transform' }}
                    >
                      {LOOP_WORDS.map((w, i) => {
                        const offset = i - currentIndex;
                        // Show only -1, +1, +2 (active is rendered above)
                        const visible = offset === -1 || offset === 1 || offset === 2;
                        return (
                          <span
                            key={`ghost-${i}`}
                            style={{
                              height: '1.1em',
                              lineHeight: 1.1,
                              color: '#2f1106',
                              opacity: visible ? 1 : 0,
                              transition: 'opacity 350ms ease',
                            }}
                          >
                            {w}
                          </span>
                        );
                      })}
                    </motion.span>
                  </span>
                </span>
              </span>
            </motion.h1>

            {/* Screen-reader fallback */}
            <span className="sr-only">{WORDS[activeWordIdx]}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
