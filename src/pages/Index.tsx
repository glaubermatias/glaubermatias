import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WorkSection from '@/components/WorkSection';
import ServicesSection from '@/components/ServicesSection';
import WorkExperienceSection from '@/components/WorkExperienceSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <WorkSection />
      <ServicesSection />
      <WorkExperienceSection />
      <AboutSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
