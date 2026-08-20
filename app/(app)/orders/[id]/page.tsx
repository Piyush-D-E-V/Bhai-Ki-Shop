import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, CreditCard, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sanityFetch } from "@/sanity/lib/live";
import { ORDER_BY_ID_QUERY } from "@/sanity/queries/orders";
import { getOrderStatus } from "@/lib/constants/orderStatus";
import { formatPrice, formatDate } from "@/lib/utils";

export const metadata = {
  title: "Order Details | Street Ready Gear",
  description: "View your order details",
};

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderPageProps) {
  const { id } = await params;
  const { userId } = await auth();

  const { data: order } = await sanityFetch({
    query: ORDER_BY_ID_QUERY,
    params: { id },
  });

  // Verify order exists and belongs to current user
  if (!order || order.clerkUserId !== userId) {
    notFound();
  }

  const status = getOrderStatus(order.status);
  const StatusIcon = status.icon;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="mb-12">
        <Link
          href="/orders"
          className="group mb-6 flex w-max items-center gap-2 text-sm font-black uppercase tracking-tight text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5 stroke-[3] transition-transform group-hover:-translate-x-1" />
          Back to Orders
        </Link>
        
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-foreground sm:text-5xl">
              Order #{order.orderNumber}
            </h1>
            <p className="mt-2 text-lg font-bold uppercase text-muted-foreground">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          
          <Badge
            className={`${status.color} flex shrink-0 items-center gap-2 rounded-full border-4 border-border px-5 py-2 text-sm font-black uppercase shadow-[4px_4px_0px_var(--border)]`}
          >
            <StatusIcon className="h-5 w-5 stroke-[3]" />
            {status.label}
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        
        {/* Left Column: Order Items */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-[20px] border-4 border-border bg-card shadow-[8px_8px_0px_var(--border)]">
            
            {/* Header */}
            <div className="border-b-4 border-border bg-yellow-400 px-6 py-5 sm:px-8">
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Cop List ({order.items?.length ?? 0})
              </h2>
            </div>
            
            {/* Items */}
            <div className="flex flex-col divide-y-4 divide-border">
              {order.items?.map((item) => (
                <div key={item._key} className="flex gap-5 px-6 py-6 sm:px-8">
                  
                  {/* Image */}
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[10px] border-2 border-border bg-background shadow-[4px_4px_0px_var(--border)]">
                    {item.product?.image?.asset?.url ? (
                      <Image
                        src={item.product.image.asset.url}
                        alt={item.product.name ?? "Product"}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-background text-xs font-bold uppercase text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between sm:flex-row">
                    <div className="flex flex-col justify-center">
                      <Link
                        href={`/products/${item.product?.slug}`}
                        className="text-lg font-black uppercase leading-tight text-foreground hover:underline"
                      >
                        {item.product?.name ?? "Unknown Product"}
                      </Link>
                      <p className="mt-1 font-bold uppercase text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mt-2 text-left sm:mt-0 sm:text-right flex flex-col justify-center">
                      <p className="text-xl font-black uppercase text-foreground">
                        {formatPrice((item.priceAtPurchase ?? 0) * (item.quantity ?? 1))}
                      </p>
                      {(item.quantity ?? 1) > 1 && (
                        <p className="text-sm font-bold uppercase text-muted-foreground">
                          {formatPrice(item.priceAtPurchase)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Details */}
        <div className="space-y-8 lg:col-span-2">
          
          {/* Summary */}
          <div className="overflow-hidden rounded-[20px] border-4 border-border bg-card shadow-[8px_8px_0px_var(--border)]">
            <div className="border-b-4 border-border bg-foreground px-6 py-5">
              <h2 className="text-2xl font-black uppercase tracking-tight text-background">
                Summary
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between font-bold uppercase text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground">{formatPrice(order.total)}</span>
                </div>
                <div className="border-t-4 border-border pt-4">
                  <div className="flex justify-between text-xl font-black uppercase text-foreground">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.address && (
            <div className="overflow-hidden rounded-[20px] border-4 border-border bg-card shadow-[8px_8px_0px_var(--border)]">
              <div className="border-b-4 border-border bg-card px-6 py-5 flex items-center gap-3">
                <MapPin className="h-6 w-6 stroke-[3] text-foreground" />
                <h2 className="text-xl font-black uppercase tracking-tight text-foreground">
                  Shipping Info
                </h2>
              </div>
              <div className="p-6 text-sm font-bold uppercase leading-relaxed text-muted-foreground">
                {order.address.name && <p className="text-foreground">{order.address.name}</p>}
                {order.address.line1 && <p>{order.address.line1}</p>}
                {order.address.line2 && <p>{order.address.line2}</p>}
                <p>
                  {[order.address.city, order.address.postcode]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                {order.address.country && <p>{order.address.country}</p>}
              </div>
            </div>
          )}

          {/* Payment Info */}
          <div className="overflow-hidden rounded-[20px] border-4 border-border bg-card shadow-[8px_8px_0px_var(--border)]">
            <div className="border-b-4 border-border bg-card px-6 py-5 flex items-center gap-3">
              <CreditCard className="h-6 w-6 stroke-[3] text-foreground" />
              <h2 className="text-xl font-black uppercase tracking-tight text-foreground">
                Payment
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase text-muted-foreground">Status</span>
                <span className="rounded-[5px] border-2 border-border bg-green-400 px-2 py-1 text-xs font-black uppercase text-black">
                  {order.status}
                </span>
              </div>
              {order.email && (
                <div className="flex flex-col gap-1 border-t-2 border-dashed border-border pt-4">
                  <p className="font-bold uppercase text-muted-foreground">Receipt Email</p>
                  <p className="truncate font-black text-foreground">
                    {order.email}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}