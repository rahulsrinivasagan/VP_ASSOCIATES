"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import "./HomeWhyChooseUsSection.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROFESSIONS = [
  "Construction Engineers & Builders",
  "Culinary & Catering Masters",
  "Cricket Turf Specialists",
  "Trusted Service Professionals",
];

const CARDS_DATA = [
  {
    id: 1,
    title: "Skilled Manpower & Expertise",
    description: "Trained workforce for construction efficiency and seamless project timelines.",
    img: "/images/why-choose-us/wcu_construction.png",
    alt: "Professional construction engineer discussing a project on-site",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Hygienic & Authentic Catering",
    description: "Fresh ingredients, custom menus, and top-tier service standards for any headcount.",
    img: "/images/why-choose-us/wcu_catering.png",
    alt: "Luxury catering staff presenting food at an event",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Professional Sports Grounds",
    description: "High-quality pitches, night lights, and facilities built for competitive play.",
    img: "/images/why-choose-us/wcu_cricket.png",
    alt: "Modern cricket turf with players practicing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" height="18" width="18" y="3" rx="2" ry="2" />
        <line x1="9" y1="21" x2="9" y2="9" />
        <line x1="3" y1="9" x2="21" y2="9" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Transparent Pricing",
    description: "Clear proposals and honest communication without hidden fees.",
    img: "/images/why-choose-us/wcu_satisfaction.png",
    alt: "Happy client meeting with a project manager",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

interface HomeWhyChooseUsSectionProps {
  showActions?: boolean;
}

export default function HomeWhyChooseUsSection({
  showActions = true,
}: HomeWhyChooseUsSectionProps) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const [professionIndex, setProfessionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProfessionIndex((prev) => (prev + 1) % PROFESSIONS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop GSAP (>= 1025px)
    mm.add("(min-width: 1025px)", () => {
      gsap.set(".vpa-wcu-left-col", { y: 100, opacity: 0 });
      gsap.set(".vpa-wcu-card.card-0", { y: 100, opacity: 0 });
      gsap.set([".vpa-wcu-card.card-1", ".vpa-wcu-card.card-2", ".vpa-wcu-card.card-3"], {
        y: "100vh",
        opacity: 1,
      });

      gsap.to([".vpa-wcu-left-col", ".vpa-wcu-card.card-0"], {
        y: 0,
        opacity: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top top",
          scrub: 1,
        },
      });

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });

      pinTl.to(".vpa-wcu-card.card-1", { y: 0, ease: "none" });
      pinTl.to(".vpa-wcu-card.card-2", { y: 0, ease: "none" });
      pinTl.to(".vpa-wcu-card.card-3", { y: 0, ease: "none" });
    });

    // Mobile & Tablet GSAP (<= 1024px)
    mm.add("(max-width: 1024px)", () => {
      gsap.fromTo(
        ".vpa-wcu-left-col",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".vpa-wcu-left-col",
            start: "top bottom",
            once: true,
            toggleActions: "play none none none",
          },
        }
      );

      const cards = gsap.utils.toArray(".vpa-wcu-card") as HTMLElement[];
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
    <section ref={sectionRef} className="vpa-wcu-section" aria-label="Why Choose VP Associates">
      <div className="vpa-wcu-container">

        {/* Left Column (Info & Action) */}
        <div className="vpa-wcu-left-col">
          {/* 1. Badge */}
          <span className="vpa-wcu-badge">Why Choose Us</span>

          {/* 2. Main Heading */}
          <h2 className="vpa-wcu-heading">
            Delivering Excellence Across Every Business We Operate.
          </h2>

          {/* 3. Description Paragraph */}
          <p className="vpa-wcu-desc">
            From construction and catering to professionally managed cricket facilities, VP Associates delivers quality, reliability, and customer-focused service in everything we do.
          </p>

          {showActions && (
            <>
              {/* 4. Animated Profession Text */}
              <div className="vpa-wcu-profession-wrap">
                <span className="vpa-wcu-profession-dot" />
                <div className="vpa-wcu-profession-box">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={professionIndex}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="vpa-wcu-profession-text"
                    >
                      {PROFESSIONS[professionIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* 5. CTA Button */}
              <div className="vpa-wcu-action">
                <a
                  href="/#services"
                  className="vpa-wcu-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("services");
                    if (el) {
                      const navbarOffset = 80;
                      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                      window.scrollTo({
                        top: elementPosition - navbarOffset,
                        behavior: "smooth",
                      });
                      window.history.pushState(null, "", "/#services");
                    } else {
                      router.push("/#services");
                    }
                  }}
                >
                  <span>Explore Our Services</span>
                  <span className="vpa-wcu-btn-arrow">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>
            </>
          )}
        </div>

        {/* Right Column (Feature Cards Content) */}
        <div className="vpa-wcu-right-col">
          <div className="vpa-wcu-cards-stack">
            {CARDS_DATA.map((card, idx) => (
              <div key={card.id} className={`vpa-wcu-card card-${idx}`}>

                {/* Icon Container */}
                <div className="vpa-wcu-card-icon-wrap">
                  {card.icon}
                </div>

                {/* Card Title */}
                <h3 className="vpa-wcu-card-title">{card.title}</h3>

                {/* Card Description */}
                <p className="vpa-wcu-card-desc">{card.description}</p>

                {/* Rounded Card Image */}
                <div className="vpa-wcu-card-img-wrap">
                  <Image
                    src={card.img}
                    alt={card.alt}
                    width={600}
                    height={400}
                    className="vpa-wcu-card-img"
                    priority={idx === 0}
                  />
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}


