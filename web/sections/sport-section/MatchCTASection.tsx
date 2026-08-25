"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { SanityMatchCTASection } from "@/lib/sanity/types";

const EASE_POWER4 = [0.22, 1, 0.36, 1] as const;
const EASE_POWER3 = [0.215, 0.61, 0.355, 1] as const;
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// ─── STEP 2: Fast Crisp Typewriter Heading Component ────────────────────────
function TypewriterHeading({ text, trigger }: { text: string; trigger: boolean }) {
  const [displayText, setDisplayText] = useState("");
  const [caretState, setCaretState] = useState<"typing" | "blinking" | "off">("off");

  useEffect(() => {
    if (!trigger) {
      setDisplayText("");
      setCaretState("off");
      return;
    }

    let i = 0;
    setCaretState("typing");

    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setCaretState("blinking");
        setTimeout(() => {
          setCaretState("off");
        }, 500);
      }
    }, 16); // Fast 16ms per character

    return () => clearInterval(typingInterval);
  }, [trigger, text]);

  return (
    <span className="inline-flex items-center justify-center">
      <span>{displayText}</span>
      {caretState !== "off" && (
        <span className={`inline-block ml-1 font-mono text-[#F5821F] ${caretState === "blinking" ? "animate-pulse" : ""}`}>
          |
        </span>
      )}
    </span>
  );
}

// ─── Step Animation Variants ──────────────────────────────────────────────────

// STEP 1 — Section Label
const labelVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_PREMIUM, delay: 0 },
  },
};

// STEP 3 — Subtitle Paragraph
const subVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: EASE_PREMIUM, delay: 0.35 },
  },
};

// STEP 4 — Turf Pitch (ScaleY 0 -> 1 grow from center)
const pitchVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.4, ease: EASE_POWER3, delay: 0.5 },
  },
};

// STEP 5 — Stadium Assembly Rings
const ring1Variants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: 3 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.35, ease: EASE_PREMIUM, delay: 0.65 },
  },
};

const ring2Variants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -2 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.35, ease: EASE_PREMIUM, delay: 0.72 },
  },
};

const ring3Variants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: 2 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.35, ease: EASE_PREMIUM, delay: 0.79 },
  },
};

const outerRingVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_POWER4, delay: 0.86 },
  },
};

// STEP 6 — Dashed 30-Yard Field Circle
const dashedCircleVariants: Variants = {
  hidden: { opacity: 0, rotate: -90, scale: 0.9 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_PREMIUM, delay: 0.92 },
  },
};

// STEP 7 — BCCI Badge
const centerBadgeVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_PREMIUM, delay: 1.0 },
  },
};

// STEP 9 — Feature Cards
const leftCardVariants: Variants = {
  hidden: { opacity: 0, x: -30, scale: 0.96 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_POWER3, delay },
  }),
};

const rightCardVariants: Variants = {
  hidden: { opacity: 0, x: 30, scale: 0.96 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_POWER3, delay },
  }),
};

// STEP 10 — Luxury Product Specification Strip Column Entrance
const statColumnVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_PREMIUM, delay: 1.1 + delay },
  }),
};

// ─── Data Definitions ────────────────────────────────────────────────────────

interface Hotspot {
  id: string;
  icon: string;
  title: string;
  desc: string;
  align: "left" | "right";
  top: string;
  left?: string;
  right?: string;
  connectorDelay: number;
  cardDelay: number;
}

