export interface Car {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: string;
  description: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
}

import { client } from "./client";

export const fetchCarBySlug = async (slug: string): Promise<Car> => {
  const query = 
    `*[_type == "car" && slug.current == $slug][0]{
      _id,
      name,
    "slug": slug.current,
      "imageUrl": image.asset->url,
      price,
      description,
      year,
      mileage,
      fuel,
      transmission
  };
  return await client.fetch(query, { slug });
`}