"use client";

import Link from "next/link";
import { Cpu, Package, ShoppingBag, Sparkles, User } from "lucide-react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

// TODO: Inko baad mein uncomment karenge jab Cart aur Chat ka store banayenge
// import { useCartActions, useTotalItems } from "@/lib/store/cart-store-provider";
// import { useChatActions, useIsChatOpen } from "@/lib/store/chat-store-provider";

export function Header() {
  // DUMMY STATE: UI test karne ke liye (Baad mein isko asli store se replace karenge)
  const totalItems = 1; 
  const isChatOpen = false;
  const openCart = () => console.log("Cart opened");
  const openChat = () => console.log("Chat opened");

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo (Upgraded for TactileRig) */}
        <Link href="/" className="flex items-center gap-2 group">
          <Cpu className="h-6 w-6 text-cyan-500 transition-transform group-hover:rotate-12" />
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Tactile<span className="text-cyan-500">Rig</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          
          {/* My Orders - Only when signed in */}
          <Show when="signed-in">
            <Button variant="ghost">
              <Link href="/orders" className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span className="hidden text-sm font-medium sm:block">My Orders</span>
              </Link>
            </Button>
          </Show>

          {/* AI Shopping Assistant (Tech/Neon Vibe) */}
          {!isChatOpen && (
            <Button
              onClick={openChat}
              className="gap-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/40"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Ask AI</span>
            </Button>
          )}

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={openCart}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
            <span className="sr-only">Open cart ({totalItems} items)</span>
          </Button>

          {/* User Auth (Clerk) */}
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 border border-zinc-200 dark:border-zinc-800",
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
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign in</span>
              </Button>
            </SignInButton>
          </Show>
          
        </div>
      </div>
    </header>
  );
}