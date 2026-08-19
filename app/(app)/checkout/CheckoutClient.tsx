"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/app/CheckoutButton";
import { formatPrice } from "@/lib/utils";
import {
  useCartItems,
  useTotalPrice,
  useTotalItems,
} from "@/lib/store/cart-store-provider";
import { useCartStock } from "@/lib/hooks/useCartStock";

export function CheckoutClient() {
  const items = useCartItems();
  const totalPrice = useTotalPrice();
  const totalItems = useTotalItems();
  const { stockMap, isLoading, hasStockIssues } = useCartStock(items);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center rounded-[20px] border-2 border-border bg-card p-12 shadow-[8px_8px_0px_var(--border)]">
          <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground" />
          <h1 className="mt-6 text-3xl font-black uppercase text-foreground">
            Your cart is empty
          </h1>
          <p className="mt-2 font-bold text-muted-foreground">
            Add some gear to your cart before checking out.
          </p>
          <Button 
            asChild 
            className="mt-8 rounded-full border-2 border-border font-bold uppercase transition-all shadow-[4px_4px_0px_var(--border)] hover:translate-y-[4px] hover:shadow-none"
            size="lg"
          >
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-bold uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 border-2 border-current rounded-full p-[2px]" />
          Continue Shopping
        </Link>
        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-foreground">
          Checkout
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-5 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-3">
          <div className="rounded-[20px] border-2 border-border bg-card shadow-[8px_8px_0px_var(--border)] overflow-hidden">
            <div className="border-b-2 border-border bg-background px-6 py-5">
              <h2 className="text-xl font-black uppercase text-foreground">
                Order Summary ({totalItems} items)
              </h2>
            </div>

            {/* Stock Issues Warning */}
            {hasStockIssues && !isLoading && (
              <div className="mx-6 mt-6 flex items-center gap-3 rounded-[10px] border-2 border-border bg-yellow-400 px-5 py-4 text-sm font-bold text-black shadow-[4px_4px_0px_var(--border)]">
                <AlertTriangle className="h-6 w-6 shrink-0" />
                <span className="uppercase tracking-tight">
                  Some items have stock issues. Update your cart to proceed.
                </span>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-foreground" />
                <span className="ml-3 font-bold uppercase text-foreground">
                  Verifying stock...
                </span>
              </div>
            )}

            {/* Items List */}
            <div className="divide-y-2 divide-border">
              {items.map((item) => {
                const stockInfo = stockMap.get(item.productId);
                const hasIssue =
                  stockInfo?.isOutOfStock || stockInfo?.exceedsStock;

                return (
                  <div
                    key={item.productId}
                    className={`flex gap-6 px-6 py-6 transition-colors ${
                      hasIssue ? "bg-red-500/10" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[10px] border-2 border-border bg-background shadow-[4px_4px_0px_var(--border)]">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs font-bold uppercase text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-sm font-black text-muted-foreground uppercase">
                          Qty: {item.quantity}
                        </p>
                        {stockInfo?.isOutOfStock && (
                          <p className="mt-1 text-sm font-black uppercase text-red-500">
                            Out of stock
                          </p>
                        )}
                        {stockInfo?.exceedsStock && !stockInfo.isOutOfStock && (
                          <p className="mt-1 text-sm font-black uppercase text-yellow-600">
                            Only {stockInfo.currentStock} available
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xl font-black text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm font-bold text-muted-foreground mt-1">
                          {formatPrice(item.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Total & Checkout */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-[20px] border-2 border-border bg-card p-6 shadow-[8px_8px_0px_var(--border)]">
            <h2 className="border-b-2 border-border pb-4 text-xl font-black uppercase text-foreground">
              Payment Summary
            </h2>

            <div className="mt-6 space-y-4 font-bold">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground uppercase">Subtotal</span>
                <span className="text-foreground">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground uppercase">Shipping</span>
                <span className="text-foreground uppercase">Calculated Next</span>
              </div>
              <div className="border-t-2 border-border pt-4 mt-6">
                <div className="flex justify-between text-2xl font-black uppercase">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              {/* Note: Ensure your CheckoutButton component is also styled aggressively */}
              <CheckoutButton disabled={hasStockIssues || isLoading} />
            </div>

            <p className="mt-6 text-center text-xs font-bold uppercase text-muted-foreground">
              Redirecting to Stripe&apos;s Secure Vault
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}