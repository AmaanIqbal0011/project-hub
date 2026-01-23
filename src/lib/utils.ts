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