<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 24 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><ellipse cx="9" cy="7" rx="6" ry="3" /><path d="M3 7v10c0 1.7 2.7 3 6 3s6-1.3 6-3V7" /><path d="M15 10.2c2.5.3 4 1.4 4 2.8v6c0 1.5-2.2 2.7-5 3" /><path d="M3 12.2c0 1.4 2.7 2.8 6 2.8" /></svg>
</template>
