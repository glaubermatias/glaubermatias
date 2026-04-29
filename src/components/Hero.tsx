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
const LINE_HEIGHT = 1.1; // em — must match the h1 line-height

const Hero = () => {
  // Start at the middle block
  const [currentIndex, setCurrentIndex] = useState(WORDS.length);
  const controls = useAnimationControls();
  const jumpingRef = useRef(false);

  // Animate the strip whenever index changes
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (jumpingRef.current) {
        // We just teleported; skip animation this tick
        jumpingRef.current = false;
        controls.set({ y: `-${currentIndex * LINE_HEIGHT}em` });
        return;
      }
      await controls.start({
        y: `-${currentIndex * LINE_HEIGHT}em`,
        transition: { type: 'spring', stiffness: 110, damping: 20, mass: 0.8 },
      });
      if (cancelled) return;

      // When we cross into the last block, silently rewind to the middle block.
      if (currentIndex >= WORDS.length * 2) {
        const normalized = currentIndex - WORDS.length;
        jumpingRef.current = true;
        controls.set({ y: `-${normalized * LINE_HEIGHT}em` });
        setCurrentIndex(normalized);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [currentIndex, controls]);

  // Auto-play
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((i) => i + 1);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const activeWordIdx = currentIndex % WORDS.length;

  // Mask: reveal exactly 4 line-slots (one above, active, two below).
  // The active line sits at the 2nd slot (index 1) of the visible window.
  const WINDOW_LINES = 4;
  const ACTIVE_SLOT = 1; // 0 = top adjacent, 1 = active, 2/3 = below

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
              style={{ lineHeight: LINE_HEIGHT }}
            >
              <span className="block">Designer of visual stories</span>
              <span className="inline-flex items-baseline flex-wrap">
                <span>that amplify the impact of&nbsp;</span>

                {/*
                  Roulette anchor.
                  - Has the height of ONE line so it sits on the baseline of "the impact of".
                  - Adjacent words (top: -1 line, bottom: +1/+2 lines) overflow visibly.
                  - The strip is clipped by a CSS mask so only -1, 0, +1, +2 are visible.
                  - Single strip means no overlap and no flickering ghosts.
                */}
                <span
                  className="relative inline-block align-baseline"
                  style={{
                    height: `${LINE_HEIGHT}em`,
                    minWidth: '8ch',
                    verticalAlign: 'baseline',
                  }}
                  aria-live="polite"
                >
                  {/* Visible window: 4 lines tall, starting one line above baseline */}
                  <span
                    className="absolute left-0 pointer-events-none"
                    style={{
                      top: `-${ACTIVE_SLOT * LINE_HEIGHT}em`,
                      height: `${WINDOW_LINES * LINE_HEIGHT}em`,
                      width: '100%',
                      overflow: 'hidden',
                      // Soft fade at the very top/bottom edges (optional polish)
                      WebkitMaskImage:
                        'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
                      maskImage:
                        'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
                    }}
                  >
                    <motion.span
                      animate={controls}
                      initial={{ y: `-${currentIndex * LINE_HEIGHT}em` }}
                      className="flex flex-col"
                      style={{ willChange: 'transform' }}
                    >
                      {LOOP_WORDS.map((w, i) => {
                        const offset = i - currentIndex;
                        const isActive = offset === 0;
                        return (
                          <span
                            key={i}
                            style={{
                              height: `${LINE_HEIGHT}em`,
                              lineHeight: LINE_HEIGHT,
                              color: isActive ? '#e85102' : '#2f1106',
                              transition: 'color 350ms ease',
                              whiteSpace: 'nowrap',
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
