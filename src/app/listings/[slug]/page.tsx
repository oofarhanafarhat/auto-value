import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import CarDetailClient from "./CarDetailClient"; // 👈 new client component

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


  return <CarDetailClient car={car} />;
}
