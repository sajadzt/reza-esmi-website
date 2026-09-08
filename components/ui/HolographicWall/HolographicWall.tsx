"use client";

import { useEffect, useRef } from "react";
import styles from "./HolographicWall.module.scss";

const DRAWINGS = [
  "/background-plans/plan-01.png",
  "/background-plans/plan-02.png",
  "/background-plans/plan-03.png",
  "/background-plans/plan-04.jpg",
  "/background-plans/plan-05.jpg",
  "/background-plans/section-01.png",
  "/background-plans/elevation-01.png",
  "/background-plans/elevation-02.png",
  "/background-plans/elevation-03.png",
];

export default function HolographicWall() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame = 0;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (event: MouseEvent) => {
      mouse.targetX = event.clientX;
      mouse.targetY = event.clientY;
    };

    const leave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);

    const spacing = 65;

    const render = () => {
      /*
       * Smooth mouse movement.
       */
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      /*
       * Completely transparent canvas.
       * The actual black background belongs to the website.
       */
      ctx.clearRect(0, 0, width, height);

      /*
       * ---------------------------------------------
       * ARCHITECTURAL DRAWING REVEAL
       * ---------------------------------------------
       */

      const drawingLayer =
        document.querySelector(
          "[data-architectural-drawings]"
        ) as HTMLElement | null;

      if (drawingLayer) {
        drawingLayer.style.setProperty(
          "--mouse-x",
          `${mouse.x}px`
        );

        drawingLayer.style.setProperty(
          "--mouse-y",
          `${mouse.y}px`
        );
      }

      /*
       * ---------------------------------------------
       * INTERACTIVE WHITE GRID
       * ---------------------------------------------
       */

      const radius = 230;

      for (let x = 0; x <= width; x += spacing) {
        for (let y = 0; y <= height; y += spacing) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          if (distance > radius) continue;

          const strength =
            1 - distance / radius;

          const opacity =
            0.05 + strength * 0.45;

          const size =
            1 + strength * 2.5;

          /*
           * Connections toward nearby points.
           */

          ctx.strokeStyle = `rgba(255,255,255,${
            opacity * 0.45
          })`;

          ctx.lineWidth = 0.6;

          if (x + spacing <= width) {
            const nextDistance = Math.sqrt(
              Math.pow(
                mouse.x - (x + spacing),
                2
              ) +
                Math.pow(mouse.y - y, 2)
            );

            if (nextDistance < radius) {
              ctx.beginPath();

              ctx.moveTo(x, y);
              ctx.lineTo(x + spacing, y);

              ctx.stroke();
            }
          }

          if (y + spacing <= height) {
            const nextDistance = Math.sqrt(
              Math.pow(mouse.x - x, 2) +
                Math.pow(
                  mouse.y - (y + spacing),
                  2
                )
            );

            if (nextDistance < radius) {
              ctx.beginPath();

              ctx.moveTo(x, y);
              ctx.lineTo(x, y + spacing);

              ctx.stroke();
            }
          }

          /*
           * White nodes.
           */

          ctx.fillStyle = `rgba(255,255,255,${opacity})`;

          ctx.beginPath();

          ctx.arc(
            x,
            y,
            size,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      }

      /*
       * Large soft mouse light.
       */

      if (
        mouse.x > -500 &&
        mouse.y > -500
      ) {
        const gradient =
          ctx.createRadialGradient(
            mouse.x,
            mouse.y,
            0,
            mouse.x,
            mouse.y,
            300
          );

        gradient.addColorStop(
          0,
          "rgba(255,255,255,0.08)"
        );

        gradient.addColorStop(
          0.35,
          "rgba(255,255,255,0.035)"
        );

        gradient.addColorStop(
          1,
          "rgba(255,255,255,0)"
        );

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.arc(
          mouse.x,
          mouse.y,
          300,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      animationFrame =
        requestAnimationFrame(render);
    };

    animationFrame =
      requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "mousemove",
        move
      );

      window.removeEventListener(
        "mouseleave",
        leave
      );
    };
  }, []);

  return (
    <div className={styles.wall}>
      {/* ARCHITECTURAL DRAWINGS */}

      <div
        className={styles.drawings}
        data-architectural-drawings
      >
        {DRAWINGS.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`${styles.drawing} ${
              styles[`drawing${index + 1}`]
            }`}
          />
        ))}

        <div className={styles.drawingReveal} />
      </div>

      {/* INTERACTIVE GRID */}

      <canvas
        ref={canvasRef}
        className={styles.canvas}
      />
    </div>
  );
}