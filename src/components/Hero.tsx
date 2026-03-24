import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import glauberPortrait from '@/assets/glauber-portrait.png';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grainy gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, #e85102 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 80% 20%, #f16001 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 50% 80%, #d9c3ab 0%, transparent 60%), ' +
            'radial-gradient(ellipse at 60% 40%, #e85102 0%, transparent 40%), ' +
            'linear-gradient(135deg, #d9c3ab 0%, #f16001 40%, #e85102 70%, #d9c3ab 100%)',
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
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <img
            src={glauberPortrait}
            alt="Glauber Matias"
            className="w-28 h-28 md:w-36 md:h-36 object-cover"
            style={{ borderRadius: '33%' }}
          />
        </motion.div>

        {/* Impact phrase */}
        <motion.h1
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Designer of visual stories that turn your message into impact.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl leading-relaxed text-white/70 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {t.hero.description}
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
