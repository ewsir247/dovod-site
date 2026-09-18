<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 24 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M11 3.5 4 9.5V20h6" /><path d="M13 3.5 20 9.5V20h-6" /><path d="M12 4.2v2.6l-1.6 2 1.6 2-1.6 2 1.6 2V19" /></svg>
</template>
