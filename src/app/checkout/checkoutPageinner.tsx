'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutFrom';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPageInner() {
  const searchParams = useSearchParams();
  const total = searchParams.get("total");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const status = searchParams.get("redirect_status");
    if (status === "succeeded") {
      alert("🎉 Payment successful! Thank you for shopping.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (!total) return;

    fetch("/api/payment-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseFloat(total) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [total]);

  if (!clientSecret) return <p className="p-6">Loading checkout form...</p>;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe", // 👈 Add this
        },
      }}
    >
      <CheckoutForm totalAmount={parseFloat(total!)} />
    </Elements>
  );
}
