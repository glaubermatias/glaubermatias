import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
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
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