const defaultHotspots: Hotspot[] = [
  {
    id: "h1",
    icon: "🏏",
    title: "Professional Turf Pitch",
    desc: "BCCI-standard natural clay turf pitch designed for an authentic cricketing experience.",
    align: "left",
    top: "12%",
    left: "0%",
    connectorDelay: 1.05,
    cardDelay: 1.1,
  },
  {
    id: "h2",
    icon: "🚗",
    title: "Ample Parking",
    desc: "Spacious and secure parking designed to comfortably accommodate match-day visitors.",
    align: "left",
    top: "44%",
    left: "-8%",
    connectorDelay: 1.19,
    cardDelay: 1.24,
  },
  {
    id: "h3",
    icon: "🥤",
    title: "Player Refreshments",
    desc: "Refreshment and player support facilities for a comfortable match experience.",
    align: "left",
    top: "76%",
    left: "0%",
    connectorDelay: 1.33,
    cardDelay: 1.38,
  },
  {
    id: "h4",
    icon: "💡",
    title: "Ground Floodlights",
    desc: "High-quality floodlighting for professional evening and night matches.",
    align: "right",
    top: "12%",
    right: "0%",
    connectorDelay: 1.12,
    cardDelay: 1.17,
  },
  {
    id: "h5",
    icon: "👥",
    title: "Spectator Viewing",
    desc: "Comfortable viewing areas with a clear view of the cricket ground.",
    align: "right",
    top: "44%",
    right: "-8%",
    connectorDelay: 1.26,
    cardDelay: 1.31,
  },
  {
    id: "h6",
    icon: "🏆",
    title: "Tournament Ready",
    desc: "Suitable for tournaments, corporate matches, practice sessions, and competitive games.",
    align: "right",
    top: "76%",
    right: "0%",
    connectorDelay: 1.4,
    cardDelay: 1.45,
  },
];

interface StatBlock {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}

