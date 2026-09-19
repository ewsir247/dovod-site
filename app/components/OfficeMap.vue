<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{ lon?: number; lat?: number; zoom?: number; label?: string }>(), {
  lon: 38.9794533,
  lat: 45.0573012,
  zoom: 16,
  label: 'Краснодар, ул. Дзержинского, 8/1',
})

const openMapUrl = `https://2gis.ru/search/${encodeURIComponent(props.label)}`

const mapContainer = ref<HTMLDivElement | null>(null)
const loaded = ref(false)
const timedOut = ref(false)

// Если карта не подгрузилась за разумное время (медленный/нестабильный интернет,
// либо зависший скрипт 2ГИС), показываем рабочую ссылку вместо вечного скелетона.
const TIMEOUT_MS = 8000
let timeoutId: ReturnType<typeof setTimeout> | undefined

const MAPGL_SCRIPT_SRC = 'https://mapgl.2gis.com/api/js/v1'

function loadMapglScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${MAPGL_SCRIPT_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('mapgl script failed to load')))
      return
    }
    const script = document.createElement('script')
    script.src = MAPGL_SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('mapgl script failed to load'))
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  if (typeof window === 'undefined') return

  const config = useRuntimeConfig()
  const apiKey = config.public.dgisApiKey

  // Без ключа карта заведомо не отрисуется — сразу показываем fallback-ссылку
  // на 2ГИС, не тратя время на попытку загрузки скрипта.
  if (!apiKey) {
    timedOut.value = true
    return
  }

  timeoutId = setTimeout(() => {
    if (!loaded.value) timedOut.value = true
  }, TIMEOUT_MS)

  try {
    await loadMapglScript()
    if (!mapContainer.value) return

    // Типов пакета @2gis/mapgl в проекте нет (SDK грузится динамически с CDN,
    // без npm-зависимости) — работаем с window.mapgl как с any.
    const mapgl = (window as unknown as { mapgl: any }).mapgl
    const map = new mapgl.Map(mapContainer.value, {
      center: [props.lon, props.lat],
      zoom: props.zoom,
      key: apiKey,
    })
    // eslint-disable-next-line no-new
    new mapgl.Marker(map, { coordinates: [props.lon, props.lat] })

    loaded.value = true
    timedOut.value = false
    if (timeoutId) clearTimeout(timeoutId)
  } catch {
    timedOut.value = true
  }
})

onBeforeUnmount(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<template>
  <div class="office-map">
    <div v-if="!loaded && !timedOut" class="office-map__skeleton skeleton" aria-hidden="true" />

    <a v-if="timedOut" :href="openMapUrl" target="_blank" rel="noopener" class="office-map__fallback">
      <MapIcon :size="28" />
      <p>{{ label }}</p>
      <span>Карта долго грузится — открыть в новой вкладке →</span>
    </a>

    <div
      v-show="!timedOut"
      ref="mapContainer"
      class="office-map__frame"
      :class="{ 'office-map__frame--visible': loaded }"
      :title="`Карта — ${label}`"
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
