import ClientMarquee from "@/components/ClientMarquee";
import {
  AboutHero,
  AboutWhoWeAre,
  AboutFloatingPills,
  AboutWhatMakesUsBest,
} from "@/sections/about-section";

export const metadata = {
  title: "About Us | VP Associates",
  description: "Building Foundations, Fueling Passions, Fastening Talents. Learn about VP Associates leadership, workforce solutions, and engineering excellence.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutHero />
      <ClientMarquee />
      <AboutWhoWeAre />
      <AboutFloatingPills />
      <AboutWhatMakesUsBest />
    </main>
  );
}
