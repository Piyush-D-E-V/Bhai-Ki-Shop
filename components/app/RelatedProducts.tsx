import { sanityFetch } from "@/sanity/lib/live";
import { ProductCard } from "@/components/app/ProductCard";
import { RELATED_PRODUCTS_QUERY } from "@/sanity/queries/products";

interface RelatedProductsProps {
  productId: string;
  categoryId?: string | null;
}

export async function RelatedProducts({
  productId,
  categoryId,
}: RelatedProductsProps) {
  const { data: products } = await sanityFetch({
    query: RELATED_PRODUCTS_QUERY,
    params: {
      productId,
      categoryId: categoryId ?? null,
    },
  });

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 border-t-4 border-border pt-16">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">
            You might also like
          </p>

          <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-foreground md:text-6xl">
            More<br />
            <span className="text-muted-foreground">Gear.</span>
          </h2>
        </div>

        <p className="max-w-sm text-sm font-bold uppercase text-muted-foreground sm:text-right">
          More pieces worth checking out.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}