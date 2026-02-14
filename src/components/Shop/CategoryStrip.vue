<script setup lang="ts">
export interface CategoryChip {
  id: string;
  label: string;
}

const props = defineProps<{
  categories: CategoryChip[];
  activeId: string;
}>();

const emit = defineEmits<{ (e: "select", id: string): void }>();
</script>

<template>
  <div class="mb-12">
    <div class="flex items-center justify-end gap-2 mb-6">
      <button type="button" class="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
        ‹
      </button>
      <button type="button" class="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
        ›
      </button>
    </div>

    <div class="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0">
      <button
        v-for="cat in categories"
        :key="cat.id"
        type="button"
        class="flex-shrink-0 flex items-center gap-3 px-6 py-3.5 rounded-2xl border transition-all duration-300 group"
        :class="cat.id === activeId
          ? 'bg-slate-950 border-slate-950 text-white shadow-xl shadow-slate-200'
          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50'"
        @click="emit('select', cat.id)"
      >
        <span
          class="w-2.5 h-2.5 rounded-full"
          :class="cat.id === activeId ? 'bg-teal-400' : 'bg-slate-300 group-hover:bg-slate-900'"
        ></span>

        <span class="text-[13px] font-bold whitespace-nowrap tracking-tight">{{ cat.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
