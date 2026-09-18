<script setup lang="ts">
import { onMounted, ref } from 'vue'

// Скелетон — лёгкая накладка поверх уже отрисованного сервером контента (не замена ему),
// поэтому даже без JS или при отключённом JS страница остаётся полностью видимой и
// доступной поисковым роботам. С JS пользователь на мгновение видит скелетон, затем он
// плавно исчезает, открывая уже готовую страницу.
const showLoader = ref(true)

onMounted(() => {
  const MIN_VISIBLE_MS = 350
  const MAX_WAIT_MS = 2500
  const start = Date.now()

  function hideLoader() {
    const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start))
    window.setTimeout(() => { showLoader.value = false }, remaining)
  }

  const fontsReady = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready
  if (fontsReady) {
    fontsReady.then(hideLoader).catch(hideLoader)
  } else {
    hideLoader()
  }

  // Подстраховка на случай, если шрифты или что-то ещё зависнет — скелетон не должен висеть вечно.
  window.setTimeout(() => { showLoader.value = false }, MAX_WAIT_MS)
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <ClientOnly>
      <Transition name="page-loader-fade">
        <AppPageLoader v-if="showLoader" />
      </Transition>
    </ClientOnly>
  </div>
</template>

<style scoped>
.page-loader-fade-leave-active {
  transition: opacity .35s ease;
}
.page-loader-fade-leave-to {
  opacity: 0;
}
</style>
