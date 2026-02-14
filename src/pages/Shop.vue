<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { fetchProducts, searchProducts } from "../services/api";
import type { Product } from "../types/product";
import { useCartStore } from "../stores/cartStore";

import ShopSidebar from "../components/Shop/ShopSidebar.vue";
import PremiumProductGrid from "../components/Shop/PremiumProductGrid.vue";

const router = useRouter();
const route = useRoute();
const cart = useCartStore();

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref("");

/* Filters */
const selectedCategory = ref<string>("all");
const selectedBrand = ref<string>("all");
const minPrice = ref<string>("");
const maxPrice = ref<string>("");

/* Scroll to products */
const productsSectionRef = ref<HTMLElement | null>(null);
// Dummy use to avoid unused warning
void productsSectionRef;

async function loadProducts() {
  loading.value = true;
  error.value = "";

  try {
    const q = (route.query.q as string | undefined) ?? '';
    const categoryParam = (route.query.category as string | undefined) ?? '';
    const brandParam = (route.query.brand as string | undefined) ?? '';

    // If there's a search query, use search endpoint
    const res = q ? await searchProducts(q) : await fetchProducts(194);
    products.value = res.products;

    // Set filters from URL parameters
    if (categoryParam && categoryParam !== 'all') {
      selectedCategory.value = categoryParam;
    }
    if (brandParam && brandParam !== 'all') {
      selectedBrand.value = brandParam;
    }

  } catch {
    error.value = "Failed to load products.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadProducts);

// Watch for route changes (search, category, brand parameters)
watch(() => route.query, () => {
  loadProducts();
}, { deep: true });

/* Categories from products */
const categories = computed(() => {
  const set = new Set(products.value.map((p) => p.category));
  return ["all", ...Array.from(set)];
});

/* Brands */
const brands = computed(() => {
  const set = new Set(products.value.map((p) => p.brand).filter((b): b is string => Boolean(b)));
  return ["all", ...Array.from(set)];
});

/* Brands (removed) */

/* Filtering */
const filteredProducts = computed(() => {
  const min = minPrice.value ? Number(minPrice.value) : null;
  const max = maxPrice.value ? Number(maxPrice.value) : null;

  return products.value.filter((p) => {
    if (selectedCategory.value !== "all" && p.category !== selectedCategory.value) return false;
    if (selectedBrand.value !== "all" && p.brand !== selectedBrand.value) return false;
    if (min !== null && p.price < min) return false;
    if (max !== null && p.price > max) return false;
    return true;
  });
});

function clearFilters() {
  selectedCategory.value = "all";
  selectedBrand.value = "all";
  minPrice.value = "";
  maxPrice.value = "";
}

function onProductClick(product: Product) {
  router.push(`/product/${product.id}`);
}

function onAddToCart(product: Product) {
  cart.add(product);
}
</script>

<template>
  <div class="min-h-screen bg-white mt-0">
    <main class="max-w-[1440px] mx-auto px-6 pb-12 pt-0 mt-0">
      <div class="flex flex-col lg:flex-row gap-16 pt-8">
        <!-- Fixed Sidebar (desktop) -->
        <div class="hidden lg:block fixed top-20 left-6 w-72 h-fit z-40 mt-4">
          <ShopSidebar
            :resultCount="filteredProducts.length"
            :categories="categories"
            :brands="brands"
            :selectedCategory="selectedCategory"
            :selectedBrand="selectedBrand"
            :minPrice="minPrice"
            :maxPrice="maxPrice"
            @update:selectedCategory="(v) => (selectedCategory = v)"
            @update:selectedBrand="(v) => (selectedBrand = v)"
            @update:minPrice="(v) => (minPrice = v)"
            @update:maxPrice="(v) => (maxPrice = v)"
            @clear="clearFilters"
          />
        </div>

        <!-- Vertical Separator Line -->
        <div class="hidden lg:block fixed left-[22rem] top-20 bottom-0 w-px bg-slate-200 z-30"></div>

        <!-- Main Content -->
        <div class="flex-1 min-w-0 lg:ml-80">

          <!-- Products (scroll target) -->
          <section ref="productsSectionRef" class="scroll-mt-24">
            <PremiumProductGrid
              :products="filteredProducts"
              @productClick="onProductClick"
              @addToCart="onAddToCart"
            />
          </section>
        </div>
      </div>
    </main>
  </div>
</template>
