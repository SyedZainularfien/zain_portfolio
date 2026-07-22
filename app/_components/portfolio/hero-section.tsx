import { FadeIn } from "@/app/_components/animations/fade-in";
import { Magnet } from "@/app/_components/animations/magnet";
import { AvatarVisual } from "@/app/_components/portfolio/avatar-visual";
import { ContactButton } from "@/app/_components/ui/contact-button";
import { GalaxyBackground } from "@/app/_components/portfolio/galaxy-background";
import { InteractiveTerminal } from "@/app/_components/portfolio/interactive-terminal";
import { NAVIGATION_ITEMS } from "@/app/_data/portfolio";
import { COLORS, FONT_FAMILY, HEADING_GRADIENT } from "@/app/_lib/theme";

export function HeroSection() {
  return (
    <section
      style={{ overflowX: "clip", minHeight: "100svh" }}
      className="relative isolate flex flex-col px-4 pt-6 pb-8 sm:px-6 sm:pt-8 sm:pb-10"
    >
      <GalaxyBackground />

      <FadeIn y={-20}>
        <nav
          aria-label="Primary navigation"
          className="flex justify-between"
          style={{ color: COLORS.text, fontFamily: FONT_FAMILY.display }}
        >
          {NAVIGATION_ITEMS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              style={{ transition: "opacity 200ms" }}
              className="text-sm font-medium uppercase tracking-wider hover:opacity-70"
            >
              {label}
            </a>
          ))}
        </nav>
      </FadeIn>

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

        <div className="absolute top-[57%] left-0 z-20 hidden w-[350px] -translate-y-1/2 xl:block 2xl:w-[420px]">
          <FadeIn delay={0.45} x={-30} y={0}>
            <InteractiveTerminal />
          </FadeIn>
        </div>

        <div className="xl:translate-x-[58px] 2xl:translate-x-[70px]">
          <FadeIn delay={0.6} y={30}>
            <Magnet padding={150} strength={4}>
              <AvatarVisual />
            </Magnet>
          </FadeIn>
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
