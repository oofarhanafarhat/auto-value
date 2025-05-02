export const dynamic = "force-dynamic";

import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

type PageProps = {
  params: { slug: string };
};

// ✅ Pure async fetch function — no sync decoding
async function getCarData(slug: string) {
  const query = `
    *[_type == "car" && slug.current == $slug][0]{
      _id,
      name,
      "slug": slug.current,
      price,
      "imageUrl": image.asset->url,
      description,
      year,
      mileage,
      fuel,
      transmission
    }
  `;

  try {
    const car = await client.fetch(query, { slug });
    return car;
  } catch (error) {
    console.error("❌ Error fetching car data:", error);
    throw new Error("Failed to fetch car data.");
  }
}

export default async function CarDetailPage({ params }: PageProps) {
  // ✅ Just use the slug directly
  const { slug } = await Promise.resolve(params); // 👈 force async handling
  const car = await getCarData(slug);
  

  if (!car) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-gray-50 shadow-xl rounded-3xl mt-10 mb-16 space-y-8 transition-all duration-300">
      {/* Car Image */}
      <div className="relative w-full h-80 sm:h-[28rem] rounded-2xl overflow-hidden shadow-lg group">
        <Image
          src={car.imageUrl}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Car Info */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-3xl font-bold text-gray-900">{car.name}</h1>
        <div className="text-lg sm:text-xl text-gray-600 space-y-1">
          <p>
            <span className="font-semibold">Year:</span> {car.year} &nbsp;|&nbsp;
            <span className="font-semibold">Mileage:</span>{" "}
            {Number(car.mileage).toLocaleString()} km
          </p>
          <p>
            <span className="font-semibold">Fuel:</span> {car.fuel} &nbsp;|&nbsp;
            <span className="font-semibold">Transmission:</span> {car.transmission}
          </p>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
        <p className="mt-3 text-gray-700 leading-relaxed text-base sm:text-lg">
          {car.description}
        </p>
      </div>

      {/* Price & Add to Cart */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-3xl sm:text-4xl font-bold text-gray-700">
          ${Number(car.price).toLocaleString()}
        </div>
        <AddToCartButton carId={car._id} />
      </div>
    </div>
  );
}
