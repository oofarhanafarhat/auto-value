// schemas/carListing.ts
import { defineType } from "sanity"
export const carListing = defineType({
    name: "carListing",
    title: "Car Listing",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Car Name",
        type: "string",
        // This is the display name of the car (e.g., Toyota Corolla)
      },
      {
        name: "model",
        title: "Model",
        type: "string",
        // This is the car's model year or variant (e.g., 2022)
      },
      {
        name: "price",
        title: "Price",
        type: "number",
        // The selling price of the car (shown on the listing page)
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        options: { hotspot: true },
        // Main image for the car
      },
      {
        name: "addToCart",
        title: "Add To Cart",
        type: "boolean",
        description: "Enable this listing to be available for cart functionality",
        initialValue: true,
        // This boolean controls whether this listing is available to be added to the cart
        // If set to false, the Add to Cart button won't show up
      },
    ],
  });
  
