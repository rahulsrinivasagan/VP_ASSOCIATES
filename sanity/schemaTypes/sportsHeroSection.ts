import { defineType, defineField } from "sanity";

export const sportsHeroSection = defineType({
  name: "sportsHeroSection",
  title: "Sports Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Sports Hero Section",
    }),
    defineField({
      name: "stadiumImage",
      title: "Hero Background / Stadium Image",
      type: "image",
      options: { hotspot: true },
      description: "Primary stadium background image for the hero.",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Background Video File",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/ogg" },
      description: "MP4/WebM video asset for hero background loop.",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      initialValue: "VP ASSOCIATES • SPORTS",
    }),
    defineField({
      name: "headingLine1",
      title: "Heading Line 1",
      type: "string",
      initialValue: "WHERE",
    }),
    defineField({
      name: "headingLine2",
      title: "Heading Line 2",
      type: "string",
      initialValue: "CHAMPIONS",
    }),
    defineField({
      name: "headingLine3Accent",
      title: "Heading Line 3 (Orange Accent)",
      type: "string",
      initialValue: "ARE MADE",
    }),
    defineField({
      name: "description",
      title: "Paragraph Description",
      type: "text",
      rows: 3,
      initialValue:
        "Professional cricket infrastructure and tournament management built for excellence.",
    }),
    defineField({
      name: "primaryBtnText",
      title: "Primary Button Text",
      type: "string",
      initialValue: "Book Your Ground",
    }),
    defineField({
      name: "primaryBtnLink",
      title: "Primary Button Target Link",
      type: "string",
      initialValue: "#book-arena",
    }),
    defineField({
      name: "secondaryBtnText",
      title: "Secondary Button Text",
      type: "string",
      initialValue: "Explore Sports",
    }),
    defineField({
      name: "secondaryBtnLink",
      title: "Secondary Button Target Link",
      type: "string",
      initialValue: "#cricket-arena",
    }),
    defineField({
      name: "featureStrip",
      title: "Bottom Feature Strip Items",
      type: "array",
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
  ],
});
