"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User, Settings, ShoppingBag, Tag, Star,
  Heart, Package, ChevronRight, CheckCircle2, Clock, Truck, XCircle, Edit3, Save, Copy
} from "lucide-react";
import { useProfile, Order, Coupon } from "@/context/ProfileContext";
import { useToast } from "@/context/ToastContext";
import { products } from "@/data/products";

type Tab = "overview" | "edit" | "orders" | "coupons";

const STATUS_CONFIG: Record<Order["status"], { label: string; cls: string; icon: React.ReactNode }> = {
  Delivered:  { label: "Delivered",  cls: "chip-delivered",  icon: <CheckCircle2 size={13} /> },
  Shipped:    { label: "Shipped",    cls: "chip-shipped",    icon: <Truck size={13} /> },
  Processing: { label: "Processing", cls: "chip-processing", icon: <Clock size={13} /> },
  Cancelled:  { label: "Cancelled",  cls: "chip-cancelled",  icon: <XCircle size={13} /> },
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function AvatarCircle({ name, size = 80 }: { name: string; size?: number }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold select-none flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: "var(--gradient-brand)",
        fontSize: size * 0.3,
        fontFamily: "var(--font-body)",
      }}
    >
      {initials}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number | string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-2xl border text-center" style={{ borderColor: "var(--cream-dark)", background: "#fff" }}>
      <span style={{ color: "var(--brand)" }}>{icon}</span>
      <span className="text-2xl font-bold" style={{ color: "var(--navy)", fontFamily: "var(--font-editorial)" }}>{value}</span>
      <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">{label}</span>
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ setTab }: { setTab: (t: Tab) => void }) {
  const { profile, wishlist, orders, coupons } = useProfile();
  const activeCoupons = coupons.filter((c) => !c.used).length;
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id)).slice(0, 4);
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Orders" value={orders.length} icon={<ShoppingBag size={22} />} />
        <StatCard label="Wishlist" value={wishlist.length} icon={<Heart size={22} />} />
        <StatCard label="Active Coupons" value={activeCoupons} icon={<Tag size={22} />} />
        <StatCard label="Reviews" value={4} icon={<Star size={22} />} />
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.3rem", color: "var(--navy)" }}>Recent Orders</h3>
          <button onClick={() => setTab("orders")} className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>
            View All →
          </button>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-gray-500">No orders yet.</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const s = STATUS_CONFIG[order.status];
              return (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: "var(--cream-dark)" }}>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--navy)" }}>{order.id}</p>
                    <p className="text-xs text-gray-500">{order.date} · {order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold" style={{ color: "var(--navy)" }}>৳{order.total.toLocaleString()}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${s.cls}`}>{s.icon}{s.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Wishlist preview */}
      {wishlistProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.3rem", color: "var(--navy)" }}>Wishlist</h3>
            <Link href="/products" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--brand)" }}>Shop →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {wishlistProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group rounded-xl overflow-hidden border hover:shadow-md transition-shadow" style={{ borderColor: "var(--cream-dark)" }}>
                <div className="relative h-32 bg-gray-50">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="150px" />
                </div>
                <div className="p-2">
                  <p className="text-xs font-semibold truncate" style={{ color: "var(--navy)" }}>{p.name}</p>
                  <p className="text-xs font-bold" style={{ color: "var(--brand)" }}>৳{p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!profile.name && (
        <div className="p-5 rounded-2xl border-2 border-dashed text-center" style={{ borderColor: "var(--brand-light)" }}>
          <p className="text-sm text-gray-600 mb-3">Complete your profile to personalize your experience.</p>
          <button onClick={() => setTab("edit")} className="btn-brand px-6 py-2.5 text-xs">
            Set Up Profile
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Edit Tab ─────────────────────────────────────────────────────────────────
function EditTab() {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();
  const [form, setForm] = useState({ ...profile });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400)); // simulate save delay
    updateProfile(form);
    toast.success("Profile updated successfully!");
    setSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-5 mb-6">
        <AvatarCircle name={form.name} size={72} />
        <div>
          <p className="font-semibold" style={{ color: "var(--navy)" }}>{form.name || "Your Name"}</p>
          <p className="text-sm text-gray-500">{form.email || "your@email.com"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "name",    label: "Full Name",     type: "text",  placeholder: "John Doe" },
          { name: "email",   label: "Email Address", type: "email", placeholder: "you@example.com" },
          { name: "phone",   label: "Phone Number",  type: "tel",   placeholder: "+880 1700-000000" },
          { name: "address", label: "Street Address",type: "text",  placeholder: "123 Main Street" },
          { name: "city",    label: "City",          type: "text",  placeholder: "Dhaka" },
          { name: "country", label: "Country",       type: "text",  placeholder: "Bangladesh" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--navy)" }}>
              {field.label}
            </label>
            <input
              name={field.name}
              type={field.type}
              value={(form as Record<string, string>)[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="input-elegant"
            />
          </div>
        ))}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--navy)" }}>Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className="input-elegant bg-white">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--navy)" }}>Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={3}
          placeholder="Tell us a little about your style..."
          className="input-elegant resize-none"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="btn-brand flex items-center gap-2 disabled:opacity-70">
          {saving ? <><Save size={16} /> Saving…</> : <><Save size={16} /> Save Changes</>}
        </button>
        <button type="button" onClick={() => setForm({ ...profile })} className="btn-outline text-xs px-5 py-3.5">
          Reset
        </button>
      </div>
    </form>
  );
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────
function OrdersTab() {
  const { orders } = useProfile();
  const [expandedId, setExpanded] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package size={40} className="mx-auto mb-4 text-gray-300" />
        <p style={{ fontFamily: "var(--font-editorial)", fontSize: "1.2rem", color: "var(--navy)" }}>No orders yet</p>
        <p className="text-sm text-gray-500 mt-1 mb-6">Your orders will appear here once you purchase.</p>
        <Link href="/products" className="btn-brand inline-flex">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const s = STATUS_CONFIG[order.status];
        const expanded = expandedId === order.id;
        return (
          <div key={order.id} className="border rounded-2xl overflow-hidden" style={{ borderColor: "var(--cream-dark)" }}>
            <button
              onClick={() => setExpanded(expanded ? null : order.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4 text-left">
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--navy)" }}>{order.id}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.cls}`}>{s.icon}{s.label}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold" style={{ color: "var(--navy)" }}>৳{order.total.toLocaleString()}</span>
                <ChevronRight size={16} className={`text-gray-400 transition-transform ${expanded ? "rotate-90" : ""}`} />
              </div>
            </button>

            {expanded && (
              <div className="px-5 pb-5 border-t" style={{ borderColor: "var(--cream-dark)", background: "var(--cream)" }}>
                <div className="space-y-3 pt-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: "var(--navy)" }}>{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} · ৳{item.price.toLocaleString()}</p>
                      </div>
                      <p className="text-sm font-bold flex-shrink-0" style={{ color: "var(--navy)" }}>৳{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}

                  <div className="flex justify-between pt-3 border-t text-sm" style={{ borderColor: "var(--cream-dark)" }}>
                    <span className="text-gray-600">
                      {order.couponApplied ? `Coupon: ${order.couponApplied}` : "No coupon applied"}
                    </span>
                    <span className="font-bold" style={{ color: "var(--navy)" }}>Total: ৳{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Coupons Tab ──────────────────────────────────────────────────────────────
function CouponsTab() {
  const { coupons } = useProfile();
  const toast = useToast();
  const active = coupons.filter((c) => !c.used);
  const used   = coupons.filter((c) => c.used);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => toast.success(`Code "${code}" copied!`)).catch(() => toast.info(`Code: ${code}`));
  };

  const CouponCard = ({ c }: { c: Coupon }) => (
    <div className={`coupon-card ${c.used ? "used" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-editorial)", color: c.used ? "#999" : "var(--brand)" }}
            >
              {c.type === "percentage" ? `${c.discount}% OFF` : `৳${c.discount} OFF`}
            </span>
            {c.used && <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full font-semibold">Used</span>}
          </div>
          <p className="text-sm text-gray-600">{c.description}</p>
          {c.minOrder > 0 && <p className="text-xs text-gray-400 mt-1">Min order: ৳{c.minOrder.toLocaleString()}</p>}
          <p className="text-xs text-gray-400">Expires: {c.expiry}</p>
        </div>

        {!c.used && (
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <code className="text-sm font-mono font-bold px-3 py-1.5 rounded border" style={{ borderColor: "var(--brand-light)", background: "var(--brand-light)", color: "var(--brand-dark)" }}>
              {c.code}
            </code>
            <button
              onClick={() => handleCopy(c.code)}
              className="flex items-center gap-1 text-xs font-semibold transition-colors"
              style={{ color: "var(--brand)" }}
            >
              <Copy size={12} /> Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-base font-semibold mb-4" style={{ color: "var(--navy)", fontFamily: "var(--font-body)" }}>
          Active Coupons ({active.length})
        </h3>
        {active.length === 0 ? (
          <p className="text-sm text-gray-500">No active coupons right now.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {active.map((c) => <CouponCard key={c.code} c={c} />)}
          </div>
        )}
      </div>

      {used.length > 0 && (
        <div>
          <h3 className="text-base font-semibold mb-4" style={{ color: "var(--navy)", fontFamily: "var(--font-body)" }}>
            Used Coupons ({used.length})
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {used.map((c) => <CouponCard key={c.code} c={c} />)}
          </div>
        </div>
      )}

      <div className="p-5 rounded-2xl text-center" style={{ background: "var(--cream)" }}>
        <p className="text-sm text-gray-600 mb-1">Use coupons during checkout in your cart.</p>
        <Link href="/cart" className="text-sm font-bold" style={{ color: "var(--brand)" }}>Go to Cart →</Link>
      </div>
    </div>
  );
}

// ─── Main Profile Page ────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview",     icon: <User size={16} /> },
  { id: "edit",     label: "Edit Profile", icon: <Edit3 size={16} /> },
  { id: "orders",   label: "My Orders",    icon: <ShoppingBag size={16} /> },
  { id: "coupons",  label: "Coupons",      icon: <Tag size={16} /> },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { profile, wishlist, orders } = useProfile();

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Hero */}
      <div className="info-page-hero">
        <p className="section-label mb-3">My Account</p>
        <h1 className="text-white" style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2rem,4vw,3rem)" }}>
          {profile.name ? `Welcome back, ${profile.name.split(" ")[0]}` : "Your Profile"}
        </h1>
        <p className="text-white/50 mt-2 text-sm">{orders.length} orders · {wishlist.length} in wishlist</p>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">

          {/* Sidebar */}
          <aside className="lg:col-span-3 mb-8 lg:mb-0">
            <div className="flex flex-col items-center p-6 rounded-2xl border text-center mb-4" style={{ borderColor: "var(--cream-dark)", background: "#fff" }}>
              <AvatarCircle name={profile.name} size={72} />
              <p className="mt-3 font-bold text-base" style={{ color: "var(--navy)" }}>{profile.name || "Complete Profile"}</p>
              <p className="text-xs text-gray-500 mt-0.5 truncate max-w-full">{profile.email || "Add your email"}</p>
              {profile.city && <p className="text-xs text-gray-400 mt-0.5">{profile.city}, {profile.country}</p>}
            </div>

            <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                    ${activeTab === tab.id
                      ? "text-white"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                  style={activeTab === tab.id ? { background: "var(--gradient-brand)" } : {}}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.id === "orders"  && orders.length > 0  && (
                    <span className="ml-auto text-xs font-bold rounded-full px-1.5" style={{ background: "var(--brand-light)", color: "var(--brand)" }}>{orders.length}</span>
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="lg:col-span-9">
            <div className="bg-white rounded-2xl border p-6 sm:p-8" style={{ borderColor: "var(--cream-dark)" }}>
              {activeTab === "overview" && <OverviewTab setTab={setActiveTab} />}
              {activeTab === "edit"     && <EditTab />}
              {activeTab === "orders"   && <OrdersTab />}
              {activeTab === "coupons"  && <CouponsTab />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
