"use client";

import { useEffect, useRef, useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Construction.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: "What types of construction projects do you specialize in?",
    answer: "We specialize in high-end commercial infrastructure, premium residential complexes, luxury custom home builds, and turnkey industrial spaces. Our team handles everything from initial architectural planning to final engineering and safety checks.",
  },
  {
    question: "How do you ensure safety and quality standards on site?",
    answer: "We strictly adhere to international quality standards (ISO 9001) and local safety regulations. Every project is overseen by certified safety officers and master engineers. We also run regular compliance checks and site safety audits.",
  },
  {
    question: "What is your manpower supply mobilization process?",
    answer: "We maintain a pre-screened pool of verified engineering and labor professionals. Depending on your project's scope, requirements, and compliance checks, we can mobilize specialized labor within 3 to 7 days.",
  },
  {
    question: "Do you provide turnkey design and build services?",
    answer: "Yes, we offer comprehensive turnkey solutions. This includes conceptual architectural design, structural engineering, government approvals/permitting, material procurement, project management, and complete construction execution.",
  },
  {
    question: "How are project phases billed and managed?",
    answer: "We structure projects into clear, transparent milestones. Invoices are generated only after the successful verification and client sign-off of each milestone. Clients receive progress reports through our project management portal.",
  },
];

export default function ConstructionFAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    const items = Array.from(section.querySelectorAll(".cz-faq-item")) as HTMLElement[];

    const ctx = gsap.context(() => {
      gsap.set(".cz-faq-subtitle-dash", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".cz-faq-subtitle-text", { opacity: 0, x: -10 });
      gsap.set(".cz-faq-title-line", { y: "105%", opacity: 0 });
      gsap.set(".cz-faq-container-inner", { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.to(".cz-faq-subtitle-dash", { scaleX: 1, duration: 0.15, ease: "power2.out" })
        .to(".cz-faq-subtitle-text", { opacity: 1, x: 0, duration: 0.12, ease: "power2.out" }, "-=0.1")
        .to(".cz-faq-title-line", {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }, "-=0.08")
        .to(
          ".cz-faq-container-inner",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cz-faq-section" id="faq" ref={sectionRef} style={{ background: "var(--cz-white)", padding: "100px 0" }}>
      <div className="cz-faq-container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 32px" }}>
        
        <div className="cz-faq-header" style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="cz-section-subtitle" style={{ justifyContent: "center" }}>
            <span className="cz-faq-subtitle-dash cz-subtitle-dash" />
            <span className="cz-faq-subtitle-text cz-subtitle-text" style={{ display: "inline-block" }}>FAQ</span>
          </div>
          <h2 className="cz-section-title">
            <span style={{ display: "block", overflow: "hidden" }}>
              <span className="cz-faq-title-line" style={{ display: "block" }}>Frequently Asked</span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <span className="cz-faq-title-line" style={{ display: "block" }}>Questions</span>
            </span>
          </h2>
        </div>

        <div className="cz-faq-container-inner" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <style dangerouslySetInnerHTML={{ __html: `
            .cz-faq-item {
              border-bottom: 1px solid var(--cz-pastel-border);
              padding: 20px 0;
            }
            .cz-faq-question-btn {
              width: 100%;
              background: none;
              border: none;
              text-align: left;
              padding: 0;
              margin: 0;
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;
              color: var(--cz-dark-green);
              transition: color 0.3s ease;
            }
            .cz-faq-question-btn:hover {
              color: var(--cz-orange);
            }
            .cz-faq-question-btn h3 {
              font-size: 18px;
              font-weight: 700;
              margin: 0;
              padding-right: 20px;
            }
            .cz-faq-toggle-icon {
              font-size: 20px;
              color: var(--cz-orange);
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .cz-faq-answer-wrap {
              overflow: hidden;
              transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin-top 0.3s ease;
              max-height: 0;
              opacity: 0;
              margin-top: 0;
            }
            .cz-faq-answer-wrap.active {
              max-height: 250px;
              opacity: 1;
              margin-top: 14px;
            }
            .cz-faq-answer {
              font-size: 15px;
              line-height: 1.65;
              color: var(--cz-text-muted);
              margin: 0;
            }
          `}} />

          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div key={idx} className="cz-faq-item">
                <button
                  className="cz-faq-question-btn"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                >
                  <h3>{faq.question}</h3>
                  <div className="cz-faq-toggle-icon">
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </div>
                </button>
                <div className={`cz-faq-answer-wrap ${isOpen ? "active" : ""}`}>
                  <p className="cz-faq-answer">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
