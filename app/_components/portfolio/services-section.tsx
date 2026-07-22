import { FadeIn } from "@/app/_components/animations/fade-in";
import { SERVICES } from "@/app/_data/portfolio";
import { COLORS, FONT_FAMILY } from "@/app/_lib/theme";

export function ServicesSection() {
  return (
    <section
      id="skills"
      style={{
        background: COLORS.surface,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
      }}
      className="px-5 py-20"
    >
      <FadeIn y={30}>
        <h2
          style={{
            color: COLORS.surfaceText,
            fontFamily: FONT_FAMILY.display,
            fontSize: "clamp(2.5rem, 12vw, 10rem)",
          }}
          className="mb-16 text-center font-black uppercase"
        >
          Services
        </h2>
      </FadeIn>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {SERVICES.map((service, index) => (
          <FadeIn key={service.code} delay={index * 0.1} y={20}>
            <article
              style={{
                borderBottom:
                  index < SERVICES.length - 1
                    ? "1px solid rgba(12,12,12,0.15)"
                    : "none",
              }}
              className="flex items-center gap-6 py-10"
            >
              <span
                aria-hidden="true"
                style={{
                  color: COLORS.surfaceText,
                  fontFamily: FONT_FAMILY.mono,
                  fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
                }}
                className="font-black"
              >
                {service.code}
              </span>
              <div>
                <h3
                  style={{
                    color: COLORS.surfaceText,
                    fontFamily: FONT_FAMILY.display,
                    fontSize: "clamp(1rem, 2.2vw, 1.9rem)",
                  }}
                  className="font-medium uppercase"
                >
                  {service.name}
                </h3>
                <p
                  style={{
                    color: COLORS.surfaceText,
                    opacity: 0.6,
                    fontFamily: FONT_FAMILY.display,
                    fontSize: "clamp(0.85rem, 1.6vw, 1.15rem)",
                    maxWidth: 640,
                  }}
                  className="leading-relaxed font-light"
                >
                  {service.description}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
