import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCT_BY_SLUG_QUERY } from "@/sanity/queries/products";
import { ProductGallery } from "@/components/app/ProductGallery";
import { ProductInfo } from "@/components/app/ProductInfo";
import { RelatedProducts } from "@/components/app/RelatedProducts";
import ReviewForm from "@/components/app/ReviewForm"

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Fetch the data without immediately destructuring it as 'product'
  const { data } = await sanityFetch({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });

  // Typecast to 'any' to bypass the {} inference errors
  const product = data as any; 

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Customer Reviews</h2>
          
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              {product.reviews && product.reviews.length > 0 ? (
                <ul className="space-y-6">
                  {product.reviews.map((review: any) => (
                    <li key={review._id} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-semibold text-lg">{review.userName}</span>
                        <span className="text-yellow-500 text-lg">
                          {"★".repeat(review.rating)}
                          <span className="text-gray-300 dark:text-gray-700">
                            {"★".repeat(5 - review.rating)}
                          </span>
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No reviews yet. Be the first to share your thoughts!</p>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl h-fit">
              <ReviewForm productId={product._id} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts
            productId={product._id}
            categoryId={product.category?._id ?? null}
          />
        </div>
      </div>
    </div>
  );
}