// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  components: [
    { path: '~/components/icons', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false },
    '~/components',
  ],
  runtimeConfig: {
    public: {
      // Ключ 2ГИС MapGL для OfficeMap.vue — без него компонент красиво деградирует
      // в fallback-ссылку на 2gis.ru. Задаётся через .env (NUXT_PUBLIC_DGIS_API_KEY)
      // локально и через секрет DGIS_API_KEY в GitHub Actions.
      dgisApiKey: process.env.NUXT_PUBLIC_DGIS_API_KEY || '',
    },
  },
  app: {
    // На GitHub Pages сайт живёт по подпути /dovod-site/, а не в корне домена —
    // без этого стили/скрипты и ссылки на страницы ломались бы. Локально (npm run dev/build)
    // переменная не задана, поэтому там всё работает как раньше, от корня.
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'ДОВОД — юридическая помощь в Краснодаре',
      meta: [
        { name: 'description', content: 'Юридическая компания «Довод» в Краснодаре: ведём дела любой сложности для физических лиц и бизнеса. Бесплатная консультация — ответим за 15 минут.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&family=Raleway:wght@800&display=swap' },
      ],
    },
  },
})
