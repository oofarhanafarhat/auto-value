// src/sanity/env.ts

export const apiVersion = '2023-11-01'; // or whatever your API version is
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pekt3fbw'; // replace
export const useCdn = process.env.NODE_ENV === 'production'; // `false` if you want to ensure fresh data
