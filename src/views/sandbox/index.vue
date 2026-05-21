<script setup lang="ts">
// views/sandbox/index.vue → /sandbox
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'

// External centralized type & dataset manifest hooks
import { EventInstance } from '@/types/events'
import { eventInstances as rawEventInstances } from '@/data/event-list'
import { OverarchingPlot } from '@/types/plots'
import plots from '@/data/plots'
import { travelGroups } from '@/data/travel-group'

// Import your actual Pinia store
import { useCharacterStore } from '@/stores/useCharacterStore'

const router = useRouter()
const characterStore = useCharacterStore()

const activeTab = ref('plots')
const sectionBgImage = ref<string>(
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
)

const reactiveEvents = ref<EventInstance[]>(rawEventInstances)
const activeCarouselIndex = ref<number>(0)
const allPlots = ref<OverarchingPlot[]>(plots)
const openGroups = ref([...travelGroups])

// ── CHARACTER STORE ROUTING RESOLVER ─────────────────────────────────
/**
 * Resolves a character's destination route by looking up their ID in the Pinia store.
 * Falls back safely to structural conventions if the store hasn't loaded them yet.
 */
const getCharacterLink = (characterId: string) => {
  // 1. Attempt to pull full metadata from Pinia store registry
  const registeredCharacter = characterStore.getCharacterById(characterId)

  if (registeredCharacter) {
    return `/sandbox/characters/${registeredCharacter.region}/${registeredCharacter.category}/${registeredCharacter.id}`
  }

  // 2. Fallback: Parse the ID string if it follows a structural format,
  // or fall back to your system defaults (e.g., decentralized 'oc' type)
  const isNpc = characterId.includes('npc') || characterId.startsWith('sys-')
  const category = isNpc ? 'npc' : 'oc'
  const region = 'global' // Default fallback directory region

  return `/characters/${region}/${category}/${characterId}/index`
}

// ── DATE FORMATTING UTILITY FUNCTIONS ────────────────────────────────
const formatEventDate = (dateVal?: string | Date): string => {
  if (!dateVal) return 'NOT SCHEDULED'
  try {
    const parsedDate = new Date(dateVal)
    if (isNaN(parsedDate.getTime())) return String(dateVal).toUpperCase()

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(parsedDate)
  } catch {
    return String(dateVal).toUpperCase()
  }
}

