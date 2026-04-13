<script setup lang="ts">
// views/sandbox/characters/[category]/[id]/[[subpage]]/index.vue
// Character profile shell — sidebar identity panel + routed subpage content.
// The character identity (avatar, name, class, region) is always visible
// regardless of which section is active.
import { markRaw, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useCharacterStore } from '@/stores/characterStore'
import { RegionLabels, TrainerClassLabels } from '@/types/character'

import AffiliationBanner from '@/components/wiki/AffiliationBanner.vue'
import LeagueRoleBanner from '@/components/wiki/LeagueRoleBanner.vue'

import SummaryTab from '@/components/character/tabs/DefaultTab.vue'
import PokemonTab from '@/components/character/tabs/PokemonTeam.vue'

// ── Store + route ────────────────────────────────────────────────────────────
const route = useRoute('/sandbox/characters/[category]/[id]/[[subpage]]')
const store = useCharacterStore()
const { mobile } = useDisplay()
const defaultImg = 'default.png'
const loadData = () => {
  const { category, id, subpage } = route.params
  store.fetchCharacter(category, id, (subpage as string) || 'index')
}

onMounted(loadData)
watch(() => route.params, loadData, { deep: true })

// ── Tab/section routing ──────────────────────────────────────────────────────
const tabComponents: Record<string, any> = {
  index: markRaw(SummaryTab),
  pokemon: markRaw(PokemonTab),
  // personality: markRaw(PersonalityTab),
  // relationships: markRaw(RelationshipsTab),
  // inventory:   markRaw(InventoryTab),
}

const currentComponent = computed(() => {
  const sub = (route.params.subpage as string) || 'index'
  return tabComponents[sub] ?? SummaryTab
})

const currentPathBase = computed(
  () => `/sandbox/characters/${route.params.category}/${route.params.id}`,
)

// ── UI Helpers ─────────────────────────────────────────────────────────────
const rawColor = computed(() => store.meta?.color || 'blue-grey-darken-3')

// Check if the color is a hex code (starts with #)
const isHex = computed(() => rawColor.value.startsWith('#'))

// Helper for dynamic styles
const themeStyle = computed(() => {
  return isHex.value
    ? {
        backgroundColor: rawColor.value,
      }
    : {}
})
const themeClass = computed(() => {
  return !isHex.value ? `bg-${rawColor.value}` : ''
})

const primaryAffiliation = computed(() => {
  if (!store.meta?.affiliation) return null

  // If it's an array, find the one marked primary. If not, just use the object.
  const orgs = Array.isArray(store.meta?.affiliation)
    ? store.meta?.affiliation
    : [store.meta?.affiliation]

  return orgs.find((o) => o.primary) || orgs[0]
})
console.log(
  'themeStyle:',
  themeStyle.value,
  'themeClass:',
  themeClass.value,
  'rawColor:',
  rawColor.value,
  'isHex:',
  isHex.value,
)

