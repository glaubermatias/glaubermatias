import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// This would typically come from a database or CMS
const projectsData: Record<string, {
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  images: string[];
}> = {
  'project-1': {
    title: 'TechVenture Series A Pitch',
    client: 'TechVenture Inc.',
    year: '2024',
    category: 'Pitch Deck',
    description: 'A strategic pitch deck designed to help TechVenture secure their Series A funding round. The presentation focused on clear data visualization, compelling storytelling, and a cohesive visual narrative.',
    challenge: 'TechVenture had a complex product offering that was difficult to explain in a short investor presentation. They needed to simplify their message while maintaining the technical credibility that would resonate with sophisticated investors.',
    solution: 'I created a narrative-driven deck that led investors through the problem, solution, and opportunity using progressive disclosure. Key metrics were visualized through custom infographics that made complex data instantly understandable.',
    results: [
      '$12M Series A secured within 6 weeks',
      '90% positive investor feedback on presentation clarity',
      'Deck template now used company-wide for all investor communications',
    ],
    images: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop',
    ],
  },
  'project-2': {
    title: 'Global Summit Keynote',
    client: 'Innovation Summit',
    year: '2024',
    category: 'Events & Keynotes',
    description: 'Opening keynote presentation for a 5,000+ attendee conference. Cinematic visuals with powerful narrative flow designed for maximum stage impact.',
    challenge: 'The keynote needed to set the tone for an entire conference while being visible and impactful for thousands of attendees in a massive venue.',
    solution: 'I designed bold, high-contrast visuals optimized for large screens, with carefully timed animations that supported the speaker\'s delivery without overwhelming the message.',
    results: [
      'Highest-rated keynote in summit history',
      '4.8/5 average audience engagement score',
      'Presentation style adopted for future summits',
    ],
    images: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&auto=format&fit=crop',
    ],
  },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsData[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Project Not Found</h1>
          <Link to="/" className="text-terracotta hover:underline">
            Return Home
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
            to="/#work"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Work
          </Link>
        </div>

        {/* Hero */}
        <motion.div
          className="container mx-auto px-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span>{project.client}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>{project.year}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>{project.category}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </motion.div>

        {/* Main Image */}
        <motion.div
          className="container mx-auto px-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="aspect-video rounded-3xl overflow-hidden bg-secondary">
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-display text-xl font-semibold mb-4 text-terracotta">
                The Challenge
              </h3>
              <p className="text-muted-foreground">
                {project.challenge}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-display text-xl font-semibold mb-4 text-golden">
                The Solution
              </h3>
              <p className="text-muted-foreground">
                {project.solution}
              </p>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="font-display text-xl font-semibold mb-4 text-mustard">
                The Results
              </h3>
              <ul className="space-y-2">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-mustard mt-2 shrink-0" />
                    {result}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Additional Images */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {project.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="aspect-video rounded-2xl overflow-hidden bg-secondary"
              >
                <img
                  src={image}
                  alt={`${project.title} - Image ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
