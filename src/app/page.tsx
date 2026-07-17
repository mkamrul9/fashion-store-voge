"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Shirt, Wind, Layers, Package,
  Watch, Footprints, Shield, RefreshCw, Truck, Star,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useReveal(direction: "up" | "left" = "up") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cls = direction === "left" ? "reveal-left" : "reveal";
    el.classList.add(cls);
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); obs.disconnect(); } },
      { threshold: 0.10 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [direction]);
  return ref;
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.ceil(target / 48);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 22);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const categories = [
  { name: "Panjabi",    icon: <Shirt size={22} />,      count: 4, image: "https://images.unsplash.com/photo-1617952236317-0bd127407984?q=80&w=800&auto=format&fit=crop", href: "/products?cat=Panjabi" },
  { name: "Outerwear",  icon: <Wind size={22} />,       count: 4, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop", href: "/products?cat=Outerwear" },
  { name: "T-Shirts",  icon: <Layers size={22} />,     count: 4, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", href: "/products?cat=T-Shirts" },
  { name: "Trousers",  icon: <Package size={22} />,    count: 3, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop", href: "/products?cat=Trousers" },
  { name: "Accessories", icon: <Watch size={22} />,    count: 4, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop", href: "/products?cat=Accessories" },
  { name: "Footwear",  icon: <Footprints size={22} />, count: 4, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", href: "/products?cat=Footwear" },
];

const testimonials = [
  { name: "Anika Rahman", role: "Verified Buyer", rating: 5, quote: "The quality of the panjabi I ordered was absolutely exceptional. The fabric is so soft and the stitching is perfect. Will definitely order again.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" },
  { name: "Tanvir Hossain", role: "Verified Buyer", rating: 5, quote: "VŌGE has completely changed how I dress. The curated collections are always on point and the delivery was surprisingly fast. Nothing else compares.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
  { name: "Sadia Islam", role: "Verified Buyer", rating: 5, quote: "I bought the wool overcoat and I receive compliments every single time I wear it. Worth every taka. Premium quality at an honest price.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" },
  { name: "Rafiq Ahmed", role: "Verified Buyer", rating: 5, quote: "The leather biker jacket is a masterpiece. Bold, well-crafted, and the sizing was perfect. VŌGE is my go-to for anything premium.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" },
];

const lookbookImages = [
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop", label: "The Atelier" },
  { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop", label: "Editorial 2026" },
  { src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop", label: "Street Collective" },
];

const stats = [
  { value: 12000, suffix: "+", label: "Happy Customers" },
  { value: 23,    suffix: "",  label: "Curated Pieces" },
  { value: 47,    suffix: "",  label: "Avg Rating ★",  display: "4.7" },
  { value: 30,    suffix: "",  label: "Day Returns",   display: "30" },
];

const badges = [
  { icon: <Truck size={24} />,     title: "Free Shipping",  desc: "On orders above ৳3,000" },
  { icon: <RefreshCw size={24} />, title: "Easy Returns",   desc: "30-day hassle-free" },
  { icon: <Shield size={24} />,    title: "100% Authentic", desc: "Genuine premium products" },
  { icon: <Star size={24} />,      title: "Top Rated",      desc: "4.7★ average rating" },
];

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop",
    label: "New Collection · 2026",
    title: "Dressed\nfor\nEternity.",
    subtitle: "Where modern silhouettes meet timeless craft.",
    cta: "Shop Collection",
    ctaHref: "/products",
  },
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1920&auto=format&fit=crop",
    label: "The Edit · Outerwear",
    title: "Beyond the\nOrdinary.",
    subtitle: "Precision-cut outerwear for every season.",
    cta: "Shop Outerwear",
    ctaHref: "/products?cat=Outerwear",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920&auto=format&fit=crop",
    label: "Artisan · Craftsmanship",
    title: "Crafted\nwith\nPurpose.",
    subtitle: "Every stitch, a statement. Every piece, a promise.",
    cta: "Discover Story",
    ctaHref: "/about",
  },
];

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const featuredProducts = products.slice(0, 8);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const featuredRef     = useReveal();
  const categoriesRef   = useReveal();
  const storyRef        = useReveal("left");
  const testimonialsRef = useReveal();
  const badgesRef       = useReveal();
  const statsRef        = useReveal();
  const lookbookRef     = useReveal();

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const slide = HERO_SLIDES[0];

  const nextTestimonial = useCallback(() => setTestimonialIdx((i) => (i + 1) % testimonials.length), []);
  const prevTestimonial = useCallback(() => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length), []);

  return (
    <div style={{ fontFamily: "var(--font-body)", background: "var(--bg-primary)" }}>

      {/* ════════════════════════════════════════════════════
          § 1 — HERO (Full-screen cinematic slider)
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: "620px" }}>
        {/* Background image */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: 1, zIndex: 1 }}
        >
          <Image
            src={slide.image}
            alt="VŌGE Collection"
            fill
            priority
            className="object-cover object-center"
            style={{ transform: heroLoaded ? "scale(1)" : "scale(1.05)", transition: "transform 10s ease-out" }}
            sizes="100vw"
          />
        </div>

        {/* Deep gradient overlay */}
        <div className="absolute inset-0 z-[2]" style={{ background: "linear-gradient(120deg, rgba(10,10,15,0.90) 0%, rgba(10,10,15,0.55) 55%, rgba(10,10,15,0.2) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-48 z-[2]" style={{ background: "linear-gradient(to top, rgba(10,10,15,0.7), transparent)" }} />

        {/* Content */}
        <div className="relative z-[3] h-full mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
          <div className="max-w-xl">
            {/* Label */}
            <p
              className="mb-6 text-[10px] font-bold tracking-[0.28em] uppercase transition-all duration-700"
              style={{
                color: "var(--brand)",
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? "none" : "translateY(8px)",
                fontFamily: "var(--font-body)",
              }}
            >
              {slide.label}
            </p>

            {/* Headline */}
            <h1
              className="mb-6 whitespace-pre-line"
              style={{
                color: "#fff",
                fontFamily: "var(--font-editorial)",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? "none" : "translateY(40px)",
                transition: "opacity 1s ease 150ms, transform 1s cubic-bezier(0.16,1,0.3,1) 150ms",
              }}
            >
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p
              className="text-base sm:text-lg leading-relaxed mb-10 max-w-sm"
              style={{
                color: "rgba(255,255,255,0.8)",
                fontFamily: "var(--font-body)",
                opacity: heroLoaded ? 1 : 0,
                transition: "opacity 0.9s ease 350ms",
              }}
            >
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? "none" : "translateY(16px)",
                transition: "opacity 0.7s ease 500ms, transform 0.7s ease 500ms",
              }}
            >
              <Link href={slide.ctaHref} className="btn-gold">
                {slide.cta} <ArrowRight size={15} />
              </Link>
              <Link href="/about" className="btn-outline-white">
                Our Story
              </Link>
            </div>
          </div>
        </div>


        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[4]"
          style={{ opacity: heroLoaded ? 0.5 : 0, transition: "opacity 1.2s ease 1.2s" }}
        >
          <span className="text-white text-[10px] uppercase tracking-[0.22em]">Scroll</span>
          <div className="w-px h-12 animate-float" style={{ background: "var(--brand)" }} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          § 2 — MARQUEE STRIP
      ════════════════════════════════════════════════════ */}
      <div
        className="py-4 overflow-hidden border-y"
        style={{ background: "var(--obsidian)", borderColor: "var(--obsidian-600)" }}
      >
        <div
          className="animate-marquee whitespace-nowrap flex gap-20 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "var(--brand)", fontFamily: "var(--font-body)" }}
        >
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="inline-flex gap-20">
              <span>✦ Handcrafted Quality</span>
              <span>✦ Sustainable Materials</span>
              <span>✦ Free Shipping Over ৳3000</span>
              <span>✦ Easy 30-Day Returns</span>
              <span>✦ Authentic Premium Pieces</span>
              <span>✦ Curated for You</span>
            </span>
          ))}
        </div>
      </div>



      {/* ════════════════════════════════════════════════════
          § 4 — BENTO CATEGORY GRID
      ════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div ref={categoriesRef} className="text-center mb-14">
          <p className="section-label mb-4 justify-center">Shop by Category</p>
          <h2
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--text-primary)",
            }}
          >
            Every Style, One House
          </h2>
        </div>

        {/* Bento: first item is tall/wide */}
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-3 lg:gap-4" style={{ height: "min(860px, 140vw)" }}>
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`group relative overflow-hidden rounded-xl flex flex-col justify-end ${i === 0 ? "row-span-2" : ""}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,15,0.88) 0%, rgba(10,10,15,0.08) 60%)" }} />
              {/* Gold hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "rgba(201,169,110,0.08)" }} />
              {/* Gold border on hover */}
              <div className="absolute inset-0 ring-0 group-hover:ring-1 ring-[var(--brand)] rounded-xl transition-all duration-300" />

              <div className="relative p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: "var(--brand)" }}>
                  {cat.count} pieces
                </p>
                <h3 className="text-white font-semibold" style={{ fontFamily: "var(--font-editorial)", fontSize: i === 0 ? "1.75rem" : "1.2rem" }}>
                  {cat.name}
                </h3>
                <span className="inline-flex items-center gap-1 mt-2 text-[10px] uppercase tracking-widest font-bold text-white/0 group-hover:text-[var(--brand)] transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Shop <ArrowRight size={10} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          § 5 — FEATURED PRODUCTS (8 products)
      ════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div ref={featuredRef} className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
          <div>
            <p className="section-label mb-4">Featured Curations</p>
            <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text-primary)" }}>
              Handpicked for You
            </h2>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] transition-colors"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, i) => (
            <div
              key={product.id}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: "forwards" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products" className="btn-outline">
            View All 23 Pieces
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          § 6 — STATS COUNTER STRIP
      ════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--obsidian)" }}>
        <div ref={statsRef} className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center gap-2"
              style={{ borderRight: i < 3 && i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
            >
              <span className="stat-number">
                {s.display
                  ? s.display
                  : <AnimatedCounter target={s.value} suffix={s.suffix} />
                }
              </span>
              <p className="text-xs font-medium uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          § 7 — LOOKBOOK STRIP (3 editorial images)
      ════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div ref={lookbookRef} className="text-center mb-12">
          <p className="section-label mb-4 justify-center">Lookbook 2026</p>
          <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--text-primary)" }}>
            The Season's Edit
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lookbookImages.map((img) => (
            <Link
              key={img.label}
              href="/products"
              className="lookbook-item group relative rounded-xl overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.05) 50%)" }} />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: "var(--brand)" }}>Lookbook</p>
                <h3 className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-editorial)" }}>{img.label}</h3>
                <span className="inline-flex items-center gap-1 mt-2 text-[10px] uppercase tracking-widest font-bold text-white/0 group-hover:text-[var(--brand)] transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Shop Look <ArrowRight size={10} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          § 8 — BRAND STORY (Split)
      ════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}>
        <div ref={storyRef} className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[420px] lg:h-[560px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=900&auto=format&fit=crop"
              alt="VŌGE craftsmanship atelier"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.2) 0%, transparent 60%)" }} />
          </div>
          <div className="flex flex-col justify-center px-8 py-16 lg:px-16">
            <p className="section-label mb-5">Our Philosophy</p>
            <h2
              className="mb-6"
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--text-primary)",
                lineHeight: 1.1,
              }}
            >
              Crafted with<br />
              <em style={{ color: "var(--brand)", fontStyle: "italic" }}>Intention.</em>
            </h2>
            <p className="leading-relaxed mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
              At VŌGE, we believe that what you wear is an expression of who you are.
              Every piece in our collection is selected with rigorous attention to material quality,
              construction, and timeless design language.
            </p>
            <p className="leading-relaxed mb-10 text-sm" style={{ color: "var(--text-secondary)" }}>
              We source responsibly, partner with skilled artisans, and ensure every product earns
              its place in your wardrobe — not just for a season, but for years.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary self-start">
                Our Story
              </Link>
              <Link href="/products" className="btn-outline self-start">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          § 9 — TESTIMONIALS (Carousel)
      ════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div ref={testimonialsRef} className="text-center mb-14">
          <p className="section-label mb-4 justify-center">Customer Stories</p>
          <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "var(--text-primary)" }}>
            Worn & Loved
          </h2>
        </div>

        {/* Desktop: all 4 in a row. Mobile: carousel */}
        <div className="hidden md:grid grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} featured={i === 1} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <TestimonialCard t={testimonials[testimonialIdx]} featured />
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prevTestimonial} className="w-9 h-9 rounded-full flex items-center justify-center transition-all" style={{ border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-secondary)" }}>
              <ChevronLeft size={18} />
            </button>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)} className="w-1.5 h-1.5 rounded-full transition-all" style={{ background: testimonialIdx === i ? "var(--brand)" : "var(--border)" }} />
            ))}
            <button onClick={nextTestimonial} className="w-9 h-9 rounded-full flex items-center justify-center transition-all" style={{ border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text-secondary)" }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          § 10 — TRUST BADGES
      ════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}>
        <div ref={badgesRef} className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-10">
          {badges.map((b) => (
            <div key={b.title} className="flex flex-col items-center text-center gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "var(--brand-light)", color: "var(--brand-dark)" }}
              >
                {b.icon}
              </div>
              <div>
                <p className="text-sm font-bold mb-0.5" style={{ color: "var(--text-primary)", fontFamily: "var(--font-body)" }}>{b.title}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          § 11 — NEWSLETTER
      ════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-center"
        style={{ background: "var(--obsidian)" }}
      >
        {/* Background texture */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(201,169,110,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(212,165,165,0.15) 0%, transparent 50%)"
        }} />
        <div className="relative max-w-lg mx-auto">
          <p className="section-label mb-5 justify-center">Exclusive Access</p>
          <h2
            className="mb-4 text-white"
            style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            First to the Collection
          </h2>
          <p className="mb-10 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Join 12,000+ style-forward customers. Early access to new drops, curated edits, and exclusive offers.
          </p>

          {subscribed ? (
            <div
              className="animate-scale-in inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold"
              style={{ background: "var(--brand)", color: "var(--obsidian)" }}
            >
              ✓ You&apos;re on the list — welcome to VŌGE.
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 w-full sm:w-auto px-5 py-3.5 rounded text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--brand)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
              />
              <button type="submit" className="btn-gold flex-shrink-0 w-full sm:w-auto">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────
function TestimonialCard({ t, featured }: { t: typeof testimonials[0]; featured?: boolean }) {
  return (
    <div
      className="rounded-2xl p-7 flex flex-col gap-4"
      style={{
        background: featured ? "var(--obsidian)" : "var(--bg-card)",
        border: `1px solid ${featured ? "var(--brand)" : "var(--border)"}`,
        boxShadow: featured ? "0 20px 56px rgba(10,10,15,0.20)" : "var(--shadow-sm)",
        transform: featured ? "scale(1.02)" : "scale(1)",
        color: featured ? "#fff" : "var(--text-primary)",
      }}
    >
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map((s) => (
          <Star key={s} size={13} fill="currentColor" style={{ color: "var(--brand)" }} />
        ))}
      </div>
      <p className="text-sm leading-relaxed flex-1 italic" style={{ color: featured ? "rgba(255,255,255,0.7)" : "var(--text-secondary)" }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
          <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="36px" />
        </div>
        <div>
          <p className="text-sm font-bold">{t.name}</p>
          <p className="text-[11px]" style={{ color: "var(--brand)" }}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}
