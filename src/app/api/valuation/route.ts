import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/sanity/lib/db/db';
import { auto } from '@/sanity/lib/db/schema';
import { auth } from '@clerk/nextjs/server';

const calculateEstimate = (mileage: number, year: number, condition: string) => {
  let basePrice = 1000000;

  if (condition === 'Used') basePrice -= 100000;
  else if (condition === 'Old') basePrice -= 200000;

  basePrice -= (mileage / 1000) * 5000;
  basePrice -= (new Date().getFullYear() - year) * 20000;

  return basePrice;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { make, model, year, mileage, condition } = body;

    const estimatedPrice = calculateEstimate(mileage, year, condition);
    const { userId } = await auth(); // ✅ Get userId from Clerk

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
      description: `Auto-generated estimate for ${make} ${model}`,
      userId, // ✅ No error now
      dealerCode: "dealer_786",
    });

    return NextResponse.json({
      message: 'Valuation saved successfully!',
      estimatedPrice,
    });
  } catch (error: any) {
    console.error('Error in valuation API:', error);
    return NextResponse.json(
      { message: 'Error saving valuation.', error: error.message },
      { status: 500 }
    );
  }
}
