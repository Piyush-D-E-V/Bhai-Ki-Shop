"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PRODUCT_BY_SLUG_QUERYResult } from "@/sanity.types";

type ProductImages = NonNullable<
  NonNullable<PRODUCT_BY_SLUG_QUERYResult>["images"]
>;

interface ProductGalleryProps {
  images: ProductImages | null;
  productName: string | null;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-[20px] border-2 border-border bg-card shadow-[8px_8px_0px_var(--border)]">
        <span className="font-bold uppercase text-muted-foreground">
          No images available
        </span>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-[20px] border-2 border-border bg-background shadow-[8px_8px_0px_var(--border)]">
        {selectedImage?.asset?.url ? (
          <Image
            src={selectedImage.asset.url}
            alt={productName ?? "Product image"}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center font-bold uppercase text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6">
          {images.map((image, index) => (
            <button
              key={image._key}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`View image ${index + 1}`}
              aria-pressed={selectedIndex === index}
              className={cn(
                "relative aspect-square overflow-hidden rounded-[10px] border-2 transition-all duration-200 bg-background",
                selectedIndex === index
                  ? "border-border shadow-[4px_4px_0px_var(--border)] opacity-100"
                  : "border-border opacity-60 shadow-none hover:-translate-y-[2px] hover:shadow-[4px_4px_0px_var(--border)] hover:opacity-100"
              )}
            >
              {image.asset?.url ? (
                <Image
                  src={image.asset.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs font-bold uppercase text-muted-foreground">
                  N/A
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}