import { defineStore } from "pinia";
import type { AuthUser } from "../types/auth";

type AuthView = "signin" | "register" | "forgot";

const STORAGE_KEY = "dummyjson_auth_v1";

interface AuthState {
  isLoggedIn: boolean;
  user: AuthUser | null;
  token: string | null;
  view: AuthView;
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { isLoggedIn: false, user: null, token: null };
    
    const parsed = JSON.parse(raw);
    if (parsed && parsed.token) {
        return { isLoggedIn: true, user: parsed.user as AuthUser, token: parsed.token as string };
    }
    return { isLoggedIn: false, user: null, token: null };
  } catch {
    return { isLoggedIn: false, user: null, token: null };
  }
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    ...loadFromStorage(),
    view: "signin" as AuthView,
  }),

  actions: {
    setView(v: AuthView) {
      this.view = v;
    },

    async signIn(username: string, password: string) {
      if (!username || !password) throw new Error("Username and password are required");
      
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to sign in. Check your credentials.");
      }

      const userData: AuthUser = await response.json();
      
      this.isLoggedIn = true;
      this.user = userData;
      this.token = userData.accessToken;

      localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
        token: this.token, 
        user: this.user 
      }));
    },

    signOut() {
      this.isLoggedIn = false;
      this.user = null;
      this.token = null;
      this.view = "signin";
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});
