<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
})
</script>
<template>
  <v-card class="permit-card mb-4" variant="outlined">
    <v-card-title class="text-subtitle-1 font-weight-bold" style="text-align: center">{{
      title
    }}</v-card-title>
    <v-card-subtitle style="text-align: center"> {{ subtitle }}</v-card-subtitle>
    <v-img :src="image" aspect-ratio="16/9" class="permit-img mx-auto" />
    <v-divider class="my-4" />
    <v-card-text style="text-align: center">{{ description }}</v-card-text>
    <v-divider class="my-6" />
    <v-card-actions
      ><v-btn class="mx-auto" color="primary" variant="outlined" text="Learn More"
    /></v-card-actions>
  </v-card>
</template>
<style scoped>
.permit-card {
  width: 280px;
  max-width: 280px;
  min-height: 420px;
  border-radius: 16px;
  transition: transform 0.2s ease;
}

.permit-card:hover {
  transform: scale(1.1);
}

.permit-img {
  height: 160px;
  object-fit: contain;
  border-radius: 12px;
  margin-top: 8px;
}
</style>
