import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div
        className="relative z-10 bg-background"
        style={{
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
