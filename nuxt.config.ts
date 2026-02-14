// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'vuetify-nuxt-module',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})