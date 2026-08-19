"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { COLORS, MATERIALS, SORT_OPTIONS } from "@/lib/constants/filters";
import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

interface ProductFiltersProps {
  categories: ALL_CATEGORIES_QUERYResult;
}

// Extracted FilterLabel outside the main component to prevent render re-creation crashes
interface FilterLabelProps {
  children: React.ReactNode;
  isActive: boolean;
  filterKey: string;
  onClear: (key: string) => void;
}

function FilterLabel({ children, isActive, filterKey, onClear }: FilterLabelProps) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <span
        className={`block text-sm font-black uppercase tracking-tight ${
          isActive ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {children}
        {isActive && (
          <Badge className="ml-2 h-5 rounded-full border-2 border-border bg-foreground px-2 text-xs font-bold uppercase text-background shadow-[2px_2px_0px_var(--border)]">
            Active
          </Badge>
        )}
      </span>
      {isActive && (
        <button
          type="button"
          onClick={() => onClear(filterKey)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label={`Clear ${filterKey} filter`}
        >
          <X className="h-4 w-4 stroke-[3]" />
        </button>
      )}
    </div>
  );
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentColor = searchParams.get("color") ?? "";
  const currentMaterial = searchParams.get("material") ?? "";
  const currentSort = searchParams.get("sort") ?? "name";
  const urlMinPrice = Number(searchParams.get("minPrice")) || 0;
  const urlMaxPrice = Number(searchParams.get("maxPrice")) || 5000;
  const currentInStock = searchParams.get("inStock") === "true";

  // Local state for price range (initialized safely without cascading useEffect)
  const [priceRange, setPriceRange] = useState<[number, number]>([
    urlMinPrice,
    urlMaxPrice,
  ]);

  // Check which filters are active
  const isSearchActive = !!currentSearch;
  const isCategoryActive = !!currentCategory;
  const isColorActive = !!currentColor;
  const isMaterialActive = !!currentMaterial;
  const isPriceActive = urlMinPrice > 0 || urlMaxPrice < 5000;
  const isInStockActive = currentInStock;

  const hasActiveFilters =
    isSearchActive ||
    isCategoryActive ||
    isColorActive ||
    isMaterialActive ||
    isPriceActive ||
    isInStockActive;

  // Count active filters
  const activeFilterCount = [
    isSearchActive,
    isCategoryActive,
    isColorActive,
    isMaterialActive,
    isPriceActive,
    isInStockActive,
  ].filter(Boolean).length;

  const updateParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === 0) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;
    updateParams({ q: searchQuery || null });
  };

  const handleClearFilters = () => {
    router.push("/", { scroll: false });
  };

  const clearSingleFilter = (key: string) => {
    if (key === "price") {
      setPriceRange([0, 5000]);
      updateParams({ minPrice: null, maxPrice: null });
    } else {
      updateParams({ [key]: null });
    }
  };

  return (
    <div className="space-y-6 rounded-[20px] border-2 border-border bg-card p-6 shadow-[8px_8px_0px_var(--border)] ">
      {/* Clear Filters - Show at top when active */}
      {hasActiveFilters && (
        <div className="rounded-[10px] border-2 border-border bg-yellow-400 p-4 text-black shadow-[4px_4px_0px_var(--border)]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-black uppercase tracking-tight">
              {activeFilterCount}{" "}
              {activeFilterCount === 1 ? "filter" : "filters"} applied
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleClearFilters}
            className="w-full rounded-full border-2 border-black bg-black text-white font-black uppercase hover:bg-zinc-800 shadow-[2px_2px_0px_black]"
          >
            <X className="mr-2 h-4 w-4 stroke-[3]" />
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Search */}
      <div>
        <FilterLabel isActive={isSearchActive} filterKey="q" onClear={clearSingleFilter}>
          Search
        </FilterLabel>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            name="search"
            placeholder="Search products..."
            defaultValue={currentSearch}
            className={`rounded-[10px] border-2 border-border bg-background font-bold text-foreground ${
              isSearchActive
                ? "border-foreground ring-2 ring-foreground"
                : ""
            }`}
          />
          <Button 
            type="submit" 
            size="sm"
            className="rounded-[10px] border-2 border-border bg-foreground font-black uppercase text-background shadow-[2px_2px_0px_var(--border)] hover:translate-y-[2px] hover:shadow-none"
          >
            Search
          </Button>
        </form>
      </div>

      {/* Category */}
      <div>
        <FilterLabel isActive={isCategoryActive} filterKey="category" onClear={clearSingleFilter}>
          Category
        </FilterLabel>
        <Select
          value={currentCategory || "all"}
          onValueChange={(value) =>
            updateParams({ category: value === "all" ? null : value })
          }
        >
          <SelectTrigger
            className={`rounded-[10px] border-2 border-border bg-background font-bold uppercase text-foreground ${
              isCategoryActive
                ? "border-foreground ring-2 ring-foreground"
                : ""
            }`}
          >
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="rounded-[10px] border-2 border-border bg-card font-bold uppercase">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category.slug ?? ""}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <FilterLabel isActive={isPriceActive} filterKey="price" onClear={clearSingleFilter}>
          Price: ₹{priceRange[0]} - ₹{priceRange[1]}
        </FilterLabel>
        <Slider
          min={0}
          max={5000}
          step={100}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          onValueCommit={([min, max]) =>
            updateParams({
              minPrice: min > 0 ? min : null,
              maxPrice: max < 5000 ? max : null,
            })
          }
          className="mt-4"
        />
      </div>

      {/* In Stock Only */}
      <div>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={currentInStock}
            onChange={(e) =>
              updateParams({ inStock: e.target.checked ? "true" : null })
            }
            className="h-5 w-5 rounded-[4px] border-2 border-border accent-foreground cursor-pointer"
          />
          <span
            className={`text-sm font-black uppercase tracking-tight ${
              isInStockActive ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Show only in-stock
            {isInStockActive && (
              <Badge className="ml-2 h-5 rounded-full border-2 border-border bg-foreground px-2 text-xs font-bold uppercase text-background shadow-[2px_2px_0px_var(--border)]">
                Active
              </Badge>
            )}
          </span>
        </label>
      </div>

      {/* Sort */}
      <div>
        <span className="mb-2 block text-sm font-black uppercase tracking-tight text-muted-foreground">
          Sort By
        </span>
        <Select
          value={currentSort}
          onValueChange={(value) => updateParams({ sort: value })}
        >
          <SelectTrigger className="rounded-[10px] border-2 border-border bg-background font-bold uppercase text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-[10px] border-2 border-border bg-card font-bold uppercase">
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}