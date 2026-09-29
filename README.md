# ⚜️ TrendVibe Threads — Haute Elegance Atelier

A world-class, bespoke luxury fashion and streetwear e-commerce platform built with React, TypeScript, Tailwind CSS, Radix UI (shadcn), Framer Motion, and TanStack Query.

---

## ✨ Features & Upgrades

### 🛍️ Client & Customer Experience
- **Editorial Homepage**: Luxury hero section with trust badges, curated collections (Men's Atelier, Women's Maison, Children's Wardrobe), and bestsellers showcase.
- **Dedicated Product Detail Page (`/product/:id`)**:
  - High-resolution multi-image gallery with hover zoom and thumbnail switcher.
  - Interactive color swatch selector and size picker (XS to XXL).
  - Built-in **Sizing & Fit Guide Modal** with inch/cm body measurements.
  - Stock scarcity indicators ("Only X remaining in atelier stock").
  - Verified customer reviews with average star breakdown and interactive review submission.
  - "Complete The Look" companion piece recommendations.
- **Slideover Mini-Cart Drawer**:
  - Auto-slides in upon adding any garment.
  - Dynamic **Free Shipping Progress Bar** (*"Add ₹X more to unlock Free Express Shipping"*).
  - Promotional coupon code engine (Supports `VIBE10`, `ELEGANCE20`, `FREESHIP`).
- **Dynamic Category Browsing**:
  - Men's Atelier (`/men`), Women's Maison (`/women`), Children (`/children`), New Arrivals (`/new-arrivals`), and Privilege Sale (`/sale`).
  - Interactive **Filter & Sort Bar**: Subcategory tags, Price Range filters (Under ₹5,000, ₹5,000 - ₹15,000, ₹15,000+), and Sorting (Price Low-to-High, High-to-Low, Top Rated, Newest).
- **Connected Checkout & Order Placement (`/checkout`)**:
  - Real dynamic bag items and quantities.
  - Delivery speed selector (Standard Express vs VIP Atelier Concierge Dispatch).
  - Multi-payment gateway simulation: Instant UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery.
- **Order Tracking & Wardrobe History (`/orders`, `/payment?orderId=...`)**:
  - Live 4-stage Fulfillment Timeline (*Order Placed ➔ Atelier Quality Verification ➔ Handcrafted Packaging & Dispatch ➔ Out for Delivery*).
  - Complete digital receipt with customer address, payment method, and itemized invoice.
- **Predictive Search Dialog**: Instant modal search with real-time category filtering.

---

### 👑 Maison Admin Command Center (`/admin`)
- **Key Performance Indicators**: Real-time Gross Revenue (₹), Total Customer Orders, Active Garments, and Low Stock Alerts.
- **Visual Analytics**: Interactive Recharts bar charts showing department inventory valuation and stock levels.
- **Complete Product CRUD**:
  - Add new garments with image previews, tags, departments, and price points.
  - In-place Edit product modal with instant updates across the boutique.
  - One-click Stock adjustment (+ / -) for rapid restocking.
  - Delete product with confirmation alerts.
  - One-click "Reset Defaults" option.
- **Order Fulfillment Pipeline**:
  - Live customer orders list with customer names, delivery cities, and totals.
  - Real-time Status Changer (*Pending ➔ Processing ➔ Shipped ➔ Delivered*).

---

## 🔐 Admin Authentication Credentials

To access the Admin Command Center:
- **URL**: [`/login`](http://localhost:3000/login) or [`/admin`](http://localhost:3000/admin)
- **Email**: `admin@vibe-threads.com` (or default `admin@example.com`)
- **Password**: `admin123`

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **UI Components**: Radix UI Primitives, Lucide React Icons, Recharts
- **State & Storage**: React Context + Persistent Local/Reactive Store + REST API Adapter
- **Backend (Optional Full-Stack)**: Express 5, MongoDB & Mongoose

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Production Build**:
   ```bash
   npm run build
   ```

---

## 📁 Project Architecture

```
├── src/
│   ├── components/       # Luxury UI components
│   │   ├── ui/           # Radix UI primitives & shadcn components
│   │   ├── AdminDashboard.tsx # Command Center with Analytics & CRUD
│   │   ├── CartDrawer.tsx     # Slideover Mini-Cart with Free Shipping Meter
│   │   ├── FilterBar.tsx      # Dynamic Category & Price Filter Bar
│   │   ├── Header.tsx         # Sticky navigation with drawers & badges
│   │   ├── ProductCard.tsx    # Luxury card with hover zoom, quick view & add
│   │   ├── QuickViewModal.tsx # Fast product preview modal
│   │   └── SizeGuideModal.tsx # Size and fit guide table
│   ├── contexts/         # CartContext & AuthContext
│   ├── data/             # Rich products catalog & mock seed data
│   ├── pages/            # App pages (Index, ProductDetail, Cart, Checkout, Payment, Orders, Admin, Men, Women, Children, Sale)
│   └── services/         # Persistent reactive services (productService, orderService)
├── backend/              # Express API server, models & controllers
```
