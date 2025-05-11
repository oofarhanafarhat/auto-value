import { defineType } from "sanity";
export const usedCar = defineType({
    name: "usedCar",
    title: "usedCar",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Car Name",
        type: "string",
        // This is the display name of the car (e.g., Toyota Corolla)
      },
      {
        name: "Model",
        title: "Model",
        type: "string",
        // This is the car's model year or variant (e.g., 2022)
      },
      // {
      //   name: "price",
      //   title: "Price",
      //   type: "number",
      //   // The selling price of the car (shown on the listing page)
      // },
      {
        name: "image",
        title: "Image",
        type: "image",
        options: { hotspot: true },
        // Main image for the car
      },
    ]
    });