<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import WikiHero from '@/components/sections/WikiHero.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

import { EventInstance } from '@/types/events'
import { eventInstances as rawEventInstances } from '@/data/events/instances.ts'
import { TravelGroup } from '@/types/travel-group'
import { OverarchingPlot } from '@/types/plots'
import plots from '@/data/plots'

import { travelGroups } from '@/data/travel-group'

import { useCharacterStore } from '@/stores/useCharacterStore'

const router = useRouter()
const characterStore = useCharacterStore()

// ─────────────────────────────────────────────
// STATE MANAGEMENT
// ─────────────────────────────────────────────
const activeTab = ref<'plots' | 'events' | 'groups'>('plots')

const allPlots = ref<OverarchingPlot[]>(plots)
const openGroups = ref([...travelGroups])

// ─────────────────────────────────────────────
// COMPUTED
// ─────────────────────────────────────────────
const ongoingEvents = computed(() => {
  if (!rawEventInstances || !Array.isArray(rawEventInstances)) return []
  return rawEventInstances.filter((e) => e.status?.trim().toLowerCase() === 'ongoing')
})

const selectedPlot = ref<OverarchingPlot | null>(allPlots.value[0] || null)
const selectedEvent = ref<EventInstance | null>(ongoingEvents.value[0] || null)
const selectedGroup = ref<TravelGroup | null>(openGroups.value[0] || null)

// Focus first index item cleanly on tab change
watch(activeTab, (newTab) => {
  if (newTab === 'plots') {
    selectedPlot.value = allPlots.value[0] || null
  } else if (newTab === 'events') {
    selectedEvent.value = ongoingEvents.value[0] || null
  } else if (newTab === 'groups') {
    selectedGroup.value = openGroups.value[0] || null
  }
})

// ─────────────────────────────────────────────
// ROUTING HELPERS
// ─────────────────────────────────────────────
const getCharacterLink = (characterId: string) => {
  const registeredCharacter = characterStore.getCharacterById(characterId)
  if (registeredCharacter) {
    return `/sandbox/characters/${registeredCharacter.region}/${registeredCharacter.category}/${registeredCharacter.id}`
  }
  const isNpc = characterId.includes('npc') || characterId.startsWith('sys-')
  const category = isNpc ? 'npc' : 'oc'
  const region = 'global'
  return `/characters/${region}/${category}/${characterId}/index`
}

const navigateToEventInstance = (event: EventInstance) => {
  router.push(`/sandbox/events/${event.eventSlug}/${event.instanceId}`)
}

const isExternalLink = (url?: string) => {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://')
}

// ─────────────────────────────────────────────
// DATE FORMATTERS
// ─────────────────────────────────────────────
const formatEventDate = (dateVal?: string | Date): string => {
  if (!dateVal) return 'Unscheduled'
  try {
    const parsedDate = new Date(dateVal)
    if (isNaN(parsedDate.getTime())) return String(dateVal)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(parsedDate)
  } catch {
    return String(dateVal)
  }
}

const formatGroupDate = (dateVal?: string | Date): string => {
  if (!dateVal) return 'Recent'
  try {
    const parsedDate = new Date(dateVal)
    if (isNaN(parsedDate.getTime())) return String(dateVal)
    return parsedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return String(dateVal)
  }
}
</script>

