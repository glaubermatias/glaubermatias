import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const languages = [
  { code: 'en' as const, label: 'EN' },
  { code: 'pt' as const, label: 'PT' },
  { code: 'es' as const, label: 'ES' },
];

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full bg-secondary/50 p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className="relative px-3 py-1.5 text-sm font-medium transition-colors"
        >
          {language === lang.code && (
            <motion.div
              layoutId="activeLanguage"
              className="absolute inset-0 rounded-full bg-gradient-warm-solid"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span
            className={`relative z-10 ${
              language === lang.code ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {lang.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
