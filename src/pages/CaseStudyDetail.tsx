import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { caseStudies } from '@/components/CaseStudiesSection';

// Extended case study data
const caseStudyDetails: Record<string, {
  aboutBrand: string;
  whatWeDid: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  heroImage: string;
  contentImage: string;
}> = {
  'glowessence-skincare': {
    aboutBrand: 'GlowEssence Skincare, a luxury skincare brand known for its natural ingredients and commitment to sustainability, sought to enhance its online visibility and drive e-commerce sales. Despite having a loyal customer base and superior products, GlowEssence\'s digital footprint was not reflective of its market position. The brand partnered with us to develop a comprehensive digital marketing strategy that focused on content marketing, influencer collaborations, and targeted advertising to elevate brand awareness and boost online engagement.',
    whatWeDid: 'The project began with a deep analysis of GlowEssence\'s current digital strategy and market positioning. Our team identified key opportunities to enhance brand visibility through strategic content marketing and influencer partnerships, aiming to authentically engage with both existing and potential customers. We devised a robust content marketing strategy that included the creation of engaging, informative blog posts centered on skincare tips, the benefits of natural ingredients, and sustainable beauty practices. These efforts were complemented by an SEO optimization plan to improve search engine rankings and drive organic traffic to GlowEssence\'s website.',
    testimonial: {
      quote: '"Their strategic approach to content marketing not only elevated our brand authority in the skincare industry but also significantly increased our website traffic. The influencer partnerships they facilitated were a perfect fit for our brand, bringing authenticity and depth to their marketing efforts."',
      author: 'Sarah Chen',
      role: 'Marketing Director, GlowEssence',
    },
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop',
    contentImage: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b3f?w=1200&auto=format&fit=crop',
  },
  'brewzen-coffee': {
    aboutBrand: 'BrewZen Coffee is a boutique coffee retailer renowned for its unique, ethically-sourced blends and unwavering commitment to sustainability. With a passionate following and exceptional products, BrewZen sought to expand its digital presence and connect with coffee enthusiasts worldwide through authentic storytelling and engaging social media content.',
    whatWeDid: 'We developed a comprehensive social media strategy focusing on Instagram and TikTok, creating visually stunning content that showcased the artistry behind each blend. Our approach included behind-the-scenes content, barista tutorials, and user-generated content campaigns that fostered a vibrant community of coffee lovers. The strategy resulted in significant follower growth and increased engagement across all platforms.',
    testimonial: {
      quote: '"The team truly understood our brand\'s essence and translated it into a social media presence that resonates with our community. The growth we\'ve seen has been remarkable."',
      author: 'Michael Torres',
      role: 'Founder, BrewZen Coffee',
    },
    heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop',
    contentImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&auto=format&fit=crop',
  },
  'burgerhaven-restaurant': {
    aboutBrand: 'BurgerHaven is a beloved local restaurant chain known for its gourmet burgers and commitment to quality ingredients. Facing increased competition, they needed a digital transformation to maintain their market position and attract new customers through strategic online marketing.',
    whatWeDid: 'We implemented a comprehensive PPC and SEO strategy to increase BurgerHaven\'s online visibility. Our approach included targeted Google Ads campaigns, local SEO optimization, and a content strategy focused on highlighting their unique offerings. The results included a significant increase in online orders and foot traffic to their locations.',
    testimonial: {
      quote: '"The digital transformation exceeded our expectations. We\'ve seen a 40% increase in online orders and our restaurants are busier than ever."',
      author: 'James Wilson',
      role: 'CEO, BurgerHaven',
    },
    heroImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&auto=format&fit=crop',
    contentImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&auto=format&fit=crop',
  },
  'fizzpop-drinks': {
    aboutBrand: 'FizzPop Drinks is an innovative beverage company specializing in premium sparkling waters with unique flavor combinations. They wanted to establish themselves as a lifestyle brand and connect with health-conscious millennials and Gen Z consumers through bold social media marketing.',
    whatWeDid: 'We created a vibrant Instagram presence and launched targeted paid advertising campaigns that positioned FizzPop as the go-to choice for the modern, health-conscious consumer. Our creative direction emphasized lifestyle photography, influencer partnerships, and engaging video content that showcased the brand\'s playful personality.',
    testimonial: {
      quote: '"The creative direction and strategic approach to our social media completely transformed our brand perception. We\'re now seen as a lifestyle choice, not just a beverage."',
      author: 'Emma Rodriguez',
      role: 'Brand Manager, FizzPop',
    },
    heroImage: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=1200&auto=format&fit=crop',
    contentImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200&auto=format&fit=crop',
  },
};

const CaseStudyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const caseStudy = id ? caseStudies.find(cs => cs.id === id) : null;
  const details = id ? caseStudyDetails[id] : null;

  // Get other case studies for "Other projects" section
  const otherCaseStudies = caseStudies.filter(cs => cs.id !== id).slice(0, 3);

  if (!caseStudy || !details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Case Study Not Found</h1>
          <Link to="/case-studies" className="text-vermillion hover:underline">
            View all case studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Back Button */}
        <div className="container mx-auto px-6 mb-8">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
        </div>

        {/* Hero Image */}
        <motion.div
          className="container mx-auto px-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-secondary">
            <img
              src={details.heroImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* About the Brand */}
        <div className="container mx-auto px-6 mb-20">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              About the brand
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {details.aboutBrand}
            </p>
          </motion.div>
        </div>

        {/* Content Image */}
        <motion.div
          className="container mx-auto px-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="aspect-video rounded-3xl overflow-hidden bg-secondary">
            <img
              src={details.contentImage}
              alt={`${caseStudy.title} work`}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* What We Did */}
        <div className="container mx-auto px-6 mb-20">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              What we did
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {details.whatWeDid}
            </p>
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div
          className="container mx-auto px-6 mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="max-w-4xl">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">
              Client Testimonial
            </h2>
            <blockquote className="border-l-4 border-vermillion pl-8">
              <p className="text-xl md:text-2xl text-foreground italic leading-relaxed mb-6">
                {details.testimonial.quote}
              </p>
              <footer>
                <p className="font-medium">{details.testimonial.author}</p>
                <p className="text-muted-foreground text-sm">{details.testimonial.role}</p>
              </footer>
            </blockquote>
          </div>
        </motion.div>

        {/* Other Projects */}
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-muted-foreground text-sm uppercase tracking-wider block mb-2">
                  Other projects
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-semibold">
                  See our work
                </h2>
              </div>
              <Link
                to="/case-studies"
                className="hidden md:inline-flex items-center gap-2 text-vermillion font-medium hover:gap-3 transition-all"
              >
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {otherCaseStudies.map((study) => (
                <Link
                  key={study.id}
                  to={`/case-studies/${study.id}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary mb-4 relative">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-vermillion transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {study.description}
                  </p>
                  <div className="flex gap-2 mt-3">
                    {study.tags.map((tag) => (
                      <span key={tag} className="text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>

            <div className="md:hidden text-center mt-8">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 text-vermillion font-medium"
              >
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-golden-orange text-sm uppercase tracking-wider block mb-4">
                Get in touch
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary-foreground mb-6">
                Let's work together
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Ready to transform your brand's digital presence and unlock the full potential of social media marketing? Reach out today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cream text-primary font-medium rounded-full hover:bg-golden-orange transition-colors"
                >
                  Get in touch
                </Link>
                <a
                  href="mailto:hello@glaubermatias.com"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-foreground/30 text-primary-foreground font-medium rounded-full hover:border-primary-foreground transition-colors"
                >
                  Book a call
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
