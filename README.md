# VŌGE E-Commerce Storefront

This is a modern fashion e-commerce storefront built for the Oxivos Frontend Developer project task. It is a frontend-only application that uses local JSON dummy data to demonstrate layout, state management, and component architecture without requiring a backend.

## Overview

The project implements a complete shopping flow from product discovery to cart management. It satisfies all core and bonus requirements of the assessment, including responsive grids, dynamic routing, state management, and a custom theme system.

### Key Features
- **Home Page:** Hero banner with a responsive grid of featured products.
- **Product Listing:** Full catalog with dynamic category filtering.
- **Product Details:** Dedicated dynamic routes for individual items with size/color selectors and an "Add to Cart" action.
- **Cart System:** Global state management for cart items, quantities, and total price calculations.
- **Dark/Light Mode:** Custom CSS variable architecture that seamlessly toggles the UI theme.
- **Wishlist:** Ability to save products for later using global state.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4 + Vanilla CSS Variables
- **Icons:** Lucide React
- **Data:** Local dummy data (no backend or database required)

## Getting Started

### Prerequisites
Node.js (v18 or higher) must be installed.

### 1. Clone & Install
Clone the repository and install the required dependencies:
```bash
git clone https://github.com/your-username/voge-fashion-store.git
cd voge-fashion-store
npm install
```

### 2. Run the Development Server
Start the local development server:
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
To create an optimized production build:
```bash
npm run build
npm run start
```

## Project Structure

```text
src/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── cart/             # Cart Page
│   ├── products/         # Product Listing & Dynamic Routes
│   ├── wishlist/         # Wishlist Page
│   └── globals.css       # Core CSS Variables & Theme Logic
├── components/           # Reusable UI Components (Navbar, Footer, Cards)
├── context/              # React Context Providers (Theme, Cart, Wishlist)
└── data/                 # Local Dummy Data (products.ts)
```

## Development Notes

- **State Management:** React Context is used to handle global state (Cart, Wishlist, Theme) to keep the architecture clean without introducing heavy third-party state libraries.
- **Styling Approach:** Tailwind CSS is used for utility-class styling, supplemented by custom CSS variables in `globals.css` to handle the dynamic dark mode overriding. 
- **Routing:** Built using Next.js App Router for client-side navigation and optimal performance.

## License

This project is open source and available under the MIT License.
