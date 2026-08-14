import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  FEATURED_PRODUCTS_QUERY,
  FILTER_PRODUCTS_BY_NAME_QUERY,
  FILTER_PRODUCTS_BY_PRICE_ASC_QUERY,
  FILTER_PRODUCTS_BY_PRICE_DESC_QUERY,
  FILTER_PRODUCTS_BY_RELEVANCE_QUERY,
} from "@/sanity/queries/products";
// WARNING: Ye file abhi banani baaki hai
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories"; 

// WARNING: Ye components abhi banane baaki hain
import { ProductSection } from "@/components/LandingPage/ProductSection";
import { CategoryTiles } from "@/components/LandingPage/CategoryTiles";
import { FeaturedCarousel } from "@/components/LandingPage/FeaturedCarousel";
import { FeaturedCarouselSkeleton } from "@/components/LandingPage/FeaturedCarouselSkeleton";
import { Any } from "next-sanity";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    color?: string;
    material?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    inStock?: string;
  }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  const searchQuery = params.q ?? "";
  const categorySlug = params.category ?? "";
  const color = params.color ?? "";
  const material = params.material ?? "";
  const minPrice = Number(params.minPrice) || 0;
  const maxPrice = Number(params.maxPrice) || 0;
  const sort = params.sort ?? "name";
  const inStock = params.inStock === "true";

  const getQuery = () => {
    if (searchQuery && sort === "relevance") {
      return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
    }
    switch (sort) {
      case "price_asc":
        return FILTER_PRODUCTS_BY_PRICE_ASC_QUERY;
      case "price_desc":
        return FILTER_PRODUCTS_BY_PRICE_DESC_QUERY;
      case "relevance":
        return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
      default:
        return FILTER_PRODUCTS_BY_NAME_QUERY;
    }
  };

  const { data: products } = (await sanityFetch({
    query: getQuery(),
    params: {
      searchQuery,
      categorySlug,
      color,
      material,
      minPrice,
      maxPrice,
      inStock,
    },
  })) as { data: Any };

  const { data: categories } = (await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  })) as { data: Any };

  const { data: featuredProducts } = (await sanityFetch({
    query: FEATURED_PRODUCTS_QUERY,
  })) as { data: Any[] };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      
      {/* Featured Products Carousel - Hero Section */}
      {featuredProducts?.length > 0 && (
        <div className="bg-zinc-950 pt-4 pb-8">
          <Suspense fallback={<FeaturedCarouselSkeleton />}>
            <FeaturedCarousel products={featuredProducts} />
          </Suspense>
        </div>
      )}

      {/* Page Banner (TactileRig Themed) */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-900/50 dark:bg-zinc-950 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            {categorySlug ? (
               <span className="capitalize">{categorySlug.replace("-", " ")} Gear</span>
            ) : (
               <span>Explore All <span className="text-cyan-500">Hardware</span></span>
            )}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Build your dream setup with premium mechanical keyboards, components, and accessories.
          </p>
        </div>

        {/* Category Tiles */}
        <div className="mt-6 pb-2">
          <CategoryTiles
            categories={categories}
            activeCategory={categorySlug || undefined}
          />
        </div>
      </div>

      {/* Main Product Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductSection
          categories={categories}
          products={products}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}