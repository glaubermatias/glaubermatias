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
    company: 'QuintoAndar',
    role: 'Presentation Specialist',
    period: 'Mar 2022 — Present',
    description: 'Leading end-to-end presentation design for executive communications, investor relations, and strategic initiatives.',
    highlights: ['C-Suite Presentations', 'Investor Relations', 'Brand Strategy'],
    expandedDetails: [
      'Design high-stakes pitch decks and board presentations for C-suite executives',
      'Develop visual narratives that align complex data with strategic storytelling',
      'Create and maintain template systems ensuring brand consistency across the organization',
      'Collaborate with leadership to craft compelling visual stories for key stakeholders',
      'Lead presentation design workshops and training sessions for internal teams',
    ],
  },
  {
    id: 'exp-2',
    company: 'Itaú Unibanco',
    role: 'Business Presentation Designer',
    period: 'Aug 2020 — Mar 2022',
    description: 'Designed executive presentations and internal communications for Latin America\'s largest bank.',
    highlights: ['Executive Communications', 'Financial Services', 'Data Visualization'],
    expandedDetails: [
      'Designed investor materials and quarterly reports for executive leadership',
      'Created data visualization standards for financial reporting and analytics',
      'Developed presentation guidelines adopted across multiple business units',
      'Collaborated with IR and marketing teams on shareholder communications',
      'Produced keynote presentations for industry conferences and events',
    ],
  },
  {
    id: 'exp-3',
    company: 'Itaú Unibanco',
    role: 'Presentation Designer',
    period: 'Feb 2019 — Aug 2020',
    description: 'Crafted visual storytelling for executive and internal communications.',
    highlights: ['Visual Identity', 'Template Systems', 'Internal Comms'],
    expandedDetails: [
      'Created pitch decks that supported key strategic initiatives',
      'Designed presentations for internal campaigns and communications',
      'Developed visual systems that scaled with organizational needs',
      'Collaborated with product and marketing teams on visual assets',
      'Built presentation templates that maintained brand consistency at scale',
    ],
  },
  {
    id: 'exp-4',
    company: 'Bayer',
    role: 'Project Designer',
    period: 'May 2016 — Apr 2018',
    description: 'Provided design services for corporate communications and strategic projects.',
    highlights: ['Corporate Design', 'Project Management', 'Healthcare'],
    expandedDetails: [
      'Delivered 50+ design projects for corporate communications',
      'Specialized in presentation design for strategic initiatives',
      'Developed long-term client relationships through consistent quality',
      'Managed end-to-end project lifecycle from discovery to final delivery',
      'Built a reputation for transforming complex information into clear visual narratives',
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
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
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

                  <p className="text-muted-foreground mb-4">
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
