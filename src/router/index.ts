import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Cart from '../pages/cart.vue'
import ProductDetail from '../pages/ProductDetail.vue'


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', name: 'home', component: Home },
		{ path: '/cart', name: 'cart', component: Cart },
		{ path: '/product/:id', name: 'productDetail', component: ProductDetail }
	]
})

export default router



