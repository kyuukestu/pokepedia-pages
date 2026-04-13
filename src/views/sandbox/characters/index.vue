<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { autoRegistry } from '@/data/characters/registry'
// Use the official labels for "npc" -> "NPC" or "Non-Player Character"
import { CharacterTypeLabels } from '@/types/character'
import WikiHero from '@/components/sections/WikiHero.vue'

const route = useRoute()
const search = ref('')
const selectedCategory = ref('All')

onMounted(() => {
  if (route.query.cat) {
    selectedCategory.value = route.query.cat as string
  }
})

watch(
  () => route.query.cat,
  (newCat) => {
    if (newCat) {
      selectedCategory.value = newCat as string
    }
  },
  { immediate: true },
)

const characters = computed(() => {
  return autoRegistry.map((char) => ({
    ...char,
    path: `/sandbox/characters/${char.category}/${char.id}`,
    // Map the raw key 'npc' to the label 'NPC' via your Record
    displayLabel: CharacterTypeLabels[char.category],
  }))
})

// Categories based on Labels
const categories = computed(() => {
  const cats = new Set(characters.value.map((c) => c.displayLabel))
  return ['All', ...Array.from(cats).sort()]
})

const filteredCharacters = computed(() => {
  return characters.value.filter((c) => {
    const matchesSearch = c.name.full.toLowerCase().includes(search.value.toLowerCase())
    const matchesCat = selectedCategory.value === 'All' || c.displayLabel === selectedCategory.value
    return matchesSearch && matchesCat
  })
})
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Character Directory"
      subtitle="Registry of the Indigo Federation's citizens and travelers."
      icon="mdi-account-details"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap ga-2">
          <v-chip
            v-for="cat in categories"
            :key="cat"
            :color="selectedCategory === cat ? 'primary' : 'white'"
            :variant="selectedCategory === cat ? 'flat' : 'outlined'"
            size="small"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-8">
      <v-row class="mb-6" align="center">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search name..."
            variant="solo"
            hide-details
            flat
            rounded="lg"
            bg-color="surface-variant"
          />
        </v-col>
        <v-spacer />
        <div class="text-caption text-medium-emphasis px-3">
          Showing {{ filteredCharacters.length }} characters
        </div>
      </v-row>

      <v-row>
        <v-col v-for="char in filteredCharacters" :key="char.id" cols="12" sm="6" md="4" lg="3">
          <v-card :to="char.path" border flat rounded="xl" class="character-card">
            <div class="pa-4 text-center">
              <v-avatar size="100" color="surface-light" class="mb-3">
                <v-icon size="48">mdi-account</v-icon>
              </v-avatar>

              <div class="text-h6 font-weight-bold line-clamp-1">
                {{ char.name.full }}
              </div>

              <div class="d-flex justify-center ga-1 mt-1">
                <v-chip
                  :color="char.category === 'npc' ? 'amber-darken-3' : 'blue'"
                  size="x-small"
                  variant="tonal"
                  class="font-weight-bold"
                >
                  {{ char.displayLabel }}
                </v-chip>

                <v-chip
                  v-if="'type' in char"
                  color="grey"
                  size="x-small"
                  variant="outlined"
                  class="text-uppercase"
                >
                  {{ char.type }}
                </v-chip>
              </div>
            </div>

            <v-divider />
            <v-btn block variant="text" size="small" rounded="0" height="40"> View Dossier </v-btn>
          </v-card>
        </v-col>

        <v-col v-if="filteredCharacters.length === 0" cols="12" class="text-center py-12">
          <v-icon size="64" color="disabled" class="mb-4">mdi-account-search</v-icon>
          <div class="text-h6 text-disabled">No characters found in the registry.</div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
.character-card {
  transition: all 0.2s ease;
}
.character-card:hover {
  transform: translateY(-4px);
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.ga-2 {
  gap: 8px;
}
</style>
