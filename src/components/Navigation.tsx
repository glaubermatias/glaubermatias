import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnDarkBg, setIsOnDarkBg] = useState(true);
  const navRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    let rafId = 0;

    const getIsOverDarkTheme = () => {
      const navEl = navRef.current;
      if (!navEl) return true;

      const rect = navEl.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const elements = document.elementsFromPoint(x, y) as HTMLElement[];

      for (const el of elements) {
        if (!el) continue;
        if (el === navEl || navEl.contains(el)) continue;

        // We explicitly mark dark sections to avoid false-positives from utility classes.
        if (el.closest('[data-nav-theme="dark"]')) return true;
      }

      return false;
    };

    const update = () => {
      const nextScrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));

      const nextIsDark = getIsOverDarkTheme();
      setIsOnDarkBg((prev) => (prev !== nextIsDark ? nextIsDark : prev));
    };

    const onChange = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange);

    // Initial checks (after layout)
    onChange();
    const t1 = window.setTimeout(onChange, 80);
    const t2 = window.setTimeout(onChange, 350);

    return () => {
      window.removeEventListener('scroll', onChange);
      window.removeEventListener('resize', onChange);
      if (rafId) window.cancelAnimationFrame(rafId);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const navLinks = [
    { href: '#work', label: t.nav.work },
    { href: '#skillset', label: t.nav.skillset },
    { href: '#experience', label: t.nav.experience },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="container mx-auto px-6">
        <nav
          ref={navRef}
          className={`w-full transition-all duration-500 rounded-[2rem] px-6 py-3 ${
            isOnDarkBg
              ? 'glass-nav-dark shadow-lg'
              : 'glass-nav shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between">
            <a
              href="#"
              className={`font-display text-xl font-medium transition-colors duration-300 ${
                isOnDarkBg ? 'text-primary-foreground' : 'text-primary'
              }`}
            >
              GM
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-normal transition-colors relative group ${
                    isOnDarkBg 
                      ? 'text-primary-foreground/80 hover:text-primary-foreground' 
                      : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              
              <LanguageToggle isOnDarkBg={isOnDarkBg} />
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 transition-colors duration-300 ${
                isOnDarkBg ? 'text-primary-foreground' : 'text-foreground'
              }`}
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
                      className={`text-lg font-normal transition-colors ${
                        isOnDarkBg 
                          ? 'text-primary-foreground/80 hover:text-primary-foreground' 
                          : 'text-foreground/80 hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-4">
                    <LanguageToggle isOnDarkBg={isOnDarkBg} />
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
