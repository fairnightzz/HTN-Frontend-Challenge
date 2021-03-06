import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - HackTheNorth Frontend Challenge',
    title: 'Home',
    // Important for nice looking metadata
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Hack the North is Canada’s biggest hackathon, happening January 15-17, 2021. With 36 hours of mentorship, resources, and unique experiences, we want to make it easy for anyone to dream big.' },
      { hid: 'og:image', property: 'og:image', content: '/cover.png' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'keywords', name: 'keywords', content: 'HackTheNorth, computer science, programming, software, development, uwaterloo, hackathon' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // Persistent State attempt
  plugins: [
    { src: '~/plugins/persistedState.client.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // graphql
    'nuxt-graphql-request'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa', '@nuxtjs/sitemap'
  ],

  router: {
    middleware: ['auth']
  },

  // For sending queries/mutations to the backend
  graphql: {
    clients: {
      default: {
        endpoint: 'https://api.hackthenorth.com/v3/graphql',
        options: {}
      },
      secondClient: {
        endpoint: 'https://htn.zhehaizhang.com/graphql',
        options: {}
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // For theme modification and dark/light theme
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          workshop: colors.green.darken1,
          tech_talk: colors.orange.darken1,
          activity: colors.blue.darken1
        },
        light: {
          primary: colors.blue.lighten2,
          accent: colors.grey.lighten3,
          secondary: colors.amber.lighten3,
          info: colors.teal.darken1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          workshop: colors.green.lighten1,
          tech_talk: colors.orange.lighten1,
          activity: colors.blue.lighten1
        }
      }
    }
  },
  // Listening on different port
  server: {
    port: 8000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