<template>
  <v-container fluid class="pa-0 wiki-page-wrapper">
    <!-- ───────────────────────────────────── -->
    <!-- HERO -->
    <!-- ───────────────────────────────────── -->
    <WikiHero
      title="The Sandbox"
      subtitle="Open-world Pokémon roleplay framework."
      icon="mdi-compass-outline"
      pattern="pokeball"
      class="wiki-hero-border"
    >
      <template #chips>
        <div class="hero-status-row">
          <v-chip size="small" color="primary" variant="flat" class="font-weight-bold"
            >Era: 8 Years Post-SWSH</v-chip
          >
          <v-chip size="small" color="success" variant="flat" class="font-weight-bold"
            >Status: Active</v-chip
          >
          <v-chip size="small" color="secondary" variant="flat" class="font-weight-bold"
            >Network: Open</v-chip
          >
        </div>
      </template>
    </WikiHero>

    <!-- ───────────────────────────────────── -->
    <!-- MAIN WORKSPACE -->
    <!-- ───────────────────────────────────── -->
    <v-container max-width="1400" class="py-8">
      <section class="wiki-board-card">
        <!-- HEADER -->
        <header class="wiki-board-header">
          <div class="d-flex align-center ga-2">
            <v-icon color="primary" size="22">mdi-text-box-multiple-outline</v-icon>
            <h2 class="wiki-board-title">Keen Eye Reports</h2>
          </div>
          <div class="wiki-board-subtitle text-medium-emphasis text-caption font-weight-bold">
            Roleplay Overview
          </div>
        </header>

        <!-- TAB STRIP -->
        <div class="wiki-tab-navigation">
          <button
            class="wiki-nav-btn"
            :class="{ 'wiki-nav-btn--active': activeTab === 'plots' }"
            @click="activeTab = 'plots'"
          >
            Overarching Plots
          </button>
          <button
            class="wiki-nav-btn"
            :class="{ 'wiki-nav-btn--active': activeTab === 'events' }"
            @click="activeTab = 'events'"
          >
            Active Events
          </button>
          <button
            class="wiki-nav-btn"
            :class="{ 'wiki-nav-btn--active': activeTab === 'groups' }"
            @click="activeTab = 'groups'"
          >
            Open Groups
          </button>
        </div>

        <!-- MAIN VIEWPORT -->
        <div class="wiki-viewport">
          <!-- ───────────────────────────── -->
          <!-- PLOTS TAB -->
          <!-- ───────────────────────────── -->
          <template v-if="activeTab === 'plots'">
            <aside class="wiki-sidebar custom-inner-scroll">
              <div class="sidebar-section-heading">Active Plots</div>
              <button
                v-for="plot in allPlots"
                :key="plot.id"
                class="sidebar-row-item"
                :class="{ 'sidebar-row-item--active': selectedPlot?.id === plot.id }"
                @click="selectedPlot = plot"
              >
                <div class="row-item-title">{{ plot.title }}</div>
                <div class="row-item-meta">
                  <span class="text-primary font-weight-bold">{{ plot.statusLabel }}</span>
                  <span>•</span>
                  <span>{{ plot.featuredCharacters?.length || 0 }} Characters</span>
                </div>
              </button>
            </aside>

            <!-- Welcome Screen Fallback Condition -->
            <section
              v-if="!selectedPlot"
              class="wiki-detail-view custom-inner-scroll d-flex flex-column justify-center align-center text-center pa-8"
            >
              <v-icon size="48" color="medium-emphasis" class="mb-3"
                >mdi-book-open-blank-variant</v-icon
              >
              <h4 class="text-h6 font-weight-bold text-high-emphasis mb-2">No Plot Selected</h4>
              <p class="text-body-2 text-medium-emphasis max-w-content mb-0">
                Select an active story front from the sidebar index to view comprehensive timelines,
                core character nodes, and related sub-arcs.
              </p>
            </section>

            <!-- Hydrated Detail View -->
            <section v-else class="wiki-detail-view custom-inner-scroll">
              <div class="detail-header-block">
                <div>
                  <span
                    class="text-caption font-weight-bold text-primary text-uppercase tracking-wide"
                    >Plot Record ID: {{ selectedPlot.id }}</span
                  >
                  <h3 class="text-h5 font-weight-black mt-1">{{ selectedPlot.title }}</h3>
                </div>
                <v-chip color="primary" variant="tonal" label class="font-weight-bold">
                  {{ selectedPlot.statusLabel }}
                </v-chip>
              </div>

              <div class="content-data-section">
                <h4 class="data-label">Summary</h4>
                <p class="data-text-body">
                  {{ selectedPlot.summary }}
                </p>
              </div>

              <div v-if="selectedPlot.contactPerson" class="content-data-section">
                <h4 class="data-label">Coordinator</h4>
                <a
                  :href="selectedPlot.contactPerson.rpnlink"
                  target="_blank"
                  class="wiki-action-link"
                >
                  <v-icon size="16" class="mr-1">mdi-account-circle-outline</v-icon>
                  @{{ selectedPlot.contactPerson.name }}
                </a>
              </div>

              <div v-if="selectedPlot.featuredCharacters?.length" class="content-data-section">
                <h4 class="data-label">Core Characters</h4>
                <div class="wiki-pill-registry">
                  <template
                    v-for="characterId in selectedPlot.featuredCharacters"
                    :key="characterId"
                  >
                    <v-tooltip location="top" open-delay="150">
                      <template v-slot:activator="{ props }">
                        <router-link
                          v-bind="props"
                          :to="getCharacterLink(characterId)"
                          class="wiki-pill-link"
                        >
                          {{
                            characterStore.getCharacterById(characterId)?.name?.short?.[0] ||
                            characterId
                          }}
                          <v-icon
                            v-if="
                              characterStore.getCharacterById(characterId)?.trainerClass?.primary
                            "
                            size="13"
                            color="primary"
                            class="ml-1"
                          >
                            mdi-shield-account
                          </v-icon>
                        </router-link>
                      </template>
                      <div class="text-caption pa-1">
                        <span class="font-weight-bold">Class:</span>
                        {{
                          characterStore.getCharacterById(characterId)?.trainerClass?.primary ||
                          'Unassigned'
                        }}
                      </div>
                    </v-tooltip>
                  </template>
                </div>
              </div>

              <div v-if="selectedPlot.relatedArcs?.length" class="content-data-section">
                <h4 class="data-label">Related Arcs</h4>
                <div class="arcs-vertical-stack">
                  <div v-for="sub in selectedPlot.relatedArcs" :key="sub.id" class="arc-data-node">
                    <div class="arc-node-title">{{ sub.title }}</div>
                    <div class="arc-node-brief">{{ sub.brief }}</div>
                  </div>
                </div>
              </div>

              <div v-if="selectedPlot.genre" class="genre-accent-box">
                <div class="data-label mb-1">Genre & Tone</div>
                <div class="text-body-2 font-weight-medium text-high-emphasis">
                  {{ selectedPlot.genre }}
                </div>
              </div>
            </section>
          </template>

          <!-- ───────────────────────────── -->
          <!-- EVENTS TAB -->
          <!-- ───────────────────────────── -->
          <template v-if="activeTab === 'events'">
            <aside class="wiki-sidebar custom-inner-scroll">
              <div class="sidebar-section-heading">Ongoing Events</div>
              <button
                v-for="event in ongoingEvents"
                :key="event.instanceId"
                class="sidebar-row-item"
                :class="{
                  'sidebar-row-item--active': selectedEvent?.instanceId === event.instanceId,
                }"
                @click="selectedEvent = event"
              >
                <div class="row-item-title">
                  {{
                    event.customDescription
                      ? event.customDescription.split(':')[0]
                      : event.eventSlug
                  }}
                </div>
                <div class="row-item-meta">
                  <span>{{ event.location }}</span>
                </div>
              </button>
            </aside>

            <!-- Hydrated Detail View -->
            <section v-if="selectedEvent" class="wiki-detail-view custom-inner-scroll">
              <div class="detail-header-block">
                <div>
                  <span
                    class="text-caption font-weight-bold text-success text-uppercase tracking-wide"
                    >Active Event Instance</span
                  >
                  <h3 class="text-h5 font-weight-black mt-1">
                    {{ selectedEvent.customDescription }}
                  </h3>
                </div>
                <v-chip color="success" variant="flat" label class="font-weight-bold">
                  Active Run
                </v-chip>
              </div>

              <div class="wiki-grid-layout">
                <div class="content-data-section">
                  <h4 class="data-label">Location</h4>
                  <div class="data-text-prominent text-high-emphasis">
                    {{ selectedEvent.location }}
                  </div>
                </div>

                <div class="content-data-section">
                  <h4 class="data-label">Timestamp</h4>
                  <div class="data-text-prominent text-primary">
                    {{ formatEventDate(selectedEvent.start) }}
                  </div>
                </div>
              </div>

              <div class="content-data-section">
                <h4 class="data-label">Weather</h4>
                <div class="data-text-prominent text-amber-darken-4">
                  <v-icon size="18" color="amber-darken-4" class="mr-1"
                    >mdi-weather-partly-cloudy</v-icon
                  >
                  {{ selectedEvent.weatherCondition || 'Standard Clear' }}
                </div>
              </div>

              <div class="content-data-section">
                <h4 class="data-label">Status Details</h4>
                <p class="data-text-body text-capitalize">
                  {{ selectedEvent.status }}
                </p>
              </div>

              <v-btn
                color="primary"
                flat
                class="mt-4 font-weight-bold px-6"
                @click="navigateToEventInstance(selectedEvent)"
              >
                Explore Event Details
                <v-icon right class="ml-2">mdi-arrow-right</v-icon>
              </v-btn>
            </section>
          </template>

          <!-- ───────────────────────────── -->
          <!-- GROUPS TAB -->
          <!-- ───────────────────────────── -->
          <template v-if="activeTab === 'groups'">
            <aside class="wiki-sidebar custom-inner-scroll">
              <div class="sidebar-section-heading">Open Groups</div>
              <button
                v-for="group in openGroups"
                :key="group.id"
                class="sidebar-row-item"
                :class="{ 'sidebar-row-item--active': selectedGroup?.id === group.id }"
                @click="selectedGroup = group"
              >
                <div class="row-item-title">{{ group.name }}</div>
                <div class="row-item-meta">
                  <span>{{ formatGroupDate(group.date) }}</span>
                  <span>•</span>
                  <span class="text-capitalize">{{ group.activityLevel }} Pace</span>
                  <span>•</span>
                  <span>{{ group.members?.length || 0 }} Members</span>
                </div>
              </button>
            </aside>

            <!-- Welcome Screen Fallback Condition -->
            <section
              v-if="!selectedGroup"
              class="wiki-detail-view custom-inner-scroll d-flex flex-column justify-center align-center text-center pa-8"
            >
              <v-icon size="48" color="medium-emphasis" class="mb-3"
                >mdi-account-group-outline</v-icon
              >
              <h4 class="text-h6 font-weight-bold text-high-emphasis mb-2">No Group Selected</h4>
              <p class="text-body-2 text-medium-emphasis max-w-content mb-0">
                Select an open party registry entry to inspect traveling coordinates, narrative
                progression schedules, active objectives, and crew logs.
              </p>
            </section>

            <!-- Hydrated Detail View -->
            <section v-else class="wiki-detail-view custom-inner-scroll">
              <div class="detail-header-block">
                <div>
                  <span
                    class="text-caption font-weight-bold text-secondary text-uppercase tracking-wide"
                    >GROUP NAME</span
                  >
                  <h3 class="text-h5 font-weight-black mt-1">{{ selectedGroup.name }}</h3>
                </div>
                <v-chip color="secondary" variant="flat" label class="font-weight-bold">
                  Accepting Members
                </v-chip>
              </div>

              <div class="wiki-grid-layout">
                <div class="content-data-section">
                  <h4 class="data-label">Current Region / Location</h4>
                  <div class="data-text-prominent text-high-emphasis">
                    {{ selectedGroup.location.toUpperCase() }}
                  </div>
                </div>

                <div class="content-data-section" v-if="selectedGroup.activityLevel">
                  <h4 class="data-label">Activity Level & Pacing</h4>
                  <div class="data-text-prominent text-primary text-capitalize">
                    {{ selectedGroup.activityLevel }} Pace
                  </div>
                </div>
              </div>

              <div class="content-data-section">
                <h4 class="data-label">GROUP DATE</h4>
                <div class="data-text-body font-weight-medium">
                  {{ formatGroupDate(selectedGroup.date) }}
                </div>
              </div>

              <div class="content-data-section">
                <h4 class="data-label">Current Objective (Short-Term)</h4>
                <p class="data-text-body text-high-emphasis font-weight-medium">
                  {{ selectedGroup.objective }}
                </p>
              </div>

              <div v-if="selectedGroup.contactPerson" class="content-data-section">
                <h4 class="data-label">Coordinator</h4>
                <a
                  :href="selectedGroup.contactPerson.rpnlink"
                  target="_blank"
                  class="wiki-action-link"
                >
                  <v-icon size="16" class="mr-1">mdi-crown-outline</v-icon>
                  @{{ selectedGroup.contactPerson.name }}
                </a>
              </div>

              <div class="content-data-section">
                <h4 class="data-label">MEMBERS</h4>
                <div class="wiki-pill-registry">
                  <span
                    v-if="!selectedGroup.members || selectedGroup.members.length === 0"
                    class="text-medium-emphasis font-italic text-body-2"
                  >
                    No active characters registered to this party.
                  </span>
                  <template v-else v-for="characterId in selectedGroup.members" :key="characterId">
                    <v-tooltip location="top" open-delay="150" bg-color="surface">
                      <template v-slot:activator="{ props }">
                        <router-link
                          v-bind="props"
                          :to="getCharacterLink(characterId)"
                          class="wiki-pill-link"
                        >
                          {{
                            characterStore.getCharacterById(characterId)?.name?.short?.[0] ||
                            characterId
                          }}
                          <v-icon
                            v-if="
                              characterStore.getCharacterById(characterId)?.trainerClass?.primary
                            "
                            size="13"
                            color="primary"
                            class="ml-1"
                          >
                            mdi-shield-account
                          </v-icon>
                        </router-link>
                      </template>
                      <div class="text-caption pa-1">
                        <span class="font-weight-bold">Class:</span>
                        {{
                          characterStore.getCharacterById(characterId)?.trainerClass?.primary ||
                          'Unassigned'
                        }}
                      </div>
                    </v-tooltip>
                  </template>
                </div>
              </div>

              <div v-if="selectedGroup.intent" class="genre-accent-box">
                <div class="data-label mb-1">Mood & Tone</div>
                <div class="text-body-2 font-weight-medium text-high-emphasis">
                  {{ selectedGroup.intent }}
                </div>
              </div>

              <v-btn
                v-if="selectedGroup.threadUrl"
                :href="
                  isExternalLink(selectedGroup.threadUrl) ? selectedGroup.threadUrl : undefined
                "
                :to="!isExternalLink(selectedGroup.threadUrl) ? selectedGroup.threadUrl : undefined"
                :target="isExternalLink(selectedGroup.threadUrl) ? '_blank' : undefined"
                flat
                color="secondary"
                class="mt-5 font-weight-bold"
              >
                Access Roleplay Thread
                <v-icon right class="ml-2">mdi-open-in-new</v-icon>
              </v-btn>
            </section>
          </template>
        </div>
      </section>

      <!-- ───────────────────────────────────── -->
      <!-- ENTRY GATE -->
      <!-- ───────────────────────────────────── -->
      <WikiAlert type="info" class="wiki-alert-card mt-6 elevation-1">
        <div class="wiki-alert-layout">
          <div>
            <h3 class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
              Ready to Register?
            </h3>
            <p class="text-body-2 text-medium-emphasis mb-0">
              Access onboarding documentation to establish your trainer registry files inside the
              global environment index logs.
            </p>
          </div>
          <div class="d-flex ga-3 align-center flex-wrap">
            <v-btn variant="outlined" color="secondary" to="/sandbox/lore" class="font-weight-bold">
              Lore Archive
            </v-btn>
            <v-btn color="primary" flat to="/sandbox/trainer-101" class="font-weight-bold">
              Trainer 101
            </v-btn>
          </div>
        </div>
      </WikiAlert>
    </v-container>
  </v-container>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;900&display=swap');

