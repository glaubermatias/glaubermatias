import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WorkSection from '@/components/WorkSection';
import ServicesSection from '@/components/ServicesSection';
import FAQSection from '@/components/FAQSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <WorkSection />
      <ServicesSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
