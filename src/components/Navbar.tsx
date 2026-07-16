"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ShoppingBag, Search, Menu, X, ChevronDown,
  Shirt, Package, Footprints, Watch, Layers, Wind
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const categories = [
  { name: "Panjabi", href: "/products", icon: <Shirt size={20} />, desc: "Festive & daily wear" },
  { name: "Outerwear", href: "/products", icon: <Wind size={20} />, desc: "Jackets & coats" },
  { name: "T-Shirts", href: "/products", icon: <Layers size={20} />, desc: "Essentials & graphics" },
  { name: "Trousers", href: "/products", icon: <Package size={20} />, desc: "Chinos, cargo & linen" },
  { name: "Accessories", href: "/products", icon: <Watch size={20} />, desc: "Scarves, bags & more" },
  { name: "Footwear", href: "/products", icon: <Footprints size={20} />, desc: "Sneakers & boots" },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const shopRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Scroll listener for background change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Prevent body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navBase = "fixed top-0 left-0 right-0 z-50 transition-all duration-300";
  const navBg = scrolled
    ? "bg-[#0f0f0f]/95 backdrop-blur-md shadow-lg border-b border-white/5"
    : "bg-transparent";

  return (
    <>
      {/* ── Announcement Bar ─────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-[51] h-8 flex items-center overflow-hidden text-[10px] font-semibold tracking-widest uppercase"
        style={{ background: "var(--gold)", color: "var(--charcoal)", fontFamily: "var(--font-body)" }}
      >
        <div className="animate-marquee whitespace-nowrap flex gap-12">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="inline-flex gap-12">
              <span>✦ Free Shipping over ৳3000</span>
              <span>✦ New Arrivals Weekly</span>
              <span>✦ Easy 30-Day Returns</span>
              <span>✦ Authentic Premium Quality</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Navbar ──────────────────────────────────────── */}
      <header className={`${navBase} ${navBg}`} style={{ top: "32px" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Left: Hamburger (mobile) + Logo */}
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden text-white p-1"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </button>

              <Link href="/" aria-label="Fashion Store Home">
                <span
                  style={{ fontFamily: "var(--font-editorial)", color: "var(--gold)" }}
                  className="text-xl sm:text-2xl font-semibold tracking-wide leading-none"
                >
                  FASHION<span className="font-light text-white/80"> STORE</span>
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide"
              >
                Home
              </Link>

              {/* Shop mega-menu trigger */}
              <div ref={shopRef} className="relative">
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide"
                  aria-expanded={shopOpen}
                >
                  Shop All
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Mega Menu Panel */}
                <div
                  className={`mega-menu w-[640px] -left-32 ${shopOpen ? "open" : ""}`}
                  style={{ top: "calc(100% + 16px)" }}
                >
                  <div className="max-w-7xl mx-auto px-8 py-8">
                    <div className="grid grid-cols-3 gap-4">
                      {categories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setShopOpen(false)}
                          className="group flex items-start gap-3 p-3 rounded-lg hover:bg-cream transition-colors duration-200"
                          style={{ "--cream": "var(--cream)" } as React.CSSProperties}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--cream)")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "")}
                        >
                          <span
                            className="p-2 rounded-lg flex-shrink-0"
                            style={{ background: "var(--cream-dark)", color: "var(--gold-dark)" }}
                          >
                            {cat.icon}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-charcoal"
                               style={{ fontFamily: "var(--font-body)" }}>
                              {cat.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{cat.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div
                      className="mt-6 pt-5 border-t flex items-center justify-between"
                      style={{ borderColor: "var(--cream-dark)" }}
                    >
                      <p className="text-xs text-gray-400" style={{ fontFamily: "var(--font-body)" }}>
                        23 products across 6 categories
                      </p>
                      <Link
                        href="/products"
                        onClick={() => setShopOpen(false)}
                        className="text-xs font-bold uppercase tracking-widest transition-colors"
                        style={{ color: "var(--gold-dark)", fontFamily: "var(--font-body)" }}
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/cart"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide"
              >
                Cart
              </Link>
            </nav>

            {/* Right: Search + Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search */}
              <div className="relative flex items-center">
                {searchOpen ? (
                  <div className="flex items-center gap-2 animate-fade-in">
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search products…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                      className="w-36 sm:w-48 text-sm text-white bg-transparent border-b border-white/50
                        placeholder:text-white/40 focus:outline-none focus:border-gold py-1 pr-2"
                      style={{ fontFamily: "var(--font-body)", borderBottomColor: "var(--gold)" }}
                    />
                    <button onClick={() => setSearchOpen(false)} className="text-white/60 hover:text-white">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-white/80 hover:text-white transition-colors"
                    aria-label="Open search"
                  >
                    <Search size={20} />
                  </button>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-white/80 hover:text-white transition-colors"
                aria-label={`Shopping cart, ${cartCount} items`}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span
                    key={cartCount}
                    className="animate-badge absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center
                      rounded-full text-[10px] font-bold text-charcoal"
                    style={{ background: "var(--gold)", color: "var(--charcoal)" }}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ────────────────────────────────────── */}
      {mobileOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setMobileOpen(false)} />
          <div className="drawer-panel" style={{ fontFamily: "var(--font-body)" }}>
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <span
                style={{ fontFamily: "var(--font-editorial)", color: "var(--gold)" }}
                className="text-xl font-semibold tracking-wide"
              >
                FASHION<span className="font-light text-white/60"> STORE</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white/60 hover:text-white p-1"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="p-5 space-y-1">
              {[
                { label: "Home", href: "/" },
                { label: "Shop All", href: "/products" },
                { label: "Cart", href: "/cart" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-white/10 text-base font-medium text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4">
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--gold)" }}>
                  Categories
                </p>
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 py-3 border-b border-white/5 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <span style={{ color: "var(--gold)" }}>{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="p-5 mt-auto">
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="block w-full py-3 text-center text-sm font-bold uppercase tracking-widest rounded"
                style={{ background: "var(--gold)", color: "var(--charcoal)" }}
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Spacer below fixed navbar (announcement + header height) */}
      <div style={{ height: "calc(32px + 64px)" }} />
    </>
  );
}
