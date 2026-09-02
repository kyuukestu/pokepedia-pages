<script setup lang="ts">
import { ref, computed } from 'vue'
import { getImageUrl } from '@/utils/path-resolvers'
import { articles } from '@/data/kenn/index'
import type { Article } from '@/types/kenn'
import type { AllRegions } from '@/types/region'
import RegionFilter from '@/components/RegionFilter.vue'
import WikiHero from '@/components/sections/WikiHero.vue'

// Reactive State
const activeTab = ref('all')
const selectedRegion = ref<AllRegions | null>(null)
const search = ref('')
const layoutMode = ref<'variable' | 'uniform'>('variable')

// Helper: Format region text display (Ensures upper case output)
function formatRegionDisplay(article: Article): string {
  const regions = article.regions

  if (regions.length === 0) return 'GLOBAL'
  if (regions.length === 1) return regions[0].toUpperCase()
  return 'MULTIPLE'
}

// Helper: Determine dynamic column sizing based on position & layout mode
function getColSize(index: number) {
  if (layoutMode.value === 'uniform') {
    return { cols: 12, md: 4 }
  }

  return {
    cols: 12,
    md: index === 0 ? 12 : 4,
  }
}

// Filter Logic
const filteredArticles = computed(() => {
  return articles.filter((article) => {
    const matchesTab =
      activeTab.value === 'all' ||
      article.category.toLowerCase().includes(activeTab.value.toLowerCase())

    const matchesRegion = !selectedRegion.value || article.regions.includes(selectedRegion.value)

    const query = search.value.toLowerCase().trim()

    const matchesSearch =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      article.author.toLowerCase().includes(query)

    return matchesTab && matchesSearch && matchesRegion
  })
})

const clearFilters = () => {
  selectedRegion.value = null
  search.value = ''
  activeTab.value = 'all'
}
</script>

