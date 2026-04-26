import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import glauberPortrait from '@/assets/glauber-portrait.png';

const ROTATING_WORDS = [
  'pitch decks',
  'presentations',
  'events',
  'internal comms',
  'keynotes',
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wheelLockRef = useRef(false);
  const rouletteRef = useRef<HTMLSpanElement>(null);

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((p) => p + 1);
    }, 3000);
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAuto]);

  // Native wheel listener with passive:false so we can preventDefault
  // and keep the page from scrolling while the cursor is over the roulette.
  useEffect(() => {
    const el = rouletteRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLockRef.current) return;
      if (Math.abs(e.deltaY) < 6) return;
      wheelLockRef.current = true;
      setActiveIndex((p) => (e.deltaY > 0 ? p + 1 : p - 1));
      startAuto();
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 500);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [startAuto]);

  // Roulette rendering: render a window of words around activeIndex; translate the column
  // smoothly so words physically scroll. Inactive words are smaller and "flattened".
  const ACTIVE_LINE = 1.15; // em — height of active line
  const INACTIVE_LINE = 0.7; // em — flattened height of side words
  const WINDOW = 4; // how many items to keep in DOM around the active one
  const len = ROTATING_WORDS.length;
  const mod = (n: number) => ((n % len) + len) % len;

  // Build a stable list of items keyed by absolute index so framer can animate, not remount.
  const items: number[] = [];
  for (let i = -WINDOW; i <= WINDOW; i++) {
    items.push(activeIndex + i);
  }

  return (
    <section
      data-nav-theme="dark"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #000000 0%, #0a0a0a 100%)',
      }}
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Left — Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-3 flex justify-center md:justify-start"
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

          {/* Right — Text */}
          <div className="md:col-span-9">
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
              className="font-display text-white font-semibold text-[1.75rem] sm:text-3xl md:text-[2.25rem] lg:text-[2.6rem] xl:text-[3rem]"
              style={{ lineHeight: 1.25 }}
            >
              <span className="block">Designer of visual stories</span>
              <span className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
                <span>that amplify the impact of</span>
                <span
                  ref={rouletteRef}
                  className="relative inline-block cursor-pointer align-baseline overflow-hidden"
                  style={{
                    // Reserve room for active line + 1 above + 2 below.
                    // On small screens fall back to active + 2 below (no above).
                    height: `${ACTIVE_LINE + INACTIVE_LINE * 3}em`,
                    width: '7.5em',
                    maxWidth: '90vw',
                  }}
                  aria-label="Rotating list — click to view all work"
                >
                  <Link to="/work" className="block w-full h-full">
                    {/* Translating column: keep activeIndex on the "active row".
                        Active row sits at offset 1 from top on desktop (1 above + active + 2 below)
                        and at offset 0 on small screens (active + 2 below). We use one
                        layout and let CSS hide the "above" row on small screens by clipping. */}
                    <motion.div
                      animate={{
                        // translateY so that the active item lands on the active row.
                        // Each item before active contributes INACTIVE_LINE (em); active contributes ACTIVE_LINE.
                        // We render WINDOW items above active; we want only 1 visible above on >=md
                        // and 0 on <md. We clip with overflow-hidden + a top mask via padding trick.
                        y: `-${WINDOW * INACTIVE_LINE}em`,
                      }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      style={{ willChange: 'transform' }}
                    >
                      {items.map((absIdx) => {
                        const isActive = absIdx === activeIndex;
                        return (
                          <motion.div
                            key={absIdx}
                            className="whitespace-nowrap flex items-center"
                            animate={{
                              height: isActive ? `${ACTIVE_LINE}em` : `${INACTIVE_LINE}em`,
                              opacity: isActive ? 1 : 0.85,
                              fontSize: isActive ? '1em' : '0.55em',
                              color: isActive ? '#e85102' : '#5a2410',
                              fontWeight: isActive ? 600 : 500,
                            }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                              lineHeight: 1,
                              willChange: 'height, font-size, color',
                            }}
                          >
                            <span style={{ display: 'inline-block' }}>
                              {ROTATING_WORDS[mod(absIdx)]}
                            </span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </Link>
                </span>
              </span>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
