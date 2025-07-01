import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/sanity/lib/db/db";
import { auto } from "@/sanity/lib/db/schema";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const body = await req.json();
  const { make, model, year, mileage, condition, estimatedPrice } = body;

  try {
 
await db.insert(auto).values({
  title: `${make} ${model}`,
  make,
  model,
  year,
  mileage,
  condition,
  price: estimatedPrice,
  estimatedPrice,
  createdAt: new Date(),
  description: `Visited car: ${make} ${model}`,
  userId,              // ✅ properly declared above
  dealerCode: "",      // blank for visit
  source: "visit",     // marking as visit
});
    return NextResponse.json({ message: "Visit tracked successfully." });
  } catch (error) {
    console.error("Track visit error:", error);
    return NextResponse.json({ error: "Failed to track visit" }, { status: 500 });
  }
}
