<script setup lang="ts">
import { onBeforeUnmount, ref, useId, watch } from 'vue'

// Мобильное меню — раньше кнопка "Меню" была чисто декоративной (без обработчика
// и без самого меню в разметке). Теперь по клику открывается overlay-панель (drawer)
// с теми же пунктами навигации, что на десктопе, плюс контакты.
const menuId = useId()
const isMenuOpen = ref(false)

function closeMenu() {
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

// Блокируем скролл body, пока меню открыто, чтобы фон не скроллился под панелью.
watch(isMenuOpen, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    document.addEventListener('keydown', onKeydown)
  } else {
    document.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
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
        <button
          type="button"
          class="icon-btn"
          :aria-expanded="isMenuOpen"
          :aria-controls="menuId"
          aria-label="Меню"
          @click="toggleMenu"
        >
          <MenuIcon :size="22" />
        </button>
      </div>

      <div class="header__desktop-actions">
        <a class="header__phone" href="tel:+79094661166">+7 (909) 466-11-66</a>
        <a class="btn btn-gold" href="#contact">Бесплатная консультация</a>
      </div>
    </div>
  </header>

  <Transition name="mobile-menu-backdrop">
    <div v-if="isMenuOpen" class="mobile-menu__backdrop" @click="closeMenu" />
  </Transition>
  <Transition name="mobile-menu-panel">
    <nav
      v-if="isMenuOpen"
      :id="menuId"
      class="mobile-menu"
      aria-label="Мобильное меню"
    >
      <div class="mobile-menu__head">
        <AppLogo :size="26" />
        <button type="button" class="icon-btn" aria-label="Закрыть меню" @click="closeMenu">
          <CloseIcon :size="20" />
        </button>
      </div>

      <div class="mobile-menu__links">
        <a href="#services" @click="closeMenu">Услуги</a>
        <a href="#contact" @click="closeMenu">Контакты</a>
      </div>

      <div class="mobile-menu__contacts">
        <a class="mobile-menu__phone" href="tel:+79094661166" @click="closeMenu">
          <PhoneIcon :size="18" />
          <span>+7 (909) 466-11-66</span>
        </a>
        <div class="mobile-menu__icons">
          <a class="icon-btn" href="https://wa.me/79094661166" target="_blank" rel="noopener" aria-label="Написать в WhatsApp" @click="closeMenu">
            <WhatsappIcon :size="20" />
          </a>
          <a class="icon-btn" href="https://max.ru/" target="_blank" rel="noopener" aria-label="Написать в MAX" @click="closeMenu">
            <MaxIcon :size="20" />
          </a>
        </div>
        <p class="mobile-menu__hours">
          <ClockIcon :size="14" />
          <span>Пн–Пт 9:00–19:00</span>
        </p>
      </div>

      <a href="#form" class="btn btn-gold btn-block" @click="closeMenu">Бесплатная консультация</a>
    </nav>
  </Transition>
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

.mobile-menu__backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(15, 37, 64, .5);
}
.mobile-menu-backdrop-enter-active,
.mobile-menu-backdrop-leave-active {
  transition: opacity .2s ease;
}
.mobile-menu-backdrop-enter-from,
.mobile-menu-backdrop-leave-to {
  opacity: 0;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 41;
  width: min(320px, 84vw);
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px 20px calc(20px + env(safe-area-inset-bottom));
  background: var(--c-white);
  box-shadow: var(--shadow-lg);
  overflow-y: auto;
}
.mobile-menu-panel-enter-active,
.mobile-menu-panel-leave-active {
  transition: transform .25s ease;
}
.mobile-menu-panel-enter-from,
.mobile-menu-panel-leave-to {
  transform: translateX(100%);
}
.mobile-menu__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mobile-menu__links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mobile-menu__links a {
  padding: 12px 4px;
  border-bottom: 1px solid var(--c-border);
  font-weight: 600;
  font-size: 17px;
  color: var(--c-navy);
}
.mobile-menu__contacts {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--c-border);
}
.mobile-menu__phone {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 18px;
  color: var(--c-navy);
}
.mobile-menu__icons {
  display: flex;
  gap: 8px;
}
.mobile-menu__hours {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 13px;
  color: var(--c-text-muted);
}

@media (min-width: 1024px) {
  .mobile-menu__backdrop,
  .mobile-menu {
    display: none;
  }

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
