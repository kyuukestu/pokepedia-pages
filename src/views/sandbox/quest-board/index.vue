<script setup lang="ts">
import { ref, computed } from 'vue'
import WikiHero from '@/components/sections/WikiHero.vue'
import { quests } from '@/data/quests'
import type { Quest, QuestType, QuestStatus, QuestCategory } from '@/types/quests'
import { AllRegions } from '@/types/region'

// ── Display Mode ────────────────────────────────────────────────────────────
const viewMode = ref<'grid' | 'board'>('board')

// ── Reactive State ──────────────────────────────────────────────────────────
const activeTypeTab = ref<'all' | QuestType>('all')
const selectedStatus = ref<QuestStatus | 'all'>('all')
const selectedCategory = ref<QuestCategory | 'all'>('all')
const selectedRegion = ref<AllRegions | null>(null)
const search = ref('')

// Modal / Detail state
const dialogOpen = ref(false)
const selectedQuest = ref<Quest | null>(null)

// ── Location Helpers ────────────────────────────────────────────────────────
function formatQuestLocation(quest: Quest): string {
  const loc = quest.location
  if (!loc) return 'Unknown Location'

  const parts = [loc.region]
  if (loc.city) parts.push(loc.city)
  else if (loc.route) parts.push(loc.route)
  else if (loc.area) parts.push(loc.area)

  return parts.join(' · ')
}

function getLocationDetails(quest: Quest): string[] {
  const loc = quest.location
  if (!loc) return []
  const details: string[] = []
  if (loc.region) details.push(`Region: ${loc.region}`)
  if (loc.city) details.push(`City: ${loc.city}`)
  if (loc.route) details.push(`Route: ${loc.route}`)
  if (loc.area) details.push(`Area: ${loc.area}`)
  return details
}

// ── Type Border Color Helper ────────────────────────────────────────────────
function getTypeBorderClass(type: QuestType): string {
  return type === 'mission' ? 'border-type-mission' : 'border-type-pokejob'
}

// ── Category Text/Chip Colors ──────────────────────────────────────────────
const categoryColors: Record<QuestCategory, string> = {
  combat: 'red-darken-2',
  investigation: 'purple-darken-2',
  exploration: 'teal-darken-2',
  rescue: 'amber-darken-3',
  escort: 'orange-darken-3',
  delivery: 'blue-darken-2',
  collection: 'lime-darken-4',
  capture: 'pink-darken-2',
  protection: 'indigo-darken-2',
  research: 'cyan-darken-3',
  training: 'deep-orange-darken-2',
  social: 'purple-darken-1',
  emergency: 'error',
  miscellaneous: 'grey-darken-3',
}

function getCategoryColor(category: QuestCategory): string {
  return categoryColors[category] || 'primary'
}

// ── Status Config ───────────────────────────────────────────────────────────
const statusConfig: Record<QuestStatus, { label: string; color: string; icon: string }> = {
  available: { label: 'Available', color: 'success', icon: 'mdi-check-circle-outline' },
  taken: { label: 'In Progress', color: 'warning', icon: 'mdi-progress-clock' },
  completed: { label: 'Completed', color: 'grey-darken-1', icon: 'mdi-check-all' },
}

// ── Dropdown Options ────────────────────────────────────────────────────────
const categoryOptions = [
  { title: 'All Categories', value: 'all' },
  { title: 'Combat', value: 'combat' },
  { title: 'Investigation', value: 'investigation' },
  { title: 'Exploration', value: 'exploration' },
  { title: 'Rescue', value: 'rescue' },
  { title: 'Escort', value: 'escort' },
  { title: 'Delivery', value: 'delivery' },
  { title: 'Collection', value: 'collection' },
  { title: 'Capture', value: 'capture' },
  { title: 'Protection', value: 'protection' },
  { title: 'Research', value: 'research' },
  { title: 'Training', value: 'training' },
  { title: 'Social', value: 'social' },
  { title: 'Emergency', value: 'emergency' },
  { title: 'Miscellaneous', value: 'miscellaneous' },
]

