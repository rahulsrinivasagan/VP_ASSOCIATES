import { defineType, defineField } from "sanity";

export const sportsMediaGallery = defineType({
  name: "sportsMediaGallery",
  title: "Sports Media Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Sports Media Gallery",
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
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
      name: "videos",
      title: "Gallery Videos",
      type: "array",
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
