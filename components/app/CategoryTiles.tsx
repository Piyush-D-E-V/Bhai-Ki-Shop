"use client";

import Link from "next/link";
import Image from "next/image";
import { Grid2x2 } from "lucide-react";
import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

interface CategoryTilesProps {
  categories: ALL_CATEGORIES_QUERYResult;
  activeCategory?: string;
}

export function CategoryTiles({
  categories,
  activeCategory,
}: CategoryTilesProps) {
  
  // 1. We combine "All Products" and your CMS categories into a single array 
  // so we can map them seamlessly into the bento grid.
  const displayItems = [
    {
      _id: "all-products",
      title: "All Products",
      slug: "",
      isAll: true,
      image: null,
    },
    ...categories.map((cat) => ({
      _id: cat._id,
      title: cat.title,
      slug: cat.slug || "",
      isAll: false,
      image: cat.image?.asset?.url,
    })),
  ];

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 grid-flow-dense auto-rows-[200px] gap-4 sm:grid-cols-2 md:auto-rows-[250px] lg:grid-cols-4 lg:gap-6">
        
        {displayItems.map((item, index) => {
          const isActive = activeCategory === item.slug || (!activeCategory && item.isAll);
          
          // 2. Bento pattern math: Assigns different sizes based on the item's index
          const bentoPatterns = [
            "sm:col-span-2 sm:row-span-2", // Index 0: Giant 2x2 block (All Products)
            "sm:col-span-2 sm:row-span-1", // Index 1: Wide rectangle (e.g., T-Shirts)
            "sm:col-span-1 sm:row-span-2", // Index 2: Tall vertical block (e.g., Hoodies)
            "sm:col-span-1 sm:row-span-1", // Index 3: Standard square (e.g., Shoes)
            "sm:col-span-2 sm:row-span-1", // Index 4: Wide rectangle (e.g., Fun Items)
            "sm:col-span-1 sm:row-span-1", // Index 5: Standard square (e.g., Wall Art)
          ];
          const spanClass = bentoPatterns[index % bentoPatterns.length];

          return (
            <Link
              key={item._id}
              href={item.slug ? `/?category=${item.slug}` : "/"}
              className={`group relative flex h-full w-full overflow-hidden rounded-[20px] border-2 border-border bg-card transition-all duration-300 ${spanClass} ${
                isActive
                  ? "shadow-[6px_6px_0px_var(--border)] -translate-y-1"
                  : "shadow-[4px_4px_0px_var(--border)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_var(--border)]"
              }`}
            >
              <div className="relative h-full w-full bg-background grayscale-100 hover:grayscale-0 duration-300">
                
                {/* 
                  =======================================================
                  CUSTOM IMAGE TAGS - PUT YOUR LOCAL IMAGES HERE
                  =======================================================
                */}

                {index === 0 && (
                  <Image
                    src="/images/allproductsbaner.png" // <-- ALL PRODUCTS (GIANT BLOCK)
                    alt="allproducts"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                )}

                {index === 1 && (
                  <Image
                    src="/images/funtiems.png" // <-- 1ST CATEGORY (WIDE)
                    alt="fun items"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                )}

                {index === 2 && (
                  <Image
                    src="/images/boy.png" // <-- 2ND CATEGORY (TALL)
                    alt="hoodies"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                )}

                {index === 3 && (
                  <Image
                    src="/images/shoes.png" // <-- 3RD CATEGORY (SQUARE)
                    alt="shoes"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                )}

                {index === 4 && (
                  <Image
                      src="/images/solo.jpg" // <-- 1ST CATEGORY (WIDE)
                    alt="t-shirts"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                )}

                {index === 5 && (
                  <Image
                    src="/images/wallart.jpg" // <-- 5TH CATEGORY (SQUARE)
                    alt="wall-art"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                )}

                {/* Fallback for any categories beyond index 5 */}
                {index > 5 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background">
                    <Grid2x2 className="h-16 w-16 text-foreground transition-transform duration-500 group-hover:scale-110 stroke-[2.5]" />
                  </div>
                )}

                {/* ======================================================= */}

                {/* Contrast overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Category Name */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <span className="text-xl font-black uppercase tracking-tight text-white drop-shadow-md md:text-2xl">
                    {item.title}
                  </span>
                </div>

                {/* Active Indicator Badge */}
                {isActive && (
                  <div className="absolute right-4 top-4 z-10">
                    <span className="flex h-3 w-3 md:h-4 md:w-4">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
                      <span className="relative inline-flex h-full w-full rounded-full border-2 border-border bg-yellow-400" />
                    </span>
                  </div>
                )}
                
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}