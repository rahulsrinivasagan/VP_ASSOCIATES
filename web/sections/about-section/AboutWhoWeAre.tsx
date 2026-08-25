"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutWhoWeAre() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation - smooth one-shot reveal
      gsap.fromTo(
        [
          ".vpa-whoweare-title",
          ".vpa-whoweare-paragraph",
          ".vpa-whoweare-stats-card",
          ".vpa-whoweare-stat-col"
        ],
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Count up animation for stat numbers - triggers cleanly on scroll into view
      const stats = gsap.utils.toArray(".vpa-stat-num-val") as HTMLElement[];
      stats.forEach((stat) => {
        const targetVal = parseFloat(stat.getAttribute("data-target") || "0");
        const hasDecimals = stat.getAttribute("data-decimals") === "1";
        const countObj = { val: 0 };
        gsap.to(countObj, {
          val: targetVal,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            if (hasDecimals) {
              stat.innerText = countObj.val.toFixed(1);
            } else {
              stat.innerText = Math.floor(countObj.val).toString();
            }
          },
        });
      });
    }, sectionRef.current);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="vpa-whoweare-section" aria-label="Who We Are">
      {/* CSS Stylesheet Inject */}
      <style dangerouslySetInnerHTML={{ __html: `
        .vpa-whoweare-section {
          background-color: var(--white);
          padding: 100px 0 80px;
          width: 100%;
          box-sizing: border-box;
        }

        .vpa-whoweare-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          box-sizing: border-box;
        }

        .vpa-whoweare-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 70px;
        }

        .vpa-whoweare-title {
          font-family: Georgia, serif;
          font-size: clamp(2.5rem, 4.5vw, 3.5rem);
          font-weight: 400;
          color: var(--black);
          line-height: 1.15;
          margin-bottom: 32px;
          text-align: center;
          opacity: 0;
          transform: translateY(40px);
        }

        .vpa-whoweare-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          align-items: center;
        }

        .vpa-whoweare-paragraph {
          font-family: var(--font-inter), sans-serif;
          font-size: clamp(15px, 1.1vw, 17px);
          line-height: 1.65;
          color: var(--gray-600);
          margin: 0;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
        }

        .vpa-whoweare-paragraph.lead {
          font-size: clamp(17px, 1.25vw, 20px);
          font-weight: 500;
          color: var(--black);
          line-height: 1.6;
          text-align: center;
        }

        .vpa-whoweare-stats-card {
          background-color: #FAF6F0;
          border-radius: 32px;
          padding: 60px 48px;
          width: 100%;
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(50px);
        }

        .vpa-whoweare-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          width: 100%;
          box-sizing: border-box;
        }

        .vpa-whoweare-stat-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
          opacity: 0;
          transform: translateY(20px);
        }

        .vpa-stat-num {
          font-family: Georgia, serif;
          font-size: clamp(2.8rem, 4.5vw, 4.5rem);
          font-weight: 400;
          color: var(--black);
          line-height: 1;
          display: flex;
          align-items: center;
        }

        .vpa-stat-desc {
          font-family: var(--font-inter), sans-serif;
          font-size: clamp(13px, 0.9vw, 15px);
          line-height: 1.5;
          color: var(--gray-600);
          margin: 0;
          max-width: 220px;
        }

        @media (max-width: 1024px) {
          .vpa-whoweare-stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          .vpa-whoweare-stats-card {
            padding: 44px 28px;
          }
          .vpa-stat-num {
            font-size: clamp(2.4rem, 3.8vw, 3.2rem);
          }
        }

        @media (max-width: 768px) {
          .vpa-whoweare-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            margin-bottom: 40px;
          }
          .vpa-whoweare-section {
            padding: 60px 0 50px;
          }
          .vpa-whoweare-stats-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .vpa-whoweare-stats-card {
            padding: 36px 20px;
            border-radius: 20px;
          }
          .vpa-whoweare-stat-col {
            align-items: center;
            text-align: center;
          }
          .vpa-stat-desc {
            max-width: 280px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .vpa-whoweare-stats-card {
            padding: 30px 16px;
            border-radius: 18px;
          }
          .vpa-whoweare-stats-grid {
            gap: 24px;
          }
        }
      ` }} />

      <div className="vpa-whoweare-container">
        {/* Top Section Tag, Heading & Paragraphs */}
        <div className="vpa-whoweare-grid">
          <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ee8132", marginBottom: "12px", display: "block" }}>
            WHO WE ARE
          </span>
          <h2 className="vpa-whoweare-title">A Multi-Disciplinary Partner Built on Trust & Execution</h2>
          <div className="vpa-whoweare-content">
            <p className="vpa-whoweare-paragraph lead">
              At VP Associates, we believe in creating lasting value for our clients and communities across Chennai. What started as a dedicated civil engineering and manpower firm has grown into a multi-sector organization offering turnkey construction, event catering, and sports facility operations.
            </p>
            <p className="vpa-whoweare-paragraph">
              Whether deploying verified labor forces, building structural projects, serving authentic celebratory spreads, or hosting tournament cricket matches, our team delivers uncompromised quality, safety, and reliability in every engagement.
            </p>
          </div>
        </div>

        {/* Bottom Card Layout: Statistics Row (3 Key Metrics) */}
        <div className="vpa-whoweare-stats-card">
          <div className="vpa-whoweare-stats-grid">
            {/* Stat 1 */}
            <div className="vpa-whoweare-stat-col">
              <span className="vpa-stat-num">
                <span className="vpa-stat-num-val" data-target="100">
                  100
                </span>
                <span>+</span>
              </span>
              <p className="vpa-stat-desc">
                Skilled Workforce & Technicians Deployed
              </p>
            </div>

            {/* Stat 2 */}
            <div className="vpa-whoweare-stat-col">
              <span className="vpa-stat-num">
                <span className="vpa-stat-num-val" data-target="98">
                  98
                </span>
                <span>%</span>
              </span>
              <p className="vpa-stat-desc">
                Repeat & Satisfied Clients
              </p>
            </div>

            {/* Stat 3 */}
            <div className="vpa-whoweare-stat-col">
              <span className="vpa-stat-num">
                <span className="vpa-stat-num-val" data-target="50">
                  50
                </span>
                <span>+</span>
              </span>
              <p className="vpa-stat-desc">
                Cricket Tournaments & Match Events
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
