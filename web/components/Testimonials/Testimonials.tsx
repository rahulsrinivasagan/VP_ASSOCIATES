"use client"

import {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
    startTransition,
    type CSSProperties,
} from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
    quote: string
    name: string
    designation: string
    image: {
        src: string
        alt: string
    }
}

interface CircularTestimonialsProps {
    testimonials: Testimonial[]
    autoplay: boolean
    autoplayInterval: number
    nameColor: string
    designationColor: string
    quoteColor: string
    arrowBackground: string
    arrowForeground: string
    arrowHoverBackground: string
    nameFont: CSSProperties
    designationFont: CSSProperties
    quoteFont: CSSProperties
    maxQuoteLength: number
    backgroundColor: string
    style?: CSSProperties
}

function calculateGap(width: number) {
    const minWidth = 1024
    const maxWidth = 1456
    const minGap = 60
    const maxGap = 86
    if (width <= minWidth) return minGap
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth))
    return (
        minGap +
        ((maxGap - minGap) * (width - minWidth)) / (maxWidth - minWidth)
    )
}

/**
 * Circular Testimonials by Hamim Reza
 *
 * @framerIntrinsicWidth 900
 * @framerIntrinsicHeight 600
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function CircularTestimonials(props: CircularTestimonialsProps) {
    const {
        testimonials,
        autoplay,
        autoplayInterval,
        nameColor,
        designationColor,
        quoteColor,
        arrowBackground,
        arrowForeground,
        arrowHoverBackground,
        nameFont,
        designationFont,
        quoteFont,
        maxQuoteLength,
        backgroundColor,
    } = props

    const isStatic = false
    const [activeIndex, setActiveIndex] = useState(0)
    const [hoverPrev, setHoverPrev] = useState(false)
    const [hoverNext, setHoverNext] = useState(false)
    const [containerWidth, setContainerWidth] = useState(1200)
    const [isMobile, setIsMobile] = useState(false)

    const imageContainerRef = useRef<HTMLDivElement>(null)
    const autoplayIntervalRef = useRef<number | null>(null)

    const testimonialsLength = useMemo(
        () => testimonials.length,
        [testimonials]
    )
    const placeholderImage = useMemo(() => {
        const svg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#e5e7eb"/><text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>`
        return `data:image/svg+xml;base64,${btoa(svg)}`
    }, [])

    const activeTestimonial = useMemo(() => {
        if (testimonialsLength === 0) return null

        const testimonial = testimonials[activeIndex]
        let quote = testimonial.quote

        if (maxQuoteLength > 0 && quote.length > maxQuoteLength) {
            quote = quote.substring(0, maxQuoteLength).trim() + "..."
        }

        return {
            ...testimonial,
            quote,
            image: testimonial.image || {
                src: placeholderImage,
                alt: "Default testimonial image",
            },
        }
    }, [
        activeIndex,
        testimonials,
        maxQuoteLength,
        testimonialsLength,
        placeholderImage,
    ])

    useEffect(() => {
        function handleResize() {
            if (imageContainerRef.current) {
                startTransition(() =>
                    setContainerWidth(imageContainerRef.current!.offsetWidth)
                )
            }
        }
        handleResize()
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        function handleViewportChange() {
            if (typeof window !== "undefined") {
                const nextIsMobile = window.innerWidth < 768
                startTransition(() => setIsMobile(nextIsMobile))
            }
        }

        handleViewportChange()
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleViewportChange)
            return () =>
                window.removeEventListener("resize", handleViewportChange)
        }
    }, [])

    useEffect(() => {
        if (autoplay && typeof window !== "undefined" && !isStatic) {
            autoplayIntervalRef.current = window.setInterval(() => {
                startTransition(() =>
                    setActiveIndex((prev) => (prev + 1) % testimonialsLength)
                )
            }, autoplayInterval)
        }
        return () => {
            if (autoplayIntervalRef.current) {
                clearInterval(autoplayIntervalRef.current)
            }
        }
    }, [autoplay, testimonialsLength, autoplayInterval, isStatic])

    const handleNext = useCallback(() => {
        startTransition(() =>
            setActiveIndex((prev) => (prev + 1) % testimonialsLength)
        )
        if (autoplayIntervalRef.current)
            clearInterval(autoplayIntervalRef.current)
    }, [testimonialsLength])

    const handlePrev = useCallback(() => {
        startTransition(() =>
            setActiveIndex(
                (prev) => (prev - 1 + testimonialsLength) % testimonialsLength
            )
        )
        if (autoplayIntervalRef.current)
            clearInterval(autoplayIntervalRef.current)
    }, [testimonialsLength])

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault()
                handlePrev()
            }
            if (e.key === "ArrowRight") {
                e.preventDefault()
                handleNext()
            }
        },
        [handleNext, handlePrev]
    )

    function getImageStyle(index: number): CSSProperties {
        if (isMobile) {
            if (index === activeIndex) {
                return {
                    zIndex: 3,
                    opacity: 1,
                    pointerEvents: "auto",
                    transform: "none",
                    transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
                }
            }
            return {
                zIndex: 1,
                opacity: 0,
                pointerEvents: "none",
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            }
        }

        const gap = calculateGap(containerWidth)
        const maxStickUp = gap * 0.8
        const isActive = index === activeIndex
        const isLeft =
            (activeIndex - 1 + testimonialsLength) % testimonialsLength ===
            index
        const isRight = (activeIndex + 1) % testimonialsLength === index

        if (isActive) {
            return {
                zIndex: 3,
                opacity: 1,
                pointerEvents: "auto",
                transform:
                    "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            }
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            }
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            }
        }
        return {
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
            transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        }
    }

    const quoteVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    }

    const shouldAnimate = !isStatic

    const isFixedWidth = props?.style && props.style.width === "100%"
    const isFixedHeight = props?.style && props.style.height === "100%"

    if (testimonialsLength === 0) {
        return (
            <div
                style={{
                    ...props.style,
                    width: isFixedWidth ? "100%" : "auto",
                    height: isFixedHeight ? "100%" : "auto",
                    maxWidth: "56rem",
                    padding: "2rem",
                    position: "relative",
                    backgroundColor: backgroundColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "400px",
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        color: designationColor,
                        ...designationFont,
                    }}
                >
                    <p>No testimonials available.</p>
                    <p style={{ fontSize: "0.875em", marginTop: "0.5rem" }}>
                        Add testimonials using the property controls.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{
                ...props.style,
                width: isFixedWidth ? "100%" : "auto",
                height: isFixedHeight ? "100%" : "auto",
                maxWidth: "56rem",
                padding: "2rem",
                position: "relative",
                backgroundColor: backgroundColor,
                outline: "none",
            }}
        >
            <div
                style={{
                    display: "grid",
                    gap: isMobile ? "2rem" : "5rem",
                    gridTemplateColumns: "1fr",
                }}
                className="testimonial-grid"
            >
                <div
                    ref={imageContainerRef}
                    style={{
                        position: "relative",
                        width: "100%",
                        height: isMobile ? "240px" : "24rem",
                        perspective: "1000px",
                        overflow: isMobile ? "hidden" : "visible",
                    }}
                >
                    {testimonials.map((testimonial, index) => {
                        const image = testimonial.image || {
                            src: placeholderImage,
                            alt: "Default testimonial image",
                        }
                        return (
                            <img
                                key={image.src + index}
                                src={image.src}
                                alt={image.alt}
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "1.5rem",
                                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                                    ...getImageStyle(index),
                                }}
                            />
                        )
                    })}
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        position: "relative",
                        minHeight: isMobile ? "auto" : "400px",
                    }}
                >
                    {activeTestimonial &&
                        (shouldAnimate ? (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    variants={quoteVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <h3
                                        style={{
                                            color: nameColor,
                                            fontWeight: "bold",
                                            marginBottom: "0.25rem",
                                            ...nameFont,
                                        }}
                                    >
                                        {activeTestimonial.name}
                                    </h3>
                                    <p
                                        style={{
                                            color: designationColor,
                                            marginBottom: "2rem",
                                            ...designationFont,
                                        }}
                                    >
                                        {activeTestimonial.designation}
                                    </p>
                                    <motion.p
                                        style={{
                                            color: quoteColor,
                                            lineHeight: "1.75",
                                            ...quoteFont,
                                        }}
                                    >
                                        {activeTestimonial.quote
                                            .split(" ")
                                            .map((word, i) => (
                                                <motion.span
                                                    key={i}
                                                    initial={{
                                                        filter: "blur(10px)",
                                                        opacity: 0,
                                                        y: 5,
                                                    }}
                                                    animate={{
                                                        filter: "blur(0px)",
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.22,
                                                        ease: "easeInOut",
                                                        delay: 0.025 * i,
                                                    }}
                                                    style={{
                                                        display: "inline-block",
                                                    }}
                                                >
                                                    {word}&nbsp;
                                                </motion.span>
                                            ))}
                                    </motion.p>
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <div>
                                <h3
                                    style={{
                                        color: nameColor,
                                        fontWeight: "bold",
                                        marginBottom: "0.25rem",
                                        ...nameFont,
                                    }}
                                >
                                    {activeTestimonial.name}
                                </h3>
                                <p
                                    style={{
                                        color: designationColor,
                                        marginBottom: "2rem",
                                        ...designationFont,
                                    }}
                                >
                                    {activeTestimonial.designation}
                                </p>
                                <p
                                    style={{
                                        color: quoteColor,
                                        lineHeight: "1.75",
                                        ...quoteFont,
                                    }}
                                >
                                    {activeTestimonial.quote}
                                </p>
                            </div>
                        ))}

                    <div
                        style={{
                            display: "flex",
                            gap: isMobile ? "1rem" : "1.5rem",
                            position: isMobile ? "static" : "absolute",
                            bottom: isMobile ? "auto" : 0,
                            left: isMobile ? "auto" : 0,
                            marginTop: isMobile ? "1.5rem" : 0,
                        }}
                    >
                        <motion.button
                            suppressHydrationWarning
                            onClick={handlePrev}
                            onMouseEnter={() =>
                                startTransition(() => setHoverPrev(true))
                            }
                            onMouseLeave={() =>
                                startTransition(() => setHoverPrev(false))
                            }
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.92 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            aria-label="Previous testimonial"
                            style={{
                                width: "2.7rem",
                                height: "2.7rem",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                                border: "none",
                                backgroundColor: hoverPrev
                                    ? arrowHoverBackground
                                    : arrowBackground,
                            }}
                        >
                            <motion.svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={arrowForeground}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{ x: hoverPrev ? -3 : 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                            >
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </motion.svg>
                        </motion.button>
                        <motion.button
                            suppressHydrationWarning
                            onClick={handleNext}
                            onMouseEnter={() =>
                                startTransition(() => setHoverNext(true))
                            }
                            onMouseLeave={() =>
                                startTransition(() => setHoverNext(false))
                            }
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.92 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            aria-label="Next testimonial"
                            style={{
                                width: "2.7rem",
                                height: "2.7rem",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                                border: "none",
                                backgroundColor: hoverNext
                                    ? arrowHoverBackground
                                    : arrowBackground,
                            }}
                        >
                            <motion.svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={arrowForeground}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{ x: hoverNext ? 3 : 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </motion.svg>
                        </motion.button>
                    </div>
                </div>
            </div>
            <style>{`
                @media (min-width: 768px) {
                    .testimonial-grid {
                        grid-template-columns: 1fr 1fr !important;
                    }
                }
            `}</style>
        </div>
    )
}

