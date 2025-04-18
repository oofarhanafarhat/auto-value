"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

const ListingCard = ({ id, title, price, imageUrl }: ListingCardProps) => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carId: id }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Added to cart!");
      } else {
        alert("Failed to add: " + data.message);
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-md hover:shadow-lg transition bg-white space-y-2">
      {/* Using Next.js Image component for optimization */}
      <div className="w-full h-48 relative rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"       // Ensures the image fills its container
          objectFit="cover"   // Makes the image cover the space
          className="rounded-lg"
        />
      </div>
      
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">${price}</p>

      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default ListingCard;
