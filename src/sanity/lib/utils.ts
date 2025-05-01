// lib/utils.ts

// ✅ Importing clsx to conditionally join class names
import { clsx, type ClassValue } from "clsx";

// ✅ Importing tailwind-merge to merge conflicting Tailwind classes
import { twMerge } from "tailwind-merge";

// ✅ Utility function: combines clsx and twMerge for safe, clean Tailwind class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs)); // ✅ Merges all class names and removes conflicts
}