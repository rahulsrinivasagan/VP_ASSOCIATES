"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { SanityPassionSection } from "@/lib/sanity/types";
import { getResponsiveImageUrl, getSanityFileUrl } from "@/lib/sanity/image";

const EASE_POWER4 = [0.22, 1, 0.36, 1] as const;
const EASE_POWER3 = [0.215, 0.61, 0.355, 1] as const;
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// ─── Step Animation Variants (Crisp ~35-40% Faster Timings) ─────────────────

// STEP 1 — Section Label
const labelVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_PREMIUM, delay: 0 },
  },
};

// STEP 2 — Main Heading Horizontal Mask (Left-to-Right Curtain Reveal)
const headingMaskVariants: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.45, ease: EASE_POWER4, delay: 0.2 },
  },
};

// STEP 3 — Subtitle Paragraph
const paraVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: EASE_PREMIUM, delay: 0.45 },
  },
};

// STEP 4 — Left Cricket Image (scale 1.15 -> 1, blur 10px -> 0, opacity 0 -> 1, 0.6s, Power4.out)
const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.15, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_POWER4, delay: 0.6 },
  },
};

// STEP 5 — Image Badges (scale 0.8 -> 1, opacity 0 -> 1, translateY 20px -> 0)
const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_PREMIUM, delay: 1.0 },
  },
};

// STEP 6 — Feature Cards Deck Sequence

// Card 1: Slide in translateX 120px -> 0
const card1Variants: Variants = {
  hidden: { opacity: 0, x: 120 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE_POWER3, delay: 1.1 },
  },
};

// Cards 2, 3, 4: Emerge from behind previous card translateY(-50px), translateX(40px) -> y:0, x:0
const cascadingCardVariants: Variants = {
  hidden: { opacity: 0, y: -50, x: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.4, ease: EASE_POWER3, delay },
  }),
};

// ─── Data Definitions ────────────────────────────────────────────────────────

interface PanelData {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  alignClass: string;
  delay: number;
  isFirst: boolean;
}

const defaultHighlightPanels: PanelData[] = [
  {
    id: "turf-pitch",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: "Professional Turf & Pitch",
    desc: "Meticulously rolled pitches designed for genuine bounce and seam movement, offering a true match-day feel.",
    alignClass: "ps-block--left",
    delay: 1.1,
    isFirst: true,
  },
  {
    id: "floodlit-matches",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: "Floodlit Night Matches",
    desc: "Experience the thrill of night cricket under professional LED lights that bring full stadium atmosphere to life.",
    alignClass: "ps-block--right",
    delay: 1.2,
    isFirst: false,
  },
  {
    id: "practice-nets",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      </svg>
    ),
    title: "Coaching & Practice Nets",
    desc: "Top-tier training cages and bowling machines designed to help batsmen and bowlers hone their skills safely.",
    alignClass: "ps-block--left-tight",
    delay: 1.3,
    isFirst: false,
  },
  {
    id: "tournaments-events",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z" />
      </svg>
    ),
    title: "Tournaments & Team Events",
    desc: "The ultimate venue for host leagues, corporate matches, and competitive club cricket meets year-round.",
    alignClass: "ps-block--right-wide",
    delay: 1.4,
    isFirst: false,
  },
];

interface PassionSectionProps {
  data?: SanityPassionSection;
}

