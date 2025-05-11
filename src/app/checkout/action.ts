// app/checkout/action.ts
// This is a server-side action to create a Stripe Payment Intent

"use server"; // Tells Next.js that this file should be run on the server

// Importing Stripe library to work with Stripe API
import { Stripe } from "stripe";

// Async function to create a Stripe Payment Intent
export async function createPaymentIntent(total: number) {
  // Initialize Stripe with your secret API key from environment variables
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  try {
    // Convert total amount from dollars to cents (Stripe uses cents)
    const amount = Math.round(total * 100);

    // Create a new payment intent using Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: "usd", // Payment currency
      automatic_payment_methods: {
        enabled: true, // Let Stripe decide best payment method (e.g. card, Apple Pay)
      },
    });

    // Return the client secret which is used on the frontend to complete the payment
    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    // Handle and log any errors during payment intent creation
    console.error("Error creating payment intent:", error);

    // Return error message back to frontend
    return { error: "Failed to create payment intent" };
  }
}