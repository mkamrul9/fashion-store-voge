"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const toast = useToast();
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent! We'll reply within 24 hours. 📩");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      <div className="info-page-hero">
        <p className="section-label mb-3">Get in Touch</p>
        <h1 className="text-white" style={{ fontFamily: "var(--font-editorial)", fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
          Contact Us
        </h1>
        <p className="text-white/60 mt-4 text-sm">We&apos;re here to help. Expect a reply within 24 hours.</p>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.6rem", color: "var(--navy)" }} className="mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                {[
                  { icon: <Mail size={18} />, title: "Email", value: "hello@fashionstore.com", sub: "We reply within 24 hours" },
                  { icon: <Phone size={18} />, title: "Phone", value: "+880 1700-000000", sub: "Sun–Thu, 10am–7pm" },
                  { icon: <MapPin size={18} />, title: "Address", value: "Gulshan, Dhaka 1212", sub: "Bangladesh" },
                  { icon: <Clock size={18} />, title: "Business Hours", value: "Sunday – Thursday", sub: "10:00 AM – 7:00 PM BST" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl border" style={{ borderColor: "var(--cream-dark)" }}>
                    <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--brand-light)", color: "var(--brand)" }}>
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--brand)" }}>{item.title}</p>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--navy)" }}>{item.value}</p>
                      <p className="text-xs text-gray-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border p-6 sm:p-8 shadow-sm" style={{ borderColor: "var(--cream-dark)" }}>
              <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.6rem", color: "var(--navy)" }} className="mb-6">
                Send Us a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--navy)" }}>
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" required className="input-elegant" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--navy)" }}>
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className="input-elegant" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--navy)" }}>Subject</label>
                <select name="subject" value={form.subject} onChange={handleChange} className="input-elegant bg-white">
                  <option value="">Select a topic</option>
                  <option value="order">Order Inquiry</option>
                  <option value="return">Return / Exchange</option>
                  <option value="product">Product Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--navy)" }}>
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="How can we help you?"
                  className="input-elegant resize-none"
                />
              </div>

              <button type="submit" disabled={sending} className="btn-brand w-full flex items-center justify-center gap-2 disabled:opacity-70">
                {sending ? "Sending…" : <><Send size={16} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
