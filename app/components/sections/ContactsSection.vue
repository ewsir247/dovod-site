<script setup lang="ts">
</script>

<template>
  <section class="contacts">
    <div class="container">
      <h2 class="contacts__title">
        <span class="only-mobile">Контакты</span>
        <span class="only-desktop">Как нас найти</span>
      </h2>

      <ul class="contacts__list">
        <li>
          <MapPinIcon :size="20" />
          <span>Краснодар, ул. Дзержинского, 8/1</span>
        </li>
        <li>
          <PhoneIcon :size="18" />
          <a href="tel:+79094661166">+7 (909) 466-11-66</a>
        </li>
        <li>
          <MailIcon :size="20" />
          <a href="mailto:dovod23@mail.ru">dovod23@mail.ru</a>
        </li>
        <li>
          <ClockIcon :size="20" />
          <span>Пн–Пт 9:00–19:00</span>
        </li>
      </ul>

      <div class="contacts__map">
        <OfficeMap />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contacts {
  background: var(--c-surface);
  padding: 56px 0;
}
.contacts__title {
  font-size: 26px;
  line-height: 32px;
  padding: 0 16px;
  margin-bottom: 20px;
}
.contacts__list {
  list-style: none;
  margin: 0 0 20px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.contacts__list li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: var(--c-text-body);
}
.contacts__list li a {
  color: var(--c-navy);
  font-weight: 600;
}
.contacts__map {
  padding: 0 16px;
}

@media (min-width: 1024px) {
  .contacts {
    background: transparent;
    padding: 96px 0;
  }
  .container {
    max-width: none;
    padding: 0;
  }
  .contacts__title {
    padding: 0;
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 24px;
  }
  .contacts__list {
    padding: 0;
  }
  .contacts__map {
    padding: 0;
  }
}
</style>
