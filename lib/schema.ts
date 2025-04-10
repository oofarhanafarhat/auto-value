import { pgTable, serial, text, integer, numeric, timestamp } from 'drizzle-orm/pg-core';
export const valuations = pgTable('valuations', {
    id: serial('id').primaryKey(),
  
    userId: text('user_id').notNull(),                   // Clerk user ID (foreign key optional)
  
    make: text('make').notNull(),                        // e.g., Toyota
    model: text('model').notNull(),                      // e.g., Corolla
    year: integer('year').notNull(),                     // Manufacturing year
    mileage: integer('mileage').notNull(),               // e.g., 85000
    condition: text('condition').notNull(),              // New, Used, Old
  
    estimatedPrice: numeric('estimated_price', { precision: 10, scale: 2 }).notNull(),
  
    createdAt: timestamp('created_at').defaultNow().notNull(),
  })