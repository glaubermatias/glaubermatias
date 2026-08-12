import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  /** Optional black rounded header block rendered before the content area */
  header?: React.ReactNode;
}

const PageLayout = ({ children, header }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="relative z-10 bg-background" style={{ marginBottom: '-32px' }}>
        {header}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
