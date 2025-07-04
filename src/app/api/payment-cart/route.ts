// File: /app/api/payment-cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-03-31.basil',
});

// Stripe's hard limit in cents (for USD)
const MAX_STRIPE_LIMIT = 999999.99;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount } = body;

    console.log("💰 Received amount in API:", amount);

    // Check if amount is missing or invalid
    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Show user-friendly message if over Stripe limit
    if (amount > MAX_STRIPE_LIMIT) {
      return NextResponse.json(
        {
          error:
            `⚠️ You cannot make a payment more than $${MAX_STRIPE_LIMIT.toLocaleString()}. Please reduce the amount.`,
        },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error('❌ Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
