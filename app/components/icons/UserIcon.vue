<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 32 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="8.5" r="3.5" /><path d="M4.5 20c1-3.5 4-5.5 7.5-5.5s6.5 2 7.5 5.5" /></svg>
</template>
