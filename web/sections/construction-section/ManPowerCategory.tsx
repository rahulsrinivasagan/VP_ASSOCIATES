"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = [
  {
    id: "cat-1",
    title: "Housekeeping & Casual Labors",
    desc: "Dedicated housekeeping staff and general casual laborers for daily maintenance, site cleanliness, and support operations.",
    countText: "25+ Staff Available",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ee8132" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
        <path d="M12 2a5 5 0 0 0-5 5v3h10V7a5 5 0 0 0-5-5z" />
        <path d="M5 10h14v2a7 7 0 0 1-14 0z" />
        <circle cx="12" cy="12" r="1" fill="#ee8132" />
      </svg>
    ),
  },
  {
    id: "cat-2",
    title: "Workshop Specialists (Spare Parts Cleaning)",
    desc: "Trained technicians and workers focused on industrial spare parts cleaning, component handling, and workshop orderliness.",
    countText: "15+ Specialists",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ee8132" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "cat-3",
    title: "Warehouse Workforce (Spare Parts Picking)",
    desc: "Efficient warehouse personnel skilled in inventory organization, spare parts picking, packing, and dispatch handling.",
    countText: "20+ Personnel",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ee8132" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
        <path d="M2 12a10 10 0 0 1 20 0H2z" />
        <path d="M5 12V9a7 7 0 0 1 14 0v3" />
        <rect x="9" y="3" width="6" height="2" rx="0.5" />
      </svg>
    ),
  },
];

// SVG coordinates for centers of the 3 cards relative to the 1200px width viewBox
const CARD_X_COORDS = [390, 690, 990];

