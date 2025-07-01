import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import CarDetailClient from "./CarDetailClient"; // 👈 new client component

interface Props {
  params: { slug: string };
}

export default async function CarDetailPage({ params }: Props) {
  const query = `*[_type == "car" && slug.current == $slug][0]{
    _id,
    name,
    price,
    image,
    year,
    fuel,
    description
  }`;

  const car = await client.fetch(query, { slug: params.slug });

  if (!car) return notFound();

  return <CarDetailClient car={car} />;
}
