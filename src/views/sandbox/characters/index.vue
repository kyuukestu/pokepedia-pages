<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { autoRegistry } from '@/data/characters/registry'
import { CharacterTypeLabels } from '@/types/character'
import WikiHero from '@/components/sections/WikiHero.vue'
import RegionFilter from '@/components/RegionFilter.vue'
// Define or import the type if necessary
import { Region } from '@/types/region'
import { getCharImageUrl } from '@/utils/path-resolvers'

const route = useRoute()
const search = ref('')
const selectedCategory = ref('All')
const selectedRegion = ref<Region | null>(null)

onMounted(() => {
  if (route.query.cat) selectedCategory.value = route.query.cat as string
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
    resolvedImage: getCharImageUrl(
      char.image?.src ?? 'default.png',
      char.category === 'oc',
      char.id,
      char.region,
    ),
    // Updated path order: Region-First
    path: `/sandbox/characters/${char.region}/${char.category}/${char.id}`,
    displayLabel: CharacterTypeLabels[char.category],
  }))
})

const categories = computed(() => {
  const cats = new Set(characters.value.map((c) => c.displayLabel))
  return ['All', ...Array.from(cats).sort()]
})

const filteredCharacters = computed(() => {
  return characters.value.filter((c) => {
    // Search filtering
    const searchTerm = search.value.toLowerCase()
    const nameToSearch = (c.name.short?.[0] ?? c.name.full ?? '').toLowerCase()
    const matchesSearch = nameToSearch.includes(searchTerm)

    // Category filtering
    const matchesCat = selectedCategory.value === 'All' || c.displayLabel === selectedCategory.value

    // Region Filtering (The Replication)
    // If selectedRegion is null, it passes.
    // Otherwise, it compares the character's region key to the selected value.
    const matchesRegion =
      selectedRegion.value === null ||
      c.region.toUpperCase() === (selectedRegion.value as string).toUpperCase()

    return matchesSearch && matchesCat && matchesRegion
  })
})

const clearFilters = () => {
  selectedRegion.value = null
}
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
        <!-- Category Toggles in Hero -->
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
      <!-- Filter/Search Row -->
      <v-row class="mb-8" align="center">
        <v-col cols="12" md="5">
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

        <v-col cols="12" sm="8" md="5">
          <RegionFilter
            v-model="selectedRegion"
            :items="characters"
            label="Filter by Region"
            prepend-inner-icon="mdi-map-marker-radius"
            color="primary"
            class="mono-font"
            rounded="lg"
          />
        </v-col>

        <!-- Reset Button: Only shows when a region is selected -->
        <v-col cols="12" sm="4" md="2" class="d-flex align-center">
          <v-btn
            v-if="selectedRegion"
            variant="text"
            color="error"
            density="comfortable"
            @click="clearFilters"
            prepend-icon="mdi-filter-off"
            class="text-caption font-weight-bold"
          >
            RESET
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <!-- Grid remains similar, but now filtered by Region too -->
        <v-col v-for="char in filteredCharacters" :key="char.id" cols="12" sm="6" md="4" lg="3">
          <v-card
            :to="char.path"
            flat
            class="elite-dossier-card"
            :style="{
              '--char-pos': char.image?.config?.position ?? 'center center',
              '--char-scale': char.image?.config?.scale ?? '1',
            }"
          >
            <div class="art-viewport">
              <!-- The Art -->
              <v-img v-if="char.image" :src="char.resolvedImage" class="character-art-cover" cover>
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate size="20" color="primary" />
                  </div>
                </template>
              </v-img>

              <!-- Fallback -->
              <div v-else class="fallback-viewport">
                <div class="fallback-icon-wrap">
                  <v-icon size="80" color="white">mdi-shield-account</v-icon>
                  <div class="no-data-text">NO ART AVAILABLE</div>
                </div>
              </div>

              <!-- TOP OVERLAY: Region & Number -->
              <div class="overlay-header pa-3">
                <div class="d-flex align-center ga-2">
                  <div class="region-pill">
                    <div class="region-indicator" />
                    <span>{{ char.region }}</span>
                  </div>
                  <v-spacer />
                  <span class="dossier-id">#{{ char.id.substring(0, 4).toUpperCase() }}</span>
                </div>
              </div>

              <!-- BOTTOM OVERLAY: Name & Tags -->
              <div class="overlay-footer pa-4">
                <h2 class="char-name">{{ char.name.short?.[0] ?? char.name.full }}</h2>

                <div class="footer-meta">
                  <div class="category-tag" :class="char.category === 'npc' ? 'tag-npc' : 'tag-oc'">
                    {{ char.displayLabel }}
                  </div>

                  <!-- New Aesthetic Action Indicator -->
                  <div class="view-profile-action">
                    <span class="action-text">VIEW PROFILE</span>
                    <v-icon size="16" class="action-icon">mdi-arrow-right</v-icon>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<style scoped>
