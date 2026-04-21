<script setup lang="ts">
// views/sandbox/characters/[category]/[id]/[[subpage]]/index.vue
import { markRaw, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useCharacterStore } from '@/stores/characterStore'
import { TrainerClassLabels } from '@/types/character'
import { RegionLabels } from '@/types/region'

import AffiliationBanner from '@/components/wiki/AffiliationBanner.vue'
import LeagueRoleBanner from '@/components/wiki/LeagueRoleBanner.vue'
import SummaryTab from '@/components/character/tabs/DefaultTab.vue'
import PokemonTab from '@/components/character/tabs/PokemonTeam.vue'
import AchievementTab from '@/components/character/tabs/AchievementTab.vue'
import BioDataCard from '@/components/character/BioDataCard.vue'
import CharacterSpeedDial from '@/components/nav/CharacterSpeedDial.vue'
import AchievementBanner from '@/components/wiki/AchievementBanner.vue'
import { allGymRegistry } from '@/data/gym-registry'
import { allRibbonRegistry } from '@/data/contest-registry'

// ── Store + route ────────────────────────────────────────────────────────────
const route = useRoute('/sandbox/characters/[category]/[id]/[[subpage]]')
const store = useCharacterStore()
const { mobile } = useDisplay()
const defaultImg = 'default.png'

const loadData = () => {
  const { category, id, subpage } = route.params

  // If we are on /achievements, it looks for achievements.ts
  // If we are on the root, it looks for index.ts
  const targetFile = (subpage as string) || 'index'

  store.fetchCharacter(category, id, targetFile)
}

onMounted(loadData)
watch(() => route.params, loadData, { deep: true })

// ── Section routing ──────────────────────────────────────────────────────────
const tabComponents: Record<string, any> = {
  index: markRaw(SummaryTab),
  pokemon: markRaw(PokemonTab),
  achievements: markRaw(AchievementTab),
  // personality:   markRaw(PersonalityTab),
  // relationships: markRaw(RelationshipsTab),
  // inventory:     markRaw(InventoryTab),
}

const currentComponent = computed(() => {
  const sub = (route.params.subpage as string) || 'index'
  return tabComponents[sub] ?? SummaryTab
})

const currentPathBase = computed(
  () => `/sandbox/characters/${route.params.category}/${route.params.id}`,
)

// ── Color helpers ────────────────────────────────────────────────────────────
// color can be a Vuetify class token ("blue-darken-2") or a hex ("#a3b18a")
const rawColor = computed(() => store.meta?.color ?? 'primary')
const isHex = computed(() => rawColor.value.startsWith('#'))
const themeStyle = computed(() => (isHex.value ? { backgroundColor: rawColor.value } : {}))
const themeClass = computed(() => (!isHex.value ? `bg-${rawColor.value}` : ''))

// ── Primary affiliation ──────────────────────────────────────────────────────
const primaryAffiliation = computed(() => {
  const orgs = store.meta?.affiliation
  if (!orgs?.length) return null
  return orgs.find((o) => o.primary) ?? orgs[0]
})

// ── Section nav ──────────────────────────────────────────────────────────────
const baseSections = [
  { key: 'index', label: 'Summary', icon: 'mdi-account-outline' },
  { key: 'pokemon', label: 'Pokémon Team', icon: 'mdi-pokeball' },
  { key: 'achievements', label: 'Achievements', icon: 'mdi-trophy-award' },
]

const extraSections = computed(() => {
  if (!store.meta?.tabs) return []
  return store.meta.tabs
    .filter((t: string) => !baseSections.some((b) => b.key === t))
    .map((t: string) => ({
      key: t,
      label: t.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
      icon: sectionIcon(t),
    }))
})

const allSections = computed(() => [...baseSections, ...extraSections.value])
const activeSection = computed(() => (route.params.subpage as string) || 'index')

function sectionIcon(key: string): string {
  const map: Record<string, string> = {
    personality: 'mdi-emoticon-outline',
    relationships: 'mdi-account-multiple-outline',
    inventory: 'mdi-bag-personal-outline',
    history: 'mdi-book-open-outline',
    appearance: 'mdi-palette-outline',
    goals: 'mdi-flag-outline',
  }
  return map[key] ?? 'mdi-file-outline'
}

const dialLinks = computed(() => {
  return allSections.value.map((section) => ({
    title: section.label,
    icon: section.icon,
    // Construct the path: if index, use base; otherwise append key
    to: section.key === 'index' ? currentPathBase.value : `${currentPathBase.value}/${section.key}`,
  }))
})

function getImageUrl(path: string, charId: string, category: string): string {
  if (!path || path.startsWith('http')) return path
  const base = import.meta.env.BASE_URL
  console.log(`${base}/assets/characters/${category}/${charId}/${path}`.replace(/\/+/g, '/'))
  return `${base}/assets/characters/${category}/${charId}/${path}`.replace(/\/+/g, '/')
}

