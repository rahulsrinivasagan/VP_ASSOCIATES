import { defineType, defineField } from "sanity";

export const sportsCricketArenaSection = defineType({
  name: "sportsCricketArenaSection",
  title: "Sports Cricket Arena Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Sports Cricket Arena Section",
    }),
    defineField({
      name: "mainImage",
      title: "Main Arena Showcase Image",
      type: "image",
      options: { hotspot: true },
      description: "Primary showcase image of the cricket stadium.",
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    }),
    defineField({
      name: "video",
      title: "Arena Showcase Video (Optional)",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description: "Video asset for the cricket arena section.",
    }),
    defineField({
      name: "galleryImages",
      title: "Section Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt Text", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      initialValue: "VP Associates • Sports Facility",
    }),
    defineField({
      name: "headingLine1",
      title: "Heading Line 1",
      type: "string",
      initialValue: "OUR CRICKET",
    }),
    defineField({
      name: "headingAccent",
      title: "Heading Accent Word",
      type: "string",
      initialValue: "ARENA",
    }),
    defineField({
      name: "description",
      title: "Section Paragraph",
      type: "text",
      rows: 4,
      initialValue:
        "Step into a professionally maintained cricket facility built for champions and weekend warriors alike. From tournament-ready pitches and premium outfield to stadium floodlights and match-day facilities, every detail is crafted to deliver an unforgettable cricketing experience.",
    }),
    defineField({
      name: "badgeNumber",
      title: "Stat Badge Number (e.g. 5+)",
      type: "string",
      initialValue: "5+",
    }),
    defineField({
      name: "badgeLabel",
      title: "Stat Badge Label (e.g. Acres of Play)",
      type: "string",
      initialValue: "Acres of Play",
    }),
    defineField({
      name: "features",
      title: "Arena Feature Highlights Grid (Repeatable & Reorderable)",
      type: "array",
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
  ],
});
