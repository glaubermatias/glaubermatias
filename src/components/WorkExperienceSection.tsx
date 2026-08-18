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
const experiences: Experience[] = [{
  id: 'exp-1',
  company: 'QuintoAndar',
  role: 'Presentation Specialist',
  period: 'Mar 2022 — Present',
  description: 'Leading end-to-end presentation design for executive communications, investor relations, and strategic initiatives.',
  highlights: ['C-Suite Presentations', 'Investor Relations', 'Brand Strategy'],
  expandedDetails: ["Crafted the company's pitch deck for the CEO, showcasing key performance metrics and future growth potential through high-quality data visualizations and compelling storytelling;", 'Led the presentation design for consecutive global end-of-year events, collaborating with cross-functional teams to ensure a seamless experience for 3,500+ employees with on-site support for 10 executive speakers;', 'Designed the keynote for four editions of the Leadership Academy, driving alignment and engagement for 300+ senior leaders through compelling visuals, with input from 30+ global stakeholders (NPS 4.6/5);', 'Managed all annual strategic presentation decks in partnership with C-suite executives, transforming complex information into compelling visual communications and achieving a 4.7/5 satisfaction rating in 2025;', "Designed and implemented the company's internal newsletter, along with visual assets and infographics to enhance content retention, driving a 39% increase in click-through rates via A/B testing;", 'Produced a comprehensive library of 350+ presentation design assets and PowerPoint templates, adhering to brand guidelines and strengthening brand consistency across internal communications.']
}, {
  id: 'exp-2',
  company: 'Itaú Unibanco',
  role: 'Business Presentation Designer',
  period: 'Aug 2020 — Mar 2022',
  description: 'Designed executive presentations and internal communications for Latin America\'s largest bank.',
  highlights: ['Executive Communications', 'Financial Services', 'Data Visualization'],
  expandedDetails: ['Designed high-impact presentation decks for the VP and senior leaders, securing Board approval for new client acquisition strategies that boosted conversion rates compared with previous quarters;', 'Led the visual strategy for monthly reports across all 16 business units, standardizing templates to enhance readability, improve clarity, and enable quick, data-driven assessments by stakeholders;', "Developed and implemented the Digital Acquisition team\u2019s visual identity, creating branded templates for presentations, reports, and internal communications to ensure consistency and broad adoption within the team;", 'Transformed complex datasets into compelling, easy-to-digest visuals, utilizing data visualization techniques to enhance clarity, storytelling, and decision-making for executive and financial presentations.']
}, {
  id: 'exp-3',
  company: 'Itaú Unibanco',
  role: 'Presentation Designer',
  period: 'Feb 2019 — Aug 2020',
  description: 'Crafted visual storytelling for executive and internal communications.',
  highlights: ['Visual Identity', 'Template Systems', 'Internal Comms'],
  expandedDetails: ['Boosted signed contracts by 300% through visually striking communication campaigns for the sales team;', 'Designed and published over 170 communications, prioritizing clear messaging and engaging visuals;', "Developed the communication strategy for Itaú's new digital wallet, producing creative deliverables from newsletters to educational videos, reaching and engaging over 6,000 employees in the sales force;", 'Enhanced existing slide decks and created branded templates for emails, presentations, and general messages, ensuring consistency across internal communications.']
}, {
  id: 'exp-4',
  company: 'Bayer',
  role: 'Project Designer Intern',
  period: 'May 2016 — Apr 2018',
  description: 'Provided design services for corporate communications and strategic projects.',
  highlights: ['Corporate Design', 'Project Management', 'Healthcare'],
  expandedDetails: ["Designed and managed the site's technical drawings to obtain and maintain operating licenses in the pharmaceuticals division;", 'Implemented a master-plan update system that eliminated manual updates across technical site drawings, reducing maintenance effort and turnaround time;', 'Acted as the local focal point for directors and technical teams, translating operational requirements into approved technical layouts;', 'Documented processes and created technical guides to support layout maintenance and knowledge transfer.']
}];
const WorkExperienceSection = () => {
  const {
    t
  } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  return <section id="experience" className="lg:py-[20px] py-0">
      <div className="content-shell">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-8">
          CV
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, index) => <motion.div key={exp.id} initial={{
            opacity: 0,
            x: -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: index * 0.15
          }} className="relative pl-8 md:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-2 w-3 h-3 rounded-full bg-primary -translate-x-1/2" />

                {/* Experience card */}
                <div className="bg-muted rounded-[2rem] p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display text-lg md:text-xl font-semibold text-primary">
                        {exp.role}
                      </h3>
                      <p className="text-primary font-normal text-base md:text-lg">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm md:text-base shrink-0 text-primary">
                      {exp.period}
                    </span>
                  </div>

                  <p className="mb-4 text-secondary-foreground">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.highlights.map((highlight, idx) => <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-normal">
                        {highlight}
                      </span>)}
                  </div>

                  {/* Expand/Collapse Button */}
                  <button onClick={() => toggleExpanded(exp.id)} className="flex items-center gap-2 text-primary text-sm font-normal hover:gap-3 transition-all duration-300">
                    <span>{expandedId === exp.id ? 'Show less' : 'Read more'}</span>
                    <motion.div animate={{
                  rotate: expandedId === exp.id ? 180 : 0
                }} transition={{
                  duration: 0.3
                }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedId === exp.id && <motion.div initial={{
                  height: 0,
                  opacity: 0
                }} animate={{
                  height: 'auto',
                  opacity: 1
                }} exit={{
                  height: 0,
                  opacity: 0
                }} transition={{
                  duration: 0.4,
                  ease: 'easeInOut'
                }} className="overflow-hidden">
                        <ul className="mt-4 space-y-2.5">
                          {exp.expandedDetails.map((detail, idx) => <li key={idx} className="flex gap-3 text-foreground text-sm leading-relaxed">
                              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span>{detail}</span>
                            </li>)}
                        </ul>
                      </motion.div>}
                  </AnimatePresence>
                </div>
              </motion.div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default WorkExperienceSection;