const formatGroupDate = (dateVal?: string | Date): string => {
  if (!dateVal) return 'RECENTLY'
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

const groundRules = [
  {
    icon: 'mdi-account-group-outline',
    color: 'blue-darken-2',
    title: 'Community Mindfulness',
    description:
      'Every action you take ripples through the shared world. Be mindful of how your story affects the agency and enjoyment of other players.',
  },
  {
    icon: 'mdi-earth-plus',
    color: 'purple-darken-2',
    title: 'Collaborative World-Building',
    description:
      'Major canon shifts or regional events require community consensus. Bring layout directions to the staff board first.',
  },
  {
    icon: 'mdi-heart-outline',
    color: 'pink-darken-2',
    title: 'Mutual Respect',
    description:
      'Keep the conflict strictly in-character. Persistent toxic behavior or out-of-character harassment carries a zero-tolerance baseline.',
  },
]

const ongoingEvents = computed(() => {
  if (!rawEventInstances || !Array.isArray(rawEventInstances)) return []
  return rawEventInstances.filter((e) => e.status?.trim().toLowerCase() === 'ongoing')
})

const navigateToEventInstance = (event: EventInstance) => {
  router.push(`/sandbox/events/${event.eventSlug}/${event.instanceId}`)
}

const isExternalLink = (url?: string) => {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://')
}
</script>
<template>
  <v-container fluid class="pa-0 premium-landing-wrapper">
    <WikiHero
      title="The Sandbox"
      subtitle="Open-world Pokémon RP — Where your collaborative journeys chart the region's fate."
      icon="mdi-stadium-variant"
      pattern="pokeball"
      class="hero-glow-modifier border-bottom-structural"
    >
      <template #chips>
        <div
          class="mt-4 d-flex justify-center flex-wrap ga-4 text-overline tracking-widest text-high-emphasis font-weight-black"
        >
          <span>// ERA: 8 YR POST-SWSH</span>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-12 position-relative z-index-2">
      <!-- ── CENTRAL HORIZONTAL WORKSPACE CONTAINER ── -->
      <div
        class="workspace-navigation-header-wrap d-flex flex-wrap align-end justify-space-between ga-4 mb-0"
      >
        <div class="pa-2">
          <div class="d-flex align-center mb-1">
            <span class="live-pulse-indicator mr-2" />
            <span
              class="text-overline font-weight-black tracking-widest text-primary text-uppercase"
            >
              Role-play Overview
            </span>
          </div>
          <h2 class="text-h4 font-weight-black tracking-tight font-heading text-high-emphasis">
            KEEN EYE REPORTS
          </h2>
        </div>

        <!-- Horizontal Tab Bar Selector Layout Element -->
        <div class="d-flex ga-2 structural-horizontal-tabs">
          <button
            class="horizontal-tab-node d-flex align-center"
            :class="{ 'horizontal-tab-node--active': activeTab === 'plots' }"
            @click="activeTab = 'plots'"
          >
            <v-icon class="tab-icon mr-2" size="18">
              {{ activeTab === 'plots' ? 'mdi-layers' : 'mdi-layers-outline' }}
            </v-icon>
            <span class="tab-label font-heading font-weight-black tracking-wide">Plots</span>
          </button>

          <button
            class="horizontal-tab-node d-flex align-center"
            :class="{ 'horizontal-tab-node--active': activeTab === 'events' }"
            @click="activeTab = 'events'"
          >
            <v-icon class="tab-icon mr-2" size="18">
              {{ activeTab === 'events' ? 'mdi-pulse' : 'mdi-heart-pulse' }}
            </v-icon>
            <span class="tab-label font-heading font-weight-black tracking-widemr-1"
              >Live Events</span
            >
            <v-badge
              v-if="ongoingEvents.length > 0"
              :content="ongoingEvents.length"
              color="primary"
              inline
              class="ml-1 font-weight-black"
            />
          </button>

          <button
            class="horizontal-tab-node d-flex align-center"
            :class="{ 'horizontal-tab-node--active': activeTab === 'groups' }"
            @click="activeTab = 'groups'"
          >
            <v-icon class="tab-icon mr-2" size="18">
              {{ activeTab === 'groups' ? 'mdi-account-multiple' : 'mdi-account-multiple-plus' }}
            </v-icon>
            <span class="tab-label font-heading font-weight-black tracking-wide">Open Crews</span>
          </button>
        </div>
      </div>

      <!-- Main Workspace Frame Display Viewport Box -->
      <v-card variant="flat" class="focal-dashboard-vault mb-16 overflow-hidden border-structural">
        <div
          v-if="sectionBgImage"
          class="vault-background-graphic"
          :style="{ backgroundImage: `url(${sectionBgImage})` }"
        ></div>

        <div class="vault-inner-content pa-4 pa-sm-6 pa-md-8">
          <v-window v-model="activeTab" class="bg-transparent modular-window-viewport">
            <!-- ── TAB MODULE 1: PLOTS WITH FEATURED CHARACTERS ── -->
            <v-window-item value="plots" class="h-100 overflow-hidden">
              <div class="d-flex flex-column h-100">
                <div class="mb-5 intro-blurb-wrapper pa-4 shrink-0 border-structural">
                  <p
                    class="text-body-2 text-high-emphasis mb-0 lh-base max-w-text font-weight-black"
                  >
                    Interested in what other RPers are doing? Here are some of the character-driven
                    plotlines around the world. If any of these prompts catch your eye, reach out to
                    see how your character can engage.
                  </p>
                </div>

                <v-carousel
                  v-model="activeCarouselIndex"
                  height="100%"
                  hide-delimiter-background
                  show-arrows="hover"
                  color="primary"
                  cycle
                  interval="7000"
                  class="cinematic-carousel grow border-structural"
                >
                  <v-carousel-item v-for="plot in allPlots" :key="plot.id" class="h-100">
                    <div class="carousel-glass-slide pa-2 h-100">
                      <v-row class="ma-0 h-100 align-stretch overflow-hidden">
                        <!-- Left Details Area -->
                        <v-col
                          cols="12"
                          lg="7"
                          class="d-flex flex-column justify-space-between h-100 pr-lg-4 slide-scroll-container"
                        >
                          <div>
                            <div
                              class="d-flex align-center justify-space-between mb-2 flex-wrap ga-2"
                            >
                              <span
                                class="text-overline font-weight-black tracking-widest text-primary"
                              >
                                PLOT ID // {{ plot.id.toUpperCase() }}
                              </span>
                              <span
                                class="text-caption font-weight-black text-uppercase"
                                :class="`text-${plot.statusColor}`"
                              >
                                [ {{ plot.statusLabel }} ]
                              </span>
                            </div>

                            <h3
                              class="text-h4 font-weight-black mb-3 tracking-tight font-heading text-truncate text-high-emphasis"
                            >
                              {{ plot.title }}
                            </h3>

                            <p
                              class="text-body-2 text-high-emphasis font-weight-medium mb-4 lh-base line-clamp-4 overflow-scroll h-30"
                            >
                              {{ plot.summary }}
                            </p>
                          </div>

                          <!-- Featured Characters Node Segment Inclusion -->
                          <div
                            v-if="plot.featuredCharacters && plot.featuredCharacters.length > 0"
                            class="mb-4"
                          >
                            <div
                              class="text-caption font-weight-black text-uppercase tracking-wider text-high-emphasis mb-2"
                            >
                              <v-icon size="14" class="mr-1 text-primary">mdi-star-face</v-icon>
                              Core Characters //
                            </div>
                            <div class="d-flex flex-wrap align-center ga-2 pl-1">
                              <v-chip
                                v-for="characterId in plot.featuredCharacters"
                                :key="characterId"
                                size="small"
                                variant="outlined"
                                class="font-weight-black border-structural text-caption font-mono"
                                :to="getCharacterLink(characterId)"
                                link
                              >
                                @{{
                                  characterStore.getCharacterById(characterId)?.name?.short?.[0] ||
                                  characterId
                                }}
                              </v-chip>
                            </div>
                          </div>

                          <div class="premium-intent-callout pa-4 mt-auto border-structural">
                            <div
                              class="text-caption font-weight-black text-uppercase tracking-wider mb-1 text-primary"
                            >
                              // Intent & Vibe
                            </div>
                            <p
                              class="text-body-2 mb-0 font-italic text-high-emphasis font-weight-black line-clamp-2"
                            >
                              "{{ plot.intent }}"
                            </p>
                          </div>
                        </v-col>

                        <!-- Right Rail Sub-Arcs Pane -->
                        <v-col
                          cols="12"
                          lg="5"
                          class="d-flex flex-column bl-divider-pane pl-lg-6 pt-4 pt-lg-0 h-100 overflow-hidden"
                        >
                          <div
                            class="text-overline font-weight-black tracking-widest text-high-emphasis mb-3"
                          >
                            Related Arcs //
                          </div>

                          <div
                            class="d-flex flex-column ga-3 overflow-y-auto pr-1 custom-inner-scroll grow"
                          >
                            <v-card
                              v-for="sub in plot.relatedArcs"
                              :key="sub.id"
                              variant="flat"
                              class="pa-3 vector-sub-card border-structural"
                            >
                              <div
                                class="text-caption font-weight-black text-primary d-flex align-center mb-1 text-truncate"
                              >
                                <v-icon size="14" class="mr-2">mdi-vector-link</v-icon>
                                {{ sub.title }}
                              </div>
                              <div
                                class="text-caption text-high-emphasis font-weight-medium lh-sm line-clamp-2"
                              >
                                {{ sub.brief }}
                              </div>
                            </v-card>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </v-carousel-item>
                </v-carousel>
              </div>
            </v-window-item>

            <!-- ── TAB MODULE 2: ACTIVE EVENTS MATRIX BOARD ── -->
            <v-window-item value="events" class="h-100 overflow-hidden">
              <div class="d-flex flex-column h-100">
                <div class="mb-5 intro-blurb-wrapper pa-4 shrink-0 border-structural">
                  <p
                    class="text-body-2 text-high-emphasis mb-0 lh-base max-w-text font-weight-black"
                  >
                    Not quite ready to drop anchor into a full-length plotline? Check out active
                    regional live environments. These recurring festivals, wild area expeditions,
                    and public tournaments offer immediate opportunities to jump into action.
                  </p>
                </div>

                <v-card
                  variant="flat"
                  class="premium-glass-table border-structural overflow-hidden grow d-flex flex-column"
                >
                  <div class="table-scroll-container custom-inner-scroll grow overflow-y-auto">
                    <v-table class="bg-transparent operational-clean-table">
                      <thead>
                        <tr class="table-header-tint">
                          <th
                            class="text-left font-weight-black tracking-wider text-caption text-high-emphasis py-4 pl-6 sticky-header"
                          >
                            ACTIVE DEPLOYMENT FRONT
                          </th>
                          <th
                            class="text-left font-weight-black tracking-wider text-caption text-high-emphasis py-4 sticky-header"
                          >
                            OPERATIONAL LOCATION
                          </th>
                          <th
                            class="text-left font-weight-black tracking-wider text-caption text-high-emphasis py-4 sticky-header"
                          >
                            TIMELINE TIMESTAMPS
                          </th>
                          <th
                            class="text-right font-weight-black tracking-wider text-caption text-high-emphasis py-4 pr-6 sticky-header"
                          >
                            ATMOSPHERIC MODIFIER
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="event in ongoingEvents"
                          :key="event.instanceId"
                          class="premium-table-row"
                          @click="navigateToEventInstance(event)"
                        >
                          <td
                            class="py-5 pl-6 font-weight-black text-body-2 text-high-emphasis text-uppercase text-truncate max-w-cell-slug"
                          >
                            <div class="d-flex align-center">
                              <div class="live-pulse-indicator mr-3" />
                              {{
                                event.customDescription
                                  ? event.customDescription.split(':')[0]
                                  : event.eventSlug
                              }}
                            </div>
                          </td>
                          <td class="py-5 text-body-2 text-high-emphasis font-weight-black">
                            <v-icon size="16" class="mr-1 text-high-emphasis"
                              >mdi-map-marker-outline</v-icon
                            >
                            {{ event.location }}
                          </td>
                          <td
                            class="py-5 text-body-2 font-mono text-primary font-weight-black text-uppercase"
                          >
                            <v-icon size="14" class="mr-1 text-primary">mdi-calendar-clock</v-icon>
                            {{ formatEventDate(event.start) }}
                          </td>
                          <td class="py-5 text-right pr-6">
                            <span
                              v-if="event.weatherCondition"
                              class="text-caption font-weight-black text-amber-darken-4 tracking-wide text-uppercase"
                            >
                              // {{ event.weatherCondition }}
                            </span>
                            <span
                              v-else
                              class="text-caption font-weight-black text-success tracking-wide"
                            >
                              [ ACTIVE RUN ]
                            </span>
                          </td>
                        </tr>
                        <tr v-if="ongoingEvents.length === 0">
                          <td
                            colspan="4"
                            class="text-center py-12 text-body-2 text-high-emphasis font-italic bg-transparent"
                          >
                            <v-icon size="24" class="mb-2 d-block mx-auto opacity-90"
                              >mdi-folder-open-outline</v-icon
                            >
                            No operational live environments found inside the dataset registry
                            hooks.
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </div>
                </v-card>
              </div>
            </v-window-item>

            <!-- ── TAB MODULE 3: CHARACTER GROUPS MATRIX WITH UPDATED DATES ── -->
            <v-window-item value="groups" class="h-100 overflow-hidden">
              <div class="d-flex flex-column h-100">
                <div class="mb-5 intro-blurb-wrapper pa-4 shrink-0 border-structural">
                  <p
                    class="text-body-2 text-high-emphasis mb-0 lh-base max-w-text font-weight-black"
                  >
                    Looking for immediate cooperative scenes or traveling companions? The open crews
                    cataloged below are actively looking for fresh faces. Check their current
                    objectives, location parameters, and group moods to drop right into their
                    narrative threads.
                  </p>
                </div>

                <div class="groups-scroll-vault grow pr-1 overflow-y-auto custom-inner-scroll">
                  <v-row class="ma-0 ga-y-4">
                    <v-col
                      v-for="group in openGroups"
                      :key="group.id"
                      cols="12"
                      md="6"
                      class="pa-2"
                    >
                      <v-card
                        variant="flat"
                        class="group-matrix-card border-structural h-100 pa-5 d-flex flex-column justify-space-between"
                      >
                        <div>
                          <div
                            class="d-flex align-center justify-space-between mb-3 flex-wrap ga-2"
                          >
                            <h4
                              class="text-subtitle-1 font-weight-black font-heading text-high-emphasis"
                            >
                              {{ group.name }}
                            </h4>
                            <div class="d-flex align-center ga-2">
                              <span
                                v-if="group.date"
                                class="text-caption font-mono font-weight-black px-2 py-05 bg-surface-variant rounded border-structural"
                              >
                                LOG: {{ formatGroupDate(group.date) }}
                              </span>
                              <span
                                class="text-caption font-weight-black text-uppercase text-primary tracking-widest"
                              >
                                // OPEN
                              </span>
                            </div>
                          </div>

                          <v-divider class="mb-4 border-structural-divider" />

                          <div class="d-flex flex-column ga-3">
                            <div>
                              <div
                                class="text-caption font-weight-black text-uppercase tracking-wider text-high-emphasis mb-05"
                              >
                                <v-icon size="12" class="mr-1">mdi-map-marker-radius</v-icon>
                                Deployment Location
                              </div>
                              <div class="text-body-2 font-weight-black text-high-emphasis pl-4">
                                {{ group.location }}
                              </div>
                            </div>

                            <div>
                              <div
                                class="text-caption font-weight-black text-uppercase tracking-wider text-high-emphasis mb-05"
                              >
                                <v-icon size="12" class="mr-1">mdi-target</v-icon> Objective &
                                Activity
                              </div>
                              <div
                                class="text-body-2 text-high-emphasis font-weight-medium pl-4 line-clamp-2"
                              >
                                {{ group.activity }}
                              </div>
                            </div>

                            <div>
                              <div
                                class="text-caption font-weight-black text-uppercase tracking-wider text-high-emphasis mb-1"
                              >
                                <v-icon size="12" class="mr-1">mdi-folder-account-outline</v-icon>
                                Appended Registry Manifest
                              </div>
                              <div
                                class="d-flex flex-wrap align-center ga-x-3 ga-y-1 pl-4 text-body-2 font-mono"
                              >
                                <span
                                  v-if="!group.members || group.members.length === 0"
                                  class="text-disabled font-italic"
                                >
                                  No records assigned
                                </span>
                                <template
                                  v-for="(character, index) in group.members"
                                  :key="character.id"
                                >
                                  <router-link
                                    :to="getCharacterLink(character.id)"
                                    class="registry-dossier-link text-decoration-none font-weight-black d-inline-flex align-center"
                                  >
                                    <span class="bracket-decor text-high-emphasis mr-1">[</span>
                                    <span class="link-label">{{ character.name.short }}</span>
                                    <span
                                      class="text-caption text-high-emphasis ml-1 font-weight-black"
                                    >
                                      ({{ character.trainerClass.primary }})
                                    </span>
                                    <span class="bracket-decor text-high-emphasis ml-1">]</span>
                                  </router-link>
                                  <span
                                    v-if="index < group.members.length - 1"
                                    class="text-high-emphasis font-weight-black opacity-60 select-none"
                                    >•</span
                                  >
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="mt-4 fshrink-0 d-flex flex-column ga-2">
                          <v-btn
                            v-if="group.threadUrl"
                            :href="isExternalLink(group.threadUrl) ? group.threadUrl : undefined"
                            :to="!isExternalLink(group.threadUrl) ? group.threadUrl : undefined"
                            :target="isExternalLink(group.threadUrl) ? '_blank' : undefined"
                            variant="outlined"
                            color="primary"
                            size="small"
                            block
                            class="font-weight-black tracking-wide text-button border-structural-button thread-action-btn"
                          >
                            <v-icon start size="16">mdi-text-box-search-outline</v-icon>
                            View Active Roleplay Thread
                            <v-icon end size="12" v-if="isExternalLink(group.threadUrl)"
                              >mdi-open-in-new</v-icon
                            >
                          </v-btn>

                          <div class="group-mood-panel pa-3 border-structural-left">
                            <div
                              class="text-caption font-weight-black text-uppercase tracking-wider text-primary mb-05"
                            >
                              // Atmospheric Intent & Tone
                            </div>
                            <div class="text-body-2 font-italic text-high-emphasis line-clamp-2">
                              "{{ group.intent }}"
                            </div>
                          </div>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-window-item>
          </v-window>
        </div>
      </v-card>

      <!-- ── WELCOME & ONBOARDING INTRODUCTION ENVIRONMENT FRAME ────── -->
      <v-row class="mb-16">
        <v-col cols="12" md="7">
          <WikiCard
            title="The Goal"
            icon="mdi-auto-fix"
            color="blue"
            class="h-100 premium-glass-card border-structural"
          >
            <div class="text-body-1 lh-lg text-high-emphasis">
              <p class="mb-4">
                Welcome to <strong class="text-primary font-weight-black">The Sandbox</strong>! We
                run an Open-World, Sandbox-style Pokémon Role-play. Our goal is to create a flexible
                environment where Roleplayers are free to explore their imaginations in
                collaboration.
              </p>
              <v-divider class="my-5 border-structural-divider" />
              <div class="d-flex ga-4 align-center mb-5 feature-hover-row">
                <div class="icon-avatar-glow bg-surface-variant border-structural">
                  <v-icon color="primary" size="24">mdi-map-marker-path</v-icon>
                </div>
                <div>
                  <div class="text-subtitle-1 font-weight-black text-high-emphasis">
                    Forge Your Path
                  </div>
                  <div class="text-caption text-high-emphasis">
                    Chart unique personal stories anywhere across the world.
                  </div>
                </div>
              </div>
              <div class="d-flex ga-4 align-center feature-hover-row">
                <div class="icon-avatar-glow bg-surface-variant border-structural">
                  <v-icon color="purple-darken-2" size="24">mdi-account-group</v-icon>
                </div>
                <div>
                  <div class="text-subtitle-1 font-weight-black text-high-emphasis">
                    Integrated Storylines
                  </div>
                  <div class="text-caption text-high-emphasis">
                    Interact and Integrate with storylines from other RPers, weave a great narrative
                    together!
                  </div>
                </div>
              </div>
            </div>
          </WikiCard>
        </v-col>

        <v-col cols="12" md="5">
          <WikiCard
            title="Quick Rules"
            icon="mdi-shield-check"
            color="green"
            class="h-100 premium-glass-card border-structural"
          >
            <v-list bg-color="transparent" density="default" class="py-0">
              <v-list-item
                v-for="(rule, i) in groundRules"
                :key="i"
                class="px-0 alignment-top-fix mb-3"
              >
                <template #prepend>
                  <v-icon
                    :icon="rule.icon"
                    :color="rule.color"
                    size="small"
                    class="mt-1 mr-3 align-self-start"
                  />
                </template>
                <v-list-item-title class="text-body-2 font-weight-black text-high-emphasis mb-1">
                  {{ rule.title }}
                </v-list-item-title>
                <div class="text-caption text-high-emphasis text-wrap lh-base">
                  {{ rule.description }}
                </div>
              </v-list-item>
            </v-list>
          </WikiCard>
        </v-col>
      </v-row>

      <!-- ── REGISTRATION ENTRY GATEWAY ── -->
      <WikiAlert type="info" class="mt-8 luxury-alert border-structural">
        <div class="d-flex align-center justify-space-between flex-wrap ga-6 pa-3">
          <div>
            <div
              class="text-h6 font-weight-bold tracking-wide mb-1 font-heading text-high-emphasis"
            >
              Ready to Establish Your Narrative ID?
            </div>
            <div class="text-body-2 text-high-emphasis font-weight-black">
              Jump straight into our step-by-step documentation to set up your character sheets,
              register your starter companions, and receive your Permit logs.
            </div>
          </div>
          <div class="d-flex ga-3 flex-wrap">
            <v-btn
              variant="outlined"
              color="secondary"
              class="font-weight-black tracking-wide border-structural-button bg-surface"
              to="/sandbox/lore"
            >
              Browse Lore Wiki
            </v-btn>
            <v-btn
              color="primary"
              class="font-weight-black px-6 tracking-wide primary-glow-btn border-structural-button"
              to="/sandbox/trainer-101"
            >
              Begin Journey (Trainer 101) <v-icon end size="16">mdi-rocket-launch</v-icon>
            </v-btn>
          </div>
        </div>
      </WikiAlert>
    </v-container>
  </v-container>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;900&family=JetBrains+Mono:wght@400;600;700&display=swap');

.font-heading {
  font-family: 'Outfit', sans-serif !important;
}
.font-mono {
  font-family: 'JetBrains Mono', monospace !important;
}

.lh-lg {
  line-height: 1.85;
}
.lh-base {
  line-height: 1.55;
}
.max-w-text {
  max-width: 880px;
}
.max-w-cell-slug {
  max-width: 260px;
}
.tracking-tight {
  letter-spacing: -0.5px !important;
}
.mb-05 {
  margin-bottom: 2px !important;
}
.mt-05 {
  margin-top: 2px !important;
}
.py-05 {
  padding-top: 2px !important;
  padding-bottom: 2px !important;
}

.alignment-top-fix :deep(.v-list-item__prepend) {
  align-self: flex-start !important;
}

/* ── HIGH-DENSITY STRUCTURAL REINFORCEMENTS ── */
.border-structural {
  border: 2px solid rgba(var(--v-theme-on-surface), 0.35) !important;
}
.border-structural-button {
  border: 2px solid rgba(var(--v-theme-on-surface), 0.45) !important;
}
.border-structural-divider {
  border-top: 2px solid rgba(var(--v-theme-on-surface), 0.3) !important;
  opacity: 1 !important;
}
.border-structural-left {
  border-left: 4px solid rgb(var(--v-theme-primary)) !important;
}
.border-bottom-structural {
  border-bottom: 2px solid rgba(var(--v-theme-on-surface), 0.35) !important;
}

.premium-landing-wrapper {
  background: rgb(var(--v-theme-background));
}

.focal-dashboard-vault {
  background: rgb(var(--v-theme-surface)) !important;
  border-radius: 0 0 24px 24px;
  position: relative;
  box-shadow: 0 14px 45px rgba(0, 0, 0, 0.09) !important;
  z-index: 2;
}

/* Hard background fill for light mode contrast stability */
.v-theme--light .focal-dashboard-vault,
.v-theme--light .premium-glass-card,
.v-theme--light .group-matrix-card,
.v-theme--light .premium-glass-table,
.v-theme--light .carousel-glass-slide,
.v-theme--light .horizontal-tab-node--active {
  background: #ffffff !important;
}

.vault-background-graphic {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center right;
  opacity: 0.04;
  pointer-events: none;
  z-index: 1;
  -webkit-mask-image: linear-gradient(to right, transparent 30%, black 100%);
  mask-image: linear-gradient(to right, transparent 30%, black 100%);
}

.vault-inner-content {
  position: relative;
  z-index: 2;
}

.modular-window-viewport {
  height: 520px;
}

@media (max-width: 1264px) {
  .modular-window-viewport {
    height: auto;
  }
}

/* ── HORIZONTAL ATTACHED FOLDER ARCHITECTURE ── */
.workspace-navigation-header-wrap {
  position: relative;
  z-index: 3;
}

.structural-horizontal-tabs {
  margin-bottom: -2px;
}

.horizontal-tab-node {
  padding: 12px 24px;
  background: rgba(var(--v-theme-on-surface), 0.05);
  border: 2px solid rgba(var(--v-theme-on-surface), 0.35);
  border-bottom: 2px solid transparent;
  border-radius: 12px 12px 0 0;
  color: rgba(var(--v-theme-on-surface), 0.65);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.horizontal-tab-node:hover:not(.horizontal-tab-node--active) {
  background: rgba(var(--v-theme-primary), 0.06);
  color: rgb(var(--v-theme-primary));
  transform: translateY(-2px);
}

.horizontal-tab-node--active {
  background: rgb(var(--v-theme-surface)) !important;
  border-color: rgba(var(--v-theme-on-surface), 0.35) !important;
  border-bottom: 2px solid transparent !important;
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: 900 !important;
  z-index: 4;
  box-shadow: 0px -4px 0px 0px rgb(var(--v-theme-primary)) !important;
}

.bl-divider-pane {
  border-top: 2px dashed rgba(var(--v-theme-on-surface), 0.15);
}
@media (min-width: 1264px) {
  .bl-divider-pane {
    border-top: none;
    border-left: 2px dashed rgba(var(--v-theme-on-surface), 0.2);
  }
}

.intro-blurb-wrapper {
  background: rgba(var(--v-theme-on-surface), 0.04);
  border-left: 5px solid rgb(var(--v-theme-primary));
  border-radius: 0 12px 12px 0;
}

.premium-glass-card {
  background: rgb(var(--v-theme-surface)) !important;
  border-radius: 16px !important;
}

.icon-avatar-glow {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-hover-row {
  transition: transform 0.2s ease;
}
.feature-hover-row:hover {
  transform: translateX(4px);
}

/* ── CAROUSEL INTERIOR LAYOUTS ── */
.cinematic-carousel {
  border-radius: 16px;
  overflow: hidden;
}

.carousel-glass-slide {
  width: 100%;
  height: 100%;
  background: rgb(var(--v-theme-surface));
}
:deep(.v-carousel__controls) {
  padding: 12px;
  background: transparent !important;
}
.premium-intent-callout {
  border-left: 5px solid rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.05);
  border-radius: 0 12px 12px 0;
}

.vector-sub-card {
  background: rgba(var(--v-theme-on-surface), 0.03) !important;
  border-radius: 8px !important;
  transition: all 0.2s ease;
}
.vector-sub-card:hover {
  background: rgba(var(--v-theme-primary), 0.08) !important;
  transform: translateY(-1px);
}

/* ── CLEAN HIGHER-DENSITY TABLES ── */
.premium-glass-table {
  background: rgb(var(--v-theme-surface)) !important;
  border-radius: 12px !important;
}
.table-scroll-container {
  overflow-y: auto;
}
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 5;
  background: rgb(var(--v-theme-surface)) !important;
  border-bottom: 2px solid rgba(var(--v-theme-on-surface), 0.4) !important;
}
.table-header-tint {
  background: rgba(var(--v-theme-on-surface), 0.06);
}
.operational-clean-table th {
  border-bottom: 2px solid rgba(var(--v-theme-on-surface), 0.35) !important;
}
.operational-clean-table td {
  border-bottom: 2px solid rgba(var(--v-theme-on-surface), 0.15) !important;
}
.premium-table-row {
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.premium-table-row:hover {
  background-color: rgba(var(--v-theme-primary), 0.08) !important;
}

/* ── OPEN CREWS INTERFACE ── */
.groups-scroll-vault {
  max-height: 100%;
}
.group-matrix-card {
  background: rgb(var(--v-theme-surface)) !important;
  border-radius: 16px !important;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}
.group-matrix-card:hover {
  transform: translateY(-2px);
  border-color: rgb(var(--v-theme-primary)) !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
}

.registry-dossier-link {
  color: rgb(var(--v-theme-on-surface));
  transition: color 0.15s ease;
}
.registry-dossier-link .link-label {
  border-bottom: 2px dashed rgba(var(--v-theme-on-surface), 0.5);
}
.registry-dossier-link:hover {
  color: rgb(var(--v-theme-primary)) !important;
}
.registry-dossier-link:hover .link-label {
  border-bottom-style: solid;
  border-bottom-color: rgb(var(--v-theme-primary));
}

.thread-action-btn {
  background-color: rgba(var(--v-theme-primary), 0.02);
  border: 2px solid rgb(var(--v-theme-primary)) !important;
}
.thread-action-btn:hover {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-on-primary)) !important;
}

.group-mood-panel {
  background: rgba(var(--v-theme-on-surface), 0.04);
  border-radius: 0 8px 8px 0;
}

.luxury-alert {
  background: rgb(var(--v-theme-surface)) !important;
  border-radius: 16px !important;
}

/* ── INNER UTILITY WINDOW SCROLLBARS ── */
.custom-inner-scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-inner-scroll::-webkit-scrollbar-track {
  background: rgba(var(--v-theme-on-surface), 0.03);
  border-radius: 10px;
}
.custom-inner-scroll::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-on-surface), 0.25);
  border-radius: 10px;
}
.custom-inner-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary), 0.7);
}
</style>
