"use client"

import { ReactLenis } from "lenis/react"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)
  const pathname = usePathname()

  // Immediately scroll to top when route changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.scrollTo(0, { immediate: true })
      }
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 50)
    }
  }, [pathname])

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Register GSAP plugins once at app root
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      let lenisInstance: any = null;
      let tickHandler: (time: number) => void;
      let refreshTimer: ReturnType<typeof setTimeout>;
      let rafId: number;

      const checkLenis = () => {
        lenisInstance = lenisRef.current?.lenis;
        if (lenisInstance) {
          // Sync Lenis with GSAP's ticker
          tickHandler = (time: number) => {
            lenisInstance.raf(time * 1000);
          };
          gsap.ticker.add(tickHandler);
          gsap.ticker.lagSmoothing(500, 33);

          // Register ScrollTrigger.update on Lenis's scroll event
          lenisInstance.on("scroll", () => {
            ScrollTrigger.update();
          });

          // Trigger initial update and refresh
          ScrollTrigger.update();
          refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
        } else {
          rafId = requestAnimationFrame(checkLenis);
        }
      };

      // Refresh when page fully loads (images, styles, etc.)
      const handleWindowLoad = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("load", handleWindowLoad);

      // Refresh when web fonts are ready
      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }

      // Handle tab visibility change to pause/resume Lenis and refresh ScrollTrigger
      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          lenisInstance?.stop();
        } else {
          lenisInstance?.start();
          // Small delay allows the browser rendering engine to re-draw before calculating bounds
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 150);
        }
      };

      checkLenis();
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        if (refreshTimer) {
          clearTimeout(refreshTimer);
        }
        if (tickHandler) {
          gsap.ticker.remove(tickHandler);
        }
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        window.removeEventListener("load", handleWindowLoad);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false}
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false, // native touch scroll on mobile
      }}
    >
      {children}
    </ReactLenis>
  )
}