// ── Section nav ──────────────────────────────────────────────────────────────
// Built from the static base sections + whatever the store says is available.
const baseSections = [
  { key: 'index', label: 'Summary', icon: 'mdi-account-outline' },
  { key: 'pokemon', label: 'Pokémon Team', icon: 'mdi-pokeball' },
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

function getImageUrl(path: string, charId: string): string {
  if (!path) return ''

  // 1. If it's an external URL, return as is
  if (path.startsWith('http')) return path

  // 2. Otherwise, assume it's a filename intended for your character folder
  // This helps if your database just stores "falkner.png"
  return `/pokepedia-pages/assets/characters/${charId}/${path}`
}
</script>

<template>
  <v-container v-if="store.meta" fluid class="pa-0">
    <!-- ── Mobile header (replaces sidebar on small screens) ──────────────── -->
    <div v-if="mobile" class="mobile-header" :class="themeClass" :style="themeStyle">
      <div class="mobile-header__band pa-4">
        <div class="d-flex align-center gap-4">
          <v-avatar size="72" class="char-avatar char-avatar--sm shrink-0">
            <v-img :src="getImageUrl(store.meta.image ?? defaultImg, store.meta.id)" cover />
          </v-avatar>
          <div class="min-w-0">
            <div class="text-overline opacity-70 mb-n1">
              {{ RegionLabels[store.meta.region] }}
            </div>
            <h1 class="text-h5 font-weight-bold text-truncate">
              {{ store.meta.name?.full ?? store.meta.id }}
            </h1>
            <div class="d-flex flex-wrap gap-1 mt-1">
              <v-chip
                v-for="cls in store.meta.trainerClass"
                :key="cls"
                size="x-small"
                variant="flat"
              >
                {{ TrainerClassLabels[cls] }}
              </v-chip>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile section nav — horizontal scroll -->
      <div class="mobile-nav">
        <RouterLink
          v-for="section in allSections"
          :key="section.key"
          :to="section.key === 'index' ? currentPathBase : `${currentPathBase}/${section.key}`"
          class="mobile-nav__item"
          :class="{ 'sidebar__nav-item--active': activeSection === section.key }"
          :style="
            activeSection === section.key && isHex
              ? { borderLeftColor: rawColor, color: rawColor }
              : {}
          "
        >
          <v-icon size="14">{{ section.icon }}</v-icon>
          {{ section.label }}
        </RouterLink>
      </div>
    </div>

    <!-- ── Desktop layout: sidebar + content ──────────────────────────────── -->
    <v-container v-else max-width="1200" class="py-8">
      <v-row align-start>
        <!-- Sidebar -->
        <v-col cols="12" md="3" class="pe-md-6">
          <div class="sidebar">
            <!-- Avatar + identity -->
            <div class="sidebar__identity mb-6">
              <div class="char-portrait-wrap mb-4" :class="themeClass" :style="themeStyle">
                <v-img
                  :src="getImageUrl(store.meta.image ?? defaultImg, store.meta.id)"
                  fit-content
                  class="char-portrait"
                  alt="Character Portrait"
                >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular indeterminate color="rgba(255,255,255,0.3)" />
                    </div>
                  </template>
                </v-img>
              </div>

              <div class="text-overline text-medium-emphasis mb-1" style="font-size: 10px">
                {{ RegionLabels[store.meta.region] }} Resident
              </div>
              <h1 class="text-h6 font-weight-bold mb-2" style="line-height: 1.25">
                {{ store.meta.name?.full ?? store.meta.id }}
              </h1>

              <div class="d-flex flex-wrap gap-1 mb-3">
                <v-chip
                  v-for="cls in store.meta.trainerClass"
                  :key="cls"
                  size="x-small"
                  variant="tonal"
                >
                  {{ TrainerClassLabels[cls] }}
                </v-chip>
              </div>

              <!-- League roles -->
              <LeagueRoleBanner
                v-for="role in store.meta.leagueRoles"
                :key="role.title"
                :role="role"
                class="mb-2"
              />
            </div>

            <v-divider class="mb-4" />

            <div
              v-if="store.meta.ribbons != null || store.meta.badges != null"
              class="achievement-box mt-4 mb-2"
            >
              <div class="achievement-box__title">
                <v-icon size="12">mdi-trophy-variant</v-icon>
                Achievements
              </div>

              <div class="achievement-pills">
                <div v-if="store.meta.badges != null" class="achievement-pill">
                  <div class="achievement-pill__icon achievement-pill__icon--badge">
                    <v-icon size="18" color="blue-darken-2">mdi-shield-check</v-icon>
                  </div>
                  <div class="achievement-pill__body">
                    <span class="achievement-pill__count">{{ store.meta.badges }}</span>
                    <span class="achievement-pill__label">Badges</span>
                  </div>
                </div>

                <div v-if="store.meta.ribbons != null" class="achievement-pill">
                  <div class="achievement-pill__icon achievement-pill__icon--ribbon">
                    <v-icon size="18" color="pink-darken-2">mdi-ribbon</v-icon>
                  </div>
                  <div class="achievement-pill__body">
                    <span class="achievement-pill__count">{{ store.meta.ribbons }}</span>
                    <span class="achievement-pill__label">Ribbons</span>
                  </div>
                </div>
              </div>
            </div>

            <AffiliationBanner
              v-if="primaryAffiliation"
              :affiliation="primaryAffiliation"
              class="mb-4"
            />
            <!-- Section navigation -->
            <div class="text-overline text-medium-emphasis mb-2" style="font-size: 10px">
              Sections
            </div>

            <nav class="sidebar__nav">
              <RouterLink
                v-for="section in allSections"
                :key="section.key"
                :to="
                  section.key === 'index' ? currentPathBase : `${currentPathBase}/${section.key}`
                "
                class="sidebar__nav-item"
              >
                <v-icon size="16" class="sidebar__nav-icon">{{ section.icon }}</v-icon>
                <span>{{ section.label }}</span>
              </RouterLink>
            </nav>
          </div>
        </v-col>

        <!-- Main content -->
        <v-col cols="12" md="9">
          <div v-if="store.loading" class="d-flex justify-center align-center py-16">
            <v-progress-circular indeterminate :color="store.meta.color ?? 'primary'" />
          </div>

          <div v-else class="content-panel">
            <!-- Section heading -->
            <div class="content-panel__header mb-6">
              <div class="d-flex align-center gap-2">
                <v-icon
                  :icon="allSections.find((s) => s.key === activeSection)?.icon"
                  :color="store.meta.color ?? 'primary'"
                  size="20"
                />
                <h2 class="text-h6 font-weight-bold">
                  {{ allSections.find((s) => s.key === activeSection)?.label }}
                </h2>
              </div>
              <v-divider class="mt-3" />
            </div>

            <div class="fade-in">
              <component :is="currentComponent" :data="store.activeData" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- ── Mobile content (below mobile header) ───────────────────────────── -->
    <v-container v-if="mobile" class="py-6">
      <div v-if="store.loading" class="d-flex justify-center py-12">
        <v-progress-circular indeterminate :color="store.meta.color ?? 'primary'" />
      </div>
      <div v-else class="fade-in">
        <component :is="currentComponent" :data="store.activeData" />
      </div>
    </v-container>
  </v-container>

  <!-- Loading state before meta arrives -->
  <v-container v-else class="d-flex justify-center align-center" style="min-height: 60vh">
    <v-progress-circular indeterminate color="primary" />
  </v-container>
</template>

<style scoped>
/* ── Avatar ──────────────────────────────────────────────────────────────── */
.char-portrait-wrap {
  /* This creates the "Squircle" look */
  border-radius: 24px;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1 / 1;

  /* Standard shadow to lift it off the page */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

  /* Extra padding if you want a "framed" look, or 0 for full-bleed */
  padding: 0;

  border: 1px solid rgba(var(--v-border-color), 0.1);
}

.char-portrait {
  width: 100%;
  height: 100%;
  /* Ensures the image fills the square without horizontal/vertical stretching */
  object-fit: cover;
  object-position: center top; /* Keeps the face in view for taller portraits */
  transition: transform 0.5s ease;
}

/* Optional: Subtle hover effect for polish */
.char-portrait-wrap:hover .char-portrait {
  transform: scale(1.05);
}

.char-avatar {
  border: 3px solid white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);

  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}

