
import { client } from "./client";

// Fetch cars of both types (new and used)
export const fetchCars = async () => {
  const query = `
    *[_type == "car"]{
      _id,
      name,
      price,
      "imageUrl": image.asset->url,
      slug,
      "type": "new"
    }
    + 
    *[_type == "usedCar"]{
      _id,
      name,
      price,
      "imageUrl": image.asset->url,
      slug,
      "type": "used"
    }
  `;
  
  return await client.fetch(query);
};