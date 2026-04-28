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

const LINE_HEIGHT = 1.05;
const ROW_EM = LINE_HEIGHT;
const AUTOPLAY_MS = 2100;

// Triplicate-style infinite track for seamless loop.
const LOOPS = 80;
const LEN = ROTATING_WORDS.length;
const TRACK = Array.from({ length: LOOPS * LEN }, (_, i) => ROTATING_WORDS[i % LEN]);
const START_INDEX = Math.floor(LOOPS / 2) * LEN;

type RouletteProps = {
  rowsAbove: number;
  rowsBelow: number;
};

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

  // Autoplay (paused on hover).
  useEffect(() => {
    if (isHovering) return;
    intervalRef.current = setInterval(() => setIndex((p) => p + 1), AUTOPLAY_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  // Seamless infinite loop normalization.
  useEffect(() => {
    const safeMin = LEN * 4;
    const safeMax = TRACK.length - LEN * 5;
    if (index < safeMin || index > safeMax) {
      const normalized = START_INDEX + (((index % LEN) + LEN) % LEN);
      setAnimate(false);
      setIndex(normalized);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    }
  }, [index]);

  // Wheel — preventDefault while hovering the roulette.
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
      }, 200);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  const renderRoulette = ({ rowsAbove, rowsBelow }: RouletteProps) => {
    const windowRows = rowsAbove + 1 + rowsBelow;
    return (
      <span
        ref={rouletteRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer select-none"
        style={{
          display: 'inline-block',
          height: `${windowRows * ROW_EM}em`,
          lineHeight: LINE_HEIGHT,
          overflow: 'hidden',
          overscrollBehavior: 'contain',
          verticalAlign: 'baseline',
          // Lift so the ACTIVE row sits on the baseline.
          transform: `translateY(${rowsBelow * ROW_EM}em)`,
        }}
        aria-label="Rotating list — hover to scroll, click to view all work"
      >
        <motion.span
          className="block"
          animate={{ y: `-${(index - rowsAbove) * ROW_EM}em` }}
          transition={
            animate
              ? { type: 'spring', stiffness: 100, damping: 15, mass: 0.9 }
              : { duration: 0 }
          }
          style={{ willChange: 'transform' }}
        >
          {TRACK.map((word, i) => {
            const isActive = i === index;
            return (
              <span
                key={i}
                className="block whitespace-nowrap"
                style={{
                  height: `${ROW_EM}em`,
                  lineHeight: LINE_HEIGHT,
                  fontWeight: 600,
                  color: isActive ? '#e85102' : '#2f1106',
                }}
              >
                {word}
              </span>
            );
          })}
        </motion.span>

        <Link
          to="/work"
          className="absolute inset-0 block"
          aria-label="View all work"
          style={{ zIndex: 2 }}
        />
      </span>
    );
  };

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
              className="font-display text-white font-semibold text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem]"
              style={{ lineHeight: LINE_HEIGHT }}
            >
              <span className="block">Designer of visual stories</span>

              {/* Desktop: inline-flex with baseline alignment so the active
                  roulette word sits exactly on the sentence baseline. */}
              <span
                className="hidden lg:inline-flex"
                style={{ alignItems: 'baseline', gap: '0.5rem' }}
              >
                <span>that amplify the impact of</span>
                {renderRoulette({ rowsAbove: 1, rowsBelow: 2 })}
              </span>

              {/* Mobile/Compact: title in one line, roulette below — no row above. */}
              <span className="block lg:hidden">that amplify the impact of</span>
              <span
                className="lg:hidden mt-2"
                style={{ display: 'inline-flex', alignItems: 'baseline' }}
              >
                {renderRoulette({ rowsAbove: 0, rowsBelow: 2 })}
              </span>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
