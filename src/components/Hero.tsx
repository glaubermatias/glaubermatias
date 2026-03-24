import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import glauberPortrait from '@/assets/glauber-portrait.png';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grainy gradient background — stronger orange */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, #e85102 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 80% 20%, #f16001 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 50% 80%, #d9c3ab 0%, transparent 60%), ' +
            'radial-gradient(ellipse at 60% 40%, #e85102 0%, transparent 40%), ' +
            'radial-gradient(ellipse at 30% 30%, #e85102 0%, transparent 35%), ' +
            'radial-gradient(ellipse at 70% 70%, #f16001 0%, transparent 45%), ' +
            'linear-gradient(135deg, #d9c3ab 0%, #e85102 30%, #f16001 50%, #e85102 70%, #d9c3ab 100%)',
        }}
      />
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        {/* Photo — links to About, with elegant hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <Link
            to="/about-me"
            className="block relative group"
          >
            <img
              src={glauberPortrait}
              alt="Glauber Matias"
              className="w-28 h-28 md:w-36 md:h-36 object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
              style={{ borderRadius: '33%' }}
            />
            {/* Orange neon glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                borderRadius: '33%',
                boxShadow: '0 0 25px 8px rgba(232, 81, 2, 0.45), 0 0 60px 20px rgba(241, 96, 1, 0.2)',
              }}
            />
          </Link>
        </motion.div>

        {/* "I'm Glauber" — small intro like reference */}
        <motion.p
          className="font-display text-xl md:text-2xl text-white/90 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          I'm Glauber
        </motion.p>

        {/* Impact phrase — large display font like reference */}
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] mb-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Designing impactful presentations for global leaders
        </motion.h1>

        {/* Subtitle — smaller body text */}
        <motion.p
          className="text-base sm:text-lg md:text-xl leading-relaxed text-white/70 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          I craft visual stories that make complex ideas simple and memorable
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