const totalGlobalBadges = computed(() => {
  if (!store.meta) return 0
  const ownedIds = Object.values(store.meta.badges || {})
    .flat()
    .filter((b) => b.obtained)
    .map((b) => b.gymId)

  return ownedIds.reduce((count, ownedId) => {
    // Verify if the badge exists in our registry and is a Primary circuit gym
    const gym = allGymRegistry.find((g) => g.id === ownedId)
    return gym && gym.isPrimary ? count + 1 : count
  }, 0)
})

const totalGlobalRibbons = computed(() => {
  if (!store.meta?.ribbons) return 0

  // 1. Flatten the RibbonCollection into a list of IDs
  // Since it's Partial<Record<Region, RibbonRecord[]>>
  const ownedIds = Object.values(store.meta.ribbons)
    .flat()
    .map((r) => r.ribbonId)

  // 2. Count them against the Ribbon Registry
  return ownedIds.reduce((count, ownedId) => {
    // We check the Ribbon Registry instead of the Gym Registry
    const ribbonExists = allRibbonRegistry.some((r) => r.id === ownedId)
    return ribbonExists ? count + 1 : count
  }, 0)
})
</script>

<template>
  <v-container v-if="store.meta" fluid class="pa-0">
    <!-- ── Mobile header ──────────────────────────────────────────────────── -->
    <div v-if="mobile" class="mobile-header" :class="themeClass" :style="themeStyle">
      <div class="pa-4">
        <div class="d-flex align-center gap-4">
          <v-avatar size="72" class="mobile-avatar shrink-0">
            <v-img
              :src="getImageUrl(store.meta.image ?? defaultImg, store.meta.id, store.meta.category)"
              cover
            />
          </v-avatar>

          <div class="min-w-0">
            <div class="text-overline mobile-overline mb-n1">
              {{ RegionLabels[store.meta.region] }}
            </div>
            <h1 class="text-h5 font-weight-500 text-white text-truncate">
              {{ store.meta.name?.full ?? store.meta.id }}
            </h1>
            <div class="d-flex flex-wrap gap-1 mt-1">
              <v-chip
                v-for="(cls, index) in store.meta.trainerClass.other"
                :key="index"
                size="x-small"
                variant="tonal"
                color="white"
              >
                {{ TrainerClassLabels[cls] }}
              </v-chip>
            </div>
          </div>
        </div>
      </div>

      <!-- Horizontal section nav -->
      <div class="mobile-nav">
        <RouterLink
          v-for="section in allSections"
          :key="section.key"
          :to="section.key === 'index' ? currentPathBase : `${currentPathBase}/${section.key}`"
          class="mobile-nav__item"
          :class="{ 'mobile-nav__item--active': activeSection === section.key }"
        >
          <v-icon size="13">{{ section.icon }}</v-icon>
          {{ section.label }}
        </RouterLink>
      </div>
    </div>

    <!-- ── Desktop: sidebar + content ─────────────────────────────────────── -->
    <v-container v-else max-width="1200" class="py-8">
      <v-row align-start>
        <!-- Sidebar -->
        <v-col cols="12" md="3" class="pe-md-6">
          <div class="sidebar">
            <!-- Portrait -->
            <div class="portrait-wrap mb-5" :class="themeClass" :style="themeStyle">
              <v-img
                :src="
                  getImageUrl(store.meta.image ?? defaultImg, store.meta.id, store.meta.category)
                "
                class="portrait-img"
                contain
                alt="Character portrait"
              >
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate color="rgba(255,255,255,0.4)" size="24" />
                  </div>
                </template>
              </v-img>
            </div>

            <!-- Identity text -->
            <div class="identity-group mb-6 docked">
              <div class="identity-group__content">
                <div class="text-overline identity-overline">
                  {{ RegionLabels[store.meta.region] }} Resident
                </div>
                <h1 class="identity-name">
                  {{ store.meta.name?.full ?? store.meta.id }}
                </h1>
              </div>
            </div>

            <BioDataCard :data="store.meta" />

            <!-- League role banners -->
            <LeagueRoleBanner
              v-for="role in store.meta.leagueRoles"
              :key="role.title"
              :role="role"
              class="mb-2"
            />

            <v-divider class="my-4" />

            <!-- Achievements -->
            <AchievementBanner
              :badges="totalGlobalBadges"
              :ribbons="totalGlobalRibbons"
              :to="`${currentPathBase}/achievements`"
            />

            <!-- Affiliation banner -->
            <AffiliationBanner
              v-if="primaryAffiliation"
              :affiliation="primaryAffiliation"
              class="mb-4"
            />

            <!-- Section nav -->
            <CharacterSpeedDial :links="dialLinks" :root-path="currentPathBase" />
          </div>
        </v-col>

        <!-- Main content -->
        <v-col cols="12" md="9">
          <div v-if="store.loading" class="d-flex justify-center py-16">
            <v-progress-circular indeterminate :color="rawColor" />
          </div>

          <div v-else class="content-panel">
            <div class="fade-in">
              <div class="content-panel">
                <component :is="currentComponent" :data="store.activeData" />
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- ── Mobile content ─────────────────────────────────────────────────── -->
    <v-container v-if="mobile" class="py-6">
      <div v-if="store.loading" class="d-flex justify-center py-12">
        <v-progress-circular indeterminate :color="rawColor" />
      </div>
      <div v-else class="fade-in">
        <component :is="currentComponent" :data="store.activeData" />
      </div>
    </v-container>
  </v-container>

  <!-- Pre-load state -->
  <v-container v-else class="d-flex justify-center align-center" style="min-height: 60vh">
    <v-progress-circular indeterminate color="primary" />
  </v-container>
