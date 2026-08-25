"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SideCardProps {
  title: string;
  desc: string;
  image: string;
  icon: React.ReactNode;
}

const leftDishes: SideCardProps[] = [
  {
    title: "Paneer Tikka",
    desc: "Smoky, charred and perfectly spiced cottage cheese delight.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80&fit=crop",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Kadai Paneer",
    desc: "A bold & spicy classic with peppers, onions & rich masala.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80&fit=crop",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3zM21 9H3M21 15H3" />
      </svg>
    ),
  },
  {
    title: "Loaded Tacos",
    desc: "Crunchy, zesty and loaded with fresh flavours in every bite.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80&fit=crop",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const rightDishes: SideCardProps[] = [
  {
    title: "Dal Makhani",
    desc: "Slow-cooked lentils with butter & cream for that comfort taste.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80&fit=crop",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    title: "Choco Donut",
    desc: "Soft, fluffy & chocolatey - a sweet treat you'll love.",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&q=80&fit=crop",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "Grilled Chicken",
    desc: "Juicy, smoky & perfectly grilled to perfection.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&q=80&fit=crop",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 3.5 3.5z" />
      </svg>
    ),
  },
];

function SideDishCard({ title, desc, image, icon, innerRef }: SideCardProps & { innerRef?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={innerRef}
      style={{
        display: "flex",
        backgroundColor: "#1c1512", // Dark charcoal base
        border: "1px solid rgba(212, 175, 55, 0.16)",
        borderRadius: "18px",
        overflow: "hidden",
        width: "100%",
        height: "116px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
        transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        willChange: "transform, opacity",
      }}
      className="loved-bites-side-card"
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        const img = card.querySelector(".side-card-zoom-img") as HTMLImageElement;
        card.style.transform = "translateY(-4px)";
        card.style.borderColor = "rgba(212, 175, 55, 0.55)";
        card.style.boxShadow = "0 16px 35px rgba(212, 175, 55, 0.12)";
        if (img) img.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        const img = card.querySelector(".side-card-zoom-img") as HTMLImageElement;
        card.style.transform = "translateY(0)";
        card.style.borderColor = "rgba(212, 175, 55, 0.16)";
        card.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.25)";
        if (img) img.style.transform = "scale(1)";
      }}
    >
      {/* Image container (40% width) */}
      <div style={{ width: "40%", height: "100%", overflow: "hidden", position: "relative" }}>
        <img
          className="side-card-zoom-img"
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 50%, rgba(28,21,18,0.3) 100%)" }} />
      </div>

      {/* Content wrapper */}
      <div style={{ width: "60%", padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
            }}
          >
            {title}
          </h3>

          {/* Gold badge */}
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#d4af37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 2px 8px rgba(212,175,55,0.3)",
            }}
          >
            {icon}
          </div>
        </div>

        {/* Short desc */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            lineHeight: 1.45,
            color: "#a59690",
            margin: 0,
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function OurLovedBites() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Header Elements Refs
  const headerLabelRef = useRef<HTMLSpanElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const headerDescRef = useRef<HTMLParagraphElement>(null);

  // Cloche Element Refs
  const clocheContainerRef = useRef<HTMLDivElement>(null);
  const clocheLidRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Cards Element Refs
  const leftCard1Ref = useRef<HTMLDivElement>(null);
  const leftCard2Ref = useRef<HTMLDivElement>(null);
  const leftCard3Ref = useRef<HTMLDivElement>(null);
  
  const rightCard1Ref = useRef<HTMLDivElement>(null);
  const rightCard2Ref = useRef<HTMLDivElement>(null);
  const rightCard3Ref = useRef<HTMLDivElement>(null);

  const centerCardRef = useRef<HTMLDivElement>(null);

  const leftCardRefs = [leftCard1Ref, leftCard2Ref, leftCard3Ref];
  const rightCardRefs = [rightCard1Ref, rightCard2Ref, rightCard3Ref];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 960);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP Chef Cloche Emergence & Fan-Out Animation across ALL device screen sizes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const label = headerLabelRef.current;
      const title = headerTitleRef.current;
      const desc = headerDescRef.current;

      const lid = clocheLidRef.current;
      const steam = steamRef.current;
      const glow = glowRef.current;

      // 1. Initial header states
      gsap.set([label, desc], { opacity: 0, y: 20 });
      gsap.set(title, { opacity: 0, y: 20 });

      // 2. Initial Cloche states
      gsap.set(lid, { y: 0, rotation: 0, opacity: 1, scale: 1 });
      gsap.set(steam, { opacity: 0, scale: 0.5 });
      gsap.set(glow, { opacity: 0, scale: 0.3 });

      // 3. Initial Cards Collapsed directly into the Cloche Origin Center
      leftCardRefs.forEach((ref, idx) => {
        if (ref.current) {
          gsap.set(ref.current, {
            opacity: 0,
            x: isMobile ? 0 : 340,
            y: isMobile ? -80 : -100 + idx * 25,
            scale: 0.08,
            rotation: isMobile ? 0 : -22,
            transformOrigin: "center center",
          });
        }
      });

      if (centerCardRef.current) {
        gsap.set(centerCardRef.current, {
          opacity: 0,
          x: 0,
          y: isMobile ? -60 : -120,
          scale: 0.12,
          rotation: 0,
          transformOrigin: "center center",
        });
      }

      rightCardRefs.forEach((ref, idx) => {
        if (ref.current) {
          gsap.set(ref.current, {
            opacity: 0,
            x: isMobile ? 0 : -340,
            y: isMobile ? -80 : -100 + idx * 25,
            scale: 0.08,
            rotation: isMobile ? 0 : 22,
            transformOrigin: "center center",
          });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Stage 1: Header slides in
      tl.to(label, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
        .to(title, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.25")
        .to(desc, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");

      // Stage 2: Chef's Metallic Cloche Lid lifts up & tilts, releasing steam and golden glow
      tl.to(lid, { y: -100, rotation: -26, opacity: 0.95, duration: 0.65, ease: "back.out(1.5)" })
        .to(glow, { opacity: 1, scale: 1.5, duration: 0.45 }, "<")
        .to(steam, { opacity: 1, y: -25, scale: 1.4, duration: 0.45 }, "<");

      // Stage 3: Center Dish Card (Butter Chicken) expands forward directly from the Cloche!
      if (centerCardRef.current) {
        tl.to(
          centerCardRef.current,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.65,
            ease: "back.out(1.3)",
          },
          "-=0.2"
        );
      }

      // Stage 4: Left & Right Signature Dish Cards burst & fan out symmetrically from the Cloche!
      const maxLen = Math.max(leftCardRefs.length, rightCardRefs.length);
      for (let i = 0; i < maxLen; i++) {
        const left = leftCardRefs[i]?.current;
        const right = rightCardRefs[i]?.current;

        if (left) {
          tl.to(
            left,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.55,
              ease: "back.out(1.25)",
            },
            i === 0 ? "-=0.4" : "-=0.42"
          );
        }

        if (right) {
          tl.to(
            right,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.55,
              ease: "back.out(1.25)",
            },
            "<"
          );
        }
      }

      // Stage 5: Cloche Lid & Tray Assembly completely fade out after entry animation finishes
      if (clocheContainerRef.current) {
        tl.to(
          clocheContainerRef.current,
          { opacity: 0, y: -20, scale: 0.9, duration: 0.5, ease: "power2.inOut" },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="loved-bites-section"
      style={{
        width: "100%",
        minHeight: "760px",
        height: "auto",
        background: "#FCFAF8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "24px",
        padding: "48px 24px 64px 24px",
        position: "relative",
      }}
      aria-label="Loved Bites collection section"
    >
      {/* Header section */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "700px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          ref={headerLabelRef}
          style={{
            fontFamily: "var(--font-inter, 'Inter', sans-serif)",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#ee8132",
            display: "block",
            marginBottom: "14px",
          }}
        >
          OUR SIGNATURE COLLECTION
        </span>
        <h2
          ref={headerTitleRef}
          style={{
            fontFamily: "var(--font-anton, 'Anton', sans-serif)",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: "400",
            letterSpacing: "0.01em",
            color: "#0a0a0a",
            margin: "0 0 16px 0",
            lineHeight: 1.1,
          }}
        >
          Loved Bites
        </h2>

        <p
          ref={headerDescRef}
          style={{
            fontFamily: "var(--font-inter, 'Inter', sans-serif)",
            color: "#5a4a50",
            fontSize: "16px",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: "600px",
          }}
        >
          Every celebration deserves unforgettable flavours. Explore a curated selection of our signature dishes crafted with premium ingredients and exceptional presentation.
        </p>

        {/* Central Chef Cloche Focal Platter Assembly */}
        <div
          ref={clocheContainerRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            margin: "18px 0 6px 0",
            zIndex: 40,
          }}
        >
          {/* Metallic Cloche Tray Base */}
          <div
            style={{
              position: "relative",
              width: "180px",
              height: "14px",
              backgroundColor: "#d4af37",
              borderRadius: "7px",
              boxShadow: "0 6px 20px rgba(212, 175, 55, 0.4), 0 2px 8px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Radial Gold Glow */}
            <div
              ref={glowRef}
              style={{
                position: "absolute",
                top: "-40px",
                width: "240px",
                height: "90px",
                background: "radial-gradient(ellipse, rgba(212,175,55,0.65) 0%, rgba(238,129,50,0.35) 40%, rgba(212,175,55,0) 75%)",
                borderRadius: "50%",
                pointerEvents: "none",
                opacity: 0,
              }}
            />

            {/* Steam Particles */}
            <div
              ref={steamRef}
              style={{
                position: "absolute",
                top: "-45px",
                width: "100px",
                height: "40px",
                pointerEvents: "none",
                opacity: 0,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div style={{ width: "3px", height: "24px", background: "rgba(255,255,255,0.85)", borderRadius: "2px", filter: "blur(1px)" }} />
              <div style={{ width: "4px", height: "30px", background: "rgba(255,255,255,0.95)", borderRadius: "2px", filter: "blur(1px)" }} />
              <div style={{ width: "3px", height: "20px", background: "rgba(255,255,255,0.85)", borderRadius: "2px", filter: "blur(1px)" }} />
            </div>

            {/* Metallic Cloche Lid Dome */}
            <div
              ref={clocheLidRef}
              style={{
                position: "absolute",
                bottom: "12px",
                width: "140px",
                height: "70px",
                borderTopLeftRadius: "70px",
                borderTopRightRadius: "70px",
                background: "linear-gradient(135deg, #ffffff 0%, #f7e6a5 30%, #d4af37 70%, #997a1e 100%)",
                boxShadow: "0 -4px 15px rgba(212,175,55,0.35), inset 0 2px 4px rgba(255,255,255,0.8)",
                transformOrigin: "bottom right",
                willChange: "transform, opacity",
              }}
            >
              {/* Cloche Handle Knob */}
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "16px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ffffff 0%, #d4af37 100%)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Showcase Layout */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: "1fr 1.8fr 1fr",
          gap: "28px",
          alignItems: "center",
          flexGrow: 1,
          marginTop: "12px",
          marginBottom: "16px",
        }}
        className="loved-bites-grid"
      >
        {/* Left column */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%", justifyContent: "center" }}
        >
          {leftDishes.map((dish, i) => (
            <SideDishCard key={i} {...dish} innerRef={leftCardRefs[i]} />
          ))}
        </div>

        {/* Center column (Butter Chicken featured card) */}
        <div
          ref={centerCardRef}
          className="loved-bites-center-card"
          style={{
            height: "100%",
            maxHeight: "410px",
            width: "100%",
            borderRadius: "24px",
            border: "1.5px solid rgba(212, 175, 55, 0.22)",
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.08)",
            backgroundColor: "#FCFAF8",
            display: "flex",
            overflow: "hidden",
            position: "relative",
            willChange: "transform, opacity",
          }}
        >
          {/* Left half image (45% width) */}
          <div className="loved-bites-center-img-wrap" style={{ width: "45%", height: "100%", overflow: "hidden", position: "relative" }}>
            {/* Customer Favorite Gold Ribbon */}
            <div
              style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                backgroundColor: "#d4af37",
                color: "#ffffff",
                fontFamily: "'Inter', sans-serif",
                fontSize: "9px",
                fontWeight: 800,
                padding: "4px 10px",
                borderRadius: "6px",
                letterSpacing: "0.06em",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                zIndex: 10,
              }}
            >
              <span>★</span>
              <span>CUSTOMER FAVOURITE</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80&fit=crop"
              alt="Butter Chicken"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Right half content (55% width) */}
          <div className="loved-bites-center-content" style={{ width: "55%", padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              {/* Dish Name */}
              <h3
                style={{
                  fontFamily: "var(--font-anton, 'Anton', sans-serif)",
                  fontSize: "30px",
                  fontWeight: "400",
                  color: "#1c1512",
                  margin: "0 0 2px 0",
                  lineHeight: 1.1,
                  letterSpacing: "0.02em",
                }}
              >
                Butter Chicken
              </h3>
              {/* Subtitle */}
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontStyle: "italic",
                  fontSize: "14px",
                  color: "#d4af37",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                Rich, Creamy & Unforgettable
              </span>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  lineHeight: 1.5,
                  color: "#5a4a45",
                  margin: "0 0 16px 0",
                }}
              >
                Slow-marinated chicken simmered in a velvety tomato-butter gravy infused with aromatic Indian spices.
              </p>

              {/* Why guests love it divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span style={{ fontSize: "9px", fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "0.08em", color: "#d4af37" }}>
                  WHY OUR GUESTS LOVE IT
                </span>
                <div style={{ flexGrow: 1, height: "1px", backgroundColor: "rgba(212, 175, 55, 0.2)" }} />
              </div>

              {/* Bullet list with inline icons */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { text: "Authentic North Indian recipe", icon: "❤️" },
                  { text: "Rich, creamy, and perfectly balanced flavours", icon: "🍳" },
                  { text: "Freshly prepared for every order", icon: "🔥" },
                  { text: "Perfect for family gatherings", icon: "👥" },
                  { text: "One of our most ordered signature dishes", icon: "⭐" },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10.5px",
                      color: "#1c1512",
                    }}
                  >
                    <span style={{ fontSize: "10px" }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rating badge at bottom */}
            <div
              style={{
                alignSelf: "flex-start",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(212, 175, 55, 0.08)",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                padding: "6px 12px",
                borderRadius: "10px",
                marginTop: "12px",
              }}
            >
              <span style={{ color: "#d4af37", fontSize: "12px", fontWeight: 700 }}>★ 4.9/5</span>
              <span style={{ width: "1px", height: "12px", backgroundColor: "rgba(212, 175, 55, 0.3)" }} />
              <span style={{ fontSize: "9px", fontFamily: "'Inter', sans-serif", color: "#5a4a45" }}>
                Customer Rating <span style={{ color: "rgba(90, 74, 69, 0.6)" }}>(1200+ Reviews)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%", justifyContent: "center" }}
        >
          {rightDishes.map((dish, i) => (
            <SideDishCard key={i} {...dish} innerRef={rightCardRefs[i]} />
          ))}
        </div>
      </div>

      {/* CSS adjustments for mobile styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 960px) {
          .loved-bites-section {
            height: auto !important;
            min-height: auto !important;
            max-height: none !important;
            padding: 50px 16px 50px !important;
          }
          .loved-bites-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
            height: auto !important;
            overflow: visible !important;
          }
          .loved-bites-center-card {
            flex-direction: column !important;
            max-height: none !important;
            height: auto !important;
            border-radius: 20px !important;
          }
          .loved-bites-center-img-wrap {
            width: 100% !important;
            height: 220px !important;
          }
          .loved-bites-center-content {
            width: 100% !important;
            padding: 22px 18px !important;
          }
          .loved-bites-side-card {
            height: auto !important;
            min-height: 100px !important;
            border-radius: 16px !important;
          }
        }
      `}} />
    </section>
  );
}
