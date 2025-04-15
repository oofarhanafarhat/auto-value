// Commit: Create POST /api/cart to save selected car with Clerk user ID

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/sanity/lib/db";
import { cart } from "@/sanity/lib/cart";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { carId, quantity = 1 } = body;

  if (!carId) {
    return NextResponse.json({ success: false, message: "Car ID is required" }, { status: 400 });
  }

  try {
    await db.insert(cart).values({
      userId,
      carId,
      quantity,
    });

    return NextResponse.json({ success: true, message: "Car added to cart" });
  } catch (err) {
    console.error("Add to cart error:", err);
    return NextResponse.json({ success: false, message: "Failed to add to cart" }, { status: 500 });
  }
}