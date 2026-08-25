"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomeServicesSection.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BUSINESS_DIVISIONS = [
  {
    id: "construction",
    href: "/construction",
    img: "/images/services/services_construction.png",
    alt: "Modern construction site with engineers and workers",
    badge: "Infrastructure & Civil",
    title: "Civil Construction & Manpower Supply",
    desc: "End-to-end civil construction of villas, theme houses, apartments and skilled manpower supply for residential and industrial sites.",
    btnText: "Explore Division"
  },
  {
    id: "catering",
    href: "/catering",
    img: "/images/services/services_catering.png",
    alt: "Luxury catering setup with beautifully arranged buffet",
    badge: "Events & Hospitality",
    title: "Premium Event Catering",
    desc: "Hygienic, flavorful, and customizable catering solutions for corporate gatherings, weddings, private parties, and large-scale events.",
    btnText: "Explore Division"
  },
  {
    id: "sports",
    href: "/sport",
    img: "/images/about/cricket.png",
    alt: "Professionally managed cricket turf under lights",
    badge: "Sports Infrastructure",
    title: "Cricket Ground & Match Hosting",
    desc: "Professionally maintained cricket turf, practice nets, and venue hosting for corporate tournaments, weekend leagues, and friendly matches.",
    btnText: "Book Cricket Ground"
  }
];

