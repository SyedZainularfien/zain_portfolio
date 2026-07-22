import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortfolioFooter } from "@/app/_components/portfolio/portfolio-footer";
import { ProjectsExplorer } from "@/app/_components/portfolio/projects-explorer";
import { PROJECTS } from "@/app/_data/portfolio";
import { COLORS, FONT_FAMILY } from "@/app/_lib/theme";

export const metadata: Metadata = {
  title: "Projects | Zain",
  description: "Explore all of Zain's selected software projects.",
};

export default function ProjectsPage() {
  return (
    <main className="portfolio-shell">
      <header
        style={{
          background: COLORS.background,
          color: COLORS.text,
          fontFamily: FONT_FAMILY.display,
        }}
        className="projects-page-header"
      >
        <nav
          aria-label="Projects page navigation"
          className="flex items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase transition-opacity hover:opacity-70"
          >
            <ArrowLeft
              className="transition-transform group-hover:-translate-x-1"
              size={18}
              aria-hidden="true"
            />
            Back home
          </Link>
          <span
            style={{ color: COLORS.muted, fontFamily: FONT_FAMILY.mono }}
            className="text-xs tracking-widest uppercase"
          >
            {String(PROJECTS.length).padStart(2, "0")} projects
          </span>
        </nav>

      </header>

      <ProjectsExplorer projects={PROJECTS} />
      <PortfolioFooter />
    </main>
  );
}
