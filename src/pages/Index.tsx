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
      <div
        className="relative z-10 bg-background"
        style={{
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
          boxShadow: '0 24px 48px -12px rgba(0,0,0,0.25)',
          marginBottom: '-32px',
          overflow: 'hidden',
        }}
      >
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
