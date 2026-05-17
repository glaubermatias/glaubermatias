import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import WorkExperienceSection from '@/components/WorkExperienceSection';

/**
 * CTA design:
 *  - Default: liquid-glass pill is visible to the RIGHT of a white circle (with arrow).
 *  - Hover: the white circle expands to the right, filling the entire pill.
 */
const ResumeCTA = () => (
  <a
    href="#experience"
    className="group relative inline-flex items-center isolate h-14 md:h-16"
    aria-label="Read my CV"
  >
    {/* Liquid-glass pill (always visible) */}
    <span
      aria-hidden="true"
      className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-colors duration-500"
    />
    {/* White expanding fill — inset slightly so the liquid-glass pill is always visible as a thin outline */}
    <span
      aria-hidden="true"
      className="absolute top-1 bottom-1 left-1 rounded-full bg-white transition-all duration-500 ease-out w-12 md:w-14 group-hover:w-[calc(100%-0.5rem)]"
    />
    {/* Arrow icon — sits over the white area */}
    <span className="relative z-10 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 text-black">
      <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5" />
    </span>
    {/* Label — white by default, turns black on hover when fill takes over */}
    <span className="relative z-10 pl-4 pr-6 md:pl-5 md:pr-8 font-display text-base md:text-lg font-medium whitespace-nowrap text-white transition-colors duration-500 group-hover:text-black">
      Read my CV
    </span>
  </a>
);

const ExperiencePage = () => {
  const header = (
    <PageHeader rightSlot={<ResumeCTA />}>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
        Work experience
      </h1>
      <p className="text-base md:text-lg max-w-2xl text-white/80">
        A journey through my professional career
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
