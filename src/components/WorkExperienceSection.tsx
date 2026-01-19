import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Global Tech Corp',
    role: 'Senior Presentation Designer',
    period: '2022 — Present',
    description: 'Leading presentation design strategy for C-suite communications and investor relations.',
    highlights: ['50+ executive decks', '$200M+ in funding raised', 'Global team collaboration'],
  },
  {
    id: 'exp-2',
    company: 'Creative Agency XYZ',
    role: 'Presentation Specialist',
    period: '2019 — 2022',
    description: 'Designed high-impact presentations for Fortune 500 clients across multiple industries.',
    highlights: ['100+ client projects', 'Brand template systems', 'Award-winning designs'],
  },
  {
    id: 'exp-3',
    company: 'StartupHub',
    role: 'Visual Communication Designer',
    period: '2017 — 2019',
    description: 'Created pitch decks and investor materials for early-stage startups.',
    highlights: ['30+ startups helped', 'Seed to Series B', 'Workshop facilitation'],
  },
];

const WorkExperienceSection = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-10 lg:py-14">
      <div className="container mx-auto px-6">
        {/* Header - Left aligned */}
        <motion.div
          className="text-left mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
            {t.experience.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
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
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                        {exp.role}
                      </h3>
                      <p className="text-primary font-normal text-lg">
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
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-foreground text-xs font-normal"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
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
