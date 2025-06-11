<template>
  <v-card class="mb-4" variant="outlined">
    <v-card-title class="text-subtitle-1 font-weight-bold">{{ title }}</v-card-title>
    <v-card-subtitle> {{ subtitle }}</v-card-subtitle>
    <v-img :src="image" cover aspect-ratio="16/9" class="mx-auto" />
    <v-divider class="my-4" />
    <v-card-text>{{ description }}</v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
  description: String,
  image: String,
})
</script>
