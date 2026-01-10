import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Presentation, Users, Lightbulb, TrendingUp } from 'lucide-react';

const services = [
  {
    icon: Presentation,
    titleEn: 'Pitch Deck Design',
    titlePt: 'Design de Pitch Decks',
    titleEs: 'Diseño de Pitch Decks',
    descEn: 'Compelling investor presentations that tell your story and secure funding.',
    descPt: 'Apresentações para investidores que contam sua história e garantem financiamento.',
    descEs: 'Presentaciones para inversores que cuentan tu historia y aseguran financiamiento.',
  },
  {
    icon: Users,
    titleEn: 'Corporate Communications',
    titlePt: 'Comunicação Corporativa',
    titleEs: 'Comunicación Corporativa',
    descEn: 'Internal presentations that align teams and drive organizational change.',
    descPt: 'Apresentações internas que alinham equipes e impulsionam mudanças organizacionais.',
    descEs: 'Presentaciones internas que alinean equipos e impulsan cambios organizacionales.',
  },
  {
    icon: Lightbulb,
    titleEn: 'Keynote & Conference',
    titlePt: 'Keynotes & Conferências',
    titleEs: 'Keynotes & Conferencias',
    descEn: 'Stage-ready presentations that captivate large audiences.',
    descPt: 'Apresentações para palco que cativam grandes audiências.',
    descEs: 'Presentaciones para escenario que cautivan grandes audiencias.',
  },
  {
    icon: TrendingUp,
    titleEn: 'Sales Enablement',
    titlePt: 'Habilitação de Vendas',
    titleEs: 'Habilitación de Ventas',
    descEn: 'Sales decks and proposals that convert prospects into clients.',
    descPt: 'Decks de vendas e propostas que convertem prospects em clientes.',
    descEs: 'Decks de ventas y propuestas que convierten prospectos en clientes.',
  },
];

const ServicesSection = () => {
  const { t, language } = useLanguage();

  const getTitle = (service: typeof services[0]) => {
    if (language === 'pt') return service.titlePt;
    if (language === 'es') return service.titleEs;
    return service.titleEn;
  };

  const getDesc = (service: typeof services[0]) => {
    if (language === 'pt') return service.descPt;
    if (language === 'es') return service.descEs;
    return service.descEn;
  };

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.titleEn}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-3xl bg-card border border-border card-hover"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-warm flex items-center justify-center shrink-0 group-hover:bg-gradient-warm-solid transition-all duration-500">
                  <service.icon className="w-6 h-6 text-terracotta group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-gradient transition-all duration-300">
                    {getTitle(service)}
                  </h3>
                  <p className="text-muted-foreground">
                    {getDesc(service)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