/* ───────────────────────────────────────── */
/* FOUNDATION & SYSTEM THEMING */
/* ───────────────────────────────────────── */
.wiki-page-wrapper {
  font-family: 'Outfit', sans-serif;
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
}

.wiki-hero-border {
  border-bottom: 2px solid rgb(var(--v-theme-surface-variant));
}

.hero-status-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 4px;
}

/* ───────────────────────────────────────── */
/* WIKI INTEGRATED DASHBOARD CARD */
/* ───────────────────────────────────────── */
.wiki-board-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 8px;
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.wiki-board-header {
  background: linear-gradient(90deg, rgba(var(--v-theme-primary), 0.04), transparent);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
}

.wiki-board-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
}

/* ───────────────────────────────────────── */
/* MODERN NAVIGATION TABS */
/* ───────────────────────────────────────── */
.wiki-tab-navigation {
  height: 48px;
  display: flex;
  background: rgba(var(--v-theme-on-surface), 0.02);
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  padding: 0 12px;
  gap: 8px;
}

.wiki-nav-btn {
  height: 100%;
  padding: 0 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgb(var(--v-theme-text-medium-emphasis));
  position: relative;
  background: transparent;
  transition: color 0.2s ease;
}

.wiki-nav-btn:hover {
  color: rgb(var(--v-theme-primary));
}

