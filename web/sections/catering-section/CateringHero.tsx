"use client";

import * as React from "react";
import {
    motion,
    AnimatePresence,
    animate,
    useMotionValue,
    useMotionValueEvent,
    useReducedMotion,
    useTransform,
    type MotionValue,
} from "framer-motion";

type CarouselItem = {
    image: { src: string; srcSet?: string; alt?: string };
    title: string;
    subheadline: string;
    ctaLabel: string;
    ctaLink: string;
};

type Props = {
    items: CarouselItem[];
    background: string;
    titleColor: string;
    subheadlineColor: string;
    ctaBg: string;
    ctaText: string;
    titleFont: any;
    subheadlineFont: any;
    ctaFont: any;
    cardRadius: string;
    cardShadow: string;
    activeScale: number;
    inactiveScale: number;
    inactiveOpacity: number;
    activeLift: number;
    dragSensitivity: number;
    springStiffness: number;
    springDamping: number;
    contentGap: number;
    arcTopPadding: number;
    itemSpacingDeg: number;
    contentLift: number;
    contentYOffset: number;
    cardSizeScale: number;
    imageAspect: "square" | "portrait";
    portraitFactor: number;
    scrollEnabled: boolean;
    wheelSensitivity: number;
    style?: React.CSSProperties;
    onViewMenuClick?: () => void;
};

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function wrapAngleDeg(a: number) {
    let r = a % 360;
    if (r < -180) r += 360;
    if (r > 180) r -= 360;
    return r;
}

function shortestAngleDistanceDeg(a: number, b: number) {
    return Math.abs(wrapAngleDeg(a - b));
}

function cxFromSize(width: number) {
    return width / 2;
}

function pickArcParams(width: number) {
    if (width <= 480) {
        return { spanDeg: 75, radiusFactor: 0.88, tiltDeg: 0 };
    }
    if (width <= 768) {
        return { spanDeg: 95, radiusFactor: 0.78, tiltDeg: 0 };
    }
    return { spanDeg: 120, radiusFactor: 0.72, tiltDeg: 0 };
}

function cardBaseWidth(width: number) {
    if (width <= 480) return clamp(width * 0.48, 140, 210);
    if (width <= 768) return clamp(width * 0.34, 180, 260);
    return clamp(width * 0.24, 190, 280);
}

function cardBaseHeightFromWidth(
    w: number,
    aspect: "square" | "portrait",
    portraitFactor: number
) {
    if (aspect === "portrait") return w * portraitFactor;
    return w;
}

function computeBaseAngles(total: number, arcStart: number, arcEnd: number) {
    if (total <= 1) return [(-90 + arcStart + arcEnd) / 2];
    const res: number[] = [];
    for (let i = 0; i < total; i++) {
        const t = i / (total - 1);
        res.push(arcStart + (arcEnd - arcStart) * t);
    }
    return res;
}

function getWrappedTheta(angleDeg: number, rot: number, baseAnglesCount: number, step: number) {
    const totalRange = baseAnglesCount * step;
    const theta = angleDeg + rot;
    const relativeTheta = theta - (-90);
    const range = totalRange;
    const min = -totalRange / 2;
    const wrappedRelative = ((((relativeTheta - min) % range) + range) % range) + min;
    return wrappedRelative + (-90);
}

function getActiveIndex(
    rotationDeg: number,
    baseAngles: number[],
    focalDeg = -90
) {
    if (baseAngles.length <= 1) return 0;
    const step = baseAngles[1] - baseAngles[0];
    let best = 0;
    let bestD = Number.POSITIVE_INFINITY;
    for (let i = 0; i < baseAngles.length; i++) {
        const a = getWrappedTheta(baseAngles[i], rotationDeg, baseAngles.length, step);
        const d = shortestAngleDistanceDeg(a, focalDeg);
        if (d < bestD) {
            bestD = d;
            best = i;
        }
    }
    return best;
}

