import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: 'Glauber transformed our pitch deck from a basic PowerPoint into a visual masterpiece. We closed our Series A within weeks.',
    author: 'Sarah Chen',
    role: 'CEO, TechVenture',
  },
  {
    quote: 'The attention to detail and strategic thinking Glauber brings to every slide is remarkable. Truly a presentation designer at the top of his craft.',
    author: 'Marcus Rodriguez',
    role: 'VP Marketing, GlobalCorp',
  },
  {
    quote: 'Working with Glauber was a game-changer for our annual conference. The keynote visuals were absolutely stunning.',
    author: 'Elena Vasquez',
    role: 'Event Director, Innovation Summit',
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-12 lg:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold">
            What people have to say about me
          </h2>
        </motion.div>

        {/* Single testimonial with navigation */}
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Large quote mark */}
              <span className="block font-display text-6xl text-accent/40 leading-none mb-2 select-none">"</span>

              <blockquote className="mb-8">
                <p className="font-sans text-lg md:text-xl leading-relaxed text-muted-foreground">
                  {t.quote}
                </p>
              </blockquote>

              <div>
                <p className="font-sans font-medium text-foreground text-sm tracking-wide">
                  {t.author}
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  {t.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-muted-foreground tabular-nums">
              {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
