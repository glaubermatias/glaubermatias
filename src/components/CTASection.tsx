import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-primary">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-golden-orange font-medium text-sm uppercase tracking-wider mb-4 block">
              Get in touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-primary-foreground">
              {t.contact.title}
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed mb-10">
              Ready to transform your presentations and unlock the full potential of visual storytelling? Reach out today, and let's start crafting your success story together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-cream text-primary font-medium rounded-full hover:bg-golden-orange transition-all duration-300 group"
              >
                {t.contact.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:hello@glaubermatias.com"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-primary-foreground/30 text-primary-foreground font-medium rounded-full hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
              >
                Book a call
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
