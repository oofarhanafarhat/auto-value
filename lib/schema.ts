// lib/schema.ts

import { pgTable, serial, text, integer, numeric, timestamp, uuid } from 'drizzle-orm/pg-core'

export const valuations = pgTable('valuations', {
  id: serial('id').primaryKey(),

  // Clerk se aane wala userId
  userId: text('user_id').notNull(),

  // Car fields
  make: text('make').notNull(),                // e.g., Toyota
  model: text('model').notNull(),              // e.g., Corolla
  year: integer('year').notNull(),             // e.g., 2018
  mileage: integer('mileage').notNull(),       // e.g., 85000
  condition: text('condition').notNull(),      // e.g., Used

  // Final estimated price
  estimatedPrice: numeric('estimated_price', { precision: 10, scale: 2 }).notNull(),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
})