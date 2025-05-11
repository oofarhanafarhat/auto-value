// ✅ lib/fetchCars.ts
// Fetch latest 3 cars from Sanity

import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId,useCdn } from '../env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  
});

// Function to fetch 3 cars for Explore section
export async function fetchCars() {
  const cars = await client.fetch(
    `*[_type == "car"] | order(_createdAt desc)[0...2]{
      _id,
      name,
      slug,
      price,
      image,
      year,
      fuel
    }`
  );
  return cars;
}