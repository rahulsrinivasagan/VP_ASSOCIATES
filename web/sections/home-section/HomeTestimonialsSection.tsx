"use client";

import CircularTestimonials from "@/components/Testimonials";

const testimonials = [
  {
    quote:
      "Working with VP Associates was the single best investment we made in our product launch. The designs didn't just look incredible — they directly contributed to a 3.4× increase in our trial-to-paid conversion rate within the first 60 days.",
    name: "Marcus Chen",
    designation: "CEO & Co-Founder · Elara Labs",
    image: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=face",
      alt: "Marcus Chen",
    },
  },
  {
    quote:
      "I've worked with many designers over the years, but what sets VP Associates apart is the ability to translate complex business goals into elegant, functional interfaces. Our onboarding drop-off rate fell by 41% after the redesign.",
    name: "Sofia Andreessen",
    designation: "VP of Product · Strata Finance",
    image: {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&fit=crop&crop=face",
      alt: "Sofia Andreessen",
    },
  },
  {
    quote:
      "From the first discovery call, it was clear we were working with someone who thinks beyond aesthetics. The design system delivered has saved our engineering team hundreds of hours and our brand now looks cohesive across every touchpoint.",
    name: "James Okafor",
    designation: "Founder · Nodewave AI",
    image: {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&fit=crop&crop=face",
      alt: "James Okafor",
    },
  },
];

export default function HomeTestimonials() {
  return (
    <section style={{ background: "#FFF9FA", display: "flex", flexDirection: "column", alignItems: "center", padding: "5rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ee8132" }}>
          Client Stories
        </span>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0f0f0f", marginTop: "0.5rem", letterSpacing: "-0.03em" }}>
          What clients say.
        </h2>
        <p style={{ color: "#71717a", maxWidth: "40ch", margin: "0.75rem auto 0" }}>
          Real words from the founders and leaders who trust us with their digital products.
        </p>
      </div>
      <CircularTestimonials
        testimonials={testimonials}
        autoplay={true}
        autoplayInterval={5000}
        nameColor="#0f0f0f"
        designationColor="#71717a"
        quoteColor="#3f3f46"
        arrowBackground="#0f0f0f"
        arrowForeground="#FFF9FA"
        arrowHoverBackground="#ee8132"
        nameFont={{ fontSize: "1.75rem", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.2" }}
        designationFont={{ fontSize: "1rem", fontWeight: "400" }}
        quoteFont={{ fontSize: "1.1rem", fontWeight: "400", lineHeight: "1.75" }}
        maxQuoteLength={300}
        backgroundColor="transparent"
        style={{ width: "100%", height: "100%" }}
      />
    </section>
  );
}