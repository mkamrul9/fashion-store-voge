"use client";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

// Inline social SVGs (not available in this version of lucide-react)
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
  { label: "New Arrivals", href: "/products" },
  { label: "Panjabi", href: "/products" },
  { label: "Outerwear", href: "/products" },
  { label: "T-Shirts", href: "/products" },
  { label: "Trousers", href: "/products" },
  { label: "Accessories", href: "/products" },
  { label: "Footwear", href: "/products" },
];

const helpLinks = [
  { label: "Size Guide", href: "#" },
  { label: "Shipping Policy", href: "#" },
  { label: "Returns & Exchanges", href: "#" },
  { label: "Track My Order", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "FAQ", href: "#" },
];

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
  { label: "Sustainability", href: "#" },
  { label: "Store Locator", href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--charcoal)", fontFamily: "var(--font-body)" }}
      className="text-white"
    >
      {/* Main Footer Body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" aria-label="Fashion Store Home">
              <span
                style={{ fontFamily: "var(--font-editorial)", color: "var(--gold)" }}
                className="text-3xl font-semibold tracking-wide"
              >
                FASHION
                <span className="font-light text-white/70"> STORE</span>
              </span>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Curating contemporary essentials for the modern wardrobe since 2020.
              Premium quality, timeless design, delivered to your door.
            </p>

            {/* Contact Info */}
            <ul className="space-y-2 text-sm text-white/50">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-gold flex-shrink-0" style={{ color: "var(--gold)" }} />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="flex-shrink-0" style={{ color: "var(--gold)" }} />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0" style={{ color: "var(--gold)" }} />
                <span>hello@fashionstore.com</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              {[
              { icon: <InstagramIcon />, label: "Instagram", href: "#" },
              { icon: <FacebookIcon />, label: "Facebook", href: "#" },
              { icon: <TwitterIcon />, label: "Twitter", href: "#" },
              { icon: <YoutubeIcon />, label: "YouTube", href: "#" },
            ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60
                    hover:border-gold hover:text-gold transition-all duration-200"
                  style={{ "--gold": "var(--gold)" } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                    (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                    (e.currentTarget as HTMLElement).style.color = "";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "var(--gold)" }}
            >
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "var(--gold)" }}
            >
              Help
            </h4>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Newsletter */}
          <div className="space-y-8">
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "var(--gold)" }}
              >
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "var(--gold)" }}
              >
                Newsletter
              </h4>
              <p className="text-xs text-white/50 mb-3">
                Get new arrivals & exclusive offers.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-2"
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2.5 rounded text-sm text-white bg-white/10 border border-white/20
                    placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all duration-200"
                  style={{
                    background: "var(--gold)",
                    color: "var(--charcoal)",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "var(--gold-dark)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "var(--gold)")
                  }
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Fashion Store. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/70 transition-colors">Cookie Settings</a>
          </div>
          {/* Payment badges */}
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <span className="border border-white/20 rounded px-2 py-0.5">Visa</span>
            <span className="border border-white/20 rounded px-2 py-0.5">MasterCard</span>
            <span className="border border-white/20 rounded px-2 py-0.5">bKash</span>
            <span className="border border-white/20 rounded px-2 py-0.5">Nagad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
