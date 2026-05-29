<script setup lang="ts">
import { markRaw, computed, onMounted, watch, onErrorCaptured } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useCharacterStore } from '@/stores/useCharacterStore'

// Types & Helpers
import { CharacterTypeLabels, TrainerClassLabels } from '@/types/character'
import { RegionLabels } from '@/types/region'
import { getCharImageUrl } from '@/utils/path-resolvers'
import { allGymRegistry } from '@/data/gym-registry'
import { allRibbonRegistry } from '@/data/contest-registry'

// Components
import SummaryTab from '@/components/character/tabs/DefaultTab.vue'
import PokemonTab from '@/components/character/tabs/PokemonTeam.vue'
import AchievementTab from '@/components/character/tabs/AchievementTab.vue'
import GalleryTab from '@/components/character/tabs/GalleryTab.vue'
import CharacterSpeedDial from '@/components/nav/CharacterSpeedDial.vue'

const route = useRoute('/sandbox/characters/[region]/[category]/[id]/[[subpage]]')
const store = useCharacterStore()
const { mobile, lgAndUp } = useDisplay()

const loadData = () => {
  const { region, category, id, subpage } = route.params
  const targetFile = (subpage as string) || 'index'
  store.fetchCharacter(region, category, id, targetFile)
}

onMounted(loadData)
watch(() => route.params, loadData, { deep: true })

const tabComponents: Record<string, any> = {
  index: markRaw(SummaryTab),
  pokemon: markRaw(PokemonTab),
  achievements: markRaw(AchievementTab),
  gallery: markRaw(GalleryTab),
}

const currentComponent = computed(() => {
  const sub = route.params.subpage as string | undefined
  if (!sub) return SummaryTab
  const targetComponent = tabComponents[sub]
  if (!targetComponent) return SummaryTab
  return targetComponent
})

const currentPathBase = computed(() => {
  const region = route.params.region as string | undefined
  const category = route.params.category as string | undefined
  const id = route.params.id as string | undefined
  if (!region || !category || !id) return ''
  return `/sandbox/characters/${region}/${category}/${id}`
})

// ── Enhanced Color Intelligence System ───────────────────────────────────────
const rawColor = computed(() => store.meta?.color ?? 'primary')
const isHex = computed(() => rawColor.value.startsWith('#'))

const resolvedColorValue = computed(() => {
  if (isHex.value) return rawColor.value
  return `rgb(var(--v-theme-${rawColor.value}))`
})

// Binds values locally as functional standard reactive CSS variables
const dynamicColorVariables = computed(() => {
  const baseColor = resolvedColorValue.value
  return {
    '--char-color': baseColor,
    // Boosted alphas to increase footprint and visibility of glows
    '--char-glow': isHex.value ? `${baseColor}60` : `rgba(var(--v-theme-${rawColor.value}), 0.4)`,
    '--char-glow-intense': isHex.value
      ? `${baseColor}b0`
      : `rgba(var(--v-theme-${rawColor.value}), 0.7)`,
  }
})

const totals = computed(() => {
  if (!store.meta) return { badges: 0, ribbons: 0 }
  const badges = Object.values(store.meta.badges || {})
    .flat()
    .filter((b) => b.obtained && allGymRegistry.some((g) => g.id === b.gymId)).length
  const ribbons = Object.values(store.meta.ribbons || {})
    .flat()
    .filter((r) => allRibbonRegistry.some((reg) => reg.id === r.ribbonId)).length
  return { badges, ribbons }
})

const dialLinks = computed(() => {
  const region = route.params.region as string | undefined
  const category = route.params.category as string | undefined
  const id = route.params.id as string | undefined

  if (!region || !category || !id) return []

  const allPossibleLinks = [
    { title: 'Summary', icon: 'mdi-account-outline', slug: 'index' },
    { title: 'Pokémon', icon: 'mdi-pokeball', slug: 'pokemon' },
    { title: 'Achievements', icon: 'mdi-trophy-award', slug: 'achievements' },
    { title: 'Gallery', icon: 'mdi-image-multiple', slug: 'gallery' },
  ]

  return allPossibleLinks.filter((link) => {
    if (link.slug === 'index') return true
    return store.hasAssetFile(region, category, id, link.slug)
  })
})

function retryFetch() {
  const { region, category, id, subpage } = route.params
  if (region && category && id) {
    store.fetchCharacter(
      region as string,
      category as string,
      id as string,
      (subpage as string) || 'index',
    )
  }
}

