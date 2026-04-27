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

const TRACK_REPEAT = 9;
const TRACK_START_LOOP = 4;
const ITEM_HEIGHT_EM = 1.22; // matches headline line-height
const AUTOPLAY_MS = 2100;

const Hero = () => {
  const len = ROTATING_WORDS.length;
  const mod = (n: number) => ((n % len) + len) % len;

  const [trackIndex, setTrackIndex] = useState(TRACK_START_LOOP * len);
  const [isCompact, setIsCompact] = useState(false);
  const [isResettingTrack, setIsResettingTrack] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelLockRef = useRef(false);
  const rouletteRef = useRef<HTMLSpanElement>(null);

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTrackIndex((p) => p + 1);
    }, AUTOPLAY_MS);
  }, []);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isInteracting) startAuto();
    return stopAuto;
  }, [isInteracting, startAuto, stopAuto]);

  // Detect viewport width to switch roulette layout (inline vs stacked-below).
  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Wheel-to-spin only when cursor is over the roulette.
  useEffect(() => {
    const el = rouletteRef.current;
    if (!el) return;

    const markInteracting = () => {
      setIsInteracting(true);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = setTimeout(() => {
        setIsInteracting(false);
      }, 1200);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      markInteracting();
      if (wheelLockRef.current) return;
      if (Math.abs(e.deltaY) < 6) return;
      wheelLockRef.current = true;
      setIsResettingTrack(false);
      setTrackIndex((p) => (e.deltaY > 0 ? p + 1 : p - 1));
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 480);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    };
  }, []);

  const trackWords = Array.from({ length: TRACK_REPEAT * len }, (_, i) => ROTATING_WORDS[mod(i)]);

  // Seamless loop: when we drift toward the ends of the repeated track,
  // jump (without animation) back to the equivalent position near the middle.
  const normalizeTrack = () => {
    if (trackIndex > (TRACK_REPEAT - 2) * len || trackIndex < len) {
      setIsResettingTrack(true);
      setTrackIndex(TRACK_START_LOOP * len + mod(trackIndex));
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setIsResettingTrack(false));
      });
    }
  };

  // The roulette container is exactly ONE line tall (so it doesn't affect
  // vertical centering of the headline block). Adjacent words live outside
  // that box thanks to overflow: visible, and a fade mask hides them softly.
  const Roulette = (
    <span
      ref={rouletteRef}
      className="relative inline-block cursor-pointer align-baseline"
      style={{
        height: `${ITEM_HEIGHT_EM}em`,
        width: isCompact ? '100%' : '8.7em',
        maxWidth: '90vw',
        lineHeight: ITEM_HEIGHT_EM,
        overflow: 'visible',
        overscrollBehavior: 'contain',
        // Soft fade above & below the active line
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, #000 38%, #000 62%, transparent 100%)',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, #000 38%, #000 62%, transparent 100%)',
      }}
      aria-label="Rotating list — click to view all work"
    >
      {/* Expanded visual area extending above & below the 1-line box */}
      <span
        className="pointer-events-none absolute left-0 right-0"
        style={{
          top: `-${ITEM_HEIGHT_EM}em`,
          height: `${3 * ITEM_HEIGHT_EM}em`,
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ y: `-${trackIndex * ITEM_HEIGHT_EM}em` }}
          transition={
            isResettingTrack
              ? { duration: 0 }
              : { duration: 0.82, ease: [0.76, 0, 0.24, 1] }
          }
          onAnimationComplete={normalizeTrack}
          style={{
            willChange: 'transform',
            // Push the track down by one line so that index N sits on the
            // active (middle) row of the 3-line visual window.
            paddingTop: `${ITEM_HEIGHT_EM}em`,
          }}
        >
          {trackWords.map((word, absIdx) => {
            const isActive = absIdx === trackIndex;
            return (
              <div
                key={absIdx}
                className="whitespace-nowrap flex items-center"
                style={{
                  height: `${ITEM_HEIGHT_EM}em`,
                  fontWeight: 600,
                  color: isActive ? '#e85102' : '#2f1106',
                  willChange: 'color',
                  transition: 'color 0.5s ease',
                }}
              >
                {word}
              </div>
            );
          })}
        </motion.div>
      </span>

      {/* Click target overlays the active line */}
      <Link
        to="/work"
        className="absolute inset-0 block"
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
              style={{ lineHeight: ITEM_HEIGHT_EM }}
            >
              <span className="block">Designer of visual stories</span>
              {/* Desktop / wide tablet: roulette is a true continuation of line 2 */}
              <span className="hidden lg:flex items-baseline flex-nowrap gap-x-3">
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
