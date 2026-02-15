<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

type TabId = "home" | "order" | "message" | "cart" | "profile";

type Tab = {
  id: TabId;
  label: string;
  iconClass: string; // FontAwesome icon class
  path: string;      // route to navigate
};

const route = useRoute();
const router = useRouter();

const tabs: Tab[] = [
  { id: "home", iconClass: "fa-house", label: "Home", path: "/" },
  { id: "order", iconClass: "fa-box", label: "Order", path: "/orders" },
  { id: "message", iconClass: "fa-message", label: "Massage", path: "/messages" }, // keep typo as you had
  { id: "cart", iconClass: "fa-basket-shopping", label: "Cart", path: "/cart" },
  { id: "profile", iconClass: "fa-user", label: "Profile", path: "/profile" },
];

// Active tab based on current route (more professional than local state)
const activeTab = computed<TabId>(() => {
  const t = tabs.find((x) => route.path === x.path);
  return (t?.id ?? "home") as TabId;
});

function go(tab: Tab) {
  router.push(tab.path);
}
</script>

<template>
  <!-- Mobile only -->
  <nav
    class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 rounded-t-[32px] px-6 py-4 flex justify-between items-center z-[100]
           shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]"
  >
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      @click="go(tab)"
      class="flex flex-col items-center gap-1 group relative min-w-[50px]"
    >
      <!-- Active indicator -->
      <span
        v-if="activeTab === tab.id"
        class="absolute -top-4 w-10 h-1 bg-blue-600 rounded-full"
      />

      <!-- Icon -->
      <i
        class="fa-solid w-6 h-6 text-[22px] transition-all duration-300"
        :class="[
          tab.iconClass,
          activeTab === tab.id
            ? 'text-blue-600 scale-110'
            : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-200',
        ]"
        aria-hidden="true"
      ></i>

      <!-- Label -->
      <span
        class="text-[10px] font-bold transition-colors"
        :class="activeTab === tab.id
          ? 'text-blue-600'
          : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-200'"
      >
        {{ tab.label }}
      </span>
    </button>
  </nav>
</template>
