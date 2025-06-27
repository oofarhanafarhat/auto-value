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
  const [error, setError] = useState("");

  useEffect(() => {
    const status = searchParams.get("redirect_status");
    if (status === "succeeded") {
      alert("🎉 Payment successful! Thank you for shopping.");
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (!total || isNaN(Number(total))) {
        setError("❗ Invalid total amount. Please go back and try again.");
        return;
      }

      try {
        const res = await fetch("/api/payment-cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: parseFloat(total) }),
        });

        const contentType = res.headers.get("content-type");

        if (res.ok && contentType?.includes("application/json")) {
          const data = await res.json();
          setClientSecret(data.clientSecret);
        } else {
          const errText = await res.text();
          console.error("❌ Server returned non-JSON:", errText);
          setError("❗ Something went wrong while preparing payment.");
        }
      } catch (err) {
        console.error("❌ Fetch failed:", err);
        setError("❗ Unable to connect to payment server. Please try again later.");
      }
    };

    fetchClientSecret();
  }, [total]);

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  if (!clientSecret) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center">
        <p className="text-gray-700">Preparing your secure checkout...</p>
        <div className="mt-4 animate-spin h-6 w-6 border-2 border-green-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
        },
      }}
    >
      <CheckoutForm totalAmount={parseFloat(total!)} />
    </Elements>
  );
}
