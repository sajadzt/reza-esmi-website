"use client";

import { motion } from "framer-motion";
import { MouseEvent, useEffect, useState } from "react";
import "./holographic-wall-shadcnui.scss";

type ArchitecturalSymbol = {
  char: string;
  x: number;
  y: number;
};

type HolographicWallProps = {
  intensity?: number;
  radius?: number;
};

const ARCHITECTURAL_SYMBOLS = [
  "□",
  "○",
  "△",
  "＋",
  "╋",
  "┼",
  "┌",
  "┐",
  "└",
  "┘",
  "│",
  "─",
  "⌒",
  "∩",
  "∪",
  "◇",
  "◆",
  "·",
  "×",
  "↗",
  "↘",
];

export function HolographicWall({
  intensity = 0.8,
  radius = 260,
}: HolographicWallProps) {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [symbols, setSymbols] = useState<ArchitecturalSymbol[]>([]);

  useEffect(() => {
    const createWall = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const columns = width > 1400 ? 26 : width > 900 ? 20 : 14;
      const rows = Math.ceil(height / 70);

      const spacingX = width / columns;
      const spacingY = height / rows;

      const generated: ArchitecturalSymbol[] = [];

      for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
          generated.push({
            char:
              ARCHITECTURAL_SYMBOLS[
                Math.floor(
                  Math.random() * ARCHITECTURAL_SYMBOLS.length
                )
              ],
            x: x * spacingX + spacingX / 2,
            y: y * spacingY + spacingY / 2,
          });
        }
      }

      setSymbols(generated);
    };

    createWall();

    window.addEventListener("resize", createWall);

    return () => {
      window.removeEventListener("resize", createWall);
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  return (
    <div
      className="architectural-holographic-wall"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* Architectural drawing field */}
      <div className="architectural-symbols">
        {symbols.map((symbol, index) => {
          const distance = mousePosition
            ? Math.sqrt(
                Math.pow(symbol.x - mousePosition.x, 2) +
                  Math.pow(symbol.y - mousePosition.y, 2)
              )
            : Infinity;

          const active =
            mousePosition !== null && distance < radius;

          const localIntensity = active
            ? Math.max(0, 1 - distance / radius) * intensity
            : 0;

          return (
            <motion.div
              key={index}
              className="architectural-symbol"
              initial={{ opacity: 0.13 }}
              animate={{
                opacity: active
                  ? 0.18 + localIntensity * 0.9
                  : 0.13,

                scale: active
                  ? 1 + localIntensity * 0.45
                  : 1,

                color: active
                  ? `rgba(188, 48, 25, ${
                      0.35 + localIntensity * 0.65
                    })`
                  : "rgba(70, 70, 70, 0.17)",
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 28,
              }}
              style={{
                left: symbol.x,
                top: symbol.y,

                textShadow: active
                  ? `0 0 ${
                      localIntensity * 22
                    }px rgba(188, 48, 25, ${localIntensity})`
                  : "none",
              }}
            >
              {symbol.char}
            </motion.div>
          );
        })}
      </div>

      {/* Architectural drawing lines */}
      <div className="architectural-lines">
        <span className="line line-a" />
        <span className="line line-b" />
        <span className="line line-c" />
        <span className="line line-d" />
      </div>

      {/* Cursor illumination */}
      {mousePosition && (
        <motion.div
          className="cursor-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="cursor-glow"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              width: radius * 2,
              height: radius * 2,
            }}
          />
        </motion.div>
      )}
    </div>
  );
}

export default HolographicWall;