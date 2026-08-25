"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const categories = [
  {
    id: "wedding",
    title: "Wedding Banquets",
    description:
      "Grand, customizable culinary feasts styled to celebrate your special day.",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85&fit=crop",
    color: "#f5f0ea",
  },
  {
    id: "reception",
    title: "Receptions",
    description:
      "Exquisite spreads and elegant presentations designed to leave a lasting impression.",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=85&fit=crop",
    color: "#eaf0f5",
  },
  {
    id: "birthday",
    title: "Birthday Parties",
    description:
      "Vibrant, multi-cuisine food stations and custom menus for high-energy milestone celebrations.",
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=85&fit=crop",
    color: "#f5eaf5",
  },
  {
    id: "corporate",
    title: "Corporate Events & Meetings",
    description:
      "Professional coffee breaks, executive working lunches, and grand gala menus tailored for corporate leaders.",
    src: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=900&q=85&fit=crop",
    color: "#eaf5ee",
  },
  {
    id: "housewarming",
    title: "Housewarmings (Grihapravesam)",
    description:
      "Warm, traditional feast setups and traditional culinary delights to welcome guests to your new home.",
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=85&fit=crop",
    color: "#f5f0e0",
  },
  {
    id: "engagement",
    title: "Engagement Ceremonies",
    description:
      "Curated menus and theme-based food counters to kick off your celebration in style.",
    src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=900&q=85&fit=crop",
    color: "#ece8f5",
  },
  {
    id: "college",
    title: "College Events",
    description:
      "High-volume, delicious spreads and quick bites loaded with popular regional favorites.",
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=85&fit=crop",
    color: "#eef5ea",
  },
  {
    id: "outdoor",
    title: "Outdoor & Live Catering",
    description:
      "Fully equipped live cooking counters and flawless mobile kitchens for any outdoor venue.",
    src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=85&fit=crop",
    color: "#f5eae8",
  },
];

const TOTAL = categories.length;

interface CardProps {
  category: (typeof categories)[0];
  index: number;
}

function StackCard({ category, index }: CardProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll progress of this card's slot for sticky stacking
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "start start"],
  });

  // As we scroll past this card's sticky point, scale it down
  const targetScale = 1 - (TOTAL - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const topOffset = `calc(6vh + ${index * 22}px)`;

  return (
    <div ref={itemRef} className="sstack-item">
      <motion.div
        className="sstack-card"
        style={{ scale: isMobile ? undefined : scale, top: isMobile ? "auto" : topOffset }}
        initial={isMobile ? { y: 40, opacity: 0 } : undefined}
        whileInView={isMobile ? { y: 0, opacity: 1 } : undefined}
        viewport={isMobile ? { once: true, margin: "-50px" } : undefined}
        transition={isMobile ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] } : undefined}
        whileHover={{
          y: -6,
          boxShadow: "0 32px 72px rgba(0, 0, 0, 0.14), 0 6px 20px rgba(0, 0, 0, 0.08)",
          transition: { duration: 0.25, ease: "easeOut" },
        }}
        aria-label={`Category: ${category.title}`}
      >
        {/* Left: text content */}
        <div className="sstack-content" style={{ background: category.color }}>
          <span className="sstack-num">0{index + 1}</span>
          <div className="sstack-text">
            <h3 className="sstack-title">{category.title}</h3>
            <p className="sstack-desc">{category.description}</p>
          </div>

        </div>

        {/* Right: image */}
        <div className="sstack-img">
          <Image
            src={category.src}
            alt={category.title}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            style={{ objectFit: "cover" }}
            priority={index < 2}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function CateringCategories() {
  // Coordinated section animation matching CateringUniqueness motion (y: 90 -> 0, opacity: 0 -> 1, scale: 0.96 -> 1)
  const sectionVariants: any = {
    hidden: {
      y: 90,
      opacity: 0,
      scale: 0.96,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="sstack-section" aria-label="Catering Categories">
      {/* Sticky header */}
      <motion.div
        className="sstack-header-wrap"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="sstack-label">WHAT WE DO</span>
        <h2 className="sstack-heading">Catering for Every Occasion</h2>
        <p className="sstack-subheading">
          We bring culinary excellence and seamless service to every occasion,
          transforming gatherings into unforgettable experiences.
        </p>
      </motion.div>

      {/* Stack: Animates as one single coordinated block matching CateringUniqueness motion */}
      <motion.div
        className="sstack-stack"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.02 }}
        variants={sectionVariants}
      >
        {categories.map((cat, i) => (
          <StackCard key={cat.id} category={cat} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
