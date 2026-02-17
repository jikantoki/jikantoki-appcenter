// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
require('dotenv').config()
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'vuetify-nuxt-module',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    public: {
      // @ts-ignore
      env: process.env,
    },
  },
  ssr: true,
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'system', // これでOSのモードを自動判別します
      },
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: http://ogp.me/ns#',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          property: 'og:image',
          /** 相対パスNGらしいので各自で書き換えること */
          content: 'https://app.enoki.xyz/img/thumbnail.jpg',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        { name: 'apple-mobile-web-app-title', content: 'APP_TITLE' },
        { name: 'theme-color', content: '#000000' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:creator', content: '@jikantoki' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/manifest.json' },
      ],
    },
  },
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
})
