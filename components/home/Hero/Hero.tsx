"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./Hero.module.scss";

export default function Hero() {
  const hero = useRef<HTMLElement | null>(null);
  const title = useRef<HTMLDivElement | null>(null);
  const subtitle = useRef<HTMLParagraphElement | null>(null);
  const image = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(title.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          subtitle.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          image.current,
          {
            scale: 1.15,
            opacity: 0,
            duration: 1.8,
            ease: "power3.out",
          },
          "-=1"
        );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={hero}
      className={styles.hero}
    >
      {/* GLOBAL ARCHITECTURAL INTERACTION */}

      <div className={styles.left}>
        <div ref={title}>
          <h1>REZA</h1>
          <h1>ESMI</h1>
        </div>

        <p ref={subtitle}>
          Industrial Architecture
          <br />
          Office Design
          <br />
          Human Experience
        </p>
      </div>

      <div
        className={styles.right}
        ref={image}
      >
        <Image
          src="/images/projects/industrial-projects/bahraman/hero.jpg"
          alt="Bahraman Factory"
          fill
          priority
          className={styles.image}
        />
      </div>
    </section>
  );
}