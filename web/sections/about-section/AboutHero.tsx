"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  colorCls,
}: {
  value: string;
  label: string;
  colorCls: string;
}) {
  return (
    <div className="vph-stat">
      <span className={`vph-stat-val ${colorCls}`}>{value}</span>
      <span className="vph-stat-lbl">{label}</span>
    </div>
  );
}

function ConnectLine({
  isInView,
  delay,
  alignRight,
}: {
  isInView: boolean;
  delay: number;
  alignRight?: boolean;
}) {
  return (
    <div
      className="vph-connector"
      style={{ alignSelf: alignRight ? "flex-end" : "flex-start" }}
    >
      <svg width="20" height="72" viewBox="0 0 20 72" fill="none">
        {/* dashed vertical line */}
        <motion.path
          d="M10 8 L10 64"
          stroke="#CCCAC4"
          strokeWidth="1.5"
          strokeDasharray="4.5 5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.1, ease: "easeOut", delay }}
        />
        {/* top node */}
        <motion.circle
          cx="10"
          cy="6"
          r="4"
          fill="#ee8132"
          opacity="0.75"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.75 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.1 }}
        />
        {/* mid node */}
        <motion.circle
          cx="10"
          cy="36"
          r="2.5"
          fill="#CCCAC4"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.5 }}
        />
        {/* bottom node */}
        <motion.circle
          cx="10"
          cy="66"
          r="4"
          fill="#ee8132"
          opacity="0.75"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.75 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.9 }}
        />
      </svg>
    </div>
  );
}

function CatItem({
  title,
  sub,
  icon,
}: {
  title: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="vph-cat-item">
      <div className="vph-cat-icon">{icon}</div>
      <div>
        <div className="vph-cat-name">{title}</div>
        <div className="vph-cat-sub">{sub}</div>
      </div>
    </div>
  );
}

// ─── SVG Icons ─────────────────────────────────────────────────────────────────

const IconConstruction = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ee8132" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="9" width="18" height="12" rx="2" />
    <path d="M9 22V12h6v10" />
    <path d="M3 9l9-7 9 7" />
  </svg>
);

const IconSports = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ee8132" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconCatering = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ee8132" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const IconServices = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ee8132" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
);

// ─── Main Component ────────────────────────────────────────────────────────────

