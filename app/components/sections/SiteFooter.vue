<script setup lang="ts">
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <AppLogo :size="26" text-color="#FFFFFF" />
          <p class="footer__tagline">Юридическая компания в Краснодаре</p>
        </div>

        <div class="footer__contacts">
          <div class="footer__block">
            <p>Краснодар, ул. Дзержинского, 8/1</p>
            <p><a href="tel:+79094661166">+7 (909) 466-11-66</a></p>
          </div>

          <div class="footer__block">
            <p><a href="mailto:dovod23@mail.ru">dovod23@mail.ru</a></p>
            <p>Пн–Пт 9:00–19:00</p>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__requisites">
          ООО «ДОВОД» · 350020, Россия, г. Краснодар, ул. Дзержинского, 8/1 · ИНН 2308306274 · КПП 230801001 · ОКПО 93399041
        </p>

        <div class="footer__links">
          <NuxtLink to="/policy">Политика конфиденциальности</NuxtLink>
          <span>·</span>
          <NuxtLink to="/policy">Согласие на обработку ПД</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--c-navy-deep);
  color: var(--c-white);
  padding: 32px 0 24px;
}
.footer :deep(.container) {
  padding: 0 16px;
}
.footer__tagline {
  margin: 12px 0 20px;
  font-size: 15px;
  color: var(--c-text-on-dark);
}
.footer__block {
  margin-bottom: 16px;
}
.footer__block p {
  margin: 0 0 4px;
  font-size: 14px;
  color: var(--c-text-on-dark);
}
.footer__block a {
  color: var(--c-white);
  font-weight: 600;
}
.footer__requisites {
  font-size: 12px;
  line-height: 18px;
  color: rgba(217, 227, 239, .7);
  margin: 20px 0 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, .12);
}
.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;
}
.footer__links a {
  color: var(--c-gold-light);
}
.footer__links span {
  color: rgba(217, 227, 239, .5);
}

@media (min-width: 1024px) {
  .footer {
    padding: 48px 0 32px;
  }
  .footer__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
  }
  .footer__brand {
    max-width: 340px;
  }
  .footer__contacts {
    display: flex;
    gap: 64px;
  }
  .footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, .12);
  }
  .footer__requisites {
    margin: 0;
    padding-top: 0;
    border-top: none;
    max-width: 720px;
  }
  .footer__links {
    flex-shrink: 0;
  }
}
</style>
