import {
  Hero,
  HomeCollageSection,
  HomeServicesSection,
  HomeWhyChooseUsSection,
  Process,
  HomeTestimonialsSection,
} from "@/sections/home-section";

export default function Home() {
  return (
    <>
      <main>
        {/* 1. Hero section */}
        <Hero />

        {/* 2. About company (As per Framer) */}
        <HomeCollageSection />

        {/* 3. Our Business divisions */}
        <HomeServicesSection />

        {/* 4. Why choose us */}
        <HomeWhyChooseUsSection />

        {/* 5. Work process */}
        <Process />

        {/* 6. Testimonials */}
        <HomeTestimonialsSection />
      </main>
    </>
  );
}
