import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  /** Optional black header rendered before the white content area */
  header?: React.ReactNode;
}

const PageLayout = ({ children, header }: PageLayoutProps) => {
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
        {header}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
