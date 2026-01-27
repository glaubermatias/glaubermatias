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
  return <section id="about" className="py-8 lg:py-[50px] pb-[50px]">
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
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mb-3">
            {t.about.title}
          </h2>
          <p className="text-base md:text-lg max-w-2xl text-[#78726d]">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Photo */}
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
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden">
              <img src={glauberPhoto} alt="Glauber Matias" className="w-full h-full object-cover" style={{
              objectPosition: 'center 20%'
            }} />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div className="md:col-span-9" initial={{
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
            <p className="leading-relaxed mb-6 max-w-3xl text-secondary-foreground">
              I'm a presentation design specialist with over 7 years of experience crafting visual stories for executives, 
              investors, and global audiences. From C-suite pitch decks to keynote presentations at major conferences, 
              I transform complex ideas into clear, compelling narratives that drive decisions and inspire action.
            </p>

            {/* Who I am beyond the slides Link */}
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-normal hover:gap-3 transition-all duration-300 mb-8">
              <span>Who I am beyond the slides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                  <div className="text-sm text-[#78726d]">
                    {stat.label}
                  </div>
                </motion.div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default AboutSection;