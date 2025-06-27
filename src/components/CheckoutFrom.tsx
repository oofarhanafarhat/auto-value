// File: /components/CheckoutForm.tsx
"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({ totalAmount }: { totalAmount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success", // Change to your deployed URL
      },
    });

    if (error) {
      setMessage(error.message ?? "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold">Pay ${totalAmount.toFixed(2)}</h2>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
}
