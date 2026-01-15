import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ClientLogos from '@/components/ClientLogos';
import ServicesAccordion from '@/components/ServicesAccordion';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import TeamSection from '@/components/TeamSection';
import FAQSection from '@/components/FAQSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ClientLogos />
      <ServicesAccordion />
      <CaseStudiesSection />
      <TeamSection />
      <FAQSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
