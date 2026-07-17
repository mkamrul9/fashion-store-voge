"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useProfile } from "@/context/ProfileContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart }                       = useCart();
  const toast                               = useToast();
  const { toggleWishlist, isWishlisted }    = useProfile();
  const wishlisted                          = isWishlisted(product.id);
  const cardRef                             = useRef<HTMLDivElement>(null);

  // ── 3D Tilt ──────────────────────────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect    = card.getBoundingClientRect();
    const rotateX = (((e.clientY - rect.top)  / rect.height) - 0.5) * -8;
    const rotateY = (((e.clientX - rect.left) / rect.width)  - 0.5) *  8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addToCart(product, () => toast.success(`"${product.name}" added to cart`));
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    toast.info(
      wishlisted
        ? `"${product.name}" removed from wishlist`
        : `"${product.name}" saved to wishlist ❤️`
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-xl overflow-hidden cursor-pointer"
      style={{
        transition: "transform 0.15s ease, box-shadow 0.3s ease",
        boxShadow: "var(--shadow-sm)",
        transformStyle: "preserve-3d",
        fontFamily: "var(--font-body)",
        background: "var(--bg-card)",
        border: "1px solid var(--border-light)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "var(--shadow-gold)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.boxShadow = "var(--shadow-sm)")
      }
    >
      {/* Image */}
      <Link href={`/products/${product.id}`} tabIndex={-1}>
        <div className="relative h-72 w-full overflow-hidden" style={{ background: "var(--bg-subtle)" }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="card-overlay" />

          {/* OOS ribbon */}
          {!product.inStock && <div className="oos-ribbon">Out of Stock</div>}

          {/* Rating badge */}
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(10,10,15,0.78)", color: "var(--brand)" }}
          >
            <Star size={11} fill="currentColor" />
            {product.rating}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full shadow-sm transition-all duration-200"
            style={{
              background: wishlisted ? "var(--brand)" : "rgba(255,255,255,0.92)",
              color: wishlisted ? "var(--obsidian)" : "#999",
              transform: wishlisted ? "scale(1.12)" : "scale(1)",
            }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={13} fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>

      {/* Body */}
      <div className="p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-1" style={{ color: "var(--brand)" }}>
          {product.category}
        </p>

        <Link href={`/products/${product.id}`}>
          <h3
            className="text-base font-semibold leading-snug truncate hover:text-[var(--brand)] transition-colors"
            style={{ fontFamily: "var(--font-editorial)", color: "var(--text-primary)", fontSize: "1.05rem" }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mt-1.5 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={11}
              fill={s <= Math.round(product.rating) ? "currentColor" : "none"}
              className={s <= Math.round(product.rating) ? "star-filled" : "star-empty"}
            />
          ))}
          <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>({product.rating})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold" style={{ color: "var(--text-primary)", fontFamily: "var(--font-editorial)" }}>
            ৳{product.price.toLocaleString()}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center gap-1.5 px-3 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: product.inStock ? "var(--obsidian)" : "var(--border)",
              color: product.inStock ? "#fff" : "var(--text-muted)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.1em",
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={13} />
            {product.inStock ? "Add" : "OOS"}
          </button>
        </div>
      </div>
    </div>
  );
}
