"use client";

import styles from "./Projects.module.scss";

export type ProjectFilter =
  | "all"
  | "industrial"
  | "office"
  | "residential"
  | "villa";

type ProjectFiltersProps = {
  activeFilter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  counts: Record<ProjectFilter, number>;
};

const filters: {
  id: ProjectFilter;
  label: string;
}[] = [
  {
    id: "all",
    label: "All",
  },
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

export default function ProjectFilters({
  activeFilter,
  onFilterChange,
  counts,
}: ProjectFiltersProps) {
  return (
    <nav
      className={styles.filters}
      aria-label="Project categories"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            className={`${styles.filterButton} ${
              isActive ? styles.filterButtonActive : ""
            }`}
            onClick={() => onFilterChange(filter.id)}
            aria-pressed={isActive}
          >
            <span>{filter.label}</span>

            <span className={styles.filterCount}>
              {counts[filter.id]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}