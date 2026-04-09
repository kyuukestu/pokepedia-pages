import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/pokepedia-pages/',
  plugins: [
    VueRouter({
      dts: './typed-router.d.ts',
      routesFolder: 'src/views',
      extensions: ['vue'],
    }),
    vue(),
    vueJsx(),
    vueDevTools(),
    vuetify({ autoImport: true }),
    Components({ dirs: 'src/components', dts: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
      fs: 'src/utils/empty-module.js',
    },
  },
  assetsInclude: ['**/*.wasm'],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    fs: {
      strict: false,
    },
  },
  optimizeDeps: {
    exclude: ['sql.js', 'fs', 'sqlite3', 'vue-router/auto-routes', 'unplugin-vue-router'], // Exclude sql.js and Node.js modules
  },
})
