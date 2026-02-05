import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnDarkBg, setIsOnDarkBg] = useState(true);

  useEffect(() => {
    const checkBackground = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Check if nav is over dark or light background
      const navElement = document.querySelector('header nav');
      if (!navElement) return;
      
      const navRect = navElement.getBoundingClientRect();
      const navCenterX = navRect.left + navRect.width / 2;
      const navCenterY = navRect.top + navRect.height / 2;
      
      // Get the element at the center point behind the nav
      // Temporarily hide the nav to get the element behind it
      const nav = navElement as HTMLElement;
      const originalPointerEvents = nav.style.pointerEvents;
      nav.style.pointerEvents = 'none';
      
      const elementBehind = document.elementFromPoint(navCenterX, navCenterY);
      
      nav.style.pointerEvents = originalPointerEvents;
      
      if (elementBehind) {
        // Walk up the DOM tree to find an element with a background color
        let element: Element | null = elementBehind;
        let isOverDark = false;
        
        while (element && element !== document.body) {
          const computedStyle = window.getComputedStyle(element);
          const bgColor = computedStyle.backgroundColor;
          
          // Check if this element has a non-transparent background
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            const rgb = bgColor.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
              const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
              isOverDark = brightness < 128;
              break;
            }
          }
          element = element.parentElement;
        }
        
        setIsOnDarkBg(isOverDark);
      }
    };

    // Run on scroll and resize
    window.addEventListener('scroll', checkBackground);
    window.addEventListener('resize', checkBackground);
    
    // Initial check with a small delay to ensure DOM is ready
    checkBackground();
    const timeoutId = setTimeout(checkBackground, 100);
    
    return () => {
      window.removeEventListener('scroll', checkBackground);
      window.removeEventListener('resize', checkBackground);
      clearTimeout(timeoutId);
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
