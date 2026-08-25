import { defineType, defineField } from "sanity";

export const sportsTestimonialsSection = defineType({
  name: "sportsTestimonialsSection",
  title: "Sports Grounds & Video Showcase",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Sports Grounds & Video Showcase",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      initialValue: "SPORTS FACILITY SHOWCASE",
    }),
    defineField({
      name: "heading",
      title: "Heading Title",
      type: "string",
      initialValue: "Experience Our Sports Grounds",
    }),
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      rows: 3,
      initialValue:
        "Explore our professionally designed sporting environment built for competitive matches, academy training, corporate tournaments, and unforgettable sporting moments.",
    }),
    defineField({
      name: "featuredStory",
      title: "Featured Grounds Video Showcase",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Content Badge / Label",
          type: "string",
          initialValue: "SPORTS FACILITY",
        }),
        defineField({
          name: "title",
          title: "Main Video Title",
          type: "string",
          initialValue: "SPORTS GROUNDS & ARENA",
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
          initialValue: "Professionally Maintained Cricket Grounds",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue:
            "A professionally designed sporting environment for matches, training, tournaments, and events.",
        }),
        defineField({
          name: "duration",
          title: "Video Duration",
          type: "string",
          initialValue: "1:45",
        }),
        defineField({
          name: "thumbnail",
          title: "Featured Video Poster / Thumbnail Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "videoFile",
          title: "Featured Video File",
          type: "file",
          options: { accept: "video/mp4,video/webm" },
          description: "Grounds/Facility video file asset.",
        }),
      ],
      initialValue: {
        label: "SPORTS FACILITY",
        title: "SPORTS GROUNDS & ARENA",
        subtitle: "Professionally Maintained Cricket Grounds",
        description:
          "A professionally designed sporting environment for matches, training, tournaments, and events.",
        duration: "1:45",
      },
    }),
    defineField({
      name: "items",
      title: "Facility Video Showcase Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "Card ID", type: "string" }),
            defineField({ name: "title", title: "Card Title", type: "string" }),
            defineField({ name: "description", title: "Card Description", type: "text", rows: 2 }),
            defineField({ name: "duration", title: "Video Duration", type: "string" }),
            defineField({
              name: "thumbnail",
              title: "Video Poster / Thumbnail Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "videoFile",
              title: "Video File",
              type: "file",
              options: { accept: "video/mp4,video/webm" },
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description", media: "thumbnail" },
          },
        },
      ],
      initialValue: [
        {
          id: "v1",
          title: "Competitive Cricket Pitch",
          description: "BCCI-standard grass outfield and turf pitch.",
          duration: "2:45",
        },
        {
          id: "v2",
          title: "Stadium Floodlights",
          description: "High-intensity LED lights for day-night matches.",
          duration: "1:52",
        },
        {
          id: "v3",
          title: "Practice & Training Nets",
          description: "Dedicated bowling and batting practice cages.",
          duration: "3:10",
        },
        {
          id: "v4",
          title: "Player Pavilion & Amenities",
          description: "Full changing rooms, spectator gallery, and parking.",
          duration: "4:05",
        },
      ],
    }),
  ],
});
