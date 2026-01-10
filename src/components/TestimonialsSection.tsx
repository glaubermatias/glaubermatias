import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: {
      en: "Glauber transformed our pitch deck from a basic PowerPoint into a visual masterpiece. We closed our Series A within weeks.",
      pt: "Glauber transformou nosso pitch deck de um PowerPoint básico em uma obra-prima visual. Fechamos nossa Série A em semanas.",
      es: "Glauber transformó nuestro pitch deck de un PowerPoint básico en una obra maestra visual. Cerramos nuestra Serie A en semanas.",
    },
    author: "Sarah Chen",
    role: "CEO, TechVenture",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
  },
  {
    quote: {
      en: "The attention to detail and strategic thinking Glauber brings to every slide is remarkable. Truly a presentation designer at the top of his craft.",
      pt: "A atenção aos detalhes e o pensamento estratégico que Glauber traz para cada slide é notável. Verdadeiramente um designer de apresentações no topo de sua arte.",
      es: "La atención al detalle y el pensamiento estratégico que Glauber aporta a cada diapositiva es notable. Verdaderamente un diseñador de presentaciones en la cima de su arte.",
    },
    author: "Marcus Rodriguez",
    role: "VP Marketing, GlobalCorp",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
  },
  {
    quote: {
      en: "Working with Glauber was a game-changer for our annual conference. The keynote visuals were absolutely stunning.",
      pt: "Trabalhar com Glauber foi um divisor de águas para nossa conferência anual. Os visuais do keynote foram absolutamente impressionantes.",
      es: "Trabajar con Glauber fue un cambio de juego para nuestra conferencia anual. Las visuales del keynote fueron absolutamente impresionantes.",
    },
    author: "Elena Vasquez",
    role: "Event Director, Innovation Summit",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop",
  },
];

const TestimonialsSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-gradient-warm">
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
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="p-8 rounded-3xl bg-background border border-border card-hover"
            >
              <Quote className="w-10 h-10 text-terracotta/30 mb-6" />
              <p className="text-foreground mb-8 leading-relaxed">
                "{testimonial.quote[language as keyof typeof testimonial.quote]}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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
