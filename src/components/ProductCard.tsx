"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const toast = useToast();
  const [wishlisted, setWishlisted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addToCart(product, () => {
      toast.success(`"${product.name}" added to cart`);
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWishlisted((prev) => !prev);
    toast.info(
      wishlisted ? "Removed from wishlist" : `"${product.name}" saved to wishlist`
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer"
      style={{
        transition: "transform 0.15s ease, box-shadow 0.3s ease",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        fontFamily: "var(--font-body)",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.14)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)")
      }
    >
      {/* Image Container */}
      <Link href={`/products/${product.id}`} tabIndex={-1}>
        <div className="relative h-72 w-full overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            style={{ transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Dark gradient overlay */}
          <div className="card-overlay" />

          {/* Out of Stock Ribbon */}
          {!product.inStock && (
            <div className="oos-ribbon">Out of Stock</div>
          )}

          {/* Rating badge (top right) */}
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(15,15,15,0.75)", color: "var(--gold)" }}
          >
            <Star size={11} fill="currentColor" />
            {product.rating}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: wishlisted ? "var(--rose)" : "rgba(255,255,255,0.9)",
              color: wishlisted ? "#fff" : "#666",
              transform: wishlisted ? "scale(1.1)" : "scale(1)",
            }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-4">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-1"
          style={{ color: "var(--gold-dark)" }}
        >
          {product.category}
        </p>

        <Link href={`/products/${product.id}`}>
          <h3
            className="text-base font-semibold leading-snug truncate hover:underline"
            style={{ fontFamily: "var(--font-editorial)", color: "var(--charcoal)", fontSize: "1.05rem" }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mt-1.5 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={12}
              fill={s <= Math.round(product.rating) ? "currentColor" : "none"}
              className={s <= Math.round(product.rating) ? "star-filled" : "star-empty"}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between">
          <p
            className="text-lg font-bold"
            style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}
          >
            ৳{product.price.toLocaleString()}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: product.inStock ? "var(--charcoal)" : "#ccc",
              color: "#fff",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => {
              if (product.inStock)
                (e.currentTarget as HTMLElement).style.background = "var(--gold-dark)";
            }}
            onMouseLeave={(e) => {
              if (product.inStock)
                (e.currentTarget as HTMLElement).style.background = "var(--charcoal)";
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={14} />
            {product.inStock ? "Add" : "OOS"}
          </button>
        </div>
      </div>
    </div>
  );
}
