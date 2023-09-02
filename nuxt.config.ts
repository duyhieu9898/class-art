// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Vuogle',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Vuogle',
        },
      ],
    },
  },
  modules: [
    'nuxt-windicss',
    '@nuxtjs/eslint-module',
    'nuxt-icon',
    'nuxt-headlessui',
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  // Optionally change the default prefix.
  headlessui: {
    prefix: 'Headless',
  },
  // nuxt image
  image: {
    domains: ['http://localhost:3000'],
    dir: 'assets/images',
  },
  // auto import components
  components: true,
})