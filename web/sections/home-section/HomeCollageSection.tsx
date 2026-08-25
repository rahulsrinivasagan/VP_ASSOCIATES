"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomeCollageSection.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COLLAGE_IMAGES = [
  {
    src: "/images/about/blueprint.png",
    alt: "Construction team discussing plans on-site",
  },
  {
    src: "/images/about/construction.png",
    alt: "Construction worker actively building a project",
  },
  {
    src: "/images/about/catering.png",
    alt: "Professional catering service preparing and serving food",
  },
  {
    src: "/images/about/cricket.png",
    alt: "Cricket ground, stadium, and grass turf under lights",
  },
];

export default function HomeCollageSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop animations (>= 1025px)
    mm.add("(min-width: 1025px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 35%",
          scrub: 1,
        },
      });

      tl.to([".vpa-collage-badge-wrapper", ".vpa-collage-heading"], {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power1.out",
      });

      tl.to(".vpa-collage-card--odd", {
        opacity: 1,
        y: 0,
        ease: "power1.out",
      }, "-=0.2");

      tl.to(".vpa-collage-card--even", {
        opacity: 1,
        y: 0,
        ease: "power1.out",
      }, "<");
    });

    // Mobile & Tablet animations (<= 1024px)
    mm.add("(max-width: 1024px)", () => {
      gsap.fromTo(
        [".vpa-collage-badge-wrapper", ".vpa-collage-heading"],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".vpa-collage-heading",
            start: "top bottom",
            once: true,
            toggleActions: "play none none none",
          },
        }
      );

      const cards = gsap.utils.toArray(".vpa-collage-image-card") as HTMLElement[];
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="vpa-collage-section" aria-label="About VP Associates">
      <div className="vpa-collage-container">

        {/* About Us Badge */}
        <div className="vpa-collage-badge-wrapper">
          <span className="vpa-collage-badge">ABOUT US</span>
        </div>

        {/* Centered Heading & Description */}
        <div className="vpa-collage-heading">
          <h2 style={{ fontSize: "clamp(24px, 3.2vw, 38px)", fontWeight: 800, color: "#03170d", marginBottom: "16px", lineHeight: 1.25 }}>
            Delivering Quality Across Construction, Catering & Sports.
          </h2>
          <p style={{ fontSize: "clamp(15px, 1.4vw, 17px)", fontWeight: 500, color: "#576b5f", lineHeight: 1.65, margin: 0 }}>
            Since 2015, VP Associates has built a solid reputation based on reliability, quality workmanship, and seamless execution. Whether you need skilled construction labor and civil engineering, turnkey event catering, or professional cricket ground rentals for corporate and private matches, we handle every detail with complete dedication.
          </p>
        </div>

        {/* 4-Image Horizontal Row */}
        <div className="vpa-collage-grid">
          {COLLAGE_IMAGES.map((img, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={i}
                className={`vpa-collage-image-card ${isEven ? "vpa-collage-card--even" : "vpa-collage-card--odd"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  sizes="(max-width: 600px) 90vw, 25vw"
                  className="vpa-collage-img"
                  priority={i === 0}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


