"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTransitionLoader } from "@/components/TransitionProvider";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { navigate } = useTransitionLoader();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dotsOpen, setDotsOpen] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Stagger reveal of navbar items starts right as the intro preloader completes (~1850ms)
    const timer = setTimeout(() => setNavReady(true), 1850);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDotsOpen(false);
  }, [pathname]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handler = () => {
      const currentY = window.scrollY;
      const lastY = lastScrollY.current;

      // Always stay expanded near the very top, regardless of direction.
      if (currentY < 40) {
        setScrolled(false);
      } else if (currentY > lastY) {
        // Scrolling down -> shrink
        setScrolled(true);
      } else if (currentY < lastY) {
        // Scrolling up -> expand
        setScrolled(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dots menu on outside click
  useEffect(() => {
    if (!dotsOpen) return;
    const handler = (e: MouseEvent) => {
      if (dotsRef.current && !dotsRef.current.contains(e.target as Node)) {
        setDotsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dotsOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Entrance variants
  const navItemVariants: any = {
    hidden: { opacity: 0, y: -15 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: custom,
      },
    }),
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/construction") {
      const el = document.getElementById("contact");
      if (el) {
        const navbarOffset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navbarOffset,
          behavior: "smooth",
        });
        window.history.pushState(null, "", "/construction#contact");
      }
    } else {
      navigate("/construction#contact");
    }
  };

  return (
    <>
      <nav
        className={`nb-nav${scrolled ? " nb-scrolled" : ""}`}
        aria-label="Main navigation"
      >
        {/* ── Identity (avatar + name) — always visible ── */}
        <motion.a
          href="/"
          className="nb-identity"
          aria-label="VP Associates Home"
          custom={0}
          variants={navItemVariants}
          initial="hidden"
          animate={navReady ? "visible" : "hidden"}
        >
          <div style={{ position: "relative", height: "36px", width: "130px" }}>
            <Image
              src="/images/logos/logo.png"
              alt="VP Associates Logo"
              fill
              priority
              sizes="130px"
              style={{ objectFit: "contain", objectPosition: "left" }}
            />
          </div>
        </motion.a>

        {/* ── Desktop nav links — hidden when scrolled ── */}
        <div
          className="nb-links"
          role="menubar"
          aria-label="Site navigation"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {navLinks.map((l, index) => (
            <motion.a
              key={l.label}
              href={l.href}
              className={`nb-link${pathname === l.href ? " nb-link-active" : ""}`}
              role="menuitem"
              custom={0.1 + index * 0.08}
              variants={navItemVariants}
              initial="hidden"
              animate={navReady ? "visible" : "hidden"}
              onMouseEnter={() => setHoveredIdx(index)}
              style={{ position: "relative" }}
            >
              <AnimatePresence>
                {hoveredIdx === index && (
                  <motion.div
                    layoutId="nav-hover-bg"
                    className="nb-hover-pill-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </AnimatePresence>
              <span style={{ position: "relative", zIndex: 2 }}>{l.label}</span>
            </motion.a>
          ))}

        </div>

        {/* ── Contact CTA — hidden when scrolled ── */}
        <motion.a
          href="/construction#contact"
          className="nb-cta"
          id="nav-contact"
          custom={0.1 + navLinks.length * 0.08}
          variants={navItemVariants}
          initial="hidden"
          animate={navReady ? "visible" : "hidden"}
          onClick={handleContactClick}
        >
          Contact
        </motion.a>

        {/* ── Dots menu — visible only when scrolled ── */}
        <motion.div
          className="nb-dots-wrap"
          ref={dotsRef}
          custom={0.1}
          variants={navItemVariants}
          initial="hidden"
          animate={navReady ? "visible" : "hidden"}
        >
          <button
            suppressHydrationWarning
            className="nb-dots"
            aria-label="Open navigation menu"
            aria-expanded={dotsOpen}
            onClick={() => setDotsOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>

          {/* Dropdown */}
          <div className={`nb-dropdown${dotsOpen ? " nb-dropdown-open" : ""}`} role="menu">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nb-dropdown-link"
                role="menuitem"
                onClick={() => setDotsOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/construction#contact"
              className="nb-dropdown-cta"
              onClick={(e) => {
                setDotsOpen(false);
                handleContactClick(e);
              }}
            >
              Contact
            </a>
          </div>
        </motion.div>

        {/* ── Mobile hamburger ── */}
        <motion.button
          suppressHydrationWarning
          className={`nb-hamburger${mobileOpen ? " nb-open" : ""}`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          custom={0.2}
          variants={navItemVariants}
          initial="hidden"
          animate={navReady ? "visible" : "hidden"}
        >
          <span />
          <span />
          <span />
        </motion.button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nb-mobile nb-mobile-open"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden={!mobileOpen}
          >
            {navLinks.map((l, index) => (
              <motion.a
                key={l.label}
                href={l.href}
                className="nb-mobile-link"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="/construction#contact"
              className="nb-cta"
              style={{ marginTop: 24 }}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 15, opacity: 0 }}
              transition={{ delay: navLinks.length * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => {
                setMobileOpen(false);
                handleContactClick(e);
              }}
            >
              Contact
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
