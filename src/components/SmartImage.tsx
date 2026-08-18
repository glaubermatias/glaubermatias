import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Extra classes for the skeleton overlay (e.g. rounded corners). */
  skeletonClassName?: string;
}

/**
 * <img> wrapper that paints an instant skeleton (pulse) while the real
 * image decodes in the background, then fades it in. The native "broken
 * image" icon is never visible: on error the <img> stays hidden and the
 * skeleton remains in place.
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
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Cache hits don't always fire onLoad — flip immediately if the
  // underlying <img> is already complete on mount.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) setStatus('loaded');
  }, [rest.src]);

  const loaded = status === 'loaded';

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
        draggable={false}
        onLoad={(e) => {
          setStatus('loaded');
          onLoad?.(e);
        }}
        onError={(e) => {
          setStatus('error');
          onError?.(e);
        }}
        className={cn(
          className,
          'pointer-events-none select-none transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
઻       )}
        style={style}
      />
    </>
  );
};

export default SmartImage;
