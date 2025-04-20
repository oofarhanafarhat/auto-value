"use server";

import { db } from "@/sanity/lib/db";
import { cart } from "@/sanity/lib/cart";
import { eq } from "drizzle-orm";

export async function addToCart(formData: FormData) {
  const carId = formData.get("carId") as string;
  const userId = formData.get("userId") as string;

  if (!carId || !userId) {
    throw new Error("Missing car or user ID");
  }

  await db.insert(cart).values({
    userId,
    carId,
    quantity: 1,
  });
}