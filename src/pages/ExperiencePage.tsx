import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import WorkExperienceSection from '@/components/WorkExperienceSection';

const ResumeCTA = () => (
  <a
    href="#experience"
    className="group relative inline-flex items-center isolate"
    aria-label="Read my resume"
  >
    {/* Expanding pill background — sits behind everything */}
    <span
      aria-hidden="true"
      className="absolute left-0 top-1/2 -translate-y-1/2 h-14 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 ease-out w-14 md:w-16 group-hover:w-full"
      style={{ zIndex: 0 }}
    />
    {/* Circle icon (always visible) */}
    <span className="relative z-10 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-black transition-transform duration-500 group-hover:scale-100">
      <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5" />
    </span>
    {/* Text */}
    <span className="relative z-10 pl-4 pr-6 md:pr-8 text-white font-display text-base md:text-lg font-medium whitespace-nowrap">
      Read my resume
    </span>
  </a>
);

const ExperiencePage = () => {
  const header = (
    <PageHeader rightSlot={<ResumeCTA />}>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
        Work experience
      </h1>
      <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
        A decade-long journey designing executive narratives, investor materials,
        and brand systems for some of the most demanding companies in the world.
      </p>
    </PageHeader>
  );

  return (
    <PageLayout header={header}>
      <div className="pt-12 md:pt-16 pb-12 md:pb-16">
        <WorkExperienceSection />
      </div>
    </PageLayout>
  );
};

export default ExperiencePage;
