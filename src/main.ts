import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labcomponents from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  theme: { defaultTheme: 'dark' },
  icons: {
    defaultSet: 'mdi',
  },
  components: {
    ...components,
    ...labcomponents,
  },
  directives,
})

const app = createApp(App)

app.use(vuetify).use(createPinia()).use(router)

app.mount('#app')