<template>
  <div class="kenn-articles-page">
    <WikiHero
      title="Current Happenings"
      subtitle="Keen Eye News Network — Articles & Field Reports "
      icon="mdi-notebook-outline"
      pattern="lines"
      color="success"
    >
      <template #chips>
        <v-chip size="small" variant="tonal" color="success" class="font-serif font-weight-bold">
          NOTEBOOK FEED
        </v-chip>
        <v-chip size="small" variant="outlined" color="success" class="font-serif">
          {{ filteredArticles.length }} Entries Recorded
        </v-chip>
      </template>
    </WikiHero>

    <v-container max-width="1440" class="pb-12 pt-2">
      <v-card variant="flat" class="mb-8 notebook-filter-card pa-4">
        <v-row align="center" density="comfortable">
          <v-col cols="12" lg="4">
            <v-tabs
              v-model="activeTab"
              color="success"
              density="compact"
              align-tabs="start"
              class="notebook-tabs"
            >
              <v-tab value="all" class="font-serif text-caption font-weight-bold text-none"
                >All Entries</v-tab
              >
              <v-tab value="breaking" class="font-serif text-caption font-weight-bold text-none"
                >Urgent</v-tab
              >
              <v-tab value="intel" class="font-serif text-caption font-weight-bold text-none"
                >Classified</v-tab
              >
            </v-tabs>
          </v-col>

          <v-col cols="12" sm="5" lg="4">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              placeholder="Search field notes..."
              variant="solo-filled"
              density="compact"
              hide-details
              clearable
              flat
              class="notebook-search-input font-serif"
            />
          </v-col>

          <v-col cols="12" sm="5" lg="3" class="d-flex align-center ga-2">
            <RegionFilter
              v-model="selectedRegion"
              :items="articles"
              label="Region Filter"
              prepend-inner-icon="mdi-map-marker-radius-outline"
              color="success"
              class="font-serif grow notebook-region-filter"
              density="compact"
              hide-details
            />
            <v-btn
              v-if="selectedRegion || search || activeTab !== 'all'"
              variant="tonal"
              color="error"
              size="small"
              icon="mdi-filter-off-outline"
              title="Reset Filters"
              @click="clearFilters"
            />
          </v-col>

          <v-col cols="12" sm="2" lg="1" class="d-flex justify-end">
            <v-btn-toggle
              v-model="layoutMode"
              mandatory
              color="success"
              density="compact"
              variant="outlined"
              class="notebook-toggle"
            >
              <v-btn
                value="variable"
                size="small"
                icon="mdi-view-dashboard-outline"
                title="Lead Feature View"
              />
              <v-btn value="uniform" size="small" icon="mdi-grid" title="Uniform Grid View" />
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-card>

      <v-row v-if="filteredArticles.length > 0">
        <v-col
          v-for="(article, i) in filteredArticles"
          :key="article.id"
          v-bind="getColSize(i)"
          class="mb-4"
        >
          <v-card
            variant="flat"
            class="notebook-article-card h-100 d-flex flex-column"
            :class="{ 'featured-hero-card': layoutMode === 'variable' && i === 0 }"
            :to="!article?.toOverride ? `/sandbox/kenn/${article.id}` : article.toOverride"
          >
            <v-row
              no-gutters
              :class="{ 'flex-row-reverse': layoutMode === 'variable' && i === 0 }"
              class="grow"
            >
              <v-col
                v-if="article.image"
                :cols="12"
                :md="layoutMode === 'variable' && i === 0 ? 7 : 12"
                class="position-relative overflow-hidden card-media-container"
              >
                <div
                  v-if="layoutMode === 'variable' && i === 0"
                  class="featured-badge font-serif text-caption font-weight-bold"
                >
                  <v-icon size="x-small" class="me-1">mdi-star-outline</v-icon>
                  PRIMARY RECORD
                </div>
                <v-img
                  :src="getImageUrl(article.image)"
                  :height="layoutMode === 'variable' && i === 0 ? 420 : 220"
                  cover
                  class="article-media-img"
                />
              </v-col>

              <v-col
                :cols="12"
                :md="article.image && layoutMode === 'variable' && i === 0 ? 5 : 12"
                class="pa-6 d-flex flex-column justify-space-between grow"
              >
                <div>
                  <div class="d-flex align-center justify-space-between mb-3 flex-wrap ga-2">
                    <div class="d-flex align-center ga-2">
                      <v-chip
                        size="x-small"
                        color="success"
                        variant="tonal"
                        class="font-weight-bold font-serif text-uppercase"
                      >
                        {{ article.category }}
                        <template v-if="article.category === 'LORE' && article.loreCategory">
                          / {{ article.loreCategory.toUpperCase() }}
                        </template>
                      </v-chip>

                      <v-tooltip
                        location="top"
                        :disabled="article.regions.length <= 1"
                        open-on-hover
                      >
                        <template #activator="{ props: tooltipProps }">
                          <span
                            v-bind="tooltipProps"
                            class="text-caption font-serif font-weight-bold d-inline-flex align-center text-medium-emphasis region-tag px-2 py-0-5 rounded text-uppercase"
                            @click.prevent
                          >
                            <v-icon size="x-small" color="success" class="me-1">
                              mdi-map-marker-outline
                            </v-icon>
                            {{ formatRegionDisplay(article) }}
                            <v-icon v-if="article.regions.length > 1" size="10" class="ms-1">
                              mdi-information-outline
                            </v-icon>
                          </span>
                        </template>

                        <div class="font-serif text-caption pa-1">
                          <div
                            class="font-weight-bold mb-1 border-b pb-1 text-success text-uppercase"
                          >
                            TARGET REGIONS ({{ article.regions.length }})
                          </div>
                          <div
                            v-for="reg in article.regions"
                            :key="reg"
                            class="d-flex align-center py-0-5 text-uppercase"
                          >
                            <v-icon size="10" class="me-1" color="success"
                              >mdi-chevron-right</v-icon
                            >
                            {{ reg }}
                          </div>
                        </div>
                      </v-tooltip>
                    </div>

                    <span class="text-caption font-serif text-medium-emphasis italic">{{
                      article.date
                    }}</span>
                  </div>

                  <h2
                    :class="layoutMode === 'variable' && i === 0 ? 'text-h4' : 'text-h6'"
                    class="font-serif font-weight-bold mb-3 leading-tight article-headline"
                  >
                    {{ article.title }}
                  </h2>

                  <p
                    :class="layoutMode === 'variable' && i === 0 ? 'line-clamp-4' : 'line-clamp-3'"
                    class="text-body-2 font-serif text-medium-emphasis mb-4 article-summary"
                  >
                    {{ article.summary }}
                  </p>
                </div>

                <div
                  class="d-flex justify-space-between align-center border-t notebook-card-divider pt-4 mt-auto"
                >
                  <div class="author-attribution font-serif d-inline-flex align-center">
                    <v-icon size="x-small" color="success" class="me-1 opacity-70">mdi-pen</v-icon>
                    <span class="author-label text-caption font-weight-bold text-uppercase">
                      {{ article.author }}
                    </span>
                  </div>

                  <div
                    class="d-flex align-center ga-1 text-success font-serif text-caption font-weight-bold read-link"
                  >
                    <span>READ NOTE</span>
                    <v-icon size="small" class="arrow-icon">mdi-arrow-right</v-icon>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <div v-else class="text-center py-16 notebook-empty-state rounded-lg">
        <v-icon size="48" color="medium-emphasis" class="mb-3">mdi-notebook-remove-outline</v-icon>
        <h3 class="text-h6 font-serif font-weight-bold text-medium-emphasis mb-1">
          No Field Notes Match Your Filter
        </h3>
        <p class="text-caption font-serif text-medium-emphasis mb-4 max-w-400 mx-auto">
          Try clearing search parameters or adjusting region settings to locate archives.
        </p>
        <v-btn
          variant="tonal"
          color="success"
          size="small"
          class="font-serif text-none"
          @click="clearFilters"
        >
          Reset All Filters
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,400&display=swap');