.elite-dossier-card {
  height: 320px; /* Uniform height */
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  background: #0a0a0a !important; /* Solid base for transparent PNGs */
}

.elite-dossier-card:hover {
  transform: translateY(-8px);
  border-color: rgba(var(--v-theme-primary), 1) !important;
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.6),
    0 0 15px rgba(var(--v-theme-primary), 0.2) !important;
}

.art-viewport {
  position: relative;
  height: 320px; /* Match card height for a full-bleed overlay look */
  width: 100%;
  display: flex;
  align-items: center; /* Vertical Center */
  justify-content: center; /* Horizontal Center */
  overflow: hidden;
}

:deep(.character-art-cover) {
  display: flex;
  align-items: center; /* Forces the internal div to center */
}

:deep(.character-art-cover .v-img__img) {
  /* Use 'center' as a hard default if the variable is missing */
  object-position: var(--char-pos, center center) !important;
  transform: scale(var(--char-scale, 1));
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) !important;
}

.elite-dossier-card:hover :deep(.v-img__img) {
  transform: scale(calc(var(--char-scale) * 1.15)) !important;
}

/* --- OVERLAY STYLES --- */

.overlay-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
}

.region-pill {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.region-indicator {
  width: 3px;
  height: 10px;
  background: rgb(var(--v-theme-primary));
  margin-right: 6px;
  border-radius: 1px;
}

.overlay-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  /* Strong Scrim for Readability */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    transparent 100%
  );
}

.char-name {
  font-size: 1.4rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  line-height: 1;
  margin-bottom: 8px;
  color: #fff;
  /* Text shadow for extra pop against busy art */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.footer-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Category Tags */
.category-tag {
  font-size: 9px;
  font-weight: 900;
  padding: 2px 8px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tag-npc {
  background: #ffca28;
  color: #000;
}
.tag-oc {
  background: #03a9f4;
  color: #fff;
}

/* Fallback Styles */
.fallback-viewport {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fallback-icon-wrap {
  text-align: center;
  opacity: 0.2;
}

.no-data-text {
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 2px;
  margin-top: 10px;
}

/* --- New Action Indicator Styles --- */

.view-profile-action {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.5; /* Subdued by default */
  transition: all 0.3s ease;
}

.action-text {
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1px;
  color: #fff;
}

.action-icon {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Card Hover Effects on the Button */
.elite-dossier-card:hover .view-profile-action {
  opacity: 1;
  color: rgb(var(--v-theme-primary));
}

.elite-dossier-card:hover .action-icon {
  transform: translateX(4px); /* Moves arrow slightly right */
  color: rgb(var(--v-theme-primary));
}

/* Optional: Add a subtle glow to the text on hover */
.elite-dossier-card:hover .action-text {
  text-shadow: 0 0 8px rgba(var(--v-theme-primary), 0.5);
}
</style>
