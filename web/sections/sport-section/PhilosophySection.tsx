"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { SanityPhilosophySection } from "@/lib/sanity/types";
import { getResponsiveImageUrl } from "@/lib/sanity/image";

// ─── Animation Cubic Beziers ──────────────────────────────────────────────────
const EASE_POWER4 = [0.22, 1, 0.36, 1] as const;
const EASE_POWER3 = [0.215, 0.61, 0.355, 1] as const;
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// ─── Feature Card Data Defaults ───────────────────────────────────────────────

const defaultFeatures = [
  {
    id: "competitive-spirit",
    image: "/images/sport/card-competitive-spirit.jpg",
    imageAlt: "Professional cricket stadium with colorful seating",
    zIndex: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
        <path d="M12 2a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z" />
      </svg>
    ),
    title: "Competitive Spirit",
    desc: "Host exciting matches with professional-grade playing facilities and world-class scoring systems.",
  },
  {
    id: "built-for-everyone",
    image: "/images/sport/card-built-everyone.jpg",
    imageAlt: "Families and friends enjoying cricket on a lush green ground",
    zIndex: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Built for Everyone",
    desc: "Perfect for friends, families, schools, and corporate events—casual games to grand tournaments alike.",
  },
  {
    id: "celebrate-together",
    image: "/images/sport/card-celebrate-together.jpg",
    imageAlt: "Cricket team celebrating victory with trophy at golden hour",
    zIndex: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Celebrate Together",
    desc: "Turn every game into an unforgettable memory with your team—from post-match gatherings to full celebrations.",
  },
];

interface PhilosophySectionProps {
  data?: SanityPhilosophySection;
}

export default function PhilosophySection({ data }: PhilosophySectionProps) {
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
  const eyebrowVariants: Variants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: EASE_PREMIUM, delay: 0 },
    },
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0, x: isMobile ? 30 : 120, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: EASE_POWER4, delay: 0.2 },
    },
  };

  const paraVariants: Variants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: EASE_PREMIUM, delay: 0.75 },
    },
  };

  const centerCardVariants: Variants = {
    hidden: { opacity: 0, y: isMobile ? 35 : 120, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: EASE_PREMIUM, delay: 1.0 },
    },
  };

  const leftCardVariants: Variants = {
    hidden: { opacity: 0, x: isMobile ? 30 : 120, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: EASE_POWER3, delay: isMobile ? 1.15 : 1.45 },
    },
  };

  const rightCardVariants: Variants = {
    hidden: { opacity: 0, x: isMobile ? -30 : -120, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: EASE_POWER3, delay: isMobile ? 1.15 : 1.45 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="spc-root"
      id="philosophy"
      aria-label="Philosophy — Play. Compete. Celebrate."
    >
      {/* ── Ambient Background Glows ───────────────────────────────────────── */}
      <div className="spc-glow spc-glow--left" aria-hidden="true" />
      <div className="spc-glow spc-glow--right" aria-hidden="true" />
      <div className="spc-glow spc-glow--center" aria-hidden="true" />

      {/* ── Noise / Texture Overlay ────────────────────────────────────────── */}
      <div className="spc-noise" aria-hidden="true" />

      {/* ── Content Container ──────────────────────────────────────────────── */}
      <div className="spc-container">

        {/* ── STEP 1: Eyebrow Label ───────────────────────────────────────── */}
        <motion.div
          className="spc-eyebrow"
          variants={eyebrowVariants}
          initial="hidden"
          animate={isAnimated ? "visible" : "hidden"}
          aria-hidden="true"
        >
          <span className="spc-eyebrow-line" />
          <span className="spc-eyebrow-text">{data?.eyebrow || "VP Associates • Sports Arena"}</span>
          <span className="spc-eyebrow-line" />
        </motion.div>

        {/* ── STEP 2: Main Heading ─────────────────────────────────────────── */}
        <h2 className="spc-heading" aria-label="Play. Compete. Celebrate.">
          <motion.div
            className="spc-heading-block"
            variants={headingVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
          >
            {data?.heading || "PLAY."} <span className="spc-heading-accent">{data?.headingAccent || "COMPETE."}</span> CELEBRATE.
          </motion.div>
        </h2>

        {/* ── STEP 3: Supporting Paragraph ─────────────────────────────────── */}
        <motion.p
          className="spc-para"
          variants={paraVariants}
          initial="hidden"
          animate={isAnimated ? "visible" : "hidden"}
        >
          {data?.description || `Every game is more than a score—it's an experience. Whether it's a casual weekend match, an inter-corporate league, or a full-scale tournament, our world-class sporting venue is built to elevate every moment from first ball to final celebration.`}
        </motion.p>

        {/* ── CARDS ANIMATION ────────────────────────────────────────────── */}
        <div className="spc-cards" role="list">
          {(data?.cards && data.cards.length > 0 ? data.cards : defaultFeatures).map((cardItem, idx) => {
            const defItem = defaultFeatures[idx] || defaultFeatures[0];
            const title = cardItem?.title || defItem.title;
            const desc = cardItem?.desc || defItem.desc;

            const sanityImgUrl = (typeof cardItem?.image === "object") ? getResponsiveImageUrl(cardItem.image, { width: 800, height: 600, fit: "crop", quality: 80 }) : null;
            const imgSrc = sanityImgUrl || (typeof cardItem?.image === "string" ? cardItem.image : defItem.image);
            const imgAlt = (typeof cardItem?.image === "object" ? cardItem.image?.alt : undefined) || defItem.imageAlt;

            const cardId = cardItem?.id || defItem.id;
            const variant = 
              cardId === "competitive-spirit" || idx === 0 ? leftCardVariants :
              cardId === "built-for-everyone" || idx === 1 ? centerCardVariants :
              rightCardVariants;

            return (
              <motion.article
                key={cardId || idx}
                id={`spc-card-${cardId}`}
                className="spc-card"
                variants={variant}
                initial="hidden"
                animate={isAnimated ? "visible" : "hidden"}
                style={{ zIndex: defItem.zIndex, position: "relative" }}
                role="listitem"
              >
                {/* ── Image region ── */}
                <div className="spc-card-img-wrap">
                  <img
                    src={imgSrc}
                    alt={imgAlt}
                    className="spc-card-img"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="spc-card-img-fade" aria-hidden="true" />
                  {/* Floating icon badge */}
                  <div className="spc-card-icon-badge" aria-hidden="true">
                    {defItem.icon}
                  </div>
                </div>

                {/* ── Content region ── */}
                <div className="spc-card-body">
                  <h3 className="spc-card-title">{title}</h3>
                  <p className="spc-card-desc">{desc}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
