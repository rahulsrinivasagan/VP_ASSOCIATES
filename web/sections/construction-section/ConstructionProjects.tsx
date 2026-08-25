"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiArrowRight, FiChevronDown, FiChevronUp } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Construction.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: "proj-1",
    title: "BharatBenz Dealer Yard",
    desc: "A 2-acre yard construction project for an IIMS BharatBenz dealer.",
    tag: "Commercial Construction",
    img: "/images/construction/1.png",
    reversed: false,
    specs: [] as { label: string; value: string }[],
  },
  {
    id: "proj-2",
    title: "Fabrique Laundromat Warehouse",
    desc: "A 105,000 sq. ft. warehouse constructed for Fabrique Laundromat Pvt. Ltd. at Murukkanjery.",
    tag: "Industrial Construction",
    img: "/images/construction/2.png",
    reversed: true,
    specs: [
      { label: "Location", value: "Murukkanjery" },
      { label: "Total Area", value: "105,000 sq. ft." },
    ],
  },
  {
    id: "proj-3",
    title: "Jain Housing Bridge",
    desc: "A bridge construction project for Jain Housing at Kuthambakkam, approved by the PWD Department.",
    tag: "Infrastructure",
    img: "/images/construction/3.png",
    reversed: false,
    specs: [
      { label: "Location", value: "Kuthambakkam" },
      { label: "Approval", value: "PWD Department" },
    ],
  },
  {
    id: "proj-4",
    title: "Melkondaiyar Housing Project",
    desc: "A residential development project at Melkondaiyar consisting of six houses, with three houses facing the other three houses.",
    tag: "Residential Construction",
    img: "/images/construction/4.png",
    reversed: true,
    specs: [
      { label: "Location", value: "Melkondaiyar" },
      { label: "Units", value: "6 Houses" },
    ],
  },
];