/* ── Sidebar ─────────────────────────────────────────────────────────────── */
.sidebar {
  position: sticky;
  top: 80px;
}

.sidebar__avatar-wrap {
  border-radius: var(--v-border-radius-lg, 12px);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar__role {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

/* ── Sidebar nav ─────────────────────────────────────────────────────────── */
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
  color: rgb(var(--v-theme-on-surface));
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

/* ── Content panel ───────────────────────────────────────────────────────── */
.content-panel {
  min-height: 400px;
}

/* ── Mobile header ───────────────────────────────────────────────────────── */
.mobile-header__band {
  padding: 16px;
  transition: background-color 0.3s ease;
}

.char-region-label {
  opacity: 0.8;
  font-size: 10px;
  line-height: 1;
  margin-bottom: 2px;
}

.char-name {
  color: white;
}

.char-avatar--sm {
  border: 3px solid rgba(255, 255, 255, 0.6);
}

/* ── Mobile section nav (horizontal scroll) ──────────────────────────────── */
.mobile-nav {
  display: flex;
  overflow-x: auto;
  gap: 0;
  border-bottom: 0.5px solid rgba(var(--v-border-color), var(--v-border-opacity));
  scrollbar-width: none;
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
  color: rgb(var(--v-theme-on-background));
  opacity: 0.7;
  border-bottom: 2px solid transparent;
  transition:
    color 0.15s ease,
    border-color 0.15s ease;
  flex-shrink: 0;
}

.mobile-nav__item:hover {
  color: rgb(var(--v-theme-on-surface));
}

.mobile-nav__item--active {
  color: rgb(var(--v-theme-primary));
  border-bottom-color: rgb(var(--v-theme-primary));
  opacity: 1;
}

/* ── Transitions ─────────────────────────────────────────────────────────── */
.fade-in {
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.min-w-0 {
  min-width: 0;
}

.achievement-box {
  border-radius: 12px;
  padding: 16px;
  background: rgba(var(--v-theme-on-surface), 0.03);
  border: 1px solid rgba(var(--v-border-color), 0.12);
  transition: all 0.3s ease;
}

/* Ensure title contrast remains high on both themes */
.achievement-box__title {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-on-surface));
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.achievement-pills {
  display: flex;
  gap: 12px;
}

.achievement-pill {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
  border-radius: 10px;
  /* Surface-bright ensures the pill "lifts" off the achievement-box background */
  background: rgb(var(--v-theme-surface-bright));
  border: 1px solid rgba(var(--v-border-color), 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.achievement-pill__icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Subtle tinting for icons */
.achievement-pill__icon--badge {
  background: rgba(var(--v-theme-info), 0.15);
}

.achievement-pill__icon--ribbon {
  background: rgba(var(--v-theme-error), 0.1);
}

.achievement-pill__body {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.achievement-pill__count {
  font-size: 24px;
  /* Heavy weight makes the achievement feel significant */
  font-weight: 900;
  color: rgb(var(--v-theme-on-surface));
  letter-spacing: -0.5px;
}

.achievement-pill__label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 4px;
  opacity: 0.8;
}

/* ── Theme Specific Contrast Tweaks ────────────────────────────────── */
.v-theme--dark .achievement-pill {
  background: rgba(var(--v-theme-surface), 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}

.v-theme--light .achievement-pill {
  background: white;
  border-color: rgba(0, 0, 0, 0.05);
}

.affiliation-banner {
  position: relative;
  overflow: hidden;
  /* Increased vertical and horizontal padding */
  padding: 24px 28px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.12) 0%,
    rgba(var(--v-theme-surface), 0.7) 100%
  );
  border: 1px solid rgba(var(--v-border-color), 0.15);
  border-left: 6px solid rgb(var(--v-theme-primary));
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.affiliation-banner__content {
  display: flex;
  align-items: center;
  gap: 24px; /* More space between logo and text */
  position: relative;
  z-index: 1;
}

.affiliation-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px; /* Larger logo container */
  height: 60px;
  background: rgb(var(--v-theme-surface));
  border-radius: 14px;
  border: 1px solid rgba(var(--v-border-color), 0.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.affiliation-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.affiliation-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-primary));
  opacity: 0.9;
}

.affiliation-org {
  font-size: 22px; /* Larger organization name */
  font-weight: 950;
  line-height: 1.1;
  color: rgb(var(--v-theme-on-surface));
  letter-spacing: -0.02em;
}

.affiliation-roles {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* More space between chips */
}

.role-chip {
  height: 28px !important; /* Forces a slightly taller, more readable chip */
  font-size: 11px !important;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.affiliation-watermark {
  position: absolute;
  right: -15px;
  bottom: -20px;
  font-size: 110px !important; /* Larger watermark */
  opacity: 0.04;
  transform: rotate(-12deg);
  pointer-events: none;
}

/* Enhancing contrast for dark mode */
.v-theme--dark .affiliation-banner {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.2) 0%,
    rgba(var(--v-theme-surface-light), 0.4) 100%
  );
  border-color: rgba(var(--v-theme-primary), 0.3);
}
</style>
