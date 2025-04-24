
import { db } from "@/sanity/lib/db"; // Drizzle DB instance
import { cart } from "@/sanity/lib/cart"; // Import the cart table schema


// Add a car to the cart
export async function addToCart(carId: string, userId: string) {
  try {
    await db.insert(cart).values({
  
      carId, // Reference to the car being added to the cart
      userId, // Reference to the user (from Clerk)
  
    });

    console.log("Car added to cart successfully!");
  } catch (error) {
    console.error("Error adding car to cart:", error);
  }
}