// app/checkout/action.ts
"use server";
import { Stripe } from "stripe";

export async function createPaymentIntent(total: number) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  try {
    const amount = Math.round(total * 100); // Convert dollars to cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return { error: "Failed to create payment intent" };
  }
}