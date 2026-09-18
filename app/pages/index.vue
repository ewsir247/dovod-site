<script setup lang="ts">
</script>

<template>
  <div class="page fade-in">
    <AppHeaderBar />
    <main>
      <HeroSection />
      <DirectionsSection />
      <StatsSection />
      <LawyersSection />
      <ReviewsSection />
      <div id="contact" class="contact-block">
        <ContactsSection />
        <FormSection />
      </div>
    </main>
    <SiteFooter />
    <MobileActionBar />
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 76px;
}

@media (min-width: 1024px) {
  .page {
    padding-bottom: 0;
  }
  .contact-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    background: var(--c-surface);
  }
}
</style>
