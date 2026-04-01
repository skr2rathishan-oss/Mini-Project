import { defineStore } from "pinia";

export interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  price: string;
  image: string;
  bgColor: string;
  productId: number;
}

type ThemeMode = "light" | "dark";

export const useUiStore = defineStore("ui", {
  state: () => ({
    // Cart
    isCartOpen: false,

    // Profile dropdown
    isProfileMenuOpen: false,

    // Theme
    theme: "light" as ThemeMode,
  }),

  actions: {
    /* ---------------- Cart ---------------- */
    openCart() {
      this.isCartOpen = true;
    },
    closeCart() {
      this.isCartOpen = false;
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },

    /* ---------------- Profile Menu ---------------- */
    openProfileMenu() {
      this.isProfileMenuOpen = true;
    },
    closeProfileMenu() {
      this.isProfileMenuOpen = false;
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },

    /* ---------------- Theme ---------------- */
    initTheme() {
      // Bust stale saved themes from earlier development sessions
      const THEME_VERSION = 'v2';
      const savedVersion = localStorage.getItem('theme_version');
      if (savedVersion !== THEME_VERSION) {
        // Clear old stale dark mode storage and reset to light
        localStorage.removeItem('theme');
        localStorage.setItem('theme_version', THEME_VERSION);
      }
      const saved = localStorage.getItem('theme') as ThemeMode | null;
      this.setTheme(saved ?? 'light');
    },

    setTheme(mode: ThemeMode) {
      this.theme = mode;
      localStorage.setItem("theme", mode);

      // Apply theme to <html>
      document.documentElement.classList.toggle("dark", mode === "dark");
    },

    toggleTheme() {
      const next: ThemeMode = this.theme === "light" ? "dark" : "light";
      this.setTheme(next);
    },
  },
});