function rotationToBringIndexToFocal(
    index: number,
    baseAngles: number[],
    focalDeg = -90,
    currRot = 0
) {
    if (baseAngles.length <= 1) return focalDeg - (baseAngles[index] ?? 0);
    const step = baseAngles[1] - baseAngles[0];
    const wrappedAngle = getWrappedTheta(baseAngles[index] ?? -90, currRot, baseAngles.length, step);
    const dRot = wrapAngleDeg(focalDeg - wrappedAngle);
    return currRot + dRot;
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

function softEmphasisFromDistance(distDeg: number, maxDeg: number) {
    const t = clamp(distDeg / maxDeg, 0, 1);
    return 1 - easeOutCubic(t);
}

type ArcItemProps = {
    item: CarouselItem;
    index: number;
    total: number;
    rotation: MotionValue<number>;
    baseAngles: number[];
    width: number;
    height: number;
    radius: number;
    centerY: number;
    cardW: number;
    cardH: number;
    arcTiltDeg: number;
    cardRadius: string;
    cardShadow: string;
    activeScale: number;
    inactiveScale: number;
    inactiveOpacity: number;
    activeLift: number;
    onClick: () => void;
    isStatic: boolean;
};

function ArcItem(props: ArcItemProps) {
    const {
        item,
        index,
        rotation,
        baseAngles,
        width,
        radius,
        centerY,
        cardW,
        cardH,
        arcTiltDeg,
        cardRadius,
        cardShadow,
        activeScale,
        inactiveScale,
        inactiveOpacity,
        activeLift,
        onClick,
        isStatic,
    } = props;

    const angleDeg = baseAngles[index] ?? -90;
    const step = React.useMemo(() => {
        if (baseAngles.length <= 1) return 30;
        return baseAngles[1] - baseAngles[0];
    }, [baseAngles]);

    const getWrappedThetaVal = React.useCallback((rot: number) => {
        return getWrappedTheta(angleDeg, rot, baseAngles.length, step);
    }, [angleDeg, baseAngles.length, step]);

    const x = React.useMemo(() => {
        return (rot: number) => {
            const theta = (Math.PI / 180) * (getWrappedThetaVal(rot) + arcTiltDeg);
            const cx = cxFromSize(width);
            return cx + radius * Math.cos(theta) - cardW / 2;
        };
    }, [getWrappedThetaVal, arcTiltDeg, width, radius, cardW]);

    const y = React.useMemo(() => {
        return (rot: number) => {
            const theta = (Math.PI / 180) * (getWrappedThetaVal(rot) + arcTiltDeg);
            return centerY + radius * Math.sin(theta) - cardH / 2;
        };
    }, [getWrappedThetaVal, arcTiltDeg, radius, centerY, cardH]);

    const rotateZ = React.useMemo(() => {
        return (rot: number) => getWrappedThetaVal(rot) + arcTiltDeg + 90;
    }, [getWrappedThetaVal, arcTiltDeg]);

    const scale = React.useMemo(() => {
        return (rot: number) => {
            const a = getWrappedThetaVal(rot);
            const dist = shortestAngleDistanceDeg(a, -90);
            const e = softEmphasisFromDistance(dist, 60);
            return lerp(inactiveScale, activeScale, e);
        };
    }, [getWrappedThetaVal, inactiveScale, activeScale]);

    const opacity = React.useMemo(() => {
        return (rot: number) => {
            const a = getWrappedThetaVal(rot);
            const dist = shortestAngleDistanceDeg(a, -90);
            const e = softEmphasisFromDistance(dist, 80);
            const baseOpacity = lerp(inactiveOpacity, 1, e);
            
            // Fade out to 0 near the wrap boundary
            const maxVisibleDist = (baseAngles.length * step) / 2;
            const fadeStart = maxVisibleDist - 25;
            const fadeEnd = maxVisibleDist - 5;
            const fadeFactor = clamp((fadeEnd - dist) / (fadeEnd - fadeStart), 0, 1);
            
            return baseOpacity * fadeFactor;
        };
    }, [getWrappedThetaVal, inactiveOpacity, baseAngles.length, step]);

    const lift = React.useMemo(() => {
        return (rot: number) => {
            const a = getWrappedThetaVal(rot);
            const dist = shortestAngleDistanceDeg(a, -90);
            const e = softEmphasisFromDistance(dist, 55);
            return -activeLift * e;
        };
    }, [getWrappedThetaVal, activeLift]);

    const zIndex = React.useMemo(() => {
        return (rot: number) => {
            const a = getWrappedThetaVal(rot);
            const dist = shortestAngleDistanceDeg(a, -90);
            const e = softEmphasisFromDistance(dist, 80);
            return Math.round(10 + e * 1000);
        };
    }, [getWrappedThetaVal]);

    const mvX = React.useMemo(() => rotation.get(), [rotation]);
    void mvX;

    const xMv = useTransform(rotation, x);
    const yMv = useTransform(rotation, y);
    const rMv = useTransform(rotation, rotateZ);
    const sMv = useTransform(rotation, scale);
    const oMv = useTransform(rotation, opacity);
    const liftMv = useTransform(rotation, lift);
    const zMv = useTransform(rotation, zIndex);

    return (
        <motion.button
            suppressHydrationWarning
            type="button"
            aria-label={`Select ${item.title}`}
            onClick={isStatic ? undefined : onClick}
            onPointerDown={(e) => {
                e.stopPropagation();
            }}
            style={{
                position: "absolute",
                left: xMv,
                top: yMv,
                width: cardW,
                height: cardH,
                border: "none",
                padding: 0,
                margin: 0,
                background: "transparent",
                cursor: isStatic ? "default" : "pointer",
                zIndex: zMv as unknown as number,
                outline: "none",
                WebkitTapHighlightColor: "transparent",
                transformOrigin: "50% 50%",
                scale: sMv,
                rotate: rMv,
                opacity: oMv,
                y: liftMv,
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: cardRadius,
                    overflow: "hidden",
                    boxShadow: cardShadow,
                    background: "#F5F5F5",
                    position: "relative",
                }}
            >
                <img
                    src={item.image?.src}
                    srcSet={item.image?.srcSet}
                    alt={item.image?.alt ?? ""}
                    loading="eager"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                    }}
                    draggable={false}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0) 70%)",
                        pointerEvents: "none",
                    }}
                />
            </div>
        </motion.button>
    );
}

