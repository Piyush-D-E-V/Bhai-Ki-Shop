import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/queries/products";
import { ProductGallery } from "@/components/app/ProductGallery";
import { ProductInfo } from "@/components/app/ProductInfo";
import { RelatedProducts } from "@/components/app/RelatedProducts";
import { Any } from "next-sanity";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const { data: product } = await sanityFetch({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <ProductGallery
            images={product.images as Any}
            productName={product.name as Any}
          />

          {/* Product Info */}
          <ProductInfo product={product as Any} />
        </div>

        {/* Related Products */}
        <RelatedProducts
          productId={product._id}
          categoryId={(product.category as Any)?._id ?? null}
        />
      </div>
    </div>
  );
}