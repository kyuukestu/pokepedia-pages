<template>
  <v-list-item>
    <v-list-item-content>
      <strong>Step {{ stepNumber }}: {{ title }}</strong
      ><br />
      <slot />
    </v-list-item-content>
  </v-list-item>
</template>

<script setup lang="ts">
defineProps({
  stepNumber: Number,
  title: String,
})
</script>
