"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import {
  SlidersHorizontal, Grid2X2, LayoutList, X, ChevronDown,
  ChevronLeft, ChevronRight
} from "lucide-react";
import Link from "next/link";

const PRODUCTS_PER_PAGE = 8;

const sortOptions = [
  { value: "default",    label: "Featured" },
  { value: "price-low",  label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
];

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const initCat  = searchParams.get("cat")  || "All";
  const initPage = parseInt(searchParams.get("page") || "1", 10);

  const [searchQuery,      setSearchQuery]      = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initCat);
  const [sortBy,           setSortBy]           = useState("default");
  const [gridView,         setGridView]         = useState<"grid" | "list">("grid");
  const [sortOpen,         setSortOpen]         = useState(false);
  const [currentPage,      setCurrentPage]      = useState(initPage);

  // Sync category from URL
  useEffect(() => {
    const cat = searchParams.get("cat") || "All";
    setSelectedCategory(cat);
    setCurrentPage(1);
  }, [searchParams]);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (sortBy === "price-low")  result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // Pagination
  const totalPages   = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage     = Math.min(currentPage, totalPages);
  const startIdx     = (safePage - 1) * PRODUCTS_PER_PAGE;
  const pageProducts = filteredProducts.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

  // Reset page on filter change
  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedCategory, sortBy]);

  const goToPage = (p: number) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAll = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("default");
    router.push("/products");
  };
  const hasFilters = searchQuery || selectedCategory !== "All" || sortBy !== "default";
  const currentSortLabel = sortOptions.find((s) => s.value === sortBy)?.label ?? "Featured";

  const setCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "All") router.push("/products");
    else router.push(`/products?cat=${encodeURIComponent(cat)}`);
  };

  return (
    <div style={{ fontFamily: "var(--font-body)", background: "var(--bg-primary)" }}>

      {/* ── Page Hero ──────────────────────────────────────────── */}
      <div className="info-page-hero">
        <p className="section-label mb-4 justify-center">VŌGE</p>
        <h1
          className="text-white"
          style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700 }}
        >
          The Studio Catalog
        </h1>
        <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          {products.length} curated pieces across {categories.length - 1} categories
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Controls Bar ───────────────────────────────────────── */}
        <div
          className="flex flex-col lg:flex-row lg:items-center gap-4 pb-6 mb-8 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Search */}
          <div className="relative flex-shrink-0 w-full sm:w-64">
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-elegant pl-4 pr-9 w-full"
              style={{ fontFamily: "var(--font-body)" }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                aria-label="Clear search"
                style={{ color: "var(--text-muted)" }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap border tracking-wide"
                style={{
                  background: selectedCategory === cat ? "var(--obsidian)" : "transparent",
                  color: selectedCategory === cat ? "#fff" : "var(--text-secondary)",
                  borderColor: selectedCategory === cat ? "var(--obsidian)" : "var(--border)",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.04em",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded border text-sm font-medium transition-colors"
              style={{
                borderColor: "var(--border)",
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)",
                background: "var(--bg-card)",
              }}
            >
              <SlidersHorizontal size={14} />
              {currentSortLabel}
              <ChevronDown size={13} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>

            {sortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                <div
                  className="absolute right-0 top-full mt-1.5 z-20 min-w-[200px] rounded-lg border overflow-hidden animate-slide-up"
                  style={{ borderColor: "var(--border)", background: "var(--bg-card)", boxShadow: "var(--shadow-lg)" }}
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm transition-colors"
                      style={{
                        fontFamily: "var(--font-body)",
                        background: sortBy === opt.value ? "var(--brand-light)" : "transparent",
                        color: sortBy === opt.value ? "var(--brand-dark)" : "var(--text-secondary)",
                        fontWeight: sortBy === opt.value ? 600 : 400,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Grid / List Toggle */}
          <div className="flex items-center border rounded overflow-hidden flex-shrink-0" style={{ borderColor: "var(--border)" }}>
            <button
              onClick={() => setGridView("grid")}
              className="p-2.5 transition-colors"
              style={{
                background: gridView === "grid" ? "var(--obsidian)" : "var(--bg-card)",
                color: gridView === "grid" ? "#fff" : "var(--text-muted)",
              }}
              aria-label="Grid view"
            >
              <Grid2X2 size={15} />
            </button>
            <button
              onClick={() => setGridView("list")}
              className="p-2.5 transition-colors"
              style={{
                background: gridView === "list" ? "var(--obsidian)" : "var(--bg-card)",
                color: gridView === "list" ? "#fff" : "var(--text-muted)",
              }}
              aria-label="List view"
            >
              <LayoutList size={15} />
            </button>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasFilters && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-muted)" }}>Active:</span>
            {selectedCategory !== "All" && (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "var(--brand-light)", color: "var(--brand-dark)" }}
              >
                {selectedCategory}
                <button onClick={() => setCategory("All")} aria-label="Remove category filter"><X size={11} /></button>
              </span>
            )}
            {searchQuery && (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "var(--brand-light)", color: "var(--brand-dark)" }}
              >
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery("")} aria-label="Remove search filter"><X size={11} /></button>
              </span>
            )}
            <button
              onClick={clearAll}
              className="text-xs font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
              style={{ color: "var(--brand)" }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Result count + pagination info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Showing <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
              {startIdx + 1}–{Math.min(startIdx + PRODUCTS_PER_PAGE, filteredProducts.length)}
            </span> of <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{filteredProducts.length}</span> products
          </p>
          {totalPages > 1 && (
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Page {safePage} of {totalPages}
            </p>
          )}
        </div>

        {/* ── Empty State ────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div
            className="text-center py-24 border border-dashed rounded-xl"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-editorial)", color: "var(--text-primary)" }}>
              No products found
            </p>
            <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
              Try adjusting your filters or search query.
            </p>
            <button onClick={clearAll} className="btn-primary">
              Clear All Filters
            </button>
          </div>
        ) : gridView === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pageProducts.map((product, i) => (
              <div
                key={product.id}
                className="opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="flex flex-col gap-4">
            {pageProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="flex gap-5 p-4 border rounded-xl transition-all hover:shadow-md"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              >
                <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden" style={{ background: "var(--bg-subtle)" }}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1" style={{ color: "var(--brand)" }}>
                      {product.category}
                    </p>
                    <h3 className="font-semibold truncate" style={{ fontFamily: "var(--font-editorial)", fontSize: "1.1rem", color: "var(--text-primary)" }}>
                      {product.name}
                    </h3>
                    <p className="text-xs mt-1 line-clamp-2" style={{ color: "var(--text-muted)" }}>{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>৳{product.price.toLocaleString()}</p>
                    {!product.inStock && (
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand-rose-dk)" }}>Out of Stock</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ── Pagination Controls ─────────────────────────────────── */}
        {totalPages > 1 && filteredProducts.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              className="pagination-btn"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first, last, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= safePage - 1 && page <= safePage + 1)
              ) {
                return (
                  <button
                    key={page}
                    className={`pagination-btn ${safePage === page ? "active" : ""}`}
                    onClick={() => goToPage(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={safePage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                );
              }
              if (page === 2 && safePage > 3) {
                return <span key="ellipsis-start" className="px-1" style={{ color: "var(--text-muted)" }}>…</span>;
              }
              if (page === totalPages - 1 && safePage < totalPages - 2) {
                return <span key="ellipsis-end" className="px-1" style={{ color: "var(--text-muted)" }}>…</span>;
              }
              return null;
            })}

            <button
              className="pagination-btn"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <p className="text-center text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            Showing {PRODUCTS_PER_PAGE} products per page
          </p>
        )}

      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]" style={{ color: "var(--text-muted)" }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderColor: "var(--brand)", borderTopColor: "transparent" }} />
          <p className="text-sm">Loading catalog…</p>
        </div>
      </div>
    }>
      <ProductsPageInner />
    </Suspense>
  );
}

