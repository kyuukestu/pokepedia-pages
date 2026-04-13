<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
  // Capture the segment (npc or oc) from the URL
  const catParam = (route.params as { redirectCat?: string }).redirectCat as string

  // Format it to match your Directory's expected query (e.g., 'NPC' or 'OC')
  const formattedCat = catParam.toUpperCase()

  router.replace({
    path: '/sandbox/characters',
    query: { cat: formattedCat },
  })
})
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-progress-circular indeterminate color="primary" size="64" />
  </v-container>
</template>
