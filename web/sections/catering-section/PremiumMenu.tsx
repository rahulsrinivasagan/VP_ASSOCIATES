"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: "01",
    name: "South Indian Mini Meals",
    description: "Traditional platter with sambar rice, curd rice, poriyal & payasam.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80&fit=crop",
  },
  {
    id: "02",
    name: "Veg Biryani",
    description: "Fragrant basmati rice cooked with garden vegetables & aromatic spices.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80&fit=crop",
  },
  {
    id: "03",
    name: "Paneer Tikka",
    description: "Cottage cheese marinated in spices, grilled to perfection.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80&fit=crop",
  },
  {
    id: "04",
    name: "Payasam",
    description: "Traditional sweet delicacy made with premium ingredients.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80&fit=crop",
  },
];

interface PremiumMenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumMenuPopup({ isOpen, onClose }: PremiumMenuPopupProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mounted, setMounted] = useState(false);
  const lastWheelTime = useRef(0);
  const scrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Strict Background Scroll Lock, Lenis Pause & Event Isolation
  useEffect(() => {
    if (!isOpen) return;

    // 1. Save current scroll position
    const currentScrollY = window.scrollY;
    scrollYRef.current = currentScrollY;

    // 2. Lock body scroll completely
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;
    const originalTop = document.body.style.top;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${currentScrollY}px`;

    // Pause Lenis / Locomotive smooth scroll if present
    const win = window as any;
    if (win.lenis && typeof win.lenis.stop === "function") {
      win.lenis.stop();
    }
    if (win.locomotiveScroll && typeof win.locomotiveScroll.stop === "function") {
      win.locomotiveScroll.stop();
    }

    // 3. Intercept & consume wheel and touch events
    const preventScroll = (e: Event) => {
      e.stopPropagation();
    };

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("wheel", handleWheelEvent, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Restore body styles
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
      document.body.style.top = originalTop;

      // Restore exact scroll position
      window.scrollTo(0, scrollYRef.current);

      // Resume Lenis / Locomotive smooth scroll
      if (win.lenis && typeof win.lenis.start === "function") {
        win.lenis.start();
      }
      if (win.locomotiveScroll && typeof win.locomotiveScroll.start === "function") {
        win.locomotiveScroll.start();
      }

      window.removeEventListener("wheel", handleWheelEvent);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % menuItems.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
  };

  const handleSelect = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const now = Date.now();
    if (now - lastWheelTime.current < 350) return;

    if (Math.abs(e.deltaX) > 15 || Math.abs(e.deltaY) > 15) {
      lastWheelTime.current = now;
      if (e.deltaX > 0 || e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 35;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  // 3D Twist / Flip Opening & Closing Spring Animation
  const modalVariants: any = {
    hidden: {
      opacity: 0,
      scale: 0.84,
      rotateY: -12,
      rotateX: 8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 26,
        mass: 0.9,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      rotateY: 12,
      rotateX: -6,
      y: 15,
      transition: {
        duration: 0.32,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  const slideVariants: any = {
    enter: (direction: number) => ({
      x: direction > 0 ? 250 : -250,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -250 : 250,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.32,
        ease: "easeInOut",
      },
    }),
  };

  const currentDish = menuItems[activeIndex];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 md:p-6 select-none overflow-hidden font-sans overscroll-contain touch-none"
          style={{ perspective: "1200px" }}
        >
          

          {/* Dark backdrop overlay with blur */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-[8px]"
          />

          {/* Main 3D Modal Window — Compact Split Layout (860px max width, 33% / 67%) */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-[min(84vw,860px)] max-w-[860px] h-[68vh] min-h-[480px] max-h-[580px] bg-[#FFFDF8] rounded-[28px] shadow-[0_25px_70px_rgba(0,0,0,0.22)] grid grid-cols-1 lg:grid-cols-[33%_67%] overflow-hidden text-[#222222] overscroll-contain"
          >
            
            {/* Close Button - 40px circle at top right */}
            <motion.button
              onClick={onClose}
              whileHover={{ rotate: 90, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 right-4 lg:top-5 lg:right-5 z-50 w-10 h-10 rounded-full bg-[#F4F0E8] hover:bg-[#EFE9DF] text-[#444444] flex items-center justify-center shadow-xs cursor-pointer border border-[#E5E0D5]"
              aria-label="Close menu"
            >
              <FiX size={18} />
            </motion.button>

            {/* ─── LEFT PANEL (33% Width) ────────────────────────────────────────── */}
            <div className="p-5 md:p-6 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-[#EFEAE0] bg-[#FAF7F0] relative overflow-hidden h-full">
              
              {/* Content Wrapper */}
              <div className="w-full flex flex-col items-center justify-center space-y-3 z-10">
                
                {/* Top Label & Divider */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C89A3D] block text-center">
                    EXQUISITE MENU
                  </span>
                  
                  {/* Decorative divider */}
                  <div className="flex items-center justify-center gap-2 mt-1.5 mx-auto">
                    <div className="w-9 h-[1px] bg-[#C89A3D]/40" />
                    <div className="w-1.5 h-1.5 rotate-45 border border-[#C89A3D] bg-[#C89A3D]" />
                    <div className="w-9 h-[1px] bg-[#C89A3D]/40" />
                  </div>
                </div>

                {/* Compact 3-line Heading */}
                <h1 className="font-sans text-[22px] xl:text-[25px] font-bold text-[#222222] text-center leading-[1.2] tracking-tight my-1.5">
                  Explore Our<br />
                  Signature<br />
                  Dishes
                </h1>

                {/* Short Description */}
                <p className="text-[#666666] text-[12.5px] text-center leading-relaxed max-w-[230px] mx-auto">
                  A curated selection of flavors crafted with passion and the finest ingredients.
                </p>

                {/* Thin divider */}
                <div className="w-[75%] h-[1px] bg-[#EBE4D5] my-2 mx-auto" />

                {/* Three Feature Icons */}
                <div className="grid grid-cols-3 gap-1.5 w-full max-w-[240px] pt-1 text-center mx-auto">
                  
                  {/* Icon 1: Fresh Ingredients */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#444444] bg-[#EFEAE0]">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                      </svg>
                    </div>
                    <span className="text-[9.5px] font-medium text-[#444444] leading-tight text-center">
                      Fresh<br />Ingredients
                    </span>
                  </div>

                  {/* Icon 2: Expert Chefs */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#444444] bg-[#EFEAE0]">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 13.8a4.5 4.5 0 1 1 2.61-8.24A4.5 4.5 0 0 1 15.39 5.56 4.5 4.5 0 1 1 18 13.8"/>
                        <path d="M6 13.8V19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-5.2"/>
                        <line x1="6" y1="17" x2="18" y2="17"/>
                      </svg>
                    </div>
                    <span className="text-[9.5px] font-medium text-[#444444] leading-tight text-center">
                      Expert<br />Chefs
                    </span>
                  </div>

                  {/* Icon 3: Made with Love */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#444444] bg-[#EFEAE0]">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                      </svg>
                    </div>
                    <span className="text-[9.5px] font-medium text-[#444444] leading-tight text-center">
                      Made with<br />Love
                    </span>
                  </div>

                </div>

              </div>

              {/* Light Decorative Botanical Leaf Illustration */}
              <div className="absolute bottom-[-10px] left-[-10px] pointer-events-none opacity-15 text-[#C89A3D]">
                <svg width="130" height="130" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M20 180 C 60 140, 100 120, 180 80" />
                  <path d="M60 140 C 50 110, 70 90, 90 100 C 90 120, 70 140, 60 140" fill="currentColor" fillOpacity="0.1" />
                  <path d="M100 120 C 100 90, 120 70, 140 120 C 140 100, 120 120, 100 120" fill="currentColor" fillOpacity="0.1" />
                  <path d="M140 100 C 130 70, 150 50, 170 60 C 170 80, 150 100, 140 100" fill="currentColor" fillOpacity="0.1" />
                </svg>
              </div>

            </div>

            {/* ─── RIGHT SECTION (67% Width) — SINGLE FEATURED DISH SLIDER ───────── */}
            <div className="flex flex-col justify-between h-full bg-[#FFFDF8] relative overflow-hidden overscroll-contain">
              
              {/* Top Header & Carousel Content Wrapper */}
              <div className="flex-1 flex flex-col justify-between p-4 lg:p-5 pb-2">
                
                {/* Perfectly Centered Top Heading: ────── Swipe to Explore ➔ ────── */}
                <div className="w-full h-10 flex items-center justify-center gap-3.5 text-center mt-1.5 sm:mt-2 py-0">
                  <div className="w-12 sm:w-16 h-[1px] bg-[#C89A3D]" />
                  <h2 className="font-sans text-[14.5px] lg:text-[15.5px] font-semibold text-[#222222] tracking-wide flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <span>Swipe to Explore</span>
                    <span className="text-[#C89A3D] text-[15px]">➔</span>
                  </h2>
                  <div className="w-12 sm:w-16 h-[1px] bg-[#C89A3D]" />
                </div>

                {/* Single Dish Card Slider with INLINE FLANKED Navigation Arrows (Zero Excessive Gap) */}
                <div 
                  onWheel={handleWheel}
                  className="w-full flex-1 flex items-center justify-center gap-3 sm:gap-4 overflow-hidden py-1 px-2 touch-pan-x overscroll-contain"
                >
                  
                  {/* Left Navigation Arrow */}
                  <motion.button
                    onClick={handlePrev}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="z-40 w-10 h-10 rounded-full bg-white text-[#222222] flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.12)] border border-[#EFEAE0] cursor-pointer hover:border-[#C89A3D] transition-all duration-200 flex-shrink-0"
                    aria-label="Previous dish"
                  >
                    <FiChevronLeft size={19} />
                  </motion.button>

                  {/* COMPACT DISH CARD (w: 310px, h: 290px) */}
                  <div className="w-full max-w-[310px] relative flex justify-center items-center h-[290px] flex-shrink-0">
                    <AnimatePresence custom={direction} mode="wait">
                      <motion.div
                        key={activeIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={handleDragEnd}
                        className="w-full h-full rounded-[22px] bg-[#FFFDF8] border border-[#EFEAE0] shadow-[0_12px_36px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col justify-between cursor-grab active:cursor-grabbing relative"
                      >
                        {/* Top Hero Dish Image (175px height — ~60% of card) */}
                        <div className="h-[175px] w-full relative overflow-hidden bg-[#F3EDE2]">
                          <img
                            src={currentDish.image}
                            alt={currentDish.name}
                            className="w-full h-full object-cover object-center block"
                          />
                        </div>

                        {/* Compact Content Section (115px height — ~40% of card) */}
                        <div className="p-3 flex flex-col items-center justify-center text-center flex-1 bg-[#FFFDF8]">
                          {/* Dish Title */}
                          <h3 className="font-sans font-bold text-[17px] text-[#222222] leading-tight mb-1 text-center">
                            {currentDish.name}
                          </h3>

                          {/* Short Description */}
                          <p className="text-[#666666] text-[12px] leading-snug max-w-[270px] text-center mb-2">
                            {currentDish.description}
                          </p>

                          {/* Decorative gold accent line */}
                          <div className="flex items-center justify-center gap-1.5">
                            <div className="w-6 h-[1px] bg-[#C89A3D]/40" />
                            <div className="w-1.5 h-1.5 rotate-45 border border-[#C89A3D] bg-[#C89A3D]" />
                            <div className="w-6 h-[1px] bg-[#C89A3D]/40" />
                          </div>
                        </div>

                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Right Navigation Arrow */}
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="z-40 w-10 h-10 rounded-full bg-white text-[#222222] flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.12)] border border-[#EFEAE0] cursor-pointer hover:border-[#C89A3D] transition-all duration-200 flex-shrink-0"
                    aria-label="Next dish"
                  >
                    <FiChevronRight size={19} />
                  </motion.button>

                </div>

                {/* Pagination Dots (Hidden on phone view as requested) */}
                <div className="hidden sm:flex justify-center items-center gap-2 py-1.5">
                  {menuItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={`transition-all duration-300 cursor-pointer ${
                        idx === activeIndex
                          ? "w-6 h-2 bg-[#C89A3D] rounded-full"
                          : "w-2 h-2 bg-[#DED6C8] hover:bg-[#C89A3D]/50 rounded-full"
                      }`}
                      aria-label={`Go to dish ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>

              {/* ─── BOTTOM FOOTER BAR ────────────────────────────────────────── */}
              <div className="border-t border-[#EAE4D8] bg-[#FAF7F0] px-5 py-3 flex justify-center items-center">
                
                {/* Centered Serving Icon & Text */}
                <div className="flex items-center justify-center gap-2 text-center">
                  <div className="w-7 h-7 rounded-full bg-[#EFEAE0] flex items-center justify-center text-[#C89A3D] flex-shrink-0">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
                      <path d="M2 17h20"/>
                      <path d="M4 17c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
                      <path d="M2 20h20"/>
                    </svg>
                  </div>
                  <span className="text-[12px] text-[#555555] font-medium text-center">
                    Catering for Weddings, Corporate Events & Celebrations
                  </span>
                </div>

              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
