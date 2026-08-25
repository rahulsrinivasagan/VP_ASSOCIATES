"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutFloatingPills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx: any = null;
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(
          {
            isDesktop: "(min-width: 992px)",
            isTablet: "(min-width: 768px) and (max-width: 991px)",
            isMobile: "(max-width: 767px)",
          },
          (context) => {
            const { isDesktop, isTablet } = context.conditions as {
              isDesktop: boolean;
              isTablet: boolean;
            };

            const flyOffset = isDesktop ? 120 : isTablet ? 80 : 40;

            // Set rotation angles
            // >>> MANUALLY ADJUST THESE NUMBERS TO CHANGE PILL ANGLES <<<
            gsap.set(pillRefs.current[0], { rotation: 18 });  // Brown  "Compassion"  (top-left) — slants down-right
            gsap.set(pillRefs.current[1], { rotation: -18 }); // Green  "Connection"  (top-right) — slants down-left
            gsap.set(pillRefs.current[2], { rotation: -18 }); // Blue   "Connection"  (bottom-left) — slants up-right
            gsap.set(pillRefs.current[3], { rotation: 14 });  // Coral  "Empowerment" (bottom-right)

            // Create a timeline that pins the section and runs all 4 animations at once
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=800", // Pinned for 800px of scrolling
                pin: true,
                scrub: 1.5,
                invalidateOnRefresh: true,
              }
            });

            // Pill 0 — top-left: fly in from top-left
            tl.fromTo(pillRefs.current[0],
              { opacity: 0, scale: 0.85, x: -flyOffset, y: -flyOffset },
              { opacity: 1, scale: 1, x: 0, y: 0, ease: "power1.out" },
              0
            );

            // Pill 1 — top-right: fly in from top-right
            tl.fromTo(pillRefs.current[1],
              { opacity: 0, scale: 0.85, x: flyOffset, y: -flyOffset },
              { opacity: 1, scale: 1, x: 0, y: 0, ease: "power1.out" },
              0
            );

            // Pill 2 — bottom-left: fly in from bottom-left
            tl.fromTo(pillRefs.current[2],
              { opacity: 0, scale: 0.85, x: -flyOffset, y: flyOffset },
              { opacity: 1, scale: 1, x: 0, y: 0, ease: "power1.out" },
              0
            );

            // Pill 3 — bottom-right: fly in from bottom-right
            tl.fromTo(pillRefs.current[3],
              { opacity: 0, scale: 0.85, x: flyOffset, y: flyOffset },
              { opacity: 1, scale: 1, x: 0, y: 0, ease: "power1.out" },
              0
            );
          }
        );
      }, containerRef.current);

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="afp-section" aria-label="Our Core Values">
      <style dangerouslySetInnerHTML={{
        __html: `

        /* ── Section shell ── */
        .afp-section {
          background-color: #F0EBE1;
          border-top: 1px solid rgba(0,0,0,0.07);
          border-bottom: 1px solid rgba(0,0,0,0.07);
          min-height: clamp(480px, 65vh, 620px);
          padding: 60px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          box-sizing: border-box;
          /* Allow pills to bleed outside the section boundaries */
          overflow: visible;
        }

        /* ── Page-level centering container ── */
        .afp-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          box-sizing: border-box;
        }

        /*
          ── Content wrapper ──
          This div is the SOLE positioning parent for all four pills.
          Its width is tuned to match the actual rendered heading width
          so that pills at negative left/right values sit visually outside
          the text block — matching the reference screenshot.

          Reference screenshot: heading block ≈ 560px wide at ~1020px viewport.
          At 1200px viewport with 96px total padding → content = 1104px.
          Heading at clamp(1.3rem,2.4vw,1.9rem)/line-height 1.55 wraps at ~600px.
          → max-width: 600px keeps pills anchored to text edges.
        */
        .afp-wrapper {
          position: relative;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        /* ── Heading ── */
        .afp-title {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.3rem, 2.4vw, 1.9rem);
          font-weight: 400;
          line-height: 1.55;
          color: #1a1a1a;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          letter-spacing: -0.02em;
        }

        /* ── Inline avatar ── */
        .afp-avatar-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          vertical-align: middle;
          width: 58px;
          height: 1em;
          position: relative;
          margin: 0 5px;
        }
        .afp-avatar {
          width: 58px;
          height: 58px;
          border-radius: 10px;
          display: block;
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          background: #fff;
          object-fit: contain;
          padding: 3px;
        }

        /* ── Pill outer wrapper (GSAP target) ── */
        .afp-pill-wrap {
          position: absolute;
          z-index: 10;
          pointer-events: none;
          transform-origin: center center;
          opacity: 0; /* revealed by GSAP on scroll */
        }

        /* ── Pill inner (visual pill) ── */
        .afp-pill {
          border: none;
          padding: 9px 22px;
          border-radius: 9999px;
          font-family: var(--font-inter), -apple-system, sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #fff;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        /* ── Pill colours ── */
        .afp-brown { background-color: #8D5A47; }
        .afp-green { background-color: #87926D; }
        .afp-blue  { background-color: #739BD3; }
        .afp-coral { background-color: #DF9482; }

        /* ── Idle float keyframe ── */
        @keyframes afp-float {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-7px); }
        }
        .afp-pill-tl .afp-pill { animation: afp-float 3.8s ease-in-out infinite alternate 0.0s; }
        .afp-pill-tr .afp-pill { animation: afp-float 4.2s ease-in-out infinite alternate 0.6s; }
        .afp-pill-bl .afp-pill { animation: afp-float 4.0s ease-in-out infinite alternate 1.1s; }
        .afp-pill-br .afp-pill { animation: afp-float 3.6s ease-in-out infinite alternate 1.7s; }

        /*
          ── Desktop pill positions — pixel-measured from reference image ──
          Reference viewport ≈ 1022px.
          Container: max-width 1200px, padding 0 48px → at 1022px width = 926px → starts x=48.
          Wrapper: max-width 600px centered → left edge = 48+(926-600)/2 = 211px, right = 811px.
          Heading top ≈ y=100px from image top.

          Brown  left≈75,  top≈60  → CSS: left= 75-211=-136px, top= 60-100=-40px
          Green  right≈950, top≈80 → CSS: right=-(950-811)=-139px, top= 80-100=-20px
          Blue   left≈150, top≈175 → CSS: left=150-211=-61px,  top=175-100=75px
          Coral  right≈880, top≈185→ CSS: right=-(880-811)=-69px, top=185-100=85px
        */
        /* After ±18° rotation the pill's horizontal extent grows by ~12px on each side.
           Push each pill out by that extra amount to maintain a clear visual gap from text. */
        .afp-pill-tl { left: -150px; top: -40px; }   /* Brown  — upper-left  */
        .afp-pill-tr { right: -155px; top: -20px; }  /* Green  — upper-right */
        .afp-pill-bl { left: -55px;  top: 128px; }  /* Blue — right edge aligns with "f" in "professional", vertically nudged down further */
        .afp-pill-br { right: -35px; top: 110px; }  /* Coral  — matches blue pill's height and horizontal inset */

        /* ── Tablet (768–991px) ── */
        @media (max-width: 991px) {
          .afp-section    { min-height: clamp(440px, 60vh, 580px); padding: 48px 0; }
          .afp-container  { padding: 0 32px; }
          .afp-wrapper    { max-width: 460px; }
          .afp-title      { max-width: 460px; font-size: clamp(1.1rem, 2.2vw, 1.5rem); }
          .afp-pill       { padding: 7px 16px; font-size: 12px; }
          .afp-avatar     { width: 46px; height: 46px; }
          .afp-avatar-wrap{ width: 46px; }
          /* Tablet: same ratio adjustment */
          .afp-pill-tl    { left: -116px; top: -30px; }
          .afp-pill-tr    { right: -119px; top: -15px; }
          .afp-pill-bl    { left: -88px;  top: 58px;  }
          .afp-pill-br    { right: -88px; top: 65px;  }
        }

        /* ── Mobile (≤ 767px) ── */
        @media (max-width: 767px) {
          .afp-section    { min-height: clamp(400px, 50vh, 520px); padding: 40px 0; }
          .afp-container  { padding: 0 20px; }
          .afp-wrapper    { max-width: 300px; }
          .afp-title      { max-width: 300px; font-size: 1.05rem; line-height: 1.5; }
          .afp-pill       { padding: 6px 14px; font-size: 11px; }
          .afp-avatar     { width: 38px; height: 38px; }
          .afp-avatar-wrap{ width: 38px; }
          /* Mobile: push proportionally further */
          .afp-pill-tl    { left: -75px;  top: -20px; }
          .afp-pill-tr    { right: -78px; top: -10px; }
          .afp-pill-bl    { left: -57px;  top: 38px;  }
          .afp-pill-br    { right: -57px; top: 42px;  }
        }

      ` }} />

      <div className="afp-container">
        <div className="afp-wrapper">

          {/* Brown "Workforce" — top-left */}
          <div ref={(el) => { pillRefs.current[0] = el; }} className="afp-pill-wrap afp-pill-tl">
            <div className="afp-pill afp-brown">Workforce</div>
          </div>

          {/* Green "Catering" — top-right */}
          <div ref={(el) => { pillRefs.current[1] = el; }} className="afp-pill-wrap afp-pill-tr">
            <div className="afp-pill afp-green">Catering</div>
          </div>

          {/* Blue "Engineering" — bottom-left */}
          <div ref={(el) => { pillRefs.current[2] = el; }} className="afp-pill-wrap afp-pill-bl">
            <div className="afp-pill afp-blue">Engineering</div>
          </div>

          {/* Coral "Construction" — bottom-right */}
          <div ref={(el) => { pillRefs.current[3] = el; }} className="afp-pill-wrap afp-pill-br">
            <div className="afp-pill afp-coral">Construction</div>
          </div>

          {/* Heading */}
          <h2 className="afp-title">
            At VP Associates,
            <span className="afp-avatar-wrap">
              <img
                className="afp-avatar"
                src="/images/about/engineer_avatar.png"
                alt="VP Associates engineer illustration"
              />
            </span>
            approach is more than professional — it's deeply collaborative. Our core sectors shape every build.
          </h2>

        </div>
      </div>
    </section>
  );
}
