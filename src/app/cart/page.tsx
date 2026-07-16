"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, ShieldCheck, Truck, RefreshCw, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

const COUPON_CODES: Record<string, number> = {
  FASHION10: 10,
  STYLE20: 20,
  WELCOME15: 15,
};

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const toast = useToast();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  const discountPct = appliedCoupon ? COUPON_CODES[appliedCoupon] : 0;
  const discountAmt = Math.round((cartTotal * discountPct) / 100);
  const shippingFee = cartTotal >= 3000 ? 0 : 120;
  const orderTotal = cartTotal - discountAmt + shippingFee;

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    if (COUPON_CODES[code]) {
      setAppliedCoupon(code);
      setCouponError("");
      toast.success(`Coupon "${code}" applied! ${COUPON_CODES[code]}% off.`);
    } else {
      setCouponError("Invalid coupon code. Try: FASHION10, STYLE20, WELCOME15");
      toast.error("Invalid coupon code.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCoupon("");
    setCouponError("");
    toast.info("Coupon removed.");
  };

  const handleRemove = (id: number, name: string) => {
    removeFromCart(id, () => {
      toast.info(`"${name}" removed from cart.`);
    });
  };

  if (cart.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center py-32 px-4"
        style={{ minHeight: "60vh", fontFamily: "var(--font-body)" }}
      >
        <div
          className="w-24 h-24 flex items-center justify-center rounded-full mb-8 animate-float"
          style={{ background: "var(--cream)" }}
        >
          <ShoppingBag size={40} style={{ color: "var(--gold)" }} />
        </div>
        <h2
          className="mb-3"
          style={{ fontFamily: "var(--font-editorial)", fontSize: "2rem", color: "var(--charcoal)" }}
        >
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-10 max-w-sm text-sm leading-relaxed">
          Looks like you have not added anything yet. Discover our curated collection and find pieces that speak to you.
        </p>
        <Link href="/products" className="btn-primary">
          Browse Collection <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>

      {/* Page Header */}
      <div
        className="py-10 px-4 sm:px-6 lg:px-8 border-b"
        style={{ borderColor: "var(--cream-dark)" }}
      >
        <div className="mx-auto max-w-7xl">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={15} /> Continue Shopping
          </Link>
          <div className="flex items-baseline justify-between">
            <h1 style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "var(--charcoal)" }}>
              Your Cart
            </h1>
            <span className="text-sm text-gray-500">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">

          {/* ── Cart Items ────────────────────────────── */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item, i) => (
              <div
                key={item.id}
                className="flex gap-4 sm:gap-6 p-4 sm:p-5 bg-white border rounded-2xl animate-fade-up"
                style={{ borderColor: "var(--cream-dark)", animationDelay: `${i * 60}ms`, animationFillMode: "forwards", opacity: 0 }}
              >
                {/* Image */}
                <Link href={`/products/${item.id}`} className="flex-shrink-0">
                  <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-gray-50">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="112px" />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--gold-dark)" }}>
                        {item.category}
                      </p>
                      <Link href={`/products/${item.id}`}>
                        <h3
                          className="font-semibold truncate hover:underline"
                          style={{ fontFamily: "var(--font-editorial)", fontSize: "1.05rem", color: "var(--charcoal)" }}
                        >
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-0.5">
                        ৳{item.price.toLocaleString()} each
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 p-1 h-fit"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty Stepper */}
                    <div
                      className="flex items-center border rounded-lg overflow-hidden"
                      style={{ borderColor: "var(--cream-dark)" }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold" style={{ color: "var(--charcoal)" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Line total */}
                    <p className="text-base font-bold" style={{ color: "var(--charcoal)" }}>
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => { clearCart(); toast.info("Cart cleared."); }}
                className="text-xs text-gray-400 hover:text-red-400 transition-colors uppercase tracking-widest font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* ── Order Summary ─────────────────────────── */}
          <div className="mt-10 lg:mt-0 lg:col-span-5 space-y-4">

            {/* Coupon Code */}
            <div
              className="rounded-2xl p-5 border"
              style={{ borderColor: "var(--cream-dark)", background: "var(--cream)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Tag size={16} style={{ color: "var(--gold-dark)" }} />
                <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--charcoal)" }}>
                  Coupon Code
                </span>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#E8F5E9" }}>
                  <span className="text-sm font-bold text-green-700">
                    ✓ {appliedCoupon} — {discountPct}% off applied
                  </span>
                  <button onClick={handleRemoveCoupon} className="text-xs text-red-500 font-semibold underline">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. FASHION10)"
                    value={coupon}
                    onChange={(e) => { setCoupon(e.target.value); setCouponError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    className="input-elegant flex-1 text-sm"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  <button onClick={handleApplyCoupon} className="btn-primary px-4 py-2 text-xs">
                    Apply
                  </button>
                </div>
              )}

              {couponError && (
                <p className="text-xs text-red-500 mt-2">{couponError}</p>
              )}
            </div>

            {/* Summary Card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "var(--charcoal)" }}
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: "var(--font-editorial)" }}>
                  Order Summary
                </h2>

                <dl className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <dt className="text-white/60">Subtotal ({cart.length} items)</dt>
                    <dd className="text-white font-medium">৳{cartTotal.toLocaleString()}</dd>
                  </div>

                  {discountAmt > 0 && (
                    <div className="flex justify-between text-sm">
                      <dt className="text-green-400">Discount ({discountPct}%)</dt>
                      <dd className="text-green-400 font-medium">−৳{discountAmt.toLocaleString()}</dd>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <dt className="text-white/60">Shipping</dt>
                    <dd className={shippingFee === 0 ? "text-green-400 font-medium" : "text-white font-medium"}>
                      {shippingFee === 0 ? "Free" : `৳${shippingFee}`}
                    </dd>
                  </div>

                  {shippingFee > 0 && (
                    <p className="text-xs text-white/40">
                      Add ৳{(3000 - cartTotal).toLocaleString()} more for free shipping
                    </p>
                  )}

                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <dt className="text-base font-semibold text-white">Total</dt>
                    <dd
                      className="text-2xl font-bold"
                      style={{ color: "var(--gold)", fontFamily: "var(--font-editorial)" }}
                    >
                      ৳{orderTotal.toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="px-6 pb-6">
                <button
                  onClick={() => {
                    toast.success("Order placed! (Demo simulation complete)");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded text-sm font-bold uppercase tracking-widest transition-all active:scale-[0.98]"
                  style={{ background: "var(--gold)", color: "var(--charcoal)", fontFamily: "var(--font-body)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--gold-dark)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--gold)")}
                >
                  Proceed to Checkout
                  <ArrowRight size={17} />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
                  <ShieldCheck size={14} />
                  <span>Secure checkout · SSL encrypted</span>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Truck size={15} />, label: "Free Shipping", sub: "Over ৳3k" },
                { icon: <RefreshCw size={15} />, label: "Easy Returns", sub: "30 days" },
                { icon: <ShieldCheck size={15} />, label: "Secure Pay", sub: "Encrypted" },
              ].map((b) => (
                <div key={b.label} className="p-3 border rounded-xl text-center" style={{ borderColor: "var(--cream-dark)" }}>
                  <span className="flex justify-center mb-1" style={{ color: "var(--gold-dark)" }}>{b.icon}</span>
                  <p className="text-[11px] font-bold" style={{ color: "var(--charcoal)" }}>{b.label}</p>
                  <p className="text-[10px] text-gray-400">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