.wiki-nav-btn--active {
  color: rgb(var(--v-theme-primary));
}

.wiki-nav-btn--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: rgb(var(--v-theme-primary));
  border-radius: 3px 3px 0 0;
}

/* ───────────────────────────────────────── */
/* WORKSPACE CONTENT MODULES */
/* ───────────────────────────────────────── */
.wiki-viewport {
  height: 700px;
  display: grid;
  grid-template-columns: 340px 1fr;
  overflow: hidden;
}

.wiki-sidebar {
  border-right: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  background-color: rgba(var(--v-theme-on-surface), 0.01);
  overflow-y: auto;
}

.sidebar-section-heading {
  position: sticky;
  top: 0;
  padding: 14px 20px;
  background: rgb(var(--v-theme-surface));
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 700;
  color: rgba(var(--v-theme-on-surface), 0.6);
  z-index: 5;
}

.sidebar-row-item {
  width: 100%;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  text-align: left;
  display: flex;
  flex-direction: column;
  background: transparent;
  transition: background-color 0.15s ease;
}

.sidebar-row-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.04);
}

.sidebar-row-item--active {
  background-color: rgba(var(--v-theme-primary), 0.07);
  border-left: 4px solid rgb(var(--v-theme-primary));
  padding-left: 16px; /* Balance border spacing */
}

