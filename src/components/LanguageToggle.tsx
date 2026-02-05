import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

interface LanguageToggleProps {
  isOnDarkBg?: boolean;
}

const languages = [
  { code: 'en' as const, label: 'EN' },
  { code: 'pt' as const, label: 'PT' },
  { code: 'es' as const, label: 'ES' },
];

const LanguageToggle = ({ isOnDarkBg = false }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center gap-1 rounded-full p-1 ${
      isOnDarkBg ? 'bg-white/10' : 'bg-secondary/50'
    }`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className="relative px-3 py-1.5 text-sm font-medium transition-colors"
        >
          {language === lang.code && (
            <motion.div
              layoutId="activeLanguage"
              className={`absolute inset-0 rounded-full ${
                isOnDarkBg ? 'bg-white' : 'bg-primary'
              }`}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span
            className={`relative z-10 ${
              language === lang.code 
                ? isOnDarkBg ? 'text-primary' : 'text-primary-foreground'
                : isOnDarkBg ? 'text-primary-foreground/70 hover:text-primary-foreground' : 'text-foreground hover:text-primary'
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
