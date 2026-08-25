import React from "react";
import HeroSection from "@/sections/sport-section/HeroSection";
import PhilosophySection from "@/sections/sport-section/PhilosophySection";
import CricketArenaSection from "@/sections/sport-section/CricketArenaSection";
import PassionSection from "@/sections/sport-section/PassionSection";
import TestimonialsSection from "@/sections/sport-section/TestimonialsSection";
import MatchCTASection from "@/sections/sport-section/MatchCTASection";
import {
  getSportsHeroData,
  getSportsPhilosophyData,
  getSportsCricketArenaData,
  getSportsPassionData,
  getSportsTestimonialsData,
  getSportsMatchCTAData,
} from "@/lib/sanity/fetch";

export const revalidate = 60; // Revalidate page data every 60s

export default async function SportPage() {
  const [
    heroData,
    philosophyData,
    cricketArenaData,
    passionData,
    testimonialsData,
    matchCTAData,
  ] = await Promise.all([
    getSportsHeroData(),
    getSportsPhilosophyData(),
    getSportsCricketArenaData(),
    getSportsPassionData(),
    getSportsTestimonialsData(),
    getSportsMatchCTAData(),
  ]);

  return (
    <main className="sport-page-wrapper min-h-screen">
      <HeroSection data={heroData || undefined} />
      <PhilosophySection data={philosophyData || undefined} />
      <CricketArenaSection data={cricketArenaData || undefined} />
      <MatchCTASection data={matchCTAData || undefined} />
      <PassionSection data={passionData || undefined} />
      <TestimonialsSection data={testimonialsData || undefined} />
    </main>
  );
}