const statusOptions = [
  { title: 'All Statuses', value: 'all' },
  { title: 'Available', value: 'available' },
  { title: 'In Progress', value: 'taken' },
  { title: 'Completed', value: 'completed' },
]

// ── Filtering Logic ─────────────────────────────────────────────────────────
const filteredQuests = computed(() => {
  return quests.filter((quest) => {
    const matchesType = activeTypeTab.value === 'all' || quest.type === activeTypeTab.value
    const matchesStatus = selectedStatus.value === 'all' || quest.status === selectedStatus.value
    const matchesCategory =
      selectedCategory.value === 'all' || quest.category === selectedCategory.value
    const matchesRegion = !selectedRegion.value || quest.location?.region === selectedRegion.value

    const q = search.value.toLowerCase().trim()
    const matchesSearch =
      !q ||
      quest.title.toLowerCase().includes(q) ||
      quest.description.toLowerCase().includes(q) ||
      quest.issuer?.name.toLowerCase().includes(q) ||
      quest.location?.region.toLowerCase().includes(q) ||
      quest.location?.city?.toLowerCase().includes(q)

    return matchesType && matchesStatus && matchesCategory && matchesRegion && matchesSearch
  })
})

// ── Metrics ─────────────────────────────────────────────────────────────────
const availableCount = computed(() => quests.filter((q) => q.status === 'available').length)
const missionsCount = computed(() => quests.filter((q) => q.type === 'mission').length)
const pokejobsCount = computed(() => quests.filter((q) => q.type === 'pokejob').length)

// ── Actions ─────────────────────────────────────────────────────────────────
function openQuestModal(quest: Quest) {
  selectedQuest.value = quest
  dialogOpen.value = true
}

function clearFilters() {
  activeTypeTab.value = 'all'
  selectedStatus.value = 'all'
  selectedCategory.value = 'all'
  selectedRegion.value = null
  search.value = ''
}
</script>

