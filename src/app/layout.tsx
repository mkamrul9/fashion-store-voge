import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "VŌGE — Luxury Fashion Store",
  description:
    "Discover curated contemporary fashion at VŌGE. Premium quality clothing, accessories, and footwear designed for the discerning wardrobe.",
  keywords: ["fashion", "clothing", "luxury apparel", "premium fashion", "Bangladesh fashion"],
  openGraph: {
    title: "VŌGE — Luxury Fashion Store",
    description: "Curated contemporary fashion for the discerning wardrobe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Prevent FOUC: apply theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('fs_theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <ThemeProvider>
          <ToastProvider>
            <ProfileProvider>
              <CartProvider>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </CartProvider>
            </ProfileProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
