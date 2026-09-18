<script setup lang="ts">
const stats = [
  { value: '12 лет', label: 'на рынке Краснодара' },
  { value: '87%', label: 'выигранных споров' },
  { value: '340 млн ₽', label: 'взыскано для клиентов' },
]
</script>

<template>
  <section class="stats">
    <div class="container">
      <div class="stats__grid">
        <div v-for="item in stats" :key="item.label" class="stats__item">
          <p class="stats__value">{{ item.value }}</p>
          <p class="stats__label">{{ item.label }}</p>
        </div>
      </div>

      <p class="stats__helped only-mobile">
        Уже помогли <strong>1 400</strong> клиентам
      </p>

      <div class="stats__membership">
        <ShieldCheckIcon :size="28" />
        <span>Членство в Адвокатской палате Краснодарского края</span>
      </div>

      <p class="stats__helped-desktop only-desktop">
        Уже помогли <strong>1 400</strong> клиентам решить похожие вопросы — решим и вашу ситуацию.
      </p>
    </div>
  </section>
</template>

<style scoped>
.stats {
  background: var(--c-navy-deep);
  color: var(--c-white);
  padding: 40px 0;
}
.stats__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 0 16px;
  margin-bottom: 24px;
}
.stats__item {
  text-align: center;
}
.stats__value {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 24px;
  color: var(--c-gold);
  margin: 0 0 4px;
}
.stats__label {
  font-size: 13px;
  line-height: 18px;
  color: var(--c-white);
  margin: 0;
}
.stats__helped {
  text-align: center;
  font-size: 17px;
  padding: 0 16px;
  margin: 0 0 24px;
}
.stats__helped strong {
  color: var(--c-gold);
  font-weight: 700;
}
.stats__membership {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 16px;
  padding: 16px;
  border-radius: var(--r-lg);
  background: rgba(255, 255, 255, .06);
  color: var(--c-text-on-dark);
  font-size: 14px;
  line-height: 20px;
}
.stats__helped-desktop {
  text-align: center;
  margin: 24px 0 0;
}

@media (min-width: 1024px) {
  .stats {
    padding: 80px 0;
  }
  .stats__grid {
    padding: 0;
    margin-bottom: 40px;
    gap: 24px;
  }
  .stats__value {
    font-size: 52px;
    line-height: 56px;
  }
  .stats__label {
    font-size: 15px;
  }
  .stats__membership {
    margin: 0;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
  }
  .stats__helped-desktop {
    font-size: 17px;
  }
}
</style>
