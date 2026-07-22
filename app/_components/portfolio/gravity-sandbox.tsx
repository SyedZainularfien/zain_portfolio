"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { CirclePlus, Pause, Play, RotateCcw } from "lucide-react";
import { COLORS, FONT_FAMILY } from "@/app/_lib/theme";

type Point = { x: number; y: number };

type Particle = Point & {
  color: string;
  radius: number;
  trail: Point[];
  vx: number;
  vy: number;
};

const COLORS_POOL = ["#67e8f9", "#a78bfa", "#f9a8d4", "#fde68a", "#86efac"];
const GRAVITY = 760_000;
const BODIES_PER_BURST = 8;
const CORE_RADIUS = 17;

function createOrbiter(
  well: Point,
  width: number,
  height: number,
  offset = 0,
): Particle {
  const maxOrbit = Math.max(54, Math.min(width, height) * 0.4);
  const distance = 48 + Math.random() * Math.max(18, maxOrbit - 48);
  const angle = Math.random() * Math.PI * 2;
  const direction = Math.random() > 0.18 ? 1 : -1;
  const speed = Math.sqrt(GRAVITY / distance) * (0.88 + Math.random() * 0.2);

  return {
    x: well.x + Math.cos(angle) * distance,
    y: well.y + Math.sin(angle) * distance,
    vx: -Math.sin(angle) * speed * direction,
    vy: Math.cos(angle) * speed * direction,
    radius: 1.4 + Math.random() * 1.8,
    color:
      COLORS_POOL[
        (offset + Math.floor(Math.random() * COLORS_POOL.length)) %
          COLORS_POOL.length
      ],
    trail: [],
  };
}

