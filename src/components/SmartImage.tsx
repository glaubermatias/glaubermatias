import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Extra classes for the skeleton overlay (e.g. rounded corners). */
  skeletonClassName?: string;
}

/**
 * <img> wrapper that paints an instant skeleton (pulse) while the real
 * image decodes in the background, then fades it in. Designed for use
 * inside a `relative` parent (bento tiles, carousel slides). Typography
 * is never blocked — the skeleton is purely visual.
 */
export const SmartImage = ({
  className,
  skeletonClassName,
  onLoad,
  onError,
  style,
  decoding = 'async',
  ...rest
}: SmartImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Cache hits don't always fire onLoad — flip immediately if the
  // underlying <img> is already complete on mount.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

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
        ref={imgRef}
        decoding={decoding}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
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
