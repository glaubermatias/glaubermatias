import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#work', label: t.nav.work, isContact: false },
    { href: '#services', label: t.nav.services, isContact: false },
    { href: '#cv', label: 'CV', isContact: false },
    { href: '#about', label: t.nav.about, isContact: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="container mx-auto">
        <nav
          className={`w-full transition-all duration-500 rounded-full px-6 py-3 ${
            isScrolled
              ? 'glass-nav shadow-lg'
              : 'glass-nav'
          }`}
        >
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="font-display text-xl font-medium text-primary"
            >
              GM
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              
              {/* Get in touch - highlighted button */}
              <a
                href="#contact"
                className="text-sm font-medium px-5 py-2 rounded-full bg-primary text-primary-foreground hover:bg-dark-accent transition-colors"
              >
                Get in touch
              </a>
              
              <LanguageToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-col gap-4 py-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium px-5 py-2 rounded-full bg-primary text-primary-foreground w-fit"
                  >
                    Get in touch
                  </a>
                  <div className="pt-4">
                    <LanguageToggle />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
