"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="bg-gray-50 p-6 rounded-full mb-6">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you have not added anything to your cart yet. Let us get you started.</p>
        <Link href="/products" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Checkout Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-7 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex py-6 border-b border-gray-100 last:border-0">
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
                <Image src={item.image} alt={item.name} fill className="object-cover object-center" />
              </div>

              <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">৳{item.price}</p>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:pr-9">
                    <div className="flex items-center border border-gray-300 rounded-lg max-w-[100px]">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-600 hover:text-black">
                        <Minus size={14} />
                      </button>
                      <span className="flex-1 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-600 hover:text-black">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute right-0 top-0 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="mt-16 rounded-2xl bg-gray-50 px-4 py-6 sm:p-8 lg:col-span-5 lg:mt-0">
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium text-gray-900">৳{cartTotal}</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-gray-600">Standard Shipping</dt>
              <dd className="font-medium text-gray-900">Free</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-bold text-gray-900">Order Total</dt>
              <dd className="text-lg font-black text-gray-900">৳{cartTotal}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <button
              onClick={() => alert("Simulation Complete! Ready for backend integration.")}
              className="w-full flex items-center justify-center space-x-2 bg-black text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
