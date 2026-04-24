import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import glauberPortrait from '@/assets/glauber-portrait.png';

const ROTATING_WORDS = [
  'founders',
  'leaders',
  'innovators',
  'storytellers',
  'visionaries',
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
      // Only intercept if the cursor is actually over the roulette
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

  // Line-height multiplier for the rolling word column (matches text-5xl/6xl line-height)
  const LINE_HEIGHT = 1.15;

  return (
    <section
      data-nav-theme="dark"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#1a1a1a' }}
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Left — Portrait (smaller, like reference) */}
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
              className="font-sans text-base md:text-lg mb-3"
              style={{ color: '#999999' }}
            >
              Hello there, I'm Glauber
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-white font-semibold leading-[1.2] text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem]"
            >
              <span className="block">Designer of visual stories</span>
              <span className="block">
                that amplify the impact of{' '}
                {/* Inline roulette — same line as "that amplify the impact of" */}
                <span
                  ref={rouletteRef}
                  className="relative inline-block align-baseline overflow-hidden cursor-pointer"
                  style={{
                    height: `${LINE_HEIGHT}em`,
                    lineHeight: `${LINE_HEIGHT}em`,
                    verticalAlign: 'bottom',
                    width: '7.5em',
                    maxWidth: '60vw',
                  }}
                  aria-label="Rotating list — click to view all work"
                >
                  <Link to="/work" className="block w-full h-full">
                    <motion.span
                      animate={{ y: `-${activeIndex * LINE_HEIGHT}em` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-0 block"
                      style={{ willChange: 'transform' }}
                    >
                      {ROTATING_WORDS.map((word, i) => {
                        const distance = Math.abs(i - activeIndex);
                        const opacity =
                          i === activeIndex ? 1 : distance === 1 ? 0.35 : 0.18;
                        return (
                          <span
                            key={word}
                            className="block whitespace-nowrap"
                            style={{
                              height: `${LINE_HEIGHT}em`,
                              lineHeight: `${LINE_HEIGHT}em`,
                              color: '#e85102',
                              opacity,
                              transition: 'opacity 0.5s ease',
                            }}
                          >
                            {word}
                          </span>
                        );
                      })}
                    </motion.span>
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
