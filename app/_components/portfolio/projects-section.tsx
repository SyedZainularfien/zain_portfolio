import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/app/_components/animations/fade-in";
import { ProjectCard } from "@/app/_components/portfolio/project-card";
import { PROJECTS } from "@/app/_data/portfolio";
import { COLORS, FONT_FAMILY, HEADING_GRADIENT } from "@/app/_lib/theme";
import type { Project } from "@/app/_types/portfolio";

interface ProjectsSectionProps {
  animateHeading?: boolean;
  heading?: string;
  headingLevel?: "h1" | "h2";
  projects?: readonly Project[];
  showAllLink?: boolean;
}

export function ProjectsSection({
  animateHeading = true,
  heading = "Selected Work",
  headingLevel: Heading = "h2",
  projects = PROJECTS,
  showAllLink = false,
}: ProjectsSectionProps) {
  const headingElement = (
    <Heading
      style={{
        background: HEADING_GRADIENT,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontFamily: FONT_FAMILY.display,
        fontSize: "clamp(2.5rem, 12vw, 10rem)",
      }}
      className="mb-20 text-center font-black uppercase"
    >
      {heading}
    </Heading>
  );

  return (
    <>
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
        className="px-5 pt-20"
      >
        {animateHeading ? (
          <FadeIn y={30}>{headingElement}</FadeIn>
        ) : (
          headingElement
        )}

        <div
          className="selected-projects-list"
          style={{ maxWidth: 900, margin: "0 auto" }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>
      </section>

      {showAllLink ? (
        <div
          style={{ background: COLORS.background }}
          className="relative z-20 flex justify-center px-5 pt-6 pb-10"
        >
          <FadeIn y={20}>
            <Link
              href="/projects"
              style={{
                border: `2px solid ${COLORS.text}`,
                borderRadius: 999,
                color: COLORS.text,
                fontFamily: FONT_FAMILY.display,
              }}
              className="group inline-flex items-center gap-3 px-7 py-3 text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-70"
            >
              View all projects
              <ArrowUpRight
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                size={18}
                aria-hidden="true"
              />
            </Link>
          </FadeIn>
        </div>
      ) : null}
    </>
  );
}
