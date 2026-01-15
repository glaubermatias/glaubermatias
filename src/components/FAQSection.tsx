import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'What types of presentations do you design?',
    answer: 'We specialize in pitch decks, keynote presentations, internal communications, training materials, and corporate reports. Our expertise spans from startup fundraising decks to enterprise-level executive presentations.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity and scope. A standard pitch deck typically takes 2-3 weeks, while more complex keynote presentations may require 4-6 weeks. We also offer expedited services for urgent needs.',
  },
  {
    question: 'What is your design process?',
    answer: 'Our process includes discovery and strategy, content structuring, visual concept development, design execution, and refinement. We collaborate closely with you at each stage to ensure the final product exceeds expectations.',
  },
  {
    question: 'Do you offer revisions?',
    answer: 'Yes, all our packages include revision rounds. We believe in iterative design and work with you until the presentation perfectly aligns with your vision and objectives.',
  },
  {
    question: 'Can you work with existing brand guidelines?',
    answer: 'Absolutely. We seamlessly integrate your existing brand identity, including colors, typography, and visual elements, while elevating the overall design to create a cohesive and impactful presentation.',
  },
  {
    question: 'What file formats do you deliver?',
    answer: 'We deliver in your preferred format: PowerPoint, Keynote, Google Slides, or PDF. All files are fully editable so you can make future updates as needed.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-vermillion font-medium text-sm uppercase tracking-wider mb-4 block">
              FAQ
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Frequently asked questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Have other questions? Feel free to reach out and we'll be happy to help.
            </p>
          </motion.div>

          {/* Right Column - Accordion */}
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-6 flex items-start justify-between text-left group"
                >
                  <span className="font-medium text-lg pr-8 group-hover:text-vermillion transition-colors">
                    {faq.question}
                  </span>
                  <span className="shrink-0 mt-1">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-vermillion" />
                    ) : (
                      <Plus className="w-5 h-5 text-muted-foreground" />
                    )}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
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

export default FAQSection;
