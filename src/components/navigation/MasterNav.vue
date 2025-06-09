<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import sandboxNav from './sandboxNav.vue'
import SyncNav from './syncNav.vue'

const drawer = ref(false)
const theme = useTheme()
const icon = ref('mdi-weather-sunny')

watch(
  () => theme.global.name.value,
  (newValue) => {
    icon.value = newValue === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'
  },
)

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
}
</script>
<template>
  <v-app-bar :elevation="2" color="primary" app density="compact" scroll-behavior="collapse">
    <template v-slot:prepend> <v-app-bar-nav-icon @click.stop="drawer = !drawer" /></template>
    <v-icon @click="toggleTheme">{{ icon }}</v-icon>
    <v-spacer />
  </v-app-bar>

  <v-navigation-drawer v-model="drawer">
    <v-list density="compact">
      <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/" />
      <v-list-item prepend-icon="mdi-information" title="Welcome" value="welcome" to="/welcome" />
      <v-list-item prepend-icon="mdi-chat-question" title="About" value="about" to="/about" />
      <sandboxNav />
      <SyncNav />
    </v-list>
  </v-navigation-drawer>
</template>
