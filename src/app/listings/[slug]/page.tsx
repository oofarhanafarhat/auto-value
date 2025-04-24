import { client } from "@/sanity/lib/client"; // Sanity client
import { notFound } from "next/navigation"; // Built-in 404 page
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton"; // Import the Client Component
type Props = {
  params: {
    slug: string;
  };
};




  export default async function CarDetailPage({
    params,
  }: {
    params: { slug: string };
  }) {
  
  const slug = decodeURIComponent(params.slug); // Decode slug to handle spaces or special characters

  console.log("Slug parameter (decoded):", slug);

  // GROQ query to fetch car details by slug
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
    car = await client.fetch(query, { slug }); // Fetch car data from Sanity
    console.log("Fetched car data:", car);
  } catch (error) {
    console.error("Error fetching car data:", error); // Log errors if the query fails
    throw new Error("Failed to fetch car data.");
  }

  if (!car) return notFound(); // Show 404 page if no car is found

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Car Image Section */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md">
        <Image
          src={car.imageUrl} // Display car image
          alt={car.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Car Title and Info */}
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

      {/* Car Description */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">Description</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">{car.description}</p>
      </div>

      {/* Car Price and Add to Cart */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-3xl font-bold text-green-600">
          Price: ${car.price} {/* Display car price */}
        </div>
        {/* Use the Client Component for the Add to Cart button */}
        <AddToCartButton carId={car._id} />
      </div>
    </div>
  );
}