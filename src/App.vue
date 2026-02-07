<script setup lang="ts">
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'

const isOpen = ref(false)

const selectedCurrency = ref('LKR')

const toggleCurrency = () => {
  isOpen.value = !isOpen.value
}

const selectCurrency = (cur: string) => {
  selectedCurrency.value = cur
  isOpen.value = false
}

const cartCount = ref(3)
const categories = ref([])
const selectedCategory = ref('')
const isLoggedIn = ref(false)
const userProfile = ref({ name: '', email: '' })

const handleSearch = (q: string) => {
  window.alert('Searching for: ' + q)
}

const handleCartClick = () => {
  window.alert('Cart clicked')
}

const handleLogoClick = () => {
  window.alert('Home clicked')
}

const onCartClick = () => {
  handleCartClick()
}

const onSearch = (q: string) => {
  handleSearch(q)
}

const onLogoClick = () => {
  handleLogoClick()
}

const onSettingsClick = () => {
  window.alert('Settings clicked')
}

const onSignInClick = () => {
  window.alert('Sign in clicked')
}

const onLogout = () => {
  window.alert('Logout clicked')
}
</script>

<template>
  <Navbar
  :cartCount="cartCount"
  :categories="categories"
  :selectedCategory="selectedCategory"
  :isLoggedIn="isLoggedIn"
  :userProfile="userProfile"
  @cartClick="onCartClick"
  @search="onSearch"
  @logoClick="onLogoClick"
  @settingsClick="onSettingsClick"
  @signInClick="onSignInClick"
  @logout="onLogout"
/>

</template>
