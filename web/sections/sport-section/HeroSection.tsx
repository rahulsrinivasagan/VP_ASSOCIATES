"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SanityHeroSection } from "@/lib/sanity/types";
import { getResponsiveImageUrl, getSanityFileUrl } from "@/lib/sanity/image";

const EASE_CUBIC = [0.16, 1, 0.3, 1] as const;

interface HeroSectionProps {
  data?: SanityHeroSection;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [animReady, setAnimReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const revealUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE_CUBIC, delay },
    }),
  };

  const lineReveal = {
    hidden: { opacity: 0, y: "100%" },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: EASE_CUBIC, delay },
    }),
  };

  return (
    <section className="sh-redesign-root" aria-label="VP Associates Sports Hero">
      {/* 1. BACKGROUND LAYER */}
      <div className="sh-redesign-bg-mesh" />
      <div className="sh-redesign-bg-vignette" />
      <div className="sh-redesign-sunlight" />

      {/* 2. STADIUM LAYER (Absolute decorative image overlay) */}
      <div className="sh-redesign-stadium-layer">
        <div className="sh-redesign-stadium-glow" />
        {getSanityFileUrl(data?.heroVideo) ? (
          <video
            src={getSanityFileUrl(data?.heroVideo)!}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={getResponsiveImageUrl(data?.stadiumImage, { width: 1920, quality: 85 }) || "/images/sport/cricket-ground-hero-exact.jpg"}
            className="sh-redesign-stadium-img object-cover w-full h-full"
          />
        ) : (
          <motion.img
            src={getResponsiveImageUrl(data?.stadiumImage, { width: 1920, quality: 85 }) || "/images/sport/cricket-ground-hero-exact.jpg"}
            alt={data?.stadiumImage?.alt || "Aerial professional cricket stadium view"}
            className="sh-redesign-stadium-img"
            draggable={false}
            initial={{ opacity: 0, x: 60 }}
            animate={animReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 1.2, ease: EASE_CUBIC }}
          />
        )}
      </div>

      {/* 3. CONTENT LAYER (Absolute text composition block) */}
      <div className="sh-redesign-content-layer">
        {/* Breadcrumb Eyebrow with Cricket Logo */}
        <motion.div
          className="sh-redesign-eyebrow"
          custom={0.1}
          variants={revealUp}
          initial="hidden"
          animate={animReady ? "visible" : "hidden"}
        >
          <img
            src="/images/sport/cricket_logo.jpeg"
            alt="VP Sports Cricket Logo"
            className="w-9 h-9 rounded-full object-cover shadow-sm border border-[#F5821F]/40 shrink-0"
          />
          <span className="sh-redesign-eyebrow-text">{data?.eyebrow || "VP ASSOCIATES • SPORTS"}</span>
          <span className="sh-redesign-eyebrow-line" />
        </motion.div>

        {/* Heading */}
        <h1 className="sh-redesign-heading">
          <span className="sh-redesign-line-wrap">
            <motion.span
              className="sh-redesign-line-inner"
              custom={0.25}
              variants={lineReveal}
              initial="hidden"
              animate={animReady ? "visible" : "hidden"}
            >
              {data?.headingLine1 || "WHERE"}
            </motion.span>
          </span>
          <span className="sh-redesign-line-wrap">
            <motion.span
              className="sh-redesign-line-inner"
              custom={0.37}
              variants={lineReveal}
              initial="hidden"
              animate={animReady ? "visible" : "hidden"}
            >
              {data?.headingLine2 || "CHAMPIONS"}
            </motion.span>
          </span>
          <span className="sh-redesign-line-wrap">
            <motion.span
              className="sh-redesign-line-inner sh-redesign-text-orange"
              custom={0.49}
              variants={lineReveal}
              initial="hidden"
              animate={animReady ? "visible" : "hidden"}
            >
              {data?.headingLine3Accent || "ARE MADE"}
            </motion.span>
          </span>
        </h1>

        {/* Horizontal Orange Divider Line */}
        <motion.div
          className="sh-redesign-divider"
          custom={0.58}
          variants={revealUp}
          initial="hidden"
          animate={animReady ? "visible" : "hidden"}
        />

        {/* Paragraph */}
        <motion.p
          className="sh-redesign-para"
          custom={0.68}
          variants={revealUp}
          initial="hidden"
          animate={animReady ? "visible" : "hidden"}
        >
          {data?.description || "Professional cricket infrastructure and tournament management built for excellence."}
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="sh-redesign-buttons"
          custom={0.78}
          variants={revealUp}
          initial="hidden"
          animate={animReady ? "visible" : "hidden"}
        >
          <a href={data?.primaryBtnLink || "#book-arena"} className="sh-redesign-btn-primary">
            <svg className="sh-redesign-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="3" />
              <path d="M16 2v4M8 2v4M3 10h18" />
              <rect x="9" y="13" width="4" height="3" rx="0.8" />
            </svg>
            <span>{data?.primaryBtnText || "Book Your Ground"}</span>
            <svg className="sh-redesign-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12" />
              <polyline points="14 6 20 12 14 18" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* 4. FEATURE STRIP LAYER (Absolute bottom panel) */}
      <div className="sh-redesign-strip-wrapper">
        <motion.div
          className="sh-redesign-strip"
          initial={{ opacity: 0, y: 35 }}
          animate={animReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.9, ease: EASE_CUBIC, delay: 0.88 }}
        >
          {/* Column 1 */}
          <div className="sh-redesign-strip-col">
            <div className="sh-redesign-col-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M6 12h12M12 6v12" />
              </svg>
            </div>
            <span className="sh-redesign-col-label">Cricket Grounds</span>
          </div>

          <div className="sh-redesign-strip-divider" aria-hidden="true" />

          {/* Column 2 */}
          <div className="sh-redesign-strip-col">
            <div className="sh-redesign-col-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <span className="sh-redesign-col-label">Turf Booking</span>
          </div>

          <div className="sh-redesign-strip-divider" aria-hidden="true" />

          {/* Column 3 */}
          <div className="sh-redesign-strip-col">
            <div className="sh-redesign-col-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 4h10v7a5 5 0 0 1-10 0V4z" />
                <path d="M7 6H4a2 2 0 0 0-2 2v1a3 3 0 0 0 3 3h2" />
                <path d="M17 6h3a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-2" />
              </svg>
            </div>
            <span className="sh-redesign-col-label">Sports Events</span>
          </div>

          <div className="sh-redesign-strip-divider" aria-hidden="true" />

          {/* Column 4 */}
          <div className="sh-redesign-strip-col">
            <div className="sh-redesign-col-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <span className="sh-redesign-col-label">Coaching Camps</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