export default function ManPowerCategory() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Hook and Cable element refs
  const cable1Ref = useRef<SVGLineElement>(null);
  const cable2Ref = useRef<SVGLineElement>(null);
  const cable3Ref = useRef<SVGLineElement>(null);
  
  const hook1Ref = useRef<SVGGElement>(null);
  const hook2Ref = useRef<SVGGElement>(null);
  const hook3Ref = useRef<SVGGElement>(null);

  // Cards element refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const cardRefs = [card1Ref, card2Ref, card3Ref];
  const hookRefs = [hook1Ref, hook2Ref, hook3Ref];
  const cableRefs = [cable1Ref, cable2Ref, cable3Ref];

  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const microAnimRef = useRef<gsap.core.Timeline | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      timelineRef.current = tl;

      gsap.set(hookRefs.map(r => r.current), { y: 0 });
      gsap.set(cableRefs.map(r => r.current), { attr: { y2: 85 } });
      gsap.set(cardRefs.map(r => r.current), { opacity: 0, y: 250 });

      tl.to(hookRefs.map(r => r.current), { y: 385, duration: 1.2, ease: "power2.inOut" }, 0)
        .to(cableRefs.map(r => r.current), { attr: { y2: 470 }, duration: 1.2, ease: "power2.inOut" }, 0);

      tl.set(cardRefs.map(r => r.current), { opacity: 1 }, 1.2);

      tl.to(hookRefs.map(r => r.current), { y: 135, duration: 1.0, ease: "power2.out" }, 1.2)
        .to(cableRefs.map(r => r.current), { attr: { y2: 220 }, duration: 1.0, ease: "power2.out" }, 1.2)
        .to(cardRefs.map(r => r.current), { y: 0, duration: 1.0, ease: "power2.out" }, 1.2);

      tl.eventCallback("onComplete", () => {
        if (microAnimRef.current) microAnimRef.current.kill();
        microAnimRef.current = gsap.timeline({ repeat: -1, yoyo: true });
        microAnimRef.current
          .to(hookRefs.map(r => r.current), { y: 137, duration: 2.2, ease: "sine.inOut" }, 0)
          .to(cardRefs.map(r => r.current), { y: 2, duration: 2.2, ease: "sine.inOut" }, 0)
          .to(cableRefs.map(r => r.current), { attr: { y2: 222 }, duration: 2.2, ease: "sine.inOut" }, 0);
      });
    }, sectionRef);

    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top >= window.innerHeight) {
        if (hasPlayedRef.current) {
          hasPlayedRef.current = false;
          if (microAnimRef.current) { microAnimRef.current.kill(); microAnimRef.current = null; }
          timelineRef.current.progress(0).pause();
        }
        return;
      }
      if (rect.top < window.innerHeight - 400 && !hasPlayedRef.current) {
        hasPlayedRef.current = true;
        timelineRef.current.play();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      ctx.revert();
      if (microAnimRef.current) microAnimRef.current.kill();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manpower"
      style={{
        width: "100%",
        background: "#ffffff",
        padding: "80px 0 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
      aria-label="Our Manpower Solution"
    >
      <div style={{ textAlign: "center", marginBottom: "40px", maxWidth: "800px", zIndex: 5, padding: "0 24px" }}>
        <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ee8132", display: "block", marginBottom: "6px" }}>
          OUR MANPOWER SOLUTION
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "4px auto 12px auto", justifyContent: "center" }}>
          <div style={{ width: "30px", height: "1px", backgroundColor: "#ee8132" }} />
          <span style={{ color: "#ee8132", fontSize: "10px" }}>✦</span>
          <div style={{ width: "30px", height: "1px", backgroundColor: "#ee8132" }} />
        </div>
        <h2 style={{ fontFamily: "var(--font-anton, 'Anton', sans-serif)", fontSize: "clamp(30px, 4.5vw, 48px)", color: "#03170d", margin: "0 0 12px 0", lineHeight: 1.1, fontWeight: "400" }}>
          Skilled People.<br />Stronger Operations.
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", color: "#576b5f", fontSize: "14.5px", lineHeight: 1.6, margin: 0, maxWidth: "600px" }}>
          From facility maintenance to industrial logistics, our reliable and pre-screened workforce supports your operational and project needs seamlessly.
        </p>
        <div className="cz-swipe-indicator" style={{ display: "none", marginTop: "16px", fontSize: "12px", color: "#ee8132", fontWeight: 600 }}>
          Swipe horizontally to view crane hoisting solution ↔
        </div>
      </div>

      <div
        style={{
          width: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "flex-start",
        }}
        className="cz-crane-scroll-container"
      >
        <div
          style={{
            position: "relative",
            width: "1200px",
            height: "530px",
            marginTop: "10px",
            zIndex: 4,
            flexShrink: 0,
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "visible",
              zIndex: 1,
              pointerEvents: "none",
            }}
            viewBox="0 0 1200 530"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="concrete" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>
              <linearGradient id="yellow-steel" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="chassis" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <rect x="0" y="420" width="1200" height="40" fill="url(#concrete)" />
            <line x1="0" y1="420" x2="1200" y2="420" stroke="#9ca3af" strokeWidth="2" />
            <line x1="0" y1="424" x2="1200" y2="424" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
            <rect x="80" y="405" width="120" height="15" rx="3" fill="url(#chassis)" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="100" cy="412" r="5" fill="#e2e8f0" />
            <circle cx="180" cy="412" r="5" fill="#e2e8f0" />
            <path d="M 65 420 L 80 405 M 215 420 L 200 405" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            <rect x="55" y="417" width="20" height="4" fill="#334155" />
            <rect x="205" y="417" width="20" height="4" fill="#334155" />
            <rect x="128" y="100" width="24" height="305" fill="none" stroke="#d97706" strokeWidth="3" />
            <path
              d="M 128 405 L 152 375 M 128 375 L 152 405 M 128 375 L 152 345 M 128 345 L 152 375 M 128 345 L 152 315 M 128 315 L 152 345 M 128 315 L 152 285 M 128 285 L 152 315 M 128 285 L 152 255 M 128 255 L 152 285 M 128 255 L 152 225 M 128 225 L 152 255 M 128 225 L 152 195 M 128 195 L 152 225 M 128 195 L 152 165 M 128 165 L 152 195 M 128 165 L 152 135 M 128 135 L 152 165 M 128 135 L 152 105 M 128 105 L 152 135"
              stroke="#d97706"
              strokeWidth="1.5"
            />
            <path d="M 128 375 L 152 375 M 128 345 L 152 345 M 128 315 L 152 315 M 128 285 L 152 285 M 128 255 L 152 255 M 128 225 L 152 225 M 128 195 L 152 195 M 128 165 L 152 165 M 128 135 L 152 135 M 128 105 L 152 105" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="140" cy="92" r="16" fill="url(#chassis)" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="142" y="78" width="22" height="18" rx="2" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="146" y="82" width="10" height="10" fill="#38bdf8" />
            <line x1="142" y1="88" x2="164" y2="88" stroke="#1e293b" strokeWidth="1" />
            <path d="M 140 80 L 30 80 L 140 92 Z" fill="none" stroke="#d97706" strokeWidth="2" />
            <path d="M 30 80 L 30 92 L 140 92" stroke="#d97706" strokeWidth="2" fill="none" />
            <rect x="40" y="83" width="24" height="20" rx="1" fill="#475569" stroke="#1e293b" strokeWidth="1" />
            <rect x="68" y="83" width="18" height="20" rx="1" fill="#475569" stroke="#1e293b" strokeWidth="1" />
            <line x1="52" y1="83" x2="52" y2="103" stroke="#334155" strokeWidth="1" />
            <line x1="77" y1="83" x2="77" y2="103" stroke="#334155" strokeWidth="1" />
            <path d="M 128 76 L 140 45 L 152 76 Z" fill="none" stroke="#d97706" strokeWidth="2.5" />
            <line x1="140" y1="45" x2="40" y2="80" stroke="#475569" strokeWidth="2" />
            <line x1="140" y1="45" x2="1100" y2="88" stroke="#475569" strokeWidth="2" />
            <rect x="156" y="88" width="944" height="10" fill="url(#yellow-steel)" stroke="#d97706" strokeWidth="1.5" />
            <line x1="156" y1="78" x2="1100" y2="88" stroke="#d97706" strokeWidth="2" />
            <path
              d="M 156 88 L 196 78 M 196 88 L 236 78 M 236 88 L 276 78 M 276 88 L 316 78 M 316 88 L 356 78 M 356 88 L 396 78 M 396 88 L 436 78 M 436 88 L 476 78 M 476 88 L 516 78 M 516 88 L 556 78 M 556 88 L 596 78 M 596 88 L 636 78 M 636 88 L 676 78 M 676 88 L 716 78 M 716 88 L 756 78 M 756 88 L 796 78 M 796 88 L 836 78 M 836 88 L 876 78 M 876 88 L 916 78 M 916 88 L 956 78 M 956 88 L 996 78 M 996 88 L 1036 78 M 1036 88 L 1076 78"
              stroke="#d97706"
              strokeWidth="1.2"
            />
            <path d="M 196 78 L 196 88 M 276 78 L 276 88 M 356 78 L 356 88 M 436 78 L 436 88 M 516 78 L 516 88 M 596 78 L 596 88 M 676 78 L 676 88 M 756 78 L 756 88 M 836 78 L 836 88 M 916 78 L 916 88 M 996 78 L 996 88 M 1076 78 L 1076 88" stroke="#d97706" strokeWidth="1" />
            {[417, 726, 1035].map((cx, idx) => {
              const cableRef = cableRefs[idx];
              const hookRef = hookRefs[idx];
              return (
                <g key={idx}>
                  <line x1={cx} y1="100" x2={cx} y2="420" stroke="rgba(226, 236, 230, 0.45)" strokeWidth="1" strokeDasharray="4,4" />
                  <rect x={cx - 16} y="98" width="32" height="8" rx="2" fill="#1e293b" />
                  <circle cx={cx - 10} cy="96" r="3.2" fill="#4b5563" />
                  <circle cx={cx + 10} cy="96" r="3.2" fill="#4b5563" />
                  <circle cx={cx - 10} cy="96" r="1.5" fill="#f59e0b" />
                  <circle cx={cx + 10} cy="96" r="1.5" fill="#f59e0b" />
                  <line ref={cableRef} x1={cx} y1={105} x2={cx} y2={85} stroke="#1f2937" strokeWidth="2" />
                  <g ref={hookRef} style={{ willChange: "transform" }}>
                    <rect x={cx - 10} y="105" width="20" height="18" rx="2" fill="url(#yellow-steel)" stroke="#1f2937" strokeWidth="1.2" />
                    <circle cx={cx - 5} cy="114" r="3.2" fill="#374151" stroke="#ffffff" strokeWidth="0.6" />
                    <circle cx={cx + 5} cy="114" r="3.2" fill="#374151" stroke="#ffffff" strokeWidth="0.6" />
                    <path
                      d={`M ${cx - 3} 123 L ${cx + 3} 123 L ${cx + 3} 131 C ${cx + 6} 131 ${cx + 8} 134 ${cx + 8} 138 C ${cx + 8} 142 ${cx + 4} 145 ${cx} 145 C ${cx - 4} 145 ${cx - 8} 142 ${cx - 8} 138 L ${cx - 3} 138`}
                      fill="#1f2937"
                      stroke="#1f2937"
                      strokeWidth="1.2"
                    />
                  </g>
                </g>
              );
            })}
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              display: "grid",
              gridTemplateColumns: "280px 1fr 1fr 1fr 100px",
              gap: "36px",
              alignItems: "flex-start",
              boxSizing: "border-box",
            }}
          >
            <div />
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.id}
                ref={cardRefs[i]}
                style={{
                  marginTop: "220px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #f0f4f1",
                  borderRadius: "24px",
                  padding: "28px 24px",
                  boxShadow: "0 15px 35px rgba(3, 23, 13, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  position: "relative",
                  willChange: "transform, opacity",
                  opacity: 0,
                }}
              >
                {/* Top loop hook attachment link */}
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "12px",
                    height: "12px",
                    border: "2.5px solid #1f2937",
                    borderBottom: "none",
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                  }}
                />

                {/* Card Title & Icon */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", backgroundColor: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", color: "#ee8132", flexShrink: 0 }}>
                    {cat.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "17px",
                      fontWeight: 800,
                      color: "#0a1d13",
                      margin: 0,
                      lineHeight: 1.25,
                    }}
                  >
                    {cat.title}
                  </h3>
                </div>

                {/* Orange Underline Line */}
                <div style={{ width: "40px", height: "2px", backgroundColor: "#ee8132" }} />

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    color: "#576b5f",
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {cat.desc}
                </p>

                {/* Footer counter */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    borderTop: "1px solid #f0f4f1",
                    paddingTop: "12px",
                    marginTop: "4px",
                  }}
                >
                  <span style={{ color: "#ee8132", fontSize: "14px" }}>👥</span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#0a1d13",
                    }}
                  >
                    {cat.countText}
                  </span>
                </div>
              </div>
            ))}

            {/* Right Pillar empty column */}
            <div />
          </div>
        </div>
      </div>

      {/* ─── Bottom Right Call-to-action Button ─── */}
      <div
        className="cz-mp-cta-wrap"
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "100px",
          boxSizing: "border-box",
          marginTop: "40px",
          zIndex: 5,
        }}
      >
        <a
          href="#contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#ee8132",
            color: "#ffffff",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14.5px",
            fontWeight: 700,
            textDecoration: "none",
            padding: "13px 30px",
            borderRadius: "30px",
            boxShadow: "0 6px 20px rgba(238, 129, 50, 0.25)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#d96d21";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ee8132";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span>Speak to us</span>
          <span style={{ fontSize: "16px" }}>→</span>
        </a>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .cz-swipe-indicator {
            display: block !important;
          }
          .cz-crane-scroll-container {
            justify-content: flex-start !important;
          }
          .cz-mp-cta-wrap {
            justify-content: center !important;
            padding-right: 0 !important;
            margin-top: 20px !important;
          }
        }
      `}} />
    </section>
  );
}
