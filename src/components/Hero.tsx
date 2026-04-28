import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import glauberPortrait from '@/assets/glauber-portrait.png';

const Hero = () => {
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
              className="font-display text-white font-semibold text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[2.75rem]"
              style={{ lineHeight: 1.1 }}
            >
              {/* Wide screens: two separate lines */}
              <span className="hidden sm:block">Designer of visual stories</span>
              <span className="hidden sm:block">that amplify the impact of brands.</span>

              {/* Very narrow screens: collapse into a single flowing sentence */}
              <span className="block sm:hidden">
                Designer of visual stories that amplify the impact of brands.
              </span>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