export default function ArcImageCarousel(props: Props) {
    const isStatic = false;
    const reducedMotion = useReducedMotion();

    const {
        items = [
            {
                image: {
                    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=85&fit=crop",
                    alt: "Corporate banquet event setup",
                },
                title: "Corporate Events",
                subheadline: "Elegant catering for professional gatherings and business meetings.",
                ctaLabel: "Book Now",
                ctaLink: "#contact",
            },
            {
                image: {
                    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=85&fit=crop",
                    alt: "Fine dining catering spread",
                },
                title: "Wedding Receptions",
                subheadline: "Exquisite culinary experiences for your special day.",
                ctaLabel: "Learn More",
                ctaLink: "#contact",
            },
            {
                image: {
                    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=85&fit=crop",
                    alt: "Elegant corporate meeting",
                },
                title: "Private Parties",
                subheadline: "Intimate dining experiences tailored to your celebration.",
                ctaLabel: "Get Started",
                ctaLink: "#contact",
            },
            {
                image: {
                    src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&q=85&fit=crop",
                    alt: "Premium food plating close-up",
                },
                title: "Gala Dinners",
                subheadline: "Grand scale catering for prestigious events and ceremonies.",
                ctaLabel: "Inquire",
                ctaLink: "#contact",
            },
            {
                image: {
                    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=85&fit=crop",
                    alt: "Creative workspace with food styling",
                },
                title: "Conferences",
                subheadline: "Seamless catering services for large-scale corporate conferences.",
                ctaLabel: "Details",
                ctaLink: "#contact",
            },
        ],
        background = "#FFFFFF",
        titleColor = "#000000",
        subheadlineColor = "#666666",
        ctaBg = "#000000",
        ctaText = "#FFFFFF",
        titleFont,
        subheadlineFont,
        ctaFont,
        cardRadius = "18px",
        cardShadow = "0 10px 30px rgba(0,0,0,0.12)",
        activeScale = 1.2,
        inactiveScale = 0.86,
        inactiveOpacity = 0.62,
        activeLift = 18,
        dragSensitivity = 0.18,
        springStiffness = 520,
        springDamping = 52,
        contentGap = 12,
        arcTopPadding = 280,
        itemSpacingDeg = 0,
        contentLift = 48,
        contentYOffset = 0,
        cardSizeScale = 0.75,
        imageAspect = "square",
        portraitFactor = 1.25,
        scrollEnabled = true,
        wheelSensitivity = 0.06,
        onViewMenuClick,
    } = props;

    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [size, setSize] = React.useState({ width: 900, height: 620 });

    const [contentH, setContentH] = React.useState<number>(0);
    const contentElRef = React.useRef<HTMLDivElement | null>(null);
    const contentRORef = React.useRef<ResizeObserver | null>(null);

    const setContentEl = React.useCallback((el: HTMLDivElement | null) => {
        contentElRef.current = el;

        if (typeof window === "undefined") return;

        contentRORef.current?.disconnect();
        contentRORef.current = null;

        if (!el) {
            React.startTransition(() => setContentH(0));
            return;
        }

        const update = () => {
            const next = Math.max(
                0,
                Math.round(el.getBoundingClientRect().height)
            );
            React.startTransition(() => setContentH(next));
        };

        update();

        if (typeof ResizeObserver !== "undefined") {
            const ro = new ResizeObserver(() => update());
            ro.observe(el);
            contentRORef.current = ro;
        }
    }, []);

    React.useEffect(() => {
        return () => {
            contentRORef.current?.disconnect();
            contentRORef.current = null;
        };
    }, []);

    React.useEffect(() => {
        if (typeof window === "undefined") return;
        if (!rootRef.current) return;

        const el = rootRef.current;
        const ro = new ResizeObserver((entries) => {
            const cr = entries?.[0]?.contentRect;
            if (!cr) return;
            React.startTransition(() =>
                setSize({
                    width: Math.max(1, cr.width),
                    height: Math.max(1, cr.height),
                })
            );
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const { spanDeg, radiusFactor, tiltDeg } = React.useMemo(
        () => pickArcParams(size.width),
        [size.width]
    );
    const focalDeg = -90;
    const arcStart = focalDeg - spanDeg / 2;
    const arcEnd = focalDeg + spanDeg / 2;

    const baseAngles = React.useMemo(() => {
        const total = items.length;
        if (total <= 1) return [focalDeg];
        const baseStep = spanDeg / (total - 1);
        const step = baseStep + itemSpacingDeg;
        const mid = (total - 1) / 2;
        const res: number[] = [];
        for (let i = 0; i < total; i++) {
            res.push(focalDeg + (i - mid) * step);
        }
        return res;
    }, [items.length, spanDeg, itemSpacingDeg]);

    const radius = React.useMemo(() => {
        const factor = size.width <= 480 ? 0.88 : size.width <= 1024 ? 0.46 : radiusFactor;
        const r = size.width * factor;
        const maxR = size.width <= 480 ? 240 : size.width <= 1024 ? 360 : 540;
        return clamp(r, 180, maxR);
    }, [size.width, radiusFactor]);

    const centerY = React.useMemo(() => {
        const top = size.width <= 768 ? 190 : size.width <= 1024 ? 200 : Math.min(arcTopPadding, 220);
        return top + radius;
    }, [arcTopPadding, radius, size.width]);

    const cardW = React.useMemo(() => {
        const base = cardBaseWidth(size.width);
        return clamp(base * cardSizeScale, 120, 380);
    }, [size.width, cardSizeScale]);
    const cardH = React.useMemo(
        () => cardBaseHeightFromWidth(cardW, imageAspect, portraitFactor),
        [cardW, imageAspect, portraitFactor]
    );

    const rotation = useMotionValue(0);
    const [activeIndex, setActiveIndex] = React.useState(() =>
        getActiveIndex(rotation.get(), baseAngles, focalDeg)
    );

    const didInitSnapRef = React.useRef(false);
    React.useEffect(() => {
        if (didInitSnapRef.current) return;
        if (items.length <= 0) return;
        didInitSnapRef.current = true;

        const idx = getActiveIndex(rotation.get(), baseAngles, focalDeg);
        const target = rotationToBringIndexToFocal(idx, baseAngles, focalDeg, rotation.get());
        rotation.set(target);
        React.startTransition(() => setActiveIndex(idx));
    }, [items.length, baseAngles, rotation]);

    const activeIndexRef = React.useRef(activeIndex);
    React.useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useMotionValueEvent(rotation, "change", (v) => {
        if (isStatic) return;
        const next = getActiveIndex(v, baseAngles, focalDeg);
        if (next !== activeIndexRef.current) {
            React.startTransition(() => setActiveIndex(next));
        }
    });

    React.useEffect(() => {
        const next = clamp(activeIndex, 0, Math.max(0, items.length - 1));
        if (next !== activeIndex)
            React.startTransition(() => setActiveIndex(next));
    }, [items.length, activeIndex]);

    const animRef = React.useRef<ReturnType<typeof animate> | null>(null);
    const wheelSnapTimeoutRef = React.useRef<number | null>(null);

    const animateRotationTo = React.useCallback(
        (target: number) => {
            if (isStatic) return;

            animRef.current?.stop();
            animRef.current = null;

            if (reducedMotion) {
                rotation.set(target);
                return;
            }

            animRef.current = animate(rotation, target, {
                type: "spring",
                stiffness: springStiffness,
                damping: springDamping,
                mass: 1,
            });
        },
        [isStatic, reducedMotion, rotation, springStiffness, springDamping]
    );

    const snapToNearest = React.useCallback(() => {
        if (isStatic) return;
        if (items.length <= 1) return;
        const idx = getActiveIndex(rotation.get(), baseAngles, focalDeg);
        const target = rotationToBringIndexToFocal(idx, baseAngles, focalDeg, rotation.get());
        animateRotationTo(target);
    }, [isStatic, items.length, rotation, baseAngles, animateRotationTo]);

    const pointerIdRef = React.useRef<number | null>(null);
    const isDraggingRef = React.useRef(false);
    const dragStartXRef = React.useRef(0);
    const dragStartRotRef = React.useRef(0);

    const lastInteractionTimeRef = React.useRef(0);
    const registerInteraction = React.useCallback(() => {
        lastInteractionTimeRef.current = Date.now();
    }, []);

    const onPointerDown = React.useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (isStatic) return;
            if (items.length <= 1) return;

            registerInteraction();
            pointerIdRef.current = e.pointerId;
            isDraggingRef.current = true;
            dragStartXRef.current = e.clientX;
            dragStartRotRef.current = rotation.get();

            animRef.current?.stop();
            animRef.current = null;

            e.currentTarget.setPointerCapture(e.pointerId);
        },
        [isStatic, items.length, rotation, registerInteraction]
    );

    const onPointerMove = React.useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (isStatic) return;
            if (!isDraggingRef.current) return;
            if (pointerIdRef.current !== e.pointerId) return;

            const dx = e.clientX - dragStartXRef.current;
            const next = dragStartRotRef.current + dx * (dragSensitivity * 0.6);
            rotation.set(next);
        },
        [isStatic, dragSensitivity, rotation]
    );

    const endPointer = React.useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (isStatic) return;
            if (pointerIdRef.current !== e.pointerId) return;

            isDraggingRef.current = false;
            pointerIdRef.current = null;

            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {
                // ignore
            }

            snapToNearest();
        },
        [isStatic, snapToNearest]
    );

    const goToIndex = React.useCallback(
        (idx: number) => {
            if (isStatic) return;
            if (items.length <= 1) return;
            const next = clamp(idx, 0, Math.max(0, items.length - 1));
            const target = rotationToBringIndexToFocal(
                next,
                baseAngles,
                focalDeg,
                rotation.get()
            );
            animateRotationTo(target);
        },
        [isStatic, items.length, baseAngles, rotation, animateRotationTo]
    );

    const goPrev = React.useCallback(() => {
        if (items.length <= 1) return;
        registerInteraction();
        const next = (activeIndexRef.current - 1 + items.length) % items.length;
        goToIndex(next);
    }, [items.length, goToIndex, registerInteraction]);

    const goNext = React.useCallback(() => {
        if (items.length <= 1) return;
        registerInteraction();
        const next = (activeIndexRef.current + 1) % items.length;
        goToIndex(next);
    }, [items.length, goToIndex, registerInteraction]);

    const onKeyDown = React.useCallback(
        (e: React.KeyboardEvent) => {
            if (isStatic) return;
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault();
                registerInteraction();
                const dir = e.key === "ArrowLeft" ? -1 : 1;
                const next = (activeIndexRef.current + dir + items.length) % items.length;
                goToIndex(next);
            }
        },
        [isStatic, items.length, goToIndex, registerInteraction]
    );

    const onWheel = React.useCallback(
        (e: React.WheelEvent) => {
            if (isStatic) return;
            if (!scrollEnabled) return;
            if (items.length <= 1) return;

            e.preventDefault();
            registerInteraction();
            const delta =
                Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            rotation.set(rotation.get() + delta * wheelSensitivity);

            if (typeof window !== "undefined") {
                if (wheelSnapTimeoutRef.current != null) {
                    window.clearTimeout(wheelSnapTimeoutRef.current);
                }
                wheelSnapTimeoutRef.current = window.setTimeout(() => {
                    snapToNearest();
                }, 140);
            }
        },
        [
            isStatic,
            scrollEnabled,
            items.length,
            rotation,
            wheelSensitivity,
            snapToNearest,
            registerInteraction,
        ]
    );

    // Autoplay implementation
    React.useEffect(() => {
        if (isStatic || items.length <= 1) return;

        const interval = setInterval(() => {
            const timeSinceInteraction = Date.now() - lastInteractionTimeRef.current;
            if (timeSinceInteraction >= 5000) {
                goNext();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isStatic, items.length, goNext]);

    const activeItem =
        items[clamp(activeIndex, 0, Math.max(0, items.length - 1))];

    const isMobile = size.width <= 480;

    const contentAreaTop = React.useMemo(() => {
        const topOfArc = centerY - radius;
        const bottomOfArc = centerY + radius;
        const safe = Math.min(bottomOfArc - cardH * 0.35, size.height * 0.6);
        return (
            Math.max(topOfArc + radius * 0.58, safe) -
            contentLift +
            contentYOffset +
            (isMobile ? 96 : 0)
        );
    }, [
        centerY,
        radius,
        cardH,
        size.height,
        contentLift,
        contentYOffset,
        isMobile,
    ]);

    return (
        <div
            ref={rootRef}
            style={{
                position: "relative",
                width: "100%",
                height: size.width <= 768 ? "510px" : size.width <= 1024 ? "clamp(500px, 62vh, 640px)" : "clamp(540px, 75vh, 700px)",
                maxHeight: size.width <= 768 ? "540px" : size.width <= 1024 ? "640px" : "720px",
                overflow: "hidden",
                background,
                paddingTop: size.width <= 768 ? "90px" : size.width <= 1024 ? "100px" : "120px",
                paddingBottom: size.width <= 768 ? "30px" : size.width <= 1024 ? "40px" : "50px",
                ...props.style,
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
            onLostPointerCapture={endPointer}
            onWheel={onWheel}
            tabIndex={0}
            onKeyDown={onKeyDown}
            role="region"
            aria-label="Arc carousel"
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background:
                        "radial-gradient(900px 500px at 50% 0%, rgba(0,0,0,0.06), rgba(0,0,0,0) 60%)",
                }}
            />
            
            <div
                style={{
                    position: "absolute",
                    bottom: size.width <= 768 ? "30px" : size.width <= 1024 ? "36px" : "48px",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zIndex: 2000,
                    pointerEvents: "none",
                }}
            >
                <h1
                    style={{
                        fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                        fontWeight: 700,
                        color: titleColor,
                        marginBottom: "0.5rem",
                        letterSpacing: "-0.02em",
                    }}
                >
                    Srivari Caterers
                </h1>
                <div style={{ pointerEvents: "auto", marginTop: "1rem" }}>
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewMenuClick?.();
                        }}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            padding: "12px 24px",
                            borderRadius: "999px",
                            border: "1px solid #d4af37",
                            background: "#FFFFFF",
                            color: "#1a1a1a",
                            fontSize: "15px",
                            fontWeight: "600",
                            cursor: "pointer",
                            boxShadow: "0 4px 14px rgba(212, 175, 55, 0.25)",
                            transition: "all 0.3s ease",
                            outline: "none",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.borderColor = "#c5a880";
                            e.currentTarget.style.boxShadow = "0 8px 22px rgba(212, 175, 55, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0px)";
                            e.currentTarget.style.borderColor = "#d4af37";
                            e.currentTarget.style.boxShadow = "0 4px 14px rgba(212, 175, 55, 0.25)";
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                            <line x1="6" y1="1" x2="6" y2="4"></line>
                            <line x1="10" y1="1" x2="10" y2="4"></line>
                            <line x1="14" y1="1" x2="14" y2="4"></line>
                        </svg>
                        View Menu
                    </button>
                </div>

            </div>
            <div style={{ position: "absolute", inset: 0 }}>
                {items.map((it, i) => (
                    <ArcItem
                        key={`${it.title}-${i}`}
                        item={it}
                        index={i}
                        total={items.length}
                        rotation={rotation}
                        baseAngles={baseAngles}
                        width={size.width}
                        height={size.height}
                        radius={radius}
                        centerY={centerY}
                        cardW={cardW}
                        cardH={cardH}
                        arcTiltDeg={tiltDeg}
                        cardRadius={cardRadius}
                        cardShadow={cardShadow}
                        activeScale={activeScale}
                        inactiveScale={inactiveScale}
                        inactiveOpacity={inactiveOpacity}
                        activeLift={activeLift}
                        isStatic={isStatic}
                        onClick={() => {
                            goToIndex(i);
                        }}
                    />
                ))}
            </div>

            {/* Active item details removed to match desktop aesthetic */}

            <div
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: size.width <= 768 ? 70 : 14,
                    display: "flex",
                    justifyContent: "center",
                    gap: 8,
                    pointerEvents: "none",
                    opacity: 0.7,
                }}
                aria-hidden="true"
            >
                {items.slice(0, 9).map((_, i) => {
                    const isOn = i === activeIndex;
                    return (
                        <div
                            key={i}
                            style={{
                                width: isOn ? 18 : 6,
                                height: 6,
                                borderRadius: 999,
                                background: isOn
                                    ? "rgba(0,0,0,0.55)"
                                    : "rgba(0,0,0,0.18)",
                                transition: reducedMotion
                                    ? "none"
                                    : "all 180ms ease",
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
