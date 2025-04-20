import { defineType } from "sanity";// schemas/servicesSection.js

export const services = defineType({
    name: "servicesSection",
    title: "Services Section",
    type: "document",
    fields: [
      {
        name: "services",
        title: "Services",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              {
                name: "title",
                title: "Title",
                type: "string",
              },
              {
                name: "desc",
                title: "Description",
                type: "text",
              },
              {
                name: "mainImage",
                title: "Main Image",
                type: "image",
                options: {
                  hotspot: true,
                },
              },
            ],
          },
        ],
      },
    ],
  });
  