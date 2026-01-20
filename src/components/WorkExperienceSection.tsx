import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  expandedDetails: string[];
}

const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Global Tech Corp',
    role: 'Senior Presentation Designer',
    period: '2022 — Present',
    description: 'Leading presentation design strategy for C-suite communications and investor relations.',
    highlights: ['50+ executive decks', '$200M+ in funding raised', 'Global team collaboration'],
    expandedDetails: [
      'Led the complete redesign of investor relations materials resulting in improved stakeholder engagement',
      'Developed and implemented presentation design guidelines adopted across 15+ departments',
      'Collaborated with C-suite executives to craft narratives for board meetings and shareholder presentations',
      'Mentored junior designers on strategic storytelling and visual communication best practices',
    ],
  },
  {
    id: 'exp-2',
    company: 'Creative Agency XYZ',
    role: 'Presentation Specialist',
    period: '2019 — 2022',
    description: 'Designed high-impact presentations for Fortune 500 clients across multiple industries.',
    highlights: ['100+ client projects', 'Brand template systems', 'Award-winning designs'],
    expandedDetails: [
      'Created pitch decks that helped clients raise over $50M in venture funding',
      'Developed scalable template systems for enterprise clients reducing design time by 60%',
      'Received industry recognition for innovative data visualization techniques',
      'Managed client relationships and led discovery sessions to understand business objectives',
    ],
  },
  {
    id: 'exp-3',
    company: 'StartupHub',
    role: 'Visual Communication Designer',
    period: '2017 — 2019',
    description: 'Created pitch decks and investor materials for early-stage startups.',
    highlights: ['30+ startups helped', 'Seed to Series B', 'Workshop facilitation'],
    expandedDetails: [
      'Partnered with founders to develop compelling narratives for investor presentations',
      'Conducted pitch deck workshops helping founders improve their storytelling skills',
      'Designed demo day presentations for accelerator cohorts',
      'Built a library of reusable components and templates for the startup community',
    ],
  },
];

const WorkExperienceSection = () => {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-8 lg:py-10">
      <div className="container mx-auto px-6">
        {/* Header - Left aligned */}
        <motion.div
          className="text-left mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
            {t.experience.title}
          </h2>
          <p className="text-base md:text-lg text-dark-accent max-w-2xl">
            {t.experience.subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-2 w-3 h-3 rounded-full bg-primary -translate-x-1/2" />

                {/* Experience card */}
                <div className="bg-muted rounded-[2rem] p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display text-lg md:text-xl font-semibold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-primary font-normal text-base md:text-lg">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-muted-foreground text-sm md:text-base shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-dark-accent mb-4">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-normal"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleExpanded(exp.id)}
                    className="flex items-center gap-2 text-primary text-sm font-normal hover:gap-3 transition-all duration-300"
                  >
                    <span>{expandedId === exp.id ? 'Show less' : 'Read more'}</span>
                    <motion.div
                      animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-2 pl-4 border-l-2 border-accent">
                          {exp.expandedDetails.map((detail, idx) => (
                            <li key={idx} className="text-muted-foreground text-sm">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;
