"use client";

import { useState } from "react";
import ClientMarquee from "@/components/ClientMarquee";
import {
  CateringHero,
  CateringCategories,
  OurLovedBites as ScrollScatter,
  CateringTestimonials,
  CateringUniqueness,
  PremiumMenuPopup,
} from "@/sections/catering-section";
import { HomeWhyChooseUsSection } from "@/sections/home-section";
import { HomeContactSection } from "@/sections/contact-section";

export default function CateringPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main>
      {/* 1. Hero Section */}
      <CateringHero
        onViewMenuClick={() => setIsMenuOpen(true)}
        items={[
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
        ]}
        background="#FFFFFF"
        titleColor="#000000"
        subheadlineColor="#666666"
        ctaBg="#000000"
        ctaText="#FFFFFF"
        titleFont={{ fontSize: "28px", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.2em" }}
        subheadlineFont={{ fontSize: "20px", fontWeight: "400", letterSpacing: "-0.01em", lineHeight: "1.3em" }}
        ctaFont={{ fontSize: "16px", fontWeight: "500" }}
        cardRadius="18px"
        cardShadow="0 10px 30px rgba(0,0,0,0.12)"
        activeScale={1.2}
        inactiveScale={0.86}
        inactiveOpacity={0.62}
        activeLift={18}
        dragSensitivity={0.18}
        springStiffness={520}
        springDamping={52}
        contentGap={12}
        arcTopPadding={280}
        itemSpacingDeg={0}
        contentLift={48}
        contentYOffset={0}
        cardSizeScale={0.75}
        imageAspect="square"
        portraitFactor={1.25}
        scrollEnabled={true}
        wheelSensitivity={0.06}
      />
      <ClientMarquee />

      {/* 2. Events We Cater */}
      <CateringCategories />

      {/* 3. Loved Bites */}
      <ScrollScatter />

      {/* 4. Why Choose Us */}
      <HomeWhyChooseUsSection showActions={false} />

      {/* 5. Catering Uniqueness */}
      <CateringUniqueness />

      {/* 6. Testimonial */}
      <CateringTestimonials />

      {/* 7. Contact Form */}
      <HomeContactSection
        email="srivaricaterers0511@gmail.com"
        certification={{
          src: "/images/catering/fssai.png",
          alt: "FSSAI Food Safety Certification Logo",
          label: "FSSAI Certified",
        }}
        logo={{
          src: "/images/catering/catering_logo.png",
          alt: "Sri Vari Catering Logo",
        }}
      />

      {/* Premium View Menu Popup Modal */}
      <PremiumMenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </main>
  );
}

