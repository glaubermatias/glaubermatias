import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import glauberPortrait from '@/assets/glauber-portrait.png';
import gradientBg from '@/assets/gradient-bg.png';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background from uploaded image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${gradientBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* High-definition grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.3,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

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
              style={{ borderRadius: '33%' }}
            />
            {/* Subtle neon glow on hover — thinner */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                borderRadius: '33%',
                boxShadow: '0 0 15px 3px rgba(232, 81, 2, 0.35), 0 0 40px 10px rgba(241, 96, 1, 0.15)',
              }}
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

        {/* Impact phrase — balanced line breaks */}
        <motion.h1
          className="font-display text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] font-semibold leading-[1.45] tracking-normal mb-6 text-white max-w-[16ch] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Designing presentations that amplify your impact
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
