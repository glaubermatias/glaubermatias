import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    id: 'pitch-decks',
    title: 'Pitch Deck Design',
    description: 'Transform your business ideas into compelling visual narratives that captivate investors and stakeholders. We craft pitch decks that tell your story with clarity, impact, and strategic precision.',
  },
  {
    id: 'keynotes',
    title: 'Keynote Presentations',
    description: 'Create unforgettable conference moments with presentations designed for maximum stage impact. From bold visuals to seamless animations, we make your message resonate with audiences of any size.',
  },
  {
    id: 'internal-comms',
    title: 'Internal Communications',
    description: 'Elevate your internal presentations to engage and inspire your team. From training materials to company updates, we design content that keeps everyone aligned and motivated.',
  },
  {
    id: 'templates',
    title: 'Template Systems',
    description: 'Build scalable presentation systems that maintain brand consistency across your organization. Custom templates that empower your team to create professional slides independently.',
  },
];

const ServicesSection = () => {
  const { t } = useLanguage();
  const [activeService, setActiveService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setActiveService(activeService === id ? null : id);
  };

  return (
    <section id="services" className="py-16 lg:py-20">
      <div className="container mx-auto px-6">
        {/* Services Container with background */}
        <div className="services-bg rounded-3xl p-8 md:p-12">
          {/* Header */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
              {t.services.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t.services.subtitle}
            </p>
          </motion.div>

          {/* Services List */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-background rounded-2xl border border-border overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full p-6 flex items-center justify-between text-left group"
                >
                  <h3 className="font-display text-xl md:text-2xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: activeService === service.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 ml-4"
                  >
                    <ChevronDown className="w-6 h-6 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeService === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
                        >
                          Learn more <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
