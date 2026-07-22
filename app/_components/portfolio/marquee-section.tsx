"use client";

import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { LuBot } from "react-icons/lu";
import {
  SiAnthropic,
  SiClaude,
  SiCursor,
  SiExpo,
  SiExpress,
  SiFramer,
  SiGreensock,
  SiJsonwebtokens,
  SiMantine,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiReactquery,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiZod,
} from "react-icons/si";
import { TECHNOLOGY_ROWS } from "@/app/_data/portfolio";
import { COLORS, FONT_FAMILY, HEADING_GRADIENT } from "@/app/_lib/theme";

interface TechnologyTileProps {
  index: number;
  label: string;
}

const TECHNOLOGY_ICONS: Record<
  string,
  { Icon: IconType; accent: string; glow: string }
> = {
  React: { Icon: SiReact, accent: "#61dafb", glow: "97, 218, 251" },
  "Next.js": { Icon: SiNextdotjs, accent: "#ffffff", glow: "255, 255, 255" },
  TypeScript: { Icon: SiTypescript, accent: "#3178c6", glow: "49, 120, 198" },
  "Node.js": { Icon: SiNodedotjs, accent: "#5fa04e", glow: "95, 160, 78" },
  "Express.js": { Icon: SiExpress, accent: "#f2f2f2", glow: "242, 242, 242" },
  NestJS: { Icon: SiNestjs, accent: "#e0234e", glow: "224, 35, 78" },
  MongoDB: { Icon: SiMongodb, accent: "#47a248", glow: "71, 162, 72" },
  "React Native": { Icon: SiReact, accent: "#61dafb", glow: "97, 218, 251" },
  Expo: { Icon: SiExpo, accent: "#ffffff", glow: "255, 255, 255" },
  "Redux Toolkit": { Icon: SiRedux, accent: "#764abc", glow: "118, 74, 188" },
  "TanStack Query": { Icon: SiReactquery, accent: "#ff4154", glow: "255, 65, 84" },
  "Tailwind CSS": { Icon: SiTailwindcss, accent: "#06b6d4", glow: "6, 182, 212" },
  "Mantine UI": { Icon: SiMantine, accent: "#339af0", glow: "51, 154, 240" },
  "Shadcn UI": { Icon: SiShadcnui, accent: "#ffffff", glow: "255, 255, 255" },
  "Framer Motion": { Icon: SiFramer, accent: "#bb4bff", glow: "187, 75, 255" },
  GSAP: { Icon: SiGreensock, accent: "#88ce02", glow: "136, 206, 2" },
  Zod: { Icon: SiZod, accent: "#3e67b1", glow: "62, 103, 177" },
  "JWT Auth": { Icon: SiJsonwebtokens, accent: "#d95cff", glow: "217, 92, 255" },
  "AI Agents": { Icon: LuBot, accent: "#22d3ee", glow: "34, 211, 238" },
  Claude: { Icon: SiClaude, accent: "#d97757", glow: "217, 119, 87" },
  Cursor: { Icon: SiCursor, accent: "#ffffff", glow: "255, 255, 255" },
};

function TechnologyTile({ index, label }: TechnologyTileProps) {
  const technology = TECHNOLOGY_ICONS[label] ?? {
    Icon: SiAnthropic,
    accent: "#22d3ee",
    glow: "34, 211, 238",
  };
  const { Icon } = technology;

  return (
    <div
      style={{
        "--tech-accent": technology.accent,
        "--tech-glow": technology.glow,
        "--tech-delay": `${(index % 7) * -0.45}s`,
        fontFamily: FONT_FAMILY.display,
      } as CSSProperties}
      className="technology-tile"
    >
      <div className="technology-tile-glow" aria-hidden="true" />
      <div className="technology-logo-stage" aria-hidden="true">
        <span className="technology-logo-shadow" />
        <span className="technology-logo-face">
          <Icon />
        </span>
      </div>
      <span className="technology-name">{label}</span>
    </div>
  );
}

export function MarqueeSection() {
  return (
    <section
      aria-label="Technology stack"
      style={{ background: COLORS.background, overflowX: "clip" }}
      className="technology-section"
    >
      <div className="technology-heading">
        <span>My toolkit</span>
        <h2
          style={{
            background: HEADING_GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: FONT_FAMILY.display,
          }}
        >
          Technologies I build with
        </h2>
      </div>
      {TECHNOLOGY_ROWS.map((row, rowIndex) => (
        <div
          key={`technology-row-${rowIndex}`}
          className={`technology-marquee ${rowIndex === 0 ? "technology-marquee-first" : "technology-marquee-reverse"}`}
        >
          <div className="technology-track">
            {[0, 1].map((copyIndex) => (
              <div
                key={`technology-copy-${copyIndex}`}
                className="technology-row"
                aria-hidden={copyIndex === 1}
              >
                {row.map((technology, index) => (
                  <TechnologyTile
                    key={`${technology}-${copyIndex}-${index}`}
                    label={technology}
                    index={index}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
