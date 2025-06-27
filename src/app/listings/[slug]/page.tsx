export const dynamic = "force-dynamic";
export const dynamicParams = true;

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;

  const query = `*[_type == "car" && slug.current == $slug][0]{
    _id,
    name,
    price,
    image,
    year,
    fuel,
    description
  }`;

  const car = await client.fetch(query, { slug });

  if (!car) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8">
        
        {/* Car Image */}
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <Image
            src={urlFor(car.image).url()}
            alt={car.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Car Info */}
        <div className="space-y-6 text-[#0C2340]">
          <h1 className="text-4xl font-bold">{car.name}</h1>
          <p className="text-gray-600 text-lg">Used | {car.year}</p>

          <div className="text-md text-gray-700 space-y-2">
            <p><span className="font-semibold">Fuel Type:</span> {car.fuel}</p>
            <p><span className="font-semibold">Model Year:</span> {car.year}</p>
            <p><span className="font-semibold">Price:</span> ${car.price}</p>
            {car.description && (
              <p><span className="font-semibold">Description:</span> {car.description}</p>
            )}
          </div>

       <Link href={"/cart"}>   <button className="mt-4 px-6 py-3 bg-[#0C2340] text-white rounded-full hover:bg-blue-900 transition">
            Add to Cart
          </button></Link>
        </div>
      </div>
    </div>
  );
}