const stats: StatBlock[] = [
  {
    label: "LOCATION",
    value: "Accessible City Hub",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#E2B15C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 21.5c-4.2-4.5-8-8.2-8-12a8 8 0 1 1 16 0c0 3.8-3.8 7.5-8 12z" />
        <circle cx="12" cy="9.5" r="2.8" fill="#E2B15C" />
      </svg>
    ),
  },
  {
    label: "MATCH FACILITIES",
    value: (
      <>
        <span className="ba-stat-value-gold">Full</span> Ground
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="#E2B15C" className="w-5 h-5">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V18h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    label: "AVAILABLE SLOTS",
    value: (
      <>
        Daily <span className="ba-stat-value-gold">5 AM - 11 PM</span>
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#E2B15C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "PITCH TYPES",
    value: "Clay Turf / Astro",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#E2B15C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 20l12-12m0 0l3 3m-3-3l-2-2m5 5l2 2" />
        <circle cx="7.5" cy="16.5" r="1.5" fill="#E2B15C" />
      </svg>
    ),
  },
  {
    label: "PLAYER RATING",
    value: (
      <>
        <span className="ba-stat-value-gold">4.9★</span> Elite Ground
      </>
    ),
    icon: (
      <svg viewBox="0 0 24 24" fill="#E2B15C" className="w-5 h-5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

interface MatchCTASectionProps {
  data?: SanityMatchCTASection;
}

export default function MatchCTASection({ data }: MatchCTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Direction-aware scroll trigger (Resets ONLY when completely out of viewport)
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsAnimated(true);
        } else if (entry.boundingClientRect.top > window.innerHeight * 0.95) {
          setIsAnimated(false);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(sectionRef.current);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top <= viewportHeight * 0.92 && rect.bottom >= 0) {
        setIsAnimated(true);
      } else if (rect.top > viewportHeight * 0.95) {
        setIsAnimated(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headingText = data?.heading || "Book the Ground";

  return (
    <section ref={sectionRef} className="ba-root" id="book-arena">
      {/* Decorative overlays */}
      <div className="ba-bg-glow" />
      <div className="ba-bg-grass-lines" />

      <div className="ba-container">
        {/* Header */}
        <div className="ba-header">
          {/* STEP 1: Section Label */}
          <motion.div
            className="ba-eyebrow"
            variants={labelVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
          >
            <span className="ba-eyebrow-line" />
            <span className="ba-eyebrow-text">{data?.eyebrow || "Book the Ground"}</span>
            <span className="ba-eyebrow-line" />
          </motion.div>

          {/* STEP 2: Main Heading Fast Typewriter */}
          <h2 className="ba-heading">
            <TypewriterHeading text={headingText} trigger={isAnimated} />
          </h2>

          {/* STEP 3: Subtitle Paragraph */}
          <motion.p
            className="ba-desc"
            variants={subVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
          >
            {data?.description || "Everything you need for an authentic cricket experience, thoughtfully designed around a professional turf ground."}
          </motion.p>
        </div>

        {/* Cricket Ground Exploration Canvas */}
        <div className="ba-exploration-canvas">
          
          {/* STEP 8: Connector Lines Layer (Animated SVG stroke drawing) */}
          <div className="ba-connectors-svg-wrap" aria-hidden="true">
            <svg viewBox="0 0 1000 500" fill="none" className="ba-connectors-svg">
              {/* Left Side Connectors */}
              <motion.path
                d="M 180 110 Q 300 120 400 180"
                stroke={activeHotspot === "h1" ? "#F5821F" : "#CCD5CD"}
                strokeWidth={activeHotspot === "h1" ? "2" : "1"}
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={isAnimated ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.25, delay: 1.05, ease: EASE_PREMIUM }}
              />
              <motion.path
                d="M 150 250 Q 280 250 360 250"
                stroke={activeHotspot === "h2" ? "#F5821F" : "#CCD5CD"}
                strokeWidth={activeHotspot === "h2" ? "2" : "1"}
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={isAnimated ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.25, delay: 1.19, ease: EASE_PREMIUM }}
              />
              <motion.path
                d="M 180 390 Q 300 380 400 320"
                stroke={activeHotspot === "h3" ? "#F5821F" : "#CCD5CD"}
                strokeWidth={activeHotspot === "h3" ? "2" : "1"}
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={isAnimated ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.25, delay: 1.33, ease: EASE_PREMIUM }}
              />

              {/* Right Side Connectors */}
              <motion.path
                d="M 820 110 Q 700 120 600 180"
                stroke={activeHotspot === "h4" ? "#F5821F" : "#CCD5CD"}
                strokeWidth={activeHotspot === "h4" ? "2" : "1"}
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={isAnimated ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.25, delay: 1.12, ease: EASE_PREMIUM }}
              />
              <motion.path
                d="M 850 250 Q 720 250 640 250"
                stroke={activeHotspot === "h5" ? "#F5821F" : "#CCD5CD"}
                strokeWidth={activeHotspot === "h5" ? "2" : "1"}
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={isAnimated ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.25, delay: 1.26, ease: EASE_PREMIUM }}
              />
              <motion.path
                d="M 820 390 Q 700 380 600 320"
                stroke={activeHotspot === "h6" ? "#F5821F" : "#CCD5CD"}
                strokeWidth={activeHotspot === "h6" ? "2" : "1"}
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={isAnimated ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.25, delay: 1.4, ease: EASE_PREMIUM }}
              />
            </svg>
          </div>

          {/* STEP 9: Left Hotspots Column */}
          <div className="ba-hotspots-col ba-hotspots-col--left">
            {defaultHotspots.slice(0, 3).map((h, idx) => {
              const cmsH = data?.hotspots?.[idx];
              const title = cmsH?.title || h.title;
              const desc = cmsH?.desc || h.desc;
              const icon = cmsH?.icon || h.icon;

              return (
                <motion.div
                  key={h.id}
                  className={`ba-hotspot-card ba-hotspot-card--left ${activeHotspot === h.id ? "active" : ""}`}
                  style={{ top: h.top } as React.CSSProperties}
                  custom={h.cardDelay}
                  variants={leftCardVariants}
                  initial="hidden"
                  animate={isAnimated ? "visible" : "hidden"}
                  onMouseEnter={() => setActiveHotspot(h.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                  whileHover={{ y: -6 }}
                >
                  <span className="ba-card-icon">{icon}</span>
                  <div className="ba-card-text">
                    <h4 className="ba-card-title">{title}</h4>
                    <p className="ba-card-desc">{desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CENTERPIECE: Professional Cricket Ground Representation */}
          <div className="ba-ground-wrapper">
            <div className="ba-ground-shape">
              {/* Natural Ground Outer Perimeter & Outfield */}
              <motion.div
                className="ba-ground-outer"
                variants={outerRingVariants}
                initial="hidden"
                animate={isAnimated ? "visible" : "hidden"}
              >
                <div className="ba-ground-outfield">
                  {/* Outfield Mown Grass Stripes & Texture */}
                  <div className="ba-grass-mow-stripes" />

                  {/* STEP 6: 30-Yard Dashed Field Circle */}
                  <motion.div
                    className="ba-thirty-yard-circle"
                    variants={dashedCircleVariants}
                    initial="hidden"
                    animate={isAnimated ? "visible" : "hidden"}
                  />

                  {/* Natural Boundary Rope */}
                  <div className="ba-boundary-rope">
                    <div className="ba-boundary-flag flag--top" />
                    <div className="ba-boundary-flag flag--right" />
                    <div className="ba-boundary-flag flag--bottom" />
                    <div className="ba-boundary-flag flag--left" />
                  </div>

                  {/* STEP 4: Natural Clay Turf Pitch in Center */}
                  <motion.div
                    className="ba-turf-pitch"
                    variants={pitchVariants}
                    initial="hidden"
                    animate={isAnimated ? "visible" : "hidden"}
                    style={{ transformOrigin: "center center" }}
                  >
                    <div className="ba-pitch-clay-strip">
                      {/* Creases */}
                      <div className="ba-crease-line crease--top" />
                      <div className="ba-crease-line crease--bottom" />

                      {/* Stumps / Wickets */}
                      <div className="ba-wickets wickets--top">
                        <span className="stump" />
                        <span className="stump" />
                        <span className="stump" />
                      </div>
                      <div className="ba-wickets wickets--bottom">
                        <span className="stump" />
                        <span className="stump" />
                        <span className="stump" />
                      </div>
                    </div>
                  </motion.div>

                  {/* STEP 7: Floating Pitch Standard Badge */}
                  <motion.div 
                    className="ba-center-badge"
                    variants={centerBadgeVariants}
                    initial="hidden"
                    animate={isAnimated ? "visible" : "hidden"}
                    whileHover={{ y: -4, scale: 1.05 }}
                  >
                    <span className="ba-center-badge-dot" />
                    <span>BCCI Standard Clay Turf</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Ground Corner Floodlight Poles */}
              <div className="ba-ground-light-pole pole--top-left" aria-hidden="true" />
              <div className="ba-ground-light-pole pole--top-right" aria-hidden="true" />
              <div className="ba-ground-light-pole pole--bottom-left" aria-hidden="true" />
              <div className="ba-ground-light-pole pole--bottom-right" aria-hidden="true" />
            </div>
          </div>

          {/* STEP 9: Right Hotspots Column */}
          <div className="ba-hotspots-col ba-hotspots-col--right">
            {defaultHotspots.slice(3, 6).map((h, idx) => {
              const cmsH = data?.hotspots?.[idx + 3];
              const title = cmsH?.title || h.title;
              const desc = cmsH?.desc || h.desc;
              const icon = cmsH?.icon || h.icon;

              return (
                <motion.div
                  key={h.id}
                  className={`ba-hotspot-card ba-hotspot-card--right ${activeHotspot === h.id ? "active" : ""}`}
                  style={{ top: h.top } as React.CSSProperties}
                  custom={h.cardDelay}
                  variants={rightCardVariants}
                  initial="hidden"
                  animate={isAnimated ? "visible" : "hidden"}
                  onMouseEnter={() => setActiveHotspot(h.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                  whileHover={{ y: -6 }}
                >
                  <span className="ba-card-icon">{icon}</span>
                  <div className="ba-card-text">
                    <h4 className="ba-card-title">{title}</h4>
                    <p className="ba-card-desc">{desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* STEP 10: Luxury Product Specification Panel */}
        <div className="ba-stats-strip">
          {stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <motion.div
                className="ba-stat-item"
                custom={i * 0.08}
                variants={statColumnVariants}
                initial="hidden"
                animate={isAnimated ? "visible" : "hidden"}
              >
                {/* Circular Dark Glass Badge Container */}
                <div className="ba-stat-icon-badge" aria-hidden="true">
                  <span className="ba-stat-icon">{stat.icon}</span>
                </div>

                {/* Details */}
                <div className="ba-stat-details">
                  <span className="ba-stat-label">{stat.label}</span>
                  <span className="ba-stat-value">{stat.value}</span>
                </div>

                {/* Hover Underline Indicator */}
                <div className="ba-stat-indicator" aria-hidden="true" />
              </motion.div>

              {i < stats.length - 1 && <div className="ba-stat-divider" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
