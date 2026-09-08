"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";


export default function HeroImage() {

  const imageRef = useRef<HTMLDivElement>(null);


  useEffect(() => {

    const image = imageRef.current;

    if (!image) return;


    console.log("Hero image parallax active");


    // entrance animation

    gsap.fromTo(

      image,

      {
        scale: 1.12,
        opacity: 0,
        filter: "blur(8px)",
      },

      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",

        duration: 2,

        ease: "power4.out",
      }

    );


    // mouse parallax

    const moveImage = (event: MouseEvent) => {

      const x = (event.clientX / window.innerWidth - 0.5) * 20;

      const y = (event.clientY / window.innerHeight - 0.5) * 20;


      gsap.to(image, {

        x: x,

        y: y,

        duration: 1.5,

        ease: "power3.out",

      });

    };


    window.addEventListener(
      "mousemove",
      moveImage
    );


    return () => {

      window.removeEventListener(
        "mousemove",
        moveImage
      );

    };


  }, []);



  return (

    <div
      ref={imageRef}
      className="
      absolute
      inset-0
      overflow-hidden
      "
    >

      <Image

        src="/images/projects/bahraman/hero.jpg"

        alt="Reza Esmi Architecture Project"

        fill

        priority

        quality={100}

        className="
        object-cover
        "
      />


      <div

        className="
        absolute
        inset-0
        bg-black/40
        "

      />


    </div>

  );

}