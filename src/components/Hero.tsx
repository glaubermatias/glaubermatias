import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Link } from 'react-router-dom';
import glauberPortrait from '@/assets/glauber-portrait.png';

const ROTATING_WORDS = [
  'pitch decks',
  'presentations',
  'events',
  'internal comms',
  'keynotes',
];

// Tighter headline line-height for a more compact, premium look.
const LINE_HEIGHT = 1.12;
// Visible window: 1 word above + active + 2 words below = 4 rows total.
const ROWS_ABOVE = 1;
const ROWS_BELOW = 2;
const WINDOW_ROWS = ROWS_ABOVE + 1 + ROWS_BELOW;
const AUTOPLAY_MS = 2100;
const TRANSITION_MS = 700;

// Duplicate the words enough times to create a seamless infinite illusion.
const LOOPS = 40;
const len = ROTATING_WORDS.length;
const TRACK = Array.from({ length: LOOPS * len }, (_, i) => ROTATING_WORDS[i % len]);
const START_INDEX = Math.floor(LOOPS / 2) * len; // start in the middle

const Hero = () => {
  const [index, setIndex] = useState(START_INDEX);
  const [isCompact, setIsCompact] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [animate, setAnimate] = useState(true);

  const controls = useAnimationControls();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wheelLockRef = useRef(false);
  const rouletteRef = useRef<HTMLSpanElement>(null);

  // Detect viewport for inline vs stacked layout.
  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Autoplay — pauses while hovering.
  useEffect(() => {
    if (isHovering) return;
    intervalRef.current = setInterval(() => {
      setIndex((p) => p + 1);
    }, AUTOPLAY_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  // Seamless loop normalization — when far from middle, jump back invisibly.
  useEffect(() => {
    const safeMin = len * 2;
    const safeMax = TRACK.length - len * 3;
    if (index < safeMin || index > safeMax) {
      const normalized = START_INDEX + ((index % len) + len) % len;
      // Jump without animation
      setAnimate(false);
      setIndex(normalized);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }
  }, [index]);

  // Wheel listener — exclusive to the roulette.
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
      }, 380);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  // The roulette is a window of WINDOW_ROWS lines tall (overflow-hidden),
  // with the active row offset by ROWS_ABOVE from the top so we see one
  // word above and two below. We translate the track by `index` rows.
  const Roulette = (
    <span
      ref={rouletteRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block cursor-pointer"
      style={{
        height: `${WINDOW_ROWS * LINE_HEIGHT}em`,
        width: isCompact ? '100%' : '8.7em',
        maxWidth: '90vw',
        lineHeight: LINE_HEIGHT,
        overflow: 'hidden',
        overscrollBehavior: 'contain',
        // Pull the window up so the active row sits on the same baseline
        // as the surrounding text (which is on the first visible row line).
        verticalAlign: 'top',
        marginTop: `-${ROWS_ABOVE * LINE_HEIGHT}em`,
      }}
      aria-label="Rotating list — hover to scroll, click to view all work"
    >
      <motion.div
        animate={{ y: `-${(index - ROWS_ABOVE) * LINE_HEIGHT}em` }}
        transition={
          animate
            ? { duration: TRANSITION_MS / 1000, ease: [0.76, 0, 0.24, 1] }
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
                transition: 'color 0.4s ease',
              }}
            >
              {word}
            </div>
          );
        })}
      </motion.div>

      {/* Click target on the active row */}
      <Link
        to="/work"
        className="absolute left-0 right-0 block"
        style={{
          top: `${ROWS_ABOVE * LINE_HEIGHT}em`,
          height: `${LINE_HEIGHT}em`,
        }}
        aria-label="View all work"
      />
    </span>
  );

  return (
    <section
      data-nav-theme="dark"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #000000 0%, #0a0a0a 100%)',
      }}
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(160px,240px)_minmax(0,880px)] gap-6 md:gap-8 lg:gap-10 items-center justify-center">
          {/* Left — Portrait */}
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

          {/* Right — Text */}
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
              {/* Desktop / wide tablet: roulette continues line 2 inline */}
              <span
                className="hidden lg:inline-flex flex-nowrap gap-x-3"
                style={{ alignItems: 'baseline' }}
              >
                <span className="whitespace-nowrap">that amplify the impact of</span>
                {Roulette}
              </span>
              {/* Compact: roulette drops below as a third line */}
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
