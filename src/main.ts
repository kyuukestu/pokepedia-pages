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

// Quasar
import { Quasar } from 'quasar'
import * as QComponents from 'quasar'
import quasarIconSet from 'quasar/icon-set/material-icons-round'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import '@quasar/extras/eva-icons/eva-icons.css'
import '@quasar/extras/themify/themify.css'
import '@quasar/extras/line-awesome/line-awesome.css'

import 'quasar/src/css/index.sass'

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

app.use(vuetify)
app.use(createPinia())
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  iconSet: quasarIconSet,
  components: QComponents,
  config: {
    dark: true,
  },
})
app.use(router)

app.mount('#app')
