"use client";

import { useState } from "react";

type Props = {
  carId: string; // ID of the car to add to the cart
};

export default function AddToCartButton({ carId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carId }),
      });
      if (res.ok) {
        alert("Car added to cart!");
      } else {
        alert("Failed to add car to cart.");
      }
    } catch (error) {
      console.error("Error adding car to cart:", error);
      alert("An error occurred while adding the car to the cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={`px-6 py-3 font-semibold rounded-lg shadow-md transition duration-300 ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}