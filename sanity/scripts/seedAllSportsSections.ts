import { getCliClient } from "sanity/cli";

async function seedAllSections() {
  const client = getCliClient({ apiVersion: "2024-01-01" });
  console.log("Seeding canonical documents for all Sports page sections into Sanity dataset...");

  // 1. Hero Section
  await client.createOrReplace({
    _id: "sportsHeroSection-default",
    _type: "sportsHeroSection",
    title: "Sports Hero Section",
    eyebrow: "VP ASSOCIATES • SPORTS",
    headingLine1: "WHERE",
    headingLine2: "CHAMPIONS",
    headingLine3Accent: "ARE MADE",
    description: "Professional cricket infrastructure and tournament management built for excellence.",
    primaryBtnText: "Book Your Ground",
    primaryBtnLink: "#book-arena",
    secondaryBtnText: "Explore Sports",
    secondaryBtnLink: "#cricket-arena",
    featureStrip: [
      { _key: "fs1", label: "Cricket Grounds", iconName: "circle" },
      { _key: "fs2", label: "Turf Booking", iconName: "calendar" },
      { _key: "fs3", label: "Sports Events", iconName: "trophy" },
      { _key: "fs4", label: "Coaching Camps", iconName: "users" },
    ],
  });

  // 2. Philosophy Section
  await client.createOrReplace({
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
        _key: "c1",
        id: "competitive-spirit",
        title: "Competitive Spirit",
        desc: "Host exciting matches with professional-grade playing facilities and world-class scoring systems.",
      },
      {
        _key: "c2",
        id: "built-for-everyone",
        title: "Built for Everyone",
        desc: "Perfect for friends, families, schools, and corporate events—casual games to grand tournaments alike.",
      },
      {
        _key: "c3",
        id: "celebrate-together",
        title: "Celebrate Together",
        desc: "Turn every game into an unforgettable memory with your team—from post-match gatherings to full celebrations.",
      },
    ],
  });

  // 3. Cricket Arena Section
  await client.createOrReplace({
    _id: "sportsCricketArenaSection-default",
    _type: "sportsCricketArenaSection",
    title: "Sports Cricket Arena Section",
    eyebrow: "VP Associates • Sports Facility",
    headingLine1: "OUR CRICKET",
    headingAccent: "ARENA",
    description:
      "Step into a professionally maintained cricket facility built for champions and weekend warriors alike. From tournament-ready pitches and premium outfield to stadium floodlights and match-day facilities, every detail is crafted to deliver an unforgettable cricketing experience.",
    badgeNumber: "5+",
    badgeLabel: "Acres of Play",
    features: [
      {
        _key: "f1",
        id: "surface",
        title: "Professional Playing Surface",
        desc: "BCCI-standard pitch with premium outfield maintained for every session.",
      },
      {
        _key: "f2",
        id: "floodlights",
        title: "Stadium Floodlights",
        desc: "High-intensity LED floodlights for premium day-night match experiences.",
      },
      {
        _key: "f3",
        id: "tournament",
        title: "Tournament Ready",
        desc: "Full scoring, PA system, and logistics support for leagues and knockouts.",
      },
      {
        _key: "f4",
        id: "corporate",
        title: "Practice & Corporate Matches",
        desc: "Flexible bookings for training, corporate leagues, schools, and academies.",
      },
    ],
  });

  // 4. Passion & Performance Section
  await client.createOrReplace({
    _id: "sportsPassionSection-default",
    _type: "sportsPassionSection",
    title: "Sports Passion & Performance Section",
    eyebrow: "Crafted for Cricket Excellence",
    heading: "Where Passion Meets Performance",
    description:
      "Every player, from casual beginners to season-hardened professionals, deserves a world-class environment. We combine state-of-the-art turf pitches, comprehensive coaching infrastructure, and high-intensity match play options to elevate your cricket journey.",
    stat1Value: "100%",
    stat1Label: "Premium Turf",
    stat2Value: "24/7",
    stat2Label: "Floodlit Nets",
    highlightPanels: [
      {
        _key: "hp1",
        id: "turf-pitch",
        title: "Professional Turf & Pitch",
        desc: "Meticulously rolled pitches designed for genuine bounce and seam movement, offering a true match-day feel.",
      },
      {
        _key: "hp2",
        id: "floodlit-matches",
        title: "Floodlit Night Matches",
        desc: "Experience the thrill of night cricket under professional LED lights that bring full stadium atmosphere to life.",
      },
      {
        _key: "hp3",
        id: "practice-nets",
        title: "Coaching & Practice Nets",
        desc: "Top-tier training cages and bowling machines designed to help batsmen and bowlers hone their skills safely.",
      },
      {
        _key: "hp4",
        id: "tournaments-events",
        title: "Tournaments & Team Events",
        desc: "The ultimate venue for host leagues, corporate matches, and competitive club cricket meets year-round.",
      },
    ],
  });

  // 5. Sports Grounds & Video Showcase
  await client.createOrReplace({
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
  });

  // 6. Match CTA & Blueprint Section
  await client.createOrReplace({
    _id: "sportsMatchCTASection-default",
    _type: "sportsMatchCTASection",
    title: "Sports Match CTA & Blueprint Section",
    eyebrow: "Book the Arena",
    heading: "Book the Arena",
    description:
      "Everything you need for an unforgettable cricket experience, thoughtfully designed around one world-class venue.",
    hotspots: [
      { _key: "h1", id: "h1", icon: "🏏", title: "Professional Turf Pitch", desc: "BCCI-standard natural clay turf strip rolling out authentic seam and bounce." },
      { _key: "h2", id: "h2", icon: "🚗", title: "Ample Parking", desc: "Spacious secure parking area that comfortably handles match-day crowds." },
      { _key: "h3", id: "h3", icon: "🥤", title: "Premium Refreshments", desc: "Player pavilion equipped with energy drinks, supplements, and healthy snacks." },
      { _key: "h4", id: "h4", icon: "💡", title: "Stadium Floodlights", desc: "High-lux horizontal LED lights generating professional-grade night play." },
      { _key: "h5", id: "h5", icon: "🏟", title: "Spectator Seating", desc: "Elevated stadium gallery offering clear unobstructed viewing angles." },
      { _key: "h6", id: "h6", icon: "🏆", title: "Tournament Ready", desc: "Full automated live scoring, digital displays, and umpire stands." },
    ],
    stats: [
      { _key: "s1", label: "LOCATION", value: "Premium City Hub" },
      { _key: "s2", label: "GALLERY CAPACITY", value: "2,500+ Seating" },
      { _key: "s3", label: "AVAILABLE SLOTS", value: "Daily 5 AM - 11 PM" },
      { _key: "s4", label: "PITCH TYPES", value: "Clay Turf / Astro" },
      { _key: "s5", label: "PLAYER RATING", value: "4.9★ Elite Venue" },
    ],
  });

  console.log("All 6 Sports page canonical section documents successfully seeded into Sanity!");
}

seedAllSections().catch(console.error);
