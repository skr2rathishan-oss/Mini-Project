import { defineStore } from "pinia";

type AuthView = "signin" | "register" | "forgot";

const STORAGE_KEY = "shopnet_auth_v1";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { isLoggedIn: false, user: null };
    return JSON.parse(raw) as { isLoggedIn: boolean; user: { name: string; email: string } | null };
  } catch {
    return { isLoggedIn: false, user: null };
  }
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    ...loadFromStorage(),
    view: "signin" as AuthView,
  }),

  actions: {
    setView(v: AuthView) {
      this.view = v;
    },

    signIn(email: string, password: string) {
      if (!email || !password) throw new Error("Email and password are required");
      if (password.length < 6) throw new Error("Password must be at least 6 characters");
      this.isLoggedIn = true;
      this.user = { name: "Customer", email };
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ isLoggedIn: true, user: this.user }));
    },

    signOut() {
      this.isLoggedIn = false;
      this.user = null;
      this.view = "signin";
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});
