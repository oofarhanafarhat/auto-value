// src/app/api/cart/route.ts

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // Clerk auth to get current user
import { db } from "@/sanity/lib/db/db"; // Drizzle DB instance
import { cart } from "@/sanity/lib/db/schema"; // Drizzle cart schema
import { eq,and } from "drizzle-orm";

// ---------------------- GET: Fetch user's cart ----------------------
export async function GET() {
  const { userId } = await auth(); // Get user from Clerk
  if (!userId) return NextResponse.json([], { status: 401 }); // No user? Return empty

  try {
    // Get all cart items for this user
    const userCart = await db.select().from(cart).where(eq(cart.userId, userId));

    return NextResponse.json(userCart); // Returns: [{ carId, userId }]
  } catch (err) {
    console.error("GET /api/cart error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ---------------------- POST: Add to cart ----------------------
export async function POST(req: Request) {
  const { userId } = await auth(); // Authenticated user
  if (!userId) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const { carId } = await req.json(); // Get car ID from body
  if (!carId) return NextResponse.json({ error: "Missing carId" }, { status: 400 });

  try {
    // Insert user+car into DB
    await db.insert(cart).values({ userId, carId });

    return NextResponse.json({ message: "Added to cart" });
  } catch (err) {
    console.error("POST /api/cart error:", err);
    return NextResponse.json({ error: "Please sign in to your account to continue" }, { status: 500 });
  }
}

// ---------------------- DELETE: Remove from cart ----------------------
export async function DELETE(req: Request) {
  const { userId } =  await auth(); // Authenticated user
  if (!userId) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const { carId } = await req.json(); // Get car ID from body
  if (!carId) return NextResponse.json({ error: "Missing carId" }, { status: 400 });

  try {
    // Delete this car for this user
    await db.delete(cart).where(
      and(eq(cart.userId, userId), eq(cart.carId, carId))
    );
    

    return NextResponse.json({ message: "Removed from cart" });
  } catch (err) {
    console.error("DELETE /api/cart error:", err);
    return NextResponse.json({ error: "Failed to remove" }, { status:500});
  }
}