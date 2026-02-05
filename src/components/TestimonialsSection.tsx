import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
const testimonials = [{
  quote: {
    en: "Glauber transformed our pitch deck from a basic PowerPoint into a visual masterpiece. We closed our Series A within weeks.",
    pt: "Glauber transformou nosso pitch deck de um PowerPoint básico em uma obra-prima visual. Fechamos nossa Série A em semanas.",
    es: "Glauber transformó nuestro pitch deck de un PowerPoint básico en una obra maestra visual. Cerramos nuestra Serie A en semanas."
  },
  author: "Sarah Chen",
  role: "CEO, TechVenture"
}, {
  quote: {
    en: "The attention to detail and strategic thinking Glauber brings to every slide is remarkable. Truly a presentation designer at the top of his craft.",
    pt: "A atenção aos detalhes e o pensamento estratégico que Glauber traz para cada slide é notável. Verdadeiramente um designer de apresentações no topo de sua arte.",
    es: "La atención al detalle y el pensamiento estratégico que Glauber aporta a cada diapositiva es notable. Verdaderamente un diseñador de presentaciones en la cima de su arte."
  },
  author: "Marcus Rodriguez",
  role: "VP Marketing, GlobalCorp"
}, {
  quote: {
    en: "Working with Glauber was a game-changer for our annual conference. The keynote visuals were absolutely stunning.",
    pt: "Trabalhar com Glauber foi um divisor de águas para nossa conferência anual. Os visuais do keynote foram absolutamente impressionantes.",
    es: "Trabajar con Glauber fue un cambio de juego para nuestra conferencia anual. Las visuales del keynote fueron absolutamente impresionantes."
  },
  author: "Elena Vasquez",
  role: "Event Director, Innovation Summit"
}];
const TestimonialsSection = () => {
  const {
    t,
    language
  } = useLanguage();
  return <section id="testimonials" className="py-8 mb-10 lg:py-[20px]">
      <div className="container mx-auto px-6">
        {/* Header - Left aligned */}
        <motion.div className="text-left mb-8" initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }}>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
            {t.testimonials.title}
          </h2>
          <p className="text-base md:text-lg max-w-2xl text-[#78726d]">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Grid - Equal height cards without borders */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => <motion.div key={testimonial.author} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: index * 0.15
        }} className="p-8 rounded-[2rem] bg-muted h-full flex flex-col">
              {/* Quote icon in dark blue */}
              <Quote className="w-10 h-10 text-primary mb-6 shrink-0" />
              
              {/* Quote text - Takes remaining space */}
              <p className="text-foreground mb-8 leading-relaxed flex-1">
                "{testimonial.quote[language as keyof typeof testimonial.quote]}"
              </p>
              
              {/* Author info - Fixed at bottom */}
              <div className="mt-auto pt-4 border-t border-border">
                <div className="font-semibold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-[#78726d]">{testimonial.role}</div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;