<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const ADDRESS_YANDEX_QUERY = encodeURIComponent('Краснодар, ул. Дзержинского, 8/1')
const ADDRESS_2GIS_QUERY = encodeURIComponent('улица Дзержинского, 8/1')

const yandexLink = `https://yandex.ru/maps/?text=${ADDRESS_YANDEX_QUERY}`
const twoGisLink = `https://2gis.ru/krasnodar/search/${ADDRESS_2GIS_QUERY}`

interface Review {
  text: string
  author: string
  source: 'yandex' | '2gis'
}

const reviews: Review[] = [
  { text: '«Помогли, когда сама уже не верила в результат»', author: 'Анна К., март 2026', source: 'yandex' },
  { text: '«Разобрались с наследством быстро, объяснили каждый шаг»', author: 'Сергей П., февраль 2026', source: '2gis' },
  { text: '«Взыскали долг с подрядчика — ушло на это два месяца»', author: 'ООО «Стройметалл»', source: 'yandex' },
  { text: '«Спокойно и по делу провели через процедуру банкротства»', author: 'Марина Т., январь 2026', source: '2gis' },
]

function reviewHref(source: Review['source']) {
  return source === 'yandex' ? yandexLink : twoGisLink
}

function reviewSourceLabel(source: Review['source']) {
  return source === 'yandex' ? 'Яндекс.Карты' : '2ГИС'
}

const ratings = [
  { name: 'Яндекс.Карты', score: '4,9', count: '128 отзывов', href: yandexLink },
  { name: '2ГИС', score: '4,8', count: '82 отзыва', href: twoGisLink },
]

// Настоящая бесконечная карусель по кругу: в конец ленты добавлен клон первой карточки,
// чтобы при автопрокрутке/next с последней карточки лента продолжала ехать вперёд, а не
// «отматывалась» назад — доехав до клона, мы незаметно (без анимации) перепрыгиваем на
// настоящую первую карточку в начале с тем же визуальным результатом. Клон только в конце
// (а не с обеих сторон), чтобы при самой первой отрисовке страницы сразу была видна
// настоящая первая карточка, без мелькания лишнего кадра до того, как отработает JS.
const N = reviews.length
const slides = computed(() => [
  ...reviews.map((r) => ({ ...r, isClone: false })),
  { ...reviews[0], isClone: true },
])

const carouselEl = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

// true, пока идёт programmatic-скролл (scrollToIndex) — чтобы не путать его с реальным
// жестом пользователя и не «драться» с инерцией скролла на телефоне.
let isProgrammaticScroll = false

function onCarouselScroll() {
  const el = carouselEl.value
  if (!el) return
  const cards = Array.from(el.children) as HTMLElement[]
  let closestRendered = 0
  let minDist = Infinity
  cards.forEach((card, i) => {
    const dist = Math.abs(card.offsetLeft - el.scrollLeft)
    if (dist < minDist) {
      minDist = dist
      closestRendered = i
    }
  })

  activeIndex.value = closestRendered >= N ? 0 : closestRendered

  if (!isProgrammaticScroll) scheduleResume()
}

function scrollToRendered(renderedIdx: number, behavior: ScrollBehavior = 'smooth') {
  const el = carouselEl.value
  const card = el?.children[renderedIdx] as HTMLElement | undefined
  if (el && card) {
    isProgrammaticScroll = true
    el.scrollTo({ left: card.offsetLeft, behavior })
    window.setTimeout(() => { isProgrammaticScroll = false }, behavior === 'smooth' ? 550 : 50)
  }
}

// index === N (шаг вперёд с последней настоящей карточки) — едем к клону-заглушке в конце
// ленты, а затем незаметно телепортируемся на настоящую первую карточку в начале с тем же
// визуальным результатом. Отрицательный index (шаг «назад» с первой карточки вручную) —
// более редкое действие, для него просто едем напрямую к настоящей последней карточке.
function scrollToIndex(index: number) {
  if (index >= N) {
    scrollToRendered(N)
    activeIndex.value = 0
    window.setTimeout(() => scrollToRendered(0, 'auto'), 560)
  } else {
    const wrapped = (index + N) % N
    scrollToRendered(wrapped)
    activeIndex.value = wrapped
  }
}

function selectReview(index: number) {
  scrollToIndex(index)
  scheduleResume()
}

