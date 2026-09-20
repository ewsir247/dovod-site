<script setup lang="ts">
interface ServiceCard {
  title: string
  text: string
}

const pains = [
  'Ущерб после ДТП, пожара или залива не подтверждён документально',
  'Страховая или виновник спорят с вашей версией событий',
  'Подлинность подписи в документе оспаривается',
]

const services: ServiceCard[] = [
  { title: 'Судебная экспертиза', text: 'По определению суда — заключение сразу оформлено как требует процесс' },
  { title: 'Экспертиза при ДТП', text: 'Устанавливаем реальный механизм аварии' },
  { title: 'Строительная экспертиза', text: 'Доказываем некачественный ремонт или самовольную стройку' },
  { title: 'Экспертиза документов', text: 'Проверяем документ на подделку и дописки' },
  { title: 'Психологическая экспертиза', text: 'Для суда — по спорам о детях и сделкам под сомнением' },
  { title: 'Почерковедческая экспертиза', text: 'Докажем подлинность или подделку подписи' },
]

const outcomes = [
  'Заключение, оформленное строго по процессуальным нормам',
  'Эксперта с профильным образованием и сертификатом соответствия',
  'Готовность подтвердить квалификацию по запросу',
]
</script>

<template>
  <section id="expertise" class="expertise">
    <div class="container">
      <p class="section-label">Экспертиза</p>
      <h2 class="expertise__title">У вас есть мнение. У суда есть только факты</h2>

      <ul class="pain-list">
        <li v-for="pain in pains" :key="pain">{{ pain }}</li>
      </ul>

      <div class="expertise__grid">
        <div v-for="item in services" :key="item.title" class="expertise-card">
          <p class="expertise-card__title">{{ item.title }}</p>
          <p class="expertise-card__text">{{ item.text }}</p>
        </div>
      </div>

      <div class="outcome-block">
        <p class="section-label outcome-block__label">Что вы получаете</p>
        <ul class="outcome-list">
          <li v-for="item in outcomes" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div class="cta-block">
        <p class="cta-block__text">Нужна независимая или судебная экспертиза?</p>
        <a href="#form" class="btn btn-gold">Получить консультацию</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.expertise {
  background: var(--c-cream);
  padding: 40px 0;
}
.expertise__title {
  font-size: 26px;
  line-height: 32px;
  padding: 0 16px;
  margin-bottom: 16px;
}
.pain-list {
  list-style: none;
  margin: 0 0 24px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pain-list li {
  position: relative;
  padding-left: 18px;
  font-size: 15px;
  line-height: 22px;
  color: var(--c-text-body);
}
.pain-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-gold);
}

.expertise__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  padding: 0 16px;
  margin-bottom: 24px;
}
.expertise-card {
  padding: 16px;
  border-radius: var(--r-lg);
  border: 1px solid var(--c-cream-border);
  background: var(--c-white);
  box-shadow: var(--shadow-md);
}
.expertise-card__title {
  font-weight: 700;
  font-size: 15px;
  color: var(--c-text);
  margin: 0 0 6px;
}
.expertise-card__text {
  font-size: 13px;
  line-height: 18px;
  color: var(--c-text-muted);
  margin: 0;
}

.outcome-block {
  padding: 0 16px;
  margin-bottom: 24px;
}
.outcome-block__label {
  padding: 0;
}
.outcome-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.outcome-list li {
  position: relative;
  padding-left: 18px;
  font-size: 15px;
  line-height: 22px;
  color: var(--c-text-body);
}
.outcome-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--c-success);
  font-weight: 700;
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
  .expertise {
    padding: 80px 0;
  }
  .expertise__title {
    padding: 0;
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 24px;
    max-width: 760px;
  }
  .pain-list {
    padding: 0;
    margin-bottom: 40px;
  }
  .pain-list li {
    font-size: 16px;
  }
  .expertise__grid {
    padding: 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .expertise-card {
    padding: 24px;
  }
  .outcome-block {
    padding: 0;
    margin-bottom: 40px;
    max-width: 640px;
  }
  .outcome-list li {
    font-size: 16px;
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
