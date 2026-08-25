"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { SanityCricketArenaSection } from "@/lib/sanity/types";
import { getResponsiveImageUrl, getSanityFileUrl } from "@/lib/sanity/image";

// ─── Animation Cubic Beziers ──────────────────────────────────────────────────
const EASE_POWER4 = [0.22, 1, 0.36, 1] as const;
const EASE_POWER3 = [0.215, 0.61, 0.355, 1] as const;
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// ─── Feature Data Defaults ─────────────────────────────────────────────────────

const defaultFeatures = [
  {
    id: "surface",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <path d="M2 12c0 4 4.5 8 10 8s10-4 10-8" />
        <path d="M12 2v20" />
      </svg>
    ),
    title: "Professional Playing Surface",
    desc: "BCCI-standard pitch with premium outfield maintained for every session.",
  },
  {
    id: "floodlights",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <circle cx="12" cy="12" r="4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: "Ground Floodlights",
    desc: "High-intensity LED floodlights for premium day-night match experiences.",
  },
  {
    id: "tournament",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
        <path d="M12 2a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z" />
      </svg>
    ),
    title: "Tournament Ready",
    desc: "Full scoring, PA system, and logistics support for leagues and knockouts.",
  },
  {
    id: "corporate",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Practice & Corporate Matches",
    desc: "Flexible bookings for training, corporate leagues, schools, and academies.",
  },
];

interface CricketArenaSectionProps {
  data?: SanityCricketArenaSection;
}

export default function CricketArenaSection({ data }: CricketArenaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isAnimated, setIsAnimated] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
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

  // Responsive Variants
  const imageRevealVariants: Variants = {
    hidden: { opacity: 0, scale: 1.25, x: isMobile ? 30 : 120, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: EASE_POWER4, delay: 0 },
    },
  };

  const accentVariants: Variants = {
    hidden: { opacity: 0, scaleX: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      transition: { duration: 0.5, ease: EASE_PREMIUM, delay: 0.85 },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, y: isMobile ? 25 : 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: EASE_PREMIUM, delay: 1.1 },
    },
  };

  const eyebrowVariants: Variants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: EASE_PREMIUM, delay: 0.1 },
    },
  };

  const headingMaskVariants: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.8, ease: EASE_POWER4, delay: 0.3 },
    },
  };

  const paraVariants: Variants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE_PREMIUM, delay: 0.65 },
    },
  };

  const featureContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.9 },
    },
  };

  const featureCardVariants: Variants = {
    hidden: { opacity: 0, y: isMobile ? 25 : 60, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.55, ease: EASE_POWER3 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="ca-root"
      id="cricket-arena"
      aria-label="Our Cricket Arena"
    >
      {/* ── Ambient background glows ──────────────────────────────────────── */}
      <div className="ca-glow ca-glow--green" aria-hidden="true" />
      <div className="ca-glow ca-glow--gold"  aria-hidden="true" />

      {/* ── Inner two-column grid ─────────────────────────────────────────── */}
      <div className="ca-inner">

        {/* ═══ LEFT COLUMN — text + features ════════════════════════════════ */}
        <div className="ca-left">

          {/* Eyebrow */}
          <motion.div
            className="ca-eyebrow"
            variants={eyebrowVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
          >
            <span className="ca-eyebrow-line" />
            <span className="ca-eyebrow-text">{data?.eyebrow || "VP Associates • Sports Facility"}</span>
          </motion.div>

          {/* STEP 4 — Heading Block (Vertical mask opening upward) */}
          <motion.h2
            className="ca-heading"
            variants={headingMaskVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
            aria-label="OUR CRICKET ARENA"
          >
            <span className="ca-heading-line block">{data?.headingLine1 || "OUR CRICKET"}</span>
            <span className="ca-heading-line ca-heading-accent block">{data?.headingAccent || "GROUND"}</span>
          </motion.h2>

          {/* STEP 5 — Description Paragraph (Line-by-line 20px upward reveal) */}
          <motion.p
            className="ca-desc"
            variants={paraVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
          >
            {data?.description || `Step into a professionally maintained cricket facility built for champions and weekend warriors alike. From tournament-ready pitches and premium outfield to ground floodlights and match-day facilities, every detail is crafted to deliver an unforgettable cricketing experience—whether it's a corporate league, practice session, school match, or a landmark tournament.`}
          </motion.p>

          {/* STEP 6 — 2x2 Feature Cards Grid (rotateX(15deg) -> 0 3D panel unfolding) */}
          <motion.div
            className="ca-features"
            variants={featureContainerVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
            style={{ perspective: 1000 }}
            role="list"
          >
            {defaultFeatures.map((defF, idx) => {
              const cmsF = data?.features?.[idx];
              const title = cmsF?.title || defF.title;
              const desc = cmsF?.desc || defF.desc;

              return (
                <motion.div
                  key={defF.id}
                  className="ca-feature"
                  variants={featureCardVariants}
                  role="listitem"
                >
                  <div className="ca-feature-icon" aria-hidden="true">
                    {defF.icon}
                  </div>
                  <div className="ca-feature-text">
                    <span className="ca-feature-title">{title}</span>
                    <span className="ca-feature-desc">{desc}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ═══ RIGHT COLUMN — image visual ══════════════════════════════════ */}
        <div className="ca-right">

          {/* STEP 2: Decorative accent corner */}
          <motion.div
            className="ca-img-accent"
            variants={accentVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
            style={{ transformOrigin: "top right" }}
            aria-hidden="true"
          />

          <div className="ca-img-frame" style={{ overflow: "hidden" }}>
            {getSanityFileUrl(data?.video) ? (
              <video
                src={getSanityFileUrl(data?.video)!}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={getResponsiveImageUrl(data?.mainImage, { width: 1200, height: 800, quality: 85 }) || "/images/sport/cricket-arena-main.jpg"}
                className="ca-img object-cover w-full h-full"
              />
            ) : (
              <motion.img
                src={getResponsiveImageUrl(data?.mainImage, { width: 1200, height: 800, quality: 85 }) || "/images/sport/cricket-arena-main.jpg"}
                alt={data?.mainImage?.alt || "Our professional cricket arena with stadium floodlights and premium pitch"}
                className="ca-img"
                variants={imageRevealVariants}
                initial="hidden"
                animate={isAnimated ? "visible" : "hidden"}
                draggable={false}
              />
            )}
            <div className="ca-img-overlay" aria-hidden="true" />

            {/* STEP 3: Floating stat badge (5+ Acres of Play: translateY 60px -> 0, scale 0.9 -> 1) */}
            <motion.div
              className="ca-img-badge"
              variants={badgeVariants}
              initial="hidden"
              animate={isAnimated ? "visible" : "hidden"}
              aria-hidden="true"
            >
              <span className="ca-badge-num">{data?.badgeNumber || "5+"}</span>
              <span className="ca-badge-label">{data?.badgeLabel || "Acres of Play"}</span>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