onErrorCaptured((err, _instance, info) => {
  console.error('Captured a localized sub-component render panic:', err, info)
  if (route.params.subpage === 'pokemon') {
    store.activeData = []
  }
  return false
})
</script>

<template>
  <div
    class="character-page-wrapper"
    :class="{ 'mobile-view': mobile }"
    :style="dynamicColorVariables"
  >
    <!-- 1. GLOBAL LOADING SCREEN STATE -->
    <div
      v-if="store.loading && !store.meta"
      class="profile-loading-shimmer d-flex align-center justify-center"
    >
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>

    <!-- 2. DEFENSIVE ERROR STATE -->
    <div v-else-if="store.error" class="profile-error-pane text-center pa-8">
      <v-icon size="64" color="error" class="mb-4">mdi-alert-octagon-outline</v-icon>
      <h3 class="text-h5 font-weight-bold mb-2">TACTICAL BLOCK: DATA LOST</h3>
      <p class="text-body-2 text-medium-emphasis mb-4">
        Could not establish contact with registry files.
      </p>
      <v-btn color="primary" @click="retryFetch">Retry Synchronization</v-btn>
    </div>

    <!-- 3. SECURE DATA WRAPPER PANEL -->
    <div v-else-if="store.meta" class="profile-main-stage">
      <!-- Atmospheric Background Layers V2: Anchored to back-light the character container -->
      <div class="hero-aura-core" />
      <div class="hero-vignette" />

      <!-- Technical Sidebar -->
      <aside v-if="lgAndUp" class="data-sidebar">
        <div class="sidebar-line" />

        <div class="data-point">
          <span class="label">Region</span>
          <span class="value">{{ RegionLabels[store.meta.region] }}</span>
        </div>

        <div class="data-point active">
          <span class="label">Classification</span>
          <span class="value active-accent">{{ CharacterTypeLabels[store.meta.category] }}</span>
        </div>

        <div class="data-point">
          <span class="label">Registry ID</span>
          <span class="value">#{{ store.meta.id.toUpperCase() }}</span>
        </div>
      </aside>

      <v-container fluid class="pa-0 relative-content">
        <v-container max-width="1440" class="fill-height py-16">
          <v-row :reverse="!lgAndUp" align="center" class="fill-height">
            <!-- LEFT CONTROL BLOCK -->
            <v-col
              cols="12"
              lg="7"
              :class="lgAndUp ? 'ps-lg-16' : 'text-center'"
              class="d-flex flex-column justify-center"
              style="height: 90vh"
            >
              <header class="character-header mb-10">
                <!-- Short Name with inline neon drop projection rules -->
                <h1 class="display-name text-capitalize mb-1">
                  {{ store.meta.name?.short?.[0] || store.meta.name?.full }}
                </h1>

                <!-- Full Name Sub-text -->
                <div
                  v-if="store.meta.name?.short?.[0] !== store.meta.name?.full"
                  class="full-name-subtext font-mono text-caption text-uppercase tracking-widest mb-6 mt-6"
                >
                  // FULL NAME: {{ store.meta.name?.full }}
                </div>
                <div v-else class="mb-6" />

                <!-- Classification Bracket System -->
                <div class="classification-bracket">
                  <div class="bracket-accent" />
                  <div class="bracket-content">
                    <span class="bracket-label">Trainer Classes</span>
                    <span class="bracket-value">
                      {{
                        [store.meta.trainerClass.primary, ...(store.meta.trainerClass.other || [])]
                          .map((cls) => TrainerClassLabels[cls])
                          .join(' • ')
                      }}
                    </span>
                  </div>
                </div>
              </header>

              <!-- Marquee Section -->
              <div class="marquee-stack mb-10">
                <div v-if="store.meta.name?.nicknames?.length" class="marquee-group">
                  <span class="marquee-label">Nicknames //</span>
                  <div class="marquee-track">
                    <div class="marquee-content">
                      <span v-for="n in 4" :key="n">
                        <span
                          v-for="nick in store.meta.name.nicknames"
                          :key="nick"
                          class="nick-item"
                        >
                          {{ nick }}
                          <v-icon size="8" class="mx-6 custom-icon-opacity">mdi-rhombus</v-icon>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div v-if="store.meta.titles" class="marquee-group">
                  <span class="marquee-label">Titles //</span>
                  <div class="marquee-track">
                    <div class="marquee-content reverse">
                      <span v-for="n in 4" :key="n">
                        <span
                          v-for="title in [
                            store.meta.titles.primary,
                            ...(store.meta.titles.other || []),
                          ]"
                          :key="title"
                          class="nick-item"
                        >
                          {{ title }}
                          <v-icon size="8" class="mx-6 custom-icon-opacity"
                            >mdi-slash-forward</v-icon
                          >
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Main Dynamic Route Viewport -->
              <div class="tab-stage custom-scrollbar">
                <Suspense>
                  <template #default>
                    <v-fade-transition mode="out-in">
                      <component
                        :is="currentComponent"
                        :data="
                          route.params.subpage === 'pokemon'
                            ? Array.isArray(store.activeData)
                              ? store.activeData
                              : []
                            : store.activeData || {}
                        "
                        :meta="store.meta"
                        :totals="totals"
                        :key="route.params.subpage || 'index'"
                        :character-color="rawColor"
                      />
                    </v-fade-transition>
                  </template>
                </Suspense>
              </div>
            </v-col>

            <!-- RIGHT ARTWORK HERO BLOCK (Backlit Engine) -->
            <v-col cols="12" lg="5" class="d-flex justify-center align-center visual-hero-zone">
              <div class="portrait-container">
                <!-- Dynamic Backlighting Framing Rings -->
                <div class="halo-ring ring-outer" />
                <div class="halo-ring ring-inner" />

                <!-- AI Disclosure Badge -->
                <v-fade-transition>
                  <div v-if="store.meta.image?.isAi" class="ai-badge">
                    <v-icon size="12" icon="mdi-robot-outline" class="mr-1" />
                    <span>AI</span>
                  </div>
                </v-fade-transition>

                <v-img
                  :src="
                    getCharImageUrl(
                      store.meta.image?.src ?? 'default.png',
                      store.meta.category === 'oc',
                      store.meta.id,
                      store.meta.category,
                    )
                  "
                  class="main-portrait"
                  contain
                >
                  <template #placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="var(--char-color)" />
                    </v-row>
                  </template>
                </v-img>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <CharacterSpeedDial :links="dialLinks" :root-path="currentPathBase" />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Outfit:wght@300;800&family=JetBrains+Mono:wght@800&display=swap');

