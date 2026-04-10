<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, type RouteRecordRaw } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import WikiHero from '@/components/sections/WikiHero.vue'

// ── State ──────────────────────────────────────────────────────────────────
const route = useRoute()
const search = ref('')
const selectedCategory = ref('All')

onMounted(() => {
  if (route.query.cat) {
    selectedCategory.value = route.query.cat as string
  }
})

// ── Character Discovery ─────────────────────────────────────────────────────
const characters = computed(() => {
  const rootPath = '/sandbox/characters/'
  const seenFolders = new Set<string>()
  const discovered: any[] = []

  /**
   * @param node The current route node
   * @param parentPath Accumulated string path
   * @param contextCategory Track if we are inside an NPC or OC branch
   */

  function walk(node: RouteRecordRaw, parentPath = '', contextCategory = '') {
    // 1. Resolve current path
    const nodePath = node.path || ''
    const currentPath = nodePath.startsWith('/')
      ? nodePath
      : `${parentPath}/${nodePath}`.replace(/\/+/g, '/')

    // 2. Resolve relative segments
    const relativePath = currentPath.replace(rootPath, '')
    const segments = relativePath.split('/').filter(Boolean)

    // 3. Update Category Context
    let nextCategory = contextCategory
    if (segments.length === 1) {
      const possibleCat = segments[0].toLowerCase()
      if (possibleCat === 'npc') nextCategory = 'NPC'
      if (possibleCat === 'oc') nextCategory = 'OC'
    }

    // 4. Capture ONLY Characters (Depth 2)
    if (nextCategory && segments.length === 2) {
      const charId = segments[1]

      // Filter out system files, layouts, and the redirecting index files
      const isSystem =
        charId.startsWith('_') || charId === 'index' || charId.includes(':') || charId.includes('[')

      if (!isSystem) {
        const uniqueKey = `${nextCategory}-${charId}`.toLowerCase()

        if (!seenFolders.has(uniqueKey)) {
          seenFolders.add(uniqueKey)

          const cleanCharId = charId.toLowerCase()
          const cleanCat = nextCategory.toLowerCase()

          discovered.push({
            id: uniqueKey, // Use uniqueKey for stable list IDs
            category: nextCategory,
            path: `${rootPath}${cleanCat}/${cleanCharId}`,
            name: charId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
          })
        }
      }
    }

    // 5. Recursive Step
    if (node.children && node.children.length > 0) {
      node.children.forEach((child: RouteRecordRaw) => walk(child, currentPath, nextCategory))
    }
  }

  // Start the walk
  routes.forEach((node) => walk(node, '', ''))
  return discovered
})

// ── Filtering ───────────────────────────────────────────────────────────────
const categories = computed(() => {
  const cats = new Set(characters.value.map((c) => c.category))
  return ['All', ...Array.from(cats).sort()]
})

const filteredCharacters = computed(() => {
  return characters.value.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesCat = selectedCategory.value === 'All' || c.category === selectedCategory.value
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

              <div class="text-h6 font-weight-bold line-clamp-1">{{ char.name }}</div>

              <v-chip
                :color="char.category === 'NPC' ? 'amber-darken-3' : 'blue'"
                size="x-small"
                variant="tonal"
                class="mt-1 font-weight-bold"
              >
                {{ char.category }}
              </v-chip>
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
