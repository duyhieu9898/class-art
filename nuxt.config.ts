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
      title: 'REF Academy - Đà Nẵng',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Chuyên Dạy Thiết kế đồ hoạ, Photoshop, Illustrator, Digital Game, Minh Hoạ Truyện Tranh, Vẽ Fashion',
        },
        {
          property: '"og:image',
          content: 'https://https://www.refacademy.art/og.png',
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
