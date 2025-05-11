// app/checkout/page.tsx
// This is the Checkout Page where Stripe Payment is handled using client-side rendering

"use client"; // This tells Next.js that this file should be rendered on the client side

// Importing necessary React and Stripe libraries
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // To get query parameters from URL
import { createPaymentIntent } from "./action"; // Custom function to create a Stripe payment intent
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js"; // Stripe UI and hooks
import { loadStripe } from "@stripe/stripe-js"; // Stripe loader for public key

// Load the Stripe object using your public key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

// Main CheckoutPage component
export default function CheckoutPage() {
  const searchParams = useSearchParams(); // Get query parameters from the URL
  const totalString = searchParams.get("total"); // Extract the "total" value from URL
  const total = totalString ? parseFloat(totalString) : 0; // Convert total to number (float)

  // State to store the clientSecret received from Stripe
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // useEffect runs when the component loads or when 'total' changes
  useEffect(() => {
    if (total > 0) {
      // Create a payment intent with the total amount
      createPaymentIntent(total).then((res) => {
        if (res && res.clientSecret) {
          setClientSecret(res.clientSecret); // Save the clientSecret in state
          console.log("Client Secret:", res.clientSecret); // Debug log
        } else {
          console.error("Error: clientSecret not found"); // Error handling
        }
      });
    }
  }, [total]); // Dependency array to re-run if total changes

  // If clientSecret is not ready yet, show a loading message
  if (!clientSecret) {
    return <div>Loading payment setup...</div>;
  }

  // If clientSecret is ready, render the Stripe Elements UI
  return (
    <div style={{ justifyContent: "center", alignItems: "center", maxWidth: 400, margin: "auto", height: "15vh" }}>
      <h1>Checkout</h1>
      {/* Stripe Elements wrapper */}
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm /> {/* Render the payment form */}
      </Elements>
    </div>
  );
}

// Separate component for the actual payment form
function PaymentForm() {
  const stripe = useStripe(); // Stripe instance
  const elements = useElements(); // Stripe Elements
  const [isProcessing, setIsProcessing] = useState(false); // To show loading state on submit
  const [errorMessages, setErrorMessages] = useState<string | null>(null); // To store and show error messages

  // Function that handles form submission and payment confirmation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    if (!stripe || !elements) return; // Wait until Stripe is loaded

    setIsProcessing(true); // Show processing state
    setErrorMessages(null); // Reset previous errors

    // Confirm payment with Stripe using the form elements
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Only redirect if needed
    });

    // Handle errors or success response
    if (error) {
      console.log("Stripe Error:", error); // Debug error log
      setErrorMessages(error.message || "Payment failed. Please try again."); // Show error message
    } else {
      setErrorMessages(null); // Clear errors
      alert("Payment Successful! Thank you for your purchase"); // Show success alert
    }

    setIsProcessing(false); // Reset loading state
  };

  // Render the payment form UI
  return (
    <form onSubmit={handleSubmit} className="mt-6 font-bold text-gray-900 ">
      {/* Stripe’s built-in payment input */}
      <PaymentElement className="font-bold " />

      {/* Submit button that changes text when processing */}
      <button type="submit" disabled={isProcessing} className="font-bold py-2 px-3 bg-gray-800 text-white rounded-full mt-4 mb-10">
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>

      {/* Show error message if there's an issue */}
      {errorMessages && <div style={{ color: "red" }}>{errorMessages}</div>}
    </form>
  );
}