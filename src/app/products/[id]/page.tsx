"use client";
import { use, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingBag, ArrowLeft, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { addToCart } = useCart();

  // In Next.js 15+, params is a Promise and must be unwrapped with React's `use()`
  const { id } = use(params);

  // Find product from local dummy data
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const handleAddToCart = () => {
    // In a real backend, we'd pass the specific variants here as a unique SKU
    addToCart(product);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/products" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery Column */}
        <div className="relative aspect-[4/5] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Product Info Column */}
        <div className="flex flex-col space-y-6">
          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">{product.category}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">{product.name}</h1>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating} / 5.0)</span>
          </div>

          <p className="text-2xl font-bold text-gray-900">৳{product.price}</p>
          <p className="text-base text-gray-600 leading-relaxed">{product.description}</p>

          <div className="border-t border-gray-100 pt-6 space-y-6">
            {/* Color Selector */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border text-sm rounded-md transition-all ${
                      selectedColor === color ? "border-black ring-1 ring-black text-black" : "border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 w-10 flex items-center justify-center border text-sm font-medium rounded-md transition-all ${
                      selectedSize === size ? "bg-black text-white border-black" : "border-gray-200 text-gray-900 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full flex items-center justify-center space-x-2 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 disabled:bg-gray-300 transition-all shadow-md active:scale-[0.98]"
            >
              <ShoppingBag size={20} />
              <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
            </button>
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
              <ShieldCheck size={16} />
              <span>Secure local checkout experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
