import { defineType, defineField } from "sanity";

export const sportsPhilosophySection = defineType({
  name: "sportsPhilosophySection",
  title: "Sports Philosophy Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Sports Philosophy Section",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      initialValue: "VP Associates • Sports Arena",
    }),
    defineField({
      name: "heading",
      title: "Heading Title",
      type: "string",
      initialValue: "PLAY.",
    }),
    defineField({
      name: "headingAccent",
      title: "Heading Accent Word",
      type: "string",
      initialValue: "COMPETE.",
    }),
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      rows: 3,
      initialValue:
        "Every game is more than a score—it's an experience. Whether it's a casual weekend match, an inter-corporate league, or a full-scale tournament, our world-class sporting venue is built to elevate every moment from first ball to final celebration.",
    }),
    defineField({
      name: "cards",
      title: "Philosophy Feature Cards (Repeatable & Reorderable)",
      type: "array",
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
  ],
});
