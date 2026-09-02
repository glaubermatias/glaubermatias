import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Glauber really raised the bar for our materials, and it is impressive to see how the level of quality and professionalism has changed. You can see how much technical design knowledge he applies. This brings real value to our company by conveying professionalism and increasing our team\u2019s productivity.',
    author: 'Chief of Staff',
    role: 'QuintoAndar',
  },
  {
    quote:
      'Glauber is one of the most creative and dedicated people I\u2019ve ever worked with. He was a key player in communicating the projects and deliveries of the board of directors and vice-president. A person we can count on, who will connect the dots to help tell the story in the best possible way, high-spirited, optimistic and super reliable.',
    author: 'Planning & Analytics Head',
    role: 'Itaú Unibanco',
  },
  {
    quote:
      'He possesses proven, high-level skills in presentation design, making our communications professional, clear, and easy to digest. His commitment to meeting deadlines is exemplary: he always delivers with consistency, even under immense pressure. He absorbs complex feedback from the executive team and translates it into clear, objective, and actionable outcomes.',
    author: 'Learning & Development Leader',
    role: 'QuintoAndar',
  },
];


const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-12 lg:py-20">
      <div className="site-shell">
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

          {/* Navigation — borderless */}
          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-muted-foreground tabular-nums">
              {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
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
