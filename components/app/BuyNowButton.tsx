"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  useCartActions,
  useCartItem,
} from "@/lib/store/cart-store-provider";
import { cn } from "@/lib/utils";

interface BuyNowButtonProps {
  productId: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
  className?: string;
}

export function BuyNowButton({
  productId,
  name,
  price,
  image,
  stock,
  className,
}: BuyNowButtonProps) {
  const router = useRouter();
  const [isBuying, setIsBuying] = useState(false);

  const {
    addItem,
    updateQuantity,
    removeItem,
  } = useCartActions();

  const cartItem = useCartItem(productId);

  const isOutOfStock = stock <= 0;

  const handleBuyNow = () => {
    if (isOutOfStock) {
      toast.error("This product is out of stock.");
      return;
    }

    setIsBuying(true);

    try {
      /*
       * Remove the current product if it already exists
       * in the cart so we can add exactly 1.
       */
      if (cartItem) {
        removeItem(productId);
      }

      /*
       * Add exactly one of the current product.
       */
      addItem(
        {
          productId,
          name,
          price,
          image,
        },
        1,
      );

      /*
       * Go directly to the checkout page.
       */
      router.push("/checkout");
    } catch (error) {
      console.error("Buy Now error:", error);

      toast.error(
        "Something went wrong. Please try again.",
      );

      setIsBuying(false);
    }
  };

  if (isOutOfStock) {
    return null;
  }

  return (
    <Button
      type="button"
      onClick={handleBuyNow}
      disabled={isBuying}
      className={cn(
        "h-12 w-full rounded-md border-2 border-border bg-yellow-400 text-black font-black uppercase shadow-[4px_4px_0px_var(--border)] transition-all hover:-translate-y-[2px] hover:bg-yellow-300 hover:shadow-[6px_6px_0px_var(--border)] active:translate-y-0 active:shadow-[2px_2px_0px_var(--border)]",
        className,
      )}
    >
      <CreditCard className="mr-2 h-5 w-5 stroke-[3]" />

      {isBuying ? "Loading..." : "Buy Now"}
    </Button>
  );
}