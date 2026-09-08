"use client";

import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
};

export default function Reveal({
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.from(ref.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",

      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
    });

  }, []);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}