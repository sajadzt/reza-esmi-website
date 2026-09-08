"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";


export default function HeroText() {

  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {

    console.log("GSAP TEXT + PARALLAX ACTIVE");


    const element = ref.current;

    if (!element) return;


    const items = element.querySelectorAll(".animate-item");


    gsap.set(items, {
      opacity: 0,
      y: 80,
    });


    gsap.to(items, {

      opacity: 1,

      y: 0,

      duration: 1.5,

      stagger: 0.25,

      ease: "power4.out",

      delay: 0.3,

    });



    const moveText = (event: MouseEvent) => {


      const x =
        (event.clientX / window.innerWidth - 0.5) * -10;


      const y =
        (event.clientY / window.innerHeight - 0.5) * -10;



      gsap.to(element, {

        x,

        y,

        duration: 1.5,

        ease: "power3.out",

      });


    };



    window.addEventListener(
      "mousemove",
      moveText
    );



    return () => {

      window.removeEventListener(
        "mousemove",
        moveText
      );

    };


  }, []);



  return (

    <div ref={ref}>


      <p className="animate-item mb-8 text-sm uppercase tracking-[0.5em] text-white">

        Reza Esmi Architecture

      </p>



      <h1 className="animate-item text-6xl font-bold leading-none text-white md:text-8xl">

        Building
        <br />
        Beyond Concrete

      </h1>



      <p className="animate-item mt-10 max-w-xl text-lg text-white">

        Where industrial rigor meets human spirit.

      </p>


    </div>

  );

}