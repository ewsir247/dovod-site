<script setup lang="ts">
</script>

<template>
  <section id="form" class="form-section">
    <div class="container">
      <h2 class="form-section__title">Бесплатная первичная консультация</h2>
      <p class="form-section__subtitle">Ответим в течение 15 минут в рабочее время</p>

      <ConsultForm />
    </div>
  </section>
</template>

<style scoped>
.form-section {
  background: var(--c-white);
  padding: 40px 0;
}
.form-section__title {
  font-size: 26px;
  line-height: 32px;
  padding: 0 16px;
  margin-bottom: 8px;
}
.form-section__subtitle {
  padding: 0 16px;
  margin: 0 0 24px;
  font-size: 15px;
  color: var(--c-text-muted);
}
.form-section :deep(.consult-form) {
  padding: 0 16px;
}

@media (min-width: 1024px) {
  .form-section {
    background: transparent;
    padding: 80px 0 80px;
  }
  .container {
    max-width: none;
    padding: 0;
  }
  .form-section__title {
    padding: 0;
    font-size: 32px;
    line-height: 40px;
  }
  .form-section__subtitle {
    padding: 0;
  }
  .form-section :deep(.consult-form) {
    padding: 32px;
    background: var(--c-white);
    border-radius: var(--r-xl);
    box-shadow: var(--shadow-md);
  }
}
</style>
