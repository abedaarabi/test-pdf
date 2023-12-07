import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToAscii(inputString: string): string {
  // Replace non-ASCII characters and spaces with underscores
  const asciiString = inputString
    .replace(/[^\x20-\x7E]+/g, "")
    .replace(/\s+/g, "_");
  console.log(asciiString);

  return asciiString;
}
