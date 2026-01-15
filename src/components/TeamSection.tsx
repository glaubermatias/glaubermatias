import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Glauber Matias',
    role: 'Founder & Lead Designer',
    bio: 'Strategic presentation designer with 7+ years of experience transforming complex ideas into compelling visual narratives.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Design Partner',
    role: 'Visual Strategist',
    bio: 'Specialized in creating impactful visual systems that elevate brand communication and audience engagement.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop',
    social: {
      linkedin: '#',
    },
  },
  {
    name: 'Content Strategist',
    role: 'Narrative Designer',
    bio: 'Expert in crafting compelling stories that connect with audiences and drive meaningful action.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Project Manager',
    role: 'Operations Lead',
    bio: 'Ensures seamless project delivery and exceptional client experience from concept to completion.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop',
    social: {
      linkedin: '#',
    },
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-vermillion font-medium text-sm uppercase tracking-wider mb-4 block">
            The team
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
            Meet the people behind the work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collaborative team of designers, strategists, and storytellers dedicated to elevating your presentations.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-card mb-5 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Social Links Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-4">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-primary hover:bg-golden-orange transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-primary hover:bg-golden-orange transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <h3 className="font-display text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-vermillion text-sm font-medium mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
