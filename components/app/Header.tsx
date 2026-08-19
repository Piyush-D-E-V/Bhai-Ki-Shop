"use client";

import Link from "next/link";
import Image from "next/image";
import { Package, ShoppingBag, Sparkles, User } from "lucide-react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useCartActions, useTotalItems } from "@/lib/store/cart-store-provider";
import { useChatActions, useIsChatOpen } from "@/lib/store/chat-store-provider";// <-- Theme toggle imported here!

export function Header() {
  const { openCart } = useCartActions();
  const { openChat } = useChatActions();
  const isChatOpen = useIsChatOpen();
  const totalItems = useTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-border bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-transform hover:-translate-y-1">
          <Image src="/images/logo.png" alt="logo" width={150} height={150} className="object-contain" />
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          
          {/* My Orders - Only when signed in */}
          <Show when="signed-in">
            <Button asChild className="hidden sm:flex rounded-[10px] border-2 border-border bg-card font-black uppercase text-foreground shadow-[4px_4px_0px_var(--border)] transition-all hover:translate-y-[2px] hover:shadow-none hover:bg-white cursor-pointer">
              <Link href="/orders" className="flex items-center gap-2">
                <Package className="h-5 w-5 stroke-[2.5]" />
                <span className="text-sm font-black">Orders</span>
              </Link>
            </Button>
          </Show>

          {/* AI Shopping Assistant */}
          {!isChatOpen && (
            <Button
              onClick={openChat}
              className="hidden sm:flex gap-2 rounded-[10px] border-2 border-border bg-amber-400 hover:bg-amber-500 font-black uppercase text-black shadow-[4px_4px_0px_var(--border)] transition-all hover:translate-y-[2px] hover:shadow-none cursor-pointer"
            >
              <Sparkles className="h-4 w-4 stroke-[2.5]" />
              <span className="text-sm font-black">Ask AI</span>
            </Button>
          )}

          {/* Cart Button */}
          <Button
            size="icon"
            className="relative h-11 w-11 rounded-[10px] border-2 border-border bg-card text-foreground shadow-[4px_4px_0px_var(--border)] transition-all hover:translate-y-[2px] hover:shadow-none active:translate-y-[4px] active:shadow-none hover:bg-white cursor-pointer"
            onClick={openCart}
          >
            <ShoppingBag className="h-5 w-5 stroke-[2.5]" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-border bg-foreground text-xs font-black text-background">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
            <span className="sr-only">Open cart ({totalItems} items)</span>
          </Button>

          {/* THEME TOGGLE RENDERED HERE */}


          {/* User Auth */}
          <Show when="signed-in">
            <div className="rounded-[10px] border-2 border-border bg-card p-1 shadow-[4px_4px_0px_var(--border)] hover:shadow-none hover:translate-y-[2px] transition-all cursor-pointer">
              <UserButton
                afterSwitchSessionUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 rounded-[6px]",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Orders"
                    labelIcon={<Package className="h-4 w-4" />}
                    href="/orders"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          </Show>
          
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button size="icon" className="h-11 w-11 rounded-[10px] border-2 border-border bg-card text-foreground shadow-[4px_4px_0px_var(--border)] transition-all hover:translate-y-[2px] hover:shadow-none active:translate-y-[4px] active:shadow-none cursor-pointer">
                <User className="h-5 w-5 stroke-[2.5]" />
                <span className="sr-only">Sign in</span>
              </Button>
            </SignInButton>
          </Show>

        </div>
      </div>
    </header>
  );
}