export function GravitySandbox() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const wellRef = useRef<Point>({ x: 160, y: 130 });
  const sizeRef = useRef({ width: 320, height: 260 });
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [particleCount, setParticleCount] = useState(0);

  const seedSimulation = useCallback((count = 15) => {
    const { width, height } = sizeRef.current;
    wellRef.current = { x: width * 0.5, y: height * 0.48 };
    particlesRef.current = Array.from({ length: count }, (_, index) =>
      createOrbiter(wellRef.current, width, height, index),
    );
    setParticleCount(particlesRef.current.length);
  }, []);

  const spawnBurst = useCallback((point?: Point) => {
    const { width, height } = sizeRef.current;
    const origin = point ?? {
      x: width * (0.22 + Math.random() * 0.56),
      y: height * (0.18 + Math.random() * 0.62),
    };

    const additions = Array.from({ length: BODIES_PER_BURST }, (_, index) => {
      const particle = createOrbiter(wellRef.current, width, height, index);
      const angle = Math.atan2(
        origin.y - wellRef.current.y,
        origin.x - wellRef.current.x,
      );
      const distance = Math.max(
        42,
        Math.hypot(origin.x - wellRef.current.x, origin.y - wellRef.current.y),
      );
      const speed =
        Math.sqrt(GRAVITY / distance) * (0.78 + Math.random() * 0.28);

      particle.x = origin.x + (Math.random() - 0.5) * 18;
      particle.y = origin.y + (Math.random() - 0.5) * 18;
      particle.vx = -Math.sin(angle) * speed + (Math.random() - 0.5) * 22;
      particle.vy = Math.cos(angle) * speed + (Math.random() - 0.5) * 22;
      return particle;
    });

    particlesRef.current.push(...additions);
    setParticleCount(particlesRef.current.length);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let previousTime = performance.now();

    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      sizeRef.current = { width, height };
      seedSimulation();
    });

    const render = (time: number) => {
      const { width, height } = sizeRef.current;
      const delta = Math.min((time - previousTime) / 1000, 0.028);
      previousTime = time;

      context.clearRect(0, 0, width, height);

      const background = context.createRadialGradient(
        wellRef.current.x,
        wellRef.current.y,
        8,
        wellRef.current.x,
        wellRef.current.y,
        Math.max(width, height) * 0.72,
      );
      background.addColorStop(0, "rgba(34, 211, 238, 0.09)");
      background.addColorStop(0.42, "rgba(76, 29, 149, 0.045)");
      background.addColorStop(1, "rgba(5, 8, 14, 0.2)");
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < 34; index += 1) {
        const x = (index * 73.37) % width;
        const y = (index * 47.83) % height;
        context.fillStyle = `rgba(255,255,255,${0.11 + (index % 4) * 0.045})`;
        context.fillRect(
          x,
          y,
          index % 5 === 0 ? 1.4 : 0.8,
          index % 5 === 0 ? 1.4 : 0.8,
        );
      }

      if (!pausedRef.current) {
        const showTrails = particlesRef.current.length <= 180;

        particlesRef.current.forEach((particle) => {
          const dx = wellRef.current.x - particle.x;
          const dy = wellRef.current.y - particle.y;
          const distanceSquared = dx * dx + dy * dy + 460;
          const distance = Math.sqrt(distanceSquared);
          const acceleration = GRAVITY / distanceSquared;

          particle.vx += (dx / distance) * acceleration * delta;
          particle.vy += (dy / distance) * acceleration * delta;
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;

          if (particle.x < 2 || particle.x > width - 2) {
            particle.vx *= -0.82;
            particle.x = Math.min(width - 2, Math.max(2, particle.x));
          }
          if (particle.y < 2 || particle.y > height - 2) {
            particle.vy *= -0.82;
            particle.y = Math.min(height - 2, Math.max(2, particle.y));
          }

          if (showTrails) {
            particle.trail.push({ x: particle.x, y: particle.y });
            if (particle.trail.length > 12) particle.trail.shift();
          } else if (particle.trail.length) {
            particle.trail = [];
          }
        });
      }

      const showGlow = particlesRef.current.length <= 250;

      particlesRef.current.forEach((particle) => {
        if (particle.trail.length > 1) {
          context.beginPath();
          particle.trail.forEach((point, index) => {
            if (index === 0) context.moveTo(point.x, point.y);
            else context.lineTo(point.x, point.y);
          });
          context.strokeStyle = `${particle.color}38`;
          context.lineWidth = 1;
          context.stroke();
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = showGlow ? 9 : 0;
        context.fill();
        context.shadowBlur = 0;
      });

      const coreGlow = context.createRadialGradient(
        wellRef.current.x,
        wellRef.current.y,
        1,
        wellRef.current.x,
        wellRef.current.y,
        CORE_RADIUS * 2.5,
      );
      coreGlow.addColorStop(0, "rgba(226, 252, 255, 1)");
      coreGlow.addColorStop(0.16, "rgba(34, 211, 238, 0.92)");
      coreGlow.addColorStop(0.48, "rgba(124, 58, 237, 0.34)");
      coreGlow.addColorStop(1, "rgba(124, 58, 237, 0)");
      context.beginPath();
      context.arc(
        wellRef.current.x,
        wellRef.current.y,
        CORE_RADIUS * 2.5,
        0,
        Math.PI * 2,
      );
      context.fillStyle = coreGlow;
      context.fill();

      context.beginPath();
      context.arc(
        wellRef.current.x,
        wellRef.current.y,
        CORE_RADIUS,
        0,
        Math.PI * 2,
      );
      context.strokeStyle = "rgba(165, 243, 252, 0.58)";
      context.lineWidth = 1;
      context.stroke();

      animationFrame = requestAnimationFrame(render);
    };

    resizeObserver.observe(canvas);
    animationFrame = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [seedSimulation]);

  const getPointerPosition = (event: PointerEvent<HTMLCanvasElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    const point = getPointerPosition(event);
    const distanceFromCore = Math.hypot(
      point.x - wellRef.current.x,
      point.y - wellRef.current.y,
    );

    event.currentTarget.focus();
    if (distanceFromCore <= CORE_RADIUS * 2.25) {
      draggingRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }

    spawnBurst(point);
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!draggingRef.current) return;
    const point = getPointerPosition(event);
    const { width, height } = sizeRef.current;
    wellRef.current = {
      x: Math.min(width - 28, Math.max(28, point.x)),
      y: Math.min(height - 28, Math.max(28, point.y)),
    };
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLCanvasElement>) => {
    const directions: Record<string, Point> = {
      ArrowUp: { x: 0, y: -12 },
      ArrowDown: { x: 0, y: 12 },
      ArrowLeft: { x: -12, y: 0 },
      ArrowRight: { x: 12, y: 0 },
    };
    const direction = directions[event.key];

    if (direction) {
      event.preventDefault();
      const { width, height } = sizeRef.current;
      wellRef.current = {
        x: Math.min(width - 28, Math.max(28, wellRef.current.x + direction.x)),
        y: Math.min(height - 28, Math.max(28, wellRef.current.y + direction.y)),
      };
    }

    if (event.key === " " || event.key.toLowerCase() === "a") {
      event.preventDefault();
      spawnBurst();
    }
  };

  const togglePaused = () => {
    pausedRef.current = !pausedRef.current;
    setIsPaused(pausedRef.current);
  };

  const reset = () => {
    pausedRef.current = false;
    setIsPaused(false);
    seedSimulation();
  };

  return (
    <div
      className="overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#080b12]/76 shadow-[0_24px_80px_rgba(0,0,0,0.38),0_0_38px_rgba(34,211,238,0.06)] backdrop-blur-xl"
      style={{ color: COLORS.text, fontFamily: FONT_FAMILY.mono }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-[9px] tracking-[0.18em] text-cyan-300/65 uppercase">
            Interactive experiment
          </p>
          <p className="mt-0.5 text-xs font-semibold tracking-wider uppercase">
            Playdium
          </p>
        </div>

        <span
          aria-live="polite"
          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] text-white/60"
        >
          {particleCount} stars
        </span>
      </div>

      <div className="flex items-center gap-1.5 border-y border-white/10 px-3 py-2">
        <button
          type="button"
          onClick={() => spawnBurst()}
          className="flex h-8 flex-1 items-center justify-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/7 px-3 text-[9px] tracking-[0.08em] text-cyan-100/75 uppercase transition hover:border-cyan-300/45 hover:bg-cyan-300/12 hover:text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          <CirclePlus aria-hidden="true" size={13} />
          Add {BODIES_PER_BURST} bodies
        </button>
        <button
          type="button"
          onClick={togglePaused}
          aria-label={
            isPaused ? "Resume gravity simulation" : "Pause gravity simulation"
          }
          className="grid size-7 place-items-center rounded-full border border-white/10 text-white/55 transition hover:border-cyan-300/40 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          {isPaused ? (
            <Play aria-hidden="true" size={12} />
          ) : (
            <Pause aria-hidden="true" size={12} />
          )}
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset gravity simulation"
          className="grid size-7 place-items-center rounded-full border border-white/10 text-white/55 transition hover:border-cyan-300/40 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          <RotateCcw aria-hidden="true" size={12} />
        </button>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          tabIndex={0}
          aria-label="Gravity sandbox. Click or press A to add bodies. Drag the glowing gravity core or move it with the arrow keys."
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={() => {
            draggingRef.current = false;
          }}
          onPointerCancel={() => {
            draggingRef.current = false;
          }}
          className="block h-[250px] w-full touch-none cursor-crosshair outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-cyan-300/55 2xl:h-[285px]"
        />
        <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[8px] tracking-[0.11em] text-white/38 uppercase">
          Click to add stars · drag the core to bend gravity
        </p>
      </div>
    </div>
  );
}
