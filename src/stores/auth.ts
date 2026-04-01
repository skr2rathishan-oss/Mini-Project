import { defineStore } from "pinia";

type AuthView = "signin" | "register" | "forgot";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: null as null | { name: string; email: string },
    view: "signin" as AuthView,
  }),

  actions: {
    setView(v: AuthView) {
      this.view = v;
    },

    signIn(email: string, password: string) {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      this.isLoggedIn = true;
      this.user = { name: "Customer", email };
    },

    signOut() {
      this.isLoggedIn = false;
      this.user = null;
      this.view = "signin";
    },
  },
});
