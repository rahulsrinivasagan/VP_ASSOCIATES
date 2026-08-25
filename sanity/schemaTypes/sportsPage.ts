import { defineType, defineField } from "sanity";

export const sportsPage = defineType({
  name: "sportsPage",
  title: "Sports Page",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero Section" },
    { name: "philosophy", title: "2. Philosophy Section" },
    { name: "cricketArena", title: "3. Cricket Arena Section" },
    { name: "passionPerformance", title: "4. Passion & Performance Section" },
    { name: "testimonials", title: "5. Testimonials & Video Showcase" },
    { name: "matchCTA", title: "6. Match CTA & Blueprint Section" },
    { name: "gallery", title: "7. Sports Media Gallery" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "VP Associates Sports Page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      initialValue: { current: "sports" },
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // 1. HERO SECTION FIELDS (Direct Fields under "1. Hero Section" tab)
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: "heroStadiumImage",
      title: "Hero Background / Stadium Image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "Primary stadium background image for the Sports page hero.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Accessibility text describing the image.",
        }),
      ],
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Background Video File",
      type: "file",
      group: "hero",
      options: {
        accept: "video/mp4,video/webm,video/ogg",
      },
      description: "MP4/WebM video asset for hero background loop.",
    }),
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow Text",
      type: "string",
      group: "hero",
      initialValue: "VP ASSOCIATES • SPORTS",
    }),
    defineField({
      name: "heroHeadingLine1",
      title: "Heading Line 1",
      type: "string",
      group: "hero",
      initialValue: "WHERE",
    }),
    defineField({
      name: "heroHeadingLine2",
      title: "Heading Line 2",
      type: "string",
      group: "hero",
      initialValue: "CHAMPIONS",
    }),
    defineField({
      name: "heroHeadingLine3Accent",
      title: "Heading Line 3 (Orange Accent)",
      type: "string",
      group: "hero",
      initialValue: "ARE MADE",
    }),
    defineField({
      name: "heroDescription",
      title: "Paragraph Description",
      type: "text",
      group: "hero",
      rows: 3,
      initialValue:
        "Professional cricket infrastructure and tournament management built for excellence.",
    }),
    defineField({
      name: "heroPrimaryBtnText",
      title: "Primary Button Text",
      type: "string",
      group: "hero",
      initialValue: "Book Your Ground",
    }),
    defineField({
      name: "heroPrimaryBtnLink",
      title: "Primary Button Target Link",
      type: "string",
      group: "hero",
      initialValue: "#book-arena",
    }),
    defineField({
      name: "heroSecondaryBtnText",
      title: "Secondary Button Text",
      type: "string",
      group: "hero",
      initialValue: "Explore Sports",
    }),
    defineField({
      name: "heroSecondaryBtnLink",
      title: "Secondary Button Target Link",
      type: "string",
      group: "hero",
      initialValue: "#cricket-arena",
    }),
    defineField({
      name: "heroFeatureStrip",
      title: "Bottom Feature Strip Items",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Item Label", type: "string" }),
            defineField({ name: "iconName", title: "Icon Name", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "iconName" },
          },
        },
      ],
      initialValue: [
        { label: "Cricket Grounds", iconName: "circle" },
        { label: "Turf Booking", iconName: "calendar" },
        { label: "Sports Events", iconName: "trophy" },
        { label: "Coaching Camps", iconName: "users" },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // 2. PHILOSOPHY SECTION FIELDS (Direct Fields under "2. Philosophy Section" tab)
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: "philosophyEyebrow",
      title: "Eyebrow Text",
      type: "string",
      group: "philosophy",
      initialValue: "VP Associates • Sports Arena",
    }),
    defineField({
      name: "philosophyHeading",
      title: "Heading Title",
      type: "string",
      group: "philosophy",
      initialValue: "PLAY.",
    }),
    defineField({
      name: "philosophyHeadingAccent",
      title: "Heading Accent Word",
      type: "string",
      group: "philosophy",
      initialValue: "COMPETE.",
    }),
    defineField({
      name: "philosophyDescription",
      title: "Section Description",
      type: "text",
      group: "philosophy",
      rows: 3,
      initialValue:
        "Every game is more than a score—it's an experience. Whether it's a casual weekend match, an inter-corporate league, or a full-scale tournament, our world-class sporting venue is built to elevate every moment from first ball to final celebration.",
    }),
    defineField({
      name: "philosophyCards",
      title: "Philosophy Feature Cards (Repeatable & Reorderable)",
      type: "array",
      group: "philosophy",
      description: "Cards for Competitive Spirit, Built for Everyone, Celebrate Together",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "Card ID", type: "string" }),
            defineField({ name: "title", title: "Card Title", type: "string" }),
            defineField({ name: "desc", title: "Card Description", type: "text", rows: 2 }),
            defineField({
              name: "image",
              title: "Card Image",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt Text", type: "string" }],
            }),
            defineField({
              name: "video",
              title: "Card Video Clip (Optional)",
              type: "file",
              options: { accept: "video/mp4,video/webm" },
            }),
            defineField({ name: "icon", title: "Icon Identifier (Optional)", type: "string" }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "desc",
              media: "image",
            },
          },
        },
      ],
      initialValue: [
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
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // 3. CRICKET ARENA SECTION FIELDS (Direct Fields under "3. Cricket Arena Section" tab)
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: "cricketArenaMainImage",
      title: "Main Arena Showcase Image",
      type: "image",
      group: "cricketArena",
      options: { hotspot: true },
      description: "Primary showcase image of the cricket stadium.",
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    }),
    defineField({
      name: "cricketArenaVideo",
      title: "Arena Showcase Video (Optional)",
      type: "file",
      group: "cricketArena",
      options: { accept: "video/mp4,video/webm" },
      description: "Video asset for the cricket arena section.",
    }),
    defineField({
      name: "cricketArenaGalleryImages",
      title: "Section Gallery Images",
      type: "array",
      group: "cricketArena",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt Text", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "cricketArenaEyebrow",
      title: "Eyebrow Text",
      type: "string",
      group: "cricketArena",
      initialValue: "VP Associates • Sports Facility",
    }),
    defineField({
      name: "cricketArenaHeadingLine1",
      title: "Heading Line 1",
      type: "string",
      group: "cricketArena",
      initialValue: "OUR CRICKET",
    }),
    defineField({
      name: "cricketArenaHeadingAccent",
      title: "Heading Accent Word",
      type: "string",
      group: "cricketArena",
      initialValue: "ARENA",
    }),
    defineField({
      name: "cricketArenaDescription",
      title: "Section Paragraph",
      type: "text",
      group: "cricketArena",
      rows: 4,
      initialValue:
        "Step into a professionally maintained cricket facility built for champions and weekend warriors alike. From tournament-ready pitches and premium outfield to stadium floodlights and match-day facilities, every detail is crafted to deliver an unforgettable cricketing experience.",
    }),
    defineField({
      name: "cricketArenaBadgeNumber",
      title: "Stat Badge Number (e.g. 5+)",
      type: "string",
      group: "cricketArena",
      initialValue: "5+",
    }),
    defineField({
      name: "cricketArenaBadgeLabel",
      title: "Stat Badge Label (e.g. Acres of Play)",
      type: "string",
      group: "cricketArena",
      initialValue: "Acres of Play",
    }),
    defineField({
      name: "cricketArenaFeatures",
      title: "Arena Feature Highlights Grid (Repeatable & Reorderable)",
      type: "array",
      group: "cricketArena",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "Feature ID", type: "string" }),
            defineField({ name: "title", title: "Feature Title", type: "string" }),
            defineField({ name: "desc", title: "Feature Description", type: "text", rows: 2 }),
            defineField({
              name: "image",
              title: "Feature Image (Optional)",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt Text", type: "string" }],
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "desc", media: "image" },
          },
        },
      ],
      initialValue: [
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
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // 4. PASSION & PERFORMANCE SECTION FIELDS (Direct Fields under "4. Passion & Performance Section" tab)
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: "passionMainImage",
      title: "Section Visual Image",
      type: "image",
      group: "passionPerformance",
      options: { hotspot: true },
      description: "Main cricket nets / pitch image.",
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    }),
    defineField({
      name: "passionVideo",
      title: "Section Video Clip (Optional)",
      type: "file",
      group: "passionPerformance",
      options: { accept: "video/mp4,video/webm" },
    }),
    defineField({
      name: "passionGalleryImages",
      title: "Section Gallery Images",
      type: "array",
      group: "passionPerformance",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt Text", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "passionEyebrow",
      title: "Eyebrow Text",
      type: "string",
      group: "passionPerformance",
      initialValue: "Crafted for Cricket Excellence",
    }),
    defineField({
      name: "passionHeading",
      title: "Heading Title",
      type: "string",
      group: "passionPerformance",
      initialValue: "Where Passion Meets Performance",
    }),
    defineField({
      name: "passionDescription",
      title: "Section Paragraph",
      type: "text",
      group: "passionPerformance",
      rows: 4,
      initialValue:
        "Every player, from casual beginners to season-hardened professionals, deserves a world-class environment. We combine state-of-the-art turf pitches, comprehensive coaching infrastructure, and high-intensity match play options to elevate your cricket journey.",
    }),
    defineField({
      name: "passionStat1Value",
      title: "Floating Stat 1 Value",
      type: "string",
      group: "passionPerformance",
      initialValue: "100%",
    }),
    defineField({
      name: "passionStat1Label",
      title: "Floating Stat 1 Label",
      type: "string",
      group: "passionPerformance",
      initialValue: "Premium Turf",
    }),
    defineField({
      name: "passionStat2Value",
      title: "Floating Stat 2 Value",
      type: "string",
      group: "passionPerformance",
      initialValue: "24/7",
    }),
    defineField({
      name: "passionStat2Label",
      title: "Floating Stat 2 Label",
      type: "string",
      group: "passionPerformance",
      initialValue: "Floodlit Nets",
    }),
    defineField({
      name: "passionHighlightPanels",
      title: "Stacked Feature Cards (Repeatable & Reorderable)",
      type: "array",
      group: "passionPerformance",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "Panel ID", type: "string" }),
            defineField({ name: "title", title: "Panel Title", type: "string" }),
            defineField({ name: "desc", title: "Panel Description", type: "text", rows: 2 }),
            defineField({
              name: "image",
              title: "Panel Image (Optional)",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", title: "Alt Text", type: "string" }],
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "desc", media: "image" },
          },
        },
      ],
      initialValue: [
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
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // 5. TESTIMONIALS SECTION FIELDS (Direct Fields under "5. Testimonials & Video Showcase" tab)
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: "testimonialsEyebrow",
      title: "Eyebrow Text",
      type: "string",
      group: "testimonials",
      initialValue: "Testimonials",
    }),
    defineField({
      name: "testimonialsHeading",
      title: "Heading Title",
      type: "string",
      group: "testimonials",
      initialValue: "Experience from Players",
    }),
    defineField({
      name: "testimonialsDescription",
      title: "Section Description",
      type: "text",
      group: "testimonials",
      rows: 3,
      initialValue:
        "Hear directly from players who have experienced unforgettable matches, competitive tournaments, and memorable moments at our cricket arena.",
    }),
    defineField({
      name: "testimonialsFeaturedStory",
      title: "Featured Video Documentary Story",
      type: "object",
      group: "testimonials",
      fields: [
        defineField({
          name: "thumbnail",
          title: "Featured Story Poster / Thumbnail Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "videoFile",
          title: "Featured Story Video File",
          type: "file",
          options: { accept: "video/mp4,video/webm" },
          description: "Documentary video file asset.",
        }),
        defineField({ name: "name", title: "Athlete / Player Name", type: "string" }),
        defineField({ name: "role", title: "Player Role / Title", type: "string" }),
        defineField({ name: "event", title: "Tournament / Event Name", type: "string" }),
        defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
        defineField({ name: "duration", title: "Video Duration", type: "string" }),
      ],
      initialValue: {
        name: "Sanjay Raghavan",
        role: "Player of the Tournament • Corporate Trophy",
        event: "Corporate Trophy 2026",
        quote:
          "Playing here felt closer to an international ground than any club facility I've seen. The grass outfield is fast, and the floodlights are spectacular.",
        duration: "4:20",
      },
    }),
    defineField({
      name: "testimonialsItems",
      title: "Player Testimonial Video Cards (Repeatable & Reorderable)",
      type: "array",
      group: "testimonials",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "Testimonial ID", type: "string" }),
            defineField({ name: "name", title: "Player Name", type: "string" }),
            defineField({ name: "role", title: "Player Role", type: "string" }),
            defineField({ name: "event", title: "Event Name", type: "string" }),
            defineField({ name: "quote", title: "Player Quote", type: "text", rows: 2 }),
            defineField({ name: "duration", title: "Video Duration", type: "string" }),
            defineField({
              name: "thumbnail",
              title: "Video Poster / Thumbnail Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "videoFile",
              title: "Testimonial Video File",
              type: "file",
              options: { accept: "video/mp4,video/webm" },
            }),
            defineField({ name: "avatarText", title: "Avatar Initials", type: "string" }),
            defineField({ name: "avatarBg", title: "Avatar Background Color", type: "string" }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "thumbnail" },
          },
        },
      ],
      initialValue: [
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
    }),
    defineField({
      name: "testimonialsGalleryVideos",
      title: "Additional Section Videos",
      type: "array",
      group: "testimonials",
      description: "Extra video clips for the testimonials section.",
      of: [
        {
          type: "file",
          options: { accept: "video/mp4,video/webm" },
        },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // 6. MATCH CTA SECTION FIELDS (Direct Fields under "6. Match CTA & Blueprint Section" tab)
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: "matchCTABlueprintImage",
      title: "Venue Blueprint Image (Optional)",
      type: "image",
      group: "matchCTA",
      options: { hotspot: true },
    }),
    defineField({
      name: "matchCTAVideo",
      title: "Venue Blueprint Video Clip (Optional)",
      type: "file",
      group: "matchCTA",
      options: { accept: "video/mp4,video/webm" },
    }),
    defineField({
      name: "matchCTAEyebrow",
      title: "Eyebrow Text",
      type: "string",
      group: "matchCTA",
      initialValue: "Book the Arena",
    }),
    defineField({
      name: "matchCTAHeading",
      title: "Heading Title",
      type: "string",
      group: "matchCTA",
      initialValue: "Book the Arena",
    }),
    defineField({
      name: "matchCTADescription",
      title: "Section Description",
      type: "text",
      group: "matchCTA",
      rows: 3,
      initialValue:
        "Everything you need for an unforgettable cricket experience, thoughtfully designed around one world-class venue.",
    }),
    defineField({
      name: "matchCTAHotspots",
      title: "Interactive Venue Blueprint Hotspots (Repeatable & Reorderable)",
      type: "array",
      group: "matchCTA",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "Hotspot ID", type: "string" }),
            defineField({ name: "icon", title: "Emoji / Icon", type: "string" }),
            defineField({ name: "title", title: "Hotspot Title", type: "string" }),
            defineField({ name: "desc", title: "Hotspot Description", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "title", subtitle: "desc" },
          },
        },
      ],
      initialValue: [
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
    }),
    defineField({
      name: "matchCTAStats",
      title: "Bottom Specifications Strip (Repeatable & Reorderable)",
      type: "array",
      group: "matchCTA",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Stat Label", type: "string" }),
            defineField({ name: "value", title: "Stat Value", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
      initialValue: [
        { label: "LOCATION", value: "Premium City Hub" },
        { label: "GALLERY CAPACITY", value: "2,500+ Seating" },
        { label: "AVAILABLE SLOTS", value: "Daily 5 AM - 11 PM" },
        { label: "PITCH TYPES", value: "Clay Turf / Astro" },
        { label: "PLAYER RATING", value: "4.9★ Elite Venue" },
      ],
    }),

    // ═══════════════════════════════════════════════════════════════════════════
    // 7. SPORTS MEDIA GALLERY FIELDS (Direct Fields under "7. Sports Media Gallery" tab)
    // ═══════════════════════════════════════════════════════════════════════════
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      group: "gallery",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "caption", title: "Caption", type: "string" }),
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "galleryVideos",
      title: "Gallery Videos",
      type: "array",
      group: "gallery",
      of: [
        {
          type: "file",
          options: { accept: "video/mp4,video/webm,video/ogg" },
          fields: [
            defineField({ name: "title", title: "Video Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
            defineField({
              name: "posterImage",
              title: "Poster Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
  ],
});