// Перетаскивание мышью — overflow-x у браузера сам умеет только тач-свайп и колесо,
// зажать и потянуть карточки мышью «из коробки» нельзя, поэтому эмулируем вручную.
const isDraggingWithMouse = ref(false)
let dragPointerId: number | null = null
let dragStartX = 0
let dragStartScrollLeft = 0
let dragMoved = false

function onPointerDown(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  const el = carouselEl.value
  if (!el) return
  isDraggingWithMouse.value = true
  dragMoved = false
  dragPointerId = event.pointerId
  dragStartX = event.clientX
  dragStartScrollLeft = el.scrollLeft
  el.setPointerCapture(event.pointerId)
  stopAutoplay()
}

function onPointerMove(event: PointerEvent) {
  if (!isDraggingWithMouse.value || event.pointerId !== dragPointerId) return
  const el = carouselEl.value
  if (!el) return
  const dx = event.clientX - dragStartX
  if (Math.abs(dx) > 4) dragMoved = true
  el.scrollLeft = dragStartScrollLeft - dx
}

function endDrag(event: PointerEvent) {
  if (!isDraggingWithMouse.value || event.pointerId !== dragPointerId) return
  isDraggingWithMouse.value = false
  carouselEl.value?.releasePointerCapture(event.pointerId)
  onCarouselScroll()
  scrollToIndex(activeIndex.value)
}

function onCardClick(event: MouseEvent) {
  if (dragMoved) {
    event.preventDefault()
    dragMoved = false
  }
}

function prevReview() {
  selectReview(activeIndex.value - 1)
}

function nextReview() {
  selectReview(activeIndex.value + 1)
}

// Автопрокрутка карусели по кругу. Пауза при наведении/касании, во время и сразу после
// ручной прокрутки (в т.ч. инерционной на телефоне), и когда вкладка не активна.
const AUTOPLAY_INTERVAL_MS = 4500
const RESUME_DELAY_MS = 2500
let autoplayTimer: ReturnType<typeof setInterval> | null = null
let resumeTimer: ReturnType<typeof setTimeout> | null = null

function stopAutoplay() {
  if (autoplayTimer !== null) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function startAutoplay() {
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    scrollToIndex(activeIndex.value + 1)
  }, AUTOPLAY_INTERVAL_MS)
}

function scheduleResume() {
  stopAutoplay()
  if (resumeTimer !== null) clearTimeout(resumeTimer)
  resumeTimer = setTimeout(() => {
    resumeTimer = null
    startAutoplay()
  }, RESUME_DELAY_MS)
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopAutoplay()
    if (resumeTimer !== null) {
      clearTimeout(resumeTimer)
      resumeTimer = null
    }
  } else {
    startAutoplay()
  }
}

onMounted(() => {
  startAutoplay()
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  stopAutoplay()
  if (resumeTimer !== null) clearTimeout(resumeTimer)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <section id="reviews" class="reviews">
    <div class="container">
      <h2 class="reviews__title">Отзывы</h2>

      <div class="reviews__grid">
        <div
          class="reviews__main"
          @mouseenter="stopAutoplay"
          @mouseleave="scheduleResume"
          @touchstart.passive="stopAutoplay"
          @touchend.passive="scheduleResume"
        >
          <div
            ref="carouselEl"
            class="reviews__carousel"
            :class="{ 'reviews__carousel--dragging': isDraggingWithMouse }"
            @scroll.passive="onCarouselScroll"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="endDrag"
            @pointercancel="endDrag"
          >
            <a
              v-for="(slide, index) in slides"
              :key="index"
              :href="reviewHref(slide.source)"
              target="_blank"
              rel="noopener"
              class="review-card"
              :aria-hidden="slide.isClone || undefined"
              :tabindex="slide.isClone ? -1 : undefined"
              @click="onCardClick"
            >
              <div class="review-card__stars">
                <StarIcon v-for="n in 5" :key="n" :size="16" />
              </div>
              <p class="review-card__text">{{ slide.text }}</p>
              <p class="review-card__author">{{ slide.author }}</p>
              <span class="review-card__source">{{ reviewSourceLabel(slide.source) }} ↗</span>
            </a>
          </div>

          <div class="reviews__nav">
            <button
              type="button"
              class="nav-btn nav-btn--prev"
              aria-label="Предыдущий отзыв"
              @click="prevReview"
            >
              <ChevronIcon :size="18" />
            </button>

            <div class="reviews__dots">
              <button
                v-for="(review, index) in reviews"
                :key="index"
                type="button"
                class="dot"
                :class="{ 'dot--active': index === activeIndex }"
                :aria-label="`Перейти к отзыву ${index + 1}`"
                @click="selectReview(index)"
              />
            </div>

            <button
              type="button"
              class="nav-btn"
              aria-label="Следующий отзыв"
              @click="nextReview"
            >
              <ChevronIcon :size="18" />
            </button>
          </div>
        </div>

        <div class="reviews__ratings">
          <a v-for="rating in ratings" :key="rating.name" :href="rating.href" target="_blank" rel="noopener" class="rating-card">
            <span class="rating-card__row">
              <span class="rating-card__label">{{ rating.name }}</span>
              <span class="rating-card__score">{{ rating.score }}</span>
            </span>
            <span class="rating-card__count">{{ rating.count }} →</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews {
  background: var(--c-cream);
  padding: 40px 0;
}
.reviews__title {
  font-size: 26px;
  line-height: 32px;
  padding: 0 16px;
  margin-bottom: 20px;
}

.reviews__carousel {
  position: relative;
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 4px 16px 6px;
  margin-bottom: 12px;
  cursor: grab;
}
.reviews__carousel::-webkit-scrollbar {
  display: none;
}
.reviews__carousel--dragging {
  cursor: grabbing;
  scroll-snap-type: none;
  user-select: none;
}
.reviews__carousel--dragging .review-card {
  pointer-events: none;
}

.reviews__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}
.nav-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--c-cream-border);
  background: var(--c-white);
  color: var(--c-navy);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}
