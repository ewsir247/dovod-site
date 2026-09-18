<script setup lang="ts">
import type { Component } from 'vue'
import FamilyIcon from '~/components/icons/FamilyIcon.vue'
import InheritanceIcon from '~/components/icons/InheritanceIcon.vue'
import DebtIcon from '~/components/icons/DebtIcon.vue'
import WaterDropIcon from '~/components/icons/WaterDropIcon.vue'
import ScaleIcon from '~/components/icons/ScaleIcon.vue'
import CoinsIcon from '~/components/icons/CoinsIcon.vue'
import BuildingIcon from '~/components/icons/BuildingIcon.vue'

interface Direction {
  title: string
  icon: Component
}

const personalDirections: Direction[] = [
  { title: 'Развод и раздел имущества', icon: FamilyIcon },
  { title: 'Наследство и завещания', icon: InheritanceIcon },
  { title: 'Долги и банкротство', icon: DebtIcon },
  { title: 'Залили соседи', icon: WaterDropIcon },
]

const businessDirections: Direction[] = [
  { title: 'Арбитражные споры', icon: ScaleIcon },
  { title: 'Взыскание долгов', icon: CoinsIcon },
  { title: 'Банкротство компаний', icon: BuildingIcon },
  { title: 'Уголовные дела', icon: ScaleIcon },
]
</script>

<template>
  <section id="services" class="directions">
    <div class="container">
      <h2 class="directions__title">С чем к нам приходят</h2>

      <p class="section-label">Физическим лицам</p>
      <div class="directions__grid">
        <a v-for="item in personalDirections" :key="item.title" href="#form" class="direction-card">
          <span class="direction-card__icon">
            <component :is="item.icon" :size="22" />
          </span>
          <span class="direction-card__text">{{ item.title }}</span>
        </a>
      </div>

      <p class="section-label directions__label-business">Бизнесу</p>
      <div class="directions__grid">
        <a v-for="item in businessDirections" :key="item.title" href="#form" class="direction-card">
          <span class="direction-card__icon">
            <component :is="item.icon" :size="22" />
          </span>
          <span class="direction-card__text">{{ item.title }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.directions {
  background: var(--c-white);
  padding: 40px 0;
}
.directions__title {
  font-size: 26px;
  line-height: 32px;
  padding: 0 16px;
  margin-bottom: 20px;
}
.section-label {
  padding: 0 16px;
}
.directions__label-business {
  margin-top: 8px;
}
.directions__grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 16px;
  margin-bottom: 8px;
}
.direction-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  background: var(--c-white);
  box-shadow: var(--shadow-md);
}
.direction-card:hover {
  border-color: var(--c-border-strong);
}
.direction-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--c-surface);
  color: var(--c-navy);
  flex-shrink: 0;
}
.direction-card__text {
  font-weight: 600;
  font-size: 16px;
  color: var(--c-text);
}

@media (min-width: 1024px) {
  .directions {
    padding: 80px 0;
  }
  .directions__title {
    padding: 0;
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 32px;
  }
  .section-label {
    padding: 0;
    font-size: 14px;
  }
  .directions__label-business {
    margin-top: 32px;
  }
  .directions__grid {
    padding: 0;
    gap: 16px;
    margin-bottom: 0;
  }
  .directions__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .directions__label-business + .directions__grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .direction-card {
    flex-direction: column;
    text-align: center;
    gap: 12px;
    padding: 24px 16px;
  }
  .direction-card__text {
    font-size: 15px;
  }
}
</style>
