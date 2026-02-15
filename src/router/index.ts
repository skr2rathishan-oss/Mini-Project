import { createRouter, createWebHistory } from "vue-router";

// Pages
import Home from "../pages/Home.vue";
import Shop from "../pages/Shop.vue";
import ProductDetail from "../pages/ProductDetail.vue";
import MobiledetailPage from "../pages/MobiledetailPage.vue";

// Auth & profile pages
const AuthPage = () => import("../pages/AuthPage.vue");


// Cart (drawer body can stay as component)
import Cart from "../pages/Cart.vue";

import CheckoutPage from "../pages/CheckoutPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },

    { path: "/shop", name: "shop", component: Shop },

    { path: "/product/:id", name: "productDetail", component: ProductDetail },

    { path: "/mobile-product/:id", name: "mobileProductDetail", component: MobiledetailPage },

    { path: "/cart", name: "cart", component: Cart },

    { path: "/checkout", name: "checkout", component: CheckoutPage },

    // 🔐 Auth page (Sign in / Register / Forgot)
    { path: "/auth", name: "auth", component: AuthPage },

   
  ],
});


// 🛡 Route guard for protected pages


export default router;
