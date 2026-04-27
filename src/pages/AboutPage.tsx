import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import glauberAboutHeader from '@/assets/glauber-about-header.jpg';
import glauberPortrait from '@/assets/glauber-portrait.png';
import glauberPhoto from '@/assets/glauber-photo.jpg';

// Side menu (no "About me" — first scroll target is fun-facts).
const sections = [
  { id: 'fun-facts', label: 'Fun facts' },
  { id: 'skills', label: 'Skills' },
  { id: 'beyond-work', label: 'Beyond work' },
];

const funFacts = [
  {
    tag: 'FAVORITE HOBBIE',
    title: 'Espresso enthusiast',
    desc: 'I have strong opinions about brew ratios, bean origins and the perfect crema.',
    image: glauberPhoto,
  },
  {
    tag: 'FAVORITE FOOD',
    title: 'Lo-fi addict',
    desc: "I can't design without a steady stream of mellow beats running in the background.",
    image: glauberPortrait,
  },
  {
    tag: 'FAVORITE MOVIE',
    title: 'Brazilian abroad',
    desc: 'Carioca soul, Lisbon-bound. Always chasing good light, good food and new perspectives.',
    image: glauberPhoto,
  },
  {
    tag: 'FAVORITE SINGER',
    title: 'Book hoarder',
    desc: 'My to-read pile grows faster than I can possibly keep up with — and I love it.',
    image: glauberPortrait,
  },
];

const featuredSkills = [
  {
    title: 'Executive storytelling',
    desc: 'Translating complex business narratives into decks that earn attention and drive decisions.',
  },
  {
    title: 'Visual systems',
    desc: 'Building scalable templates and design tokens so teams stay on-brand without slowing down.',
  },
  {
    title: 'Data visualization',
    desc: 'Turning dense numbers into charts and visuals that make the insight obvious.',
  },
  {
    title: 'Keynote design',
    desc: 'Crafting stage-ready slides that amplify the speaker rather than competing with them.',
  },
];

const allCapabilities = [
  'Pitch decks', 'Keynote design', 'Data visualization', 'Template systems',
  'Brand storytelling', 'Visual hierarchy', 'Slide narratives', 'Workshops',
  'Iconography', 'Motion basics', 'Typography', 'Information design',
];

const beyondWorkPhotos = [
  glauberPhoto,
  glauberPortrait,
  glauberAboutHeader,
  glauberPhoto,
  glauberPortrait,
  glauberAboutHeader,
  glauberPhoto,
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
            className="block text-left py-3 text-base text-foreground/60 hover:text-black transition-colors border-b border-foreground/15"
          >
            {s.label}
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
      {/* Featured */}
      <div className="md:col-span-8 relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
        <motion.img
          key={active}
          src={beyondWorkPhotos[active]}
          alt={`Personal moment ${active + 1}`}
          className="w-full h-full object-cover absolute inset-0"
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

      {/* Thumbnails (skip the active one to keep 6 visible if total === 7) */}
      <div className="md:col-span-4 grid grid-cols-3 md:grid-cols-2 gap-3">
        {beyondWorkPhotos
          .map((src, idx) => ({ src, idx }))
          .filter((x) => x.idx !== active)
          .slice(0, 6)
          .map(({ src, idx }) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className="aspect-square overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10 hover:ring-foreground/40 transition"
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
          className="h-full w-auto object-cover object-bottom block"
        />
      }
    >
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left — Content */}
            <div className="lg:col-span-9 space-y-24">
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

              {/* Fun facts — card with image, tag and caption */}
              <section id="fun-facts" className="scroll-mt-32">
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">
                  Fun facts
                </h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  {funFacts.map((fact) => (
                    <motion.article
                      key={fact.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted mb-4">
                        <img
                          src={fact.image}
                          alt={fact.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-5 left-5 inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[0.65rem] tracking-[0.2em] uppercase text-black font-medium">
                          {fact.tag}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-1">{fact.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{fact.desc}</p>
                    </motion.article>
                  ))}
                </div>
              </section>

              {/* Skills — 4 featured + all capabilities list */}
              <section id="skills" className="scroll-mt-32">
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">
                  Skills
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                  {featuredSkills.map((s) => (
                    <div
                      key={s.title}
                      className="rounded-2xl border border-foreground/10 bg-white/60 p-6 hover:border-foreground/30 transition-colors h-full"
                    >
                      <h3 className="font-display text-lg lg:text-xl font-semibold mb-2">
                        {s.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    All capabilities
                  </h4>
                  <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/80">
                    {allCapabilities.map((cap, idx) => (
                      <li key={cap} className="flex items-center gap-3">
                        {idx > 0 && <span className="text-foreground/20">·</span>}
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Beyond work — featured + thumbnails gallery */}
              <section id="beyond-work" className="scroll-mt-32">
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
                  Beyond work
                </h2>
                <p className="text-base text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                  A few snapshots from outside the studio — travels, hobbies,
                  and the small moments that keep me inspired.
                </p>
                <BeyondWorkGallery />
              </section>
            </div>

            {/* Right — Sticky side menu */}
            <SideMenu />
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default AboutPage;
