"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FeatureRow {
  step: string;
  title: string;
  desc: string;
  image: string;
  icon: React.ReactNode;
  imgLeft: boolean;
}

const features: FeatureRow[] = [
  {
    step: "01",
    title: "Fresh Ingredients",
    desc: "Sourced daily from verified organic farm partners and premium suppliers for maximum flavor and safety.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80&fit=crop",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c5.523 0 10 4.477 10 10 0 1.875-.515 3.63-1.414 5.136L18 14.5M6 9.5l3.5 3.5 8.5-8.5" />
        <path d="M2 12c0 5.523 4.477 10 10 10 1.875 0 3.63-.515 5.136-1.414L14.5 18" />
      </svg>
    ),
    imgLeft: true,
  },
  {
    step: "02",
    title: "Traditional & Authentic Flavors",
    desc: "Prepared by specialized regional chefs using authentic family recipes and traditional slow-cooking methods.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80&fit=crop",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18h12v1H6zm1-2h10v1H7z" />
        <path d="M5 14c-1.5-1-1.5-4 0-5 1.5 0 2.5-2 4-2s2.5 2 4 2 2.5-2 4-2 2.5 2 4 2c1.5 1 1.5 4 0 5H5z" strokeLinecap="round" />
      </svg>
    ),
    imgLeft: false,
  },
  {
    step: "03",
    title: "Seamless Event Hospitality",
    desc: "Professional, well-trained service personnel ensuring end-to-end guest care, timely replenishment, and effortless table management.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20M12 4v2M5 20a7 7 0 0 1 14 0" strokeLinecap="round" />
      </svg>
    ),
    imgLeft: true,
  },
  {
    step: "04",
    title: "Custom Menus",
    desc: "Tailored vegetarian, non-vegetarian, and regional menu options designed around your preferences.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80&fit=crop",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8c-3 0-5 2-5 5v3h10v-3c0-3-2-5-5-5z" />
        <path d="M5 16h14a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2z" />
      </svg>
    ),
    imgLeft: false,
  },
];

interface EditorialRowProps {
  feat: FeatureRow;
  idx: number;
  isVisible: boolean;
  rowRef: React.RefObject<HTMLDivElement | null>;
}

