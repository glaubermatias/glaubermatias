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

  // Scroll over the words → controlled rotation
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaY) < 8) return;
    wheelLockRef.current = true;
    setActiveIndex((p) => {
      if (e.deltaY > 0) return (p + 1) % ROTATING_WORDS.length;
      return (p - 1 + ROTATING_WORDS.length) % ROTATING_WORDS.length;
    });
    startAuto();
    setTimeout(() => {
      wheelLockRef.current = false;
    }, 450);
  };

  const getWordAt = (offset: number) =>
    ROTATING_WORDS[(activeIndex + offset + ROTATING_WORDS.length * 10) % ROTATING_WORDS.length];

  // Line-height of the rotating word in px (matches text-5xl/6xl)
  const LINE_HEIGHT = 1.15;

  return (
    <section
      data-nav-theme="dark"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#1a1a1a' }}
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Left — Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-5 flex justify-center md:justify-start"
          >
            <Link to="/about-me" className="block group">
              <img
                src={glauberPortrait}
                alt="Glauber Matias"
                className="w-64 h-64 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                style={{ borderRadius: '38%' }}
              />
            </Link>
          </motion.div>

          {/* Right — Text */}
          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-sans text-base md:text-lg mb-5"
              style={{ color: '#999999' }}
            >
              Hello there, I'm Glauber
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-white font-semibold leading-[1.15] text-4xl md:text-5xl lg:text-[3.75rem]"
            >
              <span className="block">Designer of visual stories</span>
              <span className="block">that amplify the impact of</span>

              {/* Rolling words */}
              <span
                onWheel={handleWheel}
                className="block relative overflow-hidden mt-1"
                style={{
                  height: `${LINE_HEIGHT}em`,
                  cursor: 'pointer',
                }}
                aria-label="Rotating list — click to view all work"
              >
                <Link to="/work" className="block w-full h-full">
                  <motion.div
                    animate={{ y: `-${activeIndex * LINE_HEIGHT}em` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-0 w-full"
                  >
                    {ROTATING_WORDS.map((word, i) => (
                      <span
                        key={word}
                        className="block transition-opacity duration-500"
                        style={{
                          height: `${LINE_HEIGHT}em`,
                          lineHeight: `${LINE_HEIGHT}em`,
                          color: i === activeIndex ? '#e85102' : 'rgba(255,255,255,0.25)',
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </motion.div>
                </Link>
              </span>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
