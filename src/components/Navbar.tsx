"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag, Search, Menu, X, ChevronDown,
  Shirt, Package, Footprints, Watch, Layers, Wind,
  User, Heart, ShoppingCart, LogOut, Sun, Moon,
  MapPin, Ruler
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProfile } from "@/context/ProfileContext";
import { useTheme } from "@/context/ThemeContext";

const categories = [
  { name: "Panjabi",     href: "/products?cat=Panjabi",     icon: <Shirt size={18} />,      desc: "Festive & daily wear",  count: 4 },
  { name: "Outerwear",   href: "/products?cat=Outerwear",   icon: <Wind size={18} />,       desc: "Jackets & coats",       count: 4 },
  { name: "T-Shirts",   href: "/products?cat=T-Shirts",    icon: <Layers size={18} />,     desc: "Essentials & graphics", count: 4 },
  { name: "Trousers",   href: "/products?cat=Trousers",    icon: <Package size={18} />,    desc: "Chinos, cargo & linen", count: 3 },
  { name: "Accessories",href: "/products?cat=Accessories", icon: <Watch size={18} />,      desc: "Scarves, bags & more",  count: 4 },
  { name: "Footwear",   href: "/products?cat=Footwear",    icon: <Footprints size={18} />, desc: "Sneakers & boots",      count: 4 },
];

