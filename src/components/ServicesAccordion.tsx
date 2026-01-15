import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: 'pitch-decks',
    title: 'Pitch Deck Design',
    description: 'Transform your business ideas into compelling visual narratives that captivate investors and stakeholders. We craft pitch decks that tell your story with clarity, impact, and strategic precision.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop',
  },
  {
    id: 'keynotes',
    title: 'Keynote Presentations',
    description: 'Create unforgettable conference moments with presentations designed for maximum stage impact. From bold visuals to seamless animations, we make your message resonate with audiences of any size.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop',
  },
  {
    id: 'internal-comms',
    title: 'Internal Communications',
    description: 'Elevate your internal presentations to engage and inspire your team. From training materials to company updates, we design content that keeps everyone aligned and motivated.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop',
  },
];

const ServicesAccordion = () => {
  const { t } = useLanguage();
  const [activeService, setActiveService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setActiveService(activeService === id ? null : id);
  };

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-vermillion font-medium text-sm uppercase tracking-wider mb-4 block">
            Our services
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-0 border-t border-border">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="border-b border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleService(service.id)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <h3 className="font-display text-2xl md:text-3xl font-semibold group-hover:text-vermillion transition-colors duration-300">
                  {service.title}
                </h3>
                <motion.div
                  animate={{ rotate: activeService === service.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
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
                    <div className="pb-8 grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 text-vermillion font-medium hover:gap-4 transition-all duration-300"
                        >
                          Learn more <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="aspect-video rounded-2xl overflow-hidden bg-secondary">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesAccordion;
