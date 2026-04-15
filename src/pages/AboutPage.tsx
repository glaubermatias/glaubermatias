import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Linkedin, Mail } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

import glauberPhoto from '@/assets/glauber-photo.jpg';

const AboutPage = () => {
  const { t } = useLanguage();

  const stats = [
    { number: '7+', label: 'Years of experience' },
    { number: '200+', label: 'Projects delivered' },
    { number: '50+', label: 'Happy clients' },
    { number: '$300M+', label: 'Funding raised by clients' },
  ];

  return (
    <PageLayout>
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </motion.div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={glauberPhoto}
                alt="Glauber Matias"
                className="w-full max-w-lg rounded-[2.5rem] object-cover aspect-[4/5]"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                  About Me
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm Glauber Matias, a presentation design specialist with over 7 years of experience turning complex ideas into visual stories that drive action.
                </p>
              </div>

              <div className="space-y-6">
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

                <p className="text-muted-foreground leading-relaxed">
                  Based in Brazil, I work with clients globally to create presentations that 
                  resonate across cultures and languages. My approach combines strategic 
                  thinking with world-class design to deliver results that exceed expectations.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
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

              {/* Contact Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="mailto:glauber.matias.ismart@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full btn-filled-dark hover:opacity-90 transition-opacity"
                >
                  <Mail className="w-4 h-4" />
                  Get in touch
                </a>
                <a
                  href="https://linkedin.com/in/glauber-matias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground/20 text-foreground rounded-full hover:border-foreground transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </div>

          {/* Skills & Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8">
              What I Do Best
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Pitch Decks', desc: 'High-stakes presentations for investors and boards' },
                { title: 'Keynotes', desc: 'Engaging visuals for conferences and events' },
                { title: 'Data Viz', desc: 'Complex data made clear and actionable' },
                { title: 'Templates', desc: 'Scalable systems for brand consistency' },
              ].map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-muted rounded-[1.5rem] p-6"
                >
                  <h3 className="font-display text-lg font-semibold mb-2">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground">{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </PageLayout>
  );
};

export default AboutPage;
