<script setup lang="ts">
import { ref, computed } from 'vue'
import WikiHero from '@/components/sections/WikiHero.vue'
import { quests } from '@/data/quests'
import type { Quest, QuestType, QuestStatus, QuestCategory } from '@/types/quests'
import { AllRegions } from '@/types/region'

// ── Display Mode ────────────────────────────────────────────────────────────
const viewMode = ref<'grid' | 'board'>('board')

// ── Filter State ────────────────────────────────────────────────────────────
const activeTypeTab = ref<'all' | QuestType>('all')
const selectedStatus = ref<QuestStatus | 'all'>('all')
const selectedCategory = ref<QuestCategory | 'all'>('all')
const selectedRegion = ref<AllRegions | null>(null)
const search = ref('')

// Modal / Detail state
const dialogOpen = ref(false)
const selectedQuest = ref<Quest | null>(null)

// ── Helpers ────────────────────────────────────────────────────────────────
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

// Category accent colors adapted for dark mode neon ink highlights
const categoryColors: Record<QuestCategory, string> = {
  combat: '#ef5350',
  investigation: '#ab47bc',
  exploration: '#26a69a',
  rescue: '#ff7043',
  escort: '#ffa726',
  delivery: '#42a5f5',
  collection: '#9ccc65',
  capture: '#ec407a',
  protection: '#5c6bc0',
  research: '#26c6da',
  training: '#ff7043',
  social: '#ab47bc',
  emergency: '#ef5350',
  miscellaneous: '#8d6e63',
}

function getCategoryColor(category: QuestCategory): string {
  return categoryColors[category] || '#90a4ae'
}

// ── Status Config ───────────────────────────────────────────────────────────
const statusConfig: Record<QuestStatus, { label: string; stampClass: string }> = {
  available: { label: 'OPEN', stampClass: 'stamp-open' },
  taken: { label: 'IN PROGRESS', stampClass: 'stamp-progress' },
  completed: { label: 'SOLVED', stampClass: 'stamp-solved' },
}

// ── Options ─────────────────────────────────────────────────────────────────
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

