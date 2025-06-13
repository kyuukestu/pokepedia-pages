<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, required: true },
})
</script>
<template>
  <v-card class="prof-card mb-4" variant="outlined">
    <v-card-title class="text-subtitle-1 font-weight-bold" style="text-align: center">{{
      title
    }}</v-card-title>
    <v-tooltip :text="subtitle" location="top">
      <template v-slot:activator="{ props }">
        <v-card-subtitle style="text-align: center" v-bind="props"> {{ subtitle }}</v-card-subtitle>
      </template>
    </v-tooltip>

    <v-img :src="image" aspect-ratio="16/9" class="prof-img mx-auto" contain />
    <v-divider class="my-4" />
    {{ status }}
    <v-divider class="my-4" />
    <v-card-actions
      ><v-btn class="mx-auto" color="primary" variant="outlined" text="Learn More"
    /></v-card-actions>
  </v-card>
</template>
<style scoped>
.prof-card {
  width: 280px;
  max-width: 280px;
  min-height: 420px;
  border-radius: 16px;
  transition: transform 0.2s ease;
  text-align: center;
}

.prof-card:hover {
  transform: scale(1.1);
}

.prof-img {
  height: 160px;
  aspect-ratio: 16/9;
  object-fit: contain;
  border-radius: 12px;
  margin-top: 8px;
}
</style>
