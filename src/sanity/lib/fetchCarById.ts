
/*
  Commit: Fetch car data from Sanity using car ID (_id)
*/

import { client } from "./client";

export const fetchCarById = async (id: string) => {
  const query = `*[_type == "car" && _id == $id][0]{
    _id,
    name,
    price,
    "imageUrl": image.asset->url
  }`;

  return await client.fetch(query, { id });
};