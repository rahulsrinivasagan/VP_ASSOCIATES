import {
  ConstructionHero,
  ConstructionServices,
  ConstructionFeatures,
  ConstructionProjects,
  ManPowerCategory,
  ConstructionTestimonials,
  ConstructionFAQ,
  ConstructionContact,
} from "@/sections/construction-section";

export const metadata = {
  title: "VP Associates | Construction & Engineering",
  description: "Strategic construction and architectural engineering that delivers results. High-end commercial, residential, and turnkey infrastructure solutions.",
};

export default function ConstructionPage() {
  return (
    <main>
      <ConstructionHero />
      <ConstructionServices />
      <ConstructionFeatures />
      <ConstructionProjects />
      <ManPowerCategory />
      <ConstructionTestimonials />
      <ConstructionFAQ />
      <ConstructionContact />
    </main>
  );
}
