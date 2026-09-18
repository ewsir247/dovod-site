<script setup lang="ts">
withDefaults(defineProps<{ size?: number; textColor?: string }>(), {
  size: 30,
  textColor: '#16355B',
})
</script>

<template>
  <NuxtLink to="/" class="logo">
    <svg :width="size" :height="size * (42 / 38)" viewBox="0 0 38 42" aria-hidden="true" focusable="false">
      <path d="M19 2 L35 8 V22 C35 31 28 37 19 40 C10 37 3 31 3 22 V8 Z" fill="#16355B" />
      <path d="M19 6 L31 10.5 V22 C31 29 25.5 33.6 19 36 C12.5 33.6 7 29 7 22 V10.5 Z" fill="#C9A35E" />
      <path d="M19 9.5 L28 12.8 V22 C28 27.4 23.8 31.2 19 33.2 C14.2 31.2 10 27.4 10 22 V12.8 Z" fill="#F9F6F2" />
      <path d="M12.5 21.5 L17.5 26.5 L30 11" fill="none" stroke="#1F5D90" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span class="wordmark" :style="{ color: textColor }">ДОВОД</span>
  </NuxtLink>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.wordmark {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 19px;
  letter-spacing: 0.02em;
}
</style>
