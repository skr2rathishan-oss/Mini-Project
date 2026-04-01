# CS3404: GUI Programming Mini-Project
## Architectural Report: SHOPNET SPA

### 1. Introduction
This report outlines the technical design, architectural patterns, and structural decisions implemented within the SHOPNET e-commerce Single Page Application, built entirely using **Vue 3, TypeScript, and Tailwind CSS**. 

### 2. Front-End Architecture (Strictly Typed)
The objective of this project was to establish a fully strict front-end environment ensuring that all data interacting with our components adheres flawlessly to predefined schemas. 

To achieve this, the codebase explicitly prohibits the use of the `any` keyword.
- **Interfaces (`src/types/product.ts`, `src/types/cart.ts`)**: We explicitly map the payloads originating from the DummyJSON API. Properties such as `ProductReview`, `colors`, and `subCategory` are stringently defined to ensure IDE intellisense propagates flawlessly into Vue templates.

### 3. State Management (Pinia & Composables)
Instead of tightly coupling API logic and tracking variables locally inside heavy component files, the project strictly segregates its responsibilities:
- **Global Store (`src/stores/cartStore.ts`)**: The Cart ecosystem is completely abstracted into a Pinia Store. The components dispatch logic triggers (e.g. `cart.add(product)`), and the Pinia logic silently recalculates `subtotal`, `selectedItems`, and auto-persists to `localStorage` transparently.
- **Vue Composables (`src/composables/useProductDetail.ts`)**: Redundant catalog retrieval operations that previously appeared multiple times were modularized into a custom Composition API hook. This empowers both Desktop (`ProductDetail.vue`) and Mobile (`MobileProductDetail.vue`) layouts to tap into the exact same fetching functionality dynamically.

### 4. Performance & O(N) Array Optimization 
A critical bottleneck of dynamic computed variables was successfully refactored inside the `Shop.vue` component.
- **The Issue**: Array iterators attempting to deduce unique categories by invoking `new Set(products.map(...))` mapped directly inside of live computed watchers were triggering exponential, repetitive scaling loops.
- **The Solution**: Static metadata calculation logic was extracted directly into the main `loadProducts()` cycle. The categories and brand arrays are now precisely computed **once** inside the primary async load routine (`O(N)` algorithm limit).

### 5. API Consumption Pattern
We established a discrete controller file at `src/services/api.ts` dedicated purely to negotiating the network asynchronous transactions with `DummyJSON.com`. This handles endpoint generation, query parameter configurations, and payload unboxing cleanly before dispatching typed JSON entities back up to the frontend UI stores.