export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  return (
    <section
      ref={ref}
      className="vph-section"
      aria-label="About VP Associates"
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ══════════════════════════════════════════════════════════════════
          OUTER ROUNDED FRAME — the "single window" effect
      ══════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="vph-frame"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Atmospheric background glows */}
        <div className="vph-glow vph-glow-l" aria-hidden />
        <div className="vph-glow vph-glow-r" aria-hidden />

        {/* ──────────────────────────────────────────────
            UPPER HERO ZONE — copy + floating side elements
        ────────────────────────────────────────────── */}
        <div className="vph-upper">

          {/* ════════════════════════════════════════════
              LEFT COLUMN: circles + stats + connecting line
          ════════════════════════════════════════════ */}
          <div className="vph-side vph-side-l">
            {/* Row 1: Circle + Stat (7+ Years Of Experience) */}
            <motion.div
              className="vph-float-row"
              initial={{ opacity: 0, x: -28 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.92 }}
            >
              <div className="vph-circ vph-circ-lg">
                <Image
                  src="/images/construction/engineer-hero.png"
                  alt="Construction specialist"
                  fill
                  priority
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                  sizes="92px"
                />
              </div>
              <StatCard value="7+" label="Years Of Experience" colorCls="vc-orange" />
            </motion.div>

            {/* Connecting line */}
            <ConnectLine isInView={isInView} delay={1.05} />

            {/* Row 2: Circle + Stat (3 Core Verticals - Construction, Catering, Sports) */}
            <motion.div
              className="vph-float-row"
              initial={{ opacity: 0, x: -28 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 1.12 }}
            >
              <div className="vph-circ vph-circ-sm">
                <Image
                  src="/images/about/catering.png"
                  alt="Catering services"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  sizes="74px"
                />
              </div>
              <StatCard value="3" label="Core Verticals (Construction, Catering, Sports)" colorCls="vc-green" />
            </motion.div>
          </div>

          {/* ──────────────────────────────────────────────
              CENTERED COPY BLOCK
          ────────────────────────────────────────────── */}
          <div className="vph-copy">
            <motion.div
              className="vph-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              <span className="vph-star">✦</span>
              <span className="vph-eyebrow-txt">ABOUT VP ASSOCIATES</span>
            </motion.div>

            {/* Headline — three-line reveal */}
            <h1 className="vph-h1" aria-label="Building Foundations. Fueling Passions. Delivering Quality.">
              <span className="vph-hl-clip">
                <motion.span
                  className="vph-hl-row"
                  initial={{ y: "106%" }}
                  animate={isInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.78, ease: EASE, delay: 0.3 }}
                >
                  Building Foundations.
                </motion.span>
              </span>
              <span className="vph-hl-clip">
                <motion.span
                  className="vph-hl-row"
                  initial={{ y: "106%" }}
                  animate={isInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.78, ease: EASE, delay: 0.44 }}
                >
                  Fueling Passions.
                </motion.span>
              </span>
              <span className="vph-hl-clip">
                <motion.span
                  className="vph-hl-row vph-hl-accent"
                  initial={{ y: "106%" }}
                  animate={isInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.78, ease: EASE, delay: 0.58 }}
                >
                  Delivering Quality.
                </motion.span>
              </span>
            </h1>

            {/* Description */}
            <motion.p
              className="vph-desc"
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.72 }}
            >
              VP Associates unifies civil construction, specialized workforce solutions, event catering, and professional sports grounds—driven by operational experience, dependable execution, and commitment to excellence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="vph-ctas"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE, delay: 0.86 }}
            >
              <Link
                href="/#services"
                className="vph-btn-ghost"
                id="about-hero-services-btn"
              >
                Explore Services
              </Link>
            </motion.div>
          </div>

          {/* ════════════════════════════════════════════
              RIGHT COLUMN: stats + circles + connecting line
          ════════════════════════════════════════════ */}
          <div className="vph-side vph-side-r">
            {/* Row 3: Stat + Circle (500+ Projects & Events Completed) */}
            <motion.div
              className="vph-float-row vph-float-row-rev"
              initial={{ opacity: 0, x: 12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.92 }}
            >
              <StatCard value="500+" label="Projects & Events Completed" colorCls="vc-orange" />
              <div className="vph-circ vph-circ-lg">
                <Image
                  src="/images/about/cricket.png"
                  alt="Sports"
                  fill
                  priority
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                  sizes="92px"
                />
              </div>
            </motion.div>

            {/* Connecting line */}
            <ConnectLine isInView={isInView} delay={1.05} alignRight />

            {/* Row 4: Stat + Circle (98% Client Satisfaction Rate) */}
            <motion.div
              className="vph-float-row vph-float-row-rev"
              initial={{ opacity: 0, x: 12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 1.12 }}
            >
              <StatCard value="98%" label="Client Satisfaction Rate" colorCls="vc-orange" />
              <div className="vph-circ vph-circ-sm">
                <Image
                  src="/images/sport/cricket-passion-performance.jpg"
                  alt="Events"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  sizes="74px"
                />
              </div>
            </motion.div>
          </div>

        </div>

        {/* ──────────────────────────────────────────────
            MAIN VISUAL STAGE — EXACT ARCHED COLLAGE COMPOSITION
        ────────────────────────────────────────────── */}
        <div className="vph-visual">
          <motion.div
            className="vph-stage"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, ease: EASE, delay: 1.0 }}
          >
            {/* ── Stage background base tone ── */}
            <div className="vph-stage-bg" aria-hidden />

            {/* ── Background SVG Topological Wave Lines ── */}
            <svg className="vph-topo-bg" viewBox="0 0 1400 500" fill="none" preserveAspectRatio="none" aria-hidden>
              <path d="M-100 250 C 200 100, 500 380, 800 200 C 1100 20, 1300 300, 1600 180" stroke="rgba(238,129,50,0.22)" strokeWidth="1.5" />
              <path d="M-100 290 C 220 140, 520 400, 820 230 C 1120 60, 1320 320, 1600 210" stroke="rgba(238,129,50,0.15)" strokeWidth="1.5" />
              <path d="M-100 210 C 180 80, 480 340, 780 170 C 1080 -10, 1280 260, 1600 150" stroke="rgba(52,94,42,0.18)" strokeWidth="1.5" />
              <path d="M-100 330 C 240 180, 540 430, 840 260 C 1140 100, 1340 350, 1600 240" stroke="rgba(238,129,50,0.1)" strokeWidth="1.5" />
            </svg>

            {/* ── Atmospheric gradient glows matching reference ── */}
            <div className="vph-glow-orange" aria-hidden />
            <div className="vph-glow-green" aria-hidden />

            {/* ── SVG clip-path definitions for asymmetric organic collage shapes ── */}
            <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }} aria-hidden>
              <defs>
                {/* Arch 1: Construction Site (Left - Organic Soft Wave Shape) */}
                <clipPath id="vph-clip-1" clipPathUnits="objectBoundingBox">
                  <path d="M 0,1 L 0,0.32 Q 0.02,0.06 0.44,0.02 Q 0.84,-0.02 1,0.28 L 1,1 Z" />
                </clipPath>

                {/* Arch 2: VP Building (Center Anchor - Dominant Tall Arch) */}
                <clipPath id="vph-clip-2" clipPathUnits="objectBoundingBox">
                  <path d="M 0,1 L 0,0.26 Q 0.1,0.02 0.5,0.005 Q 0.9,0.02 1,0.26 L 1,1 Z" />
                </clipPath>

                {/* Arch 3: Stadium Arena (Center-Right - Wide Circular Lens Arch) */}
                <clipPath id="vph-clip-3" clipPathUnits="objectBoundingBox">
                  <path d="M 0,1 L 0,0.26 Q 0.12,0.02 0.55,0.01 Q 0.92,0.05 1,0.26 L 1,1 Z" />
                </clipPath>

                {/* Arch 4: Catering Banquet (Far Right - Asymmetric Soft Wave) */}
                <clipPath id="vph-clip-4" clipPathUnits="objectBoundingBox">
                  <path d="M 0,1 L 0,0.24 Q 0.16,0.04 0.6,0.02 Q 0.94,0.08 1,0.24 L 1,1 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* ════════════════════════════════════════════
                LAYERED EDITORIAL COLLAGE COMPOSITION
            ════════════════════════════════════════════ */}

            {/* Panel 1: Left — Construction Site (Enters from Left, Mid-Low Tier) */}
            <motion.div
              className="vph-arch-panel vph-arch-panel-1"
              initial={{ opacity: 0, x: -30, y: 25 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.85, ease: EASE, delay: 1.1 }}
            >
              <Image
                src="/images/about/construction.png"
                alt="Construction & Infrastructure"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="35vw"
              />
              <div className="vph-panel-shade" />
              <div className="vph-edge-border" />
            </motion.div>

            {/* Panel 2: Center — VP Building Headquarters (DOMINANT VISUAL ANCHOR) */}
            <motion.div
              className="vph-arch-panel vph-arch-panel-2"
              initial={{ opacity: 0, scale: 0.94, y: 35 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.95, ease: EASE, delay: 1.0 }}
            >
              <Image
                src="/images/about/vp-building.png"
                alt="VP Associates Headquarters"
                fill
                priority
                className="vph-panel-img-2"
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
                sizes="48vw"
              />
              <div className="vph-vp-mark" aria-hidden>VP</div>
              <div className="vph-edge-border" />
            </motion.div>

            {/* Panel 3: Center-Right — Sports Stadium Pitch (Integrates Center-Right, Mid-High Tier) */}
            <motion.div
              className="vph-arch-panel vph-arch-panel-3"
              initial={{ opacity: 0, x: 20, y: 30 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.85, ease: EASE, delay: 1.2 }}
            >
              <Image
                src="/images/sport/cricket-arena-main.jpg"
                alt="Sports Facility Showcase"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="35vw"
              />
              <div className="vph-panel-shade" />
              <div className="vph-edge-border" />
            </motion.div>

            {/* Panel 4: Far-Right — Luxury Catering Banquet Setup (Enters from Right, Lowest Tier) */}
            <motion.div
              className="vph-arch-panel vph-arch-panel-4"
              initial={{ opacity: 0, x: 35, y: 35 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 1.25 }}
            >
              <Image
                src="/images/about/catering.png"
                alt="Catering & Event Experiences"
                fill
                priority
                style={{ objectFit: "cover" }}
                sizes="30vw"
              />
              <div className="vph-panel-shade" />
              <div className="vph-edge-border" />
            </motion.div>

            {/* ── Top Vignette Blend ── */}
            <div className="vph-stage-top-vignette" aria-hidden />

            {/* ── Mini scroll down arrow button matching reference ── */}
            <div className="vph-mini-scroll" aria-hidden>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `

/* ══════════════════════════════════════════
   SECTION — outer wrapper
══════════════════════════════════════════ */
.vph-section {
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
}

/* ══════════════════════════════════════════
   FRAME — single window frame fitting 100vh
══════════════════════════════════════════ */
.vph-frame {
  position: relative;
  background: linear-gradient(170deg, #fafaf8 0%, #f3f1ec 100%);
  border-radius: 28px;
  overflow: hidden;
  box-shadow:
    0 2px 24px rgba(0,0,0,0.06),
    0 8px 48px rgba(0,0,0,0.04),
    0 0 0 1px rgba(0,0,0,0.05);
  padding-top: 88px;
  padding-bottom: 0;
  height: auto;
  min-height: clamp(600px, 80vh, 760px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* ── Ambient glows inside frame ─────────── */
.vph-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
}
.vph-glow-l {
  width: 55%; height: 60%;
  background: radial-gradient(circle, rgba(238,129,50,0.09) 0%, transparent 70%);
  top: 10%; left: -8%;
}
.vph-glow-r {
  width: 48%; height: 50%;
  background: radial-gradient(circle, rgba(52,94,42,0.07) 0%, transparent 70%);
  top: 25%; right: -4%;
}

/* ══════════════════════════════════════════
   UPPER HERO ZONE — copy + side floating icons
══════════════════════════════════════════ */
.vph-upper {
  position: relative;
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
  z-index: 2;
  flex-shrink: 0;
}

/* ── Side columns (floating near text) ─── */
.vph-side {
  position: absolute;
  top: 52px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.vph-side-l {
  left: 24px;
}

.vph-side-r {
  right: 28px;
  align-items: flex-end;
}

/* Float row (circle + stat card) */
.vph-float-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.vph-float-row-rev {
  flex-direction: row-reverse;
}

/* ── Circular image ──────────────────────── */
.vph-circ {
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 2.5px solid #ffffff;
  box-shadow:
    0 4px 18px rgba(0,0,0,0.12),
    0 0 0 1px rgba(0,0,0,0.04);
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.vph-circ:hover {
  transform: scale(1.04);
  box-shadow: 0 8px 28px rgba(0,0,0,0.16);
}
.vph-circ-lg { width: 76px; height: 76px; }
.vph-circ-sm { width: 62px; height: 62px; }

/* ── Stat card ───────────────────────────── */
.vph-stat {
  background: #ffffff;
  border-radius: 10px;
  padding: 8px 11px;
  box-shadow:
    0 4px 18px rgba(0,0,0,0.08),
    0 0 0 1px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  gap: 1px;
  transition: transform 0.22s ease;
  min-width: 62px;
}
.vph-stat:hover { transform: translateY(-3px); }
.vph-stat-val {
  font-family: var(--font-inter), sans-serif;
  font-size: clamp(16px, 1.3vw, 20px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
}
.vc-orange { color: #ee8132; }
.vc-green  { color: #345e2a; }
.vph-stat-lbl {
  font-family: var(--font-inter), sans-serif;
  font-size: 9.5px;
  color: #aaa;
  font-weight: 500;
  line-height: 1.25;
  max-width: 64px;
}

/* ── Connecting line wrapper ─────────────── */
.vph-connector {
  margin: 2px 0 2px 26px;
}

/* ══════════════════════════════════════════
   CENTERED COPY BLOCK
══════════════════════════════════════════ */
.vph-copy {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0 14px;
  max-width: 680px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
}

/* ── Eyebrow ─────────────────────────────── */
.vph-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(238,129,50,0.18);
  border-radius: 9999px;
  padding: 5px 16px;
  margin-bottom: 14px;
  box-shadow: 0 2px 14px rgba(0,0,0,0.06);
}
.vph-eyebrow-txt {
  font-family: var(--font-inter), sans-serif;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #777;
}
.vph-star {
  font-size: 8.5px;
  color: #ee8132;
  line-height: 1;
}

/* ── Headline ────────────────────────────── */
.vph-h1 {
  font-family: var(--font-inter), sans-serif;
  font-size: clamp(28px, 3.6vw, 48px);
  font-weight: 800;
  letter-spacing: -0.032em;
  line-height: 1.08;
  margin: 0 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vph-hl-clip {
  overflow: hidden;
  display: block;
  padding-bottom: 0.05em;
}
.vph-hl-row {
  display: block;
  color: #16162a;
}
.vph-hl-accent {
  color: #ee8132 !important;
  background: linear-gradient(135deg, #FF8F50 0%, #EE6620 55%, #ee8132 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Description ─────────────────────────── */
.vph-desc {
  font-family: var(--font-inter), sans-serif;
  font-size: clamp(13px, 1.05vw, 15px);
  color: #555555;
  line-height: 1.6;
  margin: 0 auto 16px auto;
  max-width: 580px;
  text-align: center;
  box-sizing: border-box;
}

/* ── CTAs ────────────────────────────────── */
.vph-ctas {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}
.vph-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: linear-gradient(135deg, #345e2a 0%, #ee8132 100%);
  color: #fff;
  font-family: var(--font-inter), sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(238,129,50,0.32);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  white-space: nowrap;
}
.vph-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 26px rgba(238,129,50,0.44);
}
.vph-btn-ghost {
  display: inline-flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.12);
  color: #333;
  font-family: var(--font-inter), sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  white-space: nowrap;
}
.vph-btn-ghost:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 16px rgba(0,0,0,0.11);
}

/* ══════════════════════════════════════════
   MAIN STAGE VISUAL ZONE — ARCHED COLLAGE
══════════════════════════════════════════ */
.vph-visual {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  min-height: 0;
}

.vph-stage {
  flex: 1;
  height: 100%;
  min-height: 260px;
  max-height: 460px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  margin: 0 auto;
  width: 100%;
  max-width: 1260px;
  border-radius: 24px 24px 0 0;
}

/* Stage base color */
.vph-stage-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #f4f1ea 0%, #e5ded2 100%);
  z-index: 0;
}

/* Background SVG Topological Wave Lines */
.vph-topo-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

/* Atmospheric Glow Blobs matching reference */
.vph-glow-orange {
  position: absolute;
  top: -10%;
  left: 12%;
  width: 45%;
  height: 90%;
  background: radial-gradient(ellipse at center, rgba(255, 140, 70, 0.32) 0%, rgba(255, 180, 120, 0.12) 45%, transparent 70%);
  filter: blur(40px);
  z-index: 1;
  pointer-events: none;
}

.vph-glow-green {
  position: absolute;
  top: -5%;
  right: 12%;
  width: 42%;
  height: 85%;
  background: radial-gradient(ellipse at center, rgba(140, 210, 180, 0.28) 0%, transparent 68%);
  filter: blur(40px);
  z-index: 1;
  pointer-events: none;
}

/* ── LAYERED EDITORIAL COLLAGE — 4 ASYMMETRIC STAGGERED PANELS ── */
.vph-arch-panel {
  position: absolute;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
}
.vph-arch-panel:hover {
  transform: translateY(-5px) scale(1.01);
}

/* Translucent organic edge contour border */
.vph-edge-border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border-top: 1.5px solid rgba(255,255,255,0.85);
  box-shadow: inset 0 2px 10px rgba(255,255,255,0.45);
  pointer-events: none;
  z-index: 4;
}

/* Panel 1: Left — Construction Site (Enters from Left, Mid-Low Tier) */
.vph-arch-panel-1 {
  left: 0%;
  top: 48px;
  width: 32%;
  height: 80%;
  clip-path: url(#vph-clip-1);
  -webkit-clip-path: url(#vph-clip-1);
  border-radius: 140px 100px 0 0;
  z-index: 2;
  filter: drop-shadow(0 14px 30px rgba(0,0,0,0.14));
}

/* Panel 2: Center — VP Building Headquarters (DOMINANT VISUAL ANCHOR - Top Tier) */
.vph-arch-panel-2 {
  left: 24%;
  top: 0px;
  width: 36%;
  height: 98%;
  clip-path: url(#vph-clip-2);
  -webkit-clip-path: url(#vph-clip-2);
  border-radius: 200px 200px 0 0;
  z-index: 4;
  filter: drop-shadow(0 24px 56px rgba(0,0,0,0.22));
}

/* Panel 3: Center-Right — Sports Stadium Pitch (Integrates Center-Right, Mid-High Tier) */
.vph-arch-panel-3 {
  left: 48%;
  top: 36px;
  width: 34%;
  height: 86%;
  clip-path: url(#vph-clip-3);
  -webkit-clip-path: url(#vph-clip-3);
  border-radius: 180px 180px 0 0;
  z-index: 3;
  filter: drop-shadow(0 16px 36px rgba(0,0,0,0.16));
}

/* Panel 4: Far-Right — Luxury Catering Banquet Setup (Enters from Right, Lowest Tier) */
.vph-arch-panel-4 {
  left: 70%;
  top: 72px;
  width: 30%;
  height: 76%;
  clip-path: url(#vph-clip-4);
  -webkit-clip-path: url(#vph-clip-4);
  border-radius: 130px 140px 0 0;
  z-index: 2;
  filter: drop-shadow(0 14px 32px rgba(0,0,0,0.15));
}

/* Panel shade overlay */
.vph-panel-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 50%);
  z-index: 1;
}

/* VP Monogram mark on center panel facade */
.vph-vp-mark {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-inter), sans-serif;
  font-size: 52px;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
  z-index: 2;
  pointer-events: none;
  user-select: none;
}

/* Top Vignette Blend into frame */
.vph-stage-top-vignette {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 25%;
  background: linear-gradient(to bottom, rgba(243,241,236,0.60) 0%, transparent 100%);
  z-index: 6;
  pointer-events: none;
}

/* ══════════════════════════════════════════
   CATEGORY STRIP — floating white pill at bottom (PERFECTLY CENTERED)
══════════════════════════════════════════ */
.vph-cat-strip {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 18px;
  padding: 10px 16px;
  box-shadow:
    0 8px 32px rgba(0,0,0,0.12),
    0 0 0 1px rgba(255,255,255,0.8);
  white-space: nowrap;
  border: 1px solid rgba(255,255,255,0.7);
  max-width: calc(100% - 32px);
  width: max-content;
}

/* Mini scroll down arrow button matching reference design */
.vph-mini-scroll {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 12;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  pointer-events: none;
}
.vph-cat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 12px;
  cursor: default;
  transition: transform 0.2s ease;
}
.vph-cat-item:hover { transform: translateY(-2px); }
.vph-cat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.vph-cat-name {
  font-family: var(--font-inter), sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.1;
}
.vph-cat-sub {
  font-family: var(--font-inter), sans-serif;
  font-size: 10px;
  color: #aaa;
  font-weight: 500;
  margin-top: 1px;
  line-height: 1.2;
}
.vph-cat-div {
  width: 1px;
  height: 30px;
  background: rgba(0,0,0,0.08);
  flex-shrink: 0;
}

/* ══════════════════════════════════════════
   SCROLL INDICATOR
══════════════════════════════════════════ */
.vph-scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 18px 0 12px;
  position: relative;
  z-index: 2;
}
.vph-scroll-ring {
  width: 38px; height: 38px;
  border-radius: 50%;
  border: 1.5px solid rgba(0,0,0,0.13);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  animation: vph-bob 2.2s ease-in-out infinite;
}
@keyframes vph-bob {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(5px); }
}
.vph-scroll-txt {
  font-family: var(--font-inter), sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: #c0c0c0;
  text-transform: uppercase;
}

/* ══════════════════════════════════════════
   RESPONSIVE — 1280px
══════════════════════════════════════════ */
@media (max-width: 1280px) {
  .vph-upper { max-width: 1140px; }
  .vph-side-l { left: 16px; }
  .vph-side-r { right: 20px; }
  .vph-circ-lg { width: 80px; height: 80px; }
  .vph-circ-sm { width: 66px; height: 66px; }
  .vph-arch-panel-1 { width: 31%; left: 0%; }
  .vph-arch-panel-2 { width: 35%; left: 24%; }
  .vph-arch-panel-3 { width: 33%; left: 47%; }
  .vph-arch-panel-4 { width: 29%; left: 70%; }
}

/* ══════════════════════════════════════════
   RESPONSIVE — 1024px (tablet landscape)
══════════════════════════════════════════ */
@media (max-width: 1024px) {
  .vph-frame { padding-top: 80px; border-radius: 22px; }
  .vph-section { padding: 6px; }
  .vph-upper { max-width: 980px; }
  .vph-side { top: 40px; }
  .vph-side-l { left: 8px; transform: scale(0.9); transform-origin: top left; }
  .vph-side-r { right: 12px; transform: scale(0.9); transform-origin: top right; }
  .vph-circ-lg { width: 72px; height: 72px; }
  .vph-circ-sm { width: 60px; height: 60px; }
  .vph-stat-val { font-size: 18px; }
  .vph-stage { height: clamp(280px, 38vw, 400px); }
  .vph-arch-panel-1 { width: 30%; border-radius: 90px 90px 0 0; }
  .vph-arch-panel-2 { width: 36%; border-radius: 110px 110px 0 0; }
  .vph-arch-panel-3 { width: 34%; border-radius: 100px 100px 0 0; }
  .vph-arch-panel-4 { width: 30%; border-radius: 90px 90px 0 0; }
  .vph-cat-strip { padding: 8px 10px; }
  .vph-cat-item { padding: 2px 10px; }
}

/* ══════════════════════════════════════════
   RESPONSIVE — 768px (tablet portrait & mobile)
══════════════════════════════════════════ */
@media (max-width: 768px) {
  .vph-frame {
    border-radius: 20px;
    padding-top: 68px;
    padding-bottom: 0px;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
  }
  .vph-section { padding: 4px; }

  .vph-upper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16px;
  }

  .vph-copy {
    order: 1;
    padding-bottom: 0px;
    margin-bottom: 8px;
  }

  .vph-eyebrow {
    margin-bottom: 10px;
    padding: 4px 14px;
  }

  .vph-h1 {
    margin-bottom: 10px;
  }

  .vph-desc {
    margin-bottom: 14px;
  }

  .vph-side {
    position: relative;
    top: auto; left: auto; right: auto;
    transform: none !important;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 4px 0;
    margin: 0 auto;
  }

  .vph-side-l { order: 2; }
  .vph-side-r { order: 3; }
  .vph-float-row, .vph-float-row-rev { flex-direction: row; gap: 8px; align-items: center; }
  .vph-connector { display: none; }

  /* Keep visual image collage visible on mobile */
  .vph-visual {
    display: flex !important;
    align-items: flex-end;
    justify-content: center;
    order: 4;
    margin-top: 18px;
    margin-bottom: 0px;
    flex: initial;
    width: 100%;
    position: relative;
  }

  /* Fit stage height generously around the arched images */
  .vph-stage {
    height: clamp(230px, 60vw, 340px);
    min-height: 0 !important;
    max-height: none;
    width: 100%;
    border-radius: 0;
    overflow: hidden;
    position: relative;
  }

  /* Soft ambient background */
  .vph-stage-bg {
    background: transparent !important;
  }
  .vph-topo-bg {
    display: none !important;
  }
  .vph-glow-orange,
  .vph-glow-green {
    display: none !important;
  }
  .vph-stage-top-vignette {
    display: none !important;
  }
  .vph-vp-mark {
    display: none !important;
  }
  .vph-panel-shade {
    display: none !important;
  }
  .vph-mini-scroll {
    display: none !important;
  }

  .vph-arch-panel {
    clip-path: none !important;
    -webkit-clip-path: none !important;
    overflow: hidden !important;
  }
  .vph-arch-panel img {
    object-fit: cover !important;
  }
  .vph-arch-panel-2 img,
  .vph-panel-img-2 {
    object-position: center 15% !important;
  }

  .vph-arch-panel-1 { left: 0%; width: 29%; bottom: 0; top: auto; height: 84%; border-radius: 70px 70px 0 0; }
  .vph-arch-panel-2 { left: 22%; width: 40%; bottom: 0; top: auto; height: 100%; border-radius: 90px 90px 0 0; z-index: 4; }
  .vph-arch-panel-3 { left: 54%; width: 31%; bottom: 0; top: auto; height: 88%; border-radius: 80px 80px 0 0; z-index: 3; }
  .vph-arch-panel-4 { left: 77%; width: 23%; bottom: 0; top: auto; height: 78%; border-radius: 65px 65px 0 0; z-index: 2; }

  .vph-cat-strip {
    display: none !important;
  }
}

/* ══════════════════════════════════════════
   RESPONSIVE — 480px (mobile)
══════════════════════════════════════════ */
@media (max-width: 480px) {
  .vph-frame { border-radius: 16px; padding-top: 56px; padding-bottom: 0px; min-height: 0 !important; }
  .vph-section { padding: 2px; }
  .vph-h1 { font-size: clamp(26px, 8vw, 38px); margin-bottom: 8px; }
  .vph-desc { font-size: 13px; margin-bottom: 12px; }
  .vph-btn-primary, .vph-btn-ghost { font-size: 12.5px; padding: 10px 20px; }
  .vph-circ-lg { width: 56px; height: 56px; }
  .vph-circ-sm { width: 48px; height: 48px; }
  .vph-stat { padding: 6px 10px; min-width: 58px; }
  .vph-stat-val { font-size: 16px; }
  .vph-stat-lbl { font-size: 9px; }
  .vph-side { gap: 8px; padding: 0; margin-top: 4px; }
  .vph-visual { margin-top: 14px; margin-bottom: 0px; }
  .vph-stage { height: clamp(200px, 56vw, 280px); }
  .vph-arch-panel-1 { left: 0%; width: 30%; height: 83%; border-radius: 50px 50px 0 0; }
  .vph-arch-panel-2 { left: 21%; width: 42%; height: 100%; border-radius: 70px 70px 0 0; }
  .vph-arch-panel-3 { left: 55%; width: 30%; height: 86%; border-radius: 60px 60px 0 0; }
  .vph-arch-panel-4 { left: 77%; width: 23%; height: 76%; border-radius: 45px 45px 0 0; }
}

/* ══════════════════════════════════════════
   RESPONSIVE — 390px (small mobile)
══════════════════════════════════════════ */
@media (max-width: 390px) {
  .vph-frame { padding-top: 48px; padding-bottom: 0px; min-height: 0 !important; }
  .vph-h1 { font-size: clamp(23px, 7.8vw, 32px); }
  .vph-ctas { flex-direction: row; gap: 8px; }
  .vph-btn-primary, .vph-btn-ghost {
    padding: 9px 16px; font-size: 12px;
  }
  .vph-stage { height: clamp(185px, 52vw, 250px); }
  .vph-arch-panel-1 { left: 0%; width: 30%; height: 82%; }
  .vph-arch-panel-2 { left: 20%; width: 44%; height: 100%; }
  .vph-arch-panel-3 { left: 56%; width: 29%; height: 84%; }
  .vph-arch-panel-4 { left: 77%; width: 23%; height: 74%; }
}
`;