function EditorialRow({ feat, idx, isVisible, rowRef }: EditorialRowProps) {
  const isFirst = idx === 0;

  return (
    <div
      ref={rowRef}
      style={{
        display: "flex",
        flexDirection: feat.imgLeft ? "row" : "row-reverse",
        alignItems: "stretch", // Ensures image and card match height
        width: "100%",
        height: "310px", // Resized row height to match reference spec
      }}
      className="editorial-row"
    >
      {/* Image Section (55% width) */}
      <div
        style={{
          width: "55%",
          position: "relative",
          overflow: "hidden",
          borderRadius: feat.imgLeft ? "24px 0 0 24px" : "0 24px 24px 0",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
        }}
        className="editorial-image-wrapper"
      >
        <motion.img
          src={feat.image}
          alt={feat.title}
          initial={
            isFirst
              ? { scale: 1.15, opacity: 0 }
              : { y: 90, opacity: 0, scale: 0.98 }
          }
          animate={
            isVisible
              ? { y: 0, scale: 1, opacity: 1 }
              : isFirst
              ? { scale: 1.15, opacity: 0 }
              : { y: 90, opacity: 0, scale: 0.98 }
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(16,13,12,0.1) 0%, rgba(16,13,12,0) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Content Card Section (45% width) */}
      <motion.div
        initial={
          isFirst
            ? { x: 120, opacity: 0, scale: 0.96 }
            : { y: 90, opacity: 0, scale: 0.96 }
        }
        animate={
          isVisible
            ? { x: 0, y: 0, opacity: 1, scale: 1 }
            : isFirst
            ? { x: 120, opacity: 0, scale: 0.96 }
            : { y: 90, opacity: 0, scale: 0.96 }
        }
        transition={{ duration: 0.9, delay: isFirst ? 0.15 : 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "45%",
          backgroundColor: "#FCFAF8", // Warm off-white content card
          border: "1.5px solid rgba(212, 175, 55, 0.22)",
          borderRadius: feat.imgLeft ? "0 24px 24px 0" : "24px 0 0 24px",
          padding: "36px 44px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        }}
        className="editorial-card"
        whileHover={{
          y: -4,
          borderColor: "rgba(212, 175, 55, 0.55)",
          boxShadow: "0 22px 45px rgba(212, 175, 55, 0.15)",
        }}
      >
        {/* Step Number Badge */}
        <span
          style={{
            position: "absolute",
            top: "22px",
            [feat.imgLeft ? "right" : "left"]: "32px",
            fontFamily: "var(--font-anton, 'Anton', sans-serif)",
            fontSize: "14px",
            fontWeight: 600,
            color: "rgba(212, 175, 55, 0.45)",
            letterSpacing: "0.08em",
          }}
        >
          {feat.step}
        </span>

        {/* Overlapping Seam Badge (Overlaps the vertical border seam) */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.35 }}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            [feat.imgLeft ? "left" : "right"]: "-25px", // Overlaps left or right border seam
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            border: "2px solid #d4af37",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#d4af37",
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.16)",
            zIndex: 10,
          }}
          className="editorial-badge"
        >
          {feat.icon}
        </motion.div>

        {/* Title & Description */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "28px", // Resized title size
            fontWeight: 700,
            color: "#1c0d08",
            margin: "0 0 8px 0",
          }}
        >
          {feat.title}
        </h3>
        <div
          style={{
            width: "35px",
            height: "1px",
            backgroundColor: "rgba(212, 175, 55, 0.35)",
            marginBottom: "14px",
          }}
        />
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px", // Resized description size
            lineHeight: 1.6,
            color: "#5a4a45",
            margin: 0,
          }}
        >
          {feat.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function CateringUniqueness() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Custom row references
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const row4Ref = useRef<HTMLDivElement>(null);

  const rowRefs = [row1Ref, row2Ref, row3Ref, row4Ref];
  const [visibleStates, setVisibleStates] = useState([false, false, false, false]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // 1. Reset state when user scrolls completely ABOVE the section
      if (rect.top >= viewportHeight - 50) {
        setVisibleStates([false, false, false, false]);
        return;
      }

      // 2. Scan each row and set visible state if 25% enters the viewport
      setVisibleStates(prev => {
        const nextStates = [...prev];
        let updated = false;

        rowRefs.forEach((ref, idx) => {
          if (prev[idx]) return; // Skip if already visible
          const el = ref.current;
          if (!el) return;
          
          const cardRect = el.getBoundingClientRect();
          // Trigger when 25% of card enters the viewport bottom
          if (cardRect.top < viewportHeight - cardRect.height * 0.25) {
            nextStates[idx] = true;
            updated = true;
          }
        });

        return updated ? nextStates : prev;
      });
    };

    // Initial check on load/refresh in case they start mid-page
    const initTimer = setTimeout(handleScroll, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "110px 24px",
        background: "linear-gradient(180deg, #100d0c 0%, #171110 100%)", // Luxurious dark ambiance
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Catering Uniqueness"
    >
      {/* Background radial highlight */}
      <div
        style={{
          position: "absolute",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, rgba(0,0,0,0) 70%)",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1160px", width: "100%", zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <span
            style={{
              fontSize: "12.5px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#d4af37", // Elegant gold
              display: "block",
              marginBottom: "10px",
            }}
          >
            WHAT SETS US APART
          </span>
          <h2
            style={{
              fontFamily: "var(--font-anton, 'Anton', sans-serif)",
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: "400",
              color: "#FFFDFB", // Warm ivory text
              margin: 0,
              letterSpacing: "0.03em",
            }}
          >
            Why Guests Love Our Catering
          </h2>
          <div
            style={{
              width: "50px",
              height: "2px",
              backgroundColor: "#d4af37",
              margin: "18px auto",
              borderRadius: "1px",
            }}
          />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255, 253, 251, 0.72)",
              maxWidth: "580px",
              margin: "0 auto",
              fontSize: "15.5px",
              lineHeight: 1.65,
            }}
          >
            We don't just cook food. We curate premium visual, aromatic, and dining experiences that leave a lasting impression.
          </p>
        </div>

        {/* Feature alternating rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "48px", // Resized spacing between rows
          }}
        >
          {features.map((feat, idx) => (
            <EditorialRow
              key={feat.step}
              feat={feat}
              idx={idx}
              isVisible={visibleStates[idx]}
              rowRef={rowRefs[idx]}
            />
          ))}
        </div>
      </div>

      {/* Global CSS for fully responsive stacks */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .editorial-row {
            flex-direction: column !important;
            height: auto !important;
          }
          .editorial-image-wrapper {
            width: 100% !important;
            height: 240px !important;
            border-radius: 20px 20px 0 0 !important;
          }
          .editorial-card {
            width: 100% !important;
            height: auto !important;
            border-radius: 0 0 20px 20px !important;
            padding: 32px 28px !important;
          }
          /* Reposition overlapping badge to the top horizontal seam on mobile */
          .editorial-badge {
            top: -25px !important;
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
          }
        }
      ` }} />
    </section>
  );
}
