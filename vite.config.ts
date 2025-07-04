import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import Components from 'unplugin-vue-components/vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  base: '/pokepedia-pages/',
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    vueJsx(),
    vueDevTools(),
    vuetify({ autoImport: true }),
    Components({ dirs: 'src/components', dts: true }),
    quasar({
      sassVariables: fileURLToPath(new URL('./src/quasar-variables.sass', import.meta.url)),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@images': fileURLToPath(new URL('./Pokemon/assets/images', import.meta.url)),
    },
  },
})
