import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import glauberPortrait from '@/assets/glauber-portrait.png';
import glauberPhoto from '@/assets/glauber-photo.jpg';

const sections = [
  { id: 'about', label: 'About me' },
  { id: 'fun-facts', label: 'Fun facts' },
  { id: 'skills', label: 'Skills' },
  { id: 'beyond-work', label: 'Beyond work' },
];

const funFacts = [
  { emoji: '☕', title: 'Espresso enthusiast', desc: 'I have strong opinions about brew ratios and bean origins.' },
  { emoji: '🎧', title: 'Lo-fi addict', desc: "I can't design without a steady stream of mellow beats." },
  { emoji: '🌎', title: 'Brazilian abroad', desc: 'Carioca soul, Lisbon-bound. Always chasing good light and good food.' },
  { emoji: '📚', title: 'Book hoarder', desc: 'My to-read pile grows faster than I can possibly keep up with.' },
];

const skills = [
  'Pitch decks', 'Keynote design', 'Data visualization', 'Template systems',
  'Brand storytelling', 'Visual hierarchy', 'Slide narratives', 'Workshops',
];

const personalPhotos = [
  glauberPhoto,
  glauberPortrait,
  glauberPhoto,
];

const AboutPage = () => {
  const header = (
    <PageHeader
      flushRight
      rightSlot={
        <img
          src={glauberPortrait}
          alt="Glauber Matias"
          className="h-full w-auto object-cover object-top"
          style={{ maxHeight: '420px' }}
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

              {/* Fun facts */}
              <section id="fun-facts" className="scroll-mt-32">
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">
                  Fun facts
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {funFacts.map((fact) => (
                    <motion.div
                      key={fact.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-muted rounded-[1.5rem] p-6"
                    >
                      <div className="text-3xl mb-3">{fact.emoji}</div>
                      <h3 className="font-display text-lg font-semibold mb-1">{fact.title}</h3>
                      <p className="text-sm text-muted-foreground">{fact.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section id="skills" className="scroll-mt-32">
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-5 py-2.5 rounded-full border border-foreground/15 text-sm text-foreground/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Beyond work — personal photos */}
              <section id="beyond-work" className="scroll-mt-32">
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">
                  Beyond work
                </h2>
                <p className="text-base text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                  A few snapshots from outside the studio — travels, hobbies,
                  and the small moments that keep me inspired.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {personalPhotos.map((photo, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted"
                    >
                      <img
                        src={photo}
                        alt={`Personal moment ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right — Sticky side menu */}
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-32">
                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Get to know me
                </h3>
                <nav className="flex flex-col gap-3">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="text-base text-foreground/70 hover:text-foreground transition-colors border-l-2 border-transparent hover:border-foreground pl-3"
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default AboutPage;
