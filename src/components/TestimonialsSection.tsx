import { motion } from 'framer-motion';

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
  return (
    <section id="testimonials" className="py-12 lg:py-20">
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
            What people have to say about me
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
              {/* Quote — smaller font, dark gray */}
              <blockquote className="max-w-3xl">
                <p className="font-sans text-lg md:text-xl lg:text-2xl leading-relaxed text-muted-foreground mb-8">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Attribution */}
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
