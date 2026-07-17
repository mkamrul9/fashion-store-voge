"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "Orders & Shipping",
    items: [
      { q: "How long does delivery take?", a: "Delivery takes 1–2 business days within Dhaka Metro and 2–7 business days for the rest of Bangladesh, depending on your location. You'll receive an SMS once your order is shipped." },
      { q: "Do you offer free shipping?", a: "Yes! Orders above ৳3,000 qualify for free shipping — automatically applied at checkout. No coupon needed." },
      { q: "Can I track my order?", a: "Absolutely. Once shipped, you'll receive a tracking link via SMS and email. You can also check your order status in your Profile under 'My Orders'." },
      { q: "Can I change or cancel my order?", a: "Orders can be cancelled within 1 hour of placement by contacting us. After that, the order enters processing and cannot be changed." },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      { q: "What is your return policy?", a: "We offer a 30-day hassle-free return on all eligible items. Items must be unworn, with tags attached, and in original packaging." },
      { q: "How do I initiate a return?", a: "Contact us via our Contact page or email hello@fashionstore.com with your order ID. We'll guide you through the process." },
      { q: "When will I receive my refund?", a: "Once your return is received and inspected, refunds are processed within 5–7 business days to your original payment method." },
      { q: "Can I exchange for a different size?", a: "Yes! Free exchanges are available on any item within 30 days. Just contact us and we'll arrange it." },
    ],
  },
  {
    category: "Products & Sizing",
    items: [
      { q: "Are all products authentic?", a: "100%. Every product on Fashion Store is genuine and carefully vetted before being listed. We work directly with trusted manufacturers and designers." },
      { q: "How do I find my size?", a: "Visit our Size Guide page for detailed measurements. If you're between sizes, we recommend sizing up, especially for fitted styles." },
      { q: "Do you restock sold-out items?", a: "We restock popular items regularly. Sign up for our newsletter to be notified first when items are back in stock." },
    ],
  },
  {
    category: "Account & Coupons",
    items: [
      { q: "How do I use a coupon code?", a: "Enter your code in the 'Coupon Code' field on the Cart page and click Apply. The discount will reflect in your order total instantly." },
      { q: "Where can I see my active coupons?", a: "Visit your Profile page and click the 'Coupons' tab to see all available and used coupons." },
      { q: "Can I use multiple coupons on one order?", a: "Only one coupon code can be applied per order at this time." },
    ],
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      <div className="info-page-hero">
        <p className="section-label mb-3">Help Centre</p>
        <h1 className="text-white" style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
          Frequently Asked Questions
        </h1>
        <p className="text-white/60 mt-4 text-sm">Can&apos;t find your answer? <Link href="/contact" style={{ color: "var(--brand)" }} className="underline">Contact us</Link></p>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {faqs.map((section) => (
          <section key={section.category}>
            <h2 className="mb-4" style={{ fontFamily: "var(--font-editorial)", fontSize: "1.4rem", color: "var(--navy)" }}>
              {section.category}
            </h2>
            <div className="border rounded-2xl overflow-hidden" style={{ borderColor: "var(--cream-dark)" }}>
              {section.items.map((item, i) => {
                const key = `${section.category}-${i}`;
                const isOpen = !!open[key];
                return (
                  <div key={key} className="accordion-item">
                    <button
                      className="accordion-trigger px-5"
                      onClick={() => toggle(key)}
                      aria-expanded={isOpen}
                    >
                      {item.q}
                      <ChevronDown
                        size={16}
                        className="flex-shrink-0 transition-transform duration-200"
                        style={{ transform: isOpen ? "rotate(180deg)" : "none", color: "var(--brand)" }}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed animate-fade-in">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <div className="text-center p-8 rounded-2xl" style={{ background: "var(--cream)" }}>
          <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.3rem", color: "var(--navy)" }} className="mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-gray-600 mb-4">Our support team is happy to help.</p>
          <Link href="/contact" className="btn-brand inline-flex">Get in Touch</Link>
        </div>
      </div>
    </div>
  );
}
