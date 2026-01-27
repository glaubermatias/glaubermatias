import { useLanguage } from '@/contexts/LanguageContext';
const Footer = () => {
  const {
    t
  } = useLanguage();
  const currentYear = new Date().getFullYear();
  const quickLinks = [{
    href: '#work',
    label: t.nav.work
  }, {
    href: '#skillset',
    label: t.nav.skillset
  }, {
    href: '#experience',
    label: t.nav.experience
  }, {
    href: '#about',
    label: t.nav.about
  }, {
    href: '#testimonials',
    label: t.nav.testimonials
  }];
  return <footer id="contact" className="relative">
      {/* Dark blue background with rounded top corners */}
      <div className="bg-primary rounded-t-[2.5rem] pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left Side - Contact */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-primary-foreground">
                Let's connect!
              </h2>
              
              <div className="space-y-4">
                {/* Email */}
                <a href="mailto:glauber.matias.ismart@gmail.com" className="flex items-center gap-3 text-primary-foreground hover:text-accent transition-colors group">
                  
                  <span className="text-lg">glauber.matias.ismart@gmail.com</span>
                </a>
                
                {/* LinkedIn */}
                <a href="https://linkedin.com/in/glauber-matias" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary-foreground hover:text-accent transition-colors group">
                  
                  <span className="text-lg">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right Side - Quick Links */}
            <div className="md:text-right">
              <ul className="space-y-2">
                {quickLinks.map(link => <li key={link.href}>
                    <a href={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>)}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-primary-foreground/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-primary-foreground/70">
                © {currentYear} Glauber Matias. {t.footer.rights}
              </p>
              <p className="text-sm text-primary-foreground/70">
                Made in Brazil
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;