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
 */
const PageHeader = ({ children, rightSlot, flushRight = false }: PageHeaderProps) => {
  return (
    <header
      data-nav-theme="dark"
      className="relative w-full bg-black text-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <div
          className={`grid grid-cols-1 ${rightSlot ? 'md:grid-cols-12' : ''} gap-10 md:gap-12 items-stretch`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`${rightSlot ? 'md:col-span-8' : ''} pt-32 md:pt-36 ${flushRight ? 'pb-16 md:pb-20' : 'pb-12 md:pb-16'}`}
          >
            {children}
          </motion.div>

          {rightSlot && (
            <div
              className={`md:col-span-4 ${flushRight ? 'self-stretch flex items-stretch justify-end' : 'flex items-center justify-end pt-32 md:pt-36 pb-12 md:pb-16'}`}
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
