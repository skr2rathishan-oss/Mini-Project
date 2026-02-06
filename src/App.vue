<script setup lang="ts">
import { ref } from 'vue'

const message = ref("Hello")

function changeMessage() {
  message.value = "Button Clicked!"
}
</script>

<template>
  <div>
    <h2>{{ message }}</h2>
    <button @click="changeMessage">Click Me</button>
  </div>
</template>
