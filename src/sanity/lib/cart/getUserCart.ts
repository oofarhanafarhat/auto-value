// // *
//   Commit: Fetch cars in current user's cart from DB
//   - Joins car data from Sanity using IDs stored in PostgreSQL
// */

import { db } from "@/sanity/lib/db/db";
import { cart } from "@/sanity/lib/db/schema";
import { eq } from "drizzle-orm";
import { fetchCarById } from "@/sanity/lib/fetchCarById";

export const getUserCart = async (userId: string) => {
  const items = await db.select().from(cart).where(eq(cart.userId, userId));

  const cars = await Promise.all(
    items.map(async (item) => {
      const car = await fetchCarById(item.carId);
      return { ...car, cartId: item.id };
    })
  );

  return cars;
};