.row-item-title {
  font-size: 0.92rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 4px;
}

.row-item-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
}

/* ───────────────────────────────────────── */
/* WORKSPACE INTERIOR PANELS */
/* ───────────────────────────────────────── */
.wiki-detail-view {
  overflow-y: auto;
  padding: 32px;
  background: rgb(var(--v-theme-surface));
}

.max-w-content {
  max-width: 520px;
}

.detail-header-block {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 2px solid rgba(var(--v-theme-on-surface), 0.06);
  padding-bottom: 20px;
  margin-bottom: 24px;
}

.wiki-grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.content-data-section {
  margin-bottom: 24px;
}

.data-label {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  color: rgba(var(--v-theme-on-surface), 0.54);
  margin-bottom: 6px;
}

.data-text-body {
  font-size: 0.96rem;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface));
}

.data-text-prominent {
  font-size: 1.05rem;
  font-weight: 700;
  display: flex;
  align-items: center;
}

/* UI Elements & Blocks */
.wiki-action-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  color: rgb(var(--v-theme-primary));
  transition: opacity 0.15s ease;
}

.wiki-action-link:hover {
  text-decoration: underline;
  opacity: 0.85;
}

.wiki-pill-registry {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.wiki-pill-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  background: rgba(var(--v-theme-on-surface), 0.05);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  transition: all 0.15s ease;
}

