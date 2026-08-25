"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "@/components/icons";
import "./Hero.css";

// ─── Counter Component for Phase 3 ───────────────────────────────────
interface CounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  start: boolean;
}

function Counter({ value, decimals = 0, suffix = "", duration = 2.2, start }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing: easeOutExpo (premium decelerating motion)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentValue = startValue + easeProgress * (value - startValue);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [value, duration, start]);

  // Use German locale "de-DE" to format decimals with a comma (e.g., "5,8" instead of "5.8")
  const formatted = count.toLocaleString("de-DE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span>{formatted}{suffix}</span>;
}

const TRUSTED_COMPANIES = [
  { name: "GMMCO Limited (C K Birla Group)", logo: "/images/clients/gmmco.jpg" },
  { name: "BorgWarner Morse Systems India Private Limited", logo: "/images/clients/borgwarner.svg" },
  { name: "Inexo Cast Metal Solutions Private Limited", logo: "/images/clients/inexo.svg" },
  { name: "Resolux India Private Limited", logo: "/images/clients/resolux.svg" },
  { name: "Cavotec India Private Limited", logo: "/images/clients/cavotec.svg" },
  { name: "Titan Engineering & Automation Limited", logo: "/images/clients/titan_teal.svg" },
  { name: "Justech Precision Industry India Pvt Ltd", logo: "/images/clients/justech.svg" },
  { name: "Srivari Colour Coating", logo: "/images/clients/srivari.svg" },
  { name: "Airflow Equipment’s (India) Pvt Ltd", logo: "/images/clients/airflow.svg" },
  { name: "Polyfit Fabricators Pvt Ltd", logo: "/images/clients/polyfit.jpg" },
  { name: "Rexan Steel Tubes", logo: "/images/clients/rexan.svg" },
  { name: "SPACK Automotive Pvt Ltd", logo: "/images/clients/spack_automotive.png" },
];

