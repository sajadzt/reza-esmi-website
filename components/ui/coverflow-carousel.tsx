"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CoverflowMeta {
  label: string;
  value: string;
}

export interface CoverflowSlide {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  href?: string;
  meta?: CoverflowMeta[];
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];

  cardWidth?: string;

  rotate?: number;
  depth?: number;
  perspective?: number;
  falloff?: number;
  fade?: number;
  gap?: number;

  loop?: boolean;
  showCaption?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;

  label?: string;

  className?: string;
}

function mod(value: number, length: number) {
  return ((value % length) + length) % length;
}

function getOffset(
  index: number,
  activeIndex: number,
  total: number,
  loop: boolean
) {
  let offset = index - activeIndex;

  if (!loop) {
    return offset;
  }

  if (offset > total / 2) {
    offset -= total;
  }

  if (offset < -total / 2) {
    offset += total;
  }

  return offset;
}

export default function CoverflowCarousel({
  slides,
  cardWidth = "clamp(260px, 30vw, 440px)",
  rotate = 32,
  depth = 0.55,
  perspective = 3.2,
  falloff = 0.6,
  fade = 0.12,
  gap = 0.08,
  loop = true,
  showCaption = true,
  showNavigation = true,
  showPagination = true,
  label = "Projects",
  className = "",
}: CoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (!total) return;

      if (loop) {
        setActiveIndex(mod(index, total));
        return;
      }

      setActiveIndex(
        Math.max(0, Math.min(total - 1, index))
      );
    },
    [loop, total]
  );

  const next = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const previous = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  /*
   * Mouse wheel navigation.
   *
   * The wheel changes the active project instead of
   * vertically scrolling the cards.
   */
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 5) return;

      const target = event.target as HTMLElement | null;

      if (!target?.closest("[data-coverflow]")) {
        return;
      }

      event.preventDefault();

      if (event.deltaY > 0) {
        next();
      } else {
        previous();
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [next, previous]);

  /*
   * Keyboard support.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [next, previous]);

  /*
   * Touch / swipe.
   */
  const [touchStartX, setTouchStartX] =
    useState<number | null>(null);

  const handleTouchStart = (
    event: React.TouchEvent
  ) => {
    setTouchStartX(
      event.touches[0]?.clientX ?? null
    );
  };

  const handleTouchEnd = (
    event: React.TouchEvent
  ) => {
    if (touchStartX === null) return;

    const endX =
      event.changedTouches[0]?.clientX ?? touchStartX;

    const distance = endX - touchStartX;

    if (Math.abs(distance) > 45) {
      if (distance < 0) {
        next();
      } else {
        previous();
      }
    }

    setTouchStartX(null);
  };

  const visibleSlides = useMemo(() => {
    return slides.map((slide, index) => {
      const offset = getOffset(
        index,
        activeIndex,
        total,
        loop
      );

      return {
        slide,
        index,
        offset,
      };
    });
  }, [
    slides,
    activeIndex,
    total,
    loop,
  ]);

  if (!slides.length) {
    return null;
  }

  return (
    <section
      data-coverflow
      className={`
        relative
        w-full
        overflow-hidden
        ${className}
      `}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* =====================================================
          CAROUSEL STAGE
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1500px]
        "
        style={{
          height:
            "clamp(520px, 55vw, 720px)",
          perspective: `${perspective * 1000}px`,
        }}
      >
        {visibleSlides.map(
          ({
            slide,
            index,
            offset,
          }) => {
            const absoluteOffset =
              Math.abs(offset);

            /*
             * Only render a useful number of cards.
             * This prevents all projects collapsing
             * into the center.
             */
            if (absoluteOffset > 3) {
              return null;
            }

            const isActive = offset === 0;

            /*
             * Horizontal separation.
             *
             * The active card stays in the center.
             * Side cards remain clearly separated.
             */
            const horizontalStep =
              `clamp(230px, calc(${cardWidth} * ${1 + gap}), 620px)`;

            const translateX =
              offset === 0
                ? "0px"
                : `calc(${offset} * ${horizontalStep})`;

            /*
             * Scale progressively.
             */
            const scale =
              offset === 0
                ? 1
                : absoluteOffset === 1
                ? 0.78
                : absoluteOffset === 2
                ? 0.62
                : 0.48;

            /*
             * Rotation.
             */
            const rotation =
              offset === 0
                ? 0
                : offset > 0
                ? -rotate
                : rotate;

            /*
             * Depth.
             */
            const translateZ =
              offset === 0
                ? 40
                : -absoluteOffset *
                  depth *
                  180;

            /*
             * Opacity.
             */
            const opacity =
              offset === 0
                ? 1
                : absoluteOffset === 1
                ? 0.72
                : absoluteOffset === 2
                ? 0.4
                : fade;

            const brightness =
              offset === 0
                ? 1
                : absoluteOffset === 1
                ? 0.62
                : 0.35;

            const zIndex =
              50 - absoluteOffset * 10;

            return (
              <div
                key={`${slide.title}-${index}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: cardWidth,

                  height:
                    "clamp(360px, 42vw, 540px)",

                  marginLeft:
                    `calc(-1 * ${cardWidth} / 2)`,

                  marginTop:
                    "clamp(-270px, -21vw, -180px)",

                  transform: `
                    translateX(${translateX})
                    translateY(0)
                    translateZ(${translateZ}px)
                    rotateY(${rotation}deg)
                    scale(${scale})
                  `,

                  transformStyle:
                    "preserve-3d",

                  opacity,

                  zIndex,

                  transition:
                    "transform 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease",

                  pointerEvents:
                    absoluteOffset <= 2
                      ? "auto"
                      : "none",
                }}
              >
                <Link
                  href={
                    slide.href ?? "#"
                  }
                  className="
                    group
                    relative
                    block
                    h-full
                    w-full
                    overflow-hidden
                    rounded-[2px]
                    bg-[#111]
                  "
                  onClick={(event) => {
                    /*
                     * Clicking a side card first makes it active.
                     * Clicking the active card opens its project.
                     */
                    if (!isActive) {
                      event.preventDefault();
                      goTo(index);
                    }
                  }}
                >
                  {/* IMAGE */}

                  <div
                    className="
                      absolute
                      inset-0
                      overflow-hidden
                    "
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      draggable={false}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.025]
                      "
                      style={{
                        filter: `
                          brightness(${brightness})
                          saturate(0.9)
                        `,
                      }}
                    />
                  </div>

                  {/* DARK GRADIENT */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black
                      via-black/20
                      to-transparent
                    "
                  />

                  {/* ACTIVE BORDER */}

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      inset-0
                      border
                      transition-all
                      duration-500

                      ${
                        isActive
                          ? "border-white/35"
                          : "border-white/10"
                      }
                    `}
                  />

                  {/* ACTIVE RED MARK */}

                  {isActive && (
                    <div
                      className="
                        absolute
                        left-0
                        top-1/2
                        h-20
                        w-[3px]
                        -translate-y-1/2
                        bg-[#bc3019]
                      "
                    />
                  )}

                  {/* CAPTION */}

                  {showCaption && (
                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        p-5
                        md:p-7
                      "
                    >
                      <div
                        className="
                          mb-2
                          text-[9px]
                          uppercase
                          tracking-[0.3em]
                          text-white/40
                        "
                      >
                        {label}
                      </div>

                      <h3
                        className="
                          text-xl
                          font-light
                          uppercase
                          tracking-[-0.02em]
                          text-white
                          md:text-2xl
                        "
                      >
                        {slide.title}
                      </h3>

                      {slide.subtitle && (
                        <p
                          className="
                            mt-2
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            text-white/45
                          "
                        >
                          {slide.subtitle}
                        </p>
                      )}

                      {isActive &&
                        slide.meta &&
                        slide.meta.length > 0 && (
                          <div
                            className="
                              mt-5
                              grid
                              grid-cols-3
                              gap-4
                              border-t
                              border-white/10
                              pt-4
                            "
                          >
                            {slide.meta.map(
                              (meta) => (
                                <div
                                  key={
                                    meta.label
                                  }
                                >
                                  <div
                                    className="
                                      text-[7px]
                                      uppercase
                                      tracking-[0.25em]
                                      text-white/25
                                    "
                                  >
                                    {
                                      meta.label
                                    }
                                  </div>

                                  <div
                                    className="
                                      mt-1
                                      text-[9px]
                                      text-white/65
                                    "
                                  >
                                    {
                                      meta.value
                                    }
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  )}

                  {/* NUMBER */}

                  <div
                    className="
                      absolute
                      right-4
                      top-4
                      text-[9px]
                      tracking-[0.2em]
                      text-white/40
                    "
                  >
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </div>
                </Link>
              </div>
            );
          }
        )}
      </div>

      {/* =====================================================
          CONTROLS
      ===================================================== */}

      {(showNavigation ||
        showPagination) && (
        <div
          className="
            relative
            z-[100]
            mx-auto
            flex
            w-full
            max-w-[1500px]
            items-center
            justify-center
            gap-6
            pb-5
          "
        >
          {showNavigation && (
            <button
              type="button"
              onClick={previous}
              aria-label="Previous project"
              className="
                group
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/[0.03]
                text-white/60
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-white/40
                hover:bg-white/[0.08]
                hover:text-white
              "
            >
              <span
                className="
                  text-lg
                  transition-transform
                  duration-300
                  group-hover:-translate-x-0.5
                "
              >
                ←
              </span>
            </button>
          )}

          {showPagination && (
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              {slides.map(
                (slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() =>
                      goTo(index)
                    }
                    aria-label={`Go to ${slide.title}`}
                    className="
                      relative
                      h-1
                      overflow-hidden
                      rounded-full
                      transition-all
                      duration-500
                    "
                    style={{
                      width:
                        index ===
                        activeIndex
                          ? 32
                          : 7,
                      background:
                        index ===
                        activeIndex
                          ? "#bc3019"
                          : "rgba(255,255,255,0.22)",
                    }}
                  />
                )
              )}
            </div>
          )}

          {showNavigation && (
            <button
              type="button"
              onClick={next}
              aria-label="Next project"
              className="
                group
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/[0.03]
                text-white/60
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-white/40
                hover:bg-white/[0.08]
                hover:text-white
              "
            >
              <span
                className="
                  text-lg
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              >
                →
              </span>
            </button>
          )}
        </div>
      )}

      {/* CURRENT PROJECT */}

      <div
        className="
          mt-2
          text-center
          text-[9px]
          uppercase
          tracking-[0.3em]
          text-white/30
        "
      >
        {String(activeIndex + 1).padStart(
          2,
          "0"
        )}{" "}
        /{" "}
        {String(total).padStart(2, "0")}
      </div>
    </section>
  );
}