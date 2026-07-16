"use client";
import { useState, useMemo } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, Grid3X3 } from "lucide-react";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Get distinct categories dynamically from local data to showcase scalability
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  }, []);

  // Filter and sort items efficiently using local state metrics
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">The Studio Catalog</h1>
        <p className="text-sm text-gray-500 mt-1">Browse through our multi-category aesthetic pieces.</p>
      </div>

      {/* Controls: Search, Filter, Sort Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:max-w-xs px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />
          
          <div className="flex space-x-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Empty State vs Product Grid Handling */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-500 text-sm">No products matched your exact filter combination.</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSortBy("default"); }}
            className="mt-4 text-xs font-bold underline text-black uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 animate-fadeIn">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
