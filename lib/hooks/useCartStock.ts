"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_IDS_QUERY } from "@/sanity/queries/products";
import type { CartItem } from "@/lib/store/cart-store";

export interface StockInfo {
  productId: string;
  currentStock: number;
  isOutOfStock: boolean;
  exceedsStock: boolean;
  availableQuantity: number;
}

export type StockMap = Map<string, StockInfo>;

interface UseCartStockReturn {
  stockMap: StockMap;
  isLoading: boolean;
  hasStockIssues: boolean;
  refetch: () => void;
}

/**
 * Fetches current stock levels for cart items
 * Returns stock info map and loading state
 */
export function useCartStock(items: CartItem[]): UseCartStockReturn {
  const [stockMap, setStockMap] = useState<StockMap>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  // Memoize product IDs to use as stable dependency
  const productIds = useMemo(
    () => items.map((item) => item.productId),
    [items]
  );

  const fetchStock = useCallback(async () => {
    if (items.length === 0) {
      setStockMap(new Map());
      return;
    }

    setIsLoading(true);

    try {
      const products = await client.fetch(PRODUCT_BY_IDS_QUERY, {
        ids: productIds,
      });

      const newStockMap = new Map<string, StockInfo>();

      for (const item of items) {
        const product = products.find(
          (p: { _id: string }) => p._id === item.productId
        );
        const currentStock = product?.stock ?? 0;

        newStockMap.set(item.productId, {
          productId: item.productId,
          currentStock,
          isOutOfStock: currentStock === 0,
          exceedsStock: item.quantity > currentStock,
          availableQuantity: Math.min(item.quantity, currentStock),
        });
      }

      setStockMap(newStockMap);
    } catch (error) {
      console.error("Failed to fetch stock:", error);
    } finally {
      setIsLoading(false);
    }
  }, [items, productIds]);

 useEffect(() => {
  // 1. Define the function INSIDE the effect
  const fetchStock = async () => {
    try {
      // Your fetch logic here
      // const response = await sanityFetch(...);
      // setStock(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 2. Call it immediately
  fetchStock();
}, []);

  const hasStockIssues = Array.from(stockMap.values()).some(
    (info) => info.isOutOfStock || info.exceedsStock
  );

  return {
    stockMap,
    isLoading,
    hasStockIssues,
    refetch: fetchStock,
  };
}
