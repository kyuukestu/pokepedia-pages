<script setup lang="ts">
import AppLayout from './layouts/AppLayout.vue'
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid class="py-1 px-1">
        <AppLayout />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
v-responsive {
  background-color: aliceblue;
}
</style>
