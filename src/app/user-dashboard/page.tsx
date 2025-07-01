"use client";

import { useEffect, useState } from "react";
import { FiTruck, FiShoppingCart } from "react-icons/fi";

export default function UserDashboard() {
  const [data, setData] = useState<{ cars: any[]; cart: any[] } | null>(null);

  useEffect(() => {
    fetch("/api/user-dashboard")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Fetch error", err));
  }, []);

  if (!data) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 tracking-wide">👤 User Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* Listed Cars Section */}
        <section className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FiTruck className="text-green-400" />
            Your Listed Cars
          </h2>

          {data.cars.length === 0 ? (
            <p className="text-gray-400">You haven't listed any cars yet.</p>
          ) : (
            <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {data.cars.map((car) => (
                <li
                  key={car.id}
                  className="border border-gray-800 p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
                >
                  <h3 className="text-lg font-medium text-green-300">
                    {car.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {car.make} • {car.model} • {car.year}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Estimated Price: <span className="text-white">PKR {car.estimatedPrice.toLocaleString()}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Cart Items Section */}
        <section className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FiShoppingCart className="text-yellow-400" />
            Your Cart Items
          </h2>

          {data.cart.length === 0 ? (
            <p className="text-gray-400">No items in your cart.</p>
          ) : (
            <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {data.cart.map((item) => (
                <li
                  key={item.carId}
                  className="border border-gray-800 p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
                >
                  <p className="text-sm text-white">
                    Car ID: <span className="text-green-300">{item.carId}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
