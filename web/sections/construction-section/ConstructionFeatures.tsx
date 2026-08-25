"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiPlay } from "react-icons/fi";
import { FaLaptopCode, FaUsers, FaClock, FaAward } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Construction.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    id: "f-1",
    title: "Quality Standards",
    desc: "Strict quality control protocols and engineering oversight on every project stage.",
    icon: FaLaptopCode,
  },
  {
    id: "f-2",
    title: "Expert Workforce",
    desc: "Experienced engineers, project managers, and skilled craftsmen leading on-site execution.",
    icon: FaUsers,
  },
  {
    id: "f-3",
    title: "On-Time Delivery",
    desc: "Detailed milestone tracking to ensure your builds stay strictly on schedule.",
    icon: FaClock,
  },
  {
    id: "f-4",
    title: "Safety Compliance",
    desc: "Complete adherence to local site safety regulations and workforce welfare.",
    icon: FaAward,
  },
];

export default function ConstructionFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const cards = Array.from(section.querySelectorAll(".cz-why-feature-item")) as HTMLElement[];
    const card1 = cards[0];
    const card2 = cards[1];
    const card3 = cards[2];
    const card4 = cards[3];

    const ctx = gsap.context(() => {
      // ══════════════════════════════════════════════════════════
      // 1. CALCULATE LAYOUT OFFSETS DYNAMICALLY
      // ══════════════════════════════════════════════════════════
      const gap = 16; // matches flex gap in .cz-why-features-stack
      const gridGap = 40; // matches grid gap in .cz-why-grid

      const h1 = card1 ? card1.offsetHeight : 95;
      const h2 = card2 ? card2.offsetHeight : 95;
      const h3 = card3 ? card3.offsetHeight : 95;
      const w1 = card1 ? card1.offsetWidth : 580;

      const yOffset2 = h1 + gap;
      const yOffset3 = yOffset2 + h2 + gap;
      const yOffset4 = yOffset3 + h3 + gap;

      // Horizontal offset to place Card 1 exactly behind the left video card
      const xOffset = -(w1 + gridGap);

      // ══════════════════════════════════════════════════════════
      // 2. INITIAL STATES
      // ══════════════════════════════════════════════════════════
      gsap.set(".cz-subtitle-dash", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".cz-subtitle-text", { opacity: 0, x: -10 });
      gsap.set(".cz-why-title-line", { y: "105%", opacity: 0 });

      // Left video card initial state
      gsap.set(".cz-why-image-card", { opacity: 0, scale: 1.05, y: 25 });
      gsap.set(".cz-why-image", { scale: 1.08 });

      const isDesktop = window.innerWidth >= 992;
      const xOffsetCard1 = isDesktop ? xOffset : 0;
      const yOffsetCard1 = isDesktop ? 0 : -35;

      // Stacking initial states:
      // Card 1 starts behind the left video frame on desktop, or slightly shifted on mobile
      if (card1) {
        gsap.set(card1, {
          x: xOffsetCard1,
          y: yOffsetCard1,
          scale: 0.98,
          opacity: 0,
          zIndex: 4,
          position: "relative",
        });
      }
      
      // Cards 2, 3, 4 start slightly hidden behind their preceding card, translated up by 35px
      if (card2) gsap.set(card2, { y: -35, scale: 0.98, opacity: 0, zIndex: 3, position: "relative" });
      if (card3) gsap.set(card3, { y: -35, scale: 0.98, opacity: 0, zIndex: 2, position: "relative" });
      if (card4) gsap.set(card4, { y: -35, scale: 0.98, opacity: 0, zIndex: 1, position: "relative" });

      // ══════════════════════════════════════════════════════════
      // 3. UNPINNED SCRUB REVEAL TIMELINE (ONE-WAY ONLY)
      // ══════════════════════════════════════════════════════════
      const revealTl = gsap.timeline({ paused: true });

        // Step 1: Subtitle & Section Header reveal (progress 0.0 -> 0.12)
        revealTl.to(".cz-subtitle-dash", { scaleX: 1, duration: 0.04, ease: "power2.out" }, 0)
                .to(".cz-subtitle-text", { opacity: 1, x: 0, duration: 0.03, ease: "power2.out" }, 0.01)
                .to(".cz-why-title-line", {
                  y: "0%",
                  opacity: 1,
                  duration: 0.06,
                  stagger: 0.02,
                  ease: "power3.out",
                }, 0.02);

        // Step 2: Left video frame settles (progress 0.10 -> 0.22)
        revealTl.to(".cz-why-image-card", {
          opacity: 1,
          scale: 1.0,
          y: 0,
          duration: 0.12,
          ease: "power2.out",
        }, 0.10);

        // Subtle parallax drift on left image (progress 0.0 -> 1.0)
        revealTl.to(".cz-why-image", {
          scale: 1.02,
          yPercent: 4,
          ease: "none",
          duration: 1.0,
        }, 0);

        // Step 3: Card 1 emerges horizontally from behind the video frame (progress 0.16 -> 0.32)
        if (card1) {
          revealTl.to(card1, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1.0,
            duration: 0.16,
            ease: "power3.out",
          }, 0.16);
        }

        // Step 4: Card 2 emerges downward from behind Card 1 (progress 0.28 -> 0.46)
        if (card2) {
          revealTl.to(card2, { opacity: 1, duration: 0.06 }, 0.28)
                  .to(card2, {
                    y: 0,
                    scale: 1.0,
                    duration: 0.18,
                    ease: "power3.out",
                  }, 0.28);
        }

        // Step 5: Card 3 emerges downward from behind Card 2 (progress 0.42 -> 0.60)
        if (card3) {
          revealTl.to(card3, { opacity: 1, duration: 0.06 }, 0.42)
                  .to(card3, {
                    y: 0,
                    scale: 1.0,
                    duration: 0.18,
                    ease: "power3.out",
                  }, 0.42);
        }

        // Step 6: Card 4 emerges downward from behind Card 3 (progress 0.56 -> 0.74)
        if (card4) {
          revealTl.to(card4, { opacity: 1, duration: 0.06 }, 0.56)
                  .to(card4, {
                    y: 0,
                    scale: 1.0,
                    duration: 0.18,
                    ease: "power3.out",
                  }, 0.56);
        }

        // Hold completed state for the remaining 26% of scroll progress
        revealTl.to({}, { duration: 0.26 }, 0.74);

        // 3.1 One-Way Scroll Trigger Controller
        let maxProgress = 0;
        ScrollTrigger.create({
          trigger: section,
          start: "top 65%",
          end: "bottom 30%",
          onUpdate: (self) => {
            if (self.progress > maxProgress) {
              maxProgress = self.progress;
              gsap.to(revealTl, {
                progress: maxProgress,
                overwrite: "auto",
                duration: 0.22,
                ease: "power2.out",
              });
            }
          },
          onLeaveBack: () => {
            maxProgress = 0;
            gsap.set(revealTl, { progress: 0 });
          },
        });

      // ══════════════════════════════════════════════════════════
      // 4. PREMIUM JS HOVER STATES
      // ══════════════════════════════════════════════════════════
      cards.forEach((card) => {
        const onMouseEnter = () => {
          gsap.to(card, {
            borderColor: "var(--cz-orange)",
            backgroundColor: "var(--cz-dark-card)",
            x: isDesktop ? 6 : 0,
            duration: 0.28,
            ease: "power2.out",
          });
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            borderColor: "transparent",
            backgroundColor: "var(--cz-dark-green)",
            x: 0,
            duration: 0.32,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", onMouseEnter);
        card.addEventListener("mouseleave", onMouseLeave);

        (card as any)._cleanup = () => {
          card.removeEventListener("mouseenter", onMouseEnter);
          card.removeEventListener("mouseleave", onMouseLeave);
        };
      });
    }, section);

    // Refresh ScrollTrigger calculations after mount settling
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimeout);
      cards.forEach((card) => {
        if ((card as any)._cleanup) (card as any)._cleanup();
      });
    };
  }, []);

  return (
    <section className="cz-why-section" id="why-choose-us" ref={sectionRef}>
      {/* 
        Styling overrides:
        Disable CSS transform hover transitions on cards to prevent scroll stutters.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        .cz-why-feature-item {
          transition: border-color 0.3s ease, background-color 0.3s ease !important;
          will-change: transform, opacity;
        }
      `}} />

      <div className="cz-why-container">
        {/* Top Row */}
        <div className="cz-why-top-row">
          <div>
            <div className="cz-section-subtitle" style={{ justifyContent: "center" }}>
              <span className="cz-subtitle-dash" />
              <span className="cz-subtitle-text" style={{ display: "inline-block" }}>WHY CHOOSE US</span>
            </div>
            <h2 className="cz-section-title">
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="cz-why-title-line" style={{ display: "block" }}>Building Trust,</span>
              </span>
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="cz-why-title-line" style={{ display: "block" }}>Delivering Excellence</span>
              </span>
            </h2>
          </div>
        </div>

        {/* Grid: Image Left, Stack Right */}
        <div className="cz-why-grid">
          <div className="cz-why-image-card">
            <Image
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80&fit=crop"
              alt="Engineers inspecting site plans"
              fill
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="cz-why-image"
            />
            <a href="#contact" className="cz-play-btn" style={{ cursor: "pointer" }} aria-label="Get in touch">
              <div className="cz-play-icon-wrap">
                <FiPlay className="cz-play-icon" />
              </div>
            </a>
          </div>

          <div className="cz-why-features-stack">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.id} className="cz-why-feature-item">
                  <div className="cz-wf-icon-wrap">
                    <Icon />
                  </div>
                  <div className="cz-wf-text-wrap">
                    <h3 className="cz-wf-title">{feat.title}</h3>
                    <p className="cz-wf-desc">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
