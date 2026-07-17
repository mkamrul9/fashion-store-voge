"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ShoppingBag, Search, Menu, X, ChevronDown,
  Shirt, Package, Footprints, Watch, Layers, Wind, UserCircle2
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProfile } from "@/context/ProfileContext";

const categories = [
  { name: "Panjabi",     href: "/products", icon: <Shirt size={20} />,      desc: "Festive & daily wear" },
  { name: "Outerwear",   href: "/products", icon: <Wind size={20} />,       desc: "Jackets & coats" },
  { name: "T-Shirts",   href: "/products", icon: <Layers size={20} />,     desc: "Essentials & graphics" },
  { name: "Trousers",   href: "/products", icon: <Package size={20} />,    desc: "Chinos, cargo & linen" },
  { name: "Accessories",href: "/products", icon: <Watch size={20} />,      desc: "Scarves, bags & more" },
  { name: "Footwear",   href: "/products", icon: <Footprints size={20} />, desc: "Sneakers & boots" },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const { profile } = useProfile();
  const [scrolled, setScrolled]     = useState(false);
  const [shopOpen, setShopOpen]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const shopRef   = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node))
        setShopOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const initials = profile.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : null;

  return (
    <>
      {/* ── Announcement Bar ──────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-[51] h-8 flex items-center overflow-hidden text-[10px] font-bold tracking-widest uppercase"
        style={{ background: "var(--gradient-brand)", color: "#fff", fontFamily: "var(--font-body)" }}
      >
        <div className="animate-marquee whitespace-nowrap flex gap-16">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="inline-flex gap-16">
              <span>✦ Free Shipping over ৳3000</span>
              <span>✦ New Arrivals Weekly</span>
              <span>✦ Easy 30-Day Returns</span>
              <span>✦ Authentic Premium Quality</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Header ───────────────────────────────────── */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300`}
        style={{
          top: "32px",
          background: scrolled ? "rgba(11,17,32,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(11,17,32,0.3)" : "none",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Mobile hamburger + Logo */}
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
                  className="text-xl sm:text-2xl font-semibold tracking-wide leading-none"
                  style={{ fontFamily: "var(--font-editorial)" }}
                >
                  <span className="text-gradient-brand">FASHION</span>
                  <span className="font-light text-white/80"> STORE</span>
                </span>
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide">
                Home
              </Link>

              <div ref={shopRef} className="relative">
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide"
                  aria-expanded={shopOpen}
                >
                  Shop All
                  <ChevronDown size={15} className={`transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`} />
                </button>

                <div className={`mega-menu w-[640px] -left-32 ${shopOpen ? "open" : ""}`} style={{ top: "calc(100% + 16px)" }}>
                  <div className="max-w-7xl mx-auto px-8 py-8">
                    <div className="grid grid-cols-3 gap-3">
                      {categories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setShopOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-lg transition-colors duration-200 group"
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--cream)")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "")}
                        >
                          <span
                            className="p-2 rounded-lg flex-shrink-0"
                            style={{ background: "var(--brand-light)", color: "var(--brand-dark)" }}
                          >
                            {cat.icon}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{cat.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{cat.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 pt-5 border-t flex items-center justify-between" style={{ borderColor: "var(--cream-dark)" }}>
                      <p className="text-xs text-gray-400">23 products across 6 categories</p>
                      <Link
                        href="/products"
                        onClick={() => setShopOpen(false)}
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: "var(--brand)" }}
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/cart" className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide">
                Cart
              </Link>
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              {searchOpen ? (
                <div className="flex items-center gap-2 animate-fade-in">
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search products…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                    className="w-36 sm:w-48 text-sm text-white bg-transparent border-b py-1 pr-2 focus:outline-none"
                    style={{ borderBottomColor: "var(--brand)", fontFamily: "var(--font-body)" }}
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-white/60 hover:text-white">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-white/80 hover:text-white transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              )}

              {/* Profile */}
              <Link
                href="/profile"
                className="p-2 text-white/80 hover:text-white transition-colors relative"
                aria-label="Your profile"
              >
                {initials ? (
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    {initials}
                  </span>
                ) : (
                  <UserCircle2 size={22} />
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-white/80 hover:text-white transition-colors"
                aria-label={`Cart, ${cartCount} items`}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span
                    key={cartCount}
                    className="animate-badge absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: "var(--brand)" }}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────── */}
      {mobileOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setMobileOpen(false)} />
          <div className="drawer-panel">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <span className="text-xl font-semibold" style={{ fontFamily: "var(--font-editorial)" }}>
                <span className="text-gradient-brand">FASHION</span>
                <span className="font-light text-white/60"> STORE</span>
              </span>
              <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white p-1" aria-label="Close">
                <X size={22} />
              </button>
            </div>

            <nav className="p-5 space-y-1">
              {[
                { label: "Home", href: "/" },
                { label: "Shop All", href: "/products" },
                { label: "My Profile", href: "/profile" },
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
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--brand)" }}>
                  Categories
                </p>
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 py-3 border-b border-white/5 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <span style={{ color: "var(--brand)" }}>{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </nav>

            <div className="p-5">
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="btn-brand block w-full text-center"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Spacer */}
      <div style={{ height: "calc(32px + 64px)" }} />
    </>
  );
}
