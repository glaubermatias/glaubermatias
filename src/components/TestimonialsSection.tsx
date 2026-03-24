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
    <section id="testimonials" className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold">
            {t.testimonials.title}
          </h2>
        </motion.div>

        {/* Testimonials — editorial stacked */}
        <div className="space-y-16 md:space-y-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
            >
              {/* Large quote */}
              <blockquote className="max-w-3xl">
                <p className="font-display text-2xl md:text-3xl lg:text-[2.5rem] leading-snug text-foreground mb-8">
                  "{testimonial.quote[language as keyof typeof testimonial.quote]}"
                </p>
              </blockquote>

              {/* Attribution — clean horizontal line + info */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-px bg-accent" />
                <div>
                  <span className="text-foreground font-medium text-sm tracking-wide uppercase">
                    {testimonial.author}
                  </span>
                  <span className="text-muted-foreground text-sm ml-3">
                    {testimonial.role}
                  </span>
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
