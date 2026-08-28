<script setup lang="ts">
import { ref, computed } from 'vue'
import { getImageUrl } from '@/utils/path-resolvers'
import { articles } from '@/data/kenn/index'
import type { Article } from '@/types/kenn'
import type { AllRegions } from '@/types/region'
import RegionFilter from '@/components/RegionFilter.vue'

// Reactive State
const activeTab = ref('all')
const selectedRegion = ref<AllRegions | null>(null)
const search = ref('')
const layoutMode = ref<'variable' | 'uniform'>('variable')

// Helper: Format region text display
function formatRegionDisplay(article: Article): string {
  const regions = article.regions

  if (regions.length === 0) return 'GLOBAL'
  if (regions.length === 1) return regions[0]
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

// Custom Icon Styling for KENN logo
const newsIconStyle = computed(() => ({
  width: '48px',
  height: '48px',
  maskImage: `url(${getImageUrl('KENN.png')})`,
  webkitMaskImage: `url(${getImageUrl('KENN.png')})`,
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  backgroundColor: 'currentColor',
}))

// Filter Logic
const filteredArticles = computed(() => {
  return articles.filter((article) => {
    const matchesTab =
      activeTab.value === 'all' ||
      article.category.toLowerCase().includes(
        activeTab.value.toLowerCase(),
      )

    const matchesRegion =
      !selectedRegion.value ||
      article.regions.includes(selectedRegion.value)

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
  <v-container max-width="1440" class="py-10">
    <!-- Header -->
    <header class="mb-10 border-b-lg border-primary pb-6 relative">
      <div class="d-flex align-center ga-3 mb-2">
        <div class="icon-mask text-primary" :style="newsIconStyle"></div>
        <span class="text-overline tracking-widest font-mono text-primary font-weight-bold">
          Keen Eye News Network // Archive Access
        </span>
      </div>
      <h1 class="text-h2 font-weight-black text-uppercase tracking-tighter">
        Current Happenings
      </h1>
    </header>

    <!-- Unified Tactical Filter & Display Bar -->
    <v-card variant="outlined" class="mb-8 rounded-0 border-tactical bg-surface pa-4 tactical-frame">
      <v-row align="center" density="comfortable">
        <!-- Tab Controls -->
        <v-col cols="12" lg="4">
          <v-tabs v-model="activeTab" color="primary" density="compact" align-tabs="start">
            <v-tab value="all" class="font-mono text-caption font-weight-bold">All Signals</v-tab>
            <v-tab value="breaking" class="font-mono text-caption font-weight-bold">Breaking</v-tab>
            <v-tab value="intel" class="font-mono text-caption font-weight-bold">Classified</v-tab>
          </v-tabs>
        </v-col>

        <!-- Search Input -->
        <v-col cols="12" sm="5" lg="4">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search archive feeds..."
            variant="outlined"
            density="compact"
            hide-details
            clearable
            class="mono-font"
            rounded="0"
          />
        </v-col>

        <!-- Region Filter Dropdown -->
        <v-col cols="12" sm="5" lg="3" class="d-flex align-center ga-2">
          <RegionFilter
            v-model="selectedRegion"
            :items="articles"
            label="Region"
            prepend-inner-icon="mdi-map-marker-radius"
            color="primary"
            class="mono-font flex-grow-1"
            density="compact"
            hide-details
            rounded="0"
          />
          <v-btn
            v-if="selectedRegion || search || activeTab !== 'all'"
            variant="tonal"
            color="error"
            size="small"
            icon="mdi-filter-off"
            title="Reset Filters"
            @click="clearFilters"
          />
        </v-col>

        <!-- Gallery vs Variable Layout Switcher -->
        <v-col cols="12" sm="2" lg="1" class="d-flex justify-end">
          <v-btn-toggle
            v-model="layoutMode"
            mandatory
            color="primary"
            density="compact"
            variant="outlined"
            rounded="0"
          >
            <v-btn value="variable" size="small" icon="mdi-view-dashboard-outline" title="Hero Lead Grid" />
            <v-btn value="uniform" size="small" icon="mdi-grid" title="Uniform Gallery Grid" />
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-card>

    <!-- News Grid -->
    <v-row v-if="filteredArticles.length > 0">
      <v-col
        v-for="(article, i) in filteredArticles"
        :key="article.id"
        v-bind="getColSize(i)"
        class="mb-4"
      >
        <v-card
          variant="outlined"
          class="rounded-0 news-card h-100 d-flex flex-column"
          :class="{ 'hero-card': layoutMode === 'variable' && i === 0 }"
          :to="!article?.toOverride ? `/sandbox/kenn/${article.id}` : article.toOverride"
        >
          <v-row no-gutters :class="{ 'flex-row-reverse': layoutMode === 'variable' && i === 0 }" class="flex-grow-1">
            
            <!-- Cover Image (Collapses gracefully when missing) -->
            <v-col
              v-if="article.image"
              :cols="12"
              :md="layoutMode === 'variable' && i === 0 ? 7 : 12"
              class="position-relative overflow-hidden"
            >
              <div v-if="layoutMode === 'variable' && i === 0" class="hero-tag font-mono text-caption font-weight-black">
                FEATURED ARTICLE
              </div>
              <v-img
                :src="getImageUrl(article.image)"
                :height="layoutMode === 'variable' && i === 0 ? 440 : 220"
                cover
                class="grayscale-filter visual-media"
                crossorigin="anonymous"
              >
                <div class="scanline-overlay"></div>
              </v-img>
            </v-col>

            <!-- Card Body Content (Expands to full width if no image) -->
            <v-col
              :cols="12"
              :md="article.image && layoutMode === 'variable' && i === 0 ? 5 : 12"
              class="pa-6 d-flex flex-column justify-space-between flex-grow-1"
            >
              <div>
                <!-- Meta Header: Category Badge + Region Indicator + Date -->
                <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-2">
                  <div class="d-flex align-center ga-2">
                    <v-chip
                      size="x-small"
                      color="primary"
                      label
                      class="font-weight-black font-mono"
                    >
                      {{ article.category }}
                      <template v-if="article.category === 'LORE' && article.loreCategory">
                        // {{ article.loreCategory }}
                      </template>
                    </v-chip>

                    <!-- Region Badge with Multi-Region Tooltip -->
                    <v-tooltip
                      location="top"
                      :disabled="article.regions.length <= 1"
                      open-on-hover
                    >
                      <template #activator="{ props: tooltipProps }">
                        <span
                          v-bind="tooltipProps"
                          class="text-caption font-weight-bold text-uppercase mono-font d-inline-flex align-center text-medium-emphasis border-tactical px-2 py-0-5 rounded-0 bg-surface-variant cursor-pointer"
                          @click.prevent
                        >
                          <v-icon
                            size="x-small"
                            color="primary"
                            class="me-1"
                          >
                            mdi-map-marker-outline
                          </v-icon>
                    
                          {{ formatRegionDisplay(article) }}
                    
                          <v-icon
                            v-if="article.regions.length > 1"
                            size="10"
                            class="ms-1"
                          >
                            mdi-information-outline
                          </v-icon>
                        </span>
                      </template>
                    
                      <div class="font-mono text-caption pa-1">
                        <div class="font-weight-bold mb-1 border-b pb-1 text-primary">
                          TARGET REGIONS ({{ article.regions.length }})
                        </div>
                    
                        <div
                          v-for="reg in article.regions"
                          :key="reg"
                          class="d-flex align-center py-0-5"
                        >
                          <v-icon
                            size="10"
                            class="me-1"
                            color="primary"
                          >
                            mdi-chevron-right
                          </v-icon>
                          {{ reg }}
                        </div>
                      </div>
                    </v-tooltip>
                  </div>

                  <span class="text-caption font-mono text-medium-emphasis">{{ article.date }}</span>
                </div>

                <!-- Headline -->
                <h2
                  :class="layoutMode === 'variable' && i === 0 ? 'text-h4' : 'text-h6'"
                  class="font-weight-black text-uppercase mb-3 leading-tight headline-title"
                >
                  {{ article.title }}
                </h2>

                <!-- Article Summary -->
                <p
                  :class="layoutMode === 'variable' && i === 0 ? 'line-clamp-4' : 'line-clamp-3'"
                  class="text-body-2 text-medium-emphasis mb-4"
                >
                  {{ article.summary }}
                </p>
              </div>

              <!-- Card Footer -->
              <div class="d-flex justify-space-between align-center border-t border-tactical pt-4 mt-auto">
                <span class="text-caption font-weight-bold font-mono text-uppercase text-medium-emphasis">
                  BY: {{ article.author }}
                </span>
                <div class="d-flex align-center ga-1 text-primary font-mono text-caption font-weight-bold read-more">
                  <span>READ FEED</span>
                  <v-icon size="small" class="arrow-icon">mdi-arrow-right</v-icon>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <div v-else class="text-center py-16 border-tactical rounded-0 bg-surface-variant">
      <v-icon size="48" color="medium-emphasis" class="mb-3">mdi-text-search-off</v-icon>
      <h3 class="text-h6 font-mono font-weight-bold text-uppercase text-medium-emphasis mb-1">
        No Matching Signals Discovered
      </h3>
      <p class="text-caption font-mono text-medium-emphasis mb-4">
        Try adjusting your region filter or search terms to broaden archive access.
      </p>
      <v-btn variant="outlined" color="primary" size="small" class="font-mono" @click="clearFilters">
        Clear All Filters
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.border-tactical {
  border-color: rgba(var(--v-border-color), 0.2) !important;
}

.news-card {
  transition: border-color 0.25s ease, transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
  border-color: rgba(var(--v-border-color), 0.18) !important;
  background-color: rgb(var(--v-theme-surface));
}

.news-card:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
  background-color: rgba(var(--v-theme-primary), 0.015);
}

.news-card:hover .headline-title {
  color: rgb(var(--v-theme-primary));
}

.news-card:hover .arrow-icon {
  transform: translateX(6px);
}

.arrow-icon {
  transition: transform 0.2s ease;
}

.grayscale-filter {
  filter: grayscale(85%) contrast(105%);
  transition: filter 0.4s ease, transform 0.4s ease;
}

.news-card:hover .grayscale-filter {
  filter: grayscale(0%) contrast(100%);
  transform: scale(1.02);
}

.hero-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  padding: 4px 8px;
  letter-spacing: 1px;
}

.scanline-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  z-index: 1;
  pointer-events: none;
  opacity: 0.4;
}

.tracking-tighter {
  letter-spacing: -2px;
}

.tracking-widest {
  letter-spacing: 2px;
}

.leading-tight {
  line-height: 1.15;
}

.mono-font,
.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.py-0-5 {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
