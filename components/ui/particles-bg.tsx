"use client";

import { useEffect, useRef } from "react";

import styles from "./particles-bg.module.scss";

interface Particle {
  x: number;
  y: number;
  radius: number;
  radius_bubble?: number;
  opacity: number;
}

interface ParticlesJSInstance {
  pJS?: {
    particles?: {
      array?: Particle[];
    };
    fn?: {
      vendors?: {
        destroypJS?: () => void;
      };
    };
  };
}

declare global {
  interface Window {
    particlesJS?: (
      tagId: string,
      params: Record<string, unknown>
    ) => void;

    pJSDom?: ParticlesJSInstance[];
  }
}

export default function ParticlesComponent() {
  const interactionCanvasRef =
    useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const interactionCanvas =
      interactionCanvasRef.current;

    if (!interactionCanvas) {
      return;
    }

    const ctx =
      interactionCanvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    let mouseX = -1000;
    let mouseY = -1000;

    let previousParticle: Particle | null = null;
    let currentParticle: Particle | null = null;

    let animationFrame = 0;

    let script: HTMLScriptElement | null = null;

    let destroyed = false;

    /*
    |--------------------------------------------------------------------------
    | CANVAS
    |--------------------------------------------------------------------------
    */

    const resizeCanvas = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      width = window.innerWidth;
      height = window.innerHeight;

      interactionCanvas.width =
        Math.round(width * dpr);

      interactionCanvas.height =
        Math.round(height * dpr);

      interactionCanvas.style.width =
        `${width}px`;

      interactionCanvas.style.height =
        `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    resizeCanvas();

    /*
    |--------------------------------------------------------------------------
    | MOUSE
    |--------------------------------------------------------------------------
    */

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;

      previousParticle = null;
      currentParticle = null;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    /*
    |--------------------------------------------------------------------------
    | PARTICLES.JS PARTICLES
    |--------------------------------------------------------------------------
    */

    const getParticles =
      (): Particle[] => {
        return (
          window.pJSDom?.[0]?.pJS?.particles
            ?.array ?? []
        );
      };

    /*
    |--------------------------------------------------------------------------
    | FIND NEAREST PARTICLE
    |--------------------------------------------------------------------------
    */

    const findNearestParticle =
      (
        particles: Particle[]
      ): Particle | null => {
        if (!particles.length) {
          return null;
        }

        const interactionDistance = 190;

        const maxDistance =
          interactionDistance *
          interactionDistance;

        let nearest: Particle | null =
          null;

        let nearestDistance =
          maxDistance;

        for (const particle of particles) {
          const dx =
            particle.x - mouseX;

          const dy =
            particle.y - mouseY;

          const distance =
            dx * dx + dy * dy;

          if (
            distance < nearestDistance
          ) {
            nearestDistance = distance;
            nearest = particle;
          }
        }

        return nearest;
      };

    /*
    |--------------------------------------------------------------------------
    | UPDATE CUSTOM MOUSE PATH
    |--------------------------------------------------------------------------
    */

    const updateMousePath = () => {
      const particles =
        getParticles();

      if (!particles.length) {
        return;
      }

      const nearest =
        findNearestParticle(
          particles
        );

      if (!nearest) {
        return;
      }

      /*
      Only change the active particle
      when the mouse reaches another
      particle.
      */

      if (
        currentParticle !== nearest
      ) {
        previousParticle =
          currentParticle;

        currentParticle =
          nearest;
      }
    };

    /*
    |--------------------------------------------------------------------------
    | DRAW CUSTOM CONNECTION
    |--------------------------------------------------------------------------
    */

    const drawCustomInteraction = () => {
      if (destroyed) {
        return;
      }

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      updateMousePath();

      /*
      |--------------------------------------------------------------------------
      | PREVIOUS → CURRENT CONNECTION
      |--------------------------------------------------------------------------
      */

      if (
        previousParticle &&
        currentParticle &&
        previousParticle !==
          currentParticle
      ) {
        const start =
          previousParticle;

        const end =
          currentParticle;

        ctx.beginPath();

        ctx.moveTo(
          start.x,
          start.y
        );

        ctx.lineTo(
          end.x,
          end.y
        );

        ctx.strokeStyle =
          "rgba(188, 48, 25, 0.9)";

        ctx.lineWidth = 1.5;

        ctx.shadowBlur = 8;

        ctx.shadowColor =
          "rgba(188, 48, 25, 0.45)";

        ctx.stroke();

        ctx.shadowBlur = 0;
      }

      /*
      |--------------------------------------------------------------------------
      | PREVIOUS PARTICLE
      |--------------------------------------------------------------------------
      */

      if (previousParticle) {
        ctx.beginPath();

        ctx.arc(
          previousParticle.x,
          previousParticle.y,
          Math.max(
            previousParticle.radius + 2,
            4
          ),
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(188, 48, 25, 0.65)";

        ctx.shadowBlur = 10;

        ctx.shadowColor =
          "rgba(188, 48, 25, 0.45)";

        ctx.fill();

        ctx.shadowBlur = 0;
      }

      /*
      |--------------------------------------------------------------------------
      | CURRENT PARTICLE
      |--------------------------------------------------------------------------
      */

      if (currentParticle) {
        /*
        Outer glow
        */

        ctx.beginPath();

        ctx.arc(
          currentParticle.x,
          currentParticle.y,
          10,
          0,
          Math.PI * 2
        );

        const gradient =
          ctx.createRadialGradient(
            currentParticle.x,
            currentParticle.y,
            0,
            currentParticle.x,
            currentParticle.y,
            10
          );

        gradient.addColorStop(
          0,
          "rgba(188, 48, 25, 0.75)"
        );

        gradient.addColorStop(
          0.4,
          "rgba(188, 48, 25, 0.35)"
        );

        gradient.addColorStop(
          1,
          "rgba(188, 48, 25, 0)"
        );

        ctx.fillStyle = gradient;

        ctx.fill();

        /*
        Bright particle core
        */

        ctx.beginPath();

        ctx.arc(
          currentParticle.x,
          currentParticle.y,
          Math.max(
            currentParticle.radius + 2.5,
            5
          ),
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          "rgba(255, 255, 255, 0.95)";

        ctx.shadowBlur = 12;

        ctx.shadowColor =
          "rgba(188, 48, 25, 0.8)";

        ctx.fill();

        ctx.shadowBlur = 0;
      }

      animationFrame =
        requestAnimationFrame(
          drawCustomInteraction
        );
    };

    /*
    |--------------------------------------------------------------------------
    | DESTROY PARTICLES.JS
    |--------------------------------------------------------------------------
    */

    const destroyParticles = () => {
      if (window.pJSDom?.length) {
        window.pJSDom.forEach(
          (instance) => {
            instance.pJS?.fn?.vendors?.destroypJS?.();
          }
        );

        window.pJSDom = [];
      }

      const container =
        document.getElementById(
          "particles-js"
        );

      if (container) {
        const canvas =
          container.querySelector(
            "canvas"
          );

        if (canvas) {
          canvas.remove();
        }
      }
    };

    /*
    |--------------------------------------------------------------------------
    | INITIALIZE PARTICLES.JS
    |--------------------------------------------------------------------------
    */

    const initializeParticles = () => {
      if (
        destroyed ||
        !window.particlesJS
      ) {
        return;
      }

      destroyParticles();

      window.particlesJS(
        "particles-js",
        {
          particles: {
            /*
            --------------------------------------------------------------
            NUMBER
            --------------------------------------------------------------
            */

            number: {
              value: 18,

              density: {
                enable: true,
                value_area: 800,
              },
            },

            /*
            --------------------------------------------------------------
            COLOR
            --------------------------------------------------------------
            */

            color: {
              value: "#ffffff",
            },

            /*
            --------------------------------------------------------------
            SHAPE
            --------------------------------------------------------------
            */

            shape: {
              type: "circle",

              stroke: {
                width: 0,
                color: "#ffffff",
              },
            },

            /*
            --------------------------------------------------------------
            OPACITY
            --------------------------------------------------------------
            */

            opacity: {
              value: 0.55,

              random: true,

              anim: {
                enable: true,
                speed: 0.6,
                opacity_min: 0.25,
              },
            },

            /*
            --------------------------------------------------------------
            SIZE
            --------------------------------------------------------------
            */

            size: {
              value: 4.2,

              random: true,

              anim: {
                enable: false,
                speed: 2,
                size_min: 1,
              },
            },

            /*
            --------------------------------------------------------------
            NORMAL PARTICLE NETWORK
            --------------------------------------------------------------
            */

            line_linked: {
              enable: true,

              distance: 160,

              color: "white",

              opacity: 0.16,

              width: 0.8,
            },

            /*
            --------------------------------------------------------------
            MOVEMENT
            --------------------------------------------------------------
            */

            move: {
              enable: true,

              speed: 1.2,

              random: true,

              direction: "none",

              straight: false,

              out_mode: "bounce",

              bounce: true,

              attract: {
                enable: false,
              },
            },
          },

          /*
          |--------------------------------------------------------------------------
          | INTERACTION
          |--------------------------------------------------------------------------
          |
          | This is intentionally based on the original
          | particles.js component you provided.
          |
          | GRAB:
          | connects nearby particles to the mouse.
          |
          | BUBBLE:
          | enlarges particles near the mouse.
          |
          | REPULSE:
          | intentionally NOT USED.
          |
          */

          interactivity: {
            detect_on: "window",

            events: {
              onhover: {
                enable: true,

                mode: [
                  "grab",
                  "bubble",
                ],
              },

              onclick: {
                enable: false,
              },

              resize: true,
            },

            modes: {
              grab: {
                distance: 220,

                line_linked: {
                  opacity: 0.55,
                },
              },

              bubble: {
                distance: 180,

                size: 10,

                duration: 0.4,

                opacity: 0.9,
              },

              /*
              IMPORTANT:
              No repulse here.
              */

              push: {
                particles_nb: 4,
              },
            },
          },

          retina_detect: true,
        }
      );
    };

    /*
    |--------------------------------------------------------------------------
    | LOAD PARTICLES.JS
    |--------------------------------------------------------------------------
    */

    if (window.particlesJS) {
      initializeParticles();
    } else {
      script =
        document.createElement(
          "script"
        );

      script.src =
        "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";

      script.async = true;

      script.onload =
        initializeParticles;

      document.body.appendChild(
        script
      );
    }

    /*
    |--------------------------------------------------------------------------
    | START CUSTOM INTERACTION
    |--------------------------------------------------------------------------
    */

    animationFrame =
      requestAnimationFrame(
        drawCustomInteraction
      );

    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    return () => {
      destroyed = true;

      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      destroyParticles();

      if (
        script &&
        script.parentNode
      ) {
        script.parentNode.removeChild(
          script
        );
      }
    };
  }, []);

  return (
    <>
      <div
        id="particles-js"
        className={styles.container}
        aria-hidden="true"
      />

      <canvas
        ref={interactionCanvasRef}
        className={styles.interaction}
        aria-hidden="true"
      />
    </>
  );
}