import { getCliClient } from "sanity/cli";

async function seedGroundsVideo() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  console.log("Publishing Sports Facility Grounds Video content into Sanity dataset...");

  const doc = {
    _id: "sportsTestimonialsSection-default",
    _type: "sportsTestimonialsSection",
    title: "Sports Testimonials & Video Showcase",
    eyebrow: "Testimonials & Video Showcase",
    heading: "Experience from Players & Facilities",
    description:
      "Explore our world-class cricket facilities and hear directly from players who have experienced unforgettable matches at our arena.",
    featuredStory: {
      badge: "SPORTS FACILITY",
      title: "WORLD-CLASS SPORTS GROUNDS",
      subtitle: "Premium Sporting Facilities • Built for Every Game",
      description:
        "Experience professionally designed sporting grounds built for matches, tournaments, training sessions, and unforgettable sporting moments.",
      duration: "1:45",
    },
    items: [
      {
        _key: "v1",
        id: "t1",
        title: "Competitive Cricket Arena",
        subtitle: "Tournament Ready Pitch",
        quote: "Professional pitch quality with BCCI-standard turf.",
        duration: "2:45",
        avatarText: "CA",
        avatarBg: "#EBF5FF",
      },
      {
        _key: "v2",
        id: "t2",
        title: "Floodlit Day-Night Matches",
        subtitle: "High-Lux LED Lights",
        quote: "Unmatched night cricket atmosphere under high-power LED floodlights.",
        duration: "1:52",
        avatarText: "FL",
        avatarBg: "#FEF3C7",
      },
      {
        _key: "v3",
        id: "t3",
        title: "Practice & Training Cages",
        subtitle: "Professional Coaching Nets",
        quote: "Ideal practice nets with true bounce for fast bowlers and batsmen.",
        duration: "3:10",
        avatarText: "PN",
        avatarBg: "#D1FAE5",
      },
      {
        _key: "v4",
        id: "t4",
        title: "Player Pavilion & Amenities",
        subtitle: "Luxury Sports Hub",
        quote: "Full player pavilion with seating, scoring, and parking.",
        duration: "4:05",
        avatarText: "PA",
        avatarBg: "#FCE7F3",
      },
    ],
  };

  await client.createOrReplace(doc);
  console.log("Sports Facility Grounds Video document published successfully!");
}

seedGroundsVideo().catch(console.error);
