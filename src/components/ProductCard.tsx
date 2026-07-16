"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group relative border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-72 w-full overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">৳{product.price}</p>
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
