import Link from "next/link";
import { RefreshCw, CheckCircle2, XCircle, Clock } from "lucide-react";

export const metadata = {
  title: "Returns & Exchanges — Fashion Store",
  description: "30-day hassle-free returns and exchanges at Fashion Store.",
};

const eligible = [
  "Items in original, unworn condition with all tags attached",
  "Items returned within 30 days of delivery date",
  "Items in original packaging (box/bag where applicable)",
  "Defective or damaged items (photos required)",
];

const notEligible = [
  "Worn, washed, or altered items",
  "Items without original tags",
  "Sale items marked as 'Final Sale'",
  "Accessories (scarves, belts, hats) for hygiene reasons",
  "Items returned after 30 days",
];

export default function ReturnsPage() {
  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      <div className="info-page-hero">
        <p className="section-label mb-3">Returns</p>
        <h1 className="text-white" style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
          Returns & Exchanges
        </h1>
        <p className="text-white/60 mt-4 text-sm">30-day hassle-free returns. No questions asked.</p>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Policy highlight */}
        <div className="rounded-2xl p-6 text-center" style={{ background: "var(--brand-light)", border: "1.5px solid var(--brand)" }}>
          <RefreshCw size={32} className="mx-auto mb-3" style={{ color: "var(--brand)" }} />
          <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.5rem", color: "var(--navy)" }}>
            30-Day Return Window
          </h2>
          <p className="text-sm text-gray-600 mt-2 max-w-sm mx-auto">
            Not happy with your purchase? Return it within 30 days for a full refund or free exchange.
          </p>
        </div>

        {/* How to return */}
        <section>
          <h2 className="mb-6" style={{ fontFamily: "var(--font-editorial)", fontSize: "1.6rem", color: "var(--navy)" }}>
            How to Return
          </h2>
          <div className="space-y-4">
            {[
              { icon: <Clock size={20} />, step: "1", title: "Initiate within 30 days", desc: "Contact us via the form below or email hello@fashionstore.com with your order ID and reason for return." },
              { icon: <RefreshCw size={20} />, step: "2", title: "Pack the item", desc: "Securely pack the item in its original packaging with all tags attached and original receipt." },
              { icon: <CheckCircle2 size={20} />, step: "3", title: "Ship it back", desc: "Our team will arrange a pickup (free for Dhaka) or provide a courier address for outstation returns." },
              { icon: <CheckCircle2 size={20} />, step: "4", title: "Receive your refund", desc: "Once received and inspected, your refund or exchange will be processed within 5–7 business days." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4 p-4 rounded-xl border" style={{ borderColor: "var(--cream-dark)" }}>
                <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--brand-light)", color: "var(--brand)" }}>
                  {s.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--navy)" }}>Step {s.step}: {s.title}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl border" style={{ borderColor: "#BBF7D0", background: "#F0FFF4" }}>
            <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: "#065F46" }}>
              <CheckCircle2 size={18} /> Eligible for Return
            </h3>
            <ul className="space-y-2">
              {eligible.map((item) => (
                <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl border" style={{ borderColor: "#FECACA", background: "#FFF5F5" }}>
            <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: "#991B1B" }}>
              <XCircle size={18} /> Not Eligible
            </h3>
            <ul className="space-y-2">
              {notEligible.map((item) => (
                <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center p-6 rounded-2xl" style={{ background: "var(--cream)" }}>
          <p className="text-sm text-gray-600 mb-4">Have more questions about your return?</p>
          <Link href="/contact" className="btn-brand inline-flex">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