<template>
  <v-container fluid class="pa-0">
    <!-- Hero Header Assembly -->
    <WikiHero
      title="Quest Board"
      subtitle="Discover active quests, missions, and PokéJobs."
      icon="mdi-clipboard-text-multiple-outline"
      pattern="pokeball"
    >
      <template #chips>
        <div class="d-flex justify-center align-center flex-wrap ga-3 w-100 px-4">
          <v-card
            variant="outlined"
            class="pa-2 px-4 rounded-pill d-flex align-center flex-wrap ga-3 bg-surface"
          >
            <span
              class="text-caption font-weight-bold text-uppercase text-medium-emphasis tracking-wider"
            >
              Overview:
            </span>
            <v-chip size="small" color="success" variant="outlined" class="font-weight-bold">
              Available: {{ availableCount }}
            </v-chip>
            <v-chip size="small" color="primary" variant="outlined" class="font-weight-bold">
              Missions: {{ missionsCount }}
            </v-chip>
            <v-chip size="small" color="warning" variant="outlined" class="font-weight-bold">
              PokéJobs: {{ pokejobsCount }}
            </v-chip>
          </v-card>
        </div>
      </template>
    </WikiHero>

    <!-- Main Content Layout -->
    <v-container max-width="1440" class="py-8">
      <!-- Controls Bar -->
      <v-card variant="outlined" class="mb-8 rounded-xl bg-surface pa-4">
        <v-row align="center" density="comfortable">
          <v-col cols="12" md="4" lg="4">
            <v-tabs v-model="activeTypeTab" color="primary" density="compact" align-tabs="start">
              <v-tab value="all" class="text-caption font-weight-bold">All Quests</v-tab>
              <v-tab value="mission" class="text-caption font-weight-bold">
                <v-icon start size="16">mdi-crosshairs-gps</v-icon>
                Missions
              </v-tab>
              <v-tab value="pokejob" class="text-caption font-weight-bold">
                <v-icon start size="16">mdi-briefcase-outline</v-icon>
                PokéJobs
              </v-tab>
            </v-tabs>
          </v-col>

          <v-col cols="12" sm="6" md="3" lg="3">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search quests..."
              variant="outlined"
              density="compact"
              hide-details
              clearable
              rounded="lg"
            />
          </v-col>

          <v-col cols="12" sm="6" md="2" lg="2">
            <v-select
              v-model="selectedCategory"
              :items="categoryOptions"
              label="Category"
              variant="outlined"
              density="compact"
              hide-details
              rounded="lg"
            />
          </v-col>

          <v-col cols="12" sm="8" md="3" lg="3" class="d-flex align-center ga-2 justify-end">
            <v-select
              v-model="selectedStatus"
              :items="statusOptions"
              label="Status"
              variant="outlined"
              density="compact"
              hide-details
              class="flex-grow-1"
              rounded="lg"
            />

            <!-- View Mode Toggle Switch -->
            <v-btn-toggle
              v-model="viewMode"
              mandatory
              variant="outlined"
              density="compact"
              rounded="lg"
              color="primary"
            >
              <v-btn
                value="board"
                icon="mdi-view-dashboard-variant-outline"
                title="Variable Board View"
              />
              <v-btn value="grid" icon="mdi-view-grid-outline" title="Uniform Grid View" />
            </v-btn-toggle>

            <v-btn
              v-if="
                selectedRegion ||
                search ||
                activeTypeTab !== 'all' ||
                selectedStatus !== 'all' ||
                selectedCategory !== 'all'
              "
              variant="outlined"
              color="error"
              icon="mdi-filter-off"
              title="Clear Filters"
              @click="clearFilters"
            />
          </v-col>
        </v-row>
      </v-card>

      <!-- Quests Layout -->
      <div v-if="filteredQuests.length > 0">
        <!-- MODE 1: Uniform Grid Layout -->
        <v-row v-if="viewMode === 'grid'">
          <v-col
            v-for="quest in filteredQuests"
            :key="quest.id"
            cols="12"
            md="6"
            lg="4"
            class="mb-4"
          >
            <v-card
              variant="outlined"
              :class="[
                'quest-paper-card',
                'rounded-lg',
                'h-100',
                'd-flex',
                'flex-column',
                'cursor-pointer',
                getTypeBorderClass(quest.type),
              ]"
              @click="openQuestModal(quest)"
            >
              <!-- Pin Indicator -->
              <div class="pin-indicator" />

              <div class="pa-4 d-flex align-center justify-space-between flex-wrap ga-2 border-b">
                <div class="d-flex align-center ga-2">
                  <v-chip
                    size="x-small"
                    variant="outlined"
                    :color="quest.type === 'mission' ? 'primary' : 'warning'"
                    label
                    class="font-weight-bold text-uppercase"
                  >
                    {{ quest.type }}
                  </v-chip>
                  <v-chip
                    size="x-small"
                    variant="outlined"
                    :color="getCategoryColor(quest.category)"
                    label
                    class="font-weight-bold text-uppercase"
                  >
                    {{ quest.category }}
                  </v-chip>
                </div>
                <v-chip
                  size="x-small"
                  variant="outlined"
                  :color="statusConfig[quest.status].color"
                  class="font-weight-bold text-uppercase"
                >
                  {{ statusConfig[quest.status].label }}
                </v-chip>
              </div>

              <v-card-text class="pa-5 flex-grow-1 d-flex flex-column justify-space-between">
                <div>
                  <h3 class="text-h6 font-weight-bold mb-2 lh-tight text-high-emphasis">
                    {{ quest.title }}
                  </h3>
                  <p class="text-body-2 text-medium-emphasis line-clamp-3 mb-4">
                    {{ quest.description }}
                  </p>
                </div>

                <div class="pt-3 border-t">
                  <div class="d-flex align-center justify-space-between text-caption">
                    <span
                      class="d-inline-flex align-center text-medium-emphasis font-weight-medium"
                    >
                      <v-icon size="16" start color="primary">mdi-map-marker-outline</v-icon>
                      {{ formatQuestLocation(quest) }}
                    </span>
                    <span v-if="quest.repeatable" class="text-warning font-weight-bold">
                      Repeatable
                    </span>
                  </div>
                </div>
              </v-card-text>

              <div
                class="pa-3 px-5 border-t d-flex justify-space-between align-center bg-paper-subtle"
              >
                <span class="text-caption font-mono text-medium-emphasis">
                  Objs: {{ quest.objectives.length }}
                </span>
                <span class="text-caption text-primary font-weight-bold d-flex align-center ga-1">
                  Read Notice <v-icon size="14">mdi-arrow-right</v-icon>
                </span>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- MODE 2: Variable Board Layout (Content-Driven Masonry) -->
        <div v-else class="quest-masonry-board">
          <div v-for="quest in filteredQuests" :key="quest.id" class="masonry-item mb-6">
            <v-card
              variant="outlined"
              :class="[
                'quest-paper-card',
                'rounded-lg',
                'cursor-pointer',
                getTypeBorderClass(quest.type),
              ]"
              @click="openQuestModal(quest)"
            >
              <!-- Pin Indicator -->
              <div class="pin-indicator" />

              <!-- Card Header -->
              <div class="pa-4 d-flex align-center justify-space-between flex-wrap ga-2 border-b">
                <div class="d-flex align-center ga-2">
                  <v-chip
                    size="x-small"
                    variant="outlined"
                    :color="quest.type === 'mission' ? 'primary' : 'warning'"
                    label
                    class="font-weight-bold text-uppercase"
                  >
                    {{ quest.type }}
                  </v-chip>
                  <v-chip
                    size="x-small"
                    variant="outlined"
                    :color="getCategoryColor(quest.category)"
                    label
                    class="font-weight-bold text-uppercase"
                  >
                    {{ quest.category }}
                  </v-chip>
                </div>
                <v-chip
                  size="x-small"
                  variant="outlined"
                  :color="statusConfig[quest.status].color"
                  class="font-weight-bold text-uppercase"
                >
                  {{ statusConfig[quest.status].label }}
                </v-chip>
              </div>

              <!-- Main Card Body -->
              <v-card-text class="pa-5">
                <h3 class="text-h6 font-weight-bold mb-2 lh-tight text-high-emphasis">
                  {{ quest.title }}
                </h3>
                <p class="text-body-2 text-medium-emphasis mb-4">
                  {{ quest.description }}
                </p>

                <!-- Dynamic Objectives Preview List -->
                <div
                  v-if="quest.objectives.length > 0"
                  class="mb-4 pa-3 rounded border border-dashed bg-paper-subtle"
                >
                  <div
                    class="text-caption font-weight-bold text-uppercase text-medium-emphasis mb-2"
                  >
                    Objectives ({{ quest.objectives.length }})
                  </div>
                  <ul class="text-caption text-medium-emphasis pl-4 mb-0">
                    <li v-for="obj in quest.objectives" :key="obj.id" class="mb-1">
                      {{ obj.description }}
                    </li>
                  </ul>
                </div>

                <!-- Location & Metadata -->
                <div class="pt-3 border-t">
                  <div class="d-flex align-center justify-space-between text-caption">
                    <span
                      class="d-inline-flex align-center text-medium-emphasis font-weight-medium"
                    >
                      <v-icon size="16" start color="primary">mdi-map-marker-outline</v-icon>
                      {{ formatQuestLocation(quest) }}
                    </span>
                    <span v-if="quest.repeatable" class="text-warning font-weight-bold">
                      Repeatable
                    </span>
                  </div>
                  <div v-if="quest.issuer" class="text-caption text-medium-emphasis mt-2">
                    <span class="font-weight-medium">Issuer:</span> {{ quest.issuer.name }}
                  </div>
                </div>
              </v-card-text>

              <!-- Card Footer -->
              <div
                class="pa-3 px-5 border-t d-flex justify-space-between align-center bg-paper-subtle"
              >
                <span class="text-caption font-mono text-medium-emphasis">
                  ID: #{{ quest.id }}
                </span>
                <span class="text-caption text-primary font-weight-bold d-flex align-center ga-1">
                  Inspect Notice <v-icon size="14">mdi-arrow-right</v-icon>
                </span>
              </div>
            </v-card>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <v-card v-else variant="outlined" class="text-center py-16 rounded-xl bg-surface">
        <v-icon size="64" color="medium-emphasis" class="mb-4">mdi-clipboard-search-outline</v-icon>
        <h3 class="text-h5 font-weight-bold text-medium-emphasis mb-2">No Quests Found</h3>
        <p class="text-body-1 text-medium-emphasis mb-6">
          We couldn't find any quests matching your current filters.
        </p>
        <v-btn
          variant="outlined"
          color="primary"
          class="px-6 font-weight-bold"
          rounded="lg"
          @click="clearFilters"
        >
          Clear All Filters
        </v-btn>
      </v-card>
    </v-container>

    <!-- Modal Dialog -->
    <v-dialog v-model="dialogOpen" max-width="700">
      <v-card
        v-if="selectedQuest"
        variant="outlined"
        :class="[
          'rounded-xl',
          'overflow-hidden',
          'bg-surface',
          getTypeBorderClass(selectedQuest.type),
        ]"
      >
        <div class="pa-6 border-b bg-paper-subtle">
          <div class="d-flex align-center justify-space-between ga-2 mb-3">
            <div class="d-flex align-center ga-2">
              <v-chip
                size="small"
                variant="outlined"
                :color="selectedQuest.type === 'mission' ? 'primary' : 'warning'"
                label
                class="font-weight-bold text-uppercase"
              >
                {{ selectedQuest.type }}
              </v-chip>
              <v-chip
                size="small"
                variant="outlined"
                :color="getCategoryColor(selectedQuest.category)"
                label
                class="font-weight-bold text-uppercase"
              >
                {{ selectedQuest.category }}
              </v-chip>
            </div>
            <v-chip
              size="small"
              variant="outlined"
              :color="statusConfig[selectedQuest.status].color"
              class="font-weight-bold text-uppercase"
            >
              {{ statusConfig[selectedQuest.status].label }}
            </v-chip>
          </div>

          <h2 class="text-h4 font-weight-bold lh-tight mb-2">
            {{ selectedQuest.title }}
          </h2>

          <div
            v-if="selectedQuest.issuer"
            class="text-body-2 text-medium-emphasis d-flex align-center ga-1 mt-2"
          >
            <v-icon size="16" color="warning">mdi-account-circle</v-icon>
            <span class="font-weight-medium">Issuer:</span> {{ selectedQuest.issuer.name }}
          </div>
        </div>

        <v-card-text class="pa-6">
          <!-- Detailed Location Hierarchy via getLocationDetails -->
          <div v-if="getLocationDetails(selectedQuest).length > 0" class="mb-6">
            <h3 class="text-subtitle-1 text-primary font-weight-bold d-flex align-center ga-2 mb-2">
              <v-icon size="20">mdi-map-marker-radius-outline</v-icon>
              Location Breakdown
            </h3>
            <div class="d-flex flex-wrap ga-2">
              <v-chip
                v-for="(detail, idx) in getLocationDetails(selectedQuest)"
                :key="idx"
                size="small"
                variant="outlined"
                color="primary"
                class="font-weight-medium"
              >
                {{ detail }}
              </v-chip>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-subtitle-1 text-primary font-weight-bold d-flex align-center ga-2 mb-2">
              <v-icon size="20">mdi-text-box-outline</v-icon>
              Description
            </h3>
            <p class="text-body-1 text-medium-emphasis lh-relaxed">
              {{ selectedQuest.description }}
            </p>
          </div>

          <div v-if="selectedQuest.objectives.length > 0" class="mb-6">
            <h3 class="text-subtitle-1 text-primary font-weight-bold d-flex align-center ga-2 mb-3">
              <v-icon size="20">mdi-checkbox-marked-circle-outline</v-icon>
              Objectives ({{ selectedQuest.objectives.length }})
            </h3>
            <v-card variant="outlined" class="pa-3 rounded-lg bg-paper-subtle">
              <div
                v-for="obj in selectedQuest.objectives"
                :key="obj.id"
                class="d-flex align-start ga-3 py-2 border-b last-no-border"
              >
                <v-icon size="20" color="primary" class="mt-0-5">
                  {{
                    obj.optional
                      ? 'mdi-checkbox-blank-circle-outline'
                      : 'mdi-checkbox-marked-circle'
                  }}
                </v-icon>
                <div class="text-body-1">
                  <span>{{ obj.description }}</span>
                  <v-chip
                    v-if="obj.optional"
                    size="x-small"
                    color="warning"
                    variant="outlined"
                    class="ms-2 font-weight-bold"
                  >
                    Optional
                  </v-chip>
                </div>
              </div>
            </v-card>
          </div>

          <div v-if="selectedQuest.rewards.length > 0" class="mb-6">
            <h3 class="text-subtitle-1 text-success font-weight-bold d-flex align-center ga-2 mb-3">
              <v-icon size="20">mdi-gift-outline</v-icon>
              Rewards
            </h3>
            <div class="d-flex flex-wrap ga-2">
              <v-chip
                v-for="reward in selectedQuest.rewards"
                :key="reward.id"
                variant="outlined"
                color="success"
                class="font-weight-bold px-4 py-2"
                size="large"
              >
                {{ reward.description }}
              </v-chip>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4 border-t d-flex justify-end">
          <v-btn
            variant="outlined"
            color="primary"
            class="px-6 font-weight-bold"
            rounded="lg"
            @click="dialogOpen = false"
          >
            Close Notice
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
/* ── Quest Type Border Styling ────────────────────────────────────────────── */
.border-type-mission {
  border-color: rgba(var(--v-theme-primary), 0.85) !important;
}

