import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WorkSection from '@/components/WorkSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="relative z-10 bg-background" style={{ marginBottom: '-32px' }}>
        <Hero />
        <WorkSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
