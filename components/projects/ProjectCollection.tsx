"use client";

import { useMemo, useState } from "react";

import type { Project } from "@/types/project";

import ProjectCard from "./ProjectCard";
import ProjectFilters, {
  type ProjectFilter,
} from "./ProjectFilters";

import styles from "./Projects.module.scss";

type ProjectCollectionProps = {
  projects: Project[];
};

export default function ProjectCollection({
  projects,
}: ProjectCollectionProps) {
  const [activeFilter, setActiveFilter] =
    useState<ProjectFilter>("all");

  const counts = useMemo(() => {
    return {
      all: projects.length,

      industrial: projects.filter(
        (project) => project.category === "industrial-projects"
      ).length,

      office: projects.filter(
        (project) => project.category === "office"
      ).length,

      residential: projects.filter(
        (project) => project.category === "residential"
      ).length,

      villa: projects.filter(
        (project) => project.category === "villa"
      ).length,
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeFilter
    );
  }, [projects, activeFilter]);

  return (
    <section className={styles.collection}>
      <ProjectFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />

      <div className={styles.grid}>
        {filteredProjects.map((project) => (
          <ProjectCard
            key={`${project.category}-${project.slug}`}
            project={project}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className={styles.empty}>
          <p>No projects found in this category.</p>
        </div>
      )}
    </section>
  );
}