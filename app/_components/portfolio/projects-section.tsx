import { FadeIn } from "@/app/_components/animations/fade-in";
import { ProjectCard } from "@/app/_components/portfolio/project-card";
import { PROJECTS } from "@/app/_data/portfolio";
import { COLORS, FONT_FAMILY, HEADING_GRADIENT } from "@/app/_lib/theme";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        background: COLORS.background,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
        marginTop: -40,
        position: "relative",
        zIndex: 10,
      }}
      className="px-5 py-20"
    >
      <FadeIn y={30}>
        <h2
          style={{
            background: HEADING_GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: FONT_FAMILY.display,
            fontSize: "clamp(2.5rem, 12vw, 10rem)",
          }}
          className="mb-20 text-center font-black uppercase"
        >
          Selected Work
        </h2>
      </FadeIn>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            total={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
}
