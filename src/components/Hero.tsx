import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import glauberPortrait from '@/assets/glauber-portrait.png';

const WORDS = [
  'presentations',
  'pitch decks',
  'events',
  'internal comms',
  'templates',
  'reports',
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => i + 1);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  // Render an extra copy of the first word at the end so the loop wraps seamlessly
  const items = [...WORDS, WORDS[0]];
  const total = WORDS.length;
  const displayIndex = index % (total + 1);
  const isResetting = displayIndex === 0 && index !== 0;

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
              style={{ lineHeight: 1.2 }}
            >
              Designer of visual stories that amplify the impact of{'\u00A0'}
              <Link
                to="/work"
                className="relative inline-flex cursor-pointer align-baseline"
                style={{
                  height: '1.2em',
                  lineHeight: 1.2,
                  verticalAlign: 'baseline',
                  overflow: 'hidden',
                }}
                aria-live="polite"
              >
                {/* Invisible spacer keeps the inline width matching the active word */}
                <span
                  aria-hidden="true"
                  className="invisible whitespace-nowrap"
                  style={{ lineHeight: 1.2 }}
                >
                  {WORDS[displayIndex % WORDS.length] || WORDS[0]}
                </span>

                {/* Sliding strip of words */}
                <span
                  className="absolute left-0 top-0 flex flex-col"
                  style={{
                    transform: `translateY(-${displayIndex * 1.2}em)`,
                    transition: isResetting
                      ? 'none'
                      : 'transform 700ms cubic-bezier(0.65, 0, 0.35, 1)',
                    willChange: 'transform',
                  }}
                  onTransitionEnd={() => {
                    // When we reach the duplicated first word, snap back to real index 0
                    if (displayIndex === total) {
                      setIndex((i) => i + 1); // moves displayIndex from `total` to 0
                    }
                  }}
                >
                  {items.map((word, i) => (
                    <span
                      key={`${word}-${i}`}
                      className="whitespace-nowrap"
                      style={{
                        color: '#e85102',
                        lineHeight: 1.2,
                        height: '1.2em',
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </Link>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
