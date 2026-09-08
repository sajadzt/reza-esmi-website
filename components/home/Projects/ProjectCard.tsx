import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/project";

import styles from "./Projects.module.scss";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  const heroImage = `/images/projects/${project.category}/${project.slug}/hero.jpg`;

  return (
    <article className={styles.card}>
      <Link
        href={`/projects/${project.category}/${project.slug}`}
        className={styles.cardLink}
        aria-label={`View ${project.title}`}
      >
        <div className={styles.imageWrapper}>
          <Image
            src={heroImage}
            alt={project.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
            className={styles.image}
          />

          <div className={styles.imageOverlay} />
        </div>

        <div className={styles.cardInfo}>
          <div className={styles.cardMeta}>
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>

          <h2 className={styles.cardTitle}>
            {project.title}
          </h2>

          <span className={styles.cardLocation}>
            {project.location}
          </span>
        </div>
      </Link>
    </article>
  );
}