export default function Navbar() {
  const { cartCount }            = useCart();
  const { profile, wishlist }    = useProfile();
  const { theme, toggleTheme }   = useTheme();
  const pathname                 = usePathname();

  const [scrolled, setScrolled]       = useState(false);
  const [shopOpen, setShopOpen]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [avatarOpen, setAvatarOpen]   = useState(false);

  const shopRef   = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const wishlistCount = wishlist.length;
  const isDark        = theme === "dark";

  // Only home page gets the transparent-hero effect
  const isHomePage    = pathname === "/";
  // Transparent only when on home AND not yet scrolled
  const isTransparent = isHomePage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    // Check immediately on mount (so refreshing mid-page works)
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setShopOpen(false);
    setAvatarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) setShopOpen(false);
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) setAvatarOpen(false);
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

  // Solid background values
  const solidBg      = isDark ? "rgba(10,10,15,0.97)" : "rgba(255,255,255,0.97)";
  const solidBorder  = isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(10,10,15,0.09)";
  const linkColor    = "var(--text-secondary)";
  const iconColor    = "var(--text-primary)";

  return (
    <>
      {/* ── Announcement bar ─────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-[51] h-8 flex items-center overflow-hidden"
        style={{ background: "var(--obsidian)" }}
      >
        <div
          className="animate-marquee whitespace-nowrap flex gap-16 text-[10px] font-bold tracking-[0.2em] uppercase"
          style={{ color: "rgba(201,169,110,0.85)" }}
        >
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="inline-flex gap-16">
              <span>✦ Free Shipping over ৳3000</span>
              <span>✦ New Arrivals Every Week</span>
              <span>✦ Easy 30-Day Returns</span>
              <span>✦ Authentic Premium Quality</span>
              <span>✦ Crafted for the Discerning</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main header ──────────────────────────────────── */}
      <header
        className="fixed left-0 right-0 z-50 transition-all duration-400"
        style={{
          top: "32px",
          background: solidBg,
          backdropFilter: "blur(18px) saturate(180%)",
          borderBottom: scrolled ? solidBorder : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(10,10,15,0.10)" : "none",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[68px] items-center justify-between gap-4">

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-md transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{ color: iconColor }}
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link href="/" aria-label="VŌGE Home" className="flex-shrink-0">
              <span
                className="text-2xl font-bold leading-none"
                style={{
                  fontFamily: "var(--font-editorial)",
                  letterSpacing: "0.12em",
                  color: "var(--text-primary)",
                  transition: "color 0.4s ease",
                }}
              >
                V<span style={{ color: "var(--brand)" }}>Ō</span>GE
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { label: "Home",    href: "/" },
                { label: "About",   href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm font-medium tracking-wide transition-colors duration-200"
                  style={{
                    color: pathname === href ? "var(--brand)" : linkColor,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {label}
                </Link>
              ))}

              {/* Shop mega-menu trigger */}
              <div ref={shopRef} className="relative">
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-200"
                  aria-expanded={shopOpen}
                  style={{ color: linkColor, fontFamily: "var(--font-body)" }}
                >
                  Shop
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200"
                    style={{ transform: shopOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                <div
                  className={`mega-menu ${shopOpen ? "open" : ""}`}
                  style={{ width: "640px", top: "calc(100% + 20px)" }}
                >
                  <div className="px-8 py-7">
                    <div className="grid grid-cols-3 gap-1.5">
                      {categories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setShopOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-lg transition-colors group"
                          style={{ color: "var(--text-secondary)" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-subtle)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                        >
                          <span
                            className="p-2 rounded-lg flex-shrink-0 mt-0.5"
                            style={{ background: "var(--brand-light)", color: "var(--brand-dark)" }}
                          >
                            {cat.icon}
                          </span>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                              {cat.name}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                              {cat.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div
                      className="mt-5 pt-4 flex items-center justify-between"
                      style={{ borderTop: "1px solid var(--border)" }}
                    >
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        23 curated pieces across 6 categories
                      </p>
                      <Link
                        href="/products"
                        onClick={() => setShopOpen(false)}
                        className="text-xs font-bold uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
                        style={{ color: "var(--brand)" }}
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-0.5">

              {/* Search */}
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                    className="w-36 sm:w-44 text-sm bg-transparent border-b py-1 pr-2 focus:outline-none"
                    style={{
                      borderBottomColor: "var(--brand)",
                      color: iconColor,
                    }}
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    style={{ color: "var(--text-muted)" }}
                    className="p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-md transition-opacity hover:opacity-70"
                  aria-label="Search"
                  style={{ color: iconColor }}
                >
                  <Search size={20} />
                </button>
              )}

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-md transition-opacity hover:opacity-70"
                aria-label={`Wishlist (${wishlistCount} items)`}
                style={{ color: iconColor }}
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span
                    className="animate-badge absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full text-[9px] font-bold"
                    style={{ background: "var(--brand)", color: "var(--obsidian)" }}
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-md transition-opacity hover:opacity-70"
                aria-label={`Cart (${cartCount} items)`}
                style={{ color: iconColor }}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span
                    className="animate-badge absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full text-[9px] font-bold"
                    style={{ background: "var(--brand)", color: "var(--obsidian)" }}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Avatar / Profile dropdown */}
              <div ref={avatarRef} className="relative ml-1">
                <button
                  onClick={() => setAvatarOpen(!avatarOpen)}
                  className="flex items-center p-1 rounded-full transition-opacity hover:opacity-80"
                  aria-label="Your profile"
                  aria-expanded={avatarOpen}
                >
                  {initials ? (
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                      style={{ background: "var(--gradient-brand)", color: "var(--obsidian)" }}
                    >
                      {initials}
                    </span>
                  ) : (
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                      style={{
                        background: "var(--bg-secondary)",
                        color: iconColor,
                        border: "1px solid var(--border)",
                      }}
                    >
                      <User size={15} />
                    </span>
                  )}
                </button>

                {avatarOpen && (
                  <div className="avatar-dropdown">
                    {/* Profile strip */}
                    <div
                      className="px-4 py-4 border-b"
                      style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold flex-shrink-0"
                          style={{
                            background: initials ? "var(--gradient-brand)" : "var(--bg-secondary)",
                            color: initials ? "var(--obsidian)" : "var(--text-muted)",
                          }}
                        >
                          {initials || <User size={18} />}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                            {profile.name || "Guest"}
                          </p>
                          <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                            {profile.email || "Not signed in"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Nav items */}
                    <div className="py-1.5">
                      {[
                        { icon: <User size={14} />,         label: "My Profile",   href: "/profile" },
                        { icon: <ShoppingCart size={14} />, label: "My Orders",    href: "/profile?tab=orders" },
                        { icon: <Heart size={14} />,        label: "My Wishlist",  href: "/wishlist", badge: wishlistCount || 0 },
                        { icon: <Ruler size={14} />,        label: "Size Guide",   href: "/size-guide" },
                        { icon: <MapPin size={14} />,       label: "Shipping",     href: "/shipping" },
                      ].map(({ icon, label, href, badge }) => (
                        <Link
                          key={label}
                          href={href}
                          onClick={() => setAvatarOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                          style={{ color: "var(--text-secondary)" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-subtle)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                        >
                          <span style={{ color: "var(--text-muted)" }}>{icon}</span>
                          <span className="flex-1">{label}</span>
                          {typeof badge === "number" && badge > 0 && (
                            <span
                              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{ background: "var(--brand-light)", color: "var(--brand-dark)" }}
                            >
                              {badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Theme toggle */}
                    <div
                      className="px-4 py-3 flex items-center justify-between border-t border-b"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="flex items-center gap-2.5">
                        {isDark
                          ? <Moon size={14} style={{ color: "var(--brand)" }} />
                          : <Sun  size={14} style={{ color: "var(--brand)" }} />
                        }
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          {isDark ? "Dark mode" : "Light mode"}
                        </span>
                      </div>
                      <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        style={{ background: isDark ? "var(--brand)" : "var(--border)" }}
                      >
                        <span
                          className="theme-toggle-thumb"
                          style={{ transform: isDark ? "translateX(18px)" : "translateX(0)" }}
                        />
                      </button>
                    </div>

                    {/* Sign out */}
                    <div className="py-1.5">
                      <button
                        onClick={() => setAvatarOpen(false)}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-subtle)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        <LogOut size={14} />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ────────────────────────────────── */}
      {mobileOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setMobileOpen(false)} />
          <div className="drawer-panel">
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-5 py-5 border-b"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <span
                className="text-xl font-bold tracking-[0.1em]"
                style={{ fontFamily: "var(--font-editorial)", color: "#fff" }}
              >
                V<span style={{ color: "var(--brand)" }}>Ō</span>GE
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-white/60 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Profile strip if logged in */}
            {initials && (
              <div
                className="px-5 py-4 flex items-center gap-3 border-b"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold flex-shrink-0"
                  style={{ background: "var(--gradient-brand)", color: "var(--obsidian)" }}
                >
                  {initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{profile.name}</p>
                  <p className="text-xs text-white/40">{profile.email}</p>
                </div>
              </div>
            )}

            {/* Main links */}
            <nav className="px-5 py-4 flex flex-col">
              {[
                { label: "Home",        href: "/" },
                { label: "Shop All",    href: "/products" },
                { label: "My Wishlist", href: "/wishlist", badge: wishlistCount },
                { label: "My Profile",  href: "/profile" },
                { label: "Cart",        href: "/cart", badge: cartCount },
                { label: "About",       href: "/about" },
                { label: "Contact",     href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3.5 text-base font-medium text-white/70 hover:text-white transition-colors border-b border-white/8"
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: "var(--brand)", color: "var(--obsidian)" }}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Categories */}
            <div className="px-5 pb-4">
              <p
                className="text-[10px] uppercase tracking-[0.2em] mb-3 mt-1"
                style={{ color: "var(--brand)" }}
              >
                Browse Categories
              </p>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-3 border-b border-white/8 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <span style={{ color: "var(--brand)" }}>{cat.icon}</span>
                  {cat.name}
                  <span className="ml-auto text-white/30 text-xs">{cat.count}</span>
                </Link>
              ))}
            </div>

            {/* Theme toggle */}
            <div
              className="px-5 py-4 border-t border-b flex items-center justify-between"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center gap-2 text-sm text-white/60">
                {isDark
                  ? <Moon size={14} style={{ color: "var(--brand)" }} />
                  : <Sun  size={14} style={{ color: "var(--brand)" }} />
                }
                {isDark ? "Dark mode" : "Light mode"}
              </div>
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{ background: isDark ? "var(--brand)" : "rgba(255,255,255,0.2)" }}
              >
                <span
                  className="theme-toggle-thumb"
                  style={{ transform: isDark ? "translateX(18px)" : "translateX(0)" }}
                />
              </button>
            </div>

            {/* CTA */}
            <div className="px-5 py-6">
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="btn-gold block w-full text-center"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Spacer so page content doesn't go under the fixed header */}
      <div style={{ height: "calc(32px + 68px)" }} />
    </>
  );
}
