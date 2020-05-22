export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Exposition Gobelins',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Gobelins showcase 2020' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700,900,400italic,700italic' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lora:400,400italic,700,700italic' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/style.scss',
  ],
  styleResources: {
    scss: [
      'assets/styles/0-settings/_settings-color.scss',
      'assets/styles/0-settings/_settings-media.scss',
      'assets/styles/0-settings/_settings-mixins.scss',
      'assets/styles/0-settings/_settings-typography.scss',
      'assets/styles/0-settings/_settings-miscellaneous.scss',
      'assets/styles/3-utilities/_utilities-link.scss',
    ],
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~/plugins/three', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // mofules for full static before `nuxt export` (coming in v2.12)
    '@/modules/static',
    '@/modules/crawler',
    '@nuxtjs/style-resources',
    // https://prismic-nuxt.js.org/
    '@nuxtjs/prismic'
  ],

  prismic: {
    endpoint: 'https://expo-gobelins.cdn.prismic.io/api/v2',
    linkResolver: '@/plugins/link-resolver',
    htmlSerializer: '@/plugins/html-serializer',
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // to transform link with <nuxt-link> for the htmlSerializer
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    },
  },

  generate: {
    fallback: '404.html' // Netlify reads a 404.html, Nuxt will load as an SPA
  }
}
