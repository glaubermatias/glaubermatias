import { useState, useEffect } from 'react';

const Footer = () => {
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
    { href: '#work', label: 'Work' },
    { href: '/experience', label: 'Resume' },
    { href: '/about-me', label: 'About' },
  ];

  return (
    <footer id="contact" data-nav-theme="dark" className="relative">
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
        {/* Brand gradient — high saturation */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 15% 80%, #e85102 0%, transparent 45%), ' +
              'radial-gradient(ellipse at 85% 55%, #f16001 0%, transparent 45%), ' +
              'radial-gradient(ellipse at 50% 90%, #d9c3ab 0%, transparent 55%), ' +
              'radial-gradient(ellipse at 35% 70%, #e85102 0%, transparent 30%), ' +
              'radial-gradient(ellipse at 65% 65%, #f16001 0%, transparent 30%), ' +
              'linear-gradient(135deg, #d9c3ab 0%, #e85102 25%, #f16001 45%, #e85102 65%, #f16001 80%, #d9c3ab 100%)',
          }}
        />
        {/* Fine grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.18,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="pt-24">
            <div className="grid md:grid-cols-12 gap-12 mb-16">
              {/* Left — Contact */}
              <div className="md:col-span-5">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-white">
                  Let's connect!
                </h2>
                <div className="space-y-3">
                  <a
                    href="mailto:glauber.matias.ismart@gmail.com"
                    className="block text-white/90 transition-all duration-300 text-lg w-fit hover:text-white hover:translate-x-1"
                  >
                    glauber.matias.ismart@gmail.com
                  </a>
                  <a
                    href="https://linkedin.com/in/glauber-matias"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white/90 transition-all duration-300 text-lg w-fit hover:text-white hover:translate-x-1"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Right side — two columns pushed right */}
              <div className="md:col-span-7 flex justify-end">
                <div className="flex gap-16">
                  {/* Quick Links */}
                  <div>
                    <ul className="space-y-2">
                      {quickLinks.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="text-white/70 transition-all duration-300 hover:text-white hover:translate-x-1 inline-block"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Location & Time */}
                  <div className="text-left">
                    <p className="text-white/90 font-sans font-normal mb-1">
                      Based in Lisbon
                    </p>
                    <p className="text-white/60 font-sans font-normal mb-4">
                      (from Aug/26)
                    </p>
                    <p className="font-sans font-normal text-white/90 tracking-wider">
                      {lisbonTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-white/60">
                  © Glauber Matias {currentYear}. All rights reserved.
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
