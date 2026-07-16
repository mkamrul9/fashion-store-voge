import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  // Pull the first 4 products as featured items
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Premium Hero Banner */}
      <section className="relative h-[70vh] w-full bg-gray-900">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
            alt="Premium Fashion Banner"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 text-white space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-300">New Collection 2026</span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-2xl leading-none">
            Redefining Modern Simplicity.
          </h1>
          <p className="max-w-md text-base sm:text-lg text-gray-300">
            Discover a curated collection of contemporary essentials designed for lasting impact.
          </p>
          <div>
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Curations</h2>
            <p className="text-sm text-gray-500 mt-1">Handpicked pieces from our design floor.</p>
          </div>
          <Link href="/products" className="group flex items-center space-x-1 text-sm font-semibold text-black">
            <span>View All</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
