<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 24 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 2.5c3.5 4.5 6.5 8.4 6.5 12a6.5 6.5 0 0 1-13 0c0-3.6 3-7.5 6.5-12z" /></svg>
</template>
