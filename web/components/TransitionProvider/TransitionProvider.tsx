"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
  useEffect,
  useTransition,
} from "react";
import { usePathname, useRouter } from "next/navigation";

// ─── Context ─────────────────────────────────────────────────
interface TransitionContextValue {
  navigate: (targetHref: string) => void;
  triggerLoader: (targetPath?: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  triggerLoader: () => {},
  isTransitioning: false,
});

export function useTransitionLoader() {
  return useContext(TransitionContext);
}

interface PendingNav {
  targetHref: string;
  targetPathname: string;
  targetHash: string;
  startTime: number;
}

// ─── Curtain Transition Provider ─────────────────────────────
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  // Animation Stages:
  // 'initial_mount' -> 'initial_fade_out' -> 'idle'
  // On Nav: 'curtain_enter' -> 'curtain_covered' -> 'curtain_exit' -> 'idle'
  const [stage, setStage] = useState<
    "initial_mount" | "initial_fade_out" | "idle" | "curtain_enter" | "curtain_covered" | "curtain_exit"
  >("initial_mount");

  const [animKey, setAnimKey] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // State refs
  const isNavigating = useRef(false);
  const isFirstMount = useRef(true);
  const pendingNavRef = useRef<PendingNav | null>(null);
  const transitionTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = () => {
    transitionTimeouts.current.forEach(clearTimeout);
    transitionTimeouts.current = [];
  };

  // Prefetch main routes to ensure fast transitions without network lag
  useEffect(() => {
    const routes = ["/", "/construction", "/catering", "/sport", "/about"];
    routes.forEach((route) => {
      try {
        router.prefetch(route);
      } catch {}
    });
  }, [router]);

  // Initial page load sequence (plays intro logo animation, then smoothly fades out)
  useEffect(() => {
    const t1 = setTimeout(() => {
      setStage("initial_fade_out");
      const t2 = setTimeout(() => {
        setStage("idle");
        isFirstMount.current = false;
      }, 420);
      transitionTimeouts.current.push(t2);
    }, 1850);
    transitionTimeouts.current.push(t1);

    return clearTimeouts;
  }, []);

  // Helper to complete the exit animation and reveal destination
  const performCurtainExit = useCallback((targetHash?: string) => {
    clearTimeouts();

    // 1. Position scroll behind the curtain while still fully covered
    if (targetHash) {
      const id = targetHash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        const navbarOffset = 80;
        const y = el.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "instant" as ScrollBehavior });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }

    // 2. Double RAF ensures browser has repainted the destination page behind the curtain
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setStage("curtain_exit");

        const tExit = setTimeout(() => {
          setStage("idle");
          isNavigating.current = false;
          pendingNavRef.current = null;
        }, 450);
        transitionTimeouts.current.push(tExit);
      });
    });
  }, []);

  // Centralized Navigation Handler
  const navigate = useCallback((targetHref: string) => {
    // 1. Guard against overlapping navigation
    if (isNavigating.current) return;

    let targetUrl: URL;
    try {
      targetUrl = new URL(targetHref, window.location.href);
    } catch {
      return;
    }

    const currentPath = window.location.pathname;
    const isSamePage = targetUrl.pathname === currentPath;

    // Handle same-page navigation (e.g. /#services on home, or /construction#contact on construction)
    if (isSamePage) {
      if (targetUrl.hash) {
        const id = targetUrl.hash.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const navbarOffset = 80;
          const y = el.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
          window.scrollTo({
            top: Math.max(0, y),
            behavior: "smooth",
          });
          window.history.pushState(null, "", targetUrl.hash);
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Cross-page navigation: Lock and start curtain transition
    isNavigating.current = true;
    clearTimeouts();
    setAnimKey((k) => k + 1);

    const navStartTime = Date.now();
    pendingNavRef.current = {
      targetHref,
      targetPathname: targetUrl.pathname,
      targetHash: targetUrl.hash,
      startTime: navStartTime,
    };

    // Step A: Mount curtain at translateY(100%)
    setStage("curtain_enter");

    // Step B: Trigger CSS transition to translateY(0)
    const tCover = setTimeout(() => {
      setStage("curtain_covered");
    }, 20);
    transitionTimeouts.current.push(tCover);

    // Step C: Once viewport is 100% covered (~420ms), trigger Next.js route change behind curtain
    const tRoute = setTimeout(() => {
      startTransition(() => {
        router.push(targetHref);
      });
    }, 420);
    transitionTimeouts.current.push(tRoute);

    // Safety fallback: if navigation fails to change route within 4.5s, exit safely
    const tSafety = setTimeout(() => {
      if (isNavigating.current) {
        performCurtainExit(targetUrl.hash);
      }
    }, 4500);
    transitionTimeouts.current.push(tSafety);
  }, [router, performCurtainExit]);

  // Route change listener: Triggers when the destination page actually mounts in the DOM
  useEffect(() => {
    if (isFirstMount.current) return;
    if (!pendingNavRef.current) return;

    const currentNav = pendingNavRef.current;

    // Check if the router has resolved to our target route
    if (pathname === currentNav.targetPathname) {
      const elapsed = Date.now() - currentNav.startTime;
      const MIN_DISPLAY_DURATION = 800; // Guarantees complete and beautiful logo animation
      const remaining = Math.max(0, MIN_DISPLAY_DURATION - elapsed);

      const tReveal = setTimeout(() => {
        performCurtainExit(currentNav.targetHash);
      }, remaining);

      transitionTimeouts.current.push(tReveal);
    }
  }, [pathname, performCurtainExit]);

  const triggerLoader = useCallback((targetPath?: string) => {
    if (targetPath) {
      navigate(targetPath);
    }
  }, [navigate]);

  // Intercept all internal anchor clicks for smooth, centralized curtain transitions
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;

      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external or non-nav links
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        target.getAttribute("target") === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.href);
        if (targetUrl.origin === window.location.origin) {
          e.preventDefault();
          navigate(href);
        }
      } catch {
        // Ignore malformed URLs
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, [navigate]);

  // Typewriting logic for "ASSOCIATES"
  const isCovered = stage === "initial_mount" || stage === "curtain_enter" || stage === "curtain_covered";

  useEffect(() => {
    if (!isCovered) {
      setTypedText("");
      setIsTyping(false);
      return;
    }
    const text = "ASSOCIATES";
    let currentIdx = 0;
    setTypedText("");
    setIsTyping(false);

    const delay = stage === "initial_mount" ? 850 : 120;

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      const interval = setInterval(() => {
        if (currentIdx < text.length) {
          currentIdx++;
          setTypedText(text.slice(0, currentIdx));
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [isCovered, animKey, stage]);

  // CSS class mapping for the curtain overlay
  const getCurtainClass = () => {
    switch (stage) {
      case "initial_mount":
        return "vp-transition-overlay vp-curtain-initial";
      case "initial_fade_out":
        return "vp-transition-overlay vp-curtain-initial vp-curtain-fade-out";
      case "curtain_enter":
        return "vp-transition-overlay vp-curtain-enter";
      case "curtain_covered":
        return "vp-transition-overlay vp-curtain-covered";
      case "curtain_exit":
        return "vp-transition-overlay vp-curtain-exit";
      default:
        return "";
    }
  };

  const isVisible = stage !== "idle";

  return (
    <TransitionContext.Provider
      value={{
        navigate,
        triggerLoader,
        isTransitioning: stage !== "idle",
      }}
    >
      {/* Solid full-screen curtain overlay */}
      {isVisible && (
        <div className={getCurtainClass()} aria-hidden="true">
          <div className="vp-transition-logo-wrap" key={animKey}>
            <svg viewBox="0 0 520 400" className="vp-logo-svg-animated" aria-hidden="true">
              <defs>
                <clipPath id="vp-logo-horizontal-clip">
                  <rect x="0" y="70" width="520" height="290" />
                </clipPath>
              </defs>

              <g clipPath="url(#vp-logo-horizontal-clip)">
                {/* V left leg - orange */}
                <path
                  d="M 115 50 L 211 380"
                  stroke="#ee8132"
                  strokeWidth="58"
                  strokeLinecap="butt"
                  fill="none"
                  className="logo-path-v-left"
                />

                {/* V right leg Stripe 1 - green */}
                <path
                  d="M 221 380 L 317 50"
                  stroke="#345e2a"
                  strokeWidth="18"
                  strokeLinecap="butt"
                  fill="none"
                  className="logo-path-v-right-1"
                />

                {/* V right leg Stripe 2 - green */}
                <path
                  d="M 249 380 L 345 50"
                  stroke="#345e2a"
                  strokeWidth="18"
                  strokeLinecap="butt"
                  fill="none"
                  className="logo-path-v-right-2"
                />
              </g>

              {/* P loop - orange */}
              <path
                d="M 333 87.5 L 415 87.5 C 455 87.5, 475 105, 475 130 C 475 155, 455 172.5, 415 172.5 L 297 172.5"
                stroke="#ee8132"
                strokeWidth="35"
                strokeLinecap="butt"
                fill="none"
                className="logo-path-p-loop"
              />

              {/* Typewritten ASSOCIATES text */}
              <text x="270" y="347" className="vp-logo-text-associates">
                {typedText}
                {isTyping && <tspan className="vp-typewriter-cursor">|</tspan>}
              </text>
            </svg>

            {/* Hairline Progress Bar */}
            <div className="vp-transition-progress-container">
              <div className="vp-transition-progress-fill" />
            </div>
          </div>
        </div>
      )}
      {children}
    </TransitionContext.Provider>
  );
}
