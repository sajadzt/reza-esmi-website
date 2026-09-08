"use client";

import Image from "next/image";
import { Project } from "@/types/project";
import styles from "./FeaturedCard.module.scss";

type Props = {
  project: Project;
  reverse?: boolean;
};

export default function FeaturedCard({
  project,
  reverse = false,
}: Props) {
  return (
    <article
      className={`${styles.card} ${
        reverse ? styles.reverse : ""
      }`}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={project.hero}
          alt={project.title}
          fill
          sizes="50vw"
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.content}>
        <span className={styles.category}>
          {project.category}
        </span>

        <h2 className={styles.title}>
          {project.title}
        </h2>

        <p className={styles.meta}>
          {project.location} · {project.year}
        </p>

        <button className={styles.button}>
          Explore Project →
        </button>
      </div>
    </article>
  );
}