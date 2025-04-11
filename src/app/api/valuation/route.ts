import { NextResponse } from 'next/server';
import { db } from '@/../lib/db';
import { cars } from '@/../lib/schema';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const carSchema = z.object({
      title: z.string().min(2),
      make: z.string(),
      model: z.string(),
      year: z.number().min(1950).max(new Date().getFullYear()),
      condition: z.enum(['New', 'Used', 'Like New', 'Old']),
      mileage: z.number().min(0),
      price: z.number().min(10000),
      description: z.string().optional(),
    });
    const parsed = carSchema.safeParse(body);

if (!parsed.success) {
  return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
}

const {
  title,
  make,
  model,
  year,
  condition,
  mileage,
  price,
  description,
} = parsed.data;


    // Estimate logic (simple demo logic)
    let estimatedValue = price;
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;

    if (condition === 'Used') estimatedValue -= 50000;
    if (condition === 'Old') estimatedValue -= 100000;
    if (age > 5) estimatedValue -= age * 10000;
    if (mileage > 100000) estimatedValue -= 50000;

    // Store in DB using Drizzle
    await db.insert(cars).values({
      title,
      make,
      model,
      year,
      condition,
      mileage,
      price,
      description,
      estimatedValue,
    });

    return NextResponse.json({ estimatedValue });
  } catch (error) {
    console.error('Valuation API Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}