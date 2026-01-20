import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import glauberPhoto from '@/assets/glauber-photo.jpg';

const AboutSection = () => {
  const { t } = useLanguage();

  const stats = [
    { number: '7+', label: 'Years of experience' },
    { number: '200+', label: 'Projects delivered' },
    { number: '50+', label: 'Happy clients' },
    { number: '$300M+', label: 'Funding raised by clients' },
  ];

  return (
    <section id="about" className="py-8 lg:py-10">
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
            {t.about.title}
          </h2>
          <p className="text-base md:text-lg text-dark-accent max-w-2xl">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src={glauberPhoto}
                alt="Glauber Matias"
                className="w-full max-w-md rounded-[2.5rem] object-cover aspect-[4/5]"
              />
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent rounded-[2rem] -z-10" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg text-dark-accent leading-relaxed">
              {t.about.description}
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              My journey started with a passion for visual communication and storytelling. 
              Over the years, I've had the privilege of working with startups, Fortune 500 
              companies, and everything in between, helping them communicate their ideas 
              with clarity and impact.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              I believe that every presentation is an opportunity to inspire action. 
              Whether it's a pitch deck that secures funding or a keynote that moves 
              thousands, my goal is always the same: to make complex ideas simple and memorable.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center md:text-left"
                >
                  <div className="font-display text-2xl md:text-3xl font-semibold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
