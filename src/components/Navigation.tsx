import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type NavItem = { href: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { href: '/work', label: 'Work' },
  { href: '/cv', label: 'CV' },
  { href: '/about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);

  // Close the dropdown on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        mobileMenuRef.current?.contains(target) ||
        menuToggleRef.current?.contains(target)
      )
        return;
      setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      if (href === '#contact') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        return;
      }
      if (href.startsWith('#')) {
        const id = href.slice(1);
        if (!id) window.scrollTo({ top: 0, behavior: 'smooth' });
        else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      if (href === location.pathname) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      navigate(href);
    },
    [navigate, location.pathname],
  );

  const isActive = (href: string) =>
    href.startsWith('/') && location.pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <nav className="site-shell pt-4 md:pt-5">
        <div className="flex items-start justify-between gap-3 pointer-events-none">
          {/* Left cluster — GM circle + items pill */}
          <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">

            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              aria-label="Home — Glauber Matias"
              className="nav-glass flex h-14 w-14 items-center justify-center rounded-full font-display text-base font-medium text-black"
            >
              GM
            </a>

            {/* Desktop items pill */}
            <div className="nav-glass hidden md:flex h-14 items-center gap-1 rounded-full px-1.5 py-1.5">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    aria-current={active ? 'page' : undefined}
                    className={`my-1 flex items-center rounded-full px-4 py-1.5 text-base text-black transition-colors duration-200 ${
                      active ? 'bg-black/10' : 'hover:bg-black/5'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right — hamburger */}
          <div className="relative pointer-events-auto">
            <button
              ref={menuToggleRef}
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="floating-nav-menu"
              className="nav-glass flex h-14 w-14 items-center justify-center rounded-full text-black"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  ref={mobileMenuRef}
                  id="floating-nav-menu"
                  role="dialog"
                  aria-label="Site navigation"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute right-0 mt-2 w-56 origin-top-right overflow-hidden rounded-3xl bg-white p-2 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
                >
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={`block rounded-2xl px-4 py-3 text-sm text-black transition-colors ${
                        isActive(item.href) ? 'bg-black/10' : 'hover:bg-black/5'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
