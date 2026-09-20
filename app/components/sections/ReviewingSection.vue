<script setup lang="ts">
interface ReviewCard {
  title: string
  text: string
}

const items: ReviewCard[] = [
  { title: 'Строительная', text: 'Строительно-техническая и землеустроительная' },
  { title: 'Оценочная', text: 'Рецензия на отчёты об оценке' },
  { title: 'Автотехническая', text: 'Анализ обстоятельств ДТП' },
  { title: 'Документоведческая', text: 'Давность изготовления документов' },
  { title: 'Почерковедческая', text: 'Исследование подписей и текстов' },
  { title: 'Медицинская', text: 'Выводы судебно-медицинской экспертизы' },
]
</script>

<template>
  <section id="reviewing" class="reviewing">
    <div class="container">
      <p class="section-label">Рецензирование</p>
      <h2 class="reviewing__title">Не согласны с чужой экспертизой? Докажем, где она неправа</h2>

      <div class="reviewing__grid">
        <div v-for="item in items" :key="item.title" class="reviewing-card">
          <p class="reviewing-card__title">{{ item.title }}</p>
          <p class="reviewing-card__text">{{ item.text }}</p>
        </div>
      </div>

      <div class="cta-block">
        <p class="cta-block__text">Нужна консультация по рецензированию экспертиз?</p>
        <a href="#form" class="btn btn-gold">Получить консультацию</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviewing {
  background: var(--c-cream);
  padding: 40px 0;
}
.reviewing__title {
  font-size: 26px;
  line-height: 32px;
  padding: 0 16px;
  margin-bottom: 20px;
}

.reviewing__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  padding: 0 16px;
  margin-bottom: 24px;
}
.reviewing-card {
  padding: 16px;
  border-radius: var(--r-lg);
  border: 1px solid var(--c-cream-border);
  background: var(--c-white);
  box-shadow: var(--shadow-md);
}
.reviewing-card__title {
  font-weight: 700;
  font-size: 15px;
  color: var(--c-text);
  margin: 0 0 6px;
}
.reviewing-card__text {
  font-size: 13px;
  line-height: 18px;
  color: var(--c-text-muted);
  margin: 0;
}

.cta-block {
  padding: 24px 16px;
  border-radius: var(--r-lg);
  background: var(--c-navy);
  text-align: center;
}
.cta-block__text {
  color: var(--c-white);
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 16px;
}

@media (min-width: 1024px) {
  .reviewing {
    padding: 80px 0;
  }
  .reviewing__title {
    padding: 0;
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 32px;
    max-width: 760px;
  }
  .reviewing__grid {
    padding: 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .reviewing-card {
    padding: 24px;
  }
  .cta-block {
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
  }
  .cta-block__text {
    margin: 0;
    font-size: 22px;
  }
}
</style>
