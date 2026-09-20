<script setup lang="ts">
interface FeatureCard {
  n: number
  title: string
  text: string
}

interface PriceItem {
  title: string
  price: string
}

const features: FeatureCard[] = [
  { n: 1, title: 'Семейные споры', text: 'Развод, алименты, раздел имущества' },
  { n: 2, title: 'Земля и жильё', text: 'Приватизация, разрешение на строительство' },
  { n: 3, title: 'Трудовые и арбитражные споры', text: 'Претензии, иски, представительство в суде' },
  { n: 4, title: 'Наследство', text: 'Оформление и восстановление сроков' },
]

const prices: PriceItem[] = [
  { title: 'Раздел имущества при разводе', price: 'от 10 000 ₽' },
  { title: 'Разрешение на строительство', price: 'от 10 000 ₽' },
  { title: 'Трудовые споры', price: 'от 10 000 ₽' },
  { title: 'Сопровождение сделок с недвижимостью', price: 'от 5 000 ₽' },
  { title: 'Ведение дел в суде', price: 'от 10 000 ₽' },
]
</script>

<template>
  <section id="legal-services" class="legal-services">
    <div class="container">
      <p class="section-label">Юридические услуги</p>
      <h2 class="legal-services__title">Юрист, который доводит дело до результата</h2>

      <div class="legal-services__grid">
        <div v-for="item in features" :key="item.n" class="feature-card">
          <span class="feature-card__num">{{ item.n }}</span>
          <p class="feature-card__title">{{ item.title }}</p>
          <p class="feature-card__text">{{ item.text }}</p>
        </div>
      </div>

      <div class="price-block">
        <p class="section-label price-block__label">Сколько это стоит</p>
        <ul class="price-list">
          <li v-for="item in prices" :key="item.title">
            <span class="price-list__title">{{ item.title }}</span>
            <span class="price-list__price">{{ item.price }}</span>
          </li>
        </ul>
      </div>

      <div class="cta-block">
        <p class="cta-block__text">Получите план действий по вашей ситуации</p>
        <a href="#form" class="btn btn-gold">Получить консультацию</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.legal-services {
  background: var(--c-white);
  padding: 40px 0;
}
.legal-services__title {
  font-size: 26px;
  line-height: 32px;
  padding: 0 16px;
  margin-bottom: 20px;
}

.legal-services__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  padding: 0 16px;
  margin-bottom: 24px;
}
.feature-card {
  padding: 16px;
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  background: var(--c-white);
  box-shadow: var(--shadow-md);
}
.feature-card__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--c-surface);
  color: var(--c-navy);
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 10px;
}
.feature-card__title {
  font-weight: 700;
  font-size: 15px;
  color: var(--c-text);
  margin: 0 0 4px;
}
.feature-card__text {
  font-size: 13px;
  line-height: 18px;
  color: var(--c-text-muted);
  margin: 0;
}

.price-block {
  padding: 0 16px;
  margin-bottom: 24px;
}
.price-block__label {
  padding: 0;
}
.price-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid var(--c-border);
}
.price-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  background: var(--c-white);
}
.price-list__title {
  font-size: 14px;
  color: var(--c-text-body);
}
.price-list__price {
  font-weight: 700;
  font-size: 14px;
  color: var(--c-gold-text);
  white-space: nowrap;
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
  .legal-services {
    padding: 80px 0;
  }
  .legal-services__title {
    padding: 0;
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 32px;
  }
  .legal-services__grid {
    padding: 0;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .feature-card {
    padding: 24px;
  }
  .price-block {
    padding: 0;
    margin-bottom: 40px;
    max-width: 720px;
  }
  .price-list li {
    padding: 16px 24px;
  }
  .price-list__title {
    font-size: 15px;
  }
  .price-list__price {
    font-size: 15px;
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
