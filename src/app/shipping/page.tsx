import { Truck, Clock, MapPin, Package, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Shipping Policy — Fashion Store",
  description: "Learn about Fashion Store's delivery options, timelines, and free shipping offers.",
};

const zones = [
  { zone: "Dhaka Metro",         time: "1–2 Business Days",    fee: "৳60" },
  { zone: "Other Major Cities",  time: "2–4 Business Days",    fee: "৳90" },
  { zone: "Nationwide Delivery", time: "4–7 Business Days",    fee: "৳120" },
  { zone: "Free (over ৳3,000)",  time: "Standard timeline",    fee: "FREE" },
];

export default function ShippingPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      <div className="info-page-hero">
        <p className="section-label mb-3">Delivery</p>
        <h1 className="text-white" style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
          Shipping Policy
        </h1>
        <p className="text-white/60 mt-4 text-sm">Fast, reliable delivery across Bangladesh.</p>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Free shipping banner */}
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: "var(--brand-light)", border: "1.5px solid var(--brand)" }}
        >
          <Truck size={32} className="mx-auto mb-3" style={{ color: "var(--brand)" }} />
          <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.5rem", color: "var(--navy)" }}>
            Free Shipping on Orders Over ৳3,000
          </h2>
          <p className="text-sm text-gray-600 mt-2">No code needed — discount applied automatically at checkout.</p>
          <Link href="/products" className="btn-brand inline-flex mt-4">Shop Now</Link>
        </div>

        {/* Delivery zones */}
        <section>
          <h2 className="mb-6" style={{ fontFamily: "var(--font-editorial)", fontSize: "1.6rem", color: "var(--navy)" }}>
            Delivery Zones & Fees
          </h2>
          <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--cream-dark)" }}>
            <table className="w-full text-sm">
              <thead style={{ background: "var(--navy)", color: "#fff" }}>
                <tr>
                  <th className="px-5 py-3 text-left text-xs uppercase tracking-widest">Zone</th>
                  <th className="px-5 py-3 text-left text-xs uppercase tracking-widest">Estimated Time</th>
                  <th className="px-5 py-3 text-right text-xs uppercase tracking-widest">Fee</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((z, i) => (
                  <tr key={z.zone} style={{ background: i % 2 === 0 ? "#fff" : "var(--cream)" }}>
                    <td className="px-5 py-4 font-medium" style={{ color: "var(--navy)" }}>{z.zone}</td>
                    <td className="px-5 py-4 text-gray-600">{z.time}</td>
                    <td className={`px-5 py-4 text-right font-bold ${z.fee === "FREE" ? "" : ""}`}
                        style={{ color: z.fee === "FREE" ? "var(--brand)" : "var(--navy)" }}>
                      {z.fee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Process */}
        <section>
          <h2 className="mb-6" style={{ fontFamily: "var(--font-editorial)", fontSize: "1.6rem", color: "var(--navy)" }}>
            Order Process
          </h2>
          <div className="space-y-4">
            {[
              { icon: <CheckCircle2 size={20} />, title: "Order Confirmed",   desc: "You'll receive an email confirmation within minutes of placing your order." },
              { icon: <Package size={20} />,      title: "Order Processed",   desc: "Our team verifies and packs your order within 24 business hours." },
              { icon: <Truck size={20} />,        title: "Shipped",           desc: "Your order is handed to our delivery partner. A tracking SMS is sent." },
              { icon: <MapPin size={20} />,       title: "Out for Delivery",  desc: "Our courier will contact you before delivering to your address." },
              { icon: <Clock size={20} />,        title: "Delivered",         desc: "Sign and receive your package. Inspect it before the courier leaves." },
            ].map((step, i) => (
              <div key={step.title} className="flex items-start gap-4 p-4 rounded-xl border" style={{ borderColor: "var(--cream-dark)" }}>
                <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--brand-light)", color: "var(--brand)" }}>
                  {step.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--navy)" }}>Step {i + 1}: {step.title}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-sm text-gray-500 p-5 rounded-xl" style={{ background: "var(--cream)" }}>
          <strong style={{ color: "var(--navy)" }}>Note:</strong> Delivery times may vary during sale periods, public holidays, and adverse weather conditions.
          For any delivery concerns, please <Link href="/contact" style={{ color: "var(--brand)" }} className="underline">contact us</Link>.
        </div>
      </div>
    </div>
  );
}