.font-serif {
  font-family: 'Lora', Georgia, serif !important;
}

.italic {
  font-style: italic;
}

/* Notebook Filter Container */
.notebook-filter-card {
  background: rgba(var(--v-theme-surface), 0.7) !important;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  border-radius: 12px !important;
  backdrop-filter: blur(8px);
}

:deep(.notebook-search-input .v-field) {
  border-radius: 10px !important;
  background: rgba(var(--v-theme-on-surface), 0.04) !important;
}

.notebook-toggle {
  border-radius: 8px !important;
  border-color: rgba(var(--v-theme-on-surface), 0.12) !important;
}

/* Notebook Article Cards */
.notebook-article-card {
  background: rgba(var(--v-theme-surface), 0.8) !important;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  border-radius: 14px !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

.notebook-article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.08) !important;
  border-color: rgba(76, 175, 80, 0.3) !important;
}

.notebook-article-card:hover .article-headline {
  color: rgb(var(--v-theme-success));
}

.notebook-article-card:hover .arrow-icon {
  transform: translateX(5px);
}

.article-headline {
  letter-spacing: -0.01em;
}

.article-summary {
  line-height: 1.6;
}

.card-media-container {
  border-radius: 14px 14px 0 0;
}

.featured-hero-card .card-media-container {
  border-radius: 0 14px 14px 0;
}

.article-media-img {
  transition: transform 0.5s ease;
}

.notebook-article-card:hover .article-media-img {
  transform: scale(1.04);
}

.featured-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  background: rgba(var(--v-theme-surface), 0.9);
  color: rgb(var(--v-theme-success));
  backdrop-filter: blur(6px);
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.region-tag {
  background: rgba(var(--v-theme-on-surface), 0.04);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.06);
}

/* Author Attribution Stylization */
.author-attribution {
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(var(--v-theme-on-surface), 0.03);
  border: 1px dashed rgba(var(--v-theme-on-surface), 0.12);
}

.author-label {
  letter-spacing: 0.05em;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.notebook-card-divider {
  border-color: rgba(var(--v-theme-on-surface), 0.06) !important;
}

.arrow-icon {
  transition: transform 0.2s ease;
}

.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Empty State */
.notebook-empty-state {
  background: rgba(var(--v-theme-surface), 0.5);
  border: 1px dashed rgba(var(--v-theme-on-surface), 0.15);
}

.max-w-400 {
  max-width: 400px;
}

.py-0-5 {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
