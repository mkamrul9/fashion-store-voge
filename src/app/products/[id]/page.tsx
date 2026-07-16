"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShoppingBag, ArrowLeft, Star, ShieldCheck, RefreshCw, Truck, Heart, Share2 } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const toast = useToast();

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) notFound();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [wishlisted, setWishlisted] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  // Related products (same category, excluding current)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, () => {
      toast.success(`"${product.name}" added to cart!`);
    });
  };

  const handleWishlist = () => {
    setWishlisted((prev) => !prev);
    toast.info(wishlisted ? "Removed from wishlist" : "Saved to wishlist ❤️");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>

      {/* Breadcrumb */}
      <div
        className="border-b px-4 sm:px-6 lg:px-8 py-3"
        style={{ borderColor: "var(--cream-dark)" }}
      >
        <div className="mx-auto max-w-7xl flex items-center gap-2 text-xs text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
          <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-700 transition-colors">Shop</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-700 transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-[160px]">{product.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors"
          style={{ color: "var(--charcoal)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold-dark)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--charcoal)")}
        >
          <ArrowLeft size={16} />
          Back to Catalog
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Image Column ───────────────────────────── */}
          <div className="space-y-3">
            <div
              className="relative w-full overflow-hidden rounded-2xl bg-gray-50 cursor-zoom-in"
              style={{ aspectRatio: "4/5" }}
              onClick={() => setImageZoomed(!imageZoomed)}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover object-center transition-transform duration-500"
                style={{ transform: imageZoomed ? "scale(1.15)" : "scale(1)" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* OOS overlay */}
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.45)" }}>
                  <span className="text-white text-sm font-bold uppercase tracking-widest px-5 py-2 border border-white">
                    Out of Stock
                  </span>
                </div>
              )}

              {/* Zoom hint */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] px-2 py-1 rounded font-medium uppercase tracking-wider">
                {imageZoomed ? "Click to zoom out" : "Click to zoom"}
              </div>
            </div>

            {/* Color swatches as mini product strip */}
            <p className="text-xs text-gray-400 text-center">Available in {product.colors.length} color{product.colors.length > 1 ? "s" : ""}</p>
          </div>

          {/* ── Info Column ────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Category + Title */}
            <div>
              <p className="section-label mb-2">{product.category}</p>
              <h1
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "var(--charcoal)",
                  lineHeight: 1.1,
                }}
              >
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    fill={s <= Math.round(product.rating) ? "currentColor" : "none"}
                    className={s <= Math.round(product.rating) ? "star-filled" : "star-empty"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} / 5.0</span>
              <span className="text-xs text-gray-400">(47 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span
                className="text-3xl font-bold"
                style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}
              >
                ৳{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400 line-through">৳{Math.round(product.price * 1.2).toLocaleString()}</span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded"
                style={{ background: "#FFF0F0", color: "#E05555" }}
              >
                17% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

            <div className="border-t pt-6 space-y-5" style={{ borderColor: "var(--cream-dark)" }}>

              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--charcoal)" }}>
                    Color
                  </h3>
                  <span className="text-sm text-gray-500">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="px-4 py-2 text-sm rounded border transition-all duration-200"
                      style={{
                        borderColor: selectedColor === color ? "var(--charcoal)" : "var(--cream-dark)",
                        background: selectedColor === color ? "var(--charcoal)" : "transparent",
                        color: selectedColor === color ? "#fff" : "var(--charcoal)",
                        fontFamily: "var(--font-body)",
                        fontWeight: selectedColor === color ? 600 : 400,
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--charcoal)" }}>
                    Size
                  </h3>
                  <button className="text-xs underline text-gray-400 hover:text-gray-600 transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[3rem] h-10 flex items-center justify-center px-3 border text-sm font-medium rounded transition-all duration-200"
                      style={{
                        borderColor: selectedSize === size ? "var(--charcoal)" : "var(--cream-dark)",
                        background: selectedSize === size ? "var(--charcoal)" : "transparent",
                        color: selectedSize === size ? "#fff" : "var(--charcoal)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded text-sm font-bold uppercase tracking-widest transition-all active:scale-[0.98]"
                style={{
                  background: product.inStock ? "var(--charcoal)" : "#ccc",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={(e) => { if (product.inStock) (e.currentTarget as HTMLElement).style.background = "var(--gold-dark)"; }}
                onMouseLeave={(e) => { if (product.inStock) (e.currentTarget as HTMLElement).style.background = "var(--charcoal)"; }}
              >
                <ShoppingBag size={18} />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <button
                onClick={handleWishlist}
                className="w-12 h-12 flex items-center justify-center rounded border transition-all"
                style={{
                  borderColor: wishlisted ? "var(--rose)" : "var(--cream-dark)",
                  background: wishlisted ? "#FFF0F0" : "transparent",
                  color: wishlisted ? "var(--rose)" : "var(--charcoal)",
                }}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
              </button>

              <button
                onClick={handleShare}
                className="w-12 h-12 flex items-center justify-center rounded border transition-all hover:bg-gray-50"
                style={{ borderColor: "var(--cream-dark)", color: "var(--charcoal)" }}
                aria-label="Share product"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Trust strip */}
            <div
              className="grid grid-cols-3 gap-3 pt-4 border-t"
              style={{ borderColor: "var(--cream-dark)" }}
            >
              {[
                { icon: <Truck size={16} />, label: "Free Shipping", sub: "Over ৳3,000" },
                { icon: <RefreshCw size={16} />, label: "Easy Returns", sub: "30 days" },
                { icon: <ShieldCheck size={16} />, label: "Authentic", sub: "Guaranteed" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1 text-center p-3 rounded-lg" style={{ background: "var(--cream)" }}>
                  <span style={{ color: "var(--gold-dark)" }}>{b.icon}</span>
                  <p className="text-xs font-semibold" style={{ color: "var(--charcoal)" }}>{b.label}</p>
                  <p className="text-[10px] text-gray-500">{b.sub}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Related Products ───────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t" style={{ borderColor: "var(--cream-dark)" }}>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="section-label mb-2">You May Also Like</p>
                <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--charcoal)" }}>
                  More from {product.category}
                </h2>
              </div>
              <Link href="/products" className="text-sm font-bold uppercase tracking-widest underline" style={{ color: "var(--gold-dark)" }}>
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
