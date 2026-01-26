import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formateDate(date : string) {
  const d = new Date(date);
  return `${d.getUTCDate()} ${d.toLocaleString("en-US", {
    month: "long",
  })} ${d.getUTCFullYear()}`;
}

export function parseServerActionResponse<T>(response : T){
  return JSON.parse(JSON.stringify(response));
}

/**
 * Generate absolute URL for Sanity images
 */
export function getAbsoluteImageUrl(imageUrl: string | undefined): string | null {
  if (!imageUrl) return null;

  // If it's already an absolute URL, return as-is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // Otherwise, prepend the base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nextjs-project-hub.vercel.app';
  return `${baseUrl}${imageUrl}`;
}