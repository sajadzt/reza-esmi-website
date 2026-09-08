"use client";

import { useCallback, useState } from "react";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  image: string;
  href: string;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  className?: string;
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M11 4L6 9L11 14"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M7 4L12 9L7 14"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getTransform(offset: number) {
  const abs = Math.abs(offset);
  const sign = offset === 0 ? 0 : offset > 0 ? 1 : -1;

  if (abs === 0) {
    return {
      translateX: 0,
      scale: 1,
      opacity: 1,
      zIndex: 20,
      rotateY: 0,
      brightness: 1,
    };
  }

  if (abs === 1) {
    return {
      translateX: sign * 295,
      scale: 0.72,
      opacity: 0.78,
      zIndex: 10,
      rotateY: sign * -10,
      brightness: 0.55,
    };
  }

  if (abs === 2) {
    return {
      translateX: sign * 470,
      scale: 0.52,
      opacity: 0.35,
      zIndex: 4,
      rotateY: sign * -18,
      brightness: 0.3,
    };
  }

  return {
    translateX: sign * 600,
    scale: 0.4,
    opacity: 0,
    zIndex: 1,
    rotateY: sign * -25,
    brightness: 0.2,
  };
}

interface CardProps {
  item: CarouselItem;
  index: number;
  offset: number;
  onClick: () => void;
}

function ArchitectureCard({
  item,
  index,
  offset,
  onClick,
}: CardProps) {
  const transform = getTransform(offset);
  const active = offset === 0;

  const style: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "clamp(230px, 25vw, 300px)",
    height: "clamp(330px, 35vw, 420px)",
    marginLeft: "clamp(-150px, -12.5vw, -115px)",
    marginTop: "clamp(-210px, -17.5vw, -165px)",
    transform: `translateX(${transform.translateX}px) translateY(0) scale(${transform.scale}) perspective(900px) rotateY(${transform.rotateY}deg)`,
    opacity: transform.opacity,
    zIndex: transform.zIndex,
    transition:
      "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
    cursor: "pointer",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: active
      ? "0 0 0 1px rgba(255,255,255,0.12), 0 0 60px 10px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.8)"
      : "0 20px 60px rgba(0,0,0,0.6)",
  };

  const numLabel = String(index + 1).padStart(2, "0");

  return (
    <div
      style={style}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      aria-label={item.title}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: `brightness(${transform.brightness})`,
          transition: "filter 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            userSelect: "none",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.92) 100%)",
          pointerEvents: "none",
        }}
      />

      {active && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.35) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.35) 70%, transparent)",
              borderRadius: "16px 16px 0 0",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 72,
              left: 0,
              width: 3,
              height: 64,
              background: "#bc3019",
              borderRadius: "0 2px 2px 0",
            }}
          />
        </>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: active ? "0 20px 20px" : "0 14px 14px",
        }}
      >
        {!active && (
          <div
            style={{
              width: 2,
              height: 24,
              background: "#bc3019",
              marginBottom: 6,
              opacity: 0.8,
            }}
          />
        )}

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: active ? 15 : 11,
                letterSpacing: "0.18em",
                color: "#fff",
                textTransform: "uppercase",
                marginBottom: active ? 6 : 3,
                lineHeight: 1.2,
              }}
            >
              {item.title}
            </div>

            <div
              style={{
                fontWeight: 300,
                fontSize: active ? 11 : 8,
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.5,
                letterSpacing: "0.03em",
                display:
                  active || Math.abs(offset) <= 1 ? "block" : "none",
              }}
            >
              {item.description}
            </div>
          </div>

          <div
            style={{
              fontWeight: 300,
              fontSize: active ? 14 : 10,
              color: active
                ? "rgba(255,255,255,0.5)"
                : "rgba(255,255,255,0.35)",
              letterSpacing: "0.05em",
              flexShrink: 0,
              paddingBottom: 2,
            }}
          >
            {numLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  className = "",
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);

  if (!items?.length) {
    return null;
  }

  const activeIndex = controlledIndex ?? internalIndex;
  const count = items.length;

  const setIndex = useCallback(
    (index: number) => {
      const nextIndex = mod(index, count);

      if (controlledIndex === undefined) {
        setInternalIndex(nextIndex);
      }

      onActiveChange?.(nextIndex);
    },
    [controlledIndex, count, onActiveChange],
  );

  const navigate = useCallback(
    (direction: 1 | -1) => {
      setIndex(activeIndex + direction);
    },
    [activeIndex, setIndex],
  );

  const handleCardClick = useCallback(
    (index: number) => {
      let offset = index - activeIndex;

      if (offset > count / 2) offset -= count;
      if (offset < -count / 2) offset += count;

      if (offset === 0) {
        window.location.href = items[index].href;
      } else {
        setIndex(index);
      }
    },
    [activeIndex, count, items, setIndex],
  );

  const activeItem = items[activeIndex];
  const activeNum = String(activeIndex + 1).padStart(2, "0");

  return (
    <section
      className={`relative flex min-h-[760px] w-full items-center justify-center overflow-hidden bg-black px-4 py-16 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center">
        <div className="mb-14 w-full px-4 md:px-10">
          <div className="mb-2 flex items-center gap-3">
            <div
              style={{
                width: 28,
                height: 1.5,
                background: "#bc3019",
              }}
            />
            <span
              style={{
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "#bc3019",
                textTransform: "uppercase",
              }}
            >
              Selected Work
            </span>
          </div>

          <h2
            style={{
              fontFamily: "inherit",
              fontWeight: 400,
              fontSize: "clamp(28px, 4vw, 46px)",
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.01em",
              lineHeight: 1.15,
            }}
          >
            Architecture across{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              disciplines.
            </em>
          </h2>
        </div>

        <div
          className="relative w-full"
          style={{
            height: "clamp(390px, 38vw, 460px)",
            overflow: "visible",
          }}
        >
          {items.map((item, index) => {
            let offset = index - activeIndex;

            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            return (
              <ArchitectureCard
                key={item.id}
                item={item}
                index={index}
                offset={offset}
                onClick={() => handleCardClick(index)}
              />
            );
          })}
        </div>

        <div
          className="mt-12 flex flex-col items-center"
          style={{ gap: 20 }}
        >
          <div className="flex items-baseline">
            <span
              style={{
                fontWeight: 300,
                fontSize: "clamp(36px, 5vw, 60px)",
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              {activeNum}
            </span>

            <span
              style={{
                fontWeight: 300,
                fontSize: "clamp(20px, 3vw, 36px)",
                color: "rgba(255,255,255,0.2)",
                margin: "0 6px",
              }}
            >
              /
            </span>

            <span
              style={{
                fontWeight: 300,
                fontSize: "clamp(20px, 3vw, 36px)",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              {String(count).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-7">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Previous category"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-transparent transition-all duration-200 hover:border-white/60 hover:bg-white/[0.06]"
            >
              <ChevronLeft />
            </button>

            <div className="flex items-center gap-2.5">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(index)}
                  aria-label={`Go to ${item.title}`}
                  style={{
                    width: index === activeIndex ? 22 : 6,
                    height: 6,
                    borderRadius: 3,
                    background:
                      index === activeIndex
                        ? "#bc3019"
                        : "rgba(255,255,255,0.25)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition:
                      "width 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate(1)}
              aria-label="Next category"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-transparent transition-all duration-200 hover:border-white/60 hover:bg-white/[0.06]"
            >
              <ChevronRight />
            </button>
          </div>

          <div
            style={{
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
            }}
          >
            {activeItem.title}
          </div>
        </div>
      </div>
    </section>
  );
}
