

import { pgTable, serial, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core';

export const cart = pgTable("cart", {
  id: uuid("id").defaultRandom().primaryKey(),
  carId: text("car_id").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
//Cars Table: Store user-submitted car details with estimated value
export const auto = pgTable('auto', {
  id: serial('id').primaryKey(),                       // Auto-increment ID
  title: text('title').notNull(),                      // Car listing title
  make: text('make').notNull(),                        // Car manufacturer (e.g., Honda)
  model: text('model').notNull(),                      // Model name (e.g., Civic)
  year: integer('year').notNull(),                     // Manufacturing year
  condition: text('condition').notNull(),              // Car condition (New, Used, etc.)
  mileage: integer('mileage'),                         // Mileage in KM
  price: integer('price').notNull(),                   // Price in PKR
  description: text('description'),
  userId: text('user_id').notNull(),         // ✅ New line
  dealerCode: text('dealer_code').notNull(),
  source: text("source").notNull().default("visit"),                  // Description of the car
  estimatedPrice: integer('estimated_price').notNull(),
  createdAt: timestamp('created_at', {                 // Timestamp for records
    withTimezone: true
  }).defaultNow(),
});

export const dealers = pgTable("dealers", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull().unique(),
  dealerCode: text("dealer_code").notNull().unique(),
});
