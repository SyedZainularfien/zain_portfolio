import { FadeIn } from "@/app/_components/animations/fade-in";
import { Magnet } from "@/app/_components/animations/magnet";
import { AvatarVisual } from "@/app/_components/portfolio/avatar-visual";
import { ContactButton } from "@/app/_components/ui/contact-button";
import { GalaxyBackground } from "@/app/_components/portfolio/galaxy-background";
import { InteractiveTerminal } from "@/app/_components/portfolio/interactive-terminal";
import { GravitySandbox } from "@/app/_components/portfolio/gravity-sandbox";
import { COLORS, FONT_FAMILY, HEADING_GRADIENT } from "@/app/_lib/theme";

export function HeroSection() {
  return (
    <section
      id="top"
      style={{ overflowX: "clip", minHeight: "100svh" }}
      className="relative isolate flex flex-col px-4 pt-28 pb-8 sm:px-6 sm:pt-32 sm:pb-10"
    >
      <GalaxyBackground />

      <div className="relative flex flex-1 flex-col items-center justify-center gap-6 py-8 sm:gap-10 sm:py-10">
        <FadeIn delay={0.15} y={40}>
          <h1
            style={{
              background: HEADING_GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: FONT_FAMILY.display,
              fontSize: "clamp(2.8rem, 12vw, 8rem)",
              lineHeight: 1,
            }}
            className="text-center font-black tracking-tight uppercase"
          >
            Hi, i&apos;m zain
          </h1>
        </FadeIn>

        <div className="hero-showcase">
          <div className="hero-terminal-panel z-20 w-full">
            <FadeIn delay={0.45} x={-30} y={0}>
              <InteractiveTerminal />
            </FadeIn>
          </div>

          <div className="hero-avatar-panel justify-self-center">
            <FadeIn delay={0.6} y={30}>
              <Magnet padding={150} strength={4}>
                <AvatarVisual />
              </Magnet>
            </FadeIn>
          </div>

          <div className="hero-sandbox-panel z-20 w-full">
            <FadeIn delay={0.52} x={30} y={0}>
              <GravitySandbox />
            </FadeIn>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
        <FadeIn delay={0.35} y={20}>
          <p
            style={{
              color: COLORS.text,
              fontFamily: FONT_FAMILY.display,
              fontSize: "clamp(0.75rem, 1.4vw, 1.2rem)",
              maxWidth: 260,
            }}
            className="leading-snug font-light tracking-wide uppercase"
          >
            a full-stack developer driven by building fast, thoughtful, and
            scalable software
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
