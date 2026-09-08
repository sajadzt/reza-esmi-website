"use client";

import React, {
  useEffect,
  useRef,
} from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  pulse: number;
}

export default function ConstellationGrid() {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });

    if (!ctx) return;

    let animationFrame = 0;

    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      radius: 260,
    };

    let nodes: Node[] = [];

    const initNodes = () => {
      nodes = [];

      const spacing = 70;

      const cols =
        Math.ceil(width / spacing) + 2;

      const rows =
        Math.ceil(height / spacing) + 2;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const px = x * spacing;
          const py = y * spacing;

          nodes.push({
            x: px,
            y: py,
            vx: 0,
            vy: 0,
            baseX: px,
            baseY: py,
            radius:
              Math.random() * 1.1 + 0.7,
            pulse:
              Math.random() *
              Math.PI *
              2,
          });
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      initNodes();
    };

    const move = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const leave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener(
      "resize",
      resize
    );

    window.addEventListener(
      "mousemove",
      move,
      { passive: true }
    );

    window.addEventListener(
      "mouseleave",
      leave
    );

    resize();

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min(
        (now - lastTime) / 1000,
        0.033
      );

      lastTime = now;

      mouse.vx =
        (mouse.x - mouse.prevX) /
        Math.max(dt * 1000, 1);

      mouse.vy =
        (mouse.y - mouse.prevY) /
        Math.max(dt * 1000, 1);

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /*
       * Very subtle white architectural grid
       */

      const spring = 15;
      const damping = 0.84;

      for (const node of nodes) {
        node.pulse += dt * 2;

        const dx =
          mouse.x - node.x;

        const dy =
          mouse.y - node.y;

        const distance =
          Math.sqrt(
            dx * dx + dy * dy
          );

        if (
          distance <
          mouse.radius
        ) {
          const influence =
            1 -
            distance /
              mouse.radius;

          const force =
            influence *
            850;

          if (distance > 0) {
            node.vx -=
              (dx / distance) *
              force *
              dt;

            node.vy -=
              (dy / distance) *
              force *
              dt;
          }
        }

        const homeX =
          node.baseX - node.x;

        const homeY =
          node.baseY - node.y;

        node.vx +=
          homeX *
          spring *
          dt;

        node.vy +=
          homeY *
          spring *
          dt;

        node.vx *= damping;
        node.vy *= damping;

        node.x +=
          node.vx *
          dt *
          60;

        node.y +=
          node.vy *
          dt *
          60;
      }

      /*
       * Connections
       */

      const maxDistance = 100;

      for (
        let i = 0;
        i < nodes.length;
        i++
      ) {
        const a = nodes[i];

        for (
          let j = i + 1;
          j < nodes.length;
          j++
        ) {
          const b = nodes[j];

          const dx =
            a.x - b.x;

          const dy =
            a.y - b.y;

          const distance =
            Math.sqrt(
              dx * dx +
                dy * dy
            );

          if (
            distance <
            maxDistance
          ) {
            const alpha =
              (1 -
                distance /
                  maxDistance) *
              0.13;

            ctx.strokeStyle =
              `rgba(255,255,255,${alpha})`;

            ctx.lineWidth = 0.6;

            ctx.beginPath();

            ctx.moveTo(
              a.x,
              a.y
            );

            ctx.lineTo(
              b.x,
              b.y
            );

            ctx.stroke();
          }
        }
      }

      /*
       * Nodes
       */

      for (const node of nodes) {
        const dx =
          mouse.x - node.x;

        const dy =
          mouse.y - node.y;

        const distance =
          Math.sqrt(
            dx * dx +
              dy * dy
          );

        const near =
          distance <
          mouse.radius;

        const influence = near
          ? 1 -
            distance /
              mouse.radius
          : 0;

        const alpha = near
          ? 0.2 +
            influence *
              0.75
          : 0.12;

        const radius = near
          ? node.radius +
            influence * 2.4
          : node.radius;

        ctx.fillStyle =
          `rgba(255,255,255,${alpha})`;

        ctx.beginPath();

        ctx.arc(
          node.x,
          node.y,
          radius,
          0,
          Math.PI * 2
        );


        ctx.fill();
      }

      animationFrame =
        requestAnimationFrame(
          render
        );
    };

    animationFrame =
      requestAnimationFrame(
        render
      );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

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
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-0
        overflow-hidden
      "
    >
      <canvas
        ref={canvasRef}
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-black/55
        "
      />
    </div>
  );
}