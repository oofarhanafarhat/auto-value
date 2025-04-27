// app/cart/page.tsx

"use client";

// [Commit] Import necessary React, Clerk, Sanity and Next.js utilities
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

// [Commit] Define types for cart items and cars fetched from Sanity
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

// [Commit] CartPage component
export default function CartPage() {
  // [Commit] Get logged-in user info from Clerk
  const { user } = useUser();

  // [Commit] State to store cart cars and loading status
  const [carData, setCarData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // [Commit] Next.js router instance
  const router = useRouter();

  // [Commit] Fetch cart items on mount
  useEffect(() => {
    if (!user) {
      // [Commit] Redirect to sign-in page if user is not logged in
      router.push("/sign-in");
      return;
    }

    const fetchCart = async () => {
      try {
        // [Commit] Fetch cart items from custom backend API
        const res = await fetch("/api/cart", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        // [Commit] Parse cart items
        const cartItems: CartItem[] = await res.json();

        // [Commit] Extract only carIds from cart items
        const ids = cartItems.map((item) => item.carId);

        if (ids.length === 0) {
          // [Commit] If no items, set empty cart and stop loading
          setCarData([]);
          setLoading(false);
          return;
        }

        // [Commit] Query Sanity to fetch full car details by IDs
        const query = `*[_type == "car" && _id in $ids]{
          _id, title, slug, price, image, model, year
        }`;

        // [Commit] Fetch car data from Sanity
        const cars: Car[] = await client.fetch(query, { ids });

        // [Commit] Update state with fetched cars
        setCarData(cars);
        setLoading(false);
      } catch (error) {
        console.error("Error loading cart:", error);
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // [Commit] Function to remove a car from cart
  const removeFromCart = async (carId: string) => {
    try {
      // [Commit] Send DELETE request to API
      await fetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({ carId }),
      });

      // [Commit] Remove car from state immediately
      setCarData((prev) => prev.filter((car) => car._id !== carId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // [Commit] Calculate total amount of cart
  const total = carData.reduce((sum, car) => sum + (car.price || 0), 0);

  // [Commit] Show loading screen while fetching
  if (loading) return <div className="p-6">Loading your cart...</div>;

  // [Commit] Show empty cart message if no items
  if (carData.length === 0)
    return <div className="p-6 text-lg">Your cart is empty.</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
      
      {/* [Commit] Left Side: List of cart items */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

        {/* [Commit] Render each car item */}
        {carData.map((car) => (
          <div
            key={car._id}
            className="flex flex-col md:flex-row items-center gap-4 border rounded-2xl p-4 shadow-sm bg-white"
          >
            {/* [Commit] Car image */}
            <Image
              src={car.image ? urlFor(car.image).url() : "/fallback.jpg"}
              alt={car.title || "Car Image"}
              width={200}
              height={150}
              className="rounded-xl object-cover w-full md:w-48 h-36"
            />

            {/* [Commit] Car details */}
            <div className="flex-1 space-y-1">
              <h2 className="text-xl font-semibold">{car.title}</h2>
              <p className="text-gray-600">
                {car.model} - {car.year}
              </p>
              <p className="text-primary font-semibold text-lg">
                ${car.price.toLocaleString()}
              </p>

              {/* [Commit] Actions: View details and Remove */}
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

      {/* [Commit] Right Side: Cart Summary Box */}
      <div className="sticky top-20 h-fit border rounded-2xl p-6 bg-gray-50 shadow-md space-y-4">
        <h2 className="text-xl font-semibold mb-4">
          Cart Summary ({carData.length} {carData.length === 1 ? "item" : "items"})
        </h2>

        {/* [Commit] List of cart item titles and prices */}
        <ul className="divide-y">
          {carData.map((car, index) => (
            <li key={car._id} className="py-2 flex justify-between text-sm">
              <span>{index + 1}. {car.title}</span>
              <span>${car.price.toLocaleString()}</span>
            </li>
          ))}
        </ul>

        <hr className="my-4" />

        {/* [Commit] Show total price */}
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>

        {/* [Commit] Checkout button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-xl mt-4 hover:bg-blue-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
