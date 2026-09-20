<script setup lang="ts">
interface ServiceCard {
  title: string
  text: string
  price?: string
}

interface Step {
  n: number
  title: string
  text: string
}

const pains = [
  'Самостоятельная оценка — банк и суд её не примут',
  'Для каждого объекта своя методика оценки',
  'Непонятно, сколько стоит отчёт и сколько ждать результат',
]

const services: ServiceCard[] = [
  { title: 'Недвижимость', text: 'Для ипотеки, наследства, суда или продажи', price: 'от 3500 ₽' },
  { title: 'Транспорт', text: 'Авто, спецтехника, мототранспорт', price: 'от 3500 ₽' },
  { title: 'Ремонт при ДТП', text: 'Реальная стоимость восстановления — для спора со страховой' },
  { title: 'Бизнес', text: 'Стоимость предприятия, доли или пакета акций', price: 'индивидуально' },
  { title: 'Оборудование', text: 'Для залога в банке, продажи или баланса', price: 'от 3500 ₽' },
  { title: 'Ущерб', text: 'Ущерб, упущенная выгода, право требования', price: 'индивидуально' },
]

const steps: Step[] = [
  { n: 1, title: 'Документы', text: 'Передаёте документы на почту или в офис' },
  { n: 2, title: 'Договор', text: 'Заключаем договор, выставляем счёт' },
  { n: 3, title: 'Осмотр', text: 'Согласовываем дату осмотра объекта' },
  { n: 4, title: 'Отчёт', text: 'Готовим отчёт об оценке в срок' },
]
</script>

<template>
  <section id="estimate" class="estimate">
    <div class="container">
      <p class="section-label">Оценка</p>
      <h2 class="estimate__title">Отчёт об оценке, который банк и суд примут с первого раза</h2>

      <ul class="pain-list">
        <li v-for="pain in pains" :key="pain">{{ pain }}</li>
      </ul>

      <div class="estimate__grid">
        <div v-for="item in services" :key="item.title" class="estimate-card">
          <p class="estimate-card__title">{{ item.title }}</p>
          <p class="estimate-card__text">{{ item.text }}</p>
          <p v-if="item.price" class="estimate-card__price">{{ item.price }}</p>
        </div>
      </div>

      <p class="section-label estimate__steps-label">Как проходит оценка</p>
      <div class="estimate__steps">
        <div v-for="step in steps" :key="step.n" class="step-card">
          <span class="step-card__num">{{ step.n }}</span>
          <p class="step-card__title">{{ step.title }}</p>
          <p class="step-card__text">{{ step.text }}</p>
        </div>
      </div>

      <div class="cta-block">
        <p class="cta-block__text">Обсудим вашу задачу по оценке</p>
        <a href="#form" class="btn btn-gold">Получить консультацию</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.estimate {
  background: var(--c-white);
  padding: 40px 0;
}
.estimate__title {
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

.estimate__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  padding: 0 16px;
  margin-bottom: 24px;
}
.estimate-card {
  padding: 16px;
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  background: var(--c-white);
  box-shadow: var(--shadow-md);
}
.estimate-card__title {
  font-weight: 700;
  font-size: 16px;
  color: var(--c-text);
  margin: 0 0 6px;
}
.estimate-card__text {
  font-size: 13px;
  line-height: 18px;
  color: var(--c-text-muted);
  margin: 0;
}
.estimate-card__price {
  margin: 10px 0 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--c-gold-text);
}

.estimate__steps-label {
  padding: 0 16px;
}
.estimate__steps {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  padding: 0 16px;
  margin-bottom: 24px;
}
.step-card {
  padding: 16px;
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  background: var(--c-surface);
}
.step-card__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--c-navy);
  color: var(--c-white);
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 10px;
}
.step-card__title {
  font-weight: 700;
  font-size: 15px;
  color: var(--c-text);
  margin: 0 0 4px;
}
.step-card__text {
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
  .estimate {
    padding: 80px 0;
  }
  .estimate__title {
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
  .estimate__grid {
    padding: 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .estimate-card {
    padding: 24px;
  }
  .estimate__steps-label {
    padding: 0;
  }
  .estimate__steps {
    padding: 0;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .step-card {
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
