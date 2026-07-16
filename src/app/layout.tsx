import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fashion Store — Premium Modern Apparel",
  description:
    "Discover curated contemporary fashion essentials at Fashion Store. Premium quality clothing, accessories, and footwear designed for lasting impact.",
  keywords: ["fashion", "clothing", "premium apparel", "Bangladesh fashion store"],
  openGraph: {
    title: "Fashion Store — Premium Modern Apparel",
    description: "Curated contemporary fashion for the modern wardrobe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for Google Fonts (loaded via globals.css @import) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white antialiased">
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
