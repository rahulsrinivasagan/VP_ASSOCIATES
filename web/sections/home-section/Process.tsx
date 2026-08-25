"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Process.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Consultation & Brief",
    desc: "We begin with a detailed consultation to understand your vision, goals, timeline, and requirements before any work begins.",
  },
  {
    num: "02",
    title: "Planning & Design",
    desc: "Our team creates a tailored plan — from project blueprints to menu selections — ensuring every detail is mapped out and approved.",
  },
  {
    num: "03",
    title: "Expert Execution",
    desc: "Skilled professionals take the plan to action, delivering with quality workmanship, punctuality, and transparent communication throughout.",
  },
  {
    num: "04",
    title: "Handover & Support",
    desc: "We complete with a thorough review, formal handover, and continue to offer post-delivery support and customer care.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop GSAP (>= 1025px)
    mm.add("(min-width: 1025px)", () => {
      gsap.to([
        ".vpa-process-badge",
        ".vpa-process-heading",
        ".vpa-process-desc",
      ], {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".vpa-process-header",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      const steps = gsap.utils.toArray(".vpa-process-step") as HTMLElement[];
      steps.forEach((step, i) => {
        gsap.to(step, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: ".vpa-process-steps",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    // Mobile & Tablet GSAP (<= 1024px)
    mm.add("(max-width: 1024px)", () => {
      gsap.fromTo(
        [
          ".vpa-process-badge",
          ".vpa-process-heading",
          ".vpa-process-desc",
        ],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".vpa-process-header",
            start: "top bottom",
            once: true,
            toggleActions: "play none none none",
          },
        }
      );

      const steps = gsap.utils.toArray(".vpa-process-step") as HTMLElement[];
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top bottom",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    // Connector line appears when steps come into view
    ScrollTrigger.create({
      trigger: ".vpa-process-steps",
      start: "top 80%",
      onEnter: () => {
        document.querySelector(".vpa-process-steps")?.classList.add("line-visible");
      },
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="vpa-process-section"
      id="process"
      aria-label="Our Work Process"
    >
      <div className="vpa-process-container">

        {/* Section Header */}
        <header className="vpa-process-header">
          <span className="vpa-process-badge">Work Process</span>
          <h2 className="vpa-process-heading">
            How We Deliver Excellence Every Time
          </h2>
          <p className="vpa-process-desc">
            From the first conversation to the final handover, every step is handled with care, expertise, and a commitment to your satisfaction.
          </p>
        </header>

        {/* Steps Grid */}
        <div className="vpa-process-steps">
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} className="vpa-process-step">
              <div className="vpa-process-step-num">{step.num}</div>
              <h3 className="vpa-process-step-title">{step.title}</h3>
              <p className="vpa-process-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

