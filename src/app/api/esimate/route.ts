// app/api/estimate/route.ts

import { NextRequest, NextResponse } from 'next/server'

// Car valuation estimate function
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
    const { mileage, year, condition } = body

    const estimatedPrice = calculateEstimate(mileage, year, condition)

    return NextResponse.json({
      message: 'Estimate calculated successfully!',
      estimatedPrice,
    })
  } catch (error: any) {
    console.error('Error in estimate API:', error)
    return NextResponse.json(
      {
        message: 'Error calculating estimate.',
        error: error.message,
      },
      { status: 500 }
    )
  }
}