"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomeContactSection.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HomeContactSectionProps {
  email?: string;
  logo?: {
    src: string;
    alt: string;
  };
  certification?: {
    src: string;
    alt: string;
    label?: string;
  };
}

export default function HomeContactSection({
  email = "vpassociatestrl@gmail.com",
  logo,
  certification,
}: HomeContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("all", () => {
      gsap.fromTo(
        [
          ".vpa-contact-badge-wrap",
          ".vpa-contact-heading",
          ".vpa-contact-desc",
          ".vpa-contact-checklist",
          ".vpa-contact-action",
          ".vpa-contact-info-block",
          ".vpa-contact-right"
        ],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="vpa-contact-section" aria-label="Contact VP Associates">
      <div className="vpa-contact-container">
        <div className="vpa-contact-layout">
          
          {/* Left Column: Details & Contact Info */}
          <div className="vpa-contact-left">
            {/* Contact Us Badge */}
            <div className="vpa-contact-badge-wrap">
              <span className="vpa-contact-badge">Contact Us</span>
            </div>

            {/* Display Heading */}
            <h2 className="vpa-contact-heading">
              Let&apos;s Build Something Great Together.
            </h2>

            {/* Supporting Description */}
            <p className="vpa-contact-desc">
              Whether you&apos;re planning a construction project, organizing a catering event, or booking our professionally managed cricket facilities, VP Associates is ready to deliver reliable, high-quality solutions tailored to your needs. Get in touch with our team today.
            </p>

            {/* Checklist Feature Points */}
            <div className="vpa-contact-checklist">
              <span className="vpa-contact-check-item">
                <span className="vpa-contact-check-icon">✔</span>
                Trusted & Experienced Team
              </span>
              <span className="vpa-contact-check-item">
                <span className="vpa-contact-check-icon">✔</span>
                End-to-End Professional Solutions
              </span>
            </div>

            {/* CTA Button: Contact Our Team */}
            <div className="vpa-contact-action">
              <a href="/construction#contact" className="vpa-contact-btn">
                <span>Contact Our Team</span>
                <span className="vpa-contact-btn-arrow">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Contact Information block */}
            <div className="vpa-contact-info-block">
              <h3 className="vpa-contact-info-title">Get In Touch</h3>
              
              {/* Phone row */}
              <div className="vpa-contact-info-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="vpa-contact-info-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a
                  href="tel:+919566772325"
                  className="vpa-contact-phone-link"
                  onClick={() => {
                    window.location.href = "tel:+919566772325";
                  }}
                >
                  +91 95667 72325
                </a>
              </div>

              {/* Email row */}
              <div className="vpa-contact-info-row">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="vpa-contact-info-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a
                  href={`mailto:${email}`}
                  className="vpa-contact-email-link"
                  onClick={() => {
                    window.location.href = `mailto:${email}`;
                  }}
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stack (FSSAI Certification + Srivari Caterers Logo) */}
          {(logo || certification) && (
            <div className="vpa-contact-right">
              <div className="vpa-contact-visual-stack">
                
                {/* Top: FSSAI Certification */}
                {certification && (
                  <div className="vpa-contact-cert-block">
                    <div className="vpa-contact-cert-badge">
                      <img
                        src={certification.src}
                        alt={certification.alt}
                        className="vpa-contact-cert-img"
                      />
                      {certification.label && (
                        <span className="vpa-contact-cert-label">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          {certification.label}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom: Srivari Caterers Logo */}
                {logo && (
                  <div className="vpa-contact-logo-box">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="vpa-contact-logo-img"
                    />
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
