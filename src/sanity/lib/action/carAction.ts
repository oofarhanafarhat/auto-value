

// 🧠 Commit: Setup cart action functions for get + remove logic using Drizzle and Clerk User ID
import { client } from "@/sanity/lib/client"; // Sanity client
import { groq } from "next-sanity";
import { db } from "@/sanity/lib/db/db"; // Drizzle DB instance
import { cart } from "@/sanity/lib/db/schema"; // Cart table schema
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server"; // Clerk auth

// 📦 1. Get all cart items for a specific user
export async function getCartWithCars(userId: string) {
    try {
        // 1. Fetch user cart rows (Drizzle)
        const cartItems = await db.select().from(cart).where(eq(cart.userId, userId));
    
        // 2. Extract car IDs
        const carIds = cartItems.map((item) => item.carId);
    
        // 3. Fetch car data from Sanity where _id in carIds
        const sanityCars = await client.fetch(
          groq`*[_type == "car" && _id in $ids]{
            _id,
            title,
            slug,
            price,
            image
          }`,
          { ids: carIds }
        );
    
        return sanityCars;
      } catch (error) {
        console.error("Error fetching cart cars:", error);
        return[];

    }
}
export async function removeFromCart(userId: string, carId: string) {
  try {
    // Remove row where userId and carId both match
    await db.delete(cart).where(
      and(eq(cart.userId, userId), eq(cart.carId, carId))
    );
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
}