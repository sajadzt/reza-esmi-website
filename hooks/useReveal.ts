"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function useReveal() {

  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {

    if (!ref.current) return;


    const ctx = gsap.context(() => {


      gsap.from(ref.current, {

        y: 80,

        opacity: 0,

        duration: 1.2,

        ease: "power3.out",


        scrollTrigger: {

          trigger: ref.current,

          start: "top 85%",

          once:true,

        },

      });


    }, ref);


    return () => ctx.revert();


  }, []);



  return ref;

}