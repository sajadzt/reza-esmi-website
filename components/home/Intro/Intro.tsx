"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Intro() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".intro-line", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15,
      });

    }, sectionRef);

    return () => ctx.revert();

  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center bg-white px-6 md:px-20"
    >
      <div className="max-w-5xl">

        <h2 className="intro-line text-4xl md:text-6xl font-medium leading-tight">
          Architecture is not only about buildings.
        </h2>

        <p className="intro-line mt-8 text-xl md:text-2xl text-neutral-600 leading-relaxed">
          We design industrial and working environments where people,
          performance and architecture exist together.
        </p>

        <p className="intro-line mt-6 text-lg text-neutral-500">
          Reza Esmi Architecture — Architects of Experience.
        </p>

      </div>
    </section>
  );
}