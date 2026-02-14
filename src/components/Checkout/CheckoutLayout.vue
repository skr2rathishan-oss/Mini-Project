<script setup lang="ts">
defineProps<{ title: string; subtitle: string }>();
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 py-10">
      <div class="mb-8">
        <h1 class="text-3xl font-black text-slate-900">{{ title }}</h1>
        <p class="text-slate-500 font-medium mt-1">{{ subtitle }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-7">
          <slot name="left" />
        </div>

        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-6">
            <slot name="right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
