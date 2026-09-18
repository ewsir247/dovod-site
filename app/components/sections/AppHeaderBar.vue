<script setup lang="ts">
</script>

<template>
  <div class="topbar">
    <div class="container topbar__inner">
      <div class="topbar__left">
        <a class="topbar__phone" href="tel:+79094661166">
          <PhoneIcon :size="14" />
          <span>+7 (909) 466-11-66</span>
        </a>
        <a class="topbar__icon" href="https://wa.me/79094661166" target="_blank" rel="noopener" aria-label="Написать в WhatsApp">
          <WhatsappIcon :size="15" />
        </a>
        <a class="topbar__icon" href="https://max.ru/" target="_blank" rel="noopener" aria-label="Написать в MAX">
          <MaxIcon :size="15" />
        </a>
      </div>
      <div class="topbar__hours">
        <ClockIcon :size="14" />
        <span>Пн–Пт 9:00–19:00</span>
      </div>
    </div>
  </div>

  <header class="header">
    <div class="container header__inner">
      <AppLogo :size="28" class="header__logo header__logo--mobile" />
      <AppLogo :size="38" class="header__logo header__logo--desktop" />

      <nav class="header__nav" aria-label="Основное меню">
        <a href="#services">Услуги</a>
        <a href="#contact">Контакты</a>
      </nav>

      <div class="header__actions">
        <a class="icon-btn" href="tel:+79094661166" aria-label="Позвонить">
          <PhoneIcon :size="20" />
        </a>
        <a class="icon-btn" href="https://wa.me/79094661166" target="_blank" rel="noopener" aria-label="Написать в WhatsApp">
          <WhatsappIcon :size="20" />
        </a>
        <a class="icon-btn" href="https://max.ru/" target="_blank" rel="noopener" aria-label="Написать в MAX">
          <MaxIcon :size="20" />
        </a>
        <button type="button" class="icon-btn" aria-label="Меню">
          <MenuIcon :size="22" />
        </button>
      </div>

      <div class="header__desktop-actions">
        <a class="header__phone" href="tel:+79094661166">+7 (909) 466-11-66</a>
        <a class="btn btn-gold" href="#contact">Бесплатная консультация</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  display: none;
}

.header {
  height: 64px;
  background: var(--c-white);
  border-bottom: 1px solid var(--c-border);
  position: sticky;
  top: 0;
  z-index: 20;
}
.header__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
.header__logo--desktop {
  display: none;
}
.header__nav {
  display: none;
}
.header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.header__desktop-actions {
  display: none;
}
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  background: var(--c-white);
  color: var(--c-navy);
  cursor: pointer;
}
.icon-btn:hover {
  border-color: var(--c-border-strong);
}

@media (min-width: 1024px) {
  .topbar {
    display: block;
    height: 44px;
    background: var(--c-navy);
    color: var(--c-text-on-dark);
  }
  .topbar__inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
  }
  .topbar__left {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .topbar__phone,
  .topbar__hours {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--c-text-on-dark);
  }
  .topbar__phone:hover {
    color: var(--c-white);
  }
  .topbar__icon {
    display: inline-flex;
    color: var(--c-text-on-dark);
  }
  .topbar__icon:hover {
    color: var(--c-white);
  }

  .header {
    height: 88px;
  }
  .header__inner {
    padding: 0 24px;
  }
  .header__logo--mobile {
    display: none;
  }
  .header__logo--desktop {
    display: flex;
  }
  .header__nav {
    display: flex;
    align-items: center;
    gap: 32px;
  }
  .header__nav a {
    font-weight: 600;
    font-size: 15px;
    color: var(--c-navy);
  }
  .header__nav a:hover {
    color: var(--c-blue);
  }
  .header__actions {
    display: none;
  }
  .header__desktop-actions {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .header__phone {
    font-weight: 700;
    font-size: 22px;
    color: var(--c-navy);
  }
  .header__phone:hover {
    color: var(--c-blue);
  }
}
</style>
