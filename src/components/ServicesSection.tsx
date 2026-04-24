import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
interface Service {
  id: string;
  title: string;
  description: string;
}
const services: Service[] = [{
  id: 'pitch-decks',
  title: 'Pitch Decks',
  description: 'High-impact pitch decks for C-suite, investors and boards, aligning strategy, data and storytelling to secure buy-in and support key decisions.'
}, {
  id: 'keynotes',
  title: 'Keynotes & Events',
  description: 'End-to-end keynote and event presentations with on-site support for global stages and large internal gatherings.'
}, {
  id: 'data-viz',
  title: 'Data Visualization',
  description: 'Transform complex datasets into clear, executive-ready charts, dashboards and infographics that reveal insights and drive decisions.'
}, {
  id: 'visual-storytelling',
  title: 'Visual Storytelling',
  description: 'Narrative structure, slide sequencing and visual metaphors that turn complex ideas into persuasive, memorable stories.'
}, {
  id: 'templates',
  title: 'Template Libraries',
  description: 'Design and deployment of reusable slide systems and asset libraries to scale quality, speed and brand consistency across teams.'
}, {
  id: 'internal-comms',
  title: 'Internal Communication',
  description: 'On-brand newsletters, onboarding decks and internal campaigns that improve clarity, engagement and information retention.'
}, {
  id: 'employer-branding',
  title: 'Employer Branding',
  description: 'Presentation and visual assets for talent initiatives, tech talks and conferences that strengthen employer brand and candidate experience.'
}, {
  id: 'graphic-design',
  title: 'Graphic Design',
  description: 'Icons, illustrations, layouts and motion elements to elevate presentations and digital communication (PowerPoint, Google slides, Figma, Adobe CC).'
}];
const ServicesSection = () => {
  const {
    t
  } = useLanguage();
  const [activeService, setActiveService] = useState<string | null>(null);
  const toggleService = (id: string) => {
    setActiveService(activeService === id ? null : id);
  };

  // Split services into two columns
  const leftColumn = services.slice(0, 4);
  const rightColumn = services.slice(4, 8);
  const renderServiceItem = (service: Service, index: number) => <motion.div key={service.id} className="bg-background rounded-[2rem] overflow-hidden" initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.5,
    delay: index * 0.1
  }}>
      <button onClick={() => toggleService(service.id)} className="w-full p-6 flex items-center justify-between text-left group">
        <h3 className="font-display text-lg md:text-xl font-semibold group-hover:text-accent transition-colors duration-300">
          {service.title}
        </h3>
        <motion.div animate={{
        rotate: activeService === service.id ? 180 : 0
      }} transition={{
        duration: 0.3
      }} className="shrink-0 ml-4">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {activeService === service.id && <motion.div initial={{
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
            <div className="px-6 pb-6">
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
  return <section id="skillset" className="py-8 mb-2 lg:py-[26px]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Services Container with dark background */}
        <div data-nav-theme="dark" className="bg-dark-accent rounded-[2.5rem] p-8 md:p-12">
          {/* Header - Left aligned */}
          <motion.div className="text-left mb-10" initial={{
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 text-primary-foreground">
              {t.services.title}
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/70 max-w-2xl">
              {t.services.subtitle}
            </p>
          </motion.div>

          {/* Two Column Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {leftColumn.map((service, index) => renderServiceItem(service, index))}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {rightColumn.map((service, index) => renderServiceItem(service, index + 4))}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ServicesSection;