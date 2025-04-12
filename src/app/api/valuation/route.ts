

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/sanity/lib/db'
import { auto } from '@/sanity/lib/drizzle' // your schema file with the "auto" table

// Estimate calculation logic (reuse)
const calculateEstimate = (mileage: number, year: number, condition: string) => {
  let basePrice = 1000000

  if (condition === 'Used') basePrice -= 100000
  else if (condition === 'Old') basePrice -= 200000

  basePrice -= (mileage / 1000) * 5000

  const ageFactor = new Date().getFullYear() - year
  basePrice -= ageFactor * 20000

  return basePrice
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { make, model, year, mileage, condition } = body

    const estimatedPrice = calculateEstimate(mileage, year, condition)

    await db.insert(auto).values({
      title: `${make} ${model}`, // Basic title
      make,
      model,
      year,
      mileage,
      condition,
      price: estimatedPrice, // Or set actual price if different
      estimatedPrice,
      createdAt: new Date(), // Optional if defaultNow() works
      description: `Auto-generated estimate for ${make} ${model}` // Optional
    })

    return NextResponse.json({
      message: 'Valuation saved successfully!',
      estimatedPrice,
    })
  } catch (error: any) {
    console.error('Error in valuation API:', error)
    return NextResponse.json(
      {
        message: 'Error saving valuation.',
        error: error.message,
      },
      { status: 500 }
    )
  }
}