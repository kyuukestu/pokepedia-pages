<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
})
</script>
<template>
  <v-container fluid class="mb-8 section-container">
    <v-row dense>
      <v-col :cols="12">
        <h3 class="text-h5 font-weight-bold mb-2 section-header section-title">{{ title }}</h3>
      </v-col>
      <p v-if="subtitle" class="mb-2 section-subtitle">{{ subtitle }}</p>
      <v-col :cols="12">
        <slot class="section-text" />
      </v-col>
    </v-row>
    <v-divider class="my-4" />
  </v-container>
</template>
<style scoped>
.section-container {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 16px;
  background-color: var(--v-theme-surface);
  color: var(--v-theme-on-surface);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--v-theme-on-surface);
  text-align: center;
}

.section-subtitle {
  font-size: 1rem;
  color: var(--v-theme-on-surface);
  opacity: 0.7;
  text-align: center;
}

.section-header {
  margin-bottom: 1rem;
}

h1,
h2,
.title {
  font-family: 'Sora', sans-serif;
}

h3,
h4,
.subtitle {
  font-family: 'Work Sans', sans-serif;
}

body,
p,
.text {
  font-family: 'Open Sans', sans-serif;
}
</style>
