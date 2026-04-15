import { useState, useEffect } from 'react';

const RollingLink = ({ href, label, external }: { href: string; label: string; external?: boolean }) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className="group relative inline-block overflow-hidden"
  >
    <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
      {label}
    </span>
    <span
      className="absolute left-0 top-full block transition-transform duration-500 ease-out group-hover:-translate-y-full"
      style={{ textUnderlineOffset: '4px', textDecorationThickness: '1px' }}
    >
      <span className="underline">{label}</span>
    </span>
  </a>
);

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
    <footer
      id="contact"
      data-nav-theme="dark"
      className="relative"
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 0,
      }}
    >
      <div className="relative overflow-hidden pt-32 pb-8 bg-black">
        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="pt-24">
            <div className="grid md:grid-cols-12 gap-12 mb-16">
              {/* Left — Contact */}
              <div className="md:col-span-5">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-white">
                  Let's connect!
                </h2>
                <div className="space-y-3 text-white/90 text-lg">
                  <div>
                    <RollingLink href="mailto:glauber.matias.ismart@gmail.com" label="glauber.matias.ismart@gmail.com" />
                  </div>
                  <div>
                    <RollingLink href="https://linkedin.com/in/glauber-matias" label="LinkedIn" external />
                  </div>
                </div>
              </div>

              {/* Right side — two columns pushed right */}
              <div className="md:col-span-7 flex justify-end">
                <div className="flex gap-16">
                  {/* Quick Links */}
                  <div>
                    <ul className="space-y-2 text-white/70">
                      {quickLinks.map((link) => (
                        <li key={link.href}>
                          <RollingLink href={link.href} label={link.label} />
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
                    <p className="font-sans font-normal text-white/90">
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
