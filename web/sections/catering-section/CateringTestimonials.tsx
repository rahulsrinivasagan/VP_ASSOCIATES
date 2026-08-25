"use client";

import CircularTestimonials from "@/components/Testimonials";

const testimonials = [
  {
    quote:
      "VP Associates transformed our annual leadership summit into a culinary experience our team still talks about. The attention to detail and quality of food was simply outstanding.",
    name: "Rajesh Menon",
    designation: "HR Director · Infosys Ltd.",
    image: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=face",
      alt: "Rajesh Menon",
    },
  },
  {
    quote:
      "We've partnered with VP Associates for three consecutive years for our gala dinners. Their team is professional, creative, and they consistently exceed expectations.",
    name: "Priya Subramanian",
    designation: "Events Manager · Royal Meridian Hotel",
    image: {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&fit=crop&crop=face",
      alt: "Priya Subramanian",
    },
  },
  {
    quote:
      "From match-day buffets to award ceremonies, VP Associates have been our go-to caterers. The food quality is incredible and logistics are always flawless.",
    name: "Arun Krishnaswamy",
    designation: "Club Secretary · Chennai Cricket Club",
    image: {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&fit=crop&crop=face",
      alt: "Arun Krishnaswamy",
    },
  },
  {
    quote:
      "Our office lunch programme with VP Associates has boosted team morale significantly. Fresh, delicious, and always on time — it's been a game-changer for us.",
    name: "Lakshmi Raghavan",
    designation: "Office Administrator · Sundaram Finance",
    image: {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&fit=crop&crop=face",
      alt: "Lakshmi Raghavan",
    },
  },
];

export default function CateringTestimonials() {
  return (
    <section style={{ background: "#fffbf5", display: "flex", flexDirection: "column", alignItems: "center", padding: "5rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ee8132", display: "block" }}>
          What They Say
        </span>
        <h2 style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#0a0a0a", marginTop: "0.5rem", letterSpacing: "-0.02em" }}>
          Testimonials.
        </h2>
        <p style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)", color: "#5a4a50", fontSize: "16px", lineHeight: 1.6, maxWidth: "540px", margin: "0.75rem auto 0" }}>
          Real words from the companies and individuals who trust us with their most important moments.
        </p>
      </div>
      <CircularTestimonials
        testimonials={testimonials}
        autoplay={true}
        autoplayInterval={5500}
        nameColor="#1c1917"
        designationColor="#78716c"
        quoteColor="#44403c"
        arrowBackground="#1c1917"
        arrowForeground="#fffbf5"
        arrowHoverBackground="#b45309"
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
