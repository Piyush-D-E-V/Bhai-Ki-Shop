"use client";

import { AlertTriangle, Loader2, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  useCartItems,
  useCartIsOpen,
  useCartActions,
  useTotalItems,
} from "@/lib/store/cart-store-provider";
import { useCartStock } from "@/lib/hooks/useCartStock";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function CartSheet() {
  const items = useCartItems();
  const isOpen = useCartIsOpen();
  const totalItems = useTotalItems();
  const { closeCart } = useCartActions();
  const { stockMap, isLoading, hasStockIssues } = useCartStock(items);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      {/* Added p-0 to strip default Shadcn padding, border-l-2 and negative shadow for the brutalist slide-out effect */}
      <SheetContent className="flex w-full flex-col sm:max-w-lg gap-0 p-0 border-l-2 border-border bg-background shadow-[-8px_0px_0px_var(--border)]">
        
        <SheetHeader className="border-b-2 border-border bg-card p-6">
          <SheetTitle className="flex items-center gap-3 text-2xl font-black uppercase text-foreground">
            <ShoppingBag className="h-6 w-6 stroke-[3]" />
            Shopping Cart ({totalItems})
            {isLoading && (
              <Loader2 className="h-5 w-5 animate-spin text-foreground" />
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
            <div className="rounded-[20px] border-2 border-border bg-card p-10 shadow-[8px_8px_0px_var(--border)] flex flex-col items-center w-full">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              <h3 className="mt-6 text-2xl font-black uppercase text-foreground">
                Your cart is empty
              </h3>
              <p className="mt-2 font-bold uppercase text-muted-foreground">
                Add some gear to get started
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Stock Issues Banner */}
            {hasStockIssues && !isLoading && (
              <div className="mx-6 mt-6 flex items-center gap-3 rounded-[10px] border-2 border-border bg-yellow-400 px-4 py-3 text-sm font-bold uppercase text-black shadow-[4px_4px_0px_var(--border)]">
                <AlertTriangle className="h-6 w-6 shrink-0" />
                <span>
                  Some items have stock issues. Please review before checkout.
                </span>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6">
              <div className="divide-y-2 divide-border py-4">
                {items.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    stockInfo={stockMap.get(item.productId)}
                  />
                ))}
              </div>
            </div>

            {/* Summary Wrapper */}
            <div className="border-t-2 border-border bg-card p-6">
              <CartSummary hasStockIssues={hasStockIssues} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}