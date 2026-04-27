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

const Hero = () => {
  const [trackIndex, setTrackIndex] = useState(TRACK_START_LOOP * ROTATING_WORDS.length);
  const [isCompact, setIsCompact] = useState(false);
  const [isResettingTrack, setIsResettingTrack] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wheelLockRef = useRef(false);
  const rouletteRef = useRef<HTMLSpanElement>(null);
  const len = ROTATING_WORDS.length;
  const mod = (n: number) => ((n % len) + len) % len;

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTrackIndex((p) => p + 1);
    }, 2100);
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAuto]);

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
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLockRef.current) return;
      if (Math.abs(e.deltaY) < 6) return;
      wheelLockRef.current = true;
      setIsResettingTrack(false);
      setTrackIndex((p) => (e.deltaY > 0 ? p + 1 : p - 1));
      startAuto();
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 520);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [startAuto]);

  const ITEM_HEIGHT_EM = 1.08;
  const visibleRows = isCompact ? 2 : 3;
  const trackWords = Array.from({ length: TRACK_REPEAT * len }, (_, i) => ROTATING_WORDS[mod(i)]);
  const normalizeTrack = () => {
    if (trackIndex > (TRACK_REPEAT - 2) * len || trackIndex < len) {
      setIsResettingTrack(true);
      setTrackIndex(TRACK_START_LOOP * len + mod(trackIndex));
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setIsResettingTrack(false));
      });
    }
  };

  const Roulette = (
    <span
      ref={rouletteRef}
      className="relative inline-block cursor-pointer overflow-hidden align-baseline"
      style={{
        height: `${visibleRows * ITEM_HEIGHT_EM}em`,
        width: isCompact ? '100%' : '8.7em',
        maxWidth: '90vw',
        lineHeight: ITEM_HEIGHT_EM,
      }}
      aria-label="Rotating list — click to view all work"
    >
      <Link to="/work" className="block w-full h-full">
        <motion.div
          animate={{ y: `-${trackIndex * ITEM_HEIGHT_EM}em` }}
          transition={
            isResettingTrack
              ? { duration: 0 }
              : { duration: 0.82, ease: [0.76, 0, 0.24, 1] }
          }
          onAnimationComplete={normalizeTrack}
          style={{ willChange: 'transform' }}
        >
          {trackWords.map((word, absIdx) => {
            const isActive = mod(absIdx) === mod(trackIndex);
            return (
              <motion.div
                key={absIdx}
                className="whitespace-nowrap flex items-center"
                animate={{
                  opacity: isActive ? 1 : 0.55,
                  color: isActive ? '#e85102' : '#2f1106',
                }}
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  height: `${ITEM_HEIGHT_EM}em`,
                  fontWeight: 600,
                  willChange: 'opacity, color',
                }}
              >
                <motion.span
                  layout={false}
                  initial={false}
                  animate={{ y: 0 }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              </motion.div>
            );
          })}
        </motion.div>
      </Link>
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
              className="font-display text-white font-semibold text-[1.6rem] sm:text-[1.85rem] md:text-[2.1rem] lg:text-[2.5rem] xl:text-[2.85rem]"
              style={{ lineHeight: 1.25 }}
            >
              <span className="block">Designer of visual stories</span>
              {/* Desktop / tablet (md+): roulette inline at end of line 2 */}
              <span className="hidden md:flex items-baseline flex-nowrap gap-x-3">
                <span className="whitespace-nowrap">that amplify the impact of</span>
                {Roulette}
              </span>
              {/* Mobile (<md): line 2 normal; roulette stacked below as line 3 (no top word) */}
              <span className="block md:hidden">that amplify the impact of</span>
              <span className="block md:hidden mt-2">{Roulette}</span>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
