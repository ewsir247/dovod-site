<script setup lang="ts">
</script>

<template>
  <section class="hero">
    <div class="container hero__inner">
      <div class="hero__left">
        <span class="hero__badge only-desktop">Юридическая и экспертная компания · Краснодар</span>
        <h1 class="hero__title">Юридическая и экспертная помощь в Краснодаре</h1>
        <p class="hero__subtitle">Гражданские, семейные и арбитражные дела, независимая оценка и судебная экспертиза с 2014 года.</p>

        <div class="hero__actions">
          <a href="#form" class="btn btn-gold btn-block">Получить консультацию</a>
          <a href="tel:+79094661166" class="btn btn-outline-navy btn-block">
            <PhoneIcon :size="18" />
            Позвонить +7 (909) 466-11-66
          </a>
        </div>

        <ul class="hero__list">
          <li>
            <span class="hero__check"><CheckIcon :size="16" /></span>
            Консультация — бесплатно
          </li>
          <li>
            <span class="hero__check"><CheckIcon :size="16" /></span>
            Ответ за 15 минут
          </li>
        </ul>
      </div>

      <div class="hero__right only-desktop">
        <ConsultForm variant="hero" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: var(--c-cream);
  padding: 32px 0 40px;
}
.hero__title {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: var(--c-navy);
  margin: 0 0 12px;
  padding: 0 16px;
}
.hero__subtitle {
  font-size: 17px;
  line-height: 26px;
  color: var(--c-text-muted);
  margin: 0 0 24px;
  padding: 0 16px;
}
.hero__actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
  margin-bottom: 20px;
}
.hero__list {
  list-style: none;
  margin: 0;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.hero__list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  color: var(--c-navy);
}
.hero__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--c-gold-light);
  color: var(--c-navy-deep);
  flex-shrink: 0;
}

.hero__right {
  display: none;
}

@media (min-width: 1024px) {
  .hero {
    padding: 80px 0;
  }
  .hero__inner {
    display: flex;
    align-items: flex-start;
    gap: 80px;
  }
  .hero__left {
    width: 640px;
    display: flex;
    flex-direction: column;
  }
  .hero__badge {
    order: 0;
    align-self: flex-start;
    margin-bottom: 16px;
    padding: 6px 16px;
    border-radius: var(--r-pill);
    background: var(--c-white);
    border: 1px solid var(--c-gold);
    color: var(--c-gold-text);
    font-size: 13px;
    font-weight: 700;
  }
  .hero__title {
    order: 1;
    padding: 0;
    font-size: 52px;
    line-height: 60px;
    margin: 0 0 16px;
  }
  .hero__subtitle {
    order: 2;
    padding: 0;
    font-size: 19px;
    line-height: 28px;
    margin: 0 0 24px;
  }
  .hero__list {
    order: 3;
    flex-direction: row;
    gap: 28px;
    padding: 0;
    margin-bottom: 32px;
  }
  .hero__actions {
    order: 4;
    flex-direction: row;
    padding: 0;
    margin-bottom: 0;
  }
  .hero__actions .btn {
    width: auto;
  }

  .hero__right {
    display: block;
    width: 480px;
    flex-shrink: 0;
    background: var(--c-white);
    border-radius: var(--r-xl);
    box-shadow: var(--shadow-lg);
    padding: 32px;
  }
}
</style>
