import Navigation from '@/components/Navigation';
import WorkExperienceSection from '@/components/WorkExperienceSection';
import Footer from '@/components/Footer';

const ExperiencePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-28">
        <WorkExperienceSection />
      </div>
      <Footer />
    </div>
  );
};

export default ExperiencePage;
