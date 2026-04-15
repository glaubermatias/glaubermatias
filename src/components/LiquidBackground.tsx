import { useEffect, useRef } from 'react';

const LiquidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      // Draw flowing liquid blobs
      const blobs = [
        { x: 0.3, y: 0.4, r: 0.35, speed: 0.0004, color: 'rgba(30, 30, 30, 0.9)' },
        { x: 0.7, y: 0.6, r: 0.3, speed: 0.0005, color: 'rgba(20, 20, 20, 0.8)' },
        { x: 0.5, y: 0.3, r: 0.25, speed: 0.0003, color: 'rgba(40, 40, 40, 0.7)' },
        { x: 0.2, y: 0.7, r: 0.28, speed: 0.00045, color: 'rgba(25, 25, 25, 0.85)' },
        { x: 0.8, y: 0.3, r: 0.22, speed: 0.00035, color: 'rgba(35, 35, 35, 0.75)' },
      ];

      blobs.forEach((blob, i) => {
        const bx = w * (blob.x + 0.15 * Math.sin(time * blob.speed * 1000 + i * 1.5));
        const by = h * (blob.y + 0.12 * Math.cos(time * blob.speed * 1000 + i * 2.1));
        const br = Math.min(w, h) * blob.r;

        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(0.6, blob.color.replace(/[\d.]+\)$/, '0.3)'));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      });

      // Add subtle reflective highlights
      const highlights = [
        { x: 0.4, y: 0.35, r: 0.15, speed: 0.0006 },
        { x: 0.65, y: 0.55, r: 0.12, speed: 0.0004 },
        { x: 0.3, y: 0.65, r: 0.1, speed: 0.0005 },
      ];

      highlights.forEach((hl, i) => {
        const hx = w * (hl.x + 0.1 * Math.sin(time * hl.speed * 1000 + i * 3));
        const hy = h * (hl.y + 0.08 * Math.cos(time * hl.speed * 1000 + i * 2.5));
        const hr = Math.min(w, h) * hl.r;

        const grad = ctx.createRadialGradient(hx, hy, 0, hx, hy, hr);
        grad.addColorStop(0, 'rgba(60, 60, 60, 0.15)');
        grad.addColorStop(0.5, 'rgba(50, 50, 50, 0.05)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      time += 16;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
    />
  );
};

export default LiquidBackground;
