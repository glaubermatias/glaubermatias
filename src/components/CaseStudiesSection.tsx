import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'glowessence-skincare',
    title: 'GlowEssence Skincare',
    description: 'Elevated a luxury skincare brand\'s digital presence through strategic content marketing and influencer partnerships.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop',
    tags: ['Content Marketing', 'Influencer'],
  },
  {
    id: 'brewzen-coffee',
    title: 'BrewZen Coffee Retailer',
    description: 'BrewZen is a boutique coffee retailer known for its unique blends and commitment to sustainability.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
    tags: ['Instagram', 'TikTok'],
  },
  {
    id: 'burgerhaven-restaurant',
    title: 'BurgerHaven Restaurant',
    description: 'Sizzling Digital Transformation for BurgerHaven Restaurant through targeted advertising.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
    tags: ['PPC', 'SEO'],
  },
  {
    id: 'fizzpop-drinks',
    title: 'FizzPop Drinks',
    description: 'Case Study: Sparkling Success with FizzPop Drinks through social media marketing.',
    image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=800&auto=format&fit=crop',
    tags: ['Instagram', 'Paid ads'],
  },
];

const CaseStudiesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="work" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <span className="text-vermillion font-medium text-sm uppercase tracking-wider mb-4 block">
              Case Studies
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold">
              {t.work.title}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-md">
            {t.work.subtitle}
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/case-studies/${study.id}`}
                className="group block"
              >
                {/* Image */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary mb-6 relative">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
                  
                  {/* View Project Arrow */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-semibold mb-2 group-hover:text-vermillion transition-colors">
                  {study.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {study.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
