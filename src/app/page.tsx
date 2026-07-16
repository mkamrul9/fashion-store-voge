"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Shirt, Wind, Layers, Package,
  Watch, Footprints, Shield, RefreshCw, Truck, Star
} from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Category Data ─────────────────────────────────────────────────────────────
const categories = [
  { name: "Panjabi", icon: <Shirt size={28} />, count: 4, color: "#F5E6D3", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=600&auto=format&fit=crop" },
  { name: "Outerwear", icon: <Wind size={28} />, count: 4, color: "#D3E6F5", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600&auto=format&fit=crop" },
  { name: "T-Shirts", icon: <Layers size={28} />, count: 4, color: "#D3F5E1", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop" },
  { name: "Trousers", icon: <Package size={28} />, count: 3, color: "#F5D3D3", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=600&auto=format&fit=crop" },
  { name: "Accessories", icon: <Watch size={28} />, count: 4, color: "#EAD3F5", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop" },
  { name: "Footwear", icon: <Footprints size={28} />, count: 4, color: "#F5F0D3", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop" },
];

// ─── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  { name: "Anika Rahman", role: "Verified Buyer", rating: 5, quote: "The quality of the panjabi I ordered was absolutely exceptional. The fabric is so soft and the stitching is perfect. Will definitely order again.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
  { name: "Tanvir Hossain", role: "Verified Buyer", rating: 5, quote: "Fashion Store has completely changed how I dress. The curated collections are always on point and the delivery was surprisingly fast.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
  { name: "Sadia Islam", role: "Verified Buyer", rating: 5, quote: "I bought the wool overcoat and I receive compliments every single time I wear it. Worth every taka. Premium quality at a fair price.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" },
];

// ─── Trust Badges ──────────────────────────────────────────────────────────────
const badges = [
  { icon: <Truck size={28} />, title: "Free Shipping", desc: "On orders above ৳3,000" },
  { icon: <RefreshCw size={28} />, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: <Shield size={28} />, title: "100% Authentic", desc: "Genuine premium products" },
  { icon: <Star size={28} />, title: "Top Rated", desc: "4.7★ average rating" },
];

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const featuredProducts = products.slice(0, 8);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featuredRef = useReveal();
  const categoriesRef = useReveal();
  const storyRef = useReveal();
  const testimonialsRef = useReveal();
  const badgesRef = useReveal();

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>

      {/* ══════════════════════════════════════════════════════
          § 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: "calc(95vh - 96px)", minHeight: "560px" }}>
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop"
          alt="Fashion Store Hero — Premium Modern Apparel"
          fill
          priority
          className="object-cover object-center"
          style={{ transform: "scale(1.04)", transition: "transform 8s ease-out" }}
          onLoad={(e) => {
            (e.target as HTMLImageElement).style.transform = "scale(1)";
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(15,15,15,0.82) 0%, rgba(15,15,15,0.4) 60%, rgba(15,15,15,0.15) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top, rgba(15,15,15,0.5), transparent)" }} />

        {/* Content */}
        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-2xl">
            <p
              className={`section-label mb-5 transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              New Collection · 2026
            </p>

            <h1
              className="text-white mb-6"
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? "none" : "translateY(32px)",
                transition: "opacity 0.9s ease 200ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 200ms",
              }}
            >
              Redefining<br />
              <span style={{ color: "var(--gold)" }}>Modern</span><br />
              Simplicity.
            </h1>

            <p
              className="text-white/70 text-lg leading-relaxed mb-10 max-w-md"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transition: "opacity 0.9s ease 400ms",
              }}
            >
              Curated contemporary essentials designed for the discerning wardrobe.
            </p>

            <div
              className="flex flex-wrap gap-4"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? "none" : "translateY(16px)",
                transition: "opacity 0.7s ease 600ms, transform 0.7s ease 600ms",
              }}
            >
              <Link href="/products" className="btn-gold">
                Shop Collection <ArrowRight size={16} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded text-sm font-semibold tracking-widest uppercase text-white border border-white/40 hover:border-white hover:bg-white/10 transition-all"
              >
                View Lookbook
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: heroLoaded ? 0.6 : 0, transition: "opacity 1s ease 1s" }}
        >
          <span className="text-white text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-body)" }}>Scroll</span>
          <div className="w-px h-12 animate-float" style={{ background: "var(--gold)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 2 — MARQUEE STRIP
      ══════════════════════════════════════════════════════ */}
      <div
        className="py-4 overflow-hidden border-y"
        style={{ background: "var(--charcoal)", borderColor: "#2a2a2a" }}
      >
        <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}
        >
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="inline-flex gap-16">
              <span>✦ Handcrafted Quality</span>
              <span>✦ Sustainable Materials</span>
              <span>✦ Free Shipping Over ৳3000</span>
              <span>✦ Easy 30-Day Returns</span>
              <span>✦ Authentic Premium Pieces</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          § 3 — CATEGORY SHOWCASE
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div ref={categoriesRef} className="reveal text-center mb-12">
          <p className="section-label mb-3">Explore by Category</p>
          <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--charcoal)" }}>
            Every Style, One Place
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              href="/products"
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] flex flex-col justify-end"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.1) 60%)" }}
              />
              {/* 3D Hover Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(201,169,110,0.12)" }}
              />

              <div className="relative p-5">
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--gold)" }}
                >
                  {cat.count} pieces
                </p>
                <h3
                  className="text-xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-editorial)" }}
                >
                  {cat.name}
                </h3>
                <span
                  className="inline-flex items-center gap-1 mt-2 text-xs uppercase tracking-widest font-bold text-white/0 group-hover:text-white/80 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                >
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 4 — FEATURED PRODUCTS
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl"
        style={{ borderTop: "1px solid var(--cream-dark)" }}
      >
        <div ref={featuredRef} className="reveal flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-label mb-3">Featured Curations</p>
            <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--charcoal)" }}>
              Handpicked for You
            </h2>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors"
            style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}
          >
            View All
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, i) => (
            <div
              key={product.id}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 5 — BRAND STORY BANNER
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-0 overflow-hidden"
        style={{ background: "var(--cream)" }}
      >
        <div ref={storyRef} className="reveal mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2">
          {/* Image Side */}
          <div className="relative h-[420px] lg:h-[560px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop"
              alt="Craftsmanship — Fashion Store brand story"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.25) 0%, transparent 60%)" }} />
          </div>

          {/* Text Side */}
          <div className="flex flex-col justify-center px-8 py-16 lg:px-16">
            <p className="section-label mb-4">Our Story</p>
            <h2
              className="mb-6"
              style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--charcoal)", lineHeight: 1.1 }}
            >
              Crafted with<br />
              <em style={{ color: "var(--gold-dark)" }}>Intention.</em>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Fashion Store, we believe that what you wear is an expression of who you are.
              Every piece in our collection is selected with rigorous attention to material quality,
              construction, and timeless design.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We source responsibly, partner with skilled artisans, and ensure every product earns
              its place in your wardrobe — not just for a season, but for years.
            </p>
            <Link href="/products" className="btn-primary self-start">
              Discover Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 6 — TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div ref={testimonialsRef} className="reveal text-center mb-12">
          <p className="section-label mb-3">Customer Stories</p>
          <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--charcoal)" }}>
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="p-8 rounded-2xl border"
              style={{
                borderColor: "var(--cream-dark)",
                background: i === 1 ? "var(--charcoal)" : "#fff",
                color: i === 1 ? "#fff" : "var(--charcoal)",
                transform: i === 1 ? "scale(1.03)" : "scale(1)",
                boxShadow: i === 1 ? "0 20px 48px rgba(15,15,15,0.18)" : "none",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={14} fill="currentColor" style={{ color: "var(--gold)" }} />
                ))}
              </div>

              <p
                className="text-sm leading-relaxed mb-6 italic"
                style={{ color: i === 1 ? "rgba(255,255,255,0.8)" : "#555" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs" style={{ color: i === 1 ? "var(--gold)" : "var(--gold-dark)" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          § 7 — NEWSLETTER
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={{ background: "var(--charcoal)" }}
      >
        <p className="section-label mb-4">Stay in the Loop</p>
        <h2
          className="mb-4"
          style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff" }}
        >
          First Access to New Arrivals
        </h2>
        <p className="text-white/60 mb-10 max-w-md mx-auto text-sm leading-relaxed">
          Join over 12,000 fashion-forward customers. No spam — only the best drops delivered to your inbox.
        </p>

        {subscribed ? (
          <div className="animate-scale-in inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold" style={{ background: "var(--gold)", color: "var(--charcoal)" }}>
            ✓ You&apos;re on the list! Welcome to Fashion Store.
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 w-full sm:w-auto px-5 py-3.5 rounded text-sm outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontFamily: "var(--font-body)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
            />
            <button type="submit" className="btn-gold flex-shrink-0 w-full sm:w-auto">
              Subscribe
            </button>
          </form>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════
          § 8 — TRUST BADGES
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-14 px-4 sm:px-6 lg:px-8 border-b"
        style={{ borderColor: "var(--cream-dark)" }}
      >
        <div ref={badgesRef} className="reveal mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((b) => (
            <div key={b.title} className="flex flex-col items-center text-center gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "var(--cream)", color: "var(--gold-dark)" }}
              >
                {b.icon}
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
                  {b.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