export default function HomeServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const maxIndex = BUSINESS_DIVISIONS.length - 1;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Touch Swipe handlers for mobile smooth gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const handleServicesScroll = () => {
      if (typeof window === "undefined") return;
      if (window.location.hash === "#services") {
        const doScroll = () => {
          const el = document.getElementById("services");
          if (!el) return;
          const navbarOffset = 80;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const targetY = elementPosition - navbarOffset;

          if (typeof gsap !== "undefined" && (gsap as any).plugins?.scrollTo) {
            (gsap as any).to(window, {
              scrollTo: { y: el, offsetY: navbarOffset },
              duration: 1,
              ease: "power2.out"
            });
          }

          window.scrollTo({
            top: targetY,
            behavior: "smooth"
          });
        };

        doScroll();
        const t1 = setTimeout(doScroll, 300);
        const t2 = setTimeout(doScroll, 800);
        const t3 = setTimeout(doScroll, 1600);
        const t4 = setTimeout(doScroll, 2800);

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
          clearTimeout(t4);
        };
      }
    };

    handleServicesScroll();
    window.addEventListener("hashchange", handleServicesScroll);
    return () => {
      window.removeEventListener("hashchange", handleServicesScroll);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop GSAP (>= 1025px)
    mm.add("(min-width: 1025px)", () => {
      gsap.fromTo(
        [".vpa-services-badge", ".vpa-services-heading", ".vpa-services-desc"],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".vpa-services-header-block",
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );

      gsap.fromTo(
        ".vpa-services-cards-grid-overflow",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".vpa-services-cards-wrapper",
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );

      const darkFeatures = gsap.utils.toArray(".vpa-dark-feature-item") as HTMLElement[];
      darkFeatures.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".vpa-services-dark-block",
              start: "top 80%",
              toggleActions: "play none none none",
            }
          }
        );
      });

      gsap.fromTo(
        ".vpa-services-bottom-images",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".vpa-services-bottom-images",
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
    });

    // Mobile & Tablet GSAP (<= 1024px)
    mm.add("(max-width: 1024px)", () => {
      gsap.fromTo(
        [".vpa-services-badge", ".vpa-services-heading", ".vpa-services-desc"],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".vpa-services-header-block",
            start: "top bottom",
            once: true,
            toggleActions: "play none none none",
          }
        }
      );

      gsap.fromTo(
        ".vpa-services-cards-grid-overflow",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".vpa-services-cards-wrapper",
            start: "top bottom",
            once: true,
            toggleActions: "play none none none",
          }
        }
      );

      const darkFeatures = gsap.utils.toArray(".vpa-dark-feature-item") as HTMLElement[];
      darkFeatures.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              once: true,
              toggleActions: "play none none none",
            }
          }
        );
      });

      gsap.fromTo(
        ".vpa-services-bottom-images",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".vpa-services-bottom-images",
            start: "top bottom",
            once: true,
            toggleActions: "play none none none",
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="vpa-services-section" aria-label="Our Business Divisions">
      <div className="vpa-services-container">

        {/* Part 1: Services Header Block */}
        <div className="vpa-services-header-block">
          <span className="vpa-services-badge">Our Business Divisions</span>
          <h2 className="vpa-services-heading">
            Construction, Catering & Sports Infrastructure — Built to Scale.
          </h2>
          <p className="vpa-services-desc">
            VP Associates operates three core verticals, delivering high-end construction engineering, premium event catering, and professionally managed sports facilities under one unified commitment to quality.
          </p>
        </div>

      </div>

      {/* Part 2: Featured Service Cards (Split Background) */}
      <div className="vpa-services-cards-wrapper">
        <div className="vpa-services-container vpa-cards-relative">

          {/* Navigation Controls */}
          <div className="vpa-services-nav-controls">
            <button
              onClick={handlePrev}
              className="vpa-nav-arrow vpa-nav-prev"
              aria-label="Previous division"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="vpa-nav-arrow vpa-nav-next"
              aria-label="Next division"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Cards Grid Overflow Container with Touch Swipe Support */}
          <div
            className="vpa-services-cards-grid-overflow"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="vpa-services-cards-grid"
              style={{
                "--active-index": activeIndex,
              } as React.CSSProperties}
            >
              {BUSINESS_DIVISIONS.map((card, idx) => (
                <div
                  key={card.id}
                  className={`vpa-service-card ${idx === activeIndex ? "vpa-card-active" : ""}`}
                >
                  {/* Card Image */}
                  <div className="vpa-card-img-wrap">
                    <Image
                      src={card.img}
                      alt={card.alt}
                      width={600}
                      height={400}
                      className="vpa-card-img"
                    />
                    <span className="vpa-card-badge-pill">{card.badge}</span>
                  </div>

                  {/* Card Body Content */}
                  <div className="vpa-card-body">
                    <h3 className="vpa-card-title">{card.title}</h3>
                    <p className="vpa-card-desc">{card.desc}</p>
                    <Link href={card.href} className="vpa-card-link">
                      <span>{card.btnText || "Explore Division"}</span>
                      <span className="vpa-card-arrow">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Part 3: Dark Green Background - Feature Pillars & Visual Showcase */}
      <div className="vpa-services-dark-block">
        <div className="vpa-services-container">
          
          {/* Feature Pillars Grid */}
          <div className="vpa-dark-features-grid">
            <div className="vpa-dark-feature-item">
              <div className="vpa-feature-icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="vpa-feature-title">Guaranteed Quality</h4>
              <p className="vpa-feature-desc">
                Every project is completed with careful planning, professional management and timely delivery.
              </p>
            </div>

            <div className="vpa-dark-feature-item">
              <div className="vpa-feature-icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h4 className="vpa-feature-title">Experienced Team</h4>
              <p className="vpa-feature-desc">
                Our skilled professionals deliver construction, catering and sports facility services with industry expertise.
              </p>
            </div>

            <div className="vpa-dark-feature-item">
              <div className="vpa-feature-icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </div>
              <h4 className="vpa-feature-title">Transparent Process</h4>
              <p className="vpa-feature-desc">
                Clear communication, honest pricing and complete customer satisfaction from start to finish.
              </p>
            </div>
          </div>

          {/* Bottom Showcase Portrait Images */}
          <div className="vpa-services-bottom-images">
            <div className="vpa-bottom-img-card">
              <Image
                src="/images/services/services_catering_serve.png"
                alt="Professional catering team serving guests at an elegant event"
                width={560}
                height={700}
                className="vpa-bottom-img"
              />
              <div className="vpa-bottom-img-overlay">
                <span className="vpa-overlay-tag">Hospitality Standard</span>
                <h5 className="vpa-overlay-title">Premium Catering Events</h5>
              </div>
            </div>
            <div className="vpa-bottom-img-card">
              <Image
                src="/images/services/services_engineer_inspect.png"
                alt="Construction engineer inspecting a commercial project"
                width={560}
                height={700}
                className="vpa-bottom-img"
              />
              <div className="vpa-bottom-img-overlay">
                <span className="vpa-overlay-tag">Quality Assurance</span>
                <h5 className="vpa-overlay-title">Site Engineering & Inspection</h5>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
