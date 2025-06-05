import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver, // Check the full list of libraries in the docs
} from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  base: '/pokepedia-pages/',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      imports: [
        // Presets
        'vue',
        'vue-router',
        'vue-i18n',
        'pinia',
        '@vueuse/core',
        'vee-validate',
        // Custom imports
        {
          axios: [
            // Default import
            ['default', 'axios'],
          ],
          '@josempgon/vue-keycloak': [
            // Named imports
            'useKeycloak',
            // Alias
            ['getToken', 'getKeycloakToken'],
          ],
          '@/stores/auth': ['useAuthStore'], // Pinia store import
          '@/composables/serverValidation': [
            'useServerValidation', // Composable import
          ],
        },
        // Only type import
        {
          from: 'vue-router',
          imports: ['RouteLocationRaw'],
          type: true,
        },
      ],
      // Automatically generate types
      dts: true,
      // Auto import inside Vue Template
      vueTemplate: true,
    }),
    Components({
      resolvers: [
        // BUilt-in resolvers
        ElementPlusResolver(),
        // Custom resolvers
        (componentName) => {
          // Where `componentName` is always CapitalCase
          if (['ValidationForm', 'ValidationField'].includes(componentName))
            return { name: componentName.split('Validation')[1], from: 'vee-validate' }
        },
      ],
      dts: true, // Automatically generate types
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