// ─── Main Hero Component ─────────────────────────────────────────────
export default function Hero() {
  const [phase2Active, setPhase2Active] = useState(false);
  const [countersActive, setCountersActive] = useState(false);
  // Gate: wait for the preloader white screen to exit before starting hero animations.
  // Preloader exits at ~1900ms; we start animating 100ms after that.
  const [animReady, setAnimReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileScreen(window.innerWidth < 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set up scroll progress for subtle parallax on masonry elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax translation mapping (disabled on mobile stacked layout to prevent card collision)
  const yCardA = useTransform(scrollYProgress, [0, 1], [0, isMobileScreen ? 0 : -35]);
  const yCardB = useTransform(scrollYProgress, [0, 1], [0, isMobileScreen ? 0 : -75]);
  const yCardC = useTransform(scrollYProgress, [0, 1], [0, isMobileScreen ? 0 : -20]);
  const yCardD = useTransform(scrollYProgress, [0, 1], [0, isMobileScreen ? 0 : -55]);
  const yPlayBtn = useTransform(scrollYProgress, [0, 1], [0, isMobileScreen ? 0 : -45]);
  const yBadges = useTransform(scrollYProgress, [0, 1], [0, isMobileScreen ? 0 : -90]);

  useEffect(() => {
    // Unlock hero animations after preloader is gone
    const readyTimer = setTimeout(() => setAnimReady(true), 2800);

    // Phase 2 (floating cards & play button) starts 1s after hero animations unlock.
    const phase2Timer = setTimeout(() => {
      setPhase2Active(true);
    }, 3800);

    // Phase 3 (statistics count up) starts 1.7s after unlock.
    const countersTimer = setTimeout(() => {
      setCountersActive(true);
    }, 3700);

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(phase2Timer);
      clearTimeout(countersTimer);
    };
  }, []);

  // ─── Framer Motion Animation Settings ──────────────────────────────

  // Phase 1: 4 Major Cards Animation (fade, scale 0.85 -> 1, slight upward y, spring)
  const cardVariants: any = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 30,
    },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: index * 0.18, // staggered reveal
      },
    }),
  };

  // Phase 2: Floating UI Elements Animation (pop scale/opacity with clean smooth reveal)
  const floatingVariants: any = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      y: 20,
    },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.15, // staggered reveal
      },
    }),
  };

  // CTA Button Animation Dot -> Button Horizontal Expand
  const ctaButtonVariants: any = {
    initial: {
      width: 52,
      borderRadius: 26,
      opacity: 0,
      y: 30,
    },
    animate: (custom: { delay: number; finalWidth: number }) => ({
      opacity: 1,
      y: 0,
      width: custom.finalWidth,
      borderRadius: 9999,
      transition: {
        opacity: { duration: 0.5, ease: "easeOut", delay: custom.delay },
        y: { duration: 0.5, ease: "easeOut", delay: custom.delay },
        width: {
          type: "spring",
          stiffness: 90,
          damping: 14,
          delay: custom.delay + 0.6, // expands after dot lands
        },
      },
    }),
  };

  const textVariants: any = {
    initial: { opacity: 0 },
    animate: (custom: { delay: number }) => ({
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: custom.delay + 0.95, // fades in after horizontal expansion completes
      },
    }),
  };

  const iconVariants: any = {
    initial: { opacity: 0, x: -8 },
    animate: (custom: { delay: number }) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: custom.delay + 1.15, // slides in last
      },
    }),
  };

  // Premium fade-in-up variants for Hero typography
  const fadeUpVariants: any = {
    hidden: {
      opacity: 0,
      y: 15
    },
    visible: (custom: { delay: number }) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // ultra-smooth cubic-bezier easeOut
        delay: custom.delay,
      },
    }),
  };

  // Line reveal for cinematic text mask animation
  const headingLineVariants: any = {
    hidden: { y: "110%", opacity: 0 },
    visible: (delay: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1],
        delay,
      },
    }),
  };

  // Simple fade-in variants for trusted-by logos
  const fadeInVariants: any = {
    hidden: { opacity: 0 },
    visible: (custom: { delay: number }) => ({
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: custom.delay,
      },
    }),
  };

  // Infinite floating drift loops for elements
  const floatDriftVariants: any = {
    animate: (custom: number) => ({
      y: [0, -7, 0],
      transition: {
        duration: 4.5 + custom * 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <section ref={containerRef} className="hero-premium-section" aria-label="Hero Section">
      <div className="hero-premium-container">

        {/* ─── Left Side: Content & Action ───────────────────────── */}
        <div className="hero-left-content">
          <motion.div
            className="hero-badge-pill"
            custom={{ delay: 0.15 }}
            variants={fadeUpVariants}
            initial="hidden"
            animate={animReady ? "visible" : "hidden"}
          >
            VP ASSOCIATES
          </motion.div>

          <h1 className="hero-premium-headline">
            <motion.span
              style={{ display: "block" }}
              custom={0.3}
              variants={fadeUpVariants}
              initial="hidden"
              animate={animReady ? "visible" : "hidden"}
            >
              Reliable Engineering, Premium Catering &{" "}
              <span className="highlight">Premier Sports Grounds.</span>
            </motion.span>
          </h1>

          <motion.p
            className="hero-premium-paragraph"
            custom={{ delay: 0.55 }}
            variants={fadeUpVariants}
            initial="hidden"
            animate={animReady ? "visible" : "hidden"}
          >
            VP Associates offers dependable civil construction, professional manpower supply, tailored event catering, and well-maintained cricket grounds for matches across Chennai.
          </motion.p>



          {/* Trusted Clients Marquee */}
          <motion.div
            className="hero-trusted-by"
            custom={{ delay: 0.95 }}
            variants={fadeInVariants}
            initial="hidden"
            animate={animReady ? "visible" : "hidden"}
          >
            <div className="trusted-label">Trusted by</div>
            <div className="hero-trusted-marquee-wrap">
              <div className="hero-trusted-marquee-track">
                {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((company, idx) => (
                  <div key={`${company.name}-${idx}`} className="hero-trusted-marquee-item">
                    <img src={company.logo} alt={company.name} className="hero-trusted-logo-img" />
                    <span className="hero-trusted-company-name">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Right Side: Masonry Collage ─── */}
        <div className="hero-right-masonry">

          {/* Card A: Top-Left Orange Stat Card (124K+) */}
          <motion.div
            className="masonry-card card-stat-orange"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={animReady ? "visible" : "hidden"}
            style={{ y: yCardA }}
          >
            <motion.div
              className="orange-card-content-wrapper"
              whileHover={{ scale: 1.025, x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="avatars-group">
                <div className="avatar-face" style={{ backgroundColor: "#ffffff", overflow: "hidden", padding: "2px" }}>
                  <img src="/images/clients/gmmco.jpg" alt="GMMCO Limited" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }} />
                </div>
                <div className="avatar-face" style={{ backgroundColor: "#ffffff", overflow: "hidden", padding: "2px" }}>
                  <img src="/images/clients/spack_automotive.png" alt="Spack Automotive" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }} />
                </div>
                <div className="avatar-face" style={{ backgroundColor: "#ffffff", overflow: "hidden", padding: "2px" }}>
                  <img src="/images/clients/polyfit.jpg" alt="Polyfit Fabricators" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }} />
                </div>
              </div>
              <div className="stat-number">
                <Counter value={124} suffix="K+" start={countersActive} />
              </div>
              <div className="stat-label">
                More than 2,000<br />people has joined us
              </div>
            </motion.div>
          </motion.div>

          {/* Card B: Top-Right Portrait Image */}
          <motion.div
            className="masonry-card card-girl-portrait"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={animReady ? "visible" : "hidden"}
            style={{ y: yCardB }}
          >
            <motion.img
              src="/images/construction/engineer-hero.png"
              alt="VP Associates Civil Construction & Engineering"
              loading="eager"
              fetchPriority="high"
              width={320}
              height={380}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          {/* Card D: Bottom-Left Orange Growth Card */}
          <motion.div
            className="masonry-card card-growth-chart"
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate={animReady ? "visible" : "hidden"}
            style={{ y: yCardD }}
          >
            <motion.div
              className="growth-content-wrapper"
              whileHover={{ scale: 1.025, x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="chart-label">Successful<br />growth</div>
              <div className="chart-svg-wrap">
                <svg viewBox="0 0 100 50" width="100%" height="100%">
                  <rect x="45" y="32" width="8" height="13" rx="3" fill="white" opacity="0.35" />
                  <rect x="58" y="22" width="8" height="23" rx="3" fill="white" opacity="0.6" />
                  <rect x="71" y="12" width="8" height="33" rx="3" fill="white" opacity="0.95" />
                  <path
                    d="M 32,40 L 82,12"
                    fill="none"
                    stroke="white"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 70,12 L 82,12 L 82,24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray=""
                  />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* Card C: Bottom Wide Team Image */}
          <motion.div
            className="masonry-card card-team-collaborating"
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate={animReady ? "visible" : "hidden"}
            style={{ y: yCardC }}
          >
            <motion.img
              src="/images/sport/cricket-ground-hero-exact.jpg"
              alt="VP Associates Professional Cricket Ground"
              loading="eager"
              fetchPriority="high"
              width={480}
              height={260}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          {/* ─── Phase 2: Floating Elements ─── */}

          {/* Play Button - Centered exactly on the intersection */}
          <motion.div
            className="floating-play-button"
            custom={0}
            variants={floatingVariants}
            initial="hidden"
            animate={phase2Active ? "visible" : "hidden"}
            style={{ y: yPlayBtn }}
          >
            <div className="play-btn-circle">
              <svg width="12" height="14" viewBox="0 0 14 16" fill="none">
                <path d="M13 8L1 15V1L13 8Z" fill="currentColor" />
              </svg>
            </div>

            <svg className="rotating-text-svg" viewBox="0 0 100 100">
              <path
                id="circlePath"
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                fill="transparent"
              />
              <text fill="#ffffff" fontSize="6.8" fontWeight="600" letterSpacing="1.1">
                <textPath href="#circlePath" startOffset="0%">
                  • WATCH VIDEO OF OUR ACTION • WATCH VIDEO OF OUR ACTION
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Three Blue Statistic Cards */}
          <motion.div className="badges-column" style={{ y: yBadges }}>
            {/* Badge 1: Satisfied Rate */}
            <motion.div
              className="floating-badge"
              custom={1}
              variants={floatingVariants}
              initial="hidden"
              animate={phase2Active ? "visible" : "hidden"}
            >
              <motion.div
                className="floating-badge-inner"
                variants={floatDriftVariants}
                animate="animate"
                custom={1}
                whileHover={{ scale: 1.04, x: 5 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
              >
                <span className="badge-label">satisfied rate</span>
                <span className="badge-value">
                  <Counter value={98} suffix="%" start={countersActive} />
                </span>
              </motion.div>
            </motion.div>

            {/* Badge 2: Successful Projects */}
            <motion.div
              className="floating-badge"
              custom={2}
              variants={floatingVariants}
              initial="hidden"
              animate={phase2Active ? "visible" : "hidden"}
            >
              <motion.div
                className="floating-badge-inner"
                variants={floatDriftVariants}
                animate="animate"
                custom={2}
                whileHover={{ scale: 1.04, x: 5 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
              >
                <span className="badge-label">successful projects</span>
                <span className="badge-value">
                  <Counter value={14} suffix="K" start={countersActive} />
                </span>
              </motion.div>
            </motion.div>

            {/* Badge 3: Clients Served */}
            <motion.div
              className="floating-badge"
              custom={3}
              variants={floatingVariants}
              initial="hidden"
              animate={phase2Active ? "visible" : "hidden"}
            >
              <motion.div
                className="floating-badge-inner"
                variants={floatDriftVariants}
                animate="animate"
                custom={3}
                whileHover={{ scale: 1.04, x: 5 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
              >
                <span className="badge-label">clients served</span>
                <span className="badge-value">
                  <Counter value={5.8} decimals={1} suffix="K" start={countersActive} />
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


