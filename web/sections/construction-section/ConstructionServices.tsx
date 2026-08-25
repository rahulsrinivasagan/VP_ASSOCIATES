"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Construction.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "serv-1",
    title: "Residential Construction",
    desc: "Custom homes, multi-family residential complexes, and modern space developments built with quality engineering and strict safety standards.",
    img: "/images/construction/residential.jpeg",
  },
  {
    id: "serv-2",
    title: "Industrial Construction",
    desc: "Buildings, retail hubs, and industrial facilities engineered for operational efficiency, durability, and long-term value.",
    img: "/images/construction/industry.jpg",
  },
  {
    id: "serv-3",
    title: "Manpower Supply",
    desc: "From ground planning to final execution, our pre-screened workforce powers every phase of civil construction with efficiency and precision.",
    img: "/images/construction/manpower.jpg",
  },
];

export default function ConstructionServices() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const grid = section.querySelector(".cz-services-grid") as HTMLElement | null;
    const cards = Array.from(section.querySelectorAll(".cz-service-card")) as HTMLElement[];

    if (cards.length < 3) return;

    if (grid) {
      grid.style.perspective = "1200px";
    }

    const leftCard = cards[0];
    const centreCard = cards[1];
    const rightCard = cards[2];

    let ctx: gsap.Context;

    const initAnimations = () => {
      if (ctx) ctx.revert();

      // Clear any card cleanups to avoid double-binding events
      cards.forEach((card) => {
        if ((card as any)._cleanup) {
          (card as any)._cleanup();
          delete (card as any)._cleanup;
        }
      });

      const leftRect = leftCard.getBoundingClientRect();
      const centreRect = centreCard.getBoundingClientRect();
      const rightRect = rightCard.getBoundingClientRect();

      const xOffsetLeft = centreRect.left - leftRect.left;
      const yOffsetLeft = centreRect.top - leftRect.top;
      
      const xOffsetRight = centreRect.left - rightRect.left;
      const yOffsetRight = centreRect.top - rightRect.top;

      const isDesktop = window.innerWidth >= 992;
      const startX_left = isDesktop ? xOffsetLeft : 0;
      const startY_left = isDesktop ? 0 : yOffsetLeft;
      const startX_right = isDesktop ? xOffsetRight : 0;
      const startY_right = isDesktop ? 0 : yOffsetRight;

      ctx = gsap.context(() => {
        // ══════════════════════════════════════════════════════════
        // 2. INITIAL STATES
        // ══════════════════════════════════════════════════════════
        gsap.set(".cz-subtitle-dash", { scaleX: 0, transformOrigin: "left center" });
        gsap.set(".cz-subtitle-text", { opacity: 0, x: -10 });
        gsap.set(".cz-services-title-line", { y: "105%", opacity: 0 });

        // Centre card starts as the hero
        gsap.set(centreCard, {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 1.04,
          zIndex: 3,
          position: "relative",
        });

        // Left & Right cards start completely hidden directly behind the Centre card
        gsap.set(leftCard, {
          opacity: 0,
          x: startX_left,
          y: startY_left,
          scale: 0.98,
          rotationY: isDesktop ? -2 : 0,
          zIndex: 1,
          position: "relative",
        });

        gsap.set(rightCard, {
          opacity: 0,
          x: startX_right,
          y: startY_right,
          scale: 0.98,
          rotationY: isDesktop ? 2 : 0,
          zIndex: 1,
          position: "relative",
        });

        // Cards internal elements start hidden
        cards.forEach((card) => {
          const img = card.querySelector(".cz-sc-image");
          const title = card.querySelector(".cz-sc-title");
          const desc = card.querySelector(".cz-sc-desc");

          if (img) gsap.set(img, { scale: 1.15 });
          if (title) gsap.set(title, { opacity: 0, y: 15 });
          if (desc) gsap.set(desc, { opacity: 0, y: 15 });
        });

        // ══════════════════════════════════════════════════════════
        // 3. MASTER SCROLL REVEAL TIMELINE (ONE-WAY ONLY)
        // ══════════════════════════════════════════════════════════
        const servicesTl = gsap.timeline({ paused: true });

        // Step 1: Subtitle thin line and fade (progress 0.0 -> 0.14)
        servicesTl.to(".cz-subtitle-dash", { scaleX: 1, duration: 0.10, ease: "power2.out" }, 0)
                  .to(".cz-subtitle-text", { opacity: 1, x: 0, duration: 0.08, ease: "power2.out" }, 0.03);

        // Step 2: Main title clip lines (progress 0.04 -> 0.16)
        servicesTl.to(".cz-services-title-line", {
          y: "0%",
          opacity: 1,
          duration: 0.12,
          stagger: 0.04,
          ease: "power3.out",
        }, 0.04);

        // Internal card animation controller
        const animateInternal = (card: HTMLElement, startPos: number) => {
          const img = card.querySelector(".cz-sc-image");
          const title = card.querySelector(".cz-sc-title");
          const desc = card.querySelector(".cz-sc-desc");

          // Image settles: scale 1.15 -> 1.08
          if (img) servicesTl.to(img, { scale: 1.08, duration: 0.12, ease: "power2.out" }, startPos);
          // Text details fade up sequentially
          if (title) servicesTl.to(title, { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }, startPos + 0.08);
          if (desc) servicesTl.to(desc, { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }, startPos + 0.12);
        };

        // Stage 1: Centre card settles (progress 0.10 -> 0.22)
        servicesTl.to(centreCard, {
          opacity: 1,
          scale: 1.0,
          duration: 0.12,
          ease: "power3.out",
          willChange: "transform, opacity",
        }, 0.10);
        
        // Centre card internal elements (progress 0.22 -> 0.38)
        animateInternal(centreCard, 0.22);

        // Stage 2: Left card emerges from behind Centre card (progress 0.34 -> 0.52)
        servicesTl.to(leftCard, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1.0,
          rotationY: 0,
          duration: 0.18,
          ease: "power3.out",
          willChange: "transform, opacity",
        }, 0.34);
        
        // Left card internal elements (progress 0.52 -> 0.68)
        animateInternal(leftCard, 0.52);

        // Stage 3: Right card emerges from behind Centre card (progress 0.50 -> 0.68)
        servicesTl.to(rightCard, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1.0,
          rotationY: 0,
          duration: 0.18,
          ease: "power3.out",
          willChange: "transform, opacity",
        }, 0.50);
        
        // Right card internal elements (progress 0.68 -> 0.84)
        animateInternal(rightCard, 0.68);

        // Hold completed state for 16% of scroll progress
        servicesTl.to({}, { duration: 0.16 }, 0.84);

        // 3.1 One-Way Scroll Trigger Controller
        let maxProgress = 0;
        ScrollTrigger.create({
          trigger: section,
          start: isDesktop ? "top 80%" : "top 95%",
          end: isDesktop ? "top 10%" : "top 30%",
          onUpdate: (self) => {
            if (self.progress > maxProgress) {
              maxProgress = self.progress;
              gsap.to(servicesTl, {
                progress: maxProgress,
                overwrite: "auto",
                duration: 0.8,
                ease: "power2.out",
              });
            }
          },
          onLeaveBack: () => {
            maxProgress = 0;
            gsap.set(servicesTl, { progress: 0 });
          },
        });

        // ══════════════════════════════════════════════════════════
        // 4. IMAGE SCROLL PARALLAX (Subtle independent glide)
        // ══════════════════════════════════════════════════════════
        cards.forEach((card) => {
          const img = card.querySelector(".cz-sc-image");
          if (img) {
            gsap.to(img, {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        });

        // ══════════════════════════════════════════════════════════
        // 5. PREMIUM JS HOVER INTERACTIONS
        // ══════════════════════════════════════════════════════════
        cards.forEach((card) => {
          const img = card.querySelector(".cz-sc-image");

          const onMouseEnter = () => {
            gsap.killTweensOf([card, img]);

            // Lift card slightly & shift shadow
            gsap.to(card, {
              y: -5,
              borderColor: "var(--cz-orange)",
              boxShadow: "0 18px 42px rgba(3, 23, 13, 0.08)",
              duration: 0.3,
              ease: "power2.out",
            });

            // Zoom image slightly
            if (img) {
              gsap.to(img, {
                scale: 1.13,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          };

          const onMouseLeave = () => {
            gsap.killTweensOf([card, img]);

            // Restore card container
            gsap.to(card, {
              y: 0,
              borderColor: "var(--cz-pastel-border)",
              boxShadow: "0 10px 30px rgba(3, 23, 13, 0.04)",
              duration: 0.35,
              ease: "power2.out",
            });

            // Restore image scale
            if (img) {
              gsap.to(img, {
                scale: 1.08,
                duration: 0.35,
                ease: "power2.out",
              });
            }
          };

          card.addEventListener("mouseenter", onMouseEnter);
          card.addEventListener("mouseleave", onMouseLeave);

          // Store cleanups on card element
          (card as any)._cleanup = () => {
            card.removeEventListener("mouseenter", onMouseEnter);
            card.removeEventListener("mouseleave", onMouseLeave);
          };
        });
      }, section);
    };

    // Run initial animation setup
    initAnimations();

    const handleResize = () => {
      initAnimations();
      ScrollTrigger.refresh();
    };

    const handleLoad = () => {
      initAnimations();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleLoad);

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      if (ctx) ctx.revert();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
      clearTimeout(refreshTimeout);
      cards.forEach((card) => {
        if ((card as any)._cleanup) (card as any)._cleanup();
      });
    };
  }, []);

  return (
    <section className="cz-services-section" id="services" ref={sectionRef}>
      {/* 
        Override the default CSS transitions on .cz-service-card to prevent 
        conflicting with GSAP transforms, which is a major cause of scroll stuttering.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        .cz-service-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
          will-change: transform, opacity;
        }
      `}} />

      <div className="cz-services-container">
        <div className="cz-services-header">
          <div className="cz-section-subtitle">
            <span className="cz-subtitle-dash" />
            <span className="cz-subtitle-text" style={{ display: "inline-block" }}>OUR SERVICES</span>
          </div>
          <h2 className="cz-section-title">
            <span style={{ display: "block", overflow: "hidden" }}>
              <span className="cz-services-title-line" style={{ display: "block" }}>Structural & Civil Solutions</span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <span className="cz-services-title-line" style={{ display: "block" }}>Built for Endurance</span>
            </span>
          </h2>
        </div>

        <div className="cz-services-grid">
          {services.map((service) => {
            return (
              <div key={service.id} className="cz-service-card">
                <div className="cz-sc-image-wrap" style={{ overflow: "hidden" }}>
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="cz-sc-image"
                  />
                </div>

                <div className="cz-sc-content">
                  <h3 className="cz-sc-title">{service.title}</h3>
                  <p className="cz-sc-desc">{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
