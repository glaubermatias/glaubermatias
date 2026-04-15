import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import glauberPortrait from '@/assets/glauber-portrait.png';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Video background at 60% opacity, looped */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.6 }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        {/* Photo — links to About */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <Link
            to="/about-me"
            className="block relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={glauberPortrait}
              alt="Glauber Matias"
              className="w-28 h-28 md:w-36 md:h-36 object-cover transition-all duration-700 ease-out group-hover:scale-[1.15] group-hover:brightness-110"
              style={{ borderRadius: '38%' }}
            />
          </Link>
        </motion.div>

        {/* "I'm Glauber" */}
        <motion.p
          className="font-display text-xl md:text-2xl text-white/90 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          I'm Glauber
        </motion.p>

        {/* Impact phrase — forced line breaks after "Designing" and "that" */}
        <motion.h1
          className="font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] font-semibold leading-[1.8] tracking-normal mb-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Designing<br />
          presentations that<br />
          amplify your impact
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl leading-relaxed text-white/70 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          My superpower is to make complex ideas simple and memorable
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
