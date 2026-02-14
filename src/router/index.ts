import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Cart from '../components/Cart/CartDrawerBody.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import Shop from '../pages/Shop.vue' 
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/cart', name: 'cart', component: Cart },
        { path: '/product/:id', name: 'productDetail', component: ProductDetail },
        { path: '/Shop', name: 'Shop', component: Shop}
    ]
})

export default router