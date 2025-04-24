
/*
  Commit: Utility to remove item from cart table by cart ID
*/

import { db } from "@/sanity/lib/db";
import { cart } from "@/sanity/lib/cart";
import { eq } from "drizzle-orm";

export const removeFromCart = async (cartId: string) => {
  await db.delete(cart).where(eq(cart.id, cartId));
};