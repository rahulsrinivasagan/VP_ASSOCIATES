"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { SanityTestimonialsSection } from "@/lib/sanity/types";
import { getResponsiveImageUrl, getSanityFileUrl } from "@/lib/sanity/image";

const EASE_POWER4 = [0.22, 1, 0.36, 1] as const;
const EASE_POWER3 = [0.215, 0.61, 0.355, 1] as const;
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

// ─── Step Variants ─────────────────────────────────────────────────────────────

const labelVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: EASE_PREMIUM, delay: 0 },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)", backgroundPosition: "200% 0" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    backgroundPosition: "0% 0",
    transition: { duration: 0.8, ease: EASE_POWER4, delay: 0.15 },
  },
};

const paraVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE_PREMIUM, delay: 0.4 },
  },
};

const videoFrameVariants: Variants = {
  hidden: { opacity: 0, scale: 1.08, filter: "blur(20px) brightness(0.7)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px) brightness(1)",
    transition: { duration: 0.9, ease: EASE_POWER4, delay: 0.55 },
  },
};

const playBtnVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -15 },
  visible: {
    opacity: 1,
    scale: [0, 1.15, 1],
    rotate: 0,
    transition: { duration: 0.45, ease: EASE_PREMIUM, delay: 0.95 },
  },
};

const autofocusVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: EASE_PREMIUM, delay },
  }),
};

const thumbnailScanVariants: Variants = {
  hidden: { opacity: 0, y: 0, scale: 1 },
  visible: (delay: number) => ({
    opacity: 1,
    y: [0, -8, 0],
    scale: [1, 1.03, 1],
    transition: { duration: 0.3, ease: EASE_PREMIUM, delay },
  }),
};

const activePulseVariants: Variants = {
  hidden: { scale: 1, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" },
  visible: {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 4px 12px rgba(0,0,0,0.06)",
      "0 12px 32px rgba(245,130,31,0.25)",
      "0 4px 12px rgba(0,0,0,0.06)",
    ],
    transition: { duration: 0.5, ease: EASE_PREMIUM, delay: 1.8 },
  },
};

interface DefaultCardItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  scanDelay: number;
}

const defaultFacilityCards: DefaultCardItem[] = [
  {
    id: "v1",
    title: "Competitive Cricket Arena",
    description: "BCCI-standard grass outfield and turf pitch.",
    duration: "2:45",
    thumbnail: "/images/sport/card-competitive-spirit.jpg",
    scanDelay: 1.5,
  },
  {
    id: "v2",
    title: "Stadium Floodlights",
    description: "High-intensity LED lights for day-night matches.",
    duration: "1:52",
    thumbnail: "/images/sport/test-gallery-2.jpg",
    scanDelay: 1.58,
  },
  {
    id: "v3",
    title: "Practice & Training Cages",
    description: "Dedicated bowling and batting practice cages.",
    duration: "3:10",
    thumbnail: "/images/sport/cricket-passion-performance.jpg",
    scanDelay: 1.66,
  },
  {
    id: "v4",
    title: "Player Pavilion & Amenities",
    description: "Full changing rooms, spectator gallery, and parking.",
    duration: "4:05",
    thumbnail: "/images/sport/card-celebrate-together.jpg",
    scanDelay: 1.74,
  },
];

