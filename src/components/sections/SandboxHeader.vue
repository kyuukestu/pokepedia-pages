<script setup lang="ts">
defineProps({
  theme: {
    type: Object,
    required: true,
  },
})

// TODO: Carousel of images behind the header?
</script>
<template>
  <v-card class="mx-auto mb-8" elevation="8" rounded="lg">
    <v-card-text class="text-center text-primary py-12">
      <v-icon size="72" class="mb-4"> mdi-pokeball </v-icon>
      <h1 class="text-h3 font-weight-bold mb-2">Welcome to the Sandbox!</h1>
      <p class="text-h6">Adventure awaits!</p>
    </v-card-text>
  </v-card>
</template>
<style scoped></style>
