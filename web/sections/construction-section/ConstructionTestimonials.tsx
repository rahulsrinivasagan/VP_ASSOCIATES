"use client";

import { useEffect, useRef } from "react";
import CircularTestimonials from "@/components/Testimonials";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Construction.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote:
      "VP Associates helped us solve engineering and structural challenges around our commercial site. Their precision and execution is unmatched — they only do A+ work.",
    name: "Richard Walker",
    designation: "Co-founder at Swift",
    image: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=face",
      alt: "Richard Walker",
    },
  },
  {
    quote:
      "Working with VP Associates brought incredible rigour to our luxury estate builds. On time, on budget, and zero compromises on safety or quality.",
    name: "Elena Rostova",
    designation: "Chief Architect at Apex Built",
    image: {
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&fit=crop&crop=face",
      alt: "Elena Rostova",
    },
  },
  {
    quote:
      "The structural precision and modern engineering execution delivered by VP Associates made our flagship tower an architectural icon in the city.",
    name: "David Sterling",
    designation: "Managing Director at Sterling Assets",
    image: {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&fit=crop&crop=face",
      alt: "David Sterling",
    },
  },
];

export default function ConstructionTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      gsap.set(".cz-testi-subtitle-dash", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".cz-testi-subtitle-text", { opacity: 0, x: -10 });
      gsap.set(".cz-testi-title-line", { y: "105%", opacity: 0 });
      gsap.set(".cz-testimonials-content", { opacity: 0, scale: 0.96, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.to(".cz-testi-subtitle-dash", { scaleX: 1, duration: 0.15, ease: "power2.out" })
        .to(".cz-testi-subtitle-text", { opacity: 1, x: 0, duration: 0.12, ease: "power2.out" }, "-=0.1")
        .to(".cz-testi-title-line", {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }, "-=0.08")
        .to(
          ".cz-testimonials-content",
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.2"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cz-testimonials-section"
      id="testimonials"
      style={{
        background: "var(--cz-bg-light)",
        padding: "100px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div className="cz-testimonials-container" style={{ width: "100%", maxWidth: "1240px", padding: "0 32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        <div className="cz-testimonials-header" style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="cz-section-subtitle" style={{ justifyContent: "center" }}>
            <span className="cz-testi-subtitle-dash cz-subtitle-dash" />
            <span className="cz-testi-subtitle-text cz-subtitle-text" style={{ display: "inline-block" }}>Client Stories</span>
          </div>
          <h2 className="cz-section-title">
            <span style={{ display: "block", overflow: "hidden" }}>
              <span className="cz-testi-title-line" style={{ display: "block" }}>What Our Clients Say</span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <span className="cz-testi-title-line" style={{ display: "block" }}>About Our Work</span>
            </span>
          </h2>
        </div>

        <div className="cz-testimonials-content" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            autoplayInterval={5000}
            nameColor="var(--cz-dark-green)"
            designationColor="var(--cz-text-muted)"
            quoteColor="var(--cz-text-dark)"
            arrowBackground="var(--cz-dark-green)"
            arrowForeground="var(--cz-white)"
            arrowHoverBackground="var(--cz-orange)"
            nameFont={{ fontSize: "1.75rem", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.2" }}
            designationFont={{ fontSize: "1rem", fontWeight: "400", letterSpacing: "-0.01em" }}
            quoteFont={{ fontSize: "1.1rem", fontWeight: "400", letterSpacing: "-0.01em", lineHeight: "1.75" }}
            maxQuoteLength={300}
            backgroundColor="transparent"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}
