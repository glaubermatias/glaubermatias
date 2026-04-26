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
      setActiveIndex((p) => (p + 1) % ROTATING_WORDS.length);
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
      setActiveIndex((p) => {
        if (e.deltaY > 0) return (p + 1) % ROTATING_WORDS.length;
        return (p - 1 + ROTATING_WORDS.length) % ROTATING_WORDS.length;
      });
      startAuto();
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 500);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [startAuto]);

  // Visible window: 1 word above + active + 2 words below (4 lines visible)
  const LINE_HEIGHT = 1.4;
  const VISIBLE_ABOVE = 1;
  const len = ROTATING_WORDS.length;

  const getWord = (offset: number) =>
    ROTATING_WORDS[((activeIndex + offset) % len + len) % len];

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
              className="font-display text-white font-semibold text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem]"
              style={{ lineHeight: LINE_HEIGHT }}
            >
              <span className="block">Designer of visual stories</span>
              <span className="flex items-baseline flex-wrap gap-x-4">
                <span>that amplify the impact of</span>
                {/* Inline roulette — shows 1 above + active + 2 below */}
                <span
                  ref={rouletteRef}
                  className="relative inline-block cursor-pointer"
                  style={{
                    height: `${LINE_HEIGHT * 4}em`,
                    lineHeight: `${LINE_HEIGHT}em`,
                    width: '9em',
                    maxWidth: '60vw',
                    overflow: 'hidden',
                    // Vertically center the active (2nd) line with surrounding text baseline
                    transform: `translateY(${LINE_HEIGHT * VISIBLE_ABOVE}em)`,
                    marginTop: `-${LINE_HEIGHT * VISIBLE_ABOVE}em`,
                  }}
                  aria-label="Rotating list — click to view all work"
                >
                  <Link to="/work" className="block w-full h-full">
                    {[-1, 0, 1, 2].map((offset) => {
                      const isActive = offset === 0;
                      return (
                        <motion.span
                          key={offset}
                          className="block whitespace-nowrap"
                          style={{
                            height: `${LINE_HEIGHT}em`,
                            lineHeight: `${LINE_HEIGHT}em`,
                            color: isActive ? '#e85102' : '#2f1106',
                            fontWeight: isActive ? 600 : 500,
                          }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <motion.span
                            key={getWord(offset)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="inline-block"
                          >
                            {getWord(offset)}
                          </motion.span>
                        </motion.span>
                      );
                    })}
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
