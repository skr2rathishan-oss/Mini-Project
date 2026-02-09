<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'

const router = useRouter()
const cartCount = ref(0)

const onLogoClick = () => router.push('/')
const onCartClick = () => router.push('/cart')

const onSearch = (q: string) => alert('Searching: ' + q)

</script>

<template>
  <Navbar
    :cartCount="cartCount"
    @logoClick="onLogoClick"
    @cartClick="onCartClick"
    @search="onSearch"
  />

  <main class="min-h-screen">
    <router-view />
  </main>
</template>
