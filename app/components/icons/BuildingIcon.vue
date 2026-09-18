<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 24 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="4" y="3" width="11" height="18" /><rect x="15" y="9" width="5" height="12" /><line x1="7" y1="7" x2="9" y2="7" /><line x1="7" y1="11" x2="9" y2="11" /><line x1="7" y1="15" x2="9" y2="15" /></svg>
</template>
