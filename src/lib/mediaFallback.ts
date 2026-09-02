/**
 * Global preventive visual fallback.
 *
 * Any <img>, <video> or <source> that fails to load (404, decode error,
 * broken CDN pointer) is hidden and replaced by a minimal grey skeleton,
 * so the browser's native "broken image" icon is never visible.
 *
 * Runs in the capture phase because media error events do not bubble.
 */
const FAILED_ATTR = 'data-media-failed';

const markFailed = (el: HTMLElement) => {
  if (el.hasAttribute(FAILED_ATTR)) return;
  el.setAttribute(FAILED_ATTR, 'true');

  const parent = el.parentElement;
  const parentStyle = parent ? getComputedStyle(parent) : null;
  const canOverlay =
    !!parent && !!parentStyle && parentStyle.position !== 'static';

  if (canOverlay) {
    // Fill the container with a skeleton so layout stays intact.
    const skeleton = document.createElement('div');
    skeleton.setAttribute('aria-hidden', 'true');
    skeleton.setAttribute('data-media-skeleton', 'true');
    skeleton.className = 'media-fallback-skeleton';
    parent.appendChild(skeleton);
    el.style.visibility = 'hidden';
  } else {
    el.style.display = 'none';
  }
};

const onMediaError = (event: Event) => {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  const tag = target.tagName;
  if (tag === 'IMG' || tag === 'VIDEO') {
    markFailed(target);
  } else if (tag === 'SOURCE') {
    const media = target.parentElement;
    if (media && (media.tagName === 'VIDEO' || media.tagName === 'AUDIO')) {
      markFailed(media);
    }
  }
};

export const installMediaFallback = () => {
  document.addEventListener('error', onMediaError, true);
};
