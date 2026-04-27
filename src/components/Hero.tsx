import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import glauberPortrait from '@/assets/glauber-portrait.png';

const ROTATING_WORDS = [
  'pitch decks',
  'presentations',
  'events',
  'internal comms',
  'keynotes',
];

/**
 * Continuous-translate roulette
 * ─────────────────────────────
 * We render the words list 3× in a column. The track translates upward at a
 * constant velocity (px/sec). Whenever the offset passes the height of one
 * full set, we wrap the offset back by exactly one set length — instantly,
 * and only at a moment that is visually identical to the new position.
 * This produces a true infinite loop with no visible reset.
 *
 * The user's wheel input is added to the same offset, so manual scrolling
 * and auto-play share one source of truth (no jumps, no fights).
 */

const AUTO_VELOCITY = 34; // px/sec — calm, premium feel
const WHEEL_GAIN = 0.55; // how much wheel deltaY contributes to the offset

const Hero = () => {
  const [isCompact, setIsCompact] = useState(false);

  const rouletteRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setHeightRef = useRef(0); // height in px of ONE copy of the words list
  const offsetRef = useRef(0); // current translateY (positive = scrolled up)
  const wheelHoverRef = useRef(false);

  const y = useMotionValue(0);

  // Detect viewport for stacked-vs-inline layout.
  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Measure one set's height (1/3 of the full track) once mounted & on resize.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setHeightRef.current = track.scrollHeight / 3;
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  // Continuous animation loop — adds AUTO_VELOCITY each frame, wraps cleanly.
  useAnimationFrame((_, delta) => {
    const setH = setHeightRef.current;
    if (!setH) return;
    offsetRef.current += (AUTO_VELOCITY * delta) / 1000;
    // Wrap into [setH, 2*setH) — keeps us in the middle copy so we always have
    // a copy above and below for seamless continuity in either direction.
    while (offsetRef.current >= 2 * setH) offsetRef.current -= setH;
    while (offsetRef.current < setH) offsetRef.current += setH;
    y.set(-offsetRef.current);
  });

  // Initialize offset to the middle copy so wrap math is always valid.
  useEffect(() => {
    const init = () => {
      const setH = setHeightRef.current;
      if (!setH) {
        requestAnimationFrame(init);
        return;
      }
      offsetRef.current = setH; // start of middle copy
      y.set(-offsetRef.current);
    };
    init();
  }, [y]);

  // Localized wheel control — only consumes scroll when over the roulette.
  useEffect(() => {
    const el = rouletteRef.current;
    if (!el) return;

    const onEnter = () => {
      wheelHoverRef.current = true;
    };
    const onLeave = () => {
      wheelHoverRef.current = false;
    };
    const onWheel = (e: WheelEvent) => {
      if (!wheelHoverRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      offsetRef.current += e.deltaY * WHEEL_GAIN;
      const setH = setHeightRef.current;
      if (setH) {
        while (offsetRef.current >= 2 * setH) offsetRef.current -= setH;
        while (offsetRef.current < setH) offsetRef.current += setH;
      }
      y.set(-offsetRef.current);
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('wheel', onWheel);
    };
  }, [y]);

  const ITEM_LINE_HEIGHT = 1.18; // em
  const VISIBLE_ROWS = 3; // active row + neighbour above + neighbour below
  const tripled = [...ROTATING_WORDS, ...ROTATING_WORDS, ...ROTATING_WORDS];

  const Roulette = (
    <div
      ref={rouletteRef}
      className="relative inline-block align-baseline cursor-ns-resize select-none"
      style={{
        height: `${VISIBLE_ROWS * ITEM_LINE_HEIGHT}em`,
        width: isCompact ? '100%' : '8.4em',
        maxWidth: '92vw',
        lineHeight: ITEM_LINE_HEIGHT,
        // Cylinder fade — gradient mask top & bottom
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, #000 32%, #000 68%, transparent 100%)',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, #000 32%, #000 68%, transparent 100%)',
        overscrollBehavior: 'contain',
        // Visually align the active (centre) word's baseline with the rest of
        // the headline. The centre row sits at 1× line-height from the top of
        // the mask, so we lift the whole roulette by that same amount.
        transform: `translateY(${ITEM_LINE_HEIGHT}em)`,
      }}
      aria-label="Rotating list of formats — scroll over to spin"
    >
      <motion.div
        ref={trackRef}
        style={{ y, willChange: 'transform' }}
      >
        {tripled.map((word, i) => (
          <Link
            to="/work"
            key={i}
            className="block whitespace-nowrap font-semibold transition-colors"
            style={{
              height: `${ITEM_LINE_HEIGHT}em`,
              lineHeight: ITEM_LINE_HEIGHT,
              color: '#e85102',
            }}
          >
            {word}
          </Link>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section
      data-nav-theme="dark"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #000000 0%, #0a0a0a 100%)',
      }}
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Centered cluster: portrait + text block share the same vertical axis */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10">
          {/* Left — Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex-shrink-0"
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

          {/* Right — Text cluster (greeting + headline together) */}
          <div className="text-center md:text-left">
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
              className="font-display text-white font-semibold text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.75rem]"
              style={{ lineHeight: 1.22 }}
            >
              <span className="block">Designer of visual stories</span>
              {/* Desktop: roulette is a true continuation of line 2 (baseline aligned) */}
              <span className="hidden lg:inline-flex items-baseline flex-nowrap gap-x-3">
                <span className="whitespace-nowrap">that amplify the impact of</span>
                {Roulette}
              </span>
              {/* Compact: line 2 alone, roulette drops below as line 3 */}
              <span className="block lg:hidden">that amplify the impact of</span>
              <span className="block lg:hidden mt-1">{Roulette}</span>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
