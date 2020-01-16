const colors = require('vuetify/es5/util/colors').default;
module.exports = {
  mode: 'universal',
  srcDir: 'src',
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#0ff', continuous: true, height: '5px' },
  css: [],
  plugins: [
    { src: '~/plugins/fireAuth' },
    { src: '~/plugins/localStorage.js', ssr: false }
  ],
  buildModules: ['@nuxtjs/vuetify'],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap'
  ],
  /*
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
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
          success: colors.green.accent3
        }
      }
    }
  },
  sitemap: {
    //https://github.com/nuxt-community/sitemap-module
    hostname: 'https://ssr-test-afbfd.firebaseapp.com',
    gzip: true,
    exclude: ['/admin/**'],
    async routes() {
      const { db } = require('./services/fireInit');
      return []; //remove this line once db calls are in place.
    }
  },
  build: {
    extractCSS: true,
    //publicPath: '/',
    extend(config, ctx) {}
  }
};
