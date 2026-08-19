import Link from "next/link";
import { AddToCartButton } from "@/components/app/AddToCartButton";
import { AskAISimilarButton } from "@/components/app/AskAISimilarButton";
import { StockBadge } from "@/components/app/StockBadge";
import { formatPrice } from "@/lib/utils";
import type { PRODUCT_BY_SLUG_QUERYResult } from "@/sanity.types";
import { BuyNowButton } from "./BuyNowButton";

interface ProductInfoProps {
  product: NonNullable<PRODUCT_BY_SLUG_QUERYResult>;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const imageUrl = product.images?.[0]?.asset?.url;

  return (
    <div className="flex flex-col rounded-[20px] border-2 border-border bg-card p-8 shadow-[8px_8px_0px_var(--border)] h-fit">
      {/* Category */}
      {product.category && (
        <div className="mb-2">
          <Link
            href={`/?category=${product.category.slug}`}
            className="inline-block rounded-full border-2 border-border bg-background px-4 py-1.5 text-xs font-black uppercase text-foreground shadow-[2px_2px_0px_var(--border)] transition-all hover:translate-y-[2px] hover:shadow-none"
          >
            {product.category.title}
          </Link>
        </div>
      )}

      {/* Title */}
      <h1 className="mt-4 text-4xl font-black uppercase leading-tight text-foreground">
        {product.name}
      </h1>

      {/* Price */}
      <p className="mt-4 text-3xl font-black text-muted-foreground">
        {formatPrice(product.price)}
      </p>

      {/* Description */}
      {product.description && (
        <p className="mt-6 text-lg font-bold leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      )}

      {/* Stock & Actions */}
      <div className="mt-8 flex flex-col gap-4">
        <StockBadge productId={product._id} stock={product.stock ?? 0} />

        {/* Buttons wrapper - forces children to take full width and stack cleanly */}
        <div className="flex flex-col gap-3 *:w-full">
          <BuyNowButton
            productId={product._id}
            name={product.name ?? "Unknown Product"}
            price={product.price ?? 0}
            image={imageUrl ?? undefined}
            stock={product.stock ?? 0}
          />
          <AddToCartButton
            productId={product._id}
            name={product.name ?? "Unknown Product"}
            price={product.price ?? 0}
            image={imageUrl ?? undefined}
            stock={product.stock ?? 0}
          />
          <AskAISimilarButton productName={product.name ?? "this product"} />
        </div>
      </div>

      {/* Metadata / Spec Sheet */}
      <div className="mt-10 flex flex-col gap-4 border-t-4 border-border pt-8">
        <h3 className="mb-2 text-xl font-black uppercase text-foreground">
          Specs
        </h3>

        {product.material && (
          <div className="flex justify-between border-b-2 border-border pb-3 text-sm font-bold uppercase">
            <span className="text-muted-foreground">Material</span>
            <span className="text-foreground">{product.material}</span>
          </div>
        )}
        {product.color && (
          <div className="flex justify-between border-b-2 border-border pb-3 text-sm font-bold uppercase">
            <span className="text-muted-foreground">Color</span>
            <span className="text-foreground">{product.color}</span>
          </div>
        )}
        {product.dimensions && (
          <div className="flex justify-between border-b-2 border-border pb-3 text-sm font-bold uppercase">
            <span className="text-muted-foreground">Dimensions</span>
            <span className="text-foreground">{product.dimensions}</span>
          </div>
        )}
        {product.assemblyRequired !== null && (
          <div className="flex justify-between border-b-2 border-border pb-3 text-sm font-bold uppercase">
            <span className="text-muted-foreground">Assembly</span>
            <span className="text-foreground">
              {product.assemblyRequired ? "Required" : "Not required"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
