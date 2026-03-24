import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'hero' | 'dark' | 'light'>('hero');
  const navRef = useRef<HTMLElement>(null!);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    let rafId = 0;

    const detectTheme = (): 'hero' | 'dark' | 'light' => {
      const navEl = navRef.current;
      if (!navEl) return 'light';
      const rect = navEl.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const elements = document.elementsFromPoint(x, y) as HTMLElement[];
      for (const el of elements) {
        if (!el) continue;
        if (el === navEl || navEl.contains(el)) continue;
        // Check if over hero section specifically
        const section = el.closest('section[data-nav-theme]');
        if (section) {
          const theme = section.getAttribute('data-nav-theme');
          // If it's the hero (first section with dark theme on homepage), use transparent
          if (theme === 'dark' && section.classList.contains('min-h-screen')) {
            return 'hero';
          }
          if (theme === 'dark') return 'dark';
        }
      }
      return 'light';
    };

    const update = () => {
      const next = detectTheme();
      setNavTheme((prev) => (prev !== next ? next : prev));
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

  const navLinks = isHomePage
    ? [
        { href: '#work', label: 'Work' },
        { href: '/experience', label: 'Resume' },
        { href: '/about-me', label: 'About' },
        { href: '#contact', label: 'Contact' },
      ]
    : [
        { href: '/work', label: 'Work' },
        { href: '/experience', label: 'Resume' },
        { href: '/about-me', label: 'About' },
        { href: '/#contact', label: 'Contact' },
      ];

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      if (href.startsWith('#')) {
        const id = href.slice(1);
        if (!id) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      if (href.startsWith('/#')) {
        const sectionId = href.slice(2);
        if (isHomePage) {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/');
          setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
          }, 350);
        }
        return;
      }

      navigate(href);
    },
    [isHomePage, navigate],
  );

  const logoHref = isHomePage ? '#' : '/';

  // Hero = fully transparent, dark sections = dark glass, light = light glass
  const navClasses =
    navTheme === 'hero'
      ? 'bg-transparent border-transparent'
      : navTheme === 'dark'
      ? 'glass-nav-dark shadow-lg'
      : 'glass-nav shadow-lg';

  const isLightText = navTheme === 'hero' || navTheme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="container mx-auto px-6">
        <nav
          ref={navRef}
          className={`w-full transition-all duration-500 rounded-[2rem] px-6 py-3 ${navClasses}`}
        >
          <div className="flex items-center justify-between">
            <a
              href={logoHref}
              onClick={(e) => handleLinkClick(e, logoHref)}
              className={`font-display text-xl font-medium transition-colors duration-300 ${
                isLightText ? 'text-primary-foreground' : 'text-primary'
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
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-sm font-normal transition-colors relative group ${
                    isLightText
                      ? 'text-primary-foreground/80 hover:text-primary-foreground'
                      : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 transition-colors duration-300 ${
                isLightText ? 'text-primary-foreground' : 'text-foreground'
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
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`text-lg font-normal transition-colors ${
                        isLightText
                          ? 'text-primary-foreground/80 hover:text-primary-foreground'
                          : 'text-foreground/80 hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
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
