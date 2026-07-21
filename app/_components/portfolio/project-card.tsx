"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { COLORS, FONT_FAMILY } from "@/app/_lib/theme";
import type { Project } from "@/app/_types/portfolio";

interface ProjectCardProps {
  index: number;
  project: Project;
  total: number;
}

export function ProjectCard({ index, project, total }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function handleScroll() {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / window.innerHeight),
      );
      const targetScale = 1 - (total - 1 - index) * 0.03;
      setScale(1 - (1 - targetScale) * progress);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index, total]);

  const [primaryGradient, secondaryGradient, featureGradient] = project.gradients;

  return (
    <article
      style={
        {
          "--project-card-top": `${96 + index * 28}px`,
        } as CSSProperties
      }
      className="relative mb-8 h-[620px] md:sticky md:top-[var(--project-card-top)] md:h-[85vh]"
    >
      <div
        ref={cardRef}
        style={{
          border: `2px solid ${COLORS.text}`,
          background: COLORS.background,
          borderRadius: 44,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          willChange: "transform",
          height: "100%",
        }}
        className="flex flex-col p-5"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <span
            aria-hidden="true"
            style={{
              color: COLORS.text,
              fontFamily: FONT_FAMILY.mono,
              fontSize: "clamp(2rem, 7vw, 5.5rem)",
            }}
            className="font-black"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col items-center text-center">
            <span
              style={{ color: COLORS.text, fontFamily: FONT_FAMILY.display }}
              className="text-xs tracking-widest uppercase opacity-60"
            >
              {project.category}
            </span>
            <h3
              style={{
                color: COLORS.text,
                fontFamily: FONT_FAMILY.display,
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
              }}
              className="font-medium uppercase"
            >
              {project.name}
            </h3>
            <span
              style={{ color: COLORS.muted, fontFamily: FONT_FAMILY.mono }}
              className="mt-1 text-xs"
            >
              {project.technologies}
            </span>
          </div>
          <button
            type="button"
            style={{
              borderRadius: 999,
              border: `2px solid ${COLORS.text}`,
              color: COLORS.text,
              fontFamily: FONT_FAMILY.display,
            }}
            className="px-6 py-2 text-xs tracking-widest uppercase hover:opacity-70"
          >
            View Project
          </button>
        </div>

        <div className="flex flex-1 gap-3" style={{ minHeight: 0 }}>
          <div className="flex flex-col gap-3" style={{ width: "40%" }}>
            <div style={{ background: primaryGradient, borderRadius: 28, flex: 1 }} />
            <div style={{ background: secondaryGradient, borderRadius: 28, flex: 1.6 }} />
          </div>
          <div
            style={{ background: featureGradient, borderRadius: 28, width: "60%" }}
          />
        </div>
      </div>
    </article>
  );
}
