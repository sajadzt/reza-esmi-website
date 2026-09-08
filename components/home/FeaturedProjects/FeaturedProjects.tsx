"use client";

import { useMemo, useState } from "react";

import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

import styles from "@/components/projects/Projects.module.scss";

type Category = "industrial" | "office" | "residential" | "villa";

const categories: {
  id: Category;
  label: string;
}[] = [
  {
    id: "industrial",
    label: "Industrial",
  },
  {
    id: "office",
    label: "Office",
  },
  {
    id: "residential",
    label: "Residential",
  },
  {
    id: "villa",
    label: "Villa",
  },
];

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("industrial");

  const categoryProjects = useMemo(() => {
    return projects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.header}>
        <div className={styles.categories}>
          {categories.map((category) => {
            const active =
              activeCategory === category.id;

            const count = projects.filter(
              (project) =>
                project.category === category.id
            ).length;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  setActiveCategory(category.id)
                }
                className={`${styles.filterButton} ${
                  active
                    ? styles.filterButtonActive
                    : ""
                }`}
              >
                <span>{category.label}</span>

                <span className={styles.filterCount}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.grid}>
        {categoryProjects.map((project) => (
          <ProjectCard
            key={`${project.category}-${project.slug}`}
            project={project}
          />
        ))}
      </div>

      {categoryProjects.length === 0 && (
        <div className={styles.empty}>
          <p>No projects found in this category.</p>
        </div>
      )}
    </section>
  );
}