<script setup lang="ts">
// Цитаты дословно взяты из первых двух отзывов ReviewsSection.vue (тот же текст, автор, источник) —
// новый контент не придумываем, переиспользуем то, что уже есть на сайте.
const quotes = [
  { text: '«Помогли, когда сама уже не верила в результат»', author: 'Анна К., март 2026' },
  { text: '«Разобрались с наследством быстро, объяснили каждый шаг»', author: 'Сергей П., февраль 2026' },
]
</script>

<template>
  <section id="about" class="about">
    <div class="container">
      <p class="section-label">О компании</p>
      <h2 class="about__title">Кто мы и почему нам доверяют</h2>
      <p class="about__text">Юридическая и экспертная компания в Краснодаре — работаем с 2014 года.</p>

      <div class="about__quotes">
        <blockquote v-for="quote in quotes" :key="quote.text" class="quote-card">
          <p class="quote-card__text">{{ quote.text }}</p>
          <footer class="quote-card__author">{{ quote.author }}</footer>
        </blockquote>
      </div>

      <a href="#reviews" class="about__link">Все отзывы →</a>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--c-white);
  padding: 40px 0;
}
.about__title {
  font-size: 26px;
  line-height: 32px;
  padding: 0 16px;
  margin-bottom: 12px;
}
.about__text {
  padding: 0 16px;
  font-size: 15px;
  line-height: 22px;
  color: var(--c-text-body);
  margin: 0 0 24px;
}

.about__quotes {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
  margin-bottom: 20px;
}
.quote-card {
  margin: 0;
  padding: 18px 16px;
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  box-shadow: var(--shadow-md);
}
.quote-card__text {
  font-size: 15px;
  line-height: 22px;
  color: var(--c-text);
  margin: 0 0 8px;
}
.quote-card__author {
  font-size: 13px;
  color: var(--c-text-muted);
  font-style: normal;
}

.about__link {
  display: block;
  padding: 0 16px;
  font-weight: 600;
  font-size: 15px;
  color: var(--c-blue);
}

@media (min-width: 1024px) {
  .about {
    padding: 80px 0;
  }
  .about__title {
    padding: 0;
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 16px;
  }
  .about__text {
    padding: 0;
    font-size: 18px;
    line-height: 26px;
    margin-bottom: 32px;
    max-width: 640px;
  }
  .about__quotes {
    padding: 0;
    flex-direction: row;
    gap: 24px;
    margin-bottom: 24px;
  }
  .quote-card {
    flex: 1;
    padding: 28px 24px;
  }
  .about__link {
    padding: 0;
  }
}
</style>
