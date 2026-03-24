import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [lisbonTime, setLisbonTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Lisbon',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setLisbonTime(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const quickLinks = [
    { href: '#work', label: t.nav.work },
    { href: '#skillset', label: t.nav.skillset },
    { href: '/experience', label: t.nav.experience },
    { href: '#about', label: t.nav.about },
    { href: '#testimonials', label: t.nav.testimonials },
  ];

  return (
    <footer id="contact" className="relative">
      {/* Gradient that fades from white to the brand gradient */}
      <div className="relative overflow-hidden pt-32 pb-8">
        {/* White-to-gradient fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, hsl(0 0% 100%) 0%, transparent 40%)',
            zIndex: 1,
          }}
        />
        {/* Brand gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 20% 80%, #e85102 0%, transparent 50%), ' +
              'radial-gradient(ellipse at 80% 60%, #f16001 0%, transparent 50%), ' +
              'radial-gradient(ellipse at 50% 90%, #d9c3ab 0%, transparent 60%), ' +
              'linear-gradient(135deg, #d9c3ab 0%, #f16001 40%, #e85102 70%, #d9c3ab 100%)',
          }}
        />
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.3] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          {/* Main content - pushed down so it sits on the darker part */}
          <div className="pt-24">
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              {/* Left - Contact */}
              <div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-white">
                  Let's connect!
                </h2>
                <div className="space-y-3">
                  <a
                    href="mailto:glauber.matias.ismart@gmail.com"
                    className="block text-white/90 hover:text-white transition-colors text-lg"
                  >
                    glauber.matias.ismart@gmail.com
                  </a>
                  <a
                    href="https://linkedin.com/in/glauber-matias"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white/90 hover:text-white transition-colors text-lg"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Center - Quick Links */}
              <div>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right - Location & Time */}
              <div className="md:text-right">
                <p className="text-white/90 font-semibold mb-1">
                  Based in Lisbon
                </p>
                <p className="text-white/60 text-sm mb-4">
                  (from Aug/26)
                </p>
                <div className="text-white/90">
                  <p className="text-sm text-white/60 mb-1">Local time</p>
                  <p className="font-mono text-2xl font-medium tracking-wider text-white">
                    {lisbonTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-white/60">
                  © Glauber Matias {currentYear}. {t.footer.rights}
                </p>
                <p className="text-sm text-white/60">Made in Brazil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