interface TestimonialsSectionProps {
  data?: SanityTestimonialsSection;
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredVideoRef = useRef<HTMLVideoElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsAnimated(true);
        }
      },
      { threshold: 0.05, rootMargin: "100px" }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const filmStripVariants: Variants = {
    hidden: { opacity: 0, x: isMobile ? 30 : 120, rotateY: 12 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 0.6, ease: EASE_POWER3, delay: 1.35 },
    },
  };

  const featuredVideoUrl =
    getSanityFileUrl(data?.featuredStory?.videoFile) ||
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  const handlePlayFeatured = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveCardId(null);
    setIsPlayingFeatured(true);
    if (featuredVideoRef.current) {
      featuredVideoRef.current.play().catch(() => {});
    }
  };

  return (
    <section ref={sectionRef} className="ts-root" id="testimonials">
      <div className="ts-bg-glow" aria-hidden="true" />
      <div className="ts-bg-creases" aria-hidden="true" />

      <div className="ts-container">
        {/* Header */}
        <div className="ts-header">
          <motion.div
            className="ts-eyebrow"
            variants={labelVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
          >
            <span className="ts-eyebrow-line" />
            <span className="ts-eyebrow-text">{data?.eyebrow || "SPORTS FACILITY SHOWCASE"}</span>
            <span className="ts-eyebrow-line" />
          </motion.div>

          <motion.h2
            className="ts-heading"
            variants={headingVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
            style={{
              backgroundImage: "linear-gradient(110deg, #1A1A1A 30%, #F5821F 50%, #1A1A1A 70%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
            }}
          >
            {data?.heading || "Experience Our Sports Grounds"}
          </motion.h2>

          <motion.p
            className="ts-para"
            variants={paraVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
          >
            {data?.description || "Explore our professionally designed sporting environment built for competitive matches, academy training, corporate tournaments, and unforgettable sporting moments."}
          </motion.p>
        </div>

        {/* Featured Video Showcase */}
        <div className="ts-featured">
          <motion.div
            className="ts-featured-frame"
            variants={videoFrameVariants}
            initial="hidden"
            animate={isAnimated ? "visible" : "hidden"}
            style={{ position: "relative", overflow: "hidden", cursor: !isPlayingFeatured ? "pointer" : "default" }}
            onClick={() => {
              if (!isPlayingFeatured) handlePlayFeatured();
            }}
          >
            {featuredVideoUrl && (
              <video
                ref={featuredVideoRef}
                src={featuredVideoUrl}
                poster={getResponsiveImageUrl(data?.featuredStory?.thumbnail, { width: 1200, height: 750, quality: 85 }) || undefined}
                controls={isPlayingFeatured}
                playsInline
                preload="metadata"
                className="ts-featured-video-element"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0,
                  zIndex: isPlayingFeatured ? 50 : 1,
                  opacity: isPlayingFeatured ? 1 : 0,
                  pointerEvents: isPlayingFeatured ? "auto" : "none",
                  transition: "opacity 0.3s ease",
                }}
                onEnded={() => setIsPlayingFeatured(false)}
                onPause={() => {
                  if (featuredVideoRef.current?.ended) setIsPlayingFeatured(false);
                }}
              />
            )}

            {!isPlayingFeatured && (
              <>
                <img
                  src={getResponsiveImageUrl(data?.featuredStory?.thumbnail, { width: 1200, height: 750, quality: 85 }) || "/images/sport/test-featured.jpg"}
                  alt="Sports grounds showcase thumbnail"
                  className="ts-featured-img"
                  draggable={false}
                />
                <div className="ts-featured-overlay" />

                <div className="ts-duration-badge">
                  {data?.featuredStory?.duration ? `Facility Showcase • ${data.featuredStory.duration}` : "Facility Showcase • 1:45"}
                </div>

                <motion.button 
                  className="ts-featured-play-btn"
                  variants={playBtnVariants}
                  initial="hidden"
                  animate={isAnimated ? "visible" : "hidden"}
                  aria-label="Play sports grounds video"
                  onClick={handlePlayFeatured}
                  style={{ zIndex: 40, cursor: "pointer" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ts-play-svg">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.button>

                {/* Featured Info Card Overlay */}
                <div className="ts-featured-card" style={{ zIndex: 25 }}>
                  <motion.div
                    className="ts-featured-card-header"
                    custom={1.1}
                    variants={autofocusVariants}
                    initial="hidden"
                    animate={isAnimated ? "visible" : "hidden"}
                  >
                    <span className="ts-featured-badge">{data?.featuredStory?.label || "SPORTS FACILITY"}</span>
                  </motion.div>

                  <motion.h3
                    className="ts-featured-player"
                    custom={1.18}
                    variants={autofocusVariants}
                    initial="hidden"
                    animate={isAnimated ? "visible" : "hidden"}
                  >
                    {data?.featuredStory?.title || "SPORTS GROUNDS & ARENA"}
                  </motion.h3>

                  <motion.p
                    className="ts-featured-event"
                    custom={1.24}
                    variants={autofocusVariants}
                    initial="hidden"
                    animate={isAnimated ? "visible" : "hidden"}
                  >
                    {data?.featuredStory?.subtitle || "Professionally Maintained Cricket Grounds"}
                  </motion.p>

                  <motion.p
                    className="ts-featured-quote"
                    custom={1.3}
                    variants={autofocusVariants}
                    initial="hidden"
                    animate={isAnimated ? "visible" : "hidden"}
                  >
                    {data?.featuredStory?.description || "A professionally designed sporting environment for matches, training, tournaments, and events."}
                  </motion.p>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Video Gallery Grid */}
        <motion.div
          className="ts-gallery"
          variants={filmStripVariants}
          initial="hidden"
          animate={isAnimated ? "visible" : "hidden"}
          style={{ perspective: 1000 }}
          role="list"
        >
          {defaultFacilityCards.map((defC, idx) => {
            const cmsItem = data?.items?.[idx];
            const title = cmsItem?.title || defC.title;
            const description = cmsItem?.description || defC.description;
            const duration = cmsItem?.duration || defC.duration;
            const thumbnail = getResponsiveImageUrl(cmsItem?.thumbnail, { width: 600, height: 400, quality: 80 }) || defC.thumbnail;
            const cardVideoUrl = getSanityFileUrl(cmsItem?.videoFile) || featuredVideoUrl;
            const cardId = cmsItem?.id || defC.id;
            const isCardActive = activeCardId === cardId;

            return (
              <motion.article
                key={cardId}
                className="ts-card"
                custom={defC.scanDelay}
                variants={idx === 0 ? activePulseVariants : thumbnailScanVariants}
                initial="hidden"
                animate={isAnimated ? "visible" : "hidden"}
                role="listitem"
                whileHover={{ y: -6 }}
              >
                {/* Card Header (Thumbnail + Video / Play overlay) */}
                <div
                  className="ts-card-media"
                  style={{ position: "relative", overflow: "hidden", cursor: !isCardActive ? "pointer" : "default" }}
                  onClick={() => {
                    if (!isCardActive) {
                      setIsPlayingFeatured(false);
                      setActiveCardId(cardId);
                    }
                  }}
                >
                  {isCardActive && cardVideoUrl ? (
                    <video
                      src={cardVideoUrl}
                      poster={thumbnail}
                      autoPlay
                      controls
                      playsInline
                      preload="metadata"
                      className="ts-card-video-player"
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, zIndex: 50 }}
                      onEnded={() => setActiveCardId(null)}
                    />
                  ) : (
                    <>
                      <img
                        src={thumbnail}
                        alt={`${title} facility thumbnail`}
                        className="ts-card-img"
                        draggable={false}
                      />
                      <div className="ts-card-media-overlay" />
                      
                      <div className="ts-card-duration">{duration}</div>

                      <button
                        className="ts-card-play-btn"
                        aria-label={`Play ${title} video`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlayingFeatured(false);
                          setActiveCardId(cardId);
                        }}
                        style={{ border: "none", background: "transparent", cursor: "pointer", zIndex: 40 }}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="ts-card-play-svg">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Card Body */}
                <div className="ts-card-body">
                  <h4 className="ts-card-name" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem" }}>{title}</h4>
                  <p className="ts-card-quote" style={{ fontSize: "0.875rem", color: "#4B5563", lineHeight: "1.4" }}>{description}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
