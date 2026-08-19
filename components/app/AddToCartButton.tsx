"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  useCartActions,
  useCartItem,
} from "@/lib/store/cart-store-provider";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
  className?: string;
}

export function AddToCartButton({
  productId,
  name,
  price,
  image,
  stock,
  className,
}: AddToCartButtonProps) {
  const { addItem, updateQuantity } = useCartActions();
  const cartItem = useCartItem(productId);

  const quantityInCart = cartItem?.quantity ?? 0;
  const isOutOfStock = stock <= 0;
  const isAtMax = quantityInCart >= stock;

  const handleAdd = () => {
    if (quantityInCart < stock) {
      addItem({ productId, name, price, image }, 1);
      toast.success(`Added ${name}`);
    }
  };

  const handleDecrement = () => {
    if (quantityInCart > 0) {
      updateQuantity(productId, quantityInCart - 1);
    }
  };

  // Out of stock
  if (isOutOfStock) {
    return (
      <Button
        disabled
        variant="secondary"
        className={cn(
          "h-12 w-full rounded-md border-2 border-border bg-muted text-sm font-black uppercase tracking-wide text-muted-foreground shadow-[4px_4px_0px_var(--border)]",
          className,
        )}
      >
        Out of Stock
      </Button>
    );
  }

  // Not in cart - show Add to Basket button
  if (quantityInCart === 0) {
    return (
      <Button
        onClick={handleAdd}
        className={cn(
          "group h-12 w-full rounded-md border-2 border-border bg-white text-sm font-black uppercase tracking-wide text-black hover:text-white shadow-[5px_5px_0px_var(--border)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_var(--border)] active:translate-y-[2px] active:shadow-[2px_2px_0px_var(--border)]",
          className,
        )}
      >
        <ShoppingBag className="mr-2 h-5 w-5 stroke-[3] transition-transform duration-200 group-hover:scale-110" />
        Add to Basket
      </Button>
    );
  }

  // In cart - show quantity controls
  return (
    <div
      className={cn(
        "flex h-12 w-full items-center overflow-hidden rounded-md border-2 border-border bg-card shadow-[5px_5px_0px_var(--border)]",
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-full flex-1 rounded-none border-r-2 border-border text-foreground transition-colors hover:bg-muted"
        onClick={handleDecrement}
      >
        <Minus className="h-5 w-5 stroke-[3]" />
      </Button>

      <span className="flex flex-1 items-center justify-center text-base font-black tabular-nums text-foreground">
        {quantityInCart}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-full flex-1 rounded-none border-l-2 border-border text-foreground transition-colors hover:bg-muted disabled:opacity-20"
        onClick={handleAdd}
        disabled={isAtMax}
      >
        <Plus className="h-5 w-5 stroke-[3]" />
      </Button>
    </div>
  );
}