function ProjectCard({ proj }: { proj: (typeof projects)[number] }) {
  const infoPanel = (
    <div className="cz-project-info">
      <h3 className="cz-project-title">
        <span style={{ display: "block", overflow: "hidden" }}>
          <span className="cz-proj-title-line" style={{ display: "block" }}>
            {proj.title}
          </span>
        </span>
      </h3>
      <p className="cz-project-desc">{proj.desc}</p>
      {proj.specs.length > 0 && (
        <ul className="cz-project-specs">
          {proj.specs.map((s) => (
            <li key={s.label} className="cz-spec-item">
              <span className="cz-spec-dot" />
              <span>
                {s.label}: {s.value}
              </span>
            </li>
          ))}
        </ul>
      )}
      <a href="#contact" className="cz-project-link">
        <span>Learn more</span>
        <FiArrowRight />
      </a>
    </div>
  );

  const imagePanel = (
    <div className="cz-project-image-wrap" style={{ overflow: "hidden" }}>
      <Image
        src={proj.img}
        alt={proj.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="cz-project-image"
      />
      <span className="cz-project-tag-pill">{proj.tag}</span>
    </div>
  );

  return (
    <div className="cz-project-card">
      {proj.reversed ? (
        <>
          {infoPanel}
          {imagePanel}
        </>
      ) : (
        <>
          {imagePanel}
          {infoPanel}
        </>
      )}
    </div>
  );
}

export default function ConstructionProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  // Smooth expand / collapse of extra projects
  useEffect(() => {
    const el = extraRef.current;
    if (!el) return;

    if (showAll) {
      el.style.display = "block";
      el.style.overflow = "hidden";
      const fullHeight = el.scrollHeight;
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: fullHeight,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          onComplete: () => {
            el.style.height = "auto";
            el.style.overflow = "visible";
            ScrollTrigger.refresh();
          },
        }
      );
    } else {
      el.style.overflow = "hidden";
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          el.style.display = "none";
          ScrollTrigger.refresh();
        },
      });
    }
  }, [showAll]);

  // Scroll-reveal + hover animations (preserved from original)
  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    let ctx: gsap.Context;

    const initAnimations = () => {
      const cards = Array.from(section.querySelectorAll(".cz-project-card")) as HTMLElement[];
      const firstCard = cards[0];
      const secondCard = cards[1];
      const firstImageWrap = firstCard?.querySelector(".cz-project-image-wrap") as HTMLElement | null;
      const firstImage = firstImageWrap?.querySelector(".cz-project-image") as HTMLElement | null;
      const bottomCta = section.querySelector(".cz-projects-bottom-cta") as HTMLElement | null;

      ctx = gsap.context(() => {
        const isDesktop = window.innerWidth >= 992;

        const list = section.querySelector(".cz-projects-list") as HTMLElement | null;
        if (list) list.style.perspective = "1200px";

        const sectionRect = section.getBoundingClientRect();
        const wrapRect = firstImageWrap ? firstImageWrap.getBoundingClientRect() : null;
        const w = wrapRect ? wrapRect.width : 580;
        const h = wrapRect ? wrapRect.height : 380;
        const targetX = wrapRect ? (wrapRect.left - sectionRect.left) : 32;
        const targetY = wrapRect ? (wrapRect.top - sectionRect.top) : 110;

        const W = window.innerWidth;
        const H = window.innerHeight;
        const S_start = Math.max(W / w, H / h);
        const startY_viewport = targetY + (0.70 * H);
        const tx_start = (W / 2) - (targetX + w / 2);
        const ty_start = (H / 2) - (startY_viewport + h / 2);

        gsap.set(".cz-subtitle-dash", { scaleX: 0, transformOrigin: "left center" });
        gsap.set(".cz-subtitle-text", { opacity: 0, x: -10 });
        gsap.set(".cz-projects-title-line", { y: "105%", opacity: 0 });
        gsap.set(".cz-projects-bottom-cta", { opacity: 0, scale: 0.98, x: -90 });

        if (firstCard) {
          gsap.set(firstCard, { overflow: "visible" });
          const firstInfo = firstCard.querySelector(".cz-project-info");
          if (firstInfo) {
            const titleLine = firstInfo.querySelector(".cz-proj-title-line");
            const desc = firstInfo.querySelector(".cz-project-desc");
            const specs = firstInfo.querySelector(".cz-project-specs");
            const link = firstInfo.querySelector(".cz-project-link");
            if (titleLine) gsap.set(titleLine, { y: "105%", opacity: 0 });
            if (desc) gsap.set(desc, { opacity: 0, y: 12 });
            if (specs) gsap.set(specs, { opacity: 0, y: 12 });
            if (link) gsap.set(link, { opacity: 0, y: 12 });
          }
        }

        if (secondCard) {
          gsap.set(secondCard, {
            opacity: 0,
            xPercent: isDesktop ? -25 : -15,
            rotationY: isDesktop ? -4 : 0,
            rotationX: isDesktop ? 2 : 0,
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
          });
        }

        if (firstImageWrap) {
          gsap.set(firstImageWrap, {
            x: tx_start,
            y: ty_start,
            scale: S_start,
            zIndex: 10,
            borderRadius: "0px",
          });
        }

        if (firstImage) gsap.set(firstImage, { scale: 1.15 });

        const endBorderRadius = isDesktop ? "28px 0px 0px 28px" : "28px 28px 0px 0px";
        const revealTl = gsap.timeline({ paused: true });

        if (firstImageWrap) {
          revealTl.to(firstImageWrap, {
            x: 0, y: 0, scale: 1.0, borderRadius: endBorderRadius,
            duration: 0.45, ease: "expo.out", willChange: "transform",
          }, 0);
        }
        if (firstImage) {
          revealTl.to(firstImage, { scale: 1.0, duration: 0.43, ease: "expo.out", willChange: "transform" }, 0);
        }

        revealTl
          .to(".cz-subtitle-dash", { scaleX: 1, duration: 0.06, ease: "power2.out" }, 0.11)
          .to(".cz-subtitle-text", { opacity: 1, x: 0, duration: 0.05, ease: "power2.out" }, 0.13)
          .to(".cz-projects-title-line", { y: "0%", opacity: 1, duration: 0.09, ease: "power3.out" }, 0.15);

        const firstInfo = firstCard?.querySelector(".cz-project-info");
        if (firstInfo) {
          const titleLine = firstInfo.querySelector(".cz-proj-title-line");
          const desc = firstInfo.querySelector(".cz-project-desc");
          const specs = firstInfo.querySelector(".cz-project-specs");
          const link = firstInfo.querySelector(".cz-project-link");
          if (titleLine) revealTl.to(titleLine, { y: "0%", opacity: 1, duration: 0.06, ease: "power3.out" }, 0.11);
          if (desc) revealTl.to(desc, { opacity: 1, y: 0, duration: 0.06 }, 0.15);
          if (specs) revealTl.to(specs, { opacity: 1, y: 0, duration: 0.06 }, 0.22);
          if (link) revealTl.to(link, { opacity: 1, y: 0, duration: 0.06 }, 0.26);
        }

        if (secondCard) {
          revealTl.to(secondCard, {
            opacity: 1, xPercent: 0, rotationY: 0, rotationX: 0,
            duration: 0.18, ease: "power2.out", willChange: "transform, opacity",
          }, 0.22);
        }

        if (bottomCta) {
          revealTl.to(bottomCta, {
            opacity: 1, scale: 1.0, x: 0,
            duration: 0.11, ease: "power3.out", willChange: "transform, opacity",
          }, 0.34);
        }

        revealTl.to({}, { duration: 0.55 }, 0.45);

        let maxProgress = 0;
        ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          onUpdate: (self) => {
            if (self.progress > maxProgress) {
              maxProgress = self.progress;
              gsap.to(revealTl, { progress: maxProgress, overwrite: "auto", duration: 0.22, ease: "power2.out" });
            }
          },
          onLeaveBack: () => {
            maxProgress = 0;
            gsap.set(revealTl, { progress: 0 });
          },
        });
      }, section);

      cards.forEach((card) => {
        const img = card.querySelector(".cz-project-image");
        const onMouseEnter = () => {
          gsap.to(card, { borderColor: "var(--cz-orange)", boxShadow: "0 26px 54px rgba(0,0,0,0.45)", y: -5, duration: 0.3, ease: "power2.out" });
          if (img) gsap.to(img, { scale: 1.05, duration: 0.35, ease: "power2.out" });
        };
        const onMouseLeave = () => {
          gsap.to(card, { borderColor: "rgba(135,157,141,0.2)", boxShadow: "0 20px 50px rgba(0,0,0,0.3)", y: 0, duration: 0.35, ease: "power2.out" });
          if (img) gsap.to(img, { scale: 1.0, duration: 0.35, ease: "power2.out" });
        };
        card.addEventListener("mouseenter", onMouseEnter);
        card.addEventListener("mouseleave", onMouseLeave);
        (card as any)._cleanup = () => {
          card.removeEventListener("mouseenter", onMouseEnter);
          card.removeEventListener("mouseleave", onMouseLeave);
        };
      });
    };

    const handleLoad = () => { initAnimations(); ScrollTrigger.refresh(); };
    window.addEventListener("load", handleLoad);
    const timeout = setTimeout(() => { initAnimations(); ScrollTrigger.refresh(); }, 400);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("load", handleLoad);
      if (ctx) ctx.revert();
      const cards = Array.from(section.querySelectorAll(".cz-project-card")) as HTMLElement[];
      cards.forEach((card) => { if ((card as any)._cleanup) (card as any)._cleanup(); });
    };
  }, []);

  return (
    <section className="cz-projects-section" id="projects" ref={sectionRef} style={{ position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .cz-projects-section {
          overflow: hidden !important;
        }
        .cz-project-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
          will-change: transform, opacity;
        }
        .cz-project-image-wrap {
          will-change: transform;
          transform-style: preserve-3d !important;
          backface-visibility: hidden !important;
        }
        .cz-project-image {
          will-change: transform;
          transform-style: preserve-3d !important;
          backface-visibility: hidden !important;
        }
        .cz-projects-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 2px solid var(--cz-orange, #e07b39);
          color: var(--cz-orange, #e07b39);
          padding: 14px 32px;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.28s ease, color 0.28s ease, transform 0.2s ease;
        }
        .cz-projects-toggle-btn:hover {
          background: var(--cz-orange, #e07b39);
          color: #fff;
          transform: translateY(-2px);
        }
      `}} />

      <div className="cz-projects-container">
        <div className="cz-projects-header">
          <div className="cz-section-subtitle">
            <span className="cz-subtitle-dash" />
            <span className="cz-subtitle-text" style={{ display: "inline-block" }}>Recent Projects</span>
          </div>
          <h2 className="cz-section-title">
            <span style={{ display: "block", overflow: "hidden" }}>
              <span className="cz-projects-title-line" style={{ display: "block" }}>Our Completed Projects</span>
            </span>
          </h2>
        </div>

        {/* Always-visible: Projects 1 & 2 */}
        <div className="cz-projects-list">
          <ProjectCard proj={projects[0]} />
          <ProjectCard proj={projects[1]} />
        </div>

        {/* Collapsible: Projects 3 & 4 */}
        <div
          ref={extraRef}
          id="cz-extra-projects"
          style={{ display: "none", height: 0, overflow: "hidden", opacity: 0 }}
        >
          <div className="cz-projects-list" style={{ marginTop: 0, paddingTop: 0 }}>
            <ProjectCard proj={projects[2]} />
            <ProjectCard proj={projects[3]} />
          </div>
        </div>

        {/* View All / Show Less button */}
        <div className="cz-projects-bottom-cta">
          <button
            id="cz-toggle-projects-btn"
            className="cz-projects-toggle-btn"
            onClick={() => setShowAll((prev) => !prev)}
            aria-expanded={showAll}
            aria-controls="cz-extra-projects"
          >
            <span>{showAll ? "Show Less" : "View All Projects"}</span>
            {showAll ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>
    </section>
  );
}
