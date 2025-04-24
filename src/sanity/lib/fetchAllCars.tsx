
import { client } from "./client";

// TypeScript interface for car object from Sanity
export interface Car {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  description: string;
}

export const fetchAllCars = async (): Promise<Car[]> => {
  const query = `
    *[_type == "car"]{
      _id,
      name,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      price,
      year,
      mileage,
      fuel,
      transmission,
      description
    }
  `;

  const cars = await client.fetch(query);
  return cars;
};