.border-type-pokejob {
  border-color: rgba(var(--v-theme-warning), 0.85) !important;
}

/* ── Paper Board Style & Pin Details ─────────────────────────────────────── */
.quest-paper-card {
  position: relative;
  background-color: var(--v-theme-surface);
  border-width: 2px !important;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.quest-paper-card:hover {
  transform: translateY(-4px) rotate(-0.5deg);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12) !important;
}

.pin-indicator {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(var(--v-theme-on-surface), 0.25);
  border: 2px solid var(--v-theme-surface);
}

.bg-paper-subtle {
  background-color: rgba(var(--v-theme-on-surface), 0.02);
}

/* ── Masonry Column Layout (Variable Height Mode) ────────────────────────── */
.quest-masonry-board {
  column-count: 1;
  column-gap: 1.5rem;
}

@media (min-width: 768px) {
  .quest-masonry-board {
    column-count: 2;
  }
}

@media (min-width: 1280px) {
  .quest-masonry-board {
    column-count: 3;
  }
}

.masonry-item {
  break-inside: avoid;
  display: inline-block;
  width: 100%;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.lh-tight {
  line-height: 1.25;
}

.lh-relaxed {
  line-height: 1.6;
}

.mt-0-5 {
  margin-top: 2px;
}

.last-no-border:last-child {
  border-bottom: none !important;
}
</style>
