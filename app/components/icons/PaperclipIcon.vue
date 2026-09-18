<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 20 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M17 7.5l-7.1 7.1a3 3 0 0 0 4.2 4.2l7.4-7.4a5 5 0 0 0-7.1-7.1L6.9 11.9a7 7 0 0 0 9.9 9.9" /></svg>
</template>
