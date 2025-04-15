"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ListingPage = ({ params }: { params: { id: string } }) => {
  const { user } = useUser();  // Clerk user to check if the user is authenticated
  const router = useRouter();
  const { id } = params;  // Accessing the dynamic id directly from params
  const [carData, setCarData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      // Fetching car data when id is available
      fetch(`/api/listing?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCarData(data.data);  // Setting car data into state
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
      router.push("/sign-in");  // Redirect to sign-in page if not authenticated
      return;
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carId: id }),  // Send car ID to the cart API
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
      <h1 className="text-3xl font-semibold">{carData.name} ({carData.model})</h1>
      <p className="text-xl text-gray-600">${carData.price}</p>
      <img src={carData.imageUrl} alt={carData.name} className="w-full h-64 object-cover mt-4 rounded-lg" />

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
