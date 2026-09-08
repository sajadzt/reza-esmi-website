"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


export default function Intro() {

  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {


    if (!ref.current) return;


    gsap.fromTo(

      ref.current,

      {
        opacity: 0,
        y: 80,
      },

      {

        opacity: 1,

        y: 0,

        duration: 1.5,

        scrollTrigger: {

          trigger: ref.current,

          start: "top 80%",

        },

      }

    );


  }, []);



  return (

    <section

      ref={ref}

      className="
      min-h-screen
      flex
      items-center
      bg-neutral-950
      px-6
      "

    >

      <div className="max-w-5xl">


        <p className="
        mb-8
        text-sm
        uppercase
        tracking-[0.5em]
        text-neutral-400
        ">

          Reza Esmi Architectural Firm

        </p>



        <h2 className="
        text-5xl
        leading-tight
        text-white
        md:text-7xl
        ">

          Two decades of transforming
          industrial spaces into
          human experiences.

        </h2>



      </div>


    </section>

  );

}