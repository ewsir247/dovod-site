<script setup lang="ts">
</script>

<template>
  <div class="page-loader" role="status" aria-label="Загрузка страницы">
    <div class="page-loader__header">
      <span class="page-loader__logo skeleton" />
      <span class="page-loader__pill skeleton" />
    </div>
    <div class="page-loader__hero">
      <span class="page-loader__line page-loader__line--title skeleton" />
      <span class="page-loader__line page-loader__line--title short skeleton" />
      <span class="page-loader__line page-loader__line--text skeleton" />
      <span class="page-loader__line page-loader__line--button skeleton" />
    </div>
  </div>
</template>

<style scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  background: var(--c-white);
  padding: 16px;
}
.page-loader__header {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}
.page-loader__logo {
  display: block;
  width: 120px;
  height: 28px;
  border-radius: var(--r-md);
}
.page-loader__pill {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: var(--r-md);
}
.page-loader__hero {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 12px;
}
.page-loader__line {
  display: block;
  border-radius: 6px;
}
.page-loader__line--title {
  height: 28px;
  width: 90%;
}
.page-loader__line--title.short {
  width: 65%;
}
.page-loader__line--text {
  height: 16px;
  width: 75%;
  margin-top: 6px;
}
.page-loader__line--button {
  height: 52px;
  width: 100%;
  border-radius: var(--r-md);
  margin-top: 12px;
}

@media (min-width: 1024px) {
  .page-loader {
    padding: 24px 48px;
  }
  .page-loader__line--title {
    width: 45%;
    height: 40px;
  }
  .page-loader__line--title.short {
    width: 30%;
  }
  .page-loader__line--text {
    width: 35%;
  }
  .page-loader__line--button {
    width: 220px;
  }
}
</style>
