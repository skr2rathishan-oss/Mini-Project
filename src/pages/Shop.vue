<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { fetchProducts } from "../services/api";
import type { Product } from "../types/product";
import ProductGrid from "../components/ProductGrid.vue";

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref("");

/* ---------------- Filters ---------------- */
const selectedCategory = ref<string>("all");
const selectedBrand = ref<string>("all");
const minPrice = ref<string>("");
const maxPrice = ref<string>("");

/* ---------------- Load products ---------------- */
async function loadProducts() {
  loading.value = true;
  error.value = "";

  try {
    const res = await fetchProducts(194);
    products.value = res.products; // ✅ important
  } catch {
    error.value = "Failed to load products.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadProducts);

/* ---------------- Derived categories from products ---------------- */
const categories = computed(() => {
  const set = new Set(products.value.map((p) => p.category));
  return ["all", ...Array.from(set)];
});

/* ---------------- Brands (department) ---------------- */
const brands = computed(() => {
  const set = new Set(products.value.map((p) => p.brand).filter(Boolean));
  return ["all", ...Array.from(set)];
});

/* ---------------- Category thumbnail from product JSON ---------------- */
const categoryThumb = (cat: string) => {
  const first =
    cat === "all"
      ? products.value[0]
      : products.value.find((p) => p.category === cat);

  return first?.thumbnail || first?.images?.[0] || "";
};

/* ---------------- Filtering logic ---------------- */
const filteredProducts = computed(() => {
  const min = minPrice.value ? Number(minPrice.value) : null;
  const max = maxPrice.value ? Number(maxPrice.value) : null;

  return products.value.filter((p) => {
    if (selectedCategory.value !== "all" && p.category !== selectedCategory.value)
      return false;

    if (selectedBrand.value !== "all" && p.brand !== selectedBrand.value)
      return false;

    if (min !== null && p.price < min) return false;
    if (max !== null && p.price > max) return false;

    return true;
  });
});

/* ---------------- Clear filters ---------------- */
function clearFilters() {
  selectedCategory.value = "all";
  selectedBrand.value = "all";
  minPrice.value = "";
  maxPrice.value = "";
}

function onProductClick(product: Product) {
  console.log("Clicked:", product);
  // later → router.push(`/product/${product.id}`)
}
</script>

<template>
  <div class="container mx-auto px-4 py-10">
    <!-- Header -->
    <div class="flex items-end justify-between mb-8">
      <div>
        <h1 class="text-3xl font-black text-gray-800">
          Shop <span class="text-teal-600">Products</span>
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Filter by category, department, and price.
        </p>
      </div>

      <button
        class="text-sm font-bold text-gray-600 hover:text-teal-700 underline"
        @click="clearFilters"
      >
        Clear filters
      </button>
    </div>

    <!-- Loading / Error -->
    <div v-if="loading" class="text-gray-500">Loading products...</div>
    <div v-else-if="error" class="text-rose-600">{{ error }}</div>

    <template v-else>
      <!-- 🟦 Category Tiles -->
      <div class="mb-10">
        <h2 class="text-xs font-black text-gray-500 uppercase mb-4">
          Categories
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="group rounded-2xl overflow-hidden border transition"
            :class="selectedCategory === cat
              ? 'border-teal-500 ring-2 ring-teal-500/20'
              : 'border-gray-200 hover:border-teal-200'"
          >
            <div class="aspect-4/3 bg-gray-100">
              <img
                :src="categoryThumb(cat)"
                :alt="cat"
                class="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            <div class="p-3 bg-white text-left">
              <p class="text-sm font-extrabold text-gray-800 capitalize">
                {{ cat }}
              </p>
              <p class="text-xs text-gray-500">
                {{
                  cat === "all"
                    ? products.length
                    : products.filter(p => p.category === cat).length
                }}
                items
              </p>
            </div>
          </button>
        </div>
      </div>

      <!-- 🟨 Filters -->
      <div class="bg-white border rounded-2xl p-5 mb-8 grid md:grid-cols-4 gap-4">
        <!-- Brand -->
        <select v-model="selectedBrand" class="border rounded-xl p-3">
          <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
        </select>

        <!-- Min price -->
        <input v-model="minPrice" type="number" placeholder="Min price" class="border rounded-xl p-3" />

        <!-- Max price -->
        <input v-model="maxPrice" type="number" placeholder="Max price" class="border rounded-xl p-3" />

        <!-- Result count -->
        <div class="bg-teal-50 border rounded-xl flex items-center justify-center font-bold">
          {{ filteredProducts.length }} results
        </div>
      </div>

      <!-- 🟩 Product Grid -->
      <ProductGrid :products="filteredProducts" @productClick="onProductClick" />
    </template>
  </div>
</template>
