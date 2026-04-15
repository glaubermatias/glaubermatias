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
      {/* Main content sits above sticky footer */}
      <div
        className="relative z-10 bg-background"
        style={{
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
        }}
      >
        <Hero />
        <WorkSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
      </div>
      {/* Footer is sticky at bottom, revealed as content scrolls away */}
      <Footer />
    </div>
  );
};

export default Index;
