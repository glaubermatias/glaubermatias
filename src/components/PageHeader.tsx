import { motion } from 'framer-motion';

interface PageHeaderProps {
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
  /** When true, removes vertical padding so the right slot can fully bleed top-to-bottom (used for portrait) */
  flushRight?: boolean;
}

/**
 * Black header used across subpages. Mirrors hero spacing and padding,
 * but sits below the floating navigation with a smaller footprint.
 *
 * Uniform across pages: same min-height, same title/subtitle position.
 */
const PageHeader = ({ children, rightSlot, flushRight = false }: PageHeaderProps) => {
  return (
    <header
      data-nav-theme="dark"
      className="relative w-full bg-black text-white overflow-hidden"
      style={{ minHeight: '420px' }}
    >
      {flushRight && rightSlot && (
        <div className="absolute inset-y-0 inset-x-0 md:inset-x-auto md:right-0 z-0 flex h-full items-stretch justify-center md:justify-end">
          {rightSlot}
        </div>
      )}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 h-full">
        <div
          className={`grid grid-cols-1 ${rightSlot ? 'md:grid-cols-12' : ''} gap-10 md:gap-12 items-stretch min-h-[420px]`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`${rightSlot ? 'md:col-span-8' : ''} pt-32 md:pt-36 ${flushRight ? 'pb-12 md:pb-16' : 'pb-12 md:pb-16'} flex flex-col justify-end`}
          >
            {children}
          </motion.div>

          {rightSlot && !flushRight && (
            <div
              className={`md:col-span-4 ${flushRight ? 'self-stretch flex items-stretch justify-end' : 'flex items-start md:items-end justify-end pt-0 pb-8 md:pt-36 md:pb-16'}`}
            >
              {rightSlot}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
