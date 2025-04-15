"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const ListingPage = ({ params }: { params: { id: string } }) => {
  const { user } = useUser();
  const router = useRouter();
  const { id } = params;
  const [carData, setCarData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/listing?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCarData(data.data);
          } else {
            alert("Car not found");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching car data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!carData) {
    return <div>Car not found</div>;
  }

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

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
        alert("Failed to add to cart: " + data.message);
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h1 className="text-3xl font-semibold">
        {carData._id} ({carData.model})
      </h1>
      <p className="text-xl text-gray-600">${carData.price}</p>

      <div className="w-full h-64 mt-4 relative rounded-lg overflow-hidden">
        <Image
          src={carData.imageUrl}
          alt={carData.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ListingPage;
