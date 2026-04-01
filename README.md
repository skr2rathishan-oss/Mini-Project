<div align="center">
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" alt="Vue 3" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />

  <h1>🛒 SHOPNET - Premium E-Commerce SPA</h1>
  <p>A modern, strictly-typed, high-performance Single Page Application built for the CS3404 GUI Programming Mini-Project.</p>
</div>

---

## 🌟 Overview

**SHOPNET** is a responsive, elegantly designed e-commerce storefront powered by **Vue 3 (Composition API)** and **TypeScript**. It dynamically consumes the `DummyJSON.com` REST API to deliver a seamless shopping experience. 

Designed with a heavy emphasis on zero-tolerance type safety, optimal computational performance (O(N) efficiency), and modern aesthetic utility styling via **Tailwind CSS**.

---

## ✨ Key Features

- **🛍️ Dynamic Product Catalog**: Browse products dynamically fetched and mapped to strict TypeScript interfaces from an external REST API.
- **🔍 Advanced Filtering & Search**: O(N) optimized real-time product filtering (by Category, Brand, and Price) with instant search capabilities.
- **🛒 Comprehensive Cart State**: Global shopping cart state managed persistently via **Pinia**. Includes floating cart drawers, subtotal computations, and isolated explicit `CartItem` type dependencies.
- **💳 Checkout Flow**: Integrated mock checkout interface utilizing seamless Vue reactive object arrays without performance-blocking deep watchers.
- **📱 Fully Responsive Design**: Mobile-first architecture implemented entirely via Tailwind CSS utility classes.
- **🛡️ 100% Type-Safe**: Explicitly adheres to the **"No 'Any' Type"** project restriction. Every API payload, prop, and event emit is meticulously guarded by strictly mapped TypeScript Schemas.

---

## 🛠️ Technology Stack

| Technology       | Purpose               | Implementation Details                                      |
| ---------------- | --------------------- | ----------------------------------------------------------- |
| **Vue 3**        | Frontend Framework    | Highly optimized `<script setup>` SFCs & Custom Composables.|
| **TypeScript**   | Static Typing         | Absolute strictly-typed architecture (no `any` casts).      |
| **Vite**         | Build Tooling         | Lightning-fast HMR and optimized production bundling.       |
| **Pinia**        | State Management      | Reactive global stores (`cartStore.ts`, `checkout.ts`).     |
| **Tailwind CSS** | Styling               | Utility-first responsive design, flex/grid layouts.         |

---

## 📂 Project Architecture

```text
src/
├── components/       # Granular, reusable Vue UI components (Navbar, ShopFilter, PremiumProductGrid)
├── composables/      # Abstracted Vue 3 Logic Hooks (e.g., useProductDetail.ts)
├── constants/        # Centralized application constants (e.g., currency.ts)
├── pages/            # Page-level Routing Views (Home, Shop, ProductDetail, CheckoutPage)
├── services/         # Asynchronous API endpoints (api.ts interface with DummyJSON)
├── stores/           # Pinia State modules (cartStore, auth, checkout)
└── types/            # Strict TypeScript Interfaces (product.ts, cart.ts, ui.ts)
```

---

## 🚀 Getting Started

Follow these steps to safely run the application locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or newer strongly recommended)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/skr2rathishan-oss/Mini-Project.git
   cd Mini-Project
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   *The application will boot up at `http://localhost:5173/` or another available port.*

4. **Verify Type-Safety compliance:**
   ```bash
   npx vue-tsc -b
   ```
   *Expect an Exit Code of `0` confirming no variables bypass the strictly typed requirements.*

---

## 🎓Learning Outcomes Achieved

- **Strictly Typed Front-End Architecture**: Successfully enforced complex TS interfaces over external REST payloads avoiding `unknown` and `any` casting mappings.
- **Component State and Props Tracking**: Managed parent-to-child data flows via `defineProps` and securely emitted events up utilizing `defineEmits`.
- **Asynchronous API Consumption**: Parsed mock server environments utilizing robust `try/catch` wrappers around `fetch()`, gracefully handling loading states natively.
- **Version Control**: Modular updates cleanly separated and fully tracked through branch control logic.

---

<div align="center">
  <p>Made with ❤️ for the CS3404 GuiPrgrammming University of Ruhuna Faculty of Engineering Mini-Project</p>
</div>
