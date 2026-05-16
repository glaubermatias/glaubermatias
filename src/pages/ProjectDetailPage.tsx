import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import { getProjectById, getRelatedProjects, ProjectData, ProcessImage } from '@/data/projects';

/* ------------------------------------------------------------------ */
/* Related project card (footer)                                       */
/* ------------------------------------------------------------------ */
const RelatedProjectCard = ({ project }: { project: ProjectData }) => {
  return (
    <Link
      to={`/${project.id}`}
      className="group block overflow-hidden rounded-lg border border-foreground/10 bg-background"
    >
      <div className="overflow-hidden bg-muted aspect-[16/9]">
        <img
          src={project.images[0]}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-5 space-y-1.5">
        {project.cardCategory && (
          <p className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground/80 font-sans">
            {project.cardCategory}
          </p>
        )}
        <h4 className="font-display text-xl font-semibold text-foreground">
          {project.title}
        </h4>
        {(project.cardDescription || project.description) && (
          <p className="font-sans text-sm text-muted-foreground leading-snug line-clamp-2">
            {project.cardDescription || project.description}
          </p>
        )}
      </div>
    </Link>
  );
};

/* ------------------------------------------------------------------ */
/* Lightbox modal (used by Bento gallery)                              */
/* ------------------------------------------------------------------ */
const Lightbox = ({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: ProcessImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const current = images[index];

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 text-white/80 hover:text-white p-3"
        aria-label="Previous"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 text-white/80 hover:text-white p-3"
        aria-label="Next"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="w-[90vw] max-w-[1400px] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full aspect-[16/9] bg-black/40 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={current.src}
            alt={current.caption || ''}
            className="w-full h-full object-cover"
          />
        </div>
        {current.caption && (
          <p className="text-white/80 text-sm md:text-base text-center max-w-2xl px-4">
            {current.caption}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Bento grid (process)                                                */
/* ------------------------------------------------------------------ */
/**
 * Adaptive bento patterns. Each entry tiles to a perfect rectangle
 * (no holes), with the column count and per-tile spans tuned to the
 * number of images.
 */
type BentoLayout = { cols: string; tiles: string[] };

const BENTO_LAYOUTS: Record<number, BentoLayout> = {
  1: {
    cols: 'md:grid-cols-1',
    tiles: ['md:col-span-1 md:row-span-2'],
  },
  2: {
    cols: 'md:grid-cols-2',
    tiles: ['md:col-span-1 md:row-span-2', 'md:col-span-1 md:row-span-2'],
  },
  3: {
    // 1 tall feature + 2 stacked  → 3 cols × 2 rows
    cols: 'md:grid-cols-3',
    tiles: [
      'md:col-span-2 md:row-span-2',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
    ],
  },
  4: {
    // 2 × 2
    cols: 'md:grid-cols-2',
    tiles: [
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
    ],
  },
  5: {
    // 4 cols × 2 rows: big feature + 4 small
    cols: 'md:grid-cols-4',
    tiles: [
      'md:col-span-2 md:row-span-2',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
    ],
  },
  6: {
    // 4 cols × 4 rows bento
    cols: 'md:grid-cols-4',
    tiles: [
      'md:col-span-2 md:row-span-2',
      'md:col-span-2 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-2 md:row-span-1',
      'md:col-span-2 md:row-span-2',
    ],
  },
  7: {
    // 4 cols × 3 rows
    cols: 'md:grid-cols-4',
    tiles: [
      'md:col-span-2 md:row-span-2',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-2 md:row-span-1',
      'md:col-span-2 md:row-span-1',
    ],
  },
  8: {
    // 4 cols × 2 rows
    cols: 'md:grid-cols-4',
    tiles: Array(8).fill('md:col-span-1 md:row-span-1'),
  },
};

const getBentoLayout = (count: number): BentoLayout => {
  if (count <= 0) return { cols: 'md:grid-cols-1', tiles: [] };
  if (BENTO_LAYOUTS[count]) return BENTO_LAYOUTS[count];
  // Fallback for >8: tile uniformly in 4 cols (no holes if count % 4 === 0,
  // otherwise extend the last row with wider tiles).
  const tiles: string[] = [];
  const remainder = count % 4;
  const fullRows = Math.floor(count / 4);
  for (let i = 0; i < fullRows * 4; i++) tiles.push('md:col-span-1 md:row-span-1');
  if (remainder === 1) tiles.push('md:col-span-4 md:row-span-1');
  else if (remainder === 2) tiles.push('md:col-span-2 md:row-span-1', 'md:col-span-2 md:row-span-1');
  else if (remainder === 3) {
    tiles.push('md:col-span-2 md:row-span-1', 'md:col-span-1 md:row-span-1', 'md:col-span-1 md:row-span-1');
  }
  return { cols: 'md:grid-cols-4', tiles };
};

const BentoGrid = ({
  images,
  onOpen,
}: {
  images: ProcessImage[];
  onOpen: (i: number) => void;
}) => {
  // Uniform 4-column × 2-row grid. Row height matches the previous featured
  // tile height (2 × 200px + gap) so the overall block stays the same size.
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(180px,1fr)] md:auto-rows-[minmax(200px,1fr)] gap-3 md:gap-4">
      {images.map((img, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onOpen(i)}
          className="group relative overflow-hidden rounded-md bg-muted"
        >
          <img
            src={img.src}
            alt={img.caption || ''}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {img.caption && (
            <>
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm md:text-[15px] leading-snug text-left">
                  {img.caption}
                </p>
              </div>
            </>
          )}
        </button>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Before / After comparison slider                                    */
/* ------------------------------------------------------------------ */
const BeforeAfterSlider = ({ before, after }: { before: string; after: string }) => {
  const [pos, setPos] = useState(50); // %
  const [dragging, setDragging] = useState(false);
  const [hinted, setHinted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sweep the divider once when the section enters the viewport,
  // a subtle horizontal nudge to hint that it's interactive.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || hinted) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hinted && !dragging) {
            setHinted(true);
            const keyframes = [50, 56, 44, 52, 48, 50];
            keyframes.forEach((v, i) => {
              setTimeout(() => {
                setPos((cur) => (dragging ? cur : v));
              }, i * 260);
            });
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hinted, dragging]);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove as EventListener);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove as EventListener, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove as EventListener);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove as EventListener);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging]);

  const startDrag = (clientX: number) => {
    setHinted(true);
    setDragging(true);
    updateFromClientX(clientX);
  };

  // No transition during drag (instant follow). Smooth ease for the intro sweep.
  const sharedTransition = dragging
    ? 'none'
    : 'clip-path 260ms cubic-bezier(0.4, 0, 0.2, 1), left 260ms cubic-bezier(0.4, 0, 0.2, 1)';

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden rounded-md bg-muted select-none touch-none"
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
    >
      <img
        src={after}
        alt="After"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        draggable={false}
      />
      <img
        src={before}
        alt="Before"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - pos}% 0 0)`,
          transition: sharedTransition,
        }}
        draggable={false}
      />

      <span className="absolute top-4 left-4 z-10 text-[10px] tracking-[0.22em] uppercase text-white bg-black/45 backdrop-blur-sm rounded px-2 py-1 pointer-events-none">
        Before
      </span>
      <span className="absolute top-4 right-4 z-10 text-[10px] tracking-[0.22em] uppercase text-white bg-black/45 backdrop-blur-sm rounded px-2 py-1 pointer-events-none">
        After
      </span>

      <div
        className="absolute top-0 bottom-0 z-20"
        style={{ left: `${pos}%`, transition: sharedTransition }}
      >
        <div className="absolute top-0 bottom-0 -translate-x-1/2 w-[3px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.45)]" />
        <button
          type="button"
          aria-label="Drag to compare before and after"
          onMouseDown={(e) => { e.stopPropagation(); startDrag(e.clientX); }}
          onTouchStart={(e) => { e.stopPropagation(); startDrag(e.touches[0].clientX); }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-foreground shadow-lg flex items-center justify-center cursor-ew-resize"
          style={hinted && !dragging ? { animation: 'ba-teeter 900ms ease-in-out 1' } : undefined}
        >
          <ChevronLeft className="w-4 h-4 -mr-1" strokeWidth={2} />
          <ChevronRight className="w-4 h-4 -ml-1" strokeWidth={2} />
        </button>
      </div>
      <style>{`@keyframes ba-teeter { 0%,100% { transform: translate(-50%,-50%) rotate(0deg);} 25% { transform: translate(-50%,-50%) rotate(-12deg);} 75% { transform: translate(-50%,-50%) rotate(12deg);} }`}</style>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Center-stage carousel (live event)                                  */
/* ------------------------------------------------------------------ */
const CenterStageCarousel = ({ images }: { images: string[] }) => {
  const [idx, setIdx] = useState(0);
  const total = images.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  if (total === 0) return null;

  // Layout config — fixed small gap regardless of viewport.
  const CENTER_W = 64; // % of container width
  const SIDE_W = 16;   // % of container width
  const GAP = 1.2;     // % gap between center and adjacent

  const slidePos = (i: number) => {
    let offset = i - idx;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    if (offset === 0) {
      return { left: '50%', width: `${CENTER_W}%`, x: '-50%', opacity: 1, scale: 1, z: 10 };
    }
    if (offset === -1) {
      return {
        left: `${50 - CENTER_W / 2 - GAP - SIDE_W / 2}%`,
        width: `${SIDE_W}%`,
        x: '-50%',
        opacity: 0.45,
        scale: 0.92,
        z: 1,
      };
    }
    if (offset === 1) {
      return {
        left: `${50 + CENTER_W / 2 + GAP + SIDE_W / 2}%`,
        width: `${SIDE_W}%`,
        x: '-50%',
        opacity: 0.45,
        scale: 0.92,
        z: 1,
      };
    }
    return {
      left: offset < 0 ? '-30%' : '130%',
      width: `${SIDE_W}%`,
      x: '-50%',
      opacity: 0,
      scale: 0.85,
      z: 0,
    };
  };

  return (
    <div className="relative w-full">
      <div className="relative h-[55vh] md:h-[68vh] overflow-hidden">
        {images.map((src, i) => {
          const p = slidePos(i);
          return (
            <motion.div
              key={i}
              className="absolute top-1/2 overflow-hidden rounded-md bg-muted"
              style={{ zIndex: p.z, height: '100%' }}
              initial={false}
              animate={{
                left: p.left,
                width: p.width,
                x: p.x,
                y: '-50%',
                opacity: p.opacity,
                scale: p.scale,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 32, mass: 0.9 }}
            >
              <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
            </motion.div>
          );
        })}

        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-foreground/20 bg-background/70 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-foreground/20 bg-background/70 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to ${i + 1}`}
              className={`h-[2px] rounded-full transition-all duration-300 ${
                i === idx ? 'bg-foreground w-8' : 'bg-foreground/25 w-4 hover:bg-foreground/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Hero carousel (initial visual delivery)                             */
/* ------------------------------------------------------------------ */
const HeroCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [idx, setIdx] = useState(0);
  const total = images.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  if (total === 0) return null;

  return (
    <div className="relative w-full">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-muted">
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`${title} – ${idx + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white/90 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.25} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white/90 hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.25} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to ${i + 1}`}
              className={`h-[2px] rounded-full transition-all duration-300 ${
                i === idx ? 'bg-foreground w-8' : 'bg-foreground/25 w-4 hover:bg-foreground/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* MAIN PAGE                                                            */
/* ------------------------------------------------------------------ */
const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useLanguage();
  const project = projectId ? getProjectById(projectId) : null;
  const relatedProjects = projectId ? getRelatedProjects(projectId, 3) : [];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const getCategoryLabel = (category: string) => {
    const map: Record<string, string> = {
      'executive-decks': t.work.categories.executiveDecks,
      'templates': t.work.categories.templates,
      'tech-events': t.work.categories.techEvents,
      'hr-initiatives': t.work.categories.hrInitiatives,
      'side-projects': t.work.categories.sideProjects,
    };
    return map[category] || category;
  };

  // Derived/fallback content so all existing projects still render gracefully
  const derived = useMemo(() => {
    if (!project) return null;
    const headerImage = project.headerImage || project.images[0];
    const heroCarousel = project.images.slice(0, Math.min(project.images.length, 4));
    const processImages: ProcessImage[] =
      project.processImages && project.processImages.length > 0
        ? project.processImages
        : project.images.map((src) => ({ src }));
    const liveImages = project.liveImages && project.liveImages.length > 0
      ? project.liveImages
      : project.images;
    const meaningfulTitle =
      project.meaningfulTitle ||
      project.cardDescription ||
      project.description;
    const tldr = project.tldr || project.overview || project.description;
    const context = project.context || project.overview || '';
    const challenge = project.challenge || '';
    const strategy = project.strategy || project.solution || '';
    const tradeoffs =
      project.tradeoffs ||
      'Tight delivery windows meant prioritizing clarity over visual experimentation in some areas. Reusable systems were favored over bespoke one-offs to keep the work scalable across future iterations.';
    const closingParagraph =
      project.closingParagraph ||
      (project.results && project.results.length > 0
        ? project.results.join(' ')
        : '');
    const skills = project.skills && project.skills.length > 0
      ? project.skills
      : ['Visual Design', 'Storytelling', 'Information Architecture'];
    const role = project.role || 'Lead Designer';
    const stakeholdersByCategory: Record<string, string> = {
      'executive-decks': 'Executive leadership, C-suite',
      'tech-events': 'Engineering leadership, Event ops',
      'hr-initiatives': 'People team, Program leads',
      'templates': 'Design ops, Internal teams',
      'side-projects': 'Self-initiated',
    };
    const stakeholders =
      project.stakeholders ||
      stakeholdersByCategory[project.category] ||
      'Cross-functional stakeholders';
    const tools =
      project.tools ||
      (project.category === 'tech-events'
        ? 'Figma, Keynote, Notion'
        : 'Figma, Keynote, PowerPoint');
    const duration = project.duration || '—';
    // Bento always shows 8 tiles; if fewer source images exist, cycle through them.
    const bentoImages: ProcessImage[] = (() => {
      if (processImages.length === 0) return [];
      const target = 8;
      const out: ProcessImage[] = [];
      for (let i = 0; i < target; i++) out.push(processImages[i % processImages.length]);
      return out;
    })();
    // Before / After: explicit field wins; otherwise fall back to first vs.
    // last process image when at least 2 are available.
    let beforeAfter: { before: string; after: string } | null = null;
    if (project.beforeAfter) {
      beforeAfter = project.beforeAfter;
    } else if (processImages.length >= 2) {
      beforeAfter = {
        before: processImages[0].src,
        after: processImages[processImages.length - 1].src,
      };
    }
    return {
      headerImage,
      heroCarousel,
      processImages,
      bentoImages,
      beforeAfter,
      liveImages,
      meaningfulTitle,
      tldr,
      context,
      challenge,
      strategy,
      tradeoffs,
      closingParagraph,
      skills,
      role,
      stakeholders,
      tools,
      duration,
    };
  }, [project]);

  if (!project || !derived) {
    return (
      <PageLayout>
        <main className="pt-28 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-display text-4xl mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Work
            </Link>
          </div>
        </main>
      </PageLayout>
    );
  }

  const bigNumbers = project.bigNumbers || [];

  return (
    <PageLayout>
      {/* ============================================================= */}
      {/* 1. HEADER (Imersão) - background photo, H1 left aligned        */}
      {/* ============================================================= */}
      <header
        data-nav-theme="dark"
        className="relative w-full overflow-hidden text-white"
        style={{ minHeight: '420px' }}
      >
        <img
          src={derived.headerImage}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 min-h-[420px] flex flex-col justify-end pt-32 md:pt-36 pb-12 md:pb-16">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm mb-6 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Work
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight"
          >
            {project.title}
          </motion.h1>
        </div>
      </header>

      <main className="pb-24">
        {/* ============================================================= */}
        {/* 2. OVERVIEW                                                     */}
        {/* ============================================================= */}
        <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-8 md:pt-10">
          {/* Tagline */}
          <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground font-sans">
            {(project.company || project.client)} <span className="mx-2">•</span> {project.year} <span className="mx-2">•</span> {getCategoryLabel(project.category)}
          </p>

          {/* Meaningful title - gray, full content width */}
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-normal mt-6 leading-tight text-[#b7b7b7]">
            {derived.meaningfulTitle}
          </h2>

          {/* TL;DR - full content width */}
          {derived.tldr && (
            <p className="mt-10 text-lg md:text-xl leading-relaxed text-foreground">
              {derived.tldr}
            </p>
          )}

          {/* Metadata + Big Numbers — 50 / 25 / 25, framed by hairlines.
              Floats up on viewport entry. */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 border-t border-b border-foreground/[0.08]"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-12 items-start py-10 md:py-12">
              {/* Metadata - left, 50% */}
              <dl className="md:col-span-2 flex flex-col gap-4">
                {[
                  { label: 'Role', value: derived.role },
                  { label: 'Stakeholders', value: derived.stakeholders },
                  { label: 'Tools', value: derived.tools },
                  { label: 'Duration', value: derived.duration },
                ].map((m) => (
                  <div key={m.label} className="text-sm md:text-[15px] leading-snug text-foreground">
                    <dt className="inline font-semibold">{m.label}:</dt>{' '}
                    <dd className="inline text-muted-foreground">{m.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Big numbers — two slots, 25% each. */}
              {bigNumbers.length > 0 &&
                bigNumbers.slice(0, 2).map((n, i) => (
                  <div key={i} className="md:col-span-1">
                    <p className="text-xs md:text-[13px] tracking-[0.22em] uppercase text-muted-foreground mb-4">
                      {n.label}
                    </p>
                    <p className="font-display text-6xl md:text-7xl font-semibold text-foreground leading-[0.95] tracking-tight">
                      {n.value}
                    </p>
                    {n.description && (
                      <p className="mt-5 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                        {n.description}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        </section>

        {/* ============================================================= */}
        {/* 3. INITIAL CAROUSEL                                            */}
        {/* ============================================================= */}
        <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-12 md:pt-14">
          <HeroCarousel images={derived.heroCarousel} title={project.title} />
        </section>

        {/* ============================================================= */}
        {/* 4. NARRATIVE (Context, Problem, Strategy) - 30/70 asymmetric  */}
        {/* ============================================================= */}
        {(derived.context || derived.challenge || derived.strategy) && (
          <section className="max-w-[845px] mx-auto px-6 md:px-8 pt-14 md:pt-16">
            <div className="space-y-0">
              {[
                { label: 'Context', body: derived.context },
                { label: 'Problem', body: derived.challenge },
                { label: 'Strategy', body: derived.strategy },
              ]
                .filter((b) => b.body)
                .map((block, i) => (
                  <div
                    key={block.label}
                    className={`grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-10 py-8 md:py-10 ${i > 0 ? 'border-t border-foreground/10' : ''}`}
                  >
                    <h3 className="md:col-span-3 font-display text-xl md:text-2xl font-semibold text-foreground">
                      {block.label}
                    </h3>
                    <p className="md:col-span-7 text-base md:text-lg text-muted-foreground leading-relaxed">
                      {block.body}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* ============================================================= */}
        {/* 5. PROCESS - BENTO                                              */}
        {/* ============================================================= */}
        {derived.bentoImages.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-10 md:pt-12">
            <BentoGrid
              images={derived.bentoImages}
              onOpen={(i) => setLightboxIndex(i)}
            />
          </section>
        )}

        {/* ============================================================= */}
        {/* 5b. BEFORE & AFTER COMPARISON                                   */}
        {/* ============================================================= */}
        {derived.beforeAfter && (
          <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-16 md:pt-20">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground text-center mb-8 md:mb-10">
              Before and After
            </h3>
            <BeforeAfterSlider
              before={derived.beforeAfter.before}
              after={derived.beforeAfter.after}
            />
          </section>
        )}

        {/* ============================================================= */}
        {/* 6. TRADE-OFFS & CONSTRAINTS - same layout as narrative         */}
        {/* ============================================================= */}
        <section className="max-w-[845px] mx-auto px-6 md:px-8 pt-14 md:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-10 py-8 md:py-10">
            <h3 className="md:col-span-3 font-display text-xl md:text-2xl font-semibold text-foreground">
              Trade-offs &amp; Constraints
            </h3>
            <p className="md:col-span-7 text-base md:text-lg text-muted-foreground leading-relaxed">
              {derived.tradeoffs}
            </p>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 7. SECOND CAROUSEL (same layout as the first)                  */}
        {/* ============================================================= */}
        {derived.liveImages.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-14 md:pt-16">
            <HeroCarousel images={derived.liveImages} title={project.title} />
          </section>
        )}

        {/* ============================================================= */}
        {/* 8. CLOSING - IMPACT                                            */}
        {/* ============================================================= */}
        <section className="max-w-[1100px] mx-auto px-8 md:px-16 pt-12 md:pt-16 text-center">
          {bigNumbers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 mb-16 max-w-3xl mx-auto">
              {bigNumbers.slice(0, 2).map((n, i) => (
                <div key={i}>
                  <p className="font-display text-6xl md:text-7xl font-semibold text-foreground leading-none tracking-tight">
                    {n.value}
                  </p>
                  <p className="mt-4 text-xs tracking-[0.18em] uppercase text-muted-foreground">
                    {n.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {project.quote && (
            <figure className="my-16 max-w-3xl mx-auto">
              <span className="font-display text-7xl text-primary leading-none block mb-2">"</span>
              <blockquote className="font-display text-2xl md:text-3xl font-normal text-foreground leading-snug italic">
                {project.quote.text}
              </blockquote>
              {(project.quote.author || project.quote.role) && (
                <figcaption className="mt-6 text-sm text-muted-foreground">
                  {project.quote.author}
                  {project.quote.role && <span className="text-muted-foreground/70"> — {project.quote.role}</span>}
                </figcaption>
              )}
            </figure>
          )}

          {derived.closingParagraph && (
            <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-3xl mx-auto">
              {derived.closingParagraph}
            </p>
          )}
        </section>

        {/* ============================================================= */}
        {/* 9. RELATED WORK                                                */}
        {/* ============================================================= */}
        {relatedProjects.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-20 md:pt-24">
            <div className="border-t border-foreground/10 pt-12 md:pt-14">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-10">
                Related work
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {relatedProjects.slice(0, 3).map((p) => (
                  <RelatedProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={derived.processImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() =>
              setLightboxIndex((i) =>
                i === null ? null : (i - 1 + derived.processImages.length) % derived.processImages.length,
              )
            }
            onNext={() =>
              setLightboxIndex((i) =>
                i === null ? null : (i + 1) % derived.processImages.length,
              )
            }
          />
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default ProjectDetailPage;
