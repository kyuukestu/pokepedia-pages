import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import VueRouter from 'unplugin-vue-router/vite'
// https://vite.dev/config/

export default defineConfig({
  base: '/pokepedia-pages/',
  plugins: [
    VueRouter({
      // Use resolve to create an absolute path to your views
      routesFolder: resolve(__dirname, 'src/views'),
      dts: './typed-router.d.ts',
      extensions: ['.vue'],
    }),
    vue(),
    vueJsx(),
    vueDevTools(),
    vuetify({ autoImport: true }),
    Components({ dirs: 'src/components', dts: true, resolvers: [PrimeVueResolver()] }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
