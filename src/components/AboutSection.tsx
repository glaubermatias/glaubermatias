import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import glauberPhoto from '@/assets/glauber-photo.jpg';
const AboutSection = () => {
  const {
    t
  } = useLanguage();
  const stats = [{
    number: '7+',
    label: 'Years of experience'
  }, {
    number: '500+',
    label: 'Presentations designed'
  }, {
    number: '50+',
    label: 'Global clients'
  }, {
    number: '10M+',
    label: 'Audience reached'
  }];
  return <section id="about" className="py-8 pb-[50px] lg:py-[27px]">
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
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold">
            {t.about.title}
          </h2>
        </motion.div>

        {/* Content - Two column layout */}
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          {/* Photo - Left column */}
          <motion.div className="md:col-span-3" initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <div className="w-full h-full min-h-[280px] rounded-[2rem] overflow-hidden">
              <img src={glauberPhoto} alt="Glauber Matias" className="w-full h-full object-cover" style={{
              objectPosition: 'center 20%'
            }} />
            </div>
          </motion.div>

          {/* Text Content - Right column */}
          <motion.div className="md:col-span-9 flex flex-col justify-between" initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }}>
            {/* Top section: paragraph + link */}
            <div className="mb-6">
              <p className="leading-relaxed mb-6 max-w-3xl text-stone-500">
                I'm a presentation design specialist with over 7 years of experience crafting visual stories for executives, 
                investors, and global audiences. From C-suite pitch decks to keynote presentations at major conferences, 
                I transform complex ideas into clear, compelling narratives that drive decisions and inspire action.
              </p>

              {/* Who I am beyond the slides Link - More visible */}
              <Link to="/about" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-primary text-primary font-normal rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 group">
                <span>Who I am beyond the slides</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats Grid - Bottom aligned */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-border">
              {stats.map((stat, index) => <motion.div key={stat.label} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.2 + index * 0.1
            }} className="text-left">
                  <div className="font-display text-3xl md:text-4xl font-semibold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-stone-500">{stat.label}</div>
                </motion.div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default AboutSection;