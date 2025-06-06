<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
}

const drawer = ref(true)
const open = ref([])
</script>
<template>
  <v-navigation-drawer v-model="drawer" rail expand-on-hover>
    <v-list density="compact" nav v-model:opened="open">
      <v-list-item title="Sidebar">
        <template v-slot:prepend>
          <v-icon @click="toggleTheme">{{
            theme.global.name.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          }}</v-icon>
        </template>
      </v-list-item>

      <v-divider />

      <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" to="/" />
      <v-list-item prepend-icon="mdi-information" title="Welcome" value="welcome" to="/welcome" />
      <v-list-group prepend-icon="mdi-menu" value="toc">
        <template v-slot:activator="{ props }">
          <v-list-item title="Table of Contents" value="tac" v-bind="props" />
        </template>
        <v-list-item title="home" value="home" to="/" />
        <v-list-item title="about" value="about" to="/about" />
        <v-list-item title="404" value="404" to="/404" />
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>
