"use client";
import { useState, useMemo } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, Grid2X2, LayoutList, X, ChevronDown } from "lucide-react";

const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [gridView, setGridView] = useState<"grid" | "list">("grid");
  const [sortOpen, setSortOpen] = useState(false);

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
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const clearAll = () => { setSearchQuery(""); setSelectedCategory("All"); setSortBy("default"); };
  const hasFilters = searchQuery || selectedCategory !== "All" || sortBy !== "default";

  const currentSortLabel = sortOptions.find((s) => s.value === sortBy)?.label ?? "Featured";

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>

      {/* ── Page Hero ──────────────────────────────────────────── */}
      <div
        className="py-14 px-4 sm:px-6 lg:px-8 text-center"
        style={{ background: "var(--charcoal)" }}
      >
        <p className="section-label mb-3">Fashion Store</p>
        <h1
          className="text-white"
          style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
        >
          The Studio Catalog
        </h1>
        <p className="text-white/50 mt-3 text-sm max-w-md mx-auto">
          {products.length} curated pieces across {categories.length - 1} categories
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Controls Bar ───────────────────────────────────────── */}
        <div
          className="flex flex-col lg:flex-row lg:items-center gap-4 pb-6 mb-8 border-b"
          style={{ borderColor: "var(--cream-dark)" }}
        >
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap border"
                style={{
                  background: selectedCategory === cat ? "var(--charcoal)" : "transparent",
                  color: selectedCategory === cat ? "#fff" : "var(--charcoal)",
                  borderColor: selectedCategory === cat ? "var(--charcoal)" : "var(--cream-dark)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1 hidden lg:block" />

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded border text-sm font-medium transition-colors"
              style={{ borderColor: "var(--cream-dark)", fontFamily: "var(--font-body)", color: "var(--charcoal)" }}
            >
              <SlidersHorizontal size={15} />
              {currentSortLabel}
              <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>

            {sortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                <div
                  className="absolute right-0 top-full mt-1 z-20 min-w-[200px] bg-white rounded-xl border shadow-lg overflow-hidden animate-slide-up"
                  style={{ borderColor: "var(--cream-dark)" }}
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm transition-colors"
                      style={{
                        fontFamily: "var(--font-body)",
                        background: sortBy === opt.value ? "var(--cream)" : "transparent",
                        color: sortBy === opt.value ? "var(--gold-dark)" : "var(--charcoal)",
                        fontWeight: sortBy === opt.value ? 600 : 400,
                      }}
                      onMouseEnter={(e) => {
                        if (sortBy !== opt.value)
                          (e.currentTarget as HTMLElement).style.background = "var(--cream)";
                      }}
                      onMouseLeave={(e) => {
                        if (sortBy !== opt.value)
                          (e.currentTarget as HTMLElement).style.background = "transparent";
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
          <div className="flex items-center gap-1 border rounded-lg overflow-hidden" style={{ borderColor: "var(--cream-dark)" }}>
            <button
              onClick={() => setGridView("grid")}
              className="p-2 transition-colors"
              style={{ background: gridView === "grid" ? "var(--charcoal)" : "transparent", color: gridView === "grid" ? "#fff" : "var(--charcoal)" }}
              aria-label="Grid view"
            >
              <Grid2X2 size={16} />
            </button>
            <button
              onClick={() => setGridView("list")}
              className="p-2 transition-colors"
              style={{ background: gridView === "list" ? "var(--charcoal)" : "transparent", color: gridView === "list" ? "#fff" : "var(--charcoal)" }}
              aria-label="List view"
            >
              <LayoutList size={16} />
            </button>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasFilters && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Active:</span>
            {selectedCategory !== "All" && (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "var(--cream)", color: "var(--charcoal)" }}
              >
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")}><X size={11} /></button>
              </span>
            )}
            {searchQuery && (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "var(--cream)", color: "var(--charcoal)" }}
              >
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery("")}><X size={11} /></button>
              </span>
            )}
            <button
              onClick={clearAll}
              className="text-xs font-bold uppercase tracking-wider underline"
              style={{ color: "var(--rose)" }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Result Count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing <span className="font-semibold" style={{ color: "var(--charcoal)" }}>{filteredProducts.length}</span> of {products.length} products
        </p>

        {/* ── Empty State ────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div
            className="text-center py-24 border border-dashed rounded-2xl"
            style={{ borderColor: "var(--cream-dark)" }}
          >
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-editorial)", color: "var(--charcoal)" }}>
              No products found
            </p>
            <p className="text-sm text-gray-500 mt-1 mb-6">
              Try adjusting your filters or search query.
            </p>
            <button onClick={clearAll} className="btn-primary">
              Clear All Filters
            </button>
          </div>
        ) : gridView === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, i) => (
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
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-5 p-4 border rounded-xl bg-white hover:shadow-md transition-shadow"
                style={{ borderColor: "var(--cream-dark)" }}
              >
                <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--gold-dark)" }}>
                      {product.category}
                    </p>
                    <h3 className="font-semibold truncate" style={{ fontFamily: "var(--font-editorial)", fontSize: "1.1rem" }}>
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold" style={{ color: "var(--charcoal)" }}>৳{product.price.toLocaleString()}</p>
                    {!product.inStock && (
                      <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Out of Stock</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
