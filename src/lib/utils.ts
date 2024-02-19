/**
 * Combines multiple class names into a single string using clsx and tailwind-merge.
 * 
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
