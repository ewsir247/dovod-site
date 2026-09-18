<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{ lon?: number; lat?: number; zoom?: number; label?: string }>(), {
  lon: 38.9794533,
  lat: 45.0573012,
  zoom: 16,
  label: 'Краснодар, ул. Дзержинского, 8/1',
})

// Ширина рамки вокруг точки — примерно соответствует переданному zoom (чем выше zoom, тем ближе кадр).
const spanLon = 360 / (2 ** props.zoom) / 2.6
const spanLat = spanLon * 0.66

const bbox = [
  props.lon - spanLon,
  props.lat - spanLat,
  props.lon + spanLon,
  props.lat + spanLat,
].join(',')

const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${props.lat}%2C${props.lon}`
const openMapUrl = `https://www.openstreetmap.org/?mlat=${props.lat}&mlon=${props.lon}#map=${props.zoom}/${props.lat}/${props.lon}`

const loaded = ref(false)
const timedOut = ref(false)

// Если карта не подгрузилась за разумное время (медленный/нестабильный интернет),
// показываем рабочую ссылку вместо вечного скелетона или «битой» рамки.
const TIMEOUT_MS = 8000
let timeoutId: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  timeoutId = setTimeout(() => {
    if (!loaded.value) timedOut.value = true
  }, TIMEOUT_MS)
})

onBeforeUnmount(() => {
  if (timeoutId) clearTimeout(timeoutId)
})

function onFrameLoad() {
  loaded.value = true
  timedOut.value = false
  if (timeoutId) clearTimeout(timeoutId)
}
</script>

<template>
  <div class="office-map">
    <div v-if="!loaded && !timedOut" class="office-map__skeleton skeleton" aria-hidden="true" />

    <a v-if="timedOut" :href="openMapUrl" target="_blank" rel="noopener" class="office-map__fallback">
      <MapIcon :size="28" />
      <p>{{ label }}</p>
      <span>Карта долго грузится — открыть в новой вкладке →</span>
    </a>

    <iframe
      v-show="!timedOut"
      class="office-map__frame"
      :class="{ 'office-map__frame--visible': loaded }"
      :src="embedSrc"
      :title="`Карта — ${label}`"
      loading="lazy"
      @load="onFrameLoad"
    />
  </div>
</template>

<style scoped>
.office-map {
  position: relative;
  width: 100%;
  height: 220px;
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}
.office-map__skeleton {
  position: absolute;
  inset: 0;
  border-radius: var(--r-lg);
}
.office-map__frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  opacity: 0;
  transition: opacity .3s ease;
}
.office-map__frame--visible {
  opacity: 1;
}
.office-map__fallback {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border: 1.5px dashed var(--c-border-strong);
  border-radius: var(--r-lg);
  background: var(--c-white);
  color: var(--c-text-muted);
  text-align: center;
  text-decoration: none;
}
.office-map__fallback p {
  margin: 0;
  font-size: 14px;
  color: var(--c-text-muted);
}
.office-map__fallback span {
  font-size: 13px;
  font-weight: 600;
  color: var(--c-blue);
}

@media (min-width: 1024px) {
  .office-map {
    height: 260px;
  }
}
</style>
