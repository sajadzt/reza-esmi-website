import type { Metadata } from "next";

import ProjectCollection from "@/components/projects/ProjectCollection";
import { projects } from "@/data/projects/index";

export const metadata: Metadata = {
  title: "Projects | Reza Esmi Architects",
  description:
    "Selected architectural projects by Reza Esmi Architects.",
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="projects-page">
        <div className="projects-container">
          <header className="projects-header">
            <p className="projects-eyebrow">
              Selected Work
            </p>

            <h1 className="projects-title">
              Projects
            </h1>

            <p className="projects-description">
              Architecture shaped by context, performance,
              people, and experience.
            </p>
          </header>

          <ProjectCollection projects={projects} />
        </div>
      </section>
    </main>
  );
}