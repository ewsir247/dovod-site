<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Пока открыта форма/клавиатура (фокус на поле ввода), прячем фиксированную панель —
// иначе на телефоне она может перекрывать поля и кнопки формы над клавиатурой.
const hidden = ref(false)

function isFormField(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'
}

function handleFocusIn(event: FocusEvent) {
  if (isFormField(event.target)) hidden.value = true
}

function handleFocusOut(event: FocusEvent) {
  if (isFormField(event.target)) hidden.value = false
}

onMounted(() => {
  document.addEventListener('focusin', handleFocusIn)
  document.addEventListener('focusout', handleFocusOut)
})

onBeforeUnmount(() => {
  document.removeEventListener('focusin', handleFocusIn)
  document.removeEventListener('focusout', handleFocusOut)
})
</script>

<template>
  <nav class="action-bar" :class="{ 'action-bar--hidden': hidden }" aria-label="Быстрые действия">
    <a href="tel:+79094661166" class="action-bar__btn action-bar__btn--filled">
      <PhoneIcon :size="20" />
      <span>Позвонить</span>
    </a>
    <a href="https://wa.me/79094661166" target="_blank" rel="noopener" class="action-bar__btn action-bar__btn--outline">
      <WhatsappIcon :size="20" />
      <span>WhatsApp</span>
    </a>
    <a href="https://max.ru/" target="_blank" rel="noopener" class="action-bar__btn action-bar__btn--outline">
      <MaxIcon :size="20" />
      <span>MAX</span>
    </a>
  </nav>
</template>

<style scoped>
.action-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  display: flex;
  gap: 8px;
  padding: 8px 12px calc(8px + env(safe-area-inset-bottom));
  background: var(--c-white);
  border-top: 1px solid var(--c-border);
  max-width: 480px;
  margin: 0 auto;
  transform: translateY(0);
  transition: transform .15s ease;
}
.action-bar--hidden {
  transform: translateY(100%);
}
.action-bar__btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 52px;
  border-radius: var(--r-md);
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
}
.action-bar__btn--filled {
  background: var(--c-navy);
  color: var(--c-white);
}
.action-bar__btn--outline {
  background: var(--c-white);
  border-color: var(--c-border-strong);
  color: var(--c-navy);
}

@media (min-width: 1024px) {
  .action-bar {
    display: none;
  }
}
</style>
