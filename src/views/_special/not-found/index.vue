<script setup lang="ts">
// Route: /:pathMatch(.*)*
// Catch-all 404 page.
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <v-container fluid class="pa-0">
    <v-container max-width="600" class="py-16 text-center">
      <v-icon size="80" color="grey-lighten-1" class="mb-6">mdi-pokeball</v-icon>
      <h1 class="text-h4 font-weight-bold mb-3">Page Not Found</h1>
      <p class="text-body-1 text-medium-emphasis mb-8">
        That path doesn't exist — it may have moved or never existed.
      </p>
      <v-btn color="primary" variant="flat" rounded="lg" @click="router.push('/')">
        Back to Home
      </v-btn>
    </v-container>
  </v-container>
</template>
