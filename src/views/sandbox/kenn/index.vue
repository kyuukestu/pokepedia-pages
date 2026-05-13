<script setup lang="ts">
import { ref, computed } from 'vue'
import { getImageUrl } from '@/utils/path-resolvers'
import { articles } from '@/data/kenn'
import { Region } from '@/types/region'
import RegionFilter from '@/components/RegionFilter.vue'

// 1. Reactive State
const activeTab = ref('all')
const selectedRegion = ref<Region | null>(null) // Region Filter
const search = ref('')
const kennArticles = ref([...articles])
// 2. Custom Icon Styling for KENN logo
const newsIconStyle = computed(() => ({
  width: '50px',
  height: '50px',
  maskImage: `url(${getImageUrl('KENN.png')})`,
  webkitMaskImage: `url(${getImageUrl('KENN.png')})`,
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  backgroundColor: 'currentColor',
}))

// 4. Filter Logic
const filteredArticles = computed(() => {
  return kennArticles.value.filter((article) => {
    // Tab filtering
    const matchesTab =
      activeTab.value === 'all' ||
      article.category.toLowerCase().includes(activeTab.value.toLowerCase())

    // 2. Filter by Region (New Dropdown/Chips)
    const matchesRegion =
      selectedRegion.value === null || article.region.toUpperCase() === selectedRegion.value

    // Search filtering (title, summary, or category)
    const query = search.value.toLowerCase()
    const matchesSearch =
      article.title.toLowerCase().includes(query) || article.summary.toLowerCase().includes(query)

    return matchesTab && matchesSearch && matchesRegion
  })
})

const clearFilters = () => {
  selectedRegion.value = null
}
</script>
<template>
  <v-container max-width="1440" class="py-10">
    <!-- Header -->
    <header class="mb-12 border-b-lg border-primary pb-6">
      <div class="d-flex align-center ga-3 mb-2">
        <div class="icon-mask text-primary" :style="newsIconStyle"></div>
        <span class="text-overline letter-spacing-2">Keen Eye News Network // Archive Access</span>
      </div>
      <h1 class="text-h2 font-weight-black text-uppercase tracking-tighter">Current Happenings</h1>
    </header>

    <!-- Filter Bar -->
    <v-row class="mb-8 align-center">
      <v-col cols="12" md="6">
        <v-tabs v-model="activeTab" color="primary" align-tabs="start">
          <v-tab value="all">All Signals</v-tab>
          <v-tab value="breaking">Breaking</v-tab>
          <v-tab value="intel">Classified</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <RegionFilter
          v-model="selectedRegion"
          :items="articles"
          label="Region Filter"
          prepend-inner-icon="mdi-map-marker-radius"
          color="primary"
          class="mono-font"
          rounded="lg"
        />
      </v-col>
      <v-col cols="12" sm="2" class="d-flex align-center">
        <v-btn
          v-if="selectedRegion"
          variant="text"
          color="error"
          @click="clearFilters"
          prepend-icon="mdi-filter-off"
        >
          Reset
        </v-btn>
      </v-col>
      <!-- Search or other controls can go here -->
      <v-col cols="12" sm="8" md="9">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search Archive..."
          variant="outlined"
          density="comfortable"
          hide-details
          rounded="0"
        />
      </v-col>
    </v-row>

    <!-- News Grid -->
    <v-row>
      <v-col
        v-for="(article, i) in filteredArticles"
        :key="article.id"
        cols="12"
        :md="i === 0 ? 12 : 4"
        class="mb-6"
      >
        <v-card
          variant="outlined"
          class="rounded-0 news-card h-100"
          :to="`/sandbox/kenn/${article.slug}`"
        >
          <v-row no-gutters :class="{ 'flex-row-reverse': i === 0 }">
            <v-col :cols="12" :md="i === 0 ? 7 : 12">
              <v-img
                :src="getImageUrl(article.image ?? 'none')"
                :height="i === 0 ? 400 : 220"
                cover
                class="grayscale-filter"
                crossorigin="anonymous"
              />
            </v-col>
            <v-col :cols="12" :md="i === 0 ? 5 : 12" class="pa-6 d-flex flex-column">
              <div class="d-flex align-center mb-2">
                <v-chip size="x-small" color="primary" label class="font-weight-black">
                  {{ article.category }}
                </v-chip>
              </div>
              <h2
                :class="i === 0 ? 'text-h4' : 'text-h6'"
                class="font-weight-black text-uppercase mb-4 leading-tight"
              >
                {{ article.title }}
              </h2>

              <!-- Inside your v-for loop for article cards -->
              <v-card-text>
                <div class="d-flex align-center mb-2">
                  <v-icon size="small" color="primary" class="me-1">mdi-map-outline</v-icon>
                  <span class="text-caption font-weight-bold text-uppercase mono-font">
                    {{ article.region }}
                  </span>
                  <v-spacer />
                  <span class="text-caption opacity-60">{{ article.date }}</span>
                </div>

                <h3 class="text-h6 font-weight-bold mb-2">{{ article.title }}</h3>
                <p class="text-body-2 line-clamp-2">{{ article.summary }}</p>
              </v-card-text>
              <v-spacer />
              <div class="d-flex justify-space-between align-center border-t pt-4">
                <span class="text-caption font-weight-bold">BY: {{ article.author }}</span>
                <v-icon size="small">mdi-arrow-right</v-icon>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.news-card {
  transition: all 0.3s ease;
  border-color: rgba(var(--v-border-color), 0.1) !important;
}

.news-card:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
  background-color: rgba(var(--v-theme-primary), 0.02);
}

.grayscale-filter {
  filter: grayscale(100%);
  transition: filter 0.5s ease;
}

.news-card:hover .grayscale-filter {
  filter: grayscale(0%);
}

.tracking-tighter {
  letter-spacing: -3px;
}

.leading-tight {
  line-height: 1.15;
}

.mono-font {
  font-family: 'JetBrains Mono', monospace;
}
</style>
