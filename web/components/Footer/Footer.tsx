"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const pathname = usePathname();

  const footerRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  // Unified entrance animation setup for the shared Global Footer across ALL pages
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let rafId: number;
    let ctx: ReturnType<typeof gsap.context> | null = null;
    let played = false;
    let io: IntersectionObserver | null = null;

    // Directly run the footer entrance animation (used by both GSAP and IO fallback)
    const runAnimation = () => {
      if (played || !footerRef.current) return;
      played = true;

      const leftItems = Array.from(
        footerRef.current.querySelectorAll(".footer-left > *")
      );
      const rightItems = Array.from(
        footerRef.current.querySelectorAll(".footer-right > *")
      );
      const footerItems = [...leftItems, ...rightItems];

      const tl = gsap.timeline();

      if (footerItems.length > 0) {
        tl.fromTo(
          footerItems,
          { x: 75, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 0.95,
            ease: "power3.out",
            willChange: "transform, opacity",
          },
          0
        );
      }

      if (watermarkRef.current) {
        tl.fromTo(
          watermarkRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: "power3.out",
            willChange: "transform, opacity",
          },
          0.2
        );
      }
    };

    const buildAnimation = () => {
      ctx?.revert();
      played = false;
      io?.disconnect();

      if (!footerRef.current) return;

      // ── GSAP ScrollTrigger approach ──────────────────────────────────────
      ctx = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
            refreshPriority: -10,
            onEnter: () => runAnimation(),
          },
        });
      }, footerRef);

      // ── IntersectionObserver FALLBACK ────────────────────────────────────
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && !played) {
            runAnimation();
          }
        },
        { threshold: 0.05 }
      );
      io.observe(footerRef.current);
    };

    rafId = requestAnimationFrame(() => {
      buildAnimation();

      [50, 200, 500, 1000, 1500, 3000, 5000].forEach((delay) => {
        timers.push(
          setTimeout(() => {
            ScrollTrigger.refresh(true);
          }, delay)
        );
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
      io?.disconnect();
      ctx?.revert();
    };
  }, [pathname]);

  return (
    <footer className="footer" aria-label="Site Footer" ref={footerRef}>
      <div className="container">
        {/* ── Main footer content ── */}
        <div className="footer-main">
          {/* Left side - Contact info */}
          <div className="footer-left">
            <h2 className="footer-heading">Let&apos;s work together</h2>
            <p className="footer-sub">
              Have a project in mind? Let&apos;s create something amazing together.
            </p>
            <a href="mailto:vpassociatestrl@gmail.com" className="footer-email">
              vpassociatestrl@gmail.com
            </a>
            
            {/* Social links */}
            <div className="footer-social">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Dribbble</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>

          {/* Right side - Navigation */}
          <div className="footer-right">
            <div className="footer-nav">
              <h3 className="footer-nav-title">Menu</h3>
              <ul className="footer-nav-links">
                <li><a href="/" className="footer-nav-link">Home</a></li>
                <li><a href="/#services" className="footer-nav-link">Services</a></li>
                <li><a href="/construction" className="footer-nav-link">Construction</a></li>
                <li><a href="/catering" className="footer-nav-link">Catering</a></li>
                <li><a href="/sport" className="footer-nav-link">Sports</a></li>
                <li><a href="/about" className="footer-nav-link">About</a></li>
              </ul>
            </div>

            <div className="footer-legal">
              <h3 className="footer-nav-title">Legal</h3>
              <ul className="footer-nav-links">
                <li><a href="#" className="footer-nav-link">Terms of Service</a></li>
                <li><a href="#" className="footer-nav-link">Privacy Policy</a></li>
              </ul>
            </div>

            {/* ── Luxury Map Preview ── */}
            <div className="footer-map-card">
              <h3 className="footer-map-title">Find Us</h3>
              <a
                href="https://maps.google.com/?q=No:+850,+Perumal+Koil+Street,+Murukkanjery+Village,+Aranvoyal+Post,+Tiruvallur+Taluk+and+District,+602025"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-map-frame"
                aria-label="Open VP Associates location in Google Maps"
              >
                <iframe
                  src="https://maps.google.com/maps?q=No:+850,+Perumal+Koil+Street,+Murukkanjery+Village,+Aranvoyal+Post,+Tiruvallur+Taluk+and+District,+602025&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  title="VP Associates location — No: 850, Perumal Koil Street, Murukkanjery Village, Aranvoyal Post, Tiruvallur Taluk and District, 602025"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                {/* Orange location pin */}
                <div className="footer-map-pin">
                  <div className="footer-map-pin-dot" />
                  <div className="footer-map-pin-shadow" />
                </div>
                {/* Bottom-left label */}
                <div className="footer-map-label">
                  <span className="footer-map-label-name">VP Associates</span>
                  <span className="footer-map-label-loc">Murukkanjery, Tiruvallur – 602025</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 VP Associates. All rights reserved.
          </p>
        </div>

        {/* Single-line centered background watermark */}
        <div className="footer-bg-text" ref={watermarkRef}>VP ASSOCIATES</div>
      </div>
    </footer>
  );
}

