// feat(db): Add listings table to Drizzle schema
// This table stores car listing data from Sanity for local use like cart and analytics

import { pgTable, uuid, text, numeric, timestamp } from 'drizzle-orm/pg-core';

// Define the listings table
export const listings = pgTable('listings', {
  // Unique identifier for each listing
  id: uuid('id').defaultRandom().primaryKey(),

  // Title or name of the car listing
  title: text('title').notNull(),

  // Description of the car (optional)
  description: text('description'),

  // Price of the car in decimal format
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),

  // URL to the image hosted on Sanity
  imageUrl: text('image_url').notNull(),

  // Timestamp for when the listing was created
  createdAt: timestamp('created_at').defaultNow(),
});