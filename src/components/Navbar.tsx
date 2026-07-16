"use client";
import Link from "next/link";
import { ShoppingBag, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-black tracking-tight text-black">
          OXIVOS <span className="font-light text-gray-500">STUDIO</span>
        </Link>

        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <Link href="/products" className="hover:text-black transition-colors">Shop All</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/cart" className="group relative p-2" aria-label="Cart">
            <ShoppingBag size={22} className="text-gray-700 group-hover:text-black transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white ring-2 ring-white animate-scaleIn">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
