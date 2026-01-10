import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-terracotta/5 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-golden/5 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            {t.contact.title}
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            {t.contact.subtitle}
          </p>

          <motion.a
            href="mailto:hello@glaubermatias.com"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-warm-solid text-primary-foreground font-semibold text-lg rounded-full hover:shadow-xl hover:shadow-terracotta/25 transition-all duration-500 hover:-translate-y-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-5 h-5" />
            {t.contact.cta}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>

          <p className="mt-8 text-muted-foreground text-sm">
            hello@glaubermatias.com
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
