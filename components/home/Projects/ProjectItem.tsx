"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./ProjectItem.module.scss";

import type { Project } from "@/types/project";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectItem({
  project,
}: {
  project: Project;
}) {
const projectRef = useRef<HTMLElement>(null);
useEffect(() => {
  if (!projectRef.current) return;

  const ctx = gsap.context(() => {
    gsap.from(".project-image", {
      scale: 1.15,
      opacity: 0,
      filter: "blur(10px)",
      duration: 1.4,
      ease: "power3.out",

      scrollTrigger: {
        trigger: projectRef.current,
        start: "top 80%",
        once: true,
      },
    });

    gsap.from(".project-text", {
      y: 80,
      opacity: 0,
      duration: 1,
      delay: 0.2,

      scrollTrigger: {
        trigger: projectRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, projectRef);

  return () => ctx.revert();
}, []);
  return (
    <article
  ref={projectRef}
  className={styles.project}
>
      <div className={`${styles.imageWrapper} project-image`}>
        <Image
          src={project.hero}
          alt={project.title}
          fill
          className={styles.image}
          sizes="100vw"
        />
      </div>

      <div className={`${styles.info} project-text`}>
        <span className={styles.number}>
          {String(project.id).padStart(2, "0")}
        </span>

        <h2>{project.title}</h2>

        <p>{project.category}</p>

        <small>
          {project.location} · {project.year}
        </small>
      </div>
    </article>
  );
}