// ── Computed Properties ─────────────────────────────────────────────────────
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
  <v-container fluid class="pa-0 notebook-wrapper-dark">
    <WikiHero
      title="Field Journal & Quest Notes"
      subtitle="Hand-pinned notices, local requests, and research logs."
      icon="mdi-notebook-edit-outline"
      pattern="pokeball"
    >
      <template #chips>
        <div class="d-flex justify-center align-center flex-wrap ga-3 w-100 px-4">
          <div class="journal-tag-strip d-flex align-center flex-wrap ga-3 pa-2 px-5">
            <span class="handwritten-label">Summary:</span>
            <span class="journal-pill open-pill">Total Quests: {{ availableCount }}</span>
            <span class="journal-pill mission-pill">Missions: {{ missionsCount }}</span>
            <span class="journal-pill job-pill">PokéJobs: {{ pokejobsCount }}</span>
          </div>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1440" class="py-8">
      <div class="notebook-filter-bar mb-8 pa-4">
        <v-row align="center" density="comfortable">
          <v-col cols="12" md="4" lg="4">
            <v-tabs v-model="activeTypeTab" color="amber-lighten-2" density="compact" align-tabs="start">
              <v-tab value="all" class="handwritten-tab">All Quests</v-tab>
              <v-tab value="mission" class="handwritten-tab">
                <v-icon start size="16">mdi-target</v-icon>
                Missions
              </v-tab>
              <v-tab value="pokejob" class="handwritten-tab">
                <v-icon start size="16">mdi-briefcase-search-outline</v-icon>
                PokéJobs
              </v-tab>
            </v-tabs>
          </v-col>

          <v-col cols="12" sm="6" md="3" lg="3">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search..."
              variant="outlined"
              density="compact"
              hide-details
              clearable
              class="notebook-input"
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
              class="notebook-input"
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
              class="flex-grow-1 notebook-input"
            />

            <v-btn-toggle
              v-model="viewMode"
              mandatory
              variant="outlined"
              density="compact"
              color="amber-lighten-2"
              class="notebook-toggle"
            >
              <v-btn value="board" icon="mdi-view-dashboard-variant-outline" title="Field Board" />
              <v-btn value="grid" icon="mdi-view-grid-outline" title="Grid Log" />
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
              color="amber-lighten-3"
              icon="mdi-eraser"
              title="Clear Journal Search"
              @click="clearFilters"
            />
          </v-col>
        </v-row>
      </div>

      <div v-if="filteredQuests.length > 0">
        <v-row v-if="viewMode === 'grid'">
          <v-col
            v-for="quest in filteredQuests"
            :key="quest.id"
            cols="12"
            md="6"
            lg="4"
            class="mb-4"
          >
            <div class="notebook-note-card cursor-pointer h-100 d-flex flex-column" @click="openQuestModal(quest)">
              <div class="washi-tape" />

              <div :class="['status-stamp', statusConfig[quest.status].stampClass]">
                {{ statusConfig[quest.status].label }}
              </div>

              <div class="note-header border-b-dark pa-4 pt-6 d-flex align-center justify-space-between flex-wrap ga-2">
                <div class="d-flex align-center ga-2">
                  <span class="note-type-badge" :style="{ backgroundColor: quest.type === 'mission' ? '#b71c1c' : '#f57f17' }">
                    {{ quest.type }}
                  </span>
                  <span class="note-category-badge" :style="{ borderColor: getCategoryColor(quest.category), color: getCategoryColor(quest.category) }">
                    {{ quest.category }}
                  </span>
                </div>
              </div>

              <div class="note-body pa-5 flex-grow-1 d-flex flex-column justify-space-between">
                <div>
                  <h3 class="handwritten-title text-h6 font-weight-bold mb-2">
                    {{ quest.title }}
                  </h3>
                  
                  <div v-if="quest.issuer" class="issuer-stamp-card mb-3 d-inline-flex align-center ga-2 pa-1 px-3">
                    <v-icon size="14" color="amber-lighten-3">mdi-account-edit-outline</v-icon>
                    <span class="issuer-label">Issued by:</span>
                    <span class="issuer-name">{{ quest.issuer.name }}</span>
                  </div>

                  <p class="handwritten-text text-body-2 line-clamp-3 mb-4">
                    {{ quest.description }}
                  </p>
                </div>

                <div class="pt-3 border-t-dashed">
                  <div class="location-banner d-flex align-center justify-space-between pa-2 px-3">
                    <span class="d-inline-flex align-center location-text">
                      <v-icon size="16" start color="amber-lighten-2">mdi-compass-rose</v-icon>
                      {{ formatQuestLocation(quest) }}
                    </span>
                    <span v-if="quest.repeatable" class="repeat-tag">
                      ★ Repeatable
                    </span>
                  </div>
                </div>
              </div>

              <div class="note-footer pa-3 px-5 d-flex justify-space-between align-center">
                <span class="handwritten-mono text-caption">
                  ID: #{{ quest.id }}
                </span>
                <span class="inspect-link text-caption d-flex align-center ga-1">
                  Read Note <v-icon size="14">mdi-arrow-right</v-icon>
                </span>
              </div>
            </div>
          </v-col>
        </v-row>

        <div v-else class="quest-masonry-board">
          <div v-for="quest in filteredQuests" :key="quest.id" class="masonry-item mb-6">
            <div class="notebook-note-card cursor-pointer" @click="openQuestModal(quest)">
              <div class="washi-tape" />

              <div :class="['status-stamp', statusConfig[quest.status].stampClass]">
                {{ statusConfig[quest.status].label }}
              </div>

              <div class="note-header border-b-dark pa-4 pt-6 d-flex align-center justify-space-between flex-wrap ga-2">
                <div class="d-flex align-center ga-2">
                  <span class="note-type-badge" :style="{ backgroundColor: quest.type === 'mission' ? '#b71c1c' : '#f57f17' }">
                    {{ quest.type }}
                  </span>
                  <span class="note-category-badge" :style="{ borderColor: getCategoryColor(quest.category), color: getCategoryColor(quest.category) }">
                    {{ quest.category }}
                  </span>
                </div>
              </div>

              <div class="note-body pa-5">
                <h3 class="handwritten-title text-h6 font-weight-bold mb-2">
                  {{ quest.title }}
                </h3>

                <div v-if="quest.issuer" class="issuer-stamp-card mb-3 d-inline-flex align-center ga-2 pa-1 px-3">
                  <v-icon size="14" color="amber-lighten-3">mdi-account-edit-outline</v-icon>
                  <span class="issuer-label">Issued by:</span>
                  <span class="issuer-name">{{ quest.issuer.name }}</span>
                </div>

                <p class="handwritten-text text-body-2 mb-4">
                  {{ quest.description }}
                </p>

                <div v-if="quest.objectives.length > 0" class="journal-checklist mb-4 pa-3">
                  <div class="handwritten-label text-caption mb-2">
                    Objectives List:
                  </div>
                  <ul class="text-caption pl-4 mb-0 handwritten-list">
                    <li v-for="obj in quest.objectives" :key="obj.id" class="mb-1">
                      {{ obj.description }}
                    </li>
                  </ul>
                </div>

                <div class="pt-3 border-t-dashed">
                  <div class="location-banner d-flex align-center justify-space-between pa-2 px-3">
                    <span class="d-inline-flex align-center location-text">
                      <v-icon size="16" start color="amber-lighten-2">mdi-compass-rose</v-icon>
                      {{ formatQuestLocation(quest) }}
                    </span>
                    <span v-if="quest.repeatable" class="repeat-tag">
                      ★ Repeatable
                    </span>
                  </div>
                </div>
              </div>

              <div class="note-footer pa-3 px-5 d-flex justify-space-between align-center">
                <span class="handwritten-mono text-caption">
                  ID: #{{ quest.id }}
                </span>
                <span class="inspect-link text-caption d-flex align-center ga-1">
                  Inspect Notice <v-icon size="14">mdi-arrow-right</v-icon>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-journal-card text-center py-16 pa-6">
        <v-icon size="64" color="amber-lighten-3" class="mb-4">mdi-book-search-outline</v-icon>
        <h3 class="handwritten-title text-h5 mb-2">No Quests Found</h3>
        <p class="handwritten-text text-body-1 mb-6">
          No entries found matching queries.
        </p>
        <v-btn
          variant="outlined"
          color="amber-lighten-2"
          class="font-weight-bold"
          @click="clearFilters"
        >
          Clear Quest Search
        </v-btn>
      </div>
    </v-container>

    <v-dialog v-model="dialogOpen" max-width="700">
      <div v-if="selectedQuest" class="journal-dialog-card pa-6">
        <div class="washi-tape dialog-tape" />

        <div class="dialog-header pb-4 border-b-dark">
          <div class="d-flex align-center justify-space-between ga-2 mb-3">
            <div class="d-flex align-center ga-2">
              <span class="note-type-badge" :style="{ backgroundColor: selectedQuest.type === 'mission' ? '#b71c1c' : '#f57f17' }">
                {{ selectedQuest.type }}
              </span>
              <span class="note-category-badge" :style="{ borderColor: getCategoryColor(selectedQuest.category), color: getCategoryColor(selectedQuest.category) }">
                {{ selectedQuest.category }}
              </span>
            </div>
            <div :class="['status-stamp-dialog', statusConfig[selectedQuest.status].stampClass]">
              {{ statusConfig[selectedQuest.status].label }}
            </div>
          </div>

          <h2 class="handwritten-title text-h4 mb-2">
            {{ selectedQuest.title }}
          </h2>

          <div v-if="selectedQuest.issuer" class="issuer-stamp-card d-inline-flex align-center ga-2 pa-2 px-4 mt-2">
            <v-icon size="18" color="amber-lighten-3">mdi-account-edit-outline</v-icon>
            <span class="issuer-label">Issued By:</span>
            <strong class="issuer-name text-body-1">{{ selectedQuest.issuer.name }}</strong>
          </div>
        </div>

        <div class="dialog-body py-6">
          <div v-if="getLocationDetails(selectedQuest).length > 0" class="mb-6">
            <h3 class="handwritten-label text-subtitle-1 mb-2">
              🧭 Location Breakdown
            </h3>
            <div class="d-flex flex-wrap ga-2">
              <span v-for="(detail, idx) in getLocationDetails(selectedQuest)" :key="idx" class="location-chip">
                {{ detail }}
              </span>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="handwritten-label text-subtitle-1 mb-2">
              📜 Field Notes
            </h3>
            <p class="handwritten-text text-body-1">
              {{ selectedQuest.description }}
            </p>
          </div>

          <div v-if="selectedQuest.objectives.length > 0" class="mb-6">
            <h3 class="handwritten-label text-subtitle-1 mb-3">
              ✏️ Tasks & Checklist ({{ selectedQuest.objectives.length }})
            </h3>
            <div class="journal-checklist pa-4">
              <div
                v-for="obj in selectedQuest.objectives"
                :key="obj.id"
                class="d-flex align-start ga-3 py-2 border-b-dashed last-no-border"
              >
                <v-icon size="18" color="amber-lighten-2" class="mt-0-5">
                  {{ obj.optional ? 'mdi-checkbox-blank-outline' : 'mdi-checkbox-marked-outline' }}
                </v-icon>
                <div class="handwritten-text text-body-1">
                  <span>{{ obj.description }}</span>
                  <span v-if="obj.optional" class="optional-tag ml-2">(Optional Task)</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="selectedQuest.rewards.length > 0" class="mb-4">
            <h3 class="handwritten-label text-subtitle-1 mb-3">
              🎁 Offered Rewards
            </h3>
            <div class="d-flex flex-wrap ga-2">
              <span v-for="reward in selectedQuest.rewards" :key="reward.id" class="reward-tag">
                {{ reward.description }}
              </span>
            </div>
          </div>
        </div>

        <div class="dialog-footer pt-4 border-t-dark d-flex justify-space-between align-center">
          <span class="handwritten-mono text-caption">ID: #{{ selectedQuest.id }}</span>
          <v-btn
            variant="outlined"
            color="amber-lighten-2"
            class="font-weight-bold"
            @click="dialogOpen = false"
          >
            Close Journal Entry
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </v-container>
</template>

