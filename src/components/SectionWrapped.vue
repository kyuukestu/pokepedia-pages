<template>
  <section class="mb-8">
    <h3 class="text-h5 font-weight-bold mb-2">{{ title }}</h3>
    <p v-if="subtitle" class="mb-2">{{ subtitle }}</p>
    <slot />
    <v-divider class="my-4" />
  </section>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
})
</script>
