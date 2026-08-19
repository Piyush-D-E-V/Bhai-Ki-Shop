"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/app/AddToCartButton";
import { StockBadge } from "@/components/app/StockBadge";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";

type Product = FILTER_PRODUCTS_BY_NAME_QUERYResult[number];

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(
    null,
  );

  const images = product.images ?? [];
  const mainImageUrl = images[0]?.asset?.url;
  const displayedImageUrl =
    hoveredImageIndex !== null
      ? images[hoveredImageIndex]?.asset?.url
      : mainImageUrl;

  const stock = product.stock ?? 0;
  const isOutOfStock = stock <= 0;
  const hasMultipleImages = images.length > 1;

  return (
    <Card className="group relative flex h-full flex-col bg-card border-2 border-border rounded-[20px] p-5 text-center transition-all duration-300 shadow-[8px_8px_0px_var(--border)] hover:-translate-y-[5px] hover:shadow-[12px_12px_0px_var(--border)] overflow-hidden">
      <Link href={`/products/${product.slug}`} className="block w-full">
        <div className="relative h-[250px] w-full mb-[15px] overflow-hidden rounded-[10px] border-2 border-border bg-background">
          {displayedImageUrl ? (
            <Image
              src={displayedImageUrl}
              alt={product.name ?? "Product image"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <svg
                className="h-16 w-16 opacity-30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          
          {/* Brutalist styling for Badges */}
          {isOutOfStock && (
            <Badge
              variant="destructive"
              className="absolute right-3 top-3 rounded-full border-2 border-border bg-card px-3 py-1 text-xs font-bold text-card-foreground shadow-[2px_2px_0px_var(--border)]"
            >
              Out of Stock
            </Badge>
          )}
          {product.category && (
            <span className="absolute left-3 top-3 rounded-full border-2 border-border bg-card px-3 py-1 text-xs font-bold text-card-foreground shadow-[2px_2px_0px_var(--border)]">
              {product.category.title}
            </span>
          )}
        </div>
      </Link>

      {/* Thumbnail strip styled to match */}
      {hasMultipleImages && (
        <div className="flex gap-2 mb-4 rounded-[10px]">
          {images.map((image, index) => (
            <button
              key={image._key ?? index}
              type="button"
              className={cn(
                "relative h-14 flex-1 overflow-hidden rounded-[5px] border-2 transition-all duration-200 bg-background",
                hoveredImageIndex === index
                  ? "border-border shadow-[2px_2px_0px_var(--border)]"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
              onMouseEnter={() => setHoveredImageIndex(index)}
              onMouseLeave={() => setHoveredImageIndex(null)}
            >
              {image.asset?.url && (
                <Image
                  src={image.asset.url}
                  alt={`${product.name} - view ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              )}
            </button>
          ))}
        </div>
      )}

      <CardContent className="flex grow flex-col items-center justify-start p-0">
        <Link href={`/products/${product.slug}`} className="block w-full">
          <h3 className="mb-[10px] text-[1.2rem] font-bold leading-[1.4] text-foreground line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-col items-center gap-1 mb-[20px]">
          <p className="text-[1.4rem] font-black text-muted-foreground">
            {formatPrice(product.price)}
          </p>
          <StockBadge productId={product._id} stock={stock} />
        </div>
      </CardContent>

      <CardFooter className="mt-auto p-0 w-full flex justify-center">
        <div className="flex w-full flex-col gap-2 *:w-full">
          <AddToCartButton
            productId={product._id}
            name={product.name ?? "Unknown Product"}
            price={product.price ?? 0}
            image={mainImageUrl ?? undefined}
            stock={stock}
          />
        </div>
      </CardFooter>
    </Card>
  );
}