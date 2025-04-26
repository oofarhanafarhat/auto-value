// File: app/listing/[slug]/page.tsx

// Importing the configured Sanity client
import { client } from "@/sanity/lib/client";

// Helper to show 404 if the car is not found
import { notFound } from "next/navigation";

// For rendering car image
import Image from "next/image";

// Add to cart functionality component
import AddToCartButton from "@/components/AddToCartButton";

// Define the expected props type using CarDetailPageProps
// This helps prevent deployment issues where TypeScript cannot infer types
type CarDetailPageProps = {
  params: {
    slug?: string; // Making it optional avoids type errors in production
  };
};

// Exporting the dynamic car detail page component
export default async function CarDetailPage({ params }: CarDetailPageProps) {
  // Safely decode the slug value or fallback to empty string
  const slug = decodeURIComponent(params.slug || "");

  console.log("Slug parameter (decoded):", slug);

  // GROQ query to fetch car data by slug
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
    // Fetch the car data using the slug
    console.log("Executing query with slug:", slug);
    car = await client.fetch(query, { slug });
    console.log("Fetched car data:", car);
  } catch (error) {
    // Log and throw an error if query fails
    console.error("Error fetching car data:", error);
    throw new Error("Failed to fetch car data.");
  }

  // Show 404 page if car not found
  if (!car) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-3xl mt-10 space-y-8 transition-all duration-300">

      {/* Car Image */}
      <div className="relative w-full h-80 sm:h-[28rem] rounded-2xl overflow-hidden shadow-lg group">
        <Image
          src={car.imageUrl}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Car Title & Specs */}
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

      {/* Description Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
        <p className="mt-3 text-gray-700 leading-relaxed text-base sm:text-lg">
          {car.description}
        </p>
      </div>

      {/* Price and Add to Cart Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-3xl sm:text-4xl font-bold text-gray-700">
          ${car.price.toLocaleString()}
        </div>

        {/* AddToCart button uses the car ID */}
        <AddToCartButton carId={car._id} />
      </div>
    </div>
  );
}