import { useState, type ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Extra classes for the skeleton overlay (e.g. rounded corners). */
  skeletonClassName?: string;
}

/**
 * <img> wrapper that paints an instant skeleton (pulse) while the real
 * image decodes in the background, then fades it in. Designed for use
 * inside an absolutely-positioned parent (bento tiles, carousel slides).
 *
 * Typography is never blocked — the skeleton is purely visual and never
 * waits on font loading.
 */
export const SmartImage = ({
  className,
  skeletonClassName,
  onLoad,
  onError,
  style,
  ...rest
}: SmartImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div
          aria-hidden
          className={cn(
            'absolute inset-0 animate-pulse bg-muted',
            skeletonClassName,
          )}
        />
      )}
      <img
        {...rest}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          // Hide the skeleton even on error so the alt/empty box shows.
          setLoaded(true);
          onError?.(e);
        }}
        className={cn(className, !loaded && 'opacity-0')}
        style={{ transition: 'opacity 220ms ease-out', ...style }}
      />
    </>
  );
};

export default SmartImage;
