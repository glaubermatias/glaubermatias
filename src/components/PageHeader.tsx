import { motion } from 'framer-motion';

interface PageHeaderProps {
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
  /** When true, removes vertical padding so the right slot can fully bleed top-to-bottom (used for portrait) */
  flushRight?: boolean;
}

/**
 * Black rounded header block used across subpages.
 * Shares the exact width of the floating navigation (site-shell).
 */
const PageHeader = ({ children, rightSlot, flushRight = false }: PageHeaderProps) => {
  return (
    <header data-nav-theme="dark" className="bg-background pt-[88px] md:pt-[92px]">
      <div className="site-shell">
        <div className="relative overflow-hidden rounded-[2rem] bg-black text-white">
          {flushRight && rightSlot && (
            <div className="absolute inset-y-0 inset-x-0 md:inset-x-auto md:right-0 z-0 flex h-full items-stretch justify-center md:justify-end">
              {rightSlot}
            </div>
          )}
          <div className="relative z-10 px-6 md:px-14">
            <div
              className={`grid grid-cols-1 ${rightSlot ? 'md:grid-cols-12' : ''} gap-10 md:gap-12 items-stretch min-h-[300px] md:min-h-[340px]`}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className={`${rightSlot ? 'md:col-span-8' : ''} pt-14 md:pt-20 pb-12 md:pb-16 flex flex-col justify-end`}
              >
                {children}
              </motion.div>

              {rightSlot && !flushRight && (
                <div className="md:col-span-4 flex items-start md:items-end justify-end pt-0 pb-8 md:pt-20 md:pb-16">
                  {rightSlot}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
