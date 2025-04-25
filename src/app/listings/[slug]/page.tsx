// src/app/listings/[slug]/page.tsx

import { Metadata } from "next"; // for metadata
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

// Step 1: Type define karo for params
interface CarDetailPageProps {
  params: {
    slug: string;
  };
}

// Step 2: Metadata generate karna (for SEO, titles)
export async function generateMetadata({ params }: CarDetailPageProps): Promise<Metadata> {
  return {
    title: `Car Detail - ${decodeURIComponent(params.slug)}`,
  } as Metadata;
}
// Step 3: Actual page component
export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const slug = decodeURIComponent(params.slug);

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

  let car;
  try {
    car = await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw new Error("Failed to fetch car data.");
  }

  if (!car) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-3xl mt-10 space-y-8">
      <div className="relative w-full h-80 sm:h-[28rem] rounded-2xl overflow-hidden shadow-lg group">
        <Image
          src={car.imageUrl}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">{car.name}</h1>
        <div className="text-lg sm:text-xl text-gray-600 space-y-1">
          <p>
            <span className="font-semibold">Year:</span> {car.year} &nbsp;|&nbsp;
            <span className="font-semibold">Mileage:</span> {car.mileage.toLocaleString()} km
          </p>
          <p>
            <span className="font-semibold">Fuel:</span> {car.fuel} &nbsp;|&nbsp;
            <span className="font-semibold">Transmission:</span> {car.transmission}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
        <p className="mt-3 text-gray-700 leading-relaxed text-base sm:text-lg">
          {car.description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-3xl sm:text-4xl font-bold text-green-600">
          ${car.price.toLocaleString()}
        </div>
        <AddToCartButton carId={car._id} />
      </div>
    </div>
  );
}