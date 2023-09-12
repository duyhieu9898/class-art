// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    storage: {
      data: { driver: 'vercelKV' },
    },
  },
  devtools: { enabled: false },
  app: {
    head: {
      title: 'REF Studio - Dạy Vẽ máy',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Dạy Vẽ Digital Game (vẽ tranh trên máy tính dành cho người mới)',
        },
      ],
      link: [
        {
          rel: 'shortcut icon',
          type: 'image/png',
          href: '/favicon.png',
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
    domains: ['https://class-art.vercel.app'],
    dir: 'public/images',
  },
  // auto import components
  components: true,
})
