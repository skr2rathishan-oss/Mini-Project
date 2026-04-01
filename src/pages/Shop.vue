<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { fetchProducts, searchProducts } from "../services/api";
import type { Product } from "../types/product";
import { useCartStore } from "../stores/cartStore";
import { getProductDetailView } from "../utils/deviceDetect";

import ShopSidebar from "../components/Shop/ShopSidebar.vue";
import PremiumProductGrid from "../components/Shop/PremiumProductGrid.vue";
import ShopFilter from "../components/MobileDesign/ShopFilter.vue";

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

// Static categories and brands populated after fetch
const categoriesList = ref<string[]>(['all']);
const brandsList = ref<string[]>(['all']);

async function loadProducts() {
  loading.value = true;
  products.value = [];

  try {
    const rawQ = route.query.q;
    const q = Array.isArray(rawQ) ? String(rawQ[0]) : (rawQ ?? '');
    
    const rawCat = route.query.category;
    const categoryParam = Array.isArray(rawCat) ? String(rawCat[0]) : (rawCat ?? '');
    
    const rawBrand = route.query.brand;
    const brandParam = Array.isArray(rawBrand) ? String(rawBrand[0]) : (rawBrand ?? '');

    // If there's a search query, use search endpoint
    const res = q ? await searchProducts(q) : await fetchProducts(194);
    products.value = res.products;

    // Calculate static filters O(N) only once per load
    const catSet = new Set(res.products.map(p => p.category));
    categoriesList.value = ["all", ...Array.from(catSet)];

    const brandSet = new Set(res.products.map(p => p.brand).filter((b): b is string => Boolean(b)));
    brandsList.value = ["all", ...Array.from(brandSet)];

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

/* Expose lists to template */
const categories = computed(() => categoriesList.value);
const brands = computed(() => brandsList.value);

/* Filtering */
const filteredProducts = computed(() => {
  const parsedMin = parseFloat(minPrice.value);
  const min = !isNaN(parsedMin) ? parsedMin : null;
  
  const parsedMax = parseFloat(maxPrice.value);
  const max = !isNaN(parsedMax) ? parsedMax : null;

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
  router.push(getProductDetailView(product.id));
}

function onAddToCart(product: Product) {
  cart.add(product);
}
</script>

<template>
  <div class="min-h-screen bg-white mt-0">
    <main class="max-w-[1440px] mx-auto px-3 lg:px-6 pb-2 pt-0 mt-0">
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-16 pt-0 mt-0 lg:pt-8">
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
          <!-- Mobile Filter Button -->
          <div class="mb-2">
            <ShopFilter
              :categories="categories"
              :brands="brands"
              :selectedCategory="selectedCategory"
              :selectedBrand="selectedBrand"
              :minPrice="minPrice"
              :maxPrice="maxPrice"
              :resultCount="filteredProducts.length"
              @update:selectedCategory="(v) => (selectedCategory = v)"
              @update:selectedBrand="(v) => (selectedBrand = v)"
              @update:minPrice="(v) => (minPrice = v)"
              @update:maxPrice="(v) => (maxPrice = v)"
              @clear="clearFilters"
            />
          </div>

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
