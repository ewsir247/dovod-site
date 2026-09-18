<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 22 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path d="M12 3.5a8.3 8.3 0 0 0-7.2 12.4L3.5 20l4.3-1.1A8.3 8.3 0 1 0 12 3.5Z" />
    <path d="M8.7 9.2c.2-.5.4-.7.7-.7h.6c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .5-.1.6l-.5.6c-.1.2-.2.3 0 .6.4.6.9 1.2 1.4 1.6.5.4 1 .7 1.6 1 .2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.5-.1l1.3.6c.2.1.3.2.3.4 0 .2 0 .6-.2 1-.3.5-1.1.9-1.6 1-.5.1-.9.1-2.4-.5-2-.8-3.3-2.7-3.4-2.9-.1-.1-1-1.3-1-2.4 0-1 .5-1.5.7-1.7Z" />
  </svg>
</template>
