"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartItem {
  carId: string;
}

interface Car {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  image: any;
  model: string;
  year: number;
  quantity: number;
}

export default function CartPage() {
  const { user } = useUser();
  const router = useRouter();

  const [carData, setCarData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const cartItems: CartItem[] = await res.json();

        // Group by quantity
        const quantityMap: Record<string, number> = {};
        cartItems.forEach((item) => {
          quantityMap[item.carId] = (quantityMap[item.carId] || 0) + 1;
        });

        const ids = Object.keys(quantityMap);

        if (ids.length === 0) {
          setCarData([]);
          setLoading(false);
          return;
        }

        const query = `*[_type == "car" && _id in $ids]{
          _id,
          title,
          slug,
          price,
          image,
          model,
          year
        }`;

        const cars: Car[] = await client.fetch(query, { ids });

        const carsWithQuantity = cars.map((car) => ({
          ...car,
          quantity: quantityMap[car._id] || 1,
        }));

        setCarData(carsWithQuantity);
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, router]);

  const removeFromCart = async (carId: string) => {
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId }),
      });

      setCarData((prev) => prev.filter((car) => car._id !== carId));
    } catch (error) {
      console.error("Error removing car:", error);
    }
  };

  const total = carData.reduce(
    (sum, car) => sum + (car.price * (car.quantity || 1)),
    0
  );

  if (loading) return <div className="p-6">Loading your cart...</div>;
  if (carData.length === 0)
    return <div className="p-6 text-lg">Your cart is empty.</div>;

  return (
    <div className="max-w-[400px] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-6">
        {carData.map((car) => (
          <div
            key={car._id}
            className="flex items-center gap-6 border-b pb-4"
          >
            <Image
              src={car.image ? urlFor(car.image).width(200).url() : ""}
              alt={car?.title || "Car image"} 
              width={120}
              height={120}
              className="rounded object-cover"
            />

            <div className="flex-1 flex flex-col">
              <h2 className="text-xl font-semibold">{car.title}</h2>
              <p className="text-gray-600 text-sm">
                {car.model} - {car.year}
              </p>
              <p className="text-sm text-gray-600">Quantity: {car.quantity}</p>
              <p className="mt-1 font-medium">
                ${car.price.toLocaleString()} each
              </p>

              <div className="flex justify-between items-center mt-2">
                <Link
                  href={`/listing/${car.slug.current}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Details
                </Link>
                <button
                  onClick={() => removeFromCart(car._id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div className="mt-10 border-t pt-6">
        <div className="flex justify-between text-xl font-semibold mb-4">
          <span>Total:</span>
          <span>${total.toLocaleString()}</span>
        </div>

        <Link href={`/checkout?total=${total}`}>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition w-full"
          >
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
