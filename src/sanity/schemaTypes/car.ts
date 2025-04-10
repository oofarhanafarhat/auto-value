// sanity/schemas/car.ts

import { defineType } from 'sanity'

 export const car = defineType({
  name: 'car',
  title: 'Car',
  type: 'document',
  fields: [
    // Title of the car listing (e.g., "Toyota Corolla 2020")
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },

    // Slug for the URL, generated from the title
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },

    // Car manufacturer name (e.g., "Toyota")
    {
      name: 'make',
      title: 'Make',
      type: 'string',
      validation: Rule => Rule.required(),
    },

    // Car model name (e.g., "Corolla")
    {
      name: 'model',
      title: 'Model',
      type: 'string',
      validation: Rule => Rule.required(),
    },

    // Manufacturing year of the car
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required().min(1990).max(new Date().getFullYear()),
    },

    // Condition of the car (e.g., New, Used, etc.)
    {
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: ['New', 'Used', 'Like New', 'Old'],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    },

    // Mileage of the car in kilometers
    {
      name: 'mileage',
      title: 'Mileage (KM)',
      type: 'number',
    },

    // Asking price of the car in PKR
    {
      name: 'price',
      title: 'Price ',
      type: 'number',
      validation: Rule => Rule.required(),
    },

    // Detailed description of the car and its features
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },

    // Image of the car
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
})

