"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface CartItem {
  carId: string;
}
interface Car {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  image: string;
  model: string;
  year: number;
}

export default function CartPage() {
  const { user } = useUser();
  const [carData, setCarData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }

    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const cartItems: CartItem[] = await res.json();
        const ids = cartItems.map((item) => item.carId);

        if (ids.length === 0) {
          setCarData([]);
          setLoading(false);
          return;
        }

        const query = `*[_type == "car" && _id in $ids]{
          _id, title, slug, price, image, model, year
        }`;

        const cars: Car[] = await client.fetch(query, { ids });
        setCarData(cars);
        setLoading(false);
      } catch (error) {
        console.error("Error loading cart:", error);
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const removeFromCart = async (carId: string) => {
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({ carId }),
      });

      setCarData((prev) => prev.filter((car) => car._id !== carId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const total = carData.map((car) => car.price).join("");
  



  if (loading) return <div className="p-6">Loading your cart...</div>;
  if (carData.length === 0)
    return <div className="p-6 text-lg">Your cart is empty.</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
      {/* Left: Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
        {carData.map((car) => (
          <div
            key={car._id}
            className="flex flex-col md:flex-row items-center gap-4 border rounded-2xl p-4 shadow-sm bg-white"
          >
            <Image
              src={car.image ? urlFor(car.image).url() : "/fallback.jpg"}
              alt={car.title || "car"}
              width={200}
              height={150}
              className="rounded-xl object-cover w-full md:w-48 h-36"
            />
            <div className="flex-1 space-y-1">
              <h2 className="text-xl font-semibold">{car.title}</h2>
              <p className="text-gray-600">{car.model} - {car.year}</p>
              <p className="text-primary font-semibold text-lg">
                $ {car.price.toLocaleString()}
              </p>
              <div className="flex justify-between text-sm mt-2">
                <Link
                  href={`/listings/${car.slug.current}`}
                  className="text-blue-600 hover:underline"
                >
                  View details
                </Link>
                <button
                  onClick={() => removeFromCart(car._id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Summary Box */}
 
<div className="bg-gray-100 p-6 rounded-xl shadow-md w-full max-w-sm">
  <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>

  {carData.map((car, idx) => (
    <div key={idx} className="flex justify-between text-gray-700 border-b py-2">
      <span>Car {idx + 1}</span>
      <span>$ {car.price.toLocaleString()}</span>
    </div>
  ))}

  <div className="flex justify-between mt-4 text-lg font-bold border-t pt-4">
    <span>Total</span>
    <span>$ {total.toLocaleString()}</span>
  </div>

  <button className="mt-6 w-full bg-[#0C2340] text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition">
    Proceed to Checkout
  </button>
</div>

    </div>
  );
}