</template>

<style scoped>
/* ── Portrait ──────────────────────────────────────────────────────────── */
.portrait-wrap {
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 0.5px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-position: center top;
  transition: transform 0.4s ease;
}

.portrait-wrap:hover .portrait-img {
  transform: scale(1.03);
}

/* ── Mobile avatar ─────────────────────────────────────────────────────── */
.mobile-avatar {
  border: 2px solid rgba(255, 255, 255, 0.5);
}

/* ── Mobile header ─────────────────────────────────────────────────────── */
.mobile-overline {
  color: rgba(255, 255, 255, 0.65);
}

/* ── Mobile nav ────────────────────────────────────────────────────────── */
.mobile-nav {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  border-top: 0.5px solid rgba(255, 255, 255, 0.12);
}

.mobile-nav::-webkit-scrollbar {
  display: none;
}

.mobile-nav__item {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  border-bottom: 2px solid transparent;
  transition:
    color 0.15s ease,
    border-color 0.15s ease;
  flex-shrink: 0;
}

.mobile-nav__item:hover {
  color: rgba(255, 255, 255, 0.9);
}

.mobile-nav__item--active {
  color: white;
  border-bottom-color: rgba(255, 255, 255, 0.8);
}
/* ── Identity Group ───────────────────────────────────────────── */
.identity-group {
  background: rgba(var(--v-theme-surface-variant), 0.2);
  border-radius: 16px;
  border: 1px solid rgba(var(--v-border-color), 0.1);
  overflow: hidden; /* Clips the BioDataCard to match the group radius */
}

.identity-group__content {
  padding: 16px 16px 12px 16px;
  /* Add a vertical accent line using the theme color */
  border-left: 3px solid var(--v-theme-primary);
}

.identity-overline {
  font-size: 10px !important;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgb(var(--v-theme-primary)); /* Match theme color */
  margin-bottom: 2px;
}

.identity-name {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
  color: rgb(var(--v-theme-on-surface));
}

/* ── BioDataCard Docking ───────────────────────────────────────── */
.docked {
  /* Remove internal card borders/shadows so it feels like one piece */
  border: none !important;
  background: transparent !important;
  /* Top-border creates a subtle separation from the name */
  border-top: 1px solid rgba(var(--v-border-color), 0.1) !important;
  border-radius: 0 !important;
  padding: 12px 16px 16px 16px;
}

/* ── Sidebar ───────────────────────────────────────────────────────────── */
.sidebar {
  position: sticky;
  top: 80px;
}

/* ── Sidebar nav ───────────────────────────────────────────────────────── */
.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar__nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: var(--v-border-radius-md, 8px);
  text-decoration: none;
  font-size: 13px;
  font-weight: 400;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.sidebar__nav-item:hover {
  background: rgba(var(--v-theme-surface-variant), 0.5);
  color: rgb(var(--v-theme-on-surface));
}

.sidebar__nav-item--active {
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  font-weight: 500;
  border-left: 3px solid rgb(var(--v-theme-primary));
  border-radius: 0 var(--v-border-radius-md, 8px) var(--v-border-radius-md, 8px) 0;
}

.sidebar__nav-item--active .sidebar__nav-icon {
  color: rgb(var(--v-theme-primary));
}

/* ── Mini Stats (Icons + Count) ─────────────────────────────── */
.achievement-banner__icons {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 45px;
}

.mini-stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Roboto Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
}

/* ── Typography ─────────────────────────────────────────────── */
.achievement-banner__text {
  flex: 1;
  min-width: 0;
}

.achievement-overline {
  font-size: 9px !important;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: rgb(var(--v-theme-primary));
  line-height: 1;
  margin-bottom: 2px;
}

.achievement-title {
  font-size: 13px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.achievement-arrow {
  opacity: 0.3;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.achievement-banner:hover .achievement-arrow {
  opacity: 1;
  transform: translateX(2px);
}
/* ── Content panel ─────────────────────────────────────────────────────── */
.content-panel {
  min-height: 400px;
}

/* ── Transitions ───────────────────────────────────────────────────────── */
.fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.min-w-0 {
  min-width: 0;
}
</style>