<style scoped>
/* Dark Mode Base Wrapper */
.notebook-wrapper-dark {
  background-color: #121212;
  color: #e0e0e0;
}

/* Typography Overrides */
.handwritten-title {
  font-family: 'Georgia', 'Times New Roman', serif;
  color: #f5f0eb;
}

.handwritten-text {
  font-family: 'Georgia', 'Times New Roman', serif;
  color: #d1c7bd;
  line-height: 1.6;
}

.handwritten-label {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-weight: bold;
  color: #ffb74d;
}

.handwritten-mono {
  font-family: 'Courier New', Courier, monospace;
  color: #a0958a;
}

/* Header Strip */
.journal-tag-strip {
  background: #1e1e1e;
  border: 1px dashed #444;
  border-radius: 4px;
}

.journal-pill {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 10px;
  border-radius: 12px;
}

.open-pill { background: #1b3820; color: #81c784; border: 1px solid #2e7d32; }
.mission-pill { background: #3e1b1b; color: #e57373; border: 1px solid #c62828; }
.job-pill { background: #3a3013; color: #ffd54f; border: 1px solid #f57f17; }

/* Dark Filter Bar */
.notebook-filter-bar {
  background-color: #1a1a1a;
  border: 2px solid #333;
  border-radius: 8px;
  box-shadow: 3px 3px 0px #080808;
}

.notebook-input :deep(.v-field) {
  background-color: #242424 !important;
  border-radius: 4px;
}

/* Dark Notebook Cards */
.notebook-note-card {
  position: relative;
  background-color: #1e1e1e;
  /* Ruled Dark Lines Effect */
  background-image: repeating-linear-gradient(#1e1e1e, #1e1e1e 27px, #2a2a2a 28px);
  border: 1px solid #3d332a;
  box-shadow: 4px 4px 0px #0a0a0a;
  border-radius: 2px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.notebook-note-card:hover {
  transform: translateY(-4px) rotate(-0.5deg);
  box-shadow: 6px 8px 0px #000000;
  border-color: #ffb74d;
}

/* Dark Washi Tape Effect */
.washi-tape {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-1deg);
  width: 90px;
  height: 20px;
  background-color: rgba(90, 80, 65, 0.7);
  border: 1px dashed #6d5d4d;
  z-index: 2;
}

.dialog-tape {
  top: -12px;
  width: 140px;
  height: 24px;
}

/* Dark Rubber Stamps */
.status-stamp {
  position: absolute;
  top: 18px;
  right: 16px;
  padding: 2px 8px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 0.7rem;
  letter-spacing: 1px;
  border: 2px solid;
  border-radius: 4px;
  transform: rotate(8deg);
  opacity: 0.9;
}

.status-stamp-dialog {
  padding: 4px 10px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 0.8rem;
  letter-spacing: 1px;
  border: 2px solid;
  border-radius: 4px;
  transform: rotate(-4deg);
}

.stamp-open { color: #81c784; border-color: #81c784; }
.stamp-progress { color: #ff8a65; border-color: #ff8a65; }
.stamp-solved { color: #b0bec5; border-color: #b0bec5; }

/* Badges & Stamps */
.note-type-badge {
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.65rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 2px;
}

.note-category-badge {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.65rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 1px 5px;
  border: 1px solid;
  border-radius: 2px;
  background-color: #121212;
}

/* Issuer Styling */
.issuer-stamp-card {
  background-color: #14110f;
  border: 1px dashed #5c4731;
  border-radius: 4px;
  font-family: 'Georgia', 'Times New Roman', serif;
}

.issuer-label {
  font-size: 0.75rem;
  color: #a08c78;
  font-style: italic;
}

.issuer-name {
  font-size: 0.8rem;
  color: #ffcc80;
  font-weight: bold;
}

/* Location Highlight Banner */
.location-banner {
  background-color: #171513;
  border-left: 3px solid #ffb74d;
  border-radius: 0 4px 4px 0;
}

.location-text {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-weight: 600;
  color: #e0d6cc;
}

.repeat-tag {
  color: #ffd54f;
  font-weight: bold;
  font-size: 0.75rem;
}

.inspect-link {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-weight: bold;
  color: #ffb74d;
}

/* Dark Checklist */
.journal-checklist {
  background-color: #171614;
  border: 1px dashed #3a342c;
  border-radius: 4px;
}

.border-b-dark {
  border-bottom: 1px solid #2d2925;
}

.border-t-dark {
  border-top: 1px solid #2d2925;
}

.border-t-dashed {
  border-top: 1px dashed #3a342c;
}

.border-b-dashed {
  border-bottom: 1px dashed #3a342c;
}

.last-no-border:last-child {
  border-bottom: none !important;
}

/* Dialog Container */
.journal-dialog-card {
  position: relative;
  background-color: #1a1a1a;
  border: 2px solid #3d332a;
  box-shadow: 8px 8px 0px #000000;
  border-radius: 4px;
}

.location-chip {
  background-color: #24201c;
  border: 1px solid #524436;
  color: #ffcc80;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.75rem;
}

.reward-tag {
  background-color: #1b331e;
  border: 1px solid #2e7d32;
  color: #a5d6a7;
  padding: 4px 12px;
  border-radius: 4px;
  font-family: 'Georgia', 'Times New Roman', serif;
  font-weight: bold;
  font-size: 0.85rem;
}

.optional-tag {
  font-size: 0.75rem;
  color: #ffb74d;
  font-style: italic;
}

.empty-journal-card {
  background-color: #181818;
  border: 2px dashed #333;
  border-radius: 8px;
}

/* Layout Utilities */
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mt-0-5 {
  margin-top: 2px;
}
</style>
