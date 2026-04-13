<script setup lang="ts">
// components/character/tabs/DefaultTab.vue
// Summary section — shown at /sandbox/characters/[category]/[id]
// Strictly typed against CharacterMeta — no phantom fields.
import type { CharacterMeta } from '@/types/character'
import {
  RegionLabels,
  LeagueTitleLabels,
  TrainerClassLabels,
  RangerRankLabels,
  CoordinatorRankLabels,
  WCSRankLabels,
} from '@/types/character'
import { useRoute } from 'vue-router'

const props = defineProps<{ data: CharacterMeta }>()

const route = useRoute()

// LeagueRole is a discriminated union — gymLeader carries badge + city.
// This helper extracts a readable detail string from any variant safely.
function roleDetail(role: NonNullable<CharacterMeta['leagueRoles']>[number]): string {
  const parts: string[] = []
  if (role.type) parts.push(`${role.type.charAt(0).toUpperCase() + role.type.slice(1)} type`)
  if ('city' in role && role.city) parts.push(role.city)
  if ('badge' in role && role.badge) parts.push(`${role.badge} Badge`)
  return parts.join(' · ')
}

// Strips the current subpage segment so section links resolve correctly
// from any depth, e.g. /sandbox/characters/npc/will/pokemon → /sandbox/characters/npc/will
function sectionPath(tab: string): string {
  const base = route.path.replace(/\/[^/]+$/, '').replace(/\/index$/, '')
  return `${base}/${props.data.id}/${tab}`
}
</script>

<template>
  <div class="summary">
    <!-- Profile facts ────────────────────────────────────────────── -->
    <section class="summary__section mb-8">
      <div class="section-label mb-3">Profile</div>

      <div class="facts-grid">
        <div class="fact-item">
          <div class="fact-item__label">
            <v-icon size="14" class="me-1">mdi-map-marker-outline</v-icon>
            Home Region
          </div>
          <div class="fact-item__value d-flex justify-center">
            {{ RegionLabels[data.region] ?? data.region }}
          </div>
        </div>

        <div class="fact-item align-start">
          <div class="fact-item__label pt-1">
            <v-icon size="14" class="me-1">mdi-badge-account-outline</v-icon>
            Trainer Class
          </div>
          <div class="fact-item__value">
            <div class="d-flex flex-wrap ga-1">
              <v-chip
                v-for="cls in data.trainerClass"
                :key="cls"
                size="x-small"
                variant="tonal"
                color="primary"
                class="font-weight-bold text-uppercase"
                label
              >
                {{ TrainerClassLabels[cls] ?? cls }}
              </v-chip>
            </div>
          </div>
        </div>

        <div v-if="data.coordinatorRank" class="fact-item">
          <div class="fact-item__label">
            <v-icon size="14" class="me-1">mdi-star-circle-outline</v-icon>
            Coordinator Rank
          </div>
          <div class="fact-item__value d-flex justify-center">
            {{ CoordinatorRankLabels[data.coordinatorRank] }}
          </div>
        </div>

        <div v-if="data.rangerRank" class="fact-item">
          <div class="fact-item__label">
            <v-icon size="14" class="me-1">mdi-shield-account-outline</v-icon>
            Ranger Rank
          </div>
          <div class="fact-item__value">
            {{ RangerRankLabels[data.rangerRank] }}
          </div>
        </div>

        <div v-if="data.wcsRank" class="fact-item">
          <div class="fact-item__label">
            <v-icon size="14" class="me-1">mdi-tournament</v-icon>
            WCS Class
          </div>
          <div class="fact-item__value">
            {{ WCSRankLabels[data.wcsRank] }}
          </div>
        </div>

        <div v-if="data.name?.short?.length" class="fact-item">
          <div class="fact-item__label">
            <v-icon size="14" class="me-1">mdi-text-short</v-icon>
            Also Known As
          </div>
          <div class="fact-item__value">
            {{ data.name.short.join(', ') }}
          </div>
        </div>
      </div>
    </section>

    <!-- League roles ────────────────────────────────────────────── -->
    <section v-if="data.leagueRoles?.length" class="summary__section mb-8">
      <div class="section-label mb-3">League Roles</div>

      <div class="roles-list">
        <div v-for="role in data.leagueRoles" :key="role.title" class="role-item">
          <v-icon size="18" color="amber-darken-2" class="shrink-0"> mdi-shield-star </v-icon>
          <div>
            <div class="text-subtitle-2 font-weight-bold">
              {{ LeagueTitleLabels[role.title] ?? role.title }}
            </div>
            <div v-if="roleDetail(role)" class="text-caption text-medium-emphasis mt-1">
              {{ roleDetail(role) }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section links (if extra tabs declared in meta) ──────────── -->
    <section v-if="data.tabs?.length" class="summary__section mb-8">
      <div class="section-label mb-3">Explore Further</div>

      <div class="tabs-hint">
        <RouterLink
          v-for="tab in data.tabs"
          :key="tab"
          :to="sectionPath(tab)"
          class="tab-hint-chip"
        >
          <v-icon size="13">mdi-arrow-right-circle-outline</v-icon>
          {{ tab.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) }}
        </RouterLink>
      </div>
    </section>

    <!-- Empty state ─────────────────────────────────────────────── -->
    <section v-if="!data.summary?.length">
      <v-card variant="outlined" rounded="lg" class="pa-6 text-center">
        <v-icon size="40" class="text-medium-emphasis mb-3">mdi-account-edit-outline</v-icon>
        <p class="text-body-2 text-medium-emphasis">
          This character's summary is still being filled out. Check their other sections or come
          back soon.
        </p>
      </v-card>
    </section>
  </div>
</template>

<style scoped>
.section-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-on-surface));
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(var(--v-border-color), var(--v-border-opacity));
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
}

.fact-item {
  padding: 12px 14px;
  border-radius: var(--v-border-radius-md, 8px);
  border: 0.5px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgb(var(--v-theme-surface));
  transition: transform 0.2s ease;
}

.fact-item:hover {
  transform: translateY(-2px);
  border-color: rgb(var(--v-theme-primary));
}

.fact-item__label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-primary));
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  opacity: 0.9;
}

.fact-item__value {
  font-size: 14px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.3;
  text-transform: capitalize;
}

.roles-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.role-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--v-border-radius-md, 8px);
  border: 0.5px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgb(var(--v-theme-surface));
}

.tabs-hint {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tab-hint-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 20px;
  border: 0.5px solid rgba(var(--v-border-color), var(--v-border-opacity));
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  transition: background 0.15s ease;
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-primary));
}

.tab-hint-chip:hover {
  background: rgba(var(--v-theme-primary), 0.08);
}
</style>
