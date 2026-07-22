"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  depth: number;
  phase: number;
  speed: number;
  color: string;
};

type Nebula = {
  x: number;
  y: number;
  radius: number;
  color: string;
  depth: number;
};

const STAR_COLORS = ["215, 226, 234", "139, 233, 253", "196, 181, 253"];

function seededRandom(seed: number) {
  let value = seed;

  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement?.parentElement;

    if (!canvas || !section) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let animationFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let easedPointerX = 0;
    let easedPointerY = 0;

    const nebulas: Nebula[] = [
      { x: 0.18, y: 0.34, radius: 0.42, color: "34, 211, 238", depth: 12 },
      { x: 0.82, y: 0.2, radius: 0.36, color: "124, 58, 237", depth: 18 },
      { x: 0.7, y: 0.76, radius: 0.38, color: "14, 116, 144", depth: 10 },
    ];

    const createStars = () => {
      const random = seededRandom(Math.round(width + height));
      const starCount = Math.min(340, Math.max(150, Math.round((width * height) / 4300)));

      stars = Array.from({ length: starCount }, () => {
        const depth = 0.35 + random() * 0.9;

        return {
          x: random() * width,
          y: random() * height,
          radius: 0.35 + random() * 1.25 * depth,
          alpha: 0.22 + random() * 0.65,
          depth,
          phase: random() * Math.PI * 2,
          speed: 0.35 + random() * 1.1,
          color: STAR_COLORS[Math.floor(random() * STAR_COLORS.length)],
        };
      });
    };

    const resize = () => {
      const bounds = section.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createStars();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
      pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
    };

    const handlePointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);

      easedPointerX += (pointerX - easedPointerX) * 0.035;
      easedPointerY += (pointerY - easedPointerY) * 0.035;

      nebulas.forEach((nebula) => {
        const x = nebula.x * width + easedPointerX * nebula.depth;
        const y = nebula.y * height + easedPointerY * nebula.depth;
        const radius = Math.max(width, height) * nebula.radius;
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);

        gradient.addColorStop(0, `rgba(${nebula.color}, 0.12)`);
        gradient.addColorStop(0.38, `rgba(${nebula.color}, 0.055)`);
        gradient.addColorStop(1, `rgba(${nebula.color}, 0)`);
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      });

      const seconds = time / 1000;

      stars.forEach((star) => {
        const twinkle = prefersReducedMotion
          ? 1
          : 0.72 + Math.sin(seconds * star.speed + star.phase) * 0.28;
        const x = star.x + easedPointerX * 24 * star.depth;
        const y = star.y + easedPointerY * 18 * star.depth;

        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${star.color}, ${star.alpha * twinkle})`;
        context.fill();

        if (star.radius > 1.25) {
          context.beginPath();
          context.moveTo(x - star.radius * 3, y);
          context.lineTo(x + star.radius * 3, y);
          context.moveTo(x, y - star.radius * 3);
          context.lineTo(x, y + star.radius * 3);
          context.strokeStyle = `rgba(${star.color}, ${star.alpha * twinkle * 0.28})`;
          context.lineWidth = 0.5;
          context.stroke();
        }
      });

      if (!prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);
    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);
    resize();
    draw();

    return () => {
      resizeObserver.disconnect();
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 46%, transparent 0%, rgba(10,11,13,0.12) 42%, rgba(10,11,13,0.78) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(215,226,234,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(215,226,234,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(circle at center, black, transparent 78%)",
        }}
      />
    </div>
  );
}
