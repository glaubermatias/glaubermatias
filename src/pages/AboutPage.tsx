import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import glauberAboutHeader from '@/assets/glauber-about-header.jpg';
import smileIcon from '@/assets/smile-icon.png';
import beyond01 from '@/assets/beyond-work/01.jpeg';
import beyond02 from '@/assets/beyond-work/02.jpeg';
import beyond03 from '@/assets/beyond-work/03.jpeg';
import beyond04 from '@/assets/beyond-work/04.jpg';
import beyond05 from '@/assets/beyond-work/05.jpeg';
import beyond06 from '@/assets/beyond-work/06.jpeg';
import beyond07 from '@/assets/beyond-work/07.jpeg';
import beyond08 from '@/assets/beyond-work/08.jpg';
import beyond09 from '@/assets/beyond-work/09.jpg';
import beyond10 from '@/assets/beyond-work/10.jpeg';

// Inject <link rel="preload" as="image"> as early as possible (module eval time)
// so the browser starts fetching the hero assets in parallel with the JS chunk.
if (typeof document !== 'undefined') {
  const preloads: Array<[string, string]> = [
    [glauberAboutHeader, 'image/jpeg'],
    [smileIcon, 'image/png'],
  ];
  preloads.forEach(([href, type]) => {
    if (document.head.querySelector(`link[rel="preload"][href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    link.type = type;
    (link as HTMLLinkElement & { fetchPriority?: string }).fetchPriority = 'high';
    document.head.appendChild(link);
  });
}

// Side menu (Skills removed).
const sections = [
  { id: 'fun-facts', label: 'Fun facts' },
  { id: 'beyond-work', label: 'Beyond work' },
];

const funFacts = [
  {
    tag: 'FAVORITE FOOD',
    title: 'Japanese',
    desc: 'I just love eating sushi, sashimi, temaki... you name it.',
    image: beyond01,
  },
  {
    tag: 'FAVORITE SINGER',
    title: 'Taylor Swift',
    desc: "It's a tough call between her, Beyoncé, and P!nk, but her eras are just everything.",
    image: beyond03,
  },
  {
    tag: 'FAVORITE PLACE',
    title: 'Fernando de Noronha',
    desc: "There's something about the nature and close contact with wildlife that sets this place apart.",
    image: beyond10,
  },
  {
    tag: 'FAVORITE SHOW',
    title: 'Modern Family',
    desc: 'The ultimate comfort watch that never fails to fill me with joy.',
    image: beyond04,
  },
  {
    tag: 'FAVORITE MOVIE',
    title: 'White Chicks',
    desc: 'Can we talk about guilty pleasures? Because I absolutely love a good trashy comedy.',
    image: beyond08,
  },
  {
    tag: 'FAVORITE SPORT',
    title: 'Open water swimming',
    desc: 'The freedom of connecting with the ocean takes me somewhere else entirely.',
    image: beyond02,
  },
];


const beyondWorkPhotos = [
  beyond01,
  beyond02,
  beyond03,
  beyond04,
  beyond05,
  beyond06,
  beyond07,
  beyond08,
  beyond09,
  beyond10,
];

const SideMenu = () => (
  <aside className="lg:col-span-3 hidden lg:block">
    <div className="sticky top-32">
      <h3 className="font-display font-semibold text-2xl text-black mb-6">
        Get to know me
      </h3>
      <nav className="flex flex-col border-t border-foreground/15">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="flex items-center justify-between py-3 text-base text-foreground/60 hover:text-black transition-colors border-b border-foreground/15 group"
          >
            <span>{s.label}</span>
            <Plus className="w-4 h-4 text-foreground/40 group-hover:text-black transition-colors" />
          </a>
        ))}
      </nav>
    </div>
  </aside>
);

const BeyondWorkGallery = () => {
  const [active, setActive] = useState(0);
  const total = beyondWorkPhotos.length;
  const go = (dir: 1 | -1) => setActive((p) => (p + dir + total) % total);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-7 relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
        <motion.img
          key={active}
          src={beyondWorkPhotos[active]}
          alt={`Personal moment ${active + 1}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <button
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/50 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="md:col-span-5 grid grid-cols-2 gap-3 content-start">
        {beyondWorkPhotos
          .map((src, idx) => ({ src, idx }))
          .filter((x) => x.idx !== active)
          .slice(0, 6)
          .map(({ src, idx }) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className="aspect-[4/3] overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10 hover:ring-foreground/40 transition"
            >
              <img src={src} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
      </div>
    </div>
  );
};

const AboutPage = () => {
  const header = (
    <PageHeader
      flushRight
      rightSlot={
        <img
          src={glauberAboutHeader}
          alt="Glauber Matias"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="h-full w-auto max-w-none object-contain object-bottom block"
        />
      }
    >
      <img
        src={smileIcon}
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        className="w-10 h-10 md:w-12 md:h-12 mb-4 object-contain"
      />
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
        Glauber Matias
      </h1>
      <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
        A passionate Presentation Designer from Brazil
      </p>
    </PageHeader>
  );

  return (
    <PageLayout header={header}>
      <main className="pt-16 md:pt-24 pb-24">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
            {/* Left — Content */}
            <div className="lg:col-span-9 space-y-24 min-w-0">
              {/* About paragraphs */}
              <section id="about" className="scroll-mt-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 text-lg text-foreground/80 leading-relaxed max-w-3xl"
                >
                  <p>
                    I'm Glauber, a presentation designer who spent the last seven
                    years turning dense, complicated ideas into visual stories
                    people actually want to listen to. From C-suite boardrooms to
                    investor pitches, I help leaders communicate with the kind of
                    clarity that drives decisions.
                  </p>
                  <p>
                    My path into design wasn't linear — and I think that's exactly
                    what makes my work different. I obsess over narrative structure
                    as much as typography, and I treat every slide as a chance to
                    earn (and keep) the audience's attention.
                  </p>
                  <p>
                    Outside of decks and frameworks, I'm a lifelong learner: a
                    curious traveler, a stubborn home cook, and someone who believes
                    that the best ideas often come from the most unexpected places.
                  </p>
                </motion.div>
              </section>
            </div>

            {/* Right — Sticky side menu */}
            <SideMenu />
          </div>
        </div>

        {/* Fun facts — full-width container aligned with the floating nav
            (max-w 1400px, px 8/16/24) so left/right edges match the GM logo
            and the Contact button. 6 cards in a 3-column grid. */}
        <section id="fun-facts" className="scroll-mt-32 mt-24">
          <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">
              Fun facts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
              {funFacts.map((fact) => (
                <motion.article
                  key={fact.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-foreground/10 mb-4 w-full">
                    <span className="absolute top-5 left-5 inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[0.65rem] tracking-[0.2em] uppercase text-black font-medium">
                      {fact.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-1">{fact.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{fact.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Beyond work — full-width container that mirrors the floating nav. */}
        <section id="beyond-work" className="scroll-mt-32 mt-24">
          <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Beyond work
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              What inspires me when I log off :)
            </p>
            <BeyondWorkGallery />
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default AboutPage;
