"use client";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const shopLinks = [
  { label: "New Arrivals",  href: "/products" },
  { label: "Panjabi",       href: "/products?cat=Panjabi" },
  { label: "Outerwear",     href: "/products?cat=Outerwear" },
  { label: "T-Shirts",     href: "/products?cat=T-Shirts" },
  { label: "Trousers",     href: "/products?cat=Trousers" },
  { label: "Accessories",  href: "/products?cat=Accessories" },
  { label: "Footwear",     href: "/products?cat=Footwear" },
  { label: "Wishlist",     href: "/wishlist" },
];

const helpLinks = [
  { label: "Size Guide",         href: "/size-guide" },
  { label: "Shipping Policy",    href: "/shipping" },
  { label: "Returns & Exchanges",href: "/returns" },
  { label: "Contact Us",         href: "/contact" },
  { label: "FAQ",                href: "/faq" },
];

const companyLinks = [
  { label: "About Us",      href: "/about" },
  { label: "Careers",       href: "/careers" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "My Profile",    href: "/profile" },
  { label: "My Orders",     href: "/profile?tab=orders" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const toast = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success("You're subscribed! Welcome to Fashion Store 🎉");
  };

  return (
    <footer style={{ background: "var(--obsidian)", fontFamily: "var(--font-body)" }} className="text-white">

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" aria-label="VŌGE Home">
              <span className="text-3xl font-bold tracking-[0.1em]" style={{ fontFamily: "var(--font-editorial)", color: "#fff" }}>
                V<span style={{ color: "var(--brand)" }}>Ō</span>GE
              </span>
            </Link>

            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Curating contemporary essentials for the discerning wardrobe since 2020.
              Obsidian quality. Gold standard. Delivered to your door.
            </p>

            <ul className="space-y-2 text-sm text-white/50">
              <li className="flex items-center gap-2">
                <MapPin size={14} style={{ color: "var(--brand)", flexShrink: 0 }} />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} style={{ color: "var(--brand)", flexShrink: 0 }} />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} style={{ color: "var(--brand)", flexShrink: 0 }} />
                <span>hello@voge.com</span>
              </li>
            </ul>

            <div className="flex items-center gap-3 pt-1">
              {[
                { icon: <InstagramIcon />, label: "Instagram" },
                { icon: <FacebookIcon />,  label: "Facebook"  },
                { icon: <TwitterIcon />,   label: "Twitter"   },
                { icon: <YoutubeIcon />,   label: "YouTube"   },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--brand)";
                    (e.currentTarget as HTMLElement).style.color = "var(--brand)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                    (e.currentTarget as HTMLElement).style.color = "";
                  }}
                  onClick={() => toast.info(`Follow us on ${s.label}! (Coming soon)`)}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "var(--brand)" }}>Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "var(--brand)" }}>Help</h4>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Newsletter */}
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "var(--brand)" }}>Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--brand)" }}>Newsletter</h4>
              <p className="text-xs text-white/50 mb-3">Get new arrivals & exclusive offers.</p>
              {subscribed ? (
                <p className="text-xs font-semibold" style={{ color: "var(--brand)" }}>
                  ✓ You&apos;re subscribed!
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-3 py-2.5 rounded text-sm text-white bg-white/10 border border-white/20 placeholder:text-white/40 focus:outline-none transition-colors"
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--brand)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                  />
                  <button type="submit" className="btn-brand w-full py-2.5 text-xs">
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} VŌGE. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white/70 transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-2 text-white/30 text-xs">
            {["Visa", "MasterCard", "bKash", "Nagad"].map((p) => (
              <span key={p} className="border border-white/20 rounded px-2 py-0.5">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
