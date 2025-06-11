<template>
  <v-list dense>
    <v-list-item v-for="(item, i) in items" :key="i">
      <v-icon start color="{{ color }}">{{ icon }}</v-icon>
      {{ item }}
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
defineProps({ items: Array, icon: String, color: String })
</script>
