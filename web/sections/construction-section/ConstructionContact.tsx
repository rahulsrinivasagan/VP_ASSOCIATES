"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { FiSend, FiCheckCircle, FiMapPin, FiPhone, FiLayers, FiAlertCircle } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "./Construction.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export default function ConstructionContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealTlRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);
  const lastWidthRef = useRef<number>(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sourcePage: "Construction Page - Contact Us Form",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleContactScroll = () => {
      if (typeof window === "undefined") return;
      if (window.location.hash === "#contact") {
        if (!hasAnimatedRef.current && revealTlRef.current) {
          hasAnimatedRef.current = true;
          revealTlRef.current.play();
        }
        const el = document.getElementById("contact");
        if (!el) return;
        const navbarOffset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const targetY = elementPosition - navbarOffset;

        window.scrollTo({
          top: targetY,
          behavior: "smooth"
        });
      }
    };

    handleContactScroll();
    window.addEventListener("hashchange", handleContactScroll);
    return () => window.removeEventListener("hashchange", handleContactScroll);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (typeof window !== "undefined") {
      lastWidthRef.current = window.innerWidth;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const section = sectionRef.current;
    let ctx: gsap.Context;

    const initAnimations = () => {
      const formCard = section.querySelector(".cz-contact-form-card") as HTMLElement | null;
      const infoCard = section.querySelector(".cz-contact-info-card") as HTMLElement | null;
      const titleElement = section.querySelector(".cz-section-title") as HTMLElement | null;
      const dashElement = section.querySelector(".cz-subtitle-dash") as HTMLElement | null;

      ctx = gsap.context(() => {
        const sectionRect = section.getBoundingClientRect();
        
        const dashRect = dashElement ? dashElement.getBoundingClientRect() : null;
        const rawStartX = dashRect ? (dashRect.left - sectionRect.left + dashRect.width / 2) : 100;
        const rawStartY = dashRect ? (dashRect.top - sectionRect.top + dashRect.height / 2) : 120;

        const buttonCircle = formCard?.querySelector(".cz-btn-icon-circle") as HTMLElement | null;
        const circleRect = buttonCircle?.getBoundingClientRect();
        const circleWidth = circleRect ? circleRect.width : 32;
        const circleHeight = circleRect ? circleRect.height : 32;
        
        const rawEndX = circleRect && formCard 
          ? (circleRect.left - sectionRect.left + circleWidth / 2) 
          : 400;
        const rawEndY = circleRect && formCard 
          ? (circleRect.top - sectionRect.top + circleHeight / 2) 
          : 680;

        const startX = rawStartX - circleWidth / 2;
        const startY = rawStartY - circleHeight / 2;
        const endX = rawEndX - circleWidth / 2;
        const endY = rawEndY - circleHeight / 2;

        const cp1X = startX + 150;
        const cp1Y = startY + 50;
        const cp2X = startX - 50;
        const cp2Y = startY + 220;
        const cp3X = endX - 180;
        const cp3Y = endY - 60;

        if (!hasAnimatedRef.current) {
          gsap.set(".cz-subtitle-dash", { scaleX: 1, transformOrigin: "left center" });
          gsap.set(".cz-subtitle-text", { opacity: 0, x: -10 });
          gsap.set(".cz-contact-form-card", { opacity: 0, scale: 0.97 });
          
          const fields = Array.from(section.querySelectorAll(".cz-form-field")) as HTMLElement[];
          fields.forEach((field, index) => {
            const dir = index % 2 === 0 ? -30 : 30;
            gsap.set(field, { opacity: 0, x: dir });
          });

          if (infoCard) {
            gsap.set(infoCard, { opacity: 0, y: -30 });
            const infoBlocks = Array.from(infoCard.querySelectorAll(".cz-info-block")) as HTMLElement[];
            infoBlocks.forEach((block, index) => {
              const dir = index % 2 === 0 ? -15 : 15;
              gsap.set(block, { opacity: 0, x: dir });
            });
          }

          const flyingCircle = section.querySelector(".cz-flying-circle") as HTMLElement | null;
          if (flyingCircle) {
            gsap.set(flyingCircle, {
              display: "flex",
              x: startX,
              y: startY,
              opacity: 0,
              scale: 0.0,
              transformOrigin: "center center",
              rotation: 0,
            });
          }

          if (buttonCircle) {
            gsap.set(buttonCircle, { opacity: 0 });
          }

          const originalIcon = buttonCircle?.querySelector("svg") as HTMLElement | null;
          if (originalIcon) {
            gsap.set(originalIcon, { opacity: 1 });
          }
        }

        const revealTl = gsap.timeline({ paused: true });

        revealTl.to(".cz-subtitle-dash", { scaleX: 0, duration: 0.25, ease: "power2.inOut" }, 0);
        
        const flyingCircle = section.querySelector(".cz-flying-circle") as HTMLElement | null;
        if (flyingCircle) {
          revealTl.to(flyingCircle, {
            opacity: 1,
            scale: 1.0,
            duration: 0.25,
            ease: "power2.inOut",
            willChange: "transform, opacity",
          }, 0);
          
          revealTl.to(flyingCircle, {
            y: startY - 15,
            rotation: -15,
            duration: 0.25,
            ease: "power2.out",
            willChange: "transform",
          }, 0.2);
        }

        revealTl.to(".cz-subtitle-text", { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }, 0.2);

        const fullText = "Have a Project Idea?\nLet's Talk!";
        const textObj = { charCount: 0 };
        revealTl.to(textObj, {
          charCount: fullText.length,
          duration: 0.65,
          ease: "none",
          onUpdate: () => {
            if (titleElement) {
              const count = Math.floor(textObj.charCount);
              const sliced = fullText.substring(0, count);
              const cursor = count < fullText.length ? '<span class="cz-typing-cursor">|</span>' : '';
              titleElement.innerHTML = sliced.replace(/\n/g, "<br />") + cursor;
            }
          },
        }, 0.25);

        revealTl.to(".cz-contact-form-card", {
          opacity: 1,
          scale: 1.0,
          duration: 0.5,
          ease: "power2.out",
          willChange: "transform, opacity",
        }, 0.45);

        if (infoCard) {
          revealTl.to(infoCard, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            willChange: "transform, opacity",
          }, 0.45);

          const infoBlocks = Array.from(infoCard.querySelectorAll(".cz-info-block")) as HTMLElement[];
          infoBlocks.forEach((block, index) => {
            revealTl.to(block, {
              opacity: 1,
              x: 0,
              duration: 0.35,
              ease: "power2.out",
              willChange: "transform, opacity",
            }, 0.6 + index * 0.1);
          });
        }

        const fields = Array.from(section.querySelectorAll(".cz-form-field")) as HTMLElement[];
        fields.forEach((field, index) => {
          revealTl.to(field, {
            opacity: 1,
            x: 0,
            duration: 0.35,
            ease: "power2.out",
            willChange: "transform, opacity",
          }, 0.55 + index * 0.08);
        });

        if (flyingCircle) {
          revealTl.to(flyingCircle, {
            motionPath: {
              path: [
                { x: startX, y: startY - 15 },
                { x: cp1X, y: cp1Y },
                { x: cp2X, y: cp2Y },
                { x: cp3X, y: cp3Y },
                { x: endX, y: endY },
              ],
              autoRotate: true,
            },
            duration: 1.1,
            ease: "power1.inOut",
            willChange: "transform",
          }, 0.45);

          revealTl.to(flyingCircle, { opacity: 0, scale: 0.2, duration: 0.15 }, 1.55);
        }

        if (buttonCircle) {
          revealTl.to(buttonCircle, { opacity: 1, duration: 0.15 }, 1.55)
                  .to(buttonCircle, {
                    boxShadow: "0 0 14px rgba(238, 129, 50, 0.6)",
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                  }, 1.55);
        }

        revealTlRef.current = revealTl;

        const playAnimation = () => {
          if (!hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            revealTl.play();
          }
        };

        ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          once: true,
          onEnter: () => {
            playAnimation();
          },
        });

        // If page loaded with #contact or is already scrolled past trigger
        if (window.location.hash === "#contact") {
          setTimeout(playAnimation, 300);
        }
      }, section);
    };

    const handleResize = () => {
      // Only re-init if the width significantly changed (avoiding mobile vertical address bar resize jitter)
      if (typeof window !== "undefined") {
        if (Math.abs(window.innerWidth - lastWidthRef.current) > 30) {
          lastWidthRef.current = window.innerWidth;
          initAnimations();
          ScrollTrigger.refresh();
        }
      }
    };

    window.addEventListener("resize", handleResize);

    const timeout = setTimeout(() => {
      initAnimations();
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section className="cz-contact-section" id="contact" ref={sectionRef} style={{ position: "relative" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .cz-typing-cursor {
          display: inline-block;
          margin-left: 4px;
          color: var(--cz-orange);
          font-weight: 300;
          animation: cz-blink 1s step-end infinite;
        }
        @keyframes cz-blink {
          from, to { color: transparent }
          50% { color: var(--cz-orange) }
        }
        .cz-contact-form-card, .cz-contact-info-card, .cz-form-field, .cz-info-block {
          transition: none !important;
        }
        .cz-flying-circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--cz-dark-green);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 100;
          pointer-events: none;
          box-shadow: 0 8px 24px rgba(3, 23, 13, 0.25);
        }
        .cz-flying-circle svg {
          color: var(--cz-orange);
          font-size: 15px;
        }

        .cz-contact-info-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(145deg, #052315 0%, #03170d 100%);
          color: var(--cz-white);
          border-radius: 24px;
          padding: 40px 34px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 26px;
          border: 1px solid rgba(135, 157, 141, 0.2);
          box-shadow: 0 20px 50px rgba(3, 23, 13, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
        .cz-info-blueprint-bg {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
          opacity: 0.7;
          z-index: 1;
        }
        .cz-info-glow-accent {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(238, 129, 50, 0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
        .cz-info-header-block {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cz-info-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: var(--cz-orange);
          text-transform: uppercase;
        }
        .cz-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cz-orange);
          box-shadow: 0 0 8px var(--cz-orange);
        }
        .cz-info-card-title {
          font-size: 21px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.3;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .cz-info-card-sub {
          font-size: 13.5px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.72);
          margin: 0;
        }
        .cz-info-divider {
          position: relative;
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin-top: 4px;
        }
        .cz-divider-orange-accent {
          position: absolute;
          left: 0;
          top: 0;
          width: 45px;
          height: 2px;
          background: var(--cz-orange);
          border-radius: 2px;
        }
        .cz-info-timeline {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 26px;
          flex-grow: 1;
          justify-content: center;
        }
        .cz-timeline-line {
          position: absolute;
          left: 20px;
          top: 20px;
          bottom: 20px;
          width: 2px;
          background: linear-gradient(to bottom, rgba(238, 129, 50, 0.35), rgba(255, 255, 255, 0.06));
          z-index: 1;
        }
        .cz-info-item-block {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .cz-info-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(3, 23, 13, 0.7);
          border: 1px solid rgba(238, 129, 50, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--cz-orange);
          font-size: 17px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        .cz-info-item-block:hover .cz-info-icon-wrap {
          background: var(--cz-orange);
          color: #ffffff;
          border-color: var(--cz-orange);
          box-shadow: 0 6px 18px rgba(238, 129, 50, 0.4);
          transform: translateY(-2px);
        }
        .cz-info-item-content {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .cz-info-item-content .cz-info-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: var(--cz-orange);
        }
        .cz-info-item-content .cz-info-val {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.94);
          margin: 0;
        }
        .cz-info-item-content .cz-info-val a {
          transition: color 0.2s ease;
        }
        .cz-info-item-content .cz-info-val a:hover {
          color: var(--cz-orange) !important;
        }
        .cz-info-core-block {
          position: relative;
          z-index: 2;
          margin-top: 2px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cz-core-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: rgba(255, 255, 255, 0.65);
          text-transform: uppercase;
        }
        .cz-core-icon {
          color: var(--cz-orange);
          font-size: 14px;
        }
        .cz-core-tags-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .cz-core-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.88);
          transition: all 0.25s ease;
        }
        .cz-core-tag:hover {
          border-color: rgba(238, 129, 50, 0.4);
          background: rgba(238, 129, 50, 0.12);
          color: #ffffff;
          transform: translateY(-1px);
        }
        .cz-tag-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--cz-orange);
        }
      `}} />

      {/* Signature Flight Circle element */}
      <div className="cz-flying-circle">
        <FiSend style={{ transform: "rotate(45deg)" }} />
      </div>

      <div className="cz-contact-container" style={{ position: "relative" }}>
        <div className="cz-contact-header">
          <div className="cz-section-subtitle">
            <span className="cz-subtitle-dash" />
            <span className="cz-subtitle-text" style={{ display: "inline-block" }}>Contact Us</span>
          </div>
          <h2 className="cz-section-title" style={{ minHeight: "100px" }}>
            Have a Project Idea? <br /> Let&apos;s Talk!
          </h2>
        </div>

        <div className="cz-contact-grid">
          {/* Left Form Card */}
          <div className="cz-contact-form-card">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--cz-dark-green)" }}>
                <FiCheckCircle style={{ fontSize: "48px", color: "var(--cz-orange)", marginBottom: "16px" }} />
                <h3 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "8px" }}>Message Sent!</h3>
                <p style={{ color: "var(--cz-text-muted)", fontSize: "15px", lineHeight: "1.6" }}>
                  Thank you for reaching out. Your enquiry has been received and our team will review your requirements and respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="cz-form-grid">
                  <div className="cz-form-field">
                    <label className="cz-field-label">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      className="cz-input"
                    />
                  </div>
                  <div className="cz-form-field">
                    <label className="cz-field-label">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                      className="cz-input"
                    />
                  </div>
                  <div className="cz-form-field">
                    <label className="cz-field-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      required
                      className="cz-input"
                    />
                  </div>
                  <div className="cz-form-field">
                    <label className="cz-field-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 95667 72325"
                      required
                      className="cz-input"
                    />
                  </div>
                  <div className="cz-form-field full-width">
                    <label className="cz-field-label">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Commercial Construction Inquiry"
                      required
                      className="cz-input"
                    />
                  </div>
                  <div className="cz-form-field full-width">
                    <label className="cz-field-label">Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project requirements..."
                      rows={4}
                      required
                      className="cz-textarea"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "rgba(220, 38, 38, 0.08)",
                    border: "1px solid rgba(220, 38, 38, 0.2)",
                    color: "#dc2626",
                    fontSize: "13.5px",
                    marginBottom: "16px"
                  }}>
                    <FiAlertCircle style={{ flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="cz-btn-orange"
                  style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.75 : 1 }}
                >
                  <span>{loading ? "Sending Enquiry..." : "Submit Request"}</span>
                  <div className="cz-btn-icon-circle">
                    <FiSend />
                  </div>
                </button>
              </form>
            )}
          </div>

          {/* Right Dark Oil Green Info Card */}
          <div className="cz-contact-info-card">
            {/* Blueprint Grid Background Pattern */}
            <div className="cz-info-blueprint-bg" aria-hidden="true" />
            <div className="cz-info-glow-accent" aria-hidden="true" />

            {/* Block 1: Header */}
            <div className="cz-info-block cz-info-header-block">
              <div className="cz-info-badge">
                <span className="cz-badge-dot" />
                <span>VP ASSOCIATES</span>
              </div>
              <h3 className="cz-info-card-title">Let&apos;s Build Something Great.</h3>
              <p className="cz-info-card-sub">
                From construction and workforce solutions to catering and sports infrastructure, our team is ready to discuss your next requirement.
              </p>
              <div className="cz-info-divider">
                <span className="cz-divider-orange-accent" />
              </div>
            </div>

            {/* Connected Vertical Timeline Container */}
            <div className="cz-info-timeline">
              <div className="cz-timeline-line" aria-hidden="true" />

              {/* Block 2: Address */}
              <div className="cz-info-block cz-info-item-block">
                <div className="cz-info-icon-wrap">
                  <FiMapPin />
                </div>
                <div className="cz-info-item-content">
                  <span className="cz-info-label">Address</span>
                  <p className="cz-info-val">
                    No: 850, Perumal Koil Street<br />
                    Murukkanjery Village, Aranvoyal Post<br />
                    Tiruvallur Taluk and District<br />
                    602025
                  </p>
                </div>
              </div>

              {/* Block 3: Contact */}
              <div className="cz-info-block cz-info-item-block">
                <div className="cz-info-icon-wrap">
                  <FiPhone />
                </div>
                <div className="cz-info-item-content">
                  <span className="cz-info-label">Contact</span>
                  <p className="cz-info-val">
                    Office Contact:{" "}
                    <a href="tel:+919566772325" style={{ color: "inherit", textDecoration: "none" }}>
                      +91 9566772325
                    </a>
                    <br />
                    Email:{" "}
                    <a href="mailto:vpassociatestrl@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>
                      vpassociatestrl@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Block 4: Our Core Areas */}
            <div className="cz-info-block cz-info-core-block">
              <div className="cz-core-title-wrap">
                <FiLayers className="cz-core-icon" />
                <span>OUR CORE AREAS</span>
              </div>
              <div className="cz-core-tags-grid">
                <span className="cz-core-tag">
                  <span className="cz-tag-dot" /> Construction
                </span>
                <span className="cz-core-tag">
                  <span className="cz-tag-dot" /> Workforce
                </span>
                <span className="cz-core-tag">
                  <span className="cz-tag-dot" /> Catering
                </span>
                <span className="cz-core-tag">
                  <span className="cz-tag-dot" /> Sports
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
