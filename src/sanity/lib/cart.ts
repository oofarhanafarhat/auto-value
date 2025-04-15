import { pgTable, text, uuid, integer, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const cart = pgTable("cart", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull(),
  carId: text("car_id").notNull(),
  quantity: integer("quantity").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});