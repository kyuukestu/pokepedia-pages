<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useCharacterStore } from '@/stores/characterStore'

// These props come directly from the router's :params
const props = defineProps<{
  category: string
  id: string
  subpage?: string
}>()

const store = useCharacterStore()

// This function runs whenever the URL changes
const loadData = () => {
  store.fetchCharacter(props.category, props.id, props.subpage)
}

onMounted(loadData)

// Watch the route params. If the user clicks a different character
// or tab, the store re-fetches the new data automatically.
watch(() => [props.id, props.subpage], loadData)
</script>

<template>
  <div v-if="store.meta">
    <h1>{{ store.meta.name }}</h1>

    <div class="content">
      <pre>{{ store.activeData }}</pre>
    </div>
  </div>

  <v-progress-circular v-else-if="store.loading" indeterminate />
</template>
