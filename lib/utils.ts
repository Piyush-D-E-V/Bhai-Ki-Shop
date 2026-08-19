import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a price amount with currency symbol
 * @param amount - The price amount (can be null/undefined)
 * @param currency - Currency symbol (default: "$")
 * @returns Formatted price string (e.g., "$599.99")
 */
export function formatPrice(
  amount: number | null | undefined,
  currency = "$"
): string {
  return `${currency}${(amount ?? 0).toFixed(2)}`;
}

/**
 * Format a date string into a readable format
 * @param dateString - The ISO date string from the database
 * @returns Formatted date (e.g., "Aug 10, 2026")
 */
// ✨ FIXED: Changed return type from unknown to string ✨
export function formatDate(dateString: string | Date | null): string {
  if (!dateString) return "Unknown date";
  
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format an order number for display
 * @param orderNumber - The raw order number
 * @returns Formatted order number (e.g., "#ORD-1234")
 */
export function formatOrderNumber(orderNumber: string | undefined | null): string {
  if (!orderNumber) return "#UNKNOWN";
  
  // Ensure it starts with a hash if it doesn't already
  return orderNumber.startsWith("#") ? orderNumber : `#${orderNumber}`;
}