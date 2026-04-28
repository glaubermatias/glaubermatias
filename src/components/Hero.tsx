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
const ROW_EM = LINE_HEIGHT; // height of one word row, in em
const ROWS_ABOVE = 1;
const ROWS_BELOW = 2;
const WINDOW_ROWS = ROWS_ABOVE + 1 + ROWS_BELOW; // 4 visible rows
const AUTOPLAY_MS = 2100;

// Triplicate-style infinite track. We render LOOPS copies and silently jump
// the index back to the middle whenever it strays — never a "rewind".
const LOOPS = 80;
const LEN = ROTATING_WORDS.length;
const TRACK = Array.from({ length: LOOPS * LEN }, (_, i) => ROTATING_WORDS[i % LEN]);
const START_INDEX = Math.floor(LOOPS / 2) * LEN;

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

  // Seamless infinite loop — when we drift toward either edge of the track,
  // jump back to the middle on the equivalent word, with the animation OFF.
  useEffect(() => {
    const safeMin = LEN * 4;
    const safeMax = TRACK.length - LEN * 5;
    if (index < safeMin || index > safeMax) {
      const normalized = START_INDEX + (((index % LEN) + LEN) % LEN);
      setAnimate(false);
      setIndex(normalized);
      // Re-enable animation on the NEXT frame so the jump is invisible.
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    }
  }, [index]);

  // Wheel — non-passive listener so we can preventDefault and stop the page
  // from scrolling while the cursor is over the roulette.
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

  // The roulette: a fixed-height window showing 4 rows. Rendered as a block
  // so we can position it absolutely from the anchor span. NO overflow:hidden
  // on the parent span (would clip it) — clipping happens here.
  const Roulette = (
    <span
      ref={rouletteRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="block cursor-pointer select-none"
      style={{
        height: `${WINDOW_ROWS * ROW_EM}em`,
        lineHeight: LINE_HEIGHT,
        overflow: 'hidden',
        overscrollBehavior: 'contain',
        // Lift the window so the ACTIVE row (row index = ROWS_ABOVE) sits on
        // the same baseline as the surrounding sentence text.
        transform: `translateY(-${ROWS_ABOVE * ROW_EM}em)`,
      }}
      aria-label="Rotating list — hover to scroll, click to view all work"
    >
      <motion.span
        className="block"
        animate={{ y: `-${index * ROW_EM}em` }}
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

          {/* Text block — its own height drives centering vs the portrait.
              The roulette is anchored to the END of "the impact of" and has
              ZERO weight in the layout (position: absolute on a relative span). */}
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

              {/* Desktop: the anchor span wraps "the impact of" and hosts the
                  absolutely-positioned roulette at left:100%, bottom:0. */}
              <span className="hidden lg:block">
                that amplify{' '}
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  the impact of
                  <span
                    style={{
                      position: 'absolute',
                      left: '100%',
                      bottom: 0,
                      paddingLeft: '0.5rem',
                      // Width must be explicit so absolute children render;
                      // we cap it generously to fit the longest word.
                      width: '12em',
                      pointerEvents: 'auto',
                    }}
                  >
                    {Roulette}
                  </span>
                </span>
              </span>

              {/* Compact stacked layout */}
              <span className="block lg:hidden">that amplify the impact of</span>
              <span className="block lg:hidden mt-2 text-left md:text-center">
                <span style={{ position: 'relative', display: 'inline-block', width: '12em' }}>
                  {Roulette}
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
