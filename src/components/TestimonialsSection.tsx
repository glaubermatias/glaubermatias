import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: {
      en: 'Glauber transformed our pitch deck from a basic PowerPoint into a visual masterpiece. We closed our Series A within weeks.',
      pt: 'Glauber transformou nosso pitch deck de um PowerPoint básico em uma obra-prima visual. Fechamos nossa Série A em semanas.',
      es: 'Glauber transformó nuestro pitch deck de un PowerPoint básico en una obra maestra visual. Cerramos nuestra Serie A en semanas.',
    },
    author: 'Sarah Chen',
    role: 'CEO, TechVenture',
  },
  {
    quote: {
      en: 'The attention to detail and strategic thinking Glauber brings to every slide is remarkable. Truly a presentation designer at the top of his craft.',
      pt: 'A atenção aos detalhes e o pensamento estratégico que Glauber traz para cada slide é notável.',
      es: 'La atención al detalle y el pensamiento estratégico que Glauber aporta a cada diapositiva es notable.',
    },
    author: 'Marcus Rodriguez',
    role: 'VP Marketing, GlobalCorp',
  },
  {
    quote: {
      en: 'Working with Glauber was a game-changer for our annual conference. The keynote visuals were absolutely stunning.',
      pt: 'Trabalhar com Glauber foi um divisor de águas para nossa conferência anual. Os visuais do keynote foram absolutamente impressionantes.',
      es: 'Trabajar con Glauber fue un cambio de juego para nuestra conferencia anual. Las visuales del keynote fueron absolutamente impresionantes.',
    },
    author: 'Elena Vasquez',
    role: 'Event Director, Innovation Summit',
  },
];

const TestimonialsSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="testimonials" className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-left mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold">
            {t.testimonials.title}
          </h2>
        </motion.div>

        {/* Testimonials - Elegant stacked layout */}
        <div className="space-y-0 divide-y divide-border">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="py-10 md:py-14 first:pt-0"
            >
              <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-start">
                {/* Quote */}
                <div className="md:col-span-9">
                  <p className="text-xl md:text-2xl lg:text-3xl font-display font-medium leading-snug text-foreground">
                    "{testimonial.quote[language as keyof typeof testimonial.quote]}"
                  </p>
                </div>

                {/* Author */}
                <div className="md:col-span-3 md:text-right">
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
