import { getCliClient } from "sanity/cli";

async function seedSingleShowcase() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  console.log("Publishing canonical single Sports Grounds Showcase document into Sanity dataset...");

  const doc = {
    _id: "sportsTestimonialsSection-default",
    _type: "sportsTestimonialsSection",
    title: "Sports Grounds & Video Showcase",
    eyebrow: "SPORTS FACILITY SHOWCASE",
    heading: "Experience Our Sports Grounds",
    description:
      "Explore our professionally designed sporting environment built for competitive matches, academy training, corporate tournaments, and unforgettable sporting moments.",
    featuredStory: {
      label: "SPORTS FACILITY",
      title: "SPORTS GROUNDS & ARENA",
      subtitle: "Professionally Maintained Cricket Grounds",
      description:
        "A professionally designed sporting environment for matches, training, tournaments, and events.",
      duration: "1:45",
    },
    items: [
      {
        _key: "c1",
        id: "v1",
        title: "Competitive Cricket Arena",
        description: "BCCI-standard grass outfield and turf pitch.",
        duration: "2:45",
      },
      {
        _key: "c2",
        id: "v2",
        title: "Stadium Floodlights",
        description: "High-intensity LED lights for day-night matches.",
        duration: "1:52",
      },
      {
        _key: "c3",
        id: "v3",
        title: "Practice & Training Nets",
        description: "Dedicated bowling and batting practice cages.",
        duration: "3:10",
      },
      {
        _key: "c4",
        id: "v4",
        title: "Player Pavilion & Amenities",
        description: "Full changing rooms, spectator gallery, and parking.",
        duration: "4:05",
      },
    ],
  };

  await client.createOrReplace(doc);
  console.log("Single canonical Sports Grounds Showcase document published successfully!");
}

seedSingleShowcase().catch(console.error);
