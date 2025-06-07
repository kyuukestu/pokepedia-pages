<script setup lang="ts">
import { defineProps } from 'vue'
import { ref } from 'vue'

defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
})
</script>
<template>
  <!-- <v-overlay
    activator=""
    location-strategy="connected"
    scroll-strategy="none"
    :model-value="isActive"
  >
  </v-overlay> -->
  Welcome Page maaybe
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  display: flex;
  flex-flow: column nowrap;
}

section {
  padding: 10px;
}

section p {
  padding: 10px;
}
</style>
