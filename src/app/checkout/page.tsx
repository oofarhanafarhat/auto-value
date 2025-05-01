// app/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createPaymentIntent } from "./action";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const totalString = searchParams.get("total");
  const total = totalString ? parseFloat(totalString) : 0;

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (total > 0) {
      createPaymentIntent(total).then((res) => {
        if (res && res.clientSecret) {
          setClientSecret(res.clientSecret);
        } else {
          console.error("Error: clientSecret not found");
        }
      });
    }
  }, [total]);

  if (!clientSecret) {
    return <div>Loading payment setup...</div>;
  }

  return (
    <div style={{ justifyContent: "center", alignItems: "center", maxWidth: 400, margin: "auto", height: "30vh" }}>
      <h1>Checkout</h1>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessages(null);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      console.log("Stripe Error:", error);
      setErrorMessages(error.message || "Payment failed. Please try again.");
    } else {
      setErrorMessages(null);
      alert("Payment Successful! Thank you for your purchase");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {errorMessages && <div style={{ color: "red" }}>{errorMessages}</div>}
    </form>
  );
}