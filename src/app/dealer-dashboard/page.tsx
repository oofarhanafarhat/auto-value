"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CarIcon,
  EyeIcon,
  ShoppingCartIcon,
  BadgeCheckIcon,
} from "lucide-react";

interface Car {
  id: number;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  condition: string;
  source: string;
  estimatedPrice: number;
  createdAt: string;
}

export default function DealerDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Dealer registration
  const registerDealer = async () => {
    const res = await fetch("/api/register-dealer", { method: "POST" });
    const data = await res.json();
    alert(data.message + (data.dealerCode ? ` | Code: ${data.dealerCode}` : ""));
    window.location.reload();
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await fetch("/api/dealer-dashboard");
   if (res.status === 401) {
  router.push("/sign-in");
  return;
}

if (res.status === 403) {
  // User not registered as dealer yet
  setData({ dealerCode: null, totalListings: 0, totalVisits: 0, totalSales: 0, allCars: [] });
  setLoading(false);
  return;
}

      const result = await res.json();
      setData(result);
      setLoading(false);
    };
    fetchDashboard();
  }, [router]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="text-gray-500 text-lg">Loading dashboard...</span>
      </div>
    );

  if (!data)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="text-red-500 text-lg">No data available</span>
      </div>
    );

  const { dealerCode, totalListings, totalVisits, totalSales, allCars } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-[#0C2340] mb-6">
          🚗 Dealer Dashboard
        </h1>

        {/* ✅ Register Dealer Button */}
        {!dealerCode && (
          <div className="text-center mb-8">
            <button
              onClick={registerDealer}
              className="px-6 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
            >
              Register as Dealer
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Dealer Code"
            value={dealerCode || "N/A"}
            icon={<BadgeCheckIcon />}
            color="text-indigo-600"
          />
          <StatCard
            title="Total Listings"
            value={totalListings}
            icon={<CarIcon />}
            color="text-blue-600"
          />
          <StatCard
            title="Total Visits"
            value={totalVisits}
            icon={<EyeIcon />}
            color="text-green-600"
          />
          <StatCard
            title="Total Sales"
            value={totalSales}
            icon={<ShoppingCartIcon />}
            color="text-purple-600"
          />
        </div>

        <h2 className="text-2xl font-semibold text-[#0C2340] mb-6">
          Your Car Listings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(allCars) && allCars.length > 0 ? (
            allCars.map((car: Car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl p-5 shadow-md border hover:shadow-xl transition hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-[#0C2340] mb-2">
                  {car.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Model: <span className="font-medium">{car.model}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Year: <span className="font-medium">{car.year}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Condition:{" "}
                  <span className="font-medium">{car.condition}</span>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Price:{" "}
                  <span className="font-semibold text-green-700">
                    Rs {car.price}
                  </span>
                </p>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Source: {car.source}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No car listings available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Subcomponent: Stat Card
function StatCard({
  title,
  value,
  color = "text-blue-600",
  icon,
}: {
  title: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition flex items-center gap-4">
      <div className={`text-3xl ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
      </div>
    </div>
  );
}
