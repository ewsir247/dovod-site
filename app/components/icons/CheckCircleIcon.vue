<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 56 })
</script>

<template>
  <!-- lucide: check-circle -->
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg>
</template>
