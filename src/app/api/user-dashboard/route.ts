import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/sanity/lib/db/db";
import { auto, cart } from "@/sanity/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  try {
    // Cars submitted by user
    const userCars = await db.select().from(auto).where(eq(auto.userId, userId));

    // Items in cart
    const cartItems = await db.select().from(cart).where(eq(cart.userId, userId));

    return NextResponse.json({
      cars: userCars,
      cart: cartItems,
    });
  } catch (error: any) {
    console.error("User dashboard fetch error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
