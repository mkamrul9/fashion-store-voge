"use client";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useProfile();
  const { addToCart } = useCart();
  const toast = useToast();

  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  const handleAddAll = () => {
    const available = wishlisted.filter((p) => p.inStock);
    if (available.length === 0) {
      toast.info("All wishlisted items are out of stock.");
      return;
    }
    available.forEach((p) => addToCart(p));
    toast.success(`${available.length} item${available.length > 1 ? "s" : ""} added to cart!`);
  };

  const handleClearAll = () => {
    wishlist.forEach((id) => toggleWishlist(id));
    toast.info("Wishlist cleared.");
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "80vh", fontFamily: "var(--font-body)" }}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="info-page-hero">
        <p className="section-label mb-4 justify-center">Your</p>
        <h1
          className="mb-3"
          style={{
            fontFamily: "var(--font-editorial)",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          Wishlist
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          {wishlisted.length === 0
            ? "Your wishlist is empty"
            : `${wishlisted.length} saved piece${wishlisted.length > 1 ? "s" : ""}`}
        </p>
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {wishlisted.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: "var(--brand-light)" }}
            >
              <Heart size={40} style={{ color: "var(--brand)" }} />
            </div>
            <div>
              <h2
                className="mb-2"
                style={{ fontFamily: "var(--font-editorial)", fontSize: "1.8rem", color: "var(--text-primary)" }}
              >
                Nothing saved yet
              </h2>
              <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
                Tap the heart icon on any product to save it here for later.
              </p>
            </div>
            <Link href="/products" className="btn-gold inline-flex items-center gap-2">
              Explore Collection <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <>
            {/* Actions bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
                {wishlisted.length} {wishlisted.length === 1 ? "piece" : "pieces"} saved
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddAll}
                  className="btn-gold inline-flex items-center gap-2 text-sm"
                  style={{ padding: "0.6rem 1.25rem" }}
                >
                  <ShoppingBag size={15} />
                  Add All to Cart
                </button>
                <button
                  onClick={handleClearAll}
                  className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded transition-all hover:opacity-70"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    background: "var(--bg-card)",
                    fontFamily: "var(--font-body)",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={14} />
                  Clear All
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {wishlisted.map((product, i) => (
                <div
                  key={product.id}
                  className="opacity-0 animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Want to explore more?</p>
              <Link href="/products" className="btn-outline inline-flex items-center gap-2">
                Browse Full Collection <ArrowRight size={14} />
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
