"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface ProjectVisualProps {
  hero: string;
  gallery?: string[];
  plans?: string[];
  title?: string;
}

interface CarouselItem {
  src: string;
  type: "gallery" | "plan";
  index: number;
  id: string;
}

/* ============================================================
   ASSET PATH
   ============================================================ */

function cleanAssetPath(src: string): string {
  if (!src) return "";

  let value = src.trim();

  value = value.replace(/\\/g, "/");
  value = value.replace(/^\.\/+/, "");
  value = value.replace(/^public\//, "/");

  value = value.replace(
    /^data\/projects\/projects\//,
    "/images/projects/"
  );

  if (!value.startsWith("/")) {
    value = `/${value}`;
  }

  return value;
}

function unique(values: string[]): string[] {
  return Array.from(
    new Set(
      values
        .map(cleanAssetPath)
        .filter(Boolean)
    )
  );
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function ProjectVisual({
  hero,
  gallery = [],
  plans = [],
  title = "Project",
}: ProjectVisualProps) {
  /* ==========================================================
     NORMALIZE
     ========================================================== */

  const normalizedHero = cleanAssetPath(hero);

  const normalizedGallery = useMemo(
    () => unique(gallery),
    [gallery]
  );

  const normalizedPlans = useMemo(
    () => unique(plans),
    [plans]
  );

  /* ==========================================================
     ITEMS
     ========================================================== */

  const galleryItems = useMemo<CarouselItem[]>(
    () =>
      normalizedGallery.map((src, index) => ({
        src,
        type: "gallery",
        index,
        id: `gallery-${index}-${src}`,
      })),
    [normalizedGallery]
  );

  const planItems = useMemo<CarouselItem[]>(
    () =>
      normalizedPlans.map((src, index) => ({
        src,
        type: "plan",
        index,
        id: `plan-${index}-${src}`,
      })),
    [normalizedPlans]
  );

  /* ==========================================================
     STATE
     ========================================================== */

  const [selectedImage, setSelectedImage] =
    useState(normalizedHero);

  const [selectedGalleryIndex, setSelectedGalleryIndex] =
    useState(-1);

  const [selectedPlanIndex, setSelectedPlanIndex] =
    useState(-1);

  /* ==========================================================
     REFS
     ========================================================== */

  const galleryRef =
    useRef<HTMLDivElement | null>(null);

  const plansRef =
    useRef<HTMLDivElement | null>(null);

  /*
   * Prevent a single mouse-wheel gesture from jumping
   * through 5-10 images because modern mice/trackpads
   * can fire many wheel events at once.
   */
  const wheelLockRef =
    useRef(false);

  const wheelUnlockTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ==========================================================
     RESET WHEN PROJECT CHANGES
     ========================================================== */

  useEffect(() => {
    setSelectedImage(normalizedHero);
    setSelectedGalleryIndex(-1);
    setSelectedPlanIndex(-1);
  }, [normalizedHero]);

  /* ==========================================================
     CLEANUP
     ========================================================== */

  useEffect(() => {
    return () => {
      if (wheelUnlockTimerRef.current) {
        clearTimeout(wheelUnlockTimerRef.current);
      }
    };
  }, []);

  /* ==========================================================
     CENTER CARD
     ========================================================== */

  function centerCard(
    container: HTMLDivElement | null,
    index: number
  ) {
    if (!container) return;

    const cards =
      container.querySelectorAll<HTMLElement>(
        "[data-project-card]"
      );

    const card = cards[index];

    if (!card) return;

    const target =
      card.offsetLeft -
      container.clientWidth / 2 +
      card.clientWidth / 2;

    container.scrollTo({
      left: Math.max(0, target),
      behavior: "smooth",
    });
  }

  /* ==========================================================
     SELECT GALLERY
     ========================================================== */

  function selectGallery(
    item: CarouselItem,
    index: number
  ) {
    setSelectedImage(item.src);
    setSelectedGalleryIndex(index);
    setSelectedPlanIndex(-1);

    requestAnimationFrame(() => {
      centerCard(
        galleryRef.current,
        index
      );
    });
  }

  /* ==========================================================
     SELECT PLAN
     ========================================================== */

  function selectPlan(
    item: CarouselItem,
    index: number
  ) {
    setSelectedImage(item.src);
    setSelectedPlanIndex(index);
    setSelectedGalleryIndex(-1);

    requestAnimationFrame(() => {
      centerCard(
        plansRef.current,
        index
      );
    });
  }

  /* ==========================================================
     WHEEL → SELECT IMAGE
     
     IMPORTANT:
     
     We DO NOT scroll the page.
     We DO NOT rely on scrollLeft.
     
     Wheel over Gallery:
       down → next gallery
       up   → previous gallery
     
     Wheel over Plans:
       down → next plan
       up   → previous plan
     
     Wheel anywhere else:
       normal browser page scrolling.
     ========================================================== */

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      /*
       * Never interfere with browser zoom.
       */
      if (
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      /*
       * Find the nearest interactive carousel.
       *
       * Because wheel events bubble from the Image/button/card
       * to the container, closest() lets us determine whether
       * the pointer is actually inside Gallery or Plans.
       */
      const target =
        event.target instanceof Element
          ? event.target
          : null;

      if (!target) return;

      const galleryContainer =
        target.closest(
          "[data-project-gallery]"
        );

      const plansContainer =
        target.closest(
          "[data-project-plans]"
        );

      /*
       * If the pointer is NOT inside Gallery or Plans,
       * DO NOTHING.
       *
       * The page keeps its normal vertical scroll.
       */
      if (
        !galleryContainer &&
        !plansContainer
      ) {
        return;
      }

      /*
       * Ignore extremely tiny trackpad noise.
       */
      const delta =
        Math.abs(event.deltaY) >=
        Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (Math.abs(delta) < 4) {
        return;
      }

      /*
       * IMPORTANT:
       *
       * Stop the browser from performing its normal
       * vertical page scroll.
       *
       * This works because the listener below is explicitly
       * registered with passive:false.
       */
      if (event.cancelable) {
        event.preventDefault();
      }

      event.stopPropagation();

      /*
       * Prevent one physical wheel gesture from triggering
       * multiple image changes.
       */
      if (wheelLockRef.current) {
        return;
      }

      wheelLockRef.current = true;

      if (wheelUnlockTimerRef.current) {
        clearTimeout(
          wheelUnlockTimerRef.current
        );
      }

      /*
       * Down = forward
       * Up = backward
       */
      const direction =
        delta > 0 ? 1 : -1;

      /*
       * ======================================================
       * GALLERY
       * ======================================================
       */

      if (galleryContainer) {
        if (!galleryItems.length) {
          wheelLockRef.current = false;
          return;
        }

        /*
         * If currently showing a gallery image,
         * continue from that image.
         *
         * Otherwise start from the first image.
         */
        const current =
          selectedGalleryIndex >= 0
            ? selectedGalleryIndex
            : direction > 0
              ? -1
              : 0;

        const nextIndex =
          Math.max(
            0,
            Math.min(
              galleryItems.length - 1,
              current + direction
            )
          );

        /*
         * If already at the end, don't change.
         */
        if (
          nextIndex !== current
        ) {
          selectGallery(
            galleryItems[nextIndex],
            nextIndex
          );
        }
      }

      /*
       * ======================================================
       * PLANS
       * ======================================================
       */

      if (plansContainer) {
        if (!planItems.length) {
          wheelLockRef.current = false;
          return;
        }

        const current =
          selectedPlanIndex >= 0
            ? selectedPlanIndex
            : direction > 0
              ? -1
              : 0;

        const nextIndex =
          Math.max(
            0,
            Math.min(
              planItems.length - 1,
              current + direction
            )
          );

        if (
          nextIndex !== current
        ) {
          selectPlan(
            planItems[nextIndex],
            nextIndex
          );
        }
      }

      /*
       * Unlock after the wheel burst has finished.
       */
      wheelUnlockTimerRef.current =
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 450);
    };

    /*
     * VERY IMPORTANT:
     *
     * passive:false is required because we call
     * event.preventDefault().
     *
     * Without this, Chrome can allow the page to
     * continue scrolling vertically.
     */
    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
        capture: true,
      }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel,
        {
          capture: true,
        }
      );
    };
  }, [
    galleryItems,
    planItems,
    selectedGalleryIndex,
    selectedPlanIndex,
  ]);

  /* ==========================================================
     CAROUSEL
     ========================================================== */

  function Carousel({
    items,
    containerRef,
    selectedIndex,
    onSelect,
    dataAttribute,
  }: {
    items: CarouselItem[];
    containerRef: React.RefObject<HTMLDivElement | null>;
    selectedIndex: number;
    onSelect: (
      item: CarouselItem,
      index: number
    ) => void;
    dataAttribute:
      | "data-project-gallery"
      | "data-project-plans";
  }) {
    if (items.length === 0) {
      return null;
    }

    return (
      <div
        ref={containerRef}
        {...{
          [dataAttribute]: true,
        }}
        style={{
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",

          /*
           * IMPORTANT:
           *
           * The carousel itself can still be dragged/
           * horizontally scrolled manually.
           *
           * Mouse wheel is handled separately by the
           * global controller above.
           */
          overscrollBehaviorX: "contain",

          cursor: "grab",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            minWidth: "100%",
            alignItems: "center",
            gap: "24px",
            paddingLeft: "8vw",
            paddingRight: "8vw",
            paddingTop: "56px",
            paddingBottom: "56px",
          }}
        >
          {items.map(
            (item, index) => {
              const selected =
                selectedIndex === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  data-project-card
                  onClick={() =>
                    onSelect(
                      item,
                      index
                    )
                  }
                  style={{
                    position: "relative",
                    flex: "0 0 auto",
                    width: selected
                      ? "min(48vw, 620px)"
                      : "min(28vw, 360px)",
                    padding: 0,
                    border: "none",
                    background:
                      "transparent",
                    cursor: "pointer",
                    opacity: selected
                      ? 1
                      : 0.42,
                    transform: selected
                      ? "scale(1.04)"
                      : "scale(1)",
                    transition:
                      "width 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1), opacity 400ms ease",
                  }}
                >
                  {/* BACKLIGHT */}

                  <div
                    style={{
                      position:
                        "absolute",
                      inset: "-32px",
                      borderRadius:
                        "24px",
                      background:
                        "rgba(255,255,255,0.11)",
                      filter:
                        "blur(48px)",
                      opacity: selected
                        ? 1
                        : 0,
                      pointerEvents:
                        "none",
                      transition:
                        "opacity 500ms ease",
                    }}
                  />

                  {/* CARD */}

                  <div
                    style={{
                      position:
                        "relative",
                      width: "100%",
                      aspectRatio:
                        item.type ===
                        "plan"
                          ? "4 / 3"
                          : "16 / 10",
                      overflow:
                        "hidden",
                      background:
                        "rgba(255,255,255,0.025)",
                      border: selected
                        ? "1px solid rgba(255,255,255,0.60)"
                        : "1px solid rgba(255,255,255,0.10)",
                      transition:
                        "border-color 400ms ease",
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={
                        item.type ===
                        "plan"
                          ? `${title} plan ${
                              item.index + 1
                            }`
                          : `${title} gallery image ${
                              item.index + 1
                            }`
                      }
                      fill
                      sizes="620px"
                      style={{
                        objectFit:
                          "contain",
                        filter: selected
                          ? "brightness(1)"
                          : "brightness(0.55)",
                        transition:
                          "filter 500ms ease",
                      }}
                    />

                    {/* TYPE */}

                    <span
                      style={{
                        position:
                          "absolute",
                        top: "16px",
                        left: "16px",
                        zIndex: 10,
                        fontSize:
                          "8px",
                        textTransform:
                          "uppercase",
                        letterSpacing:
                          "0.3em",
                        color:
                          "rgba(255,255,255,0.45)",
                      }}
                    >
                      {item.type ===
                      "plan"
                        ? "Plan"
                        : "View"}
                    </span>

                    {/* NUMBER */}

                    <span
                      style={{
                        position:
                          "absolute",
                        bottom: "16px",
                        left: "16px",
                        zIndex: 10,
                        fontSize:
                          "9px",
                        textTransform:
                          "uppercase",
                        letterSpacing:
                          "0.3em",
                        color: selected
                          ? "#ffffff"
                          : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    {/* RED ACTIVE MARKER */}

                    {selected && (
                      <span
                        style={{
                          position:
                            "absolute",
                          bottom: 0,
                          left: 0,
                          zIndex: 20,
                          width: "80px",
                          height: "3px",
                          background:
                            "#bc3019",
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            }
          )}
        </div>
      </div>
    );
  }

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <div
      style={{
        display: "block",
        position: "relative",
        width: "100%",
        background: "#000",
        color: "#fff",
      }}
    >
      {/* ====================================================
          1 — HERO
          ==================================================== */}

      <section
        style={{
          display: "block",
          position: "relative",
          width: "100%",
          background: "#000",
        }}
      >
        <div
          style={{
            display: "block",
            position: "relative",
            width: "100%",
            maxWidth: "1500px",
            margin: "0 auto",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              overflow: "hidden",
              background: "#000",
            }}
          >
            <Image
              src={selectedImage}
              alt={`${title} selected image`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1500px"
              style={{
                objectFit: "contain",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.5), transparent 45%, transparent)",
              }}
            />

            <div
              style={{
                position:
                  "absolute",
                left: "20px",
                bottom: "20px",
                zIndex: 20,
                display: "flex",
                alignItems:
                  "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius:
                    "999px",
                  background:
                    "#bc3019",
                }}
              />

              <span
                style={{
                  fontSize:
                    "9px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    "0.3em",
                  color:
                    "rgba(255,255,255,0.6)",
                }}
              >
                {selectedGalleryIndex >=
                0
                  ? `Gallery ${String(
                      selectedGalleryIndex +
                        1
                    ).padStart(
                      2,
                      "0"
                    )}`
                  : selectedPlanIndex >=
                    0
                    ? `Plan ${String(
                        selectedPlanIndex +
                          1
                      ).padStart(
                        2,
                        "0"
                      )}`
                    : "Project"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          GAP — HERO → GALLERY
          ==================================================== */}

      <div
        style={{
          width: "100%",
          height: "160px",
          background: "#000",
        }}
      />

      {/* ====================================================
          2 — GALLERY
          ==================================================== */}

      {galleryItems.length > 0 && (
        <section
          style={{
            display: "block",
            position: "relative",
            width: "100%",
            background: "#000",
          }}
        >
          <div
            style={{
              width: "100%",
              paddingLeft: "6vw",
              paddingRight: "6vw",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom:
                  "12px",
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "1px",
                  background:
                    "#bc3019",
                }}
              />

              <span
                style={{
                  fontSize:
                    "9px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    "0.3em",
                  color:
                    "#bc3019",
                }}
              >
                Gallery
              </span>
            </div>

            <h2
              style={{
                margin: 0,
                fontSize:
                  "clamp(24px, 3vw, 40px)",
                fontWeight: 300,
                color: "#fff",
              }}
            >
              Project views
            </h2>
          </div>

          <Carousel
            items={galleryItems}
            containerRef={
              galleryRef
            }
            selectedIndex={
              selectedGalleryIndex
            }
            onSelect={
              selectGallery
            }
            dataAttribute="data-project-gallery"
          />

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              paddingLeft: "8vw",
              paddingRight: "8vw",
              paddingBottom:
                "20px",
              fontSize: "8px",
              textTransform:
                "uppercase",
              letterSpacing:
                "0.3em",
              color:
                "rgba(255,255,255,0.25)",
            }}
          >
            <span>
              Gallery
            </span>

            <span>
              Scroll / Drag / Select
            </span>
          </div>
        </section>
      )}

      {/* ====================================================
          GAP — GALLERY → PLANS
          ==================================================== */}

      {galleryItems.length > 0 &&
        planItems.length > 0 && (
          <div
            style={{
              width: "100%",
              height: "160px",
              background: "#000",
            }}
          />
        )}

      {/* ====================================================
          3 — PLANS
          ==================================================== */}

      {planItems.length > 0 && (
        <section
          style={{
            display: "block",
            position: "relative",
            width: "100%",
            background: "#000",
          }}
        >
          <div
            style={{
              width: "100%",
              paddingLeft: "6vw",
              paddingRight: "6vw",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom:
                  "12px",
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "1px",
                  background:
                    "#bc3019",
                }}
              />

              <span
                style={{
                  fontSize:
                    "9px",
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    "0.3em",
                  color:
                    "#bc3019",
                }}
              >
                Plans
              </span>
            </div>

            <h2
              style={{
                margin: 0,
                fontSize:
                  "clamp(24px, 3vw, 40px)",
                fontWeight: 300,
                color: "#fff",
              }}
            >
              Architectural documentation
            </h2>
          </div>

          <Carousel
            items={planItems}
            containerRef={
              plansRef
            }
            selectedIndex={
              selectedPlanIndex
            }
            onSelect={selectPlan}
            dataAttribute="data-project-plans"
          />

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              paddingLeft: "8vw",
              paddingRight: "8vw",
              paddingBottom:
                "80px",
              fontSize: "8px",
              textTransform:
                "uppercase",
              letterSpacing:
                "0.3em",
              color:
                "rgba(255,255,255,0.25)",
            }}
          >
            <span>
              Plans
            </span>

            <span>
              Scroll / Drag / Select
            </span>
          </div>
        </section>
      )}
    </div>
  );
}