import { ArrowDown } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import WorkExperienceSection from '@/components/WorkExperienceSection';

const ExperiencePage = () => {
  const header = (
    <PageHeader
      rightSlot={
        <a
          href="#experience"
          className="group relative inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-white text-black hover:bg-[#e85102] hover:text-white transition-colors duration-500"
          aria-label="Read it — jump to experience"
        >
          <span className="font-display text-lg md:text-xl font-semibold flex items-center gap-2">
            Read it
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </span>
        </a>
      }
    >
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
      <div className="pt-12 md:pt-16 pb-32">
        <WorkExperienceSection />
      </div>
    </PageLayout>
  );
};

export default ExperiencePage;