.wiki-pill-link:hover {
  background: rgb(var(--v-theme-primary));
  color: #ffffff !important;
  border-color: rgb(var(--v-theme-primary));
}

.arcs-vertical-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.arc-data-node {
  padding: 16px;
  border-radius: 6px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  background: rgba(var(--v-theme-on-surface), 0.02);
}

.arc-node-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 4px;
}

.arc-node-brief {
  font-size: 0.88rem;
  line-height: 1.5;
  color: rgba(var(--v-theme-on-surface), 0.8);
}

.genre-accent-box {
  margin-top: 32px;
  padding: 16px 20px;
  border-radius: 6px;
  border-left: 4px solid rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.04);
}

/* ───────────────────────────────────────── */
/* UTILITIES & BOTTOM BLOCK COMPONENTS */
/* ───────────────────────────────────────── */
.wiki-alert-card {
  border-radius: 6px !important;
  border: 1px solid rgba(var(--v-theme-info), 0.25) !important;
}

.wiki-alert-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
}

/* Standardized Custom Scrollbar Elements */
.custom-inner-scroll::-webkit-scrollbar {
  width: 6px;
}
.custom-inner-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-inner-scroll::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-on-surface), 0.15);
  border-radius: 4px;
}
.custom-inner-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-on-surface), 0.3);
}

@media (max-width: 960px) {
  .wiki-viewport {
    grid-template-columns: 1fr;
    height: auto;
  }
  .wiki-sidebar {
    max-height: 250px;
    border-right: none;
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  }
  .wiki-alert-layout {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