.character-page-wrapper {
  position: relative;
  height: 100vh;
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── Volumetric Backlighting System (Right Screen Focus) ─────────────────── */
.hero-aura-core {
  position: absolute;
  width: 75vw; /* Increased width from 50vw to spread glow further outward */
  height: 75vw; /* Increased height from 50vw */
  right: -15vw; /* Shifted out to keep the intense center off-screen while bleeding more light inward */
  top: 50%;
  transform: translateY(-50%);
  background: radial-gradient(
    circle,
    var(--char-glow-intense) 0%,
    var(--char-glow) 40%,
    transparent 75%
  );
  filter: blur(120px); /* Increased blur from 80px for smoother, larger ambient scattering */
  z-index: 0;
  pointer-events: none;
  opacity: 0.85; /* Bumped up opacity for premium vibrancy */
}

.hero-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 50%, transparent 15%, rgb(var(--v-theme-surface)) 85%);
  z-index: 1;
  pointer-events: none;
}

.relative-content {
  position: relative;
  z-index: 2;
  flex: 1 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* ── Tech Frame Vectors ─────────────────────────────────────────────────── */
.visual-hero-zone {
  position: relative;
  right: -10%;
  min-height: 50vh;
  margin-top: 24px;
  padding: 0 24px;
  justify-content: flex-end !important;
}

.portrait-container {
  position: relative;
  width: 100%;
  max-width: 520px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* Dynamic Geometric Tech Rings Backlighting the Art */
.halo-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed var(--char-color);
  pointer-events: none;
  z-index: -1;
  opacity: 0.4; /* Increased visibility from 0.25 */
}
.ring-outer {
  width: 115%;
  height: 115%;
  animation: rotation-clock 60s linear infinite;
  filter: drop-shadow(0 0 12px var(--char-color)); /* Enhanced projection weight */
}
.ring-inner {
  width: 90%;
  height: 90%;
  border-style: solid;
  border-width: 2px;
  opacity: 0.2; /* Doubled visibility */
  animation: rotation-counter 40s linear infinite;
  filter: drop-shadow(0 0 6px var(--char-color));
}

@keyframes rotation-clock {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes rotation-counter {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

/* The Core Bleed Glow: Projects character flare out of the cutout artwork boundaries */
.main-portrait {
  filter: drop-shadow(0 0 35px var(--char-color))
    /* Swap intense glow variable directly out for pure color base */
    drop-shadow(0 20px 40px rgba(0, 0, 0, 0.55));
  transition: filter 0.3s ease;
}

/* ── Typography & Scannability UI Elements ────────────────────────────── */
.display-name {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3.5rem, 6.5vw, 6rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  font-style: italic;
  color: var(--char-color);
  filter: drop-shadow(
    0 0 15px var(--char-glow-intense)
  ); /* Upgraded to intense drop shadow for text neon look */
}

.full-name-subtext {
  font-weight: 800;
  letter-spacing: 0.18em;
  color: var(--char-color);
  opacity: 0.9; /* Brightened text opacity */
  text-shadow: 0 0 8px var(--char-glow);
}

.classification-bracket {
  display: flex;
  background: rgb(var(--v-theme-surface));
  border: 1.5px solid var(--char-color); /* Slightly thickened border */
  max-width: fit-content;
  border-radius: 4px;
  box-shadow: 0 0 25px var(--char-glow-intense); /* Projected more color outward via box shadow changes */
}

.bracket-accent {
  width: 6px;
  background-color: var(--char-color);
  box-shadow: 0 0 16px var(--char-color); /* Boosted bracket laser accent lines */
}

.bracket-content {
  padding: 14px 28px;
  display: flex;
  flex-direction: column;
}

.bracket-label {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--char-color);
  opacity: 1; /* Maximized text color prominence */
  margin-bottom: 2px;
  text-shadow: 0 0 4px var(--char-glow);
}

.bracket-value {
  font-family: 'Outfit', sans-serif;
  font-size: 1.6rem;
  font-weight: 300;
  color: rgb(var(--v-theme-on-surface));
}

/* ── Technical Sidebar Navigation Track ─────────────────────────────────── */
.data-sidebar {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 48px;
  z-index: 10;
  padding-right: 24px;
}

.sidebar-line {
  position: absolute;
  right: 0;
  top: -15%;
  height: 130%;
  border-right: 2px solid transparent;
  border-image: linear-gradient(
      to bottom,
      transparent,
      var(--char-color) 30%,
      var(--char-color) 70%,
      transparent
    )
    1;
  filter: drop-shadow(0 0 4px var(--char-color));
}

.data-point {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: 'JetBrains Mono', monospace;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.data-point .label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  opacity: 0.5;
  margin-bottom: 6px;
}

.data-point .value {
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.data-point.active .active-accent {
  color: var(--char-color);
  text-shadow: 0 0 12px var(--char-color); /* Enhanced selected option neon weight */
}

.data-point:hover {
  transform: translateX(-6px);
}

/* ── Marquee Section Bounds ─────────────────────────────────────────────── */
.marquee-stack {
  width: 100%;
  border-top: 1.5px solid var(--char-glow); /* Changed from dashed outline to themed solid neon tracks */
  border-bottom: 1.5px solid var(--char-glow);
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: inset 0 0 12px var(--char-glow); /* Interior glow track bounds */
}

.marquee-group {
  display: flex;
  align-items: center;
  gap: 20px;
}

.marquee-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--char-color);
  opacity: 0.9; /* Heightened text accentuation */
  white-space: nowrap;
  padding-left: 10px;
  text-shadow: 0 0 4px var(--char-glow);
}

.marquee-track {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.marquee-content {
  display: inline-block;
  white-space: nowrap;
  animation: marquee-forward 40s linear infinite;
}

.marquee-content.reverse {
  animation: marquee-reverse 50s linear infinite;
}

.nick-item {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 4px;
  opacity: 0.85;
}

.custom-icon-opacity {
  color: var(--char-color);
  opacity: 0.7; /* Raised internal divider dots color impact */
  filter: drop-shadow(0 0 3px var(--char-color));
}

@keyframes marquee-forward {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

/* ── Viewport Tab Frame Layout ─────────────────────────────────────────── */
.tab-stage {
  width: 100%;
  height: 52vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 12px;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
  mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
}

.tab-stage::-webkit-scrollbar {
  width: 4px;
}
.tab-stage::-webkit-scrollbar-thumb {
  background: var(--char-color); /* Changed directly to character color for scroll tracks */
  box-shadow: 0 0 6px var(--char-color);
  border-radius: 10px;
}

/* ── AI Disclosure Badge ────────────────────────────────────────────────── */
.ai-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  color: #ffca28;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 900;
  border: 1px solid rgba(255, 202, 40, 0.4);
  display: flex;
  align-items: center;
  pointer-events: none;
}
</style>
