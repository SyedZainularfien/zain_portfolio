"use client";

import { ArrowDown, ArrowUp, Check, Layers3 } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Project } from "@/app/_types/portfolio";

interface ProjectsExplorerProps {
  projects: readonly Project[];
}

function getTechnologyLabel(project: Project) {
  return project.technologies ?? "Full-stack product development";
}

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const selectedProject =
    selectedIndex === null ? null : projects[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) return;

    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedIndex]);

  function returnToArchive() {
    setSelectedIndex(null);
    archiveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      className="projects-archive"
      aria-labelledby="projects-archive-heading"
    >
      <div className="projects-archive-glow" aria-hidden="true" />

      <div className="projects-archive-intro">
        {/* <p>Portfolio archive · {String(projects.length).padStart(2, "0")} projects</p> */}
        <h1 id="projects-archive-heading">All Projects</h1>
        <span>
          Explore the full collection. Select any project to open its story,
          product focus, and core experience below the archive.
        </span>
      </div>

      <div ref={archiveRef} className="projects-archive-grid">
        {projects.map((project, index) => {
          const isSelected = selectedIndex === index;
          const [primaryGradient, secondaryGradient, featureGradient] =
            project.gradients;

          return (
            <button
              key={project.name}
              type="button"
              aria-controls="project-detail"
              aria-expanded={isSelected}
              onClick={() => setSelectedIndex(index)}
              style={
                {
                  "--archive-primary": primaryGradient,
                  "--archive-secondary": secondaryGradient,
                  "--archive-feature": featureGradient,
                } as CSSProperties
              }
              className={`projects-archive-card${isSelected ? " is-selected" : ""}`}
            >
              <span className="projects-archive-card-visual" aria-hidden="true">
                <span className="projects-archive-card-orbit" />
                <span className="projects-archive-card-monogram">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>

              <span className="projects-archive-card-copy">
                <span className="projects-archive-card-meta">
                  <span>{project.category}</span>
                  {isSelected ? <Check size={16} aria-hidden="true" /> : null}
                </span>
                <strong>{project.name}</strong>
                <span className="projects-archive-card-description">
                  {project.description}
                </span>
                <span className="projects-archive-card-action">
                  {isSelected ? "Project opened" : "View project details"}
                  <ArrowDown size={17} aria-hidden="true" />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={detailRef}
        id="project-detail"
        className="project-detail-anchor"
      >
        {selectedProject && selectedIndex !== null ? (
          <article className="project-detail-card" aria-live="polite">
            <div className="project-detail-topline">
              <span>Selected project</span>
              <span>
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <div className="project-detail-heading">
              <p>{selectedProject.category}</p>
              <h2>{selectedProject.name}</h2>
              <span>{selectedProject.overview}</span>
            </div>

            <div className="project-detail-layout">
              <div className="project-detail-visual" aria-hidden="true">
                <span style={{ background: selectedProject.gradients[0] }} />
                <span style={{ background: selectedProject.gradients[1] }} />
                <span style={{ background: selectedProject.gradients[2] }} />
                <div>
                  <Layers3 size={27} />
                  <strong>{selectedProject.name}</strong>
                  <small>Digital product experience</small>
                </div>
              </div>

              <div className="project-detail-content">
                <div className="project-detail-facts">
                  <div>
                    <span>Product space</span>
                    <strong>{selectedProject.category}</strong>
                  </div>
                  <div>
                    <span>Build focus</span>
                    <strong>{getTechnologyLabel(selectedProject)}</strong>
                  </div>
                </div>

                <div className="project-detail-scope">
                  <p>Project scope</p>
                  <ul>
                    {selectedProject.highlights.map((highlight) => (
                      <li key={highlight}>
                        <Check size={16} aria-hidden="true" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="project-detail-back"
              onClick={returnToArchive}
            >
              <ArrowUp size={17} aria-hidden="true" />
              Back to all projects
            </button>
          </article>
        ) : (
          <div className="project-detail-empty" aria-live="polite">
            <span>Choose a project above</span>
            <p>The selected project detail will open here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
