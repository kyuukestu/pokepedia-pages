<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onBeforeMount(() => {
  // Redirect back to the main directory with the filter applied
  router.replace({
    path: '/sandbox/characters',
    query: { cat: 'NPC' }, // Change to 'OC' for the other file
  })
})
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-progress-circular indeterminate color="primary" />
  </v-container>
</template>
