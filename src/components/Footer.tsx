import { useLanguage } from '@/contexts/LanguageContext';
import { Linkedin } from 'lucide-react';
import glauberPhoto from '@/assets/glauber-photo.jpg';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#projects', label: t.nav.projects },
    { href: '#skillset', label: t.nav.skillset },
    { href: '#experience', label: t.nav.experience },
    { href: '#about', label: t.nav.about },
    { href: '#testimonials', label: t.nav.testimonials },
  ];

  return (
    <footer id="contact" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left Side - Contact */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-8">
              {t.nav.contact}
            </h2>
            
            <div className="flex items-end gap-6">
              {/* Photo - Square with very rounded corners */}
              <div className="shrink-0">
                <img
                  src={glauberPhoto}
                  alt="Glauber Matias"
                  className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-[2rem]"
                />
              </div>
              
              {/* Email - Aligned with bottom of photo */}
              <div className="pb-2">
                <a
                  href="mailto:hello@glaubermatias.com"
                  className="text-lg md:text-xl font-medium text-foreground hover:text-primary transition-colors"
                >
                  hello@glaubermatias.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Quick Links and Connect */}
          <div className="flex gap-16 md:justify-end">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
              <a
                href="https://linkedin.com/in/glaubermatias"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Glauber Matias. {t.footer.rights}
            </p>
            <p className="text-sm text-muted-foreground">
              Made in Brazil
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
