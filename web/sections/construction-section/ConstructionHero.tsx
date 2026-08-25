"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiPlay } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Construction.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Stats config ─────────────────────────────────────────────
const STATS = [
  { target: 640, suffix: "+", label: "Projects Completed" },
  { target: 7,   suffix: "+", label: "Years of Experience" },
  { target: 450, suffix: "+", label: "Happy Customers" },
];

// ─── Panel clip regions ───────────────────────────────────────
const PANELS = [
  { id: "left",   clip: "polygon(0% 0%, 33.5% 0%, 33.5% 100%, 0% 100%)" },
  { id: "centre", clip: "polygon(33.5% 0%, 66.5% 0%, 66.5% 100%, 33.5% 100%)" },
  { id: "right",  clip: "polygon(66.5% 0%, 100% 0%, 100% 100%, 66.5% 100%)" },
];

// ─── Hero inner content (module-level to avoid React re-mounting) ──
function HeroInner() {
  return (
    <div className="cz-hero-main-container">
      <div className="cz-hero-desktop-grid">

        {/* LEFT COLUMN */}
        <div className="cz-hero-left-col">
          <div className="cz-hero-title-area">
            <div className="cz-hero-subtitle">
              <span className="cz-hero-subtitle-inner" style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
                <span className="cz-subtitle-dash" />
                <span>CIVIL ENGINEERING & MANPOWER SUPPLY</span>
              </span>
            </div>
            <h1 className="cz-hero-title">
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="cz-hero-title-line" style={{ display: "block" }}>
                  Solid Engineering.
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="cz-hero-title-line cz-title-highlight" style={{ display: "block" }}>
                  Reliable Skilled Workforce.
                </span>
              </span>
            </h1>
          </div>

          <div className="cz-hero-tags">
            <div className="cz-tag-row">
              <a href="#services" className="cz-pill-tag" style={{ textDecoration: "none", cursor: "pointer" }}>Civil Engineering</a>
              <a href="#services" className="cz-pill-tag" style={{ textDecoration: "none", cursor: "pointer" }}>General Construction</a>
            </div>
            <div className="cz-tag-row">
              <a href="#services" className="cz-pill-tag" style={{ textDecoration: "none", cursor: "pointer" }}>Skilled Manpower Supply</a>
              <a href="#services" className="cz-pill-tag" style={{ textDecoration: "none", cursor: "pointer" }}>Site Operations</a>
              <a href="#services" className="cz-pill-tag" style={{ textDecoration: "none", cursor: "pointer" }}>Pre-Construction Planning</a>
            </div>
          </div>

          <div className="cz-main-image-wrapper">
            <Image
              src="/images/construction/engineer-hero.png"
              alt="Construction Workers Team"
              width={850}
              height={480}
              priority
              className="cz-main-image"
              style={{ transition: "none" }}
            />
            <a href="#contact" className="cz-play-btn" style={{ cursor: "pointer" }} aria-label="Get in touch">
              <div className="cz-play-icon-wrap">
                <FiPlay className="cz-play-icon" />
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="cz-hero-right-col">
          <div className="cz-hero-badge-area">
            <a href="#contact" className="cz-badge-graphic" style={{ cursor: "pointer", textDecoration: "none" }} aria-label="Get in touch">
              <div className="cz-navy-circle">
                <svg width="85" height="85" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="50" fill="#03170d" />
                </svg>
              </div>
              <div className="cz-orange-circle-wrap">
                <svg viewBox="0 0 100 100" className="cz-circular-text">
                  <path id="circlePathHero" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                  <text fill="#03170d" fontSize="8.2" fontWeight="800" letterSpacing="1.2">
                    <textPath href="#circlePathHero">GET IN TOUCH • GET IN TOUCH • GET IN TOUCH •</textPath>
                  </text>
                </svg>
                <div className="cz-orange-circle-inner">
                  <span className="cz-badge-inner-text">VP</span>
                </div>
              </div>
            </a>
          </div>

          <div className="cz-desc-wrapper">
            <div className="cz-vertical-divider" />
            <p className="cz-hero-desc">
              VP Associates delivers residential, commercial, and industrial civil construction alongside dependable, certified manpower supply to keep your projects on schedule and within budget across Chennai.
            </p>
          </div>

          <div className="cz-stats-card">
            {STATS.map(({ suffix, label }, i) => (
              <div key={i} className="cz-stat-item">
                <h3 className="cz-stat-number" data-index={i}>0{suffix}</h3>
                <p className="cz-stat-label">{label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function ConstructionHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;

    const panelLeft   = section.querySelector(".czp-panel-left")   as HTMLElement | null;
    const panelCentre = section.querySelector(".czp-panel-centre") as HTMLElement | null;
    const panelRight  = section.querySelector(".czp-panel-right")  as HTMLElement | null;
    const imgWrappers = Array.from(section.querySelectorAll(".cz-main-image-wrapper")) as HTMLElement[];
    const statsCards  = Array.from(section.querySelectorAll(".cz-stats-card")) as HTMLElement[];

    const ctx = gsap.context(() => {

      // ══════════════════════════════════════════════════════════
      // 1. STAGED ENTRY ANIMATION
      // ══════════════════════════════════════════════════════════

      // Set all content to initially hidden states
      gsap.set(".cz-hero-subtitle-inner",  { opacity: 0, y: 22 });
      gsap.set(".cz-hero-title-line",      { y: "108%", opacity: 0 });
      gsap.set(".cz-hero-badge-area",      { opacity: 0, scale: 0.88, filter: "blur(5px)" });
      gsap.set(".cz-pill-tag",             { opacity: 0, y: 14 });
      gsap.set(".cz-desc-wrapper",         { opacity: 0, y: 18 });
      gsap.set(".cz-main-image-wrapper",   { opacity: 0, scale: 1.08, filter: "blur(8px)" });
      gsap.set(".cz-stats-card",           { opacity: 0, y: 26, filter: "blur(5px)" });

      const ENTRY_DELAY = 1.6; // Snappier loading delay
      const entry = gsap.timeline({ paused: true });

      // Helper function to animate stats counters
      const animateStats = () => {
        STATS.forEach(({ target, suffix }, i) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.4,
            delay: i * 0.15,
            ease: "power2.out",
            onUpdate() {
              const text = `${Math.floor(obj.val)}${suffix}`;
              document.querySelectorAll(`.cz-stat-number[data-index="${i}"]`).forEach((el) => {
                (el as HTMLElement).innerText = text;
              });
            },
          });
        });
      };

      entry.to(".cz-main-image-wrapper", {
        opacity: 1, scale: 1.0, filter: "blur(0px)",
        duration: 0.8, ease: "power2.out",
      })
      .to(".cz-hero-subtitle-inner", {
        opacity: 1, y: 0,
        duration: 0.5, ease: "power3.out",
      }, "-=0.55")
      .to(".cz-hero-title-line", {
        y: "0%", opacity: 1,
        duration: 0.65, stagger: 0.10, ease: "power4.out",
      }, "-=0.35")
      .to(".cz-hero-badge-area", {
        opacity: 1, scale: 1, filter: "blur(0px)",
        duration: 0.45, ease: "power3.out",
      }, "-=0.45")
      .to(".cz-pill-tag", {
        opacity: 1, y: 0,
        duration: 0.40, stagger: 0.04, ease: "power3.out",
      }, "-=0.35")
      .to(".cz-desc-wrapper", {
        opacity: 1, y: 0,
        duration: 0.45, ease: "power3.out",
      }, "-=0.25")
      .to(".cz-stats-card", {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.45, ease: "power3.out",
      }, "-=0.4")
      .call(animateStats, [], 1.35);

      // Play initially after preloader delay
      const initialPlayCall = gsap.delayedCall(ENTRY_DELAY, () => {
        entry.play();
      });

      // Replay entry animation when scrolling back up to the Hero
      const replayTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        onEnterBack: () => {
          entry.restart();
        },
      });

      // ══════════════════════════════════════════════════════════
      // 2. KEN BURNS EFFECT
      // ══════════════════════════════════════════════════════════
      gsap.to(".cz-main-image", {
        scale: 1.05, duration: 20, ease: "none", repeat: -1, yoyo: true,
      });

      // ══════════════════════════════════════════════════════════
      // 3. COORDINATED STRUCTURAL SPLIT (UNPINNED - DESKTOP ONLY)
      // ══════════════════════════════════════════════════════════
      if (window.innerWidth >= 1025) {
        if (panelLeft)   gsap.set(panelLeft,   { xPercent: 0 });
        if (panelCentre) gsap.set(panelCentre, { yPercent: 0 });
        if (panelRight)  gsap.set(panelRight,  { xPercent: 0 });

        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top", // Ends exactly as the Hero scrolls off-screen
            scrub: 0.8, // Snappy scrubbing
          },
        });

        // Panels open from progress 0 to 1.0
        if (panelLeft) {
          revealTl.to(panelLeft, {
            xPercent: -100,
            ease: "power2.inOut",
            duration: 0.8,
          }, 0);
        }
        if (panelRight) {
          revealTl.to(panelRight, {
            xPercent: 100,
            ease: "power2.inOut",
            duration: 0.8,
          }, 0.1);
        }
        if (panelCentre) {
          revealTl.to(panelCentre, {
            yPercent: -100,
            ease: "power2.inOut",
            duration: 0.75,
          }, 0.2);
        }

        // Subtle parallax drift on title
        revealTl.to([
          ".czp-panel-left .cz-hero-title-area",
          ".czp-panel-centre .cz-hero-title-area",
          ".czp-panel-right .cz-hero-title-area",
        ], { yPercent: -8, ease: "none", duration: 1.0 }, 0);
      }

      // ══════════════════════════════════════════════════════════
      // 4. MOUSE PARALLAX DEPTH (desktop only, 992px+)
      // ══════════════════════════════════════════════════════════
      let onMouseMove: ((e: MouseEvent) => void) | null = null;
      if (window.innerWidth >= 992 && imgWrappers.length > 0) {
        const imgQt  = imgWrappers.map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.9,  ease: "power2.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.9,  ease: "power2.out" }),
        }));
        const cardQt = statsCards.map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.65, ease: "power2.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.65, ease: "power2.out" }),
        }));

        onMouseMove = (e: MouseEvent) => {
          const rx = (e.clientX / window.innerWidth  - 0.5) * 14;
          const ry = (e.clientY / window.innerHeight - 0.5) * 14;
          imgQt.forEach( ({ x, y }) => { x(rx); y(ry); });
          cardQt.forEach(({ x, y }) => { x(-rx * 0.6); y(-ry * 0.6); });
        };
        window.addEventListener("mousemove", onMouseMove);
      }

      return () => {
        if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
        initialPlayCall.kill();
        replayTrigger.kill();
      };
    }, section);

    // Recalculate ScrollTrigger positions
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cz-hero-section"
      id="hero"
      aria-label="Construction hero"
    >
      {PANELS.map(({ id, clip }) => (
        <div
          key={id}
          className={`czp-panel czp-panel-${id}`}
          style={{
            clipPath:   clip,
            willChange: "transform",
          }}
        >
          <HeroInner />
        </div>
      ))}
    </section>
  );
}
