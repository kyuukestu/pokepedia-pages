<script setup lang="ts">
import MasterNav from '@/components/navigation/MasterNav.vue'
</script>

<template>
  <v-app>
    <MasterNav />
    <v-main>
      <v-container fluid class="py-1 px-1">
        <!-- has max-width unless you override it -->
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
