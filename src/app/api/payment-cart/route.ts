// File: /app/api/payment-cart/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount } = body;

    console.log("💰 Received amount in API:", amount);

    if (!amount || isNaN(amount) || amount <= 0) {
    
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (amount > 999999.99) {
    
      return NextResponse.json(
        { error: 'Amount must be no more than $999,999.99' },
        { status: 400 }
      );
    }

    // continue...


    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error('❌ Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
