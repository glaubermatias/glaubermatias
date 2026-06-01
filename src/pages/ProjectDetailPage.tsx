import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, X, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageLayout from '@/components/PageLayout';
import { getProjectById, getRelatedProjects, ProjectData, ProcessImage } from '@/data/projects';

const EDITORIAL_PLACEHOLDERS = {
  meaningfulTitle: 'Strategic presentation system built to make complex work clear, memorable, and easy to act on.',
  tldr: 'A concise project summary will live here, written in the same editorial tone and visual system as the rest of the portfolio.',
  context: 'Context placeholder: describe the business moment, audience, and conditions that shaped this project.',
  problem: 'Problem placeholder: describe the core communication challenge, risk, or friction the work needed to solve.',
  strategy: 'Strategy placeholder: describe the narrative, design system, and production choices that guided the solution.',
  tradeoffs: 'Trade-offs placeholder: describe the constraints, compromises, and decisions that shaped the final direction.',
  closingParagraph: 'Closing placeholder: summarize the impact of the project and the final takeaway for the audience.',
};

const withPlaceholder = (value: string | undefined, key: keyof typeof EDITORIAL_PLACEHOLDERS) =>
  value && value.trim().length > 0 ? value : EDITORIAL_PLACEHOLDERS[key];

/**
 * Pass-through: render exactly as many tiles as provided. The bento grid
 * layout below adapts dynamically to the array length (no hard-coded slots).
 */
