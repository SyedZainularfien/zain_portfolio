import { Code2, Cpu, GitBranch, Terminal, type LucideIcon } from "lucide-react";
import { FadeIn } from "@/app/_components/animations/fade-in";
import { AnimatedText } from "@/app/_components/portfolio/animated-text";
import { TerminalVisual } from "@/app/_components/portfolio/terminal-visual";
import { ContactButton } from "@/app/_components/ui/contact-button";
import { ABOUT_COPY } from "@/app/_data/portfolio";
import { COLORS, FONT_FAMILY, HEADING_GRADIENT } from "@/app/_lib/theme";

type Corner = "top-left" | "bottom-left" | "top-right" | "bottom-right";

interface CornerIconProps {
  corner: Corner;
  delay: number;
  icon: LucideIcon;
  x: number;
}

const CORNER_POSITIONS: Record<Corner, React.CSSProperties> = {
  "top-left": { top: "4%", left: "3%" },
  "bottom-left": { bottom: "8%", left: "5%" },
  "top-right": { top: "4%", right: "3%" },
  "bottom-right": { bottom: "8%", right: "5%" },
};

function CornerIcon({ corner, delay, icon: Icon, x }: CornerIconProps) {
  return (
    <div className="hidden md:block">
      <FadeIn
        delay={delay}
        x={x}
        y={0}
        style={{ position: "absolute", ...CORNER_POSITIONS[corner] }}
      >
        <div
          aria-hidden="true"
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "rgba(215,226,234,0.06)",
            border: "1px solid rgba(215,226,234,0.12)",
          }}
          className="flex items-center justify-center"
        >
          <Icon size={36} color={COLORS.text} strokeWidth={1.5} />
        </div>
      </FadeIn>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: COLORS.background,
        minHeight: "100vh",
        position: "relative",
      }}
      className="flex flex-col items-center justify-center gap-14 px-5 py-20"
    >
      <CornerIcon icon={Code2} corner="top-left" delay={0.1} x={-80} />
      <CornerIcon icon={GitBranch} corner="bottom-left" delay={0.25} x={-80} />
      <CornerIcon icon={Terminal} corner="top-right" delay={0.15} x={80} />
      <CornerIcon icon={Cpu} corner="bottom-right" delay={0.3} x={80} />

      <FadeIn y={40}>
        <h2
          style={{
            background: HEADING_GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: FONT_FAMILY.display,
            fontSize: "clamp(2.5rem, 12vw, 10rem)",
          }}
          className="text-center leading-none font-black tracking-tight uppercase"
        >
          About me
        </h2>
      </FadeIn>

      <AnimatedText text={ABOUT_COPY} />

      <FadeIn
        delay={0.15}
        y={30}
        style={{ width: "min(90vw, 480px)", position: "relative", zIndex: 1 }}
      >
        <TerminalVisual />
      </FadeIn>

      <FadeIn delay={0.2} y={20}>
        <ContactButton />
      </FadeIn>
    </section>
  );
}
