import { useLanguage } from '@/contexts/LanguageContext';
import { Linkedin, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  ];

  const footerLinks = [
    { href: '#work', label: 'Work' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <a href="#" className="font-display text-3xl font-semibold block mb-4">
              GM
            </a>
            <p className="text-primary-foreground/70 max-w-xs">
              Crafting world-class presentations that amplify your message and drive results.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/70">
              © {currentYear} Glauber Matias. {t.footer.rights}
            </p>
            <p className="text-sm text-primary-foreground/70">
              Made with passion for presentations
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
