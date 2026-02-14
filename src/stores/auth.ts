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

    signIn(email: string, _password: string) {
      // demo login (later connect backend) - password not used in demo
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
