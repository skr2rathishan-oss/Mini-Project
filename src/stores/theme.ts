import { defineStore } from "pinia";

type Theme = "light" | "dark";
const KEY = "theme";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "light" as Theme, // ✅ default day mode
  }),

  actions: {
    initTheme() {
      const saved = (localStorage.getItem(KEY) as Theme | null) ?? "light";
      this.theme = saved;
      this.applyTheme();
    },

    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      localStorage.setItem(KEY, this.theme);
      this.applyTheme();
    },

    applyTheme() {
      document.documentElement.classList.toggle("dark", this.theme === "dark");
    },
  },
});
