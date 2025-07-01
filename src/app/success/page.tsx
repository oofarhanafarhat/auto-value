"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const { setCartCount } = useCart();

  useEffect(() => {
    setCartCount(0); // 🎯 Sirf frontend cart badge clear kar raha
    alert("🎉 Payment successful! Thank you for shopping.");
  }, [setCartCount]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
      <p className="mt-4">Your cart has been cleared. Have a nice day!</p>
    </div>
  );
}
