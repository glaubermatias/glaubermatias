import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 lg:py-32 bg-gradient-warm">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-terracotta font-medium text-sm uppercase tracking-wider mb-4 block">
              {t.about.experience}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              {t.about.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.about.description}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient">
                  7+
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient">
                  200+
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Projects Delivered
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient">
                  50+
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Happy Clients
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-secondary border-gradient">
              <div className="w-full h-full bg-gradient-to-br from-terracotta/20 via-golden/10 to-transparent flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-warm-solid flex items-center justify-center">
                    <span className="font-display text-5xl font-bold text-primary-foreground">GM</span>
                  </div>
                  <p className="text-muted-foreground">Your photo here</p>
                </div>
              </div>
            </div>
            
            {/* Floating accent */}
            <motion.div
              className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-gradient-warm-solid opacity-80"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
