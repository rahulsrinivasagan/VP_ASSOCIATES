/**
 * Seed script for VP Associates Sports Page document in Sanity Studio.
 * Run using: npx sanity exec scripts/seedSportsPage.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";

async function seed() {
  const client = getCliClient();
  console.log("Seeding initial Sports Page document into Sanity...");

  const sportsDoc = {
    _id: "sportsPage-default",
    _type: "sportsPage",
    title: "VP Associates Sports Page",
    slug: { _type: "slug", current: "sports" },

    hero: {
      eyebrow: "VP ASSOCIATES • SPORTS",
      headingLine1: "WHERE",
      headingLine2: "CHAMPIONS",
      headingLine3Accent: "ARE MADE",
      description:
        "Professional cricket infrastructure and tournament management built for excellence.",
      primaryBtnText: "Book Your Ground",
      primaryBtnLink: "#book-arena",
      secondaryBtnText: "Explore Sports",
      secondaryBtnLink: "#cricket-arena",
      featureStrip: [
        { label: "Cricket Grounds", iconName: "circle" },
        { label: "Turf Booking", iconName: "calendar" },
        { label: "Sports Events", iconName: "trophy" },
        { label: "Coaching Camps", iconName: "users" },
      ],
    },

    philosophy: {
      eyebrow: "VP Associates • Sports Arena",
      heading: "PLAY.",
      headingAccent: "COMPETE.",
      description:
        "Every game is more than a score—it's an experience. Whether it's a casual weekend match, an inter-corporate league, or a full-scale tournament, our world-class sporting venue is built to elevate every moment from first ball to final celebration.",
      cards: [
        {
          id: "competitive-spirit",
          title: "Competitive Spirit",
          desc: "Host exciting matches with professional-grade playing facilities and world-class scoring systems.",
        },
        {
          id: "built-for-everyone",
          title: "Built for Everyone",
          desc: "Perfect for friends, families, schools, and corporate events—casual games to grand tournaments alike.",
        },
        {
          id: "celebrate-together",
          title: "Celebrate Together",
          desc: "Turn every game into an unforgettable memory with your team—from post-match gatherings to full celebrations.",
        },
      ],
    },

    cricketArena: {
      eyebrow: "VP Associates • Sports Facility",
      headingLine1: "OUR CRICKET",
      headingAccent: "ARENA",
      description:
        "Step into a professionally maintained cricket facility built for champions and weekend warriors alike. From tournament-ready pitches and premium outfield to stadium floodlights and match-day facilities, every detail is crafted to deliver an unforgettable cricketing experience.",
      badgeNumber: "5+",
      badgeLabel: "Acres of Play",
      features: [
        {
          id: "surface",
          title: "Professional Playing Surface",
          desc: "BCCI-standard pitch with premium outfield maintained for every session.",
        },
        {
          id: "floodlights",
          title: "Stadium Floodlights",
          desc: "High-intensity LED floodlights for premium day-night match experiences.",
        },
        {
          id: "tournament",
          title: "Tournament Ready",
          desc: "Full scoring, PA system, and logistics support for leagues and knockouts.",
        },
        {
          id: "corporate",
          title: "Practice & Corporate Matches",
          desc: "Flexible bookings for training, corporate leagues, schools, and academies.",
        },
      ],
    },

    passionPerformance: {
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
          id: "turf-pitch",
          title: "Professional Turf & Pitch",
          desc: "Meticulously rolled pitches designed for genuine bounce and seam movement, offering a true match-day feel.",
        },
        {
          id: "floodlit-matches",
          title: "Floodlit Night Matches",
          desc: "Experience the thrill of night cricket under professional LED lights that bring full stadium atmosphere to life.",
        },
        {
          id: "practice-nets",
          title: "Coaching & Practice Nets",
          desc: "Top-tier training cages and bowling machines designed to help batsmen and bowlers hone their skills safely.",
        },
        {
          id: "tournaments-events",
          title: "Tournaments & Team Events",
          desc: "The ultimate venue for host leagues, corporate matches, and competitive club cricket meets year-round.",
        },
      ],
    },

    testimonials: {
      eyebrow: "Testimonials",
      heading: "Experience from Players",
      description:
        "Hear directly from players who have experienced unforgettable matches, competitive tournaments, and memorable moments at our cricket arena.",
      featuredStory: {
        name: "Sanjay Raghavan",
        role: "Player of the Tournament • Corporate Trophy",
        event: "Corporate Trophy 2026",
        quote:
          "Playing here felt closer to an international ground than any club facility I've seen. The grass outfield is fast, and the floodlights are spectacular.",
        duration: "4:20",
      },
      items: [
        {
          id: "t1",
          name: "Arjun Sharma",
          role: "Captain, Mavericks CC",
          event: "Corporate Cup 2026",
          quote: "The pitch played absolutely true from ball one. Light conditions were fantastic.",
          duration: "2:45",
          avatarText: "AS",
          avatarBg: "#EBF5FF",
        },
        {
          id: "t2",
          name: "Kabir Mehta",
          role: "Opening Bowler",
          event: "Weekend Matchday",
          quote: "Bowling under these floodlights felt like playing in an international stadium.",
          duration: "1:52",
          avatarText: "KM",
          avatarBg: "#FEF3C7",
        },
        {
          id: "t3",
          name: "Rohan Das",
          role: "Cricket Coach",
          event: "Academy Practice Sessions",
          quote: "Perfect training nets. The bounce is consistent, making it ideal for young talents.",
          duration: "3:10",
          avatarText: "RD",
          avatarBg: "#D1FAE5",
        },
        {
          id: "t4",
          name: "Vikram Malhotra",
          role: "Tournament Director",
          event: "Championship League",
          quote: "Organizing the league was seamless. Facilities, scoring, and parking were top-notch.",
          duration: "4:05",
          avatarText: "VM",
          avatarBg: "#FCE7F3",
        },
      ],
    },

    matchCTA: {
      eyebrow: "Book the Arena",
      heading: "Book the Arena",
      description:
        "Everything you need for an unforgettable cricket experience, thoughtfully designed around one world-class venue.",
      hotspots: [
        {
          id: "h1",
          icon: "🏏",
          title: "Professional Turf Pitch",
          desc: "BCCI-standard natural clay turf strip rolling out authentic seam and bounce.",
        },
        {
          id: "h2",
          icon: "🚗",
          title: "Ample Parking",
          desc: "Spacious secure parking area that comfortably handles match-day crowds.",
        },
        {
          id: "h3",
          icon: "🥤",
          title: "Premium Refreshments",
          desc: "Player pavilion equipped with energy drinks, supplements, and healthy snacks.",
        },
        {
          id: "h4",
          icon: "💡",
          title: "Stadium Floodlights",
          desc: "High-lux horizontal LED lights generating professional-grade night play.",
        },
        {
          id: "h5",
          icon: "🏟",
          title: "Spectator Seating",
          desc: "Elevated stadium gallery offering clear unobstructed viewing angles.",
        },
        {
          id: "h6",
          icon: "🏆",
          title: "Tournament Ready",
          desc: "Full automated live scoring, digital displays, and umpire stands.",
        },
      ],
      stats: [
        { label: "LOCATION", value: "Premium City Hub" },
        { label: "GALLERY CAPACITY", value: "2,500+ Seating" },
        { label: "AVAILABLE SLOTS", value: "Daily 5 AM - 11 PM" },
        { label: "PITCH TYPES", value: "Clay Turf / Astro" },
        { label: "PLAYER RATING", value: "4.9★ Elite Venue" },
      ],
    },
  };

  await client.createOrReplace(sportsDoc);
  console.log("Sports Page document successfully seeded into Sanity!");
}

seed().catch(console.error);
