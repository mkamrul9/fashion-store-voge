# VŌGE

A premium, modern e-commerce platform curated for the discerning wardrobe. Built with Next.js App Router, Tailwind CSS v4, and React, VŌGE delivers a cinematic, high-performance shopping experience characterized by modern aesthetics, glassmorphism, and flawless dark/light mode integration.

---

## ✦ Features

- **Cinematic UI/UX:** A bespoke design language utilizing a luxurious Obsidian, Champagne Gold, and Dusty Rose color palette.
- **Dynamic Theming:** Seamless, flicker-free transition between Light and Dark modes. Tailwind's native colors dynamically adapt via a custom CSS Variable architecture.
- **Responsive & Interactive:** Fully responsive across all devices with micro-animations, hover states, and frosted-glass navigation.
- **Comprehensive E-Commerce Routing:** 
  - **Product Catalog:** Filterable and sortable grids across categories (Panjabi, Outerwear, T-Shirts, etc.).
  - **Customer Portal:** Dedicated `/profile` for tracking orders, wishlist items, and personal details.
  - **Info Hub:** Detailed `/size-guide`, `/shipping`, `/returns`, and `/faq` pages.
- **State Management:** React Context-driven state for the Cart, Wishlist, User Profile, and Theme.
- **Optimized Performance:** Next.js Server Components mixed with targeted Client Components for high SEO and blazing-fast load times.

---

## ✦ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Library:** React 19
- **Styling:** Tailwind CSS v4 + Vanilla CSS Variables
- **Icons:** Lucide React
- **Typography:** Playfair Display (Editorial) & DM Sans (Body)

---

## ✦ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### 1. Clone & Install
Clone the repository and install the dependencies:
```bash
git clone https://github.com/your-username/voge-fashion-store.git
cd voge-fashion-store
npm install
```

### 2. Run the Development Server
Start the Next.js development server using Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 3. Build for Production
To create an optimized production build:
```bash
npm run build
npm run start
```

---

## ✦ Project Structure

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts, Globals)
│   ├── about/            # Story & Company Pages
│   ├── products/         # Main Catalog & Dynamic Product Routes
│   ├── profile/          # User Dashboard
│   └── globals.css       # Core Design Tokens & Theme Logic
├── components/           # Reusable UI Components
│   ├── Navbar.tsx        # Global Glassmorphism Header
│   ├── Footer.tsx        # Comprehensive Site Footer
│   ├── ProductCard.tsx   # Catalog Item Component
│   └── ...
├── context/              # Global State (Theme, Profile, Cart, Toast)
└── data/                 # Mock Database (Products, Testimonials, FAQs)
```

---

## ✦ Contributing

We welcome contributions to make VŌGE even better. 

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/your-feature-name`
3. **Commit your changes:** `git commit -m 'feat: add some amazing feature'`
4. **Push to the branch:** `git push origin feature/your-feature-name`
5. **Open a Pull Request**

### Code Style Guidelines
- **CSS Architecture:** Avoid hardcoding colors like `bg-gray-500` or `#fff` into components unless explicitly necessary. Always rely on the CSS variables defined in `globals.css` (e.g., `var(--text-primary)`, `var(--bg-card)`) to ensure perfect compatibility with Dark Mode.
- **Component Structure:** Keep Server Components by default; only use `"use client"` when interactivity or React hooks are required.

---

## ✦ License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Crafted with precision. Worn everywhere.*