const makeEightTiles = (images: ProcessImage[]) => images;

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
        <h4 className="font-display text-xl font-semibold text-foreground">
          {project.headerTitle}
        </h4>
        <p className="font-display text-base text-secondary leading-snug line-clamp-2">
          {project.meaningfulTitle}
        </p>
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
  title,
  onClose,
  onPrev,
  onNext,
}: {
  images: ProcessImage[];
  index: number;
  title?: string;
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
    // Hide site navigation while the lightbox is open
    const header = document.querySelector('header') as HTMLElement | null;
    const prevDisplay = header?.style.display ?? '';
    if (header) header.style.display = 'none';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (header) header.style.display = prevDisplay;
    };
  }, [onClose, onPrev, onNext]);

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Top bar — title + counter (left) and close (right) */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between gap-4 px-6 md:px-10 pt-6 pb-4 pointer-events-none">
        <div className="min-w-0 flex items-center gap-3 text-white/80 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          {title && (
            <span className="font-display text-sm md:text-base text-white/90 truncate max-w-[60vw]">
              {title}
            </span>
          )}
          <span className="text-xs md:text-sm tabular-nums text-white/60 tracking-[0.18em] uppercase">
            {index + 1} / {images.length}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="pointer-events-auto text-white/80 hover:text-white p-2"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div
        className="w-[92vw] max-w-[1240px] px-5 md:px-12 lg:px-16 pt-40 md:pt-52 pb-28 md:pb-40 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-[16/9]">
          <div className="absolute inset-0 bg-black/40 rounded-md overflow-hidden flex items-center justify-center">
            <img
              src={current.src}
              alt={current.caption || ''}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-white/10 text-white/90 hover:text-white hover:bg-white/20 transition-colors"
            style={{ backdropFilter: 'blur(14px) saturate(160%)', WebkitBackdropFilter: 'blur(14px) saturate(160%)' }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-white/10 text-white/90 hover:text-white hover:bg-white/20 transition-colors"
            style={{ backdropFilter: 'blur(14px) saturate(160%)', WebkitBackdropFilter: 'blur(14px) saturate(160%)' }}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        {current.caption && (
          <p className="text-white/80 text-sm md:text-base text-center max-w-2xl px-4">
            {current.caption}
          </p>
        )}
      </div>
    </div>
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
  const [showTip, setShowTip] = useState(false);
  const hintedRef = useRef(false);
  const draggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);

  // When the section scrolls into view, trigger the handle pulse and a brief
  // "Drag to compare" tooltip — same effect that plays after the user finishes
  // dragging. Tooltip fades after 2s.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          if (hintedRef.current) return;
          hintedRef.current = true;
          setHinted(true);
          setShowTip(true);
          window.setTimeout(() => setShowTip(false), 2000);
          obs.disconnect();
        });
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => { draggingRef.current = dragging; }, [dragging]);

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
    setShowTip(false);
    setDragging(true);
    updateFromClientX(clientX);
  };

  const onHandleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPos((p) => Math.max(0, p - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPos((p) => Math.min(100, p + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPos(100);
    }
  };

  // No transition during drag (instant). Fast subtle ease during the hint.
  const sharedTransition = dragging
    ? 'none'
    : 'clip-path 120ms cubic-bezier(0.4, 0, 0.2, 1), left 120ms cubic-bezier(0.4, 0, 0.2, 1)';

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

        {/* Tooltip — shows once on first viewport entry */}
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="absolute top-1/2 -translate-y-[230%] left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap rounded-full bg-foreground text-background text-[11px] tracking-[0.18em] uppercase px-3 py-1.5 shadow-lg"
              role="status"
            >
              Drag to compare
            </motion.div>
          )}
        </AnimatePresence>

        <button
          ref={handleRef}
          type="button"
          role="slider"
          aria-label="Before and after comparison — drag to compare"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
          tabIndex={0}
          onKeyDown={onHandleKeyDown}
          onMouseDown={(e) => { e.stopPropagation(); startDrag(e.clientX); }}
          onTouchStart={(e) => { e.stopPropagation(); startDrag(e.touches[0].clientX); }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-foreground shadow-lg flex items-center justify-center cursor-ew-resize focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          style={hinted && !dragging ? { animation: 'ba-handle-pulse 1600ms ease-out 1' } : undefined}
        >
          <ChevronLeft className="w-4 h-4 -mr-1" strokeWidth={2} />
          <ChevronRight className="w-4 h-4 -ml-1" strokeWidth={2} />
        </button>
      </div>
      <style>{`@keyframes ba-handle-pulse { 0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.7), 0 10px 25px rgba(0,0,0,0.18);} 70% { box-shadow: 0 0 0 14px rgba(255,255,255,0), 0 10px 25px rgba(0,0,0,0.18);} 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0), 0 10px 25px rgba(0,0,0,0.18);} }`}</style>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Liquid-glass carousel pagination                                    */
/* ------------------------------------------------------------------ */
const LiquidGlassDots = ({
  total,
  idx,
  onSelect,
}: {
  total: number;
  idx: number;
  onSelect: (i: number) => void;
}) => {
  if (total <= 1) return null;
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
      <div
        className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2 py-1"
        style={{ backdropFilter: 'blur(14px) saturate(160%)', WebkitBackdropFilter: 'blur(14px) saturate(160%)' }}
        role="tablist"
        aria-label="Carousel pagination"
      >
        {Array.from({ length: total }).map((_, i) => {
          const active = i === idx;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Slide ${i + 1} of ${total}`}
              onClick={() => onSelect(i)}
              className="group relative grid place-items-center w-4 h-4 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  active
                    ? 'w-2 h-2 bg-white'
                    : 'w-1.5 h-1.5 bg-white/40 group-hover:bg-white/70'
                }`}
              />
            </button>
          );
        })}
      </div>
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
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null || total <= 1) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

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
      <div className="relative h-[55vh] md:h-[68vh] overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 transition-colors"
              style={{ backdropFilter: 'blur(14px) saturate(160%)', WebkitBackdropFilter: 'blur(14px) saturate(160%)' }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 transition-colors"
              style={{ backdropFilter: 'blur(14px) saturate(160%)', WebkitBackdropFilter: 'blur(14px) saturate(160%)' }}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </>
        )}

        <LiquidGlassDots total={total} idx={idx} onSelect={setIdx} />
      </div>
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
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null || total <= 1) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  return (
    <div className="relative w-full">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-muted" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`${title} – ${idx + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center border border-white/20 bg-white/10 text-white/90 hover:text-white hover:bg-white/20 transition-colors"
              style={{ backdropFilter: 'blur(14px) saturate(160%)', WebkitBackdropFilter: 'blur(14px) saturate(160%)' }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center border border-white/20 bg-white/10 text-white/90 hover:text-white hover:bg-white/20 transition-colors"
              style={{ backdropFilter: 'blur(14px) saturate(160%)', WebkitBackdropFilter: 'blur(14px) saturate(160%)' }}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </>
        )}

        <LiquidGlassDots total={total} idx={idx} onSelect={setIdx} />
      </div>
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

  const [lightbox, setLightbox] = useState<{ images: ProcessImage[]; title: string; index: number } | null>(null);
  const [activeGalleryId, setActiveGalleryId] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    setActiveGalleryId(null);
  }, [projectId]);

  const handleCopyEmail = async () => {
    const email = 'glauber.matias.ismart@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2000);
  };

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
    // STRICT: every editorial field reads ONLY its own dedicated source.
    // No cross-block fallbacks — this is what guarantees that editing one
    // text in Visual Edits never affects another block on the page.
    const headerTitle = project.headerTitle ?? project.title;
    const galleryLabel = project.galleryLabel ?? headerTitle;
    const meaningfulTitle = withPlaceholder(project.meaningfulTitle, 'meaningfulTitle');
    const tldr = withPlaceholder(project.tldr, 'tldr');
    const context = withPlaceholder(project.context, 'context');
    const problem = withPlaceholder(project.problem, 'problem');
    const strategy = withPlaceholder(project.strategy, 'strategy');
    const tradeoffs = withPlaceholder(project.tradeoffs, 'tradeoffs');
    const closingParagraph = withPlaceholder(project.closingParagraph, 'closingParagraph');
    const skills = project.skills && project.skills.length > 0
      ? project.skills
      : [];
    const role = project.role ?? '';
    const stakeholders = project.stakeholders ?? '';
    const tools = project.tools ?? '';
    const duration = project.duration ?? '';

    const bentoGalleries = project.bentoGalleries && project.bentoGalleries.length > 0
      ? project.bentoGalleries.map((gallery) => ({
        id: gallery.id,
        label: gallery.label,
        images: makeEightTiles(gallery.images && gallery.images.length > 0 ? gallery.images : processImages),
      }))
      : [{ id: `${project.id}-gallery`, label: galleryLabel, images: makeEightTiles(processImages) }];
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
      bentoGalleries,
      beforeAfter,
      liveImages,
      headerTitle,
      galleryLabel,
      meaningfulTitle,
      tldr,
      context,
      problem,
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
            {derived.headerTitle}
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

          {/* Meaningful title - slightly larger */}
          <h2 className="font-display text-[1.35rem] md:text-[1.75rem] lg:text-[2.25rem] font-normal mt-6 leading-tight text-[#5a5a5a]">
            {derived.meaningfulTitle}
          </h2>

          {/* TL;DR - full content width */}
          <p className="mt-8 font-sans text-base md:text-lg leading-relaxed text-foreground">
            {derived.tldr}
          </p>

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
                <p className="text-xs md:text-[13px] tracking-[0.22em] uppercase text-muted-foreground mb-0">
                  Overview
                </p>
                <div className="text-sm md:text-[15px] leading-snug text-foreground">
                  <dt className="inline font-semibold">Role:</dt>{' '}
                  <dd className="inline text-muted-foreground">{derived.role}</dd>
                </div>
                <div className="text-sm md:text-[15px] leading-snug text-foreground">
                  <dt className="inline font-semibold">Stakeholders:</dt>{' '}
                  <dd className="inline text-muted-foreground">{derived.stakeholders}</dd>
                </div>
                <div className="text-sm md:text-[15px] leading-snug text-foreground">
                  <dt className="inline font-semibold">Tools:</dt>{' '}
                  <dd className="inline text-muted-foreground">{derived.tools}</dd>
                </div>
                <div className="text-sm md:text-[15px] leading-snug text-foreground">
                  <dt className="inline font-semibold">Duration:</dt>{' '}
                  <dd className="inline text-muted-foreground">{derived.duration}</dd>
                </div>
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
        {/* 3. INITIAL VISUAL — Before/After if available, else carousel  */}
        {/* ============================================================= */}
        <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-12 md:pt-14">
          {derived.beforeAfter ? (
            <BeforeAfterSlider
              before={derived.beforeAfter.before}
              after={derived.beforeAfter.after}
            />
          ) : (
            <HeroCarousel images={derived.heroCarousel} title={project.title} />
          )}
        </section>

        {/* ============================================================= */}
        {/* 4. NARRATIVE (Context, Problem, Strategy) - 30/70 asymmetric  */}
        {/* Always render all three blocks. Each block reads only its own */}
        {/* dedicated field, so editing one never affects another.        */}
        {/* ============================================================= */}
        <section className="max-w-[845px] mx-auto px-6 md:px-8 pt-14 md:pt-16">
          <div className="space-y-0">
            <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-10 py-8 md:py-10">
              <h3 className="md:col-span-3 font-display text-lg md:text-xl font-semibold text-foreground">Context</h3>
              <p className="md:col-span-7 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                {derived.context}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-10 py-8 md:py-10 border-t border-foreground/10">
              <h3 className="md:col-span-3 font-display text-lg md:text-xl font-semibold text-foreground">Problem</h3>
              <p className="md:col-span-7 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                {derived.problem}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-10 py-8 md:py-10 border-t border-foreground/10">
              <h3 className="md:col-span-3 font-display text-lg md:text-xl font-semibold text-foreground">Strategy</h3>
              <p className="md:col-span-7 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                {derived.strategy}
              </p>
            </div>
          </div>
        </section>


        {/* ============================================================= */}
        {/* 5. PROCESS - BENTO (with related-project gallery switcher)     */}
        {/* ============================================================= */}
        {derived.bentoGalleries.length > 0 && (() => {
          // Bento selector pills are project-owned labels. They never read
          // from related projects, title, category, or card fields.
          const galleries = derived.bentoGalleries;
          const activeId = activeGalleryId ?? galleries[0]?.id;
          const active = galleries.find((g) => g.id === activeId) ?? galleries[0];
          return (
            <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-10 md:pt-12">
              {galleries.length > 1 && (
                <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-10">
                  {galleries.map((g) => {
                    const isActive = g.id === active.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setActiveGalleryId(g.id)}
                        className={`relative inline-flex items-center justify-center text-center px-4 py-2.5 rounded-full text-xs md:text-[13px] tracking-[0.12em] uppercase font-sans transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive
                            ? 'text-background'
                            : 'text-foreground hover:text-foreground'
                        }`}
                        aria-pressed={isActive}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="activeGalleryPill"
                            className="absolute inset-0 bg-foreground rounded-full"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <span className="relative z-10 break-words">{g.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              <BentoGrid
                key={active.id}
                images={active.images}
                onOpen={(i) => setLightbox({ images: active.images, title: active.label, index: i })}
              />
            </section>
          );
        })()}



        {/* ============================================================= */}
        {/* 6. TRADE-OFFS & CONSTRAINTS - always rendered                  */}
        {/* ============================================================= */}
        <section className="max-w-[845px] mx-auto px-6 md:px-8 pt-10 md:pt-12">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-10 py-6 md:py-8">
            <h3 className="md:col-span-3 font-display text-lg md:text-xl font-semibold text-foreground">
              Trade-offs &amp; Constraints
            </h3>
            <p className="md:col-span-7 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
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




          {project.quote && (
            <figure className="my-16 max-w-3xl mx-auto">
              <span className="font-display text-7xl text-primary leading-none block mb-2">"</span>
              <blockquote className="font-display text-xl md:text-2xl font-normal text-foreground leading-snug italic">
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

          <p className="font-sans text-base md:text-lg text-foreground leading-relaxed max-w-3xl mx-auto">
            {derived.closingParagraph}
          </p>

        </section>

        {/* ============================================================= */}
        {/* 8b. NDA / CONTACT BLOCK                                        */}
        {/* ============================================================= */}
        <section className="max-w-[845px] mx-auto px-6 md:px-8 pt-16 md:pt-20">
          <div
            className="relative w-full rounded-md overflow-hidden isolate"
            style={{ background: '#f5f5f5' }}
          >
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-12 py-7 md:py-9">
              <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2 leading-tight">
                This project is under NDA
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mb-3 md:mb-4 leading-relaxed">
                Thank you for showing interest in my work. If you'd like to learn more about this project, please reach out!
              </p>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-live="polite"
                className="inline-flex items-center gap-2.5 px-6 md:px-7 py-3 md:py-3.5 rounded-full border font-medium text-sm md:text-[15px] transition-colors duration-300 text-foreground hover:bg-white"
                style={{
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  background: 'rgba(255,255,255,0.7)',
                  borderColor: 'rgba(255,255,255,0.8)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
                }}
              >
                {emailCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {emailCopied ? 'Email copied!' : 'Copy Email'}
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 9. RELATED WORK                                                */}
        {/* ============================================================= */}
        {relatedProjects.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 pt-20 md:pt-24">
            <div className="border-t border-foreground/10 pt-12 md:pt-14">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all projects
              </Link>
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
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
          onPrev={() =>
            setLightbox((l) =>
              l ? { ...l, index: (l.index - 1 + l.images.length) % l.images.length } : l,
            )
          }
          onNext={() =>
            setLightbox((l) =>
              l ? { ...l, index: (l.index + 1) % l.images.length } : l,
            )
          }
        />
      )}
    </PageLayout>
  );
};

export default ProjectDetailPage;
