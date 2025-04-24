
import { defineType } from "sanity";
export const car= defineType( {
  name: "car",
  title: "Car",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Car Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "string",
    },
    {
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "year",
      title: "Model Year",
      type: "string",
    },
    {
      name: "mileage",
      title: "Mileage",
      type: "string",
    },
    {
      name: "fuel",
      title: "Fuel Type",
      type: "string",
      options: {
        list: [
          { title: "Petrol", value: "petrol" },
          { title: "Diesel", value: "diesel" },
          { title: "Hybrid", value: "hybrid" },
          { title: "Electric", value: "electric" },
        ],
      },
    },
    {
      name: "transmission",
      title: "Transmission",
      type: "string",
      options: {
        list: [
          { title: "Automatic", value: "automatic" },
          { title: "Manual", value: "manual" },
          { title: "CVT", value: "cvt" },
        ],
      },
    },
  ],
});