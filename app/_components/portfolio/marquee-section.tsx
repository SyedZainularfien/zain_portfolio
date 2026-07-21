"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TECHNOLOGY_ROWS, TILE_GRADIENTS } from "@/app/_data/portfolio";
import { COLORS, FONT_FAMILY } from "@/app/_lib/theme";

interface TechnologyTileProps {
  index: number;
  label: string;
}

function TechnologyTile({ index, label }: TechnologyTileProps) {
  return (
    <div
      style={{
        width: 240,
        height: 150,
        flexShrink: 0,
        background: TILE_GRADIENTS[index % TILE_GRADIENTS.length],
        border: "1px solid rgba(215,226,234,0.08)",
        color: COLORS.text,
        fontFamily: FONT_FAMILY.display,
      }}
      className="flex items-center justify-center rounded-2xl px-6 text-center text-lg font-medium tracking-wide uppercase"
    >
      {label}
    </div>
  );
}

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const repeatedRows = useMemo(
    () => TECHNOLOGY_ROWS.map((row) => [...row, ...row, ...row]),
    [],
  );

  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Technology stack"
      style={{ background: COLORS.background, overflowX: "clip" }}
      className="pt-24 pb-10"
    >
      {repeatedRows.map((row, rowIndex) => (
        <div
          key={`technology-row-${rowIndex}`}
          className={`flex gap-3 ${rowIndex === 0 ? "mb-3" : ""}`}
          style={{
            transform: `translateX(${rowIndex === 0 ? offset - 200 : -(offset - 200)}px)`,
            willChange: "transform",
          }}
        >
          {row.map((technology, index) => (
            <TechnologyTile
              key={`${technology}-${index}`}
              label={technology}
              index={index}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
