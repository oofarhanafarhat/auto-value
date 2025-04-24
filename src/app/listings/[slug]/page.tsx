import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

export default async function CarDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);

  console.log("Slug parameter (decoded):", slug);

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
    console.log("Executing query with slug:", slug);
    car = await client.fetch(query, { slug });
    console.log("Fetched car data:", car);
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw new Error("Failed to fetch car data.");
  }

  if (!car) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md">
        <Image
          src={car.imageUrl}
          alt={car.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-6">
        <h1 className="text-4xl font-extrabold text-gray-800">{car.name}</h1>
        <p className="text-lg text-gray-500 mt-2">
          Year: <span className="font-medium">{car.year}</span> | Mileage:{" "}
          <span className="font-medium">{car.mileage} km</span>
        </p>
        <p className="text-lg text-gray-500 mt-1">
          Fuel: <span className="font-medium">{car.fuel}</span> | Transmission:{" "}
          <span className="font-medium">{car.transmission}</span>
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">Description</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">{car.description}</p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-3xl font-bold text-green-600">
          Price: ${car.price}
        </div>
        <AddToCartButton carId={car._id} />
      </div>
    </div>
  );
}
