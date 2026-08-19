import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Package, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { sanityFetch } from "@/sanity/lib/live";
import { ORDERS_BY_USER_QUERY } from "@/sanity/queries/orders";
import { getOrderStatus } from "@/lib/constants/orderStatus";
import { formatPrice, formatDate, formatOrderNumber } from "@/lib/utils";
import { StackedProductImages } from "@/components/app/StackedProductImages";
export const dynamic = "force-dynamic";


export const metadata = {
  title: "Your Orders | Street Ready Gear",
  description: "View your order history",
};

export default async function OrdersPage() {
  const { userId } = await auth();

  const { data: orders } = await sanityFetch({
    query: ORDERS_BY_USER_QUERY,
    params: { clerkUserId: userId ?? "" },
  });

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={Package}
          title="NO ORDERS YET"
          description="When you cop some gear, it will show up here."
          action={{ label: "SHOP THE DROP", href: "/" }}
          size="lg"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-foreground md:text-7xl">
          Your<br />Orders.
        </h1>
        <p className="mt-4 text-xl font-bold uppercase text-muted-foreground">
          Track and manage your gear.
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-8">
        {orders.map((order) => {
          const status = getOrderStatus(order.status);
          const StatusIcon = status.icon;
          const images = (order.itemImages ?? []).filter(
            (url): url is string => url !== null,
          );

          return (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              className="group block overflow-hidden rounded-[20px] border-4 border-border bg-card transition-all duration-300 shadow-[6px_6px_0px_var(--border)] hover:-translate-y-[4px] hover:shadow-[12px_12px_0px_var(--border)]"
            >
              <div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
                
                {/* Left: Product Images Stack */}
                <div className="shrink-0">
                  <StackedProductImages
                    images={images}
                    totalCount={order.itemCount ?? 0}
                    size="lg"
                  />
                </div>

                {/* Right: Order Details */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  
                  {/* Top: Order Info + Status */}
                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                      <p className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                        #{formatOrderNumber(order.orderNumber)}
                      </p>
                      <p className="mt-1 font-bold uppercase text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    
                    {/* Status Badge */}
                    <Badge
                      className={`${status.color} flex shrink-0 items-center gap-2 rounded-full border-2 border-border px-4 py-1.5 text-xs font-black uppercase shadow-[4px_4px_0px_var(--border)]`}
                    >
                      <StatusIcon className="h-4 w-4 stroke-[3]" />
                      {status.label}
                    </Badge>
                  </div>

                  {/* Bottom: Items + Total */}
                  <div className="mt-6 flex items-end justify-between sm:mt-0">
                    <p className="text-lg font-bold uppercase text-muted-foreground">
                      {order.itemCount}{" "}
                      {order.itemCount === 1 ? "Item" : "Items"}
                    </p>
                    <p className="text-4xl font-black tracking-tight text-foreground">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer: View Details (Turns Yellow on Hover) */}
              <div className="flex items-center justify-between border-t-4 border-border bg-foreground/5 px-6 py-5 transition-colors duration-300 group-hover:bg-yellow-400 sm:px-8">
                <p className="truncate text-sm font-bold uppercase text-muted-foreground transition-colors group-hover:text-black">
                  {order.itemNames?.slice(0, 2).filter(Boolean).join(", ")}
                  {(order.itemNames?.length ?? 0) > 2 && "..."}
                </p>
                <span className="flex shrink-0 items-center gap-2 text-sm font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-black">
                  View Order
                  <ArrowRight className="h-5 w-5 stroke-[3] transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}