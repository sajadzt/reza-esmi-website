import gsap from "gsap";


export function heroImageAnimation(element: HTMLElement){

  gsap.to(element,{
    scale:1,
    duration:2,
    ease:"power3.out"
  });

}