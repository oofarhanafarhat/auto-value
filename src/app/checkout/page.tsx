"use client"
import { createPaymentIntent } from "./action"; // ✅ API call function import kar raha hai
import { useEffect, useState } from "react";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// ✅ Stripe public key ko load kar raha hai
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null); // ✅ Payment Intent ka client secret store karega

  useEffect(() => {
    createPaymentIntent().then((res) => {
      console.log("API Response:", res); // 🔍 Debugging ke liye
      if (res && res.clientSecret) {
        setClientSecret(res.clientSecret);
      } else {
        console.error("Error: clientSecret not found in response");
      }
    });
  }, []);
  console.log(clientSecret);

  // ✅ Jab tak clientSecret nahi milta, loading message show hoga
  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ justifyContent: "center", alignItems: "center", maxWidth: 400, margin: "auto", height: "50vh" }}>
      <h1>Checkout</h1>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        {/* ✅ clientSecret PaymentForm component ko pass ho raha hai */}
        <PaymentForm clientSecret={clientSecret} />
      </Elements>
    </div>
  );
}

function PaymentForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe(); // ✅ Stripe instance
  const elements = useElements(); // ✅ Elements instance
  const [isProcessing, setIsProcessing] = useState(false); // ✅ Button disable/enable karne ke liye
  const [errorMessages, setErrorMessages] = useState<string | null>(null); // ✅ Error message state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessages(null);

    // ✅ Stripe ka confirmPayment function call kar raha hai
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      console.log("Stripe Error:", error); // ✅ Error ko console me log karega
      setErrorMessages(error.message || "Payment failed. Please try again.");
    } else {
      setErrorMessages(null);
      alert("Payment Successful! Thank you for your purchase");
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement /> {/* ✅ Payment fields show karega */}
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay Now"} {/* ✅ Button text dynamic hai */}
      </button>
      {errorMessages && <div style={{ color: "red" }}>{errorMessages}</div>} {/* ✅ Error message display */}
    </form>
  );
}