/*
 * @Author: your name
 * @Date: 2021-08-27 14:38:07
 * @LastEditTime: 2021-09-23 20:39:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/nuxt.config.js
 */

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'δΈζζθ²',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/reset.css' }
    ]
  },
  loading: false,
  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: [
  //   'element-ui/lib/theme-chalk/index.css'
  // ],
  target: 'static',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios.js'
    
  ],
  // dev: (process.env.NODE_ENV !== 'production'),

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],
  publicRuntimeConfig: {
    axios: {
      baseURL: 'http://120.24.180.140:8888/'
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    },
    // transpile: [/^element-ui/],
  },
  server: {
    port: 8090, // default: 3000
    host: '0.0.0.0' // default: localhost
   }
}