.nav-btn--prev svg {
  transform: scaleX(-1);
}
.nav-btn:disabled {
  opacity: .35;
  cursor: default;
}
.reviews__dots {
  display: flex;
  align-items: center;
  gap: 8px;
}
.dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border-radius: 50%;
  border: none;
  background: var(--c-border-strong);
  cursor: pointer;
}
.dot--active {
  width: 20px;
  border-radius: 4px;
  background: var(--c-gold);
}
.review-card {
  scroll-snap-align: start;
  flex: 0 0 260px;
  padding: 18px 16px;
  border-radius: var(--r-lg);
  background: var(--c-white);
  border: 1px solid var(--c-cream-border);
  box-shadow: var(--shadow-md);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}
.review-card__stars {
  display: flex;
  gap: 3px;
  color: var(--c-gold);
  margin-bottom: 10px;
}
.review-card__text {
  font-size: 16px;
  line-height: 24px;
  color: var(--c-text-body);
  margin: 0 0 10px;
}
.review-card__author {
  font-size: 14px;
  color: var(--c-text-muted);
  margin: 0 0 10px;
}
.review-card__source {
  margin-top: auto;
  font-size: 13px;
  font-weight: 600;
  color: var(--c-blue);
}

.reviews__ratings {
  display: flex;
  gap: 12px;
  padding: 0 16px;
}
.rating-card {
  flex: 1;
  padding: 14px 16px;
  border-radius: var(--r-lg);
  background: var(--c-white);
  border: 1px solid var(--c-cream-border);
  box-shadow: var(--shadow-md);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.rating-card__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.rating-card__label {
  font-size: 14px;
  font-weight: 600;
  color: var(--c-text);
}
.rating-card__score {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 20px;
  color: var(--c-gold-text);
}
.rating-card__count {
  font-size: 12px;
  color: var(--c-text-muted);
}

@media (min-width: 1024px) {
  .reviews {
    padding: 80px 0;
  }
  .reviews__title {
    padding: 0;
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 32px;
  }
  .reviews__grid {
    display: flex;
    align-items: flex-start;
    gap: 24px;
  }
  .reviews__main {
    flex: 1;
    min-width: 0;
  }
  .reviews__carousel {
    padding: 4px 0 6px;
  }
  .reviews__nav {
    justify-content: flex-start;
    margin-bottom: 0;
  }
  .review-card {
    flex: 0 0 320px;
    padding: 28px 24px;
  }
  .reviews__ratings {
    flex-direction: column;
    width: 260px;
    flex-shrink: 0;
    padding: 0;
  }
  .rating-card {
    padding: 20px 24px;
  }
  .rating-card__score {
    font-size: 24px;
  }
}
</style>
