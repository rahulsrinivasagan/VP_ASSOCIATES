import { defineType, defineField } from "sanity";

export const sportsMatchCTASection = defineType({
  name: "sportsMatchCTASection",
  title: "Sports Match CTA & Blueprint Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Sports Match CTA & Blueprint Section",
    }),
    defineField({
      name: "blueprintImage",
      title: "Venue Blueprint Image (Optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "video",
      title: "Venue Blueprint Video Clip (Optional)",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      initialValue: "Book the Arena",
    }),
    defineField({
      name: "heading",
      title: "Heading Title",
      type: "string",
      initialValue: "Book the Arena",
    }),
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      rows: 3,
      initialValue:
        "Everything you need for an unforgettable cricket experience, thoughtfully designed around one world-class venue.",
    }),
    defineField({
      name: "hotspots",
      title: "Interactive Venue Blueprint Hotspots (Repeatable & Reorderable)",
      type: "array",
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
      name: "stats",
      title: "Bottom Specifications Strip (Repeatable & Reorderable)",
      type: "array",
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
  ],
});
