<script setup lang="ts">
import { ref, computed } from 'vue'
import { categories, loreArticles } from '@/data/lore'
import WikiHero from '@/components/sections/WikiHero.vue'

// --- State Management ---
const activeCategoryTab = ref('all')

// --- Dynamic Article Filter Pipeline ---
const filteredArticles = computed(() => {
  if (activeCategoryTab.value === 'all') return loreArticles
  return loreArticles.filter(
    (article) => article.category.toLowerCase() === activeCategoryTab.value.toLowerCase(),
  )
})

/**
 * Normalizes color tokens to ensure seamless Vuetify theme mapping
 */
const cleanColorToken = (color: string) => {
  return color.replace('-darken-', '-darken-').replace('-accent-', '-accent-')
}
</script>

<template>
  <v-container fluid class="pa-0 tactical-lore-manifest">
    <!-- Header Hero Assembly Section -->
    <WikiHero
      title="Database Manifest"
      subtitle="Central archive indexing foundational setting mechanics, historical records, and systemic operational frameworks."
      icon="mdi-database-outline"
      pattern="pokeball"
      class="border-bottom-tactical"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center align-center flex-wrap ga-4 w-100 px-4">
          <div
            class="interactive-level-hub border-tactical-heavy pa-3 rounded-lg d-flex align-center flex-wrap ga-3 bg-surface-variant"
          >
            <span
              class="text-caption font-mono font-weight-black text-uppercase tracking-wider select-none mr-2"
            >
              System Matrix //
            </span>
            <div
              class="level-readout-badge font-mono text-caption font-weight-black text-primary px-3 py-1 border-tactical text-center bg-surface"
            >
              INDEXED RECS: {{ String(loreArticles.length).padStart(3, '0') }}
            </div>
          </div>
        </div>
      </template>
    </WikiHero>

    <!-- Main Content Workspace Container -->
    <v-container max-width="1200" class="py-12 position-relative z-index-2">
      <!-- Custom Category Filter Navigation Ribbons -->
      <div
        class="category-filter-ribbon d-flex flex-wrap ga-2 mb-8 pa-2 border-tactical-heavy rounded-lg bg-surface"
      >
        <v-btn
          v-for="cat in categories"
          :key="cat.id"
          :variant="activeCategoryTab === cat.id ? 'flat' : 'text'"
          :color="activeCategoryTab === cat.id ? 'primary' : 'default'"
          size="small"
          class="font-mono text-uppercase font-weight-black px-4 rounded-sm"
          @click="activeCategoryTab = cat.id"
          :prepend-icon="cat.icon"
        >
          {{ cat.label }}
        </v-btn>
      </div>

      <!-- Dynamic Content Article Matrix Grid -->
      <v-row class="ma-0 ga-y-6">
        <v-col v-for="article in filteredArticles" :key="article.id" cols="12" md="6" class="pa-2">
          <v-card
            :to="article.to"
            class="lore-article-card border-tactical-heavy rounded-xl overflow-hidden h-100"
            elevation="3"
            hover
          >
            <div
              class="glass-hull h-100 pa-5 d-flex flex-column justify-space-between position-relative"
              :style="{
                borderLeft: `4px solid rgb(var(--v-theme-${cleanColorToken(article.color)}))`,
              }"
            >
              <div>
                <!-- Article Card Top Meta Context Bar -->
                <div class="d-flex align-center justify-space-between mb-4">
                  <div class="d-flex align-center ga-2">
                    <v-icon :color="article.color" size="18">{{ article.icon }}</v-icon>
                    <span
                      class="font-mono text-caption text-uppercase tracking-wider font-weight-black"
                      :class="`text-${article.color}`"
                    >
                      // {{ article.id }}
                    </span>
                  </div>
                  <span class="font-mono text-caption text-disabled">
                    UPDATED: {{ article.lastUpdated }}
                  </span>
                </div>

                <!-- Text Data Layer Blocks -->
                <h3
                  class="text-h5 font-heading-tactical text-uppercase tracking-tight text-high-emphasis mb-3 lh-tight"
                >
                  {{ article.title }}
                </h3>

                <p class="text-body-2 text-medium-emphasis mb-4 font-mono-body">
                  {{ article.summary }}
                </p>
              </div>

              <!-- Footer Tag Matrix Chips Layout -->
              <div class="d-flex flex-wrap ga-2 pt-2 border-top-tactical-dashed">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="font-mono tag-telemetry-badge text-caption px-2 py-0.5 rounded border-tactical text-medium-emphasis"
                >
                  #{{ tag.toUpperCase() }}
                </span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
/* --- Core Structural Database Typography Architecture --- */
.font-mono {
  font-family: 'Fira Code', 'Courier New', Courier, monospace !important;
}

.font-mono-body {
  font-family: 'Fira Code', 'Courier New', Courier, monospace !important;
  letter-spacing: -0.015em;
  line-height: 1.5;
}

.font-heading-tactical {
  font-family: 'Space Grotesk', 'Outfit', 'Arial Black', sans-serif !important;
  font-weight: 900 !important;
}

.tracking-wider {
  letter-spacing: 0.08em !important;
}

.lh-tight {
  line-height: 1.15 !important;
}

/* --- High Contrast Tactical Borders & Framework Shadows --- */
.border-tactical {
  border: 1px solid rgba(var(--v-border-color), 0.4) !important;
}

.border-tactical-heavy {
  border: 2px solid rgb(var(--v-border-color)) !important;
}

.border-bottom-tactical {
  border-bottom: 2px solid rgb(var(--v-border-color)) !important;
}

.border-top-tactical-dashed {
  border-top: 1px dashed rgba(var(--v-border-color), 0.4) !important;
}

/* --- Adaptive UI Glass Hulls Setup --- */
.glass-hull {
  background: rgba(var(--v-theme-surface), 0.82) !important;
  backdrop-filter: blur(12px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(12px) saturate(160%) !important;
  transition: background-color 0.3s ease;
}

.category-filter-ribbon {
  background: rgba(var(--v-theme-surface), 0.5) !important;
}

/* --- Interactive Element Animations --- */
.lore-article-card {
  background: transparent !important;
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease !important;
  cursor: pointer;
}

.lore-article-card:hover {
  transform: translateY(-5px);
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 12px 28px -4px rgba(var(--v-theme-primary), 0.25) !important;
}

.lore-article-card:hover .glass-hull {
  background: rgba(var(--v-theme-surface), 0.9) !important;
}

.tag-telemetry-badge {
  background: rgba(var(--v-theme-surface-variant), 0.4);
}

.level-readout-badge {
  border: 1px solid rgba(var(--v-border-color), 0.35);
  border-radius: 4px;
}

.interactive-level-hub {
  backdrop-filter: blur(8px);
  max-width: fit-content;
}
</style>
