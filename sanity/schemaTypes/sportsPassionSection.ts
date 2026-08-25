import { defineType, defineField } from "sanity";

export const sportsPassionSection = defineType({
  name: "sportsPassionSection",
  title: "Sports Passion & Performance Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Sports Passion & Performance Section",
    }),
    defineField({
      name: "mainImage",
      title: "Section Visual Image",
      type: "image",
      options: { hotspot: true },
      description: "Main cricket nets / pitch image.",
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    }),
    defineField({
      name: "video",
      title: "Section Video Clip (Optional)",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
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
      initialValue: "Crafted for Cricket Excellence",
    }),
    defineField({
      name: "heading",
      title: "Heading Title",
      type: "string",
      initialValue: "Where Passion Meets Performance",
    }),
    defineField({
      name: "description",
      title: "Section Paragraph",
      type: "text",
      rows: 4,
      initialValue:
        "Every player, from casual beginners to season-hardened professionals, deserves a world-class environment. We combine state-of-the-art turf pitches, comprehensive coaching infrastructure, and high-intensity match play options to elevate your cricket journey.",
    }),
    defineField({
      name: "stat1Value",
      title: "Floating Stat 1 Value",
      type: "string",
      initialValue: "100%",
    }),
    defineField({
      name: "stat1Label",
      title: "Floating Stat 1 Label",
      type: "string",
      initialValue: "Premium Turf",
    }),
    defineField({
      name: "stat2Value",
      title: "Floating Stat 2 Value",
      type: "string",
      initialValue: "24/7",
    }),
    defineField({
      name: "stat2Label",
      title: "Floating Stat 2 Label",
      type: "string",
      initialValue: "Floodlit Nets",
    }),
    defineField({
      name: "highlightPanels",
      title: "Stacked Feature Cards (Repeatable & Reorderable)",
      type: "array",
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
  ],
});
