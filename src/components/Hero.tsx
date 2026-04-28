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

const LINE_HEIGHT = 1.12;
const ROWS_ABOVE = 1;
const ROWS_BELOW = 2;
const WINDOW_ROWS = ROWS_ABOVE + 1 + ROWS_BELOW; // 4 visible rows
const AUTOPLAY_MS = 2100;

// Long duplicated track to fake an infinite loop.
const LOOPS = 60;
const len = ROTATING_WORDS.length;
const TRACK = Array.from({ length: LOOPS * len }, (_, i) => ROTATING_WORDS[i % len]);
const START_INDEX = Math.floor(LOOPS / 2) * len;

const Hero = () => {
  const [index, setIndex] = useState(START_INDEX);
  const [isCompact, setIsCompact] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [animate, setAnimate] = useState(true);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wheelLockRef = useRef(false);
  const rouletteRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isHovering) return;
    intervalRef.current = setInterval(() => setIndex((p) => p + 1), AUTOPLAY_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  // Seamless normalization — invisibly jump back near the middle.
  useEffect(() => {
    const safeMin = len * 3;
    const safeMax = TRACK.length - len * 4;
    if (index < safeMin || index > safeMax) {
      const normalized = START_INDEX + ((index % len) + len) % len;
      setAnimate(false);
      setIndex(normalized);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    }
  }, [index]);

  // Wheel — physical drag feel: each step = one word, throttled by lock.
  useEffect(() => {
    const el = rouletteRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (wheelLockRef.current) return;
      if (Math.abs(e.deltaY) < 4) return;
      wheelLockRef.current = true;
      setIndex((p) => (e.deltaY > 0 ? p + 1 : p - 1));
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 220);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  // Roulette — width:0 wrapper so it does NOT push the centered text off-axis.
  // The inner span overflows to the right (white-space:nowrap) anchored to
  // the end of "the impact of".
  const Roulette = (
    <span
      ref={rouletteRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block cursor-pointer align-baseline"
      style={{
        height: `${WINDOW_ROWS * LINE_HEIGHT}em`,
        width: isCompact ? '100%' : '0',
        lineHeight: LINE_HEIGHT,
        overflow: 'hidden',
        overscrollBehavior: 'contain',
        verticalAlign: 'baseline',
        // Pull the window up so the active row sits exactly on baseline.
        marginTop: `-${ROWS_ABOVE * LINE_HEIGHT}em`,
        marginBottom: `-${ROWS_BELOW * LINE_HEIGHT}em`,
      }}
      aria-label="Rotating list — hover to scroll, click to view all work"
    >
      <motion.div
        animate={{ y: `-${(index - ROWS_ABOVE) * LINE_HEIGHT}em` }}
        transition={
          animate
            ? {
                // Spring — feels like a physical cylinder.
                type: 'spring',
                stiffness: 260,
                damping: 32,
                mass: 0.9,
              }
            : { duration: 0 }
        }
        style={{ willChange: 'transform' }}
      >
        {TRACK.map((word, i) => {
          const isActive = i === index;
          return (
            <div
              key={i}
              className="whitespace-nowrap"
              style={{
                height: `${LINE_HEIGHT}em`,
                lineHeight: LINE_HEIGHT,
                fontWeight: 600,
                color: isActive ? '#e85102' : '#2f1106',
                paddingLeft: isCompact ? 0 : '0.6rem',
              }}
            >
              {word}
            </div>
          );
        })}
      </motion.div>

      <Link
        to="/work"
        className="absolute left-0 right-0 block"
        style={{
          top: `${ROWS_ABOVE * LINE_HEIGHT}em`,
          height: `${LINE_HEIGHT}em`,
          // Force a hit area regardless of width:0 wrapper.
          width: isCompact ? '100%' : '8.7em',
        }}
        aria-label="View all work"
      />
    </span>
  );

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

          {/* Text block — centering ignores the roulette (width:0 wrapper). */}
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
              style={{ lineHeight: LINE_HEIGHT }}
            >
              <span className="block">Designer of visual stories</span>
              {/* Desktop: roulette is appended inline but width:0, so it does
                  not affect the centered position of the static text. */}
              <span className="hidden lg:block">
                that amplify the impact of{Roulette}
              </span>
              {/* Compact stacked layout */}
              <span className="block lg:hidden">that amplify the impact of</span>
              <span className="block lg:hidden mt-2 text-left md:text-center">{Roulette}</span>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