export default function PassionSection({ data }: PassionSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Direction-aware scroll trigger (Resets ONLY when completely out of viewport)
  useEffect(() => {
    if (!containerRef.current) return;

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

    observer.observe(containerRef.current);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
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

  // Responsive Variants
  const card1Variants: Variants = {
    hidden: { opacity: 0, x: isMobile ? 30 : 120 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: EASE_POWER3, delay: 1.1 },
    },
  };

  const cascadingCardVariants: Variants = {
    hidden: { opacity: 0, y: isMobile ? -20 : -50, x: isMobile ? 15 : 40 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.4, ease: EASE_POWER3, delay },
    }),
  };

  return (
    <section ref={containerRef} className="ps-root" id="passion-performance">
      {/* Abstract visual field overlays */}
      <div className="ps-bg-glow" aria-hidden="true" />
      <div className="ps-bg-grid" aria-hidden="true" />

      <div className="ps-container">
        {/* Header */}
        <div className="ps-header">
          {/* STEP 1: Section Label */}
          <motion.div
            className="ps-eyebrow"
            variants={labelVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
          >
            <span className="ps-eyebrow-line" />
            <span className="ps-eyebrow-text">{data?.eyebrow || "Crafted for Cricket Excellence"}</span>
            <span className="ps-eyebrow-line" />
          </motion.div>

          {/* STEP 2: Main Heading (Horizontal Mask reveal from left to right) */}
          <motion.h2
            className="ps-heading"
            variants={headingMaskVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
          >
            {data?.heading || "Where Passion Meets Performance"}
          </motion.h2>

          {/* STEP 3: Paragraph */}
          <motion.p
            className="ps-para"
            variants={paraVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
          >
            {data?.description || `Every player, from casual beginners to season-hardened professionals, deserves a world-class environment. We combine state-of-the-art turf pitches, comprehensive coaching infrastructure, and high-intensity match play options to elevate your cricket journey.`}
          </motion.p>
        </div>

        {/* Editorial Layout */}
        <div className="ps-content">
          {/* Left Side: Large Visual Area with overlapping panels */}
          <div className="ps-visual-column">
            {/* STEP 4: Main Visual Image frame */}
            <motion.div
              className="ps-img-frame"
              variants={imageVariants}
              initial="hidden"
              animate={isAnimated ? "visible" : "hidden"}
            >
              {getSanityFileUrl(data?.video) ? (
                <video
                  src={getSanityFileUrl(data?.video)!}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={getResponsiveImageUrl(data?.mainImage, { width: 1000, height: 800, quality: 85 }) || "/images/sport/cricket-passion-performance.jpg"}
                  className="ps-img object-cover w-full h-full"
                />
              ) : (
                <img
                  src={getResponsiveImageUrl(data?.mainImage, { width: 1000, height: 800, quality: 85 }) || "/images/sport/cricket-passion-performance.jpg"}
                  alt={data?.mainImage?.alt || "Cricket nets and premium leather ball close-up"}
                  className="ps-img"
                  draggable={false}
                />
              )}
              <div className="ps-img-overlay" />
              <div className="ps-img-highlight-accent" />
            </motion.div>

            {/* STEP 5: Floating Stat Card 1 ("100% Premium Turf") */}
            <motion.div
              className="ps-float-stat ps-float-stat--top"
              variants={badgeVariants}
              initial="hidden"
              animate={isAnimated ? "visible" : "hidden"}
            >
              <span className="ps-stat-val">{data?.stat1Value || "100%"}</span>
              <span className="ps-stat-lbl">{data?.stat1Label || "Premium Turf"}</span>
            </motion.div>

            {/* STEP 5: Floating Stat Card 2 ("24/7 Floodlit Nets") */}
            <motion.div
              className="ps-float-stat ps-float-stat--bottom"
              variants={badgeVariants}
              initial="hidden"
              animate={isAnimated ? "visible" : "hidden"}
            >
              <span className="ps-stat-val">{data?.stat2Value || "24/7"}</span>
              <span className="ps-stat-lbl">{data?.stat2Label || "Floodlit Nets"}</span>
            </motion.div>

            {/* Decorative trajectory bezier arc overlay in background */}
            <svg className="ps-trajectory-svg" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
              <path d="M0,80 Q50,0 100,60" stroke="#f5821f" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
            </svg>
          </div>

          {/* Right Side: STEP 6 — Stacked Deck Feature Cards Sequence */}
          <div className="ps-panels-column">
            {defaultHighlightPanels.map((panel, idx) => {
              const cmsPanel = data?.highlightPanels?.[idx];
              const title = cmsPanel?.title || panel.title;
              const desc = cmsPanel?.desc || panel.desc;

              return (
                <motion.article
                  key={panel.id}
                  className={`ps-block ${panel.alignClass}`}
                  variants={panel.isFirst ? card1Variants : cascadingCardVariants}
                  custom={panel.delay}
                  initial="hidden"
                  animate={isAnimated ? "visible" : "hidden"}
                  whileHover={{ y: -6, scale: 1.01 }}
                >
                  {/* Wicket-inspired vertical line accent */}
                  <div className="ps-block-accent" />

                  <div className="ps-block-header">
                    <div className="ps-block-icon" aria-hidden="true">
                      {panel.icon}
                    </div>
                    <h3 className="ps-block-title">{title}</h3>
                  </div>
                  <p className="ps-block-desc">{desc}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
