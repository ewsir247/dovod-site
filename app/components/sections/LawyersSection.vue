<script setup lang="ts">
const lawyers = [
  { name: 'Соколова Анна', specialty: 'Семейное право' },
  { name: 'Гриценко Павел', specialty: 'Арбитраж' },
  { name: 'Ковалёв Дмитрий', specialty: 'Уголовное право' },
]
</script>

<template>
  <section class="lawyers">
    <div class="container">
      <h2 class="lawyers__title">Наши юристы</h2>

      <ul class="lawyers__list">
        <li v-for="lawyer in lawyers" :key="lawyer.name">
          <a href="#form" class="lawyer-card">
            <span class="lawyer-card__avatar">
              <UserIcon :size="30" />
            </span>
            <span class="lawyer-card__info">
              <span class="lawyer-card__name">{{ lawyer.name }}</span>
              <span class="lawyer-card__specialty">{{ lawyer.specialty }}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.lawyers {
  background: var(--c-cream);
  padding: 40px 0;
}
.lawyers__title {
  font-size: 26px;
  line-height: 32px;
  padding: 0 16px;
  margin-bottom: 20px;
}
.lawyers__list {
  list-style: none;
  margin: 0;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.lawyer-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: var(--r-lg);
  background: var(--c-white);
  border: 1px solid var(--c-cream-border);
  box-shadow: var(--shadow-md);
}
.lawyer-card__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1.5px dashed var(--c-border-strong);
  color: var(--c-navy);
  flex-shrink: 0;
}
.lawyer-card__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.lawyer-card__name {
  font-weight: 700;
  font-size: 16px;
  color: var(--c-text);
}
.lawyer-card__specialty {
  font-size: 14px;
  color: var(--c-text-muted);
}

@media (min-width: 1024px) {
  .lawyers {
    background: var(--c-white);
    padding: 80px 0;
  }
  .lawyers__title {
    padding: 0;
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 32px;
    text-align: center;
  }
  .lawyers__list {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .lawyer-card {
    flex-direction: column;
    text-align: center;
    gap: 16px;
    padding: 32px 20px;
    background: var(--c-cream);
    border-color: var(--c-cream-border);
  }
  .lawyer-card__avatar {
    width: 96px;
    height: 96px;
  }
  .lawyer-card__info {
    align-items: center;
  }
  .lawyer-card__name {
    font-size: 18px;
  }
}
</style>
