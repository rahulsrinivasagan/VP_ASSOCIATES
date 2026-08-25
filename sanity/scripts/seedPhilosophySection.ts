/**
 * Seed script for Sports Philosophy Section in Sanity Studio.
 * Run using: npx sanity exec scripts/seedPhilosophySection.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

async function seed() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  console.log("Seeding Sports Philosophy Section document into Sanity...");

  const doc = {
    _id: "sportsPhilosophySection-default",
    _type: "sportsPhilosophySection",
    title: "Sports Philosophy Section",
    eyebrow: "VP Associates • Sports Arena",
    heading: "PLAY.",
    headingAccent: "COMPETE.",
    description:
      "Every game is more than a score—it's an experience. Whether it's a casual weekend match, an inter-corporate league, or a full-scale tournament, our world-class sporting venue is built to elevate every moment from first ball to final celebration.",
    cards: [
      {
        _key: "competitive-spirit-key",
        id: "competitive-spirit",
        title: "Competitive Spirit",
        desc: "Host exciting matches with professional-grade playing facilities and world-class scoring systems.",
      },
      {
        _key: "built-for-everyone-key",
        id: "built-for-everyone",
        title: "Built for Everyone",
        desc: "Perfect for friends, families, schools, and corporate events—casual games to grand tournaments alike.",
      },
      {
        _key: "celebrate-together-key",
        id: "celebrate-together",
        title: "Celebrate Together",
        desc: "Turn every game into an unforgettable memory with your team—from post-match gatherings to full celebrations.",
      },
    ],
  };

  await client.createOrReplace(doc);
  console.log("Sports Philosophy Section successfully seeded into Sanity!");
}

seed().catch(console.error);
