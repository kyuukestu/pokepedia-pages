<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { CharacterMeta } from '@/types/character'
import { LeagueTitleLabels } from '@/types/league'

defineProps<{ data: CharacterMeta }>()

const route = useRoute()

// Path logic for sub-tabs
function pathBase(): string {
  return route.path.replace(/\/[^/]+$/, '').replace(/\/index$/, '')
}

function sectionPath(tab: string): string {
  return `${pathBase()}/${tab}`
}

// Logic for detail lines in league roles
function roleDetail(role: NonNullable<CharacterMeta['leagueRoles']>[number]): string {
  const parts: string[] = []
  if (role.type) parts.push(`${role.type.charAt(0).toUpperCase() + role.type.slice(1)} type`)
  if ('city' in role && role.city) parts.push(role.city)
  if ('badge' in role && role.badge) parts.push(`${role.badge} Badge`)
  return parts.join(' · ')
}

const hasAnyContent = (data: CharacterMeta) => {
  if (!data) return false

  return (
    !!data.summary ||
    (data.leagueRoles?.length ?? 0) > 0 ||
    !!data.coordinatorRank ||
    !!data.rangerRank ||
    !!data.wcsRank ||
    !!data.occupationRoles?.primary // <— Safely returns undefined/false instead of crashing
  )
}
</script>
<template>
  <div class="summary pt-0">
    <v-row v-if="hasAnyContent(data)" class="mt-0 fill-height">
      <v-col cols="12" md="7" class="pt-0 pr-md-4">
        <section v-if="data?.summary" class="summary__section mb-8">
          <div class="section-label mb-3">About</div>
          <p class="text-body-1 summary__bio mb-0">{{ data.summary }}</p>
        </section>

        <section v-if="data?.occupationRoles?.primary" class="summary__section mb-8">
          <div class="section-label mb-3">Occupation</div>
          <div class="occupation-block">
            <div class="occupation-block__primary">
              <v-icon size="16" class="me-2 text-medium-emphasis">mdi-briefcase-outline</v-icon>
              {{ data.occupationRoles.primary }}
            </div>
            <div v-if="data?.occupationRoles?.other?.length" class="occupation-block__other mt-2">
              <span v-for="role in data.occupationRoles.other" :key="role" class="other-role-chip">
                {{ role }}
              </span>
            </div>
          </div>
        </section>

        <section v-if="data?.leagueRoles?.length" class="summary__section mb-8">
          <div class="section-label mb-3">League Roles</div>
          <div class="roles-list">
            <div v-for="role in data.leagueRoles" :key="role.title" class="role-item">
              <v-icon size="16" color="amber-darken-2" class="shrink-0 mt-px">
                mdi-shield-star
              </v-icon>
              <div>
                <div class="text-body-2 font-weight-500">
                  {{ LeagueTitleLabels[role.title] ?? role.title }}
                </div>
                <div v-if="roleDetail(role)" class="text-caption text-medium-emphasis mt-1">
                  {{ roleDetail(role) }}
                </div>
              </div>
            </div>
          </div>
        </section>
      </v-col>
    </v-row>

    <v-row v-else class="mt-0">
      <v-col cols="12" class="pt-0">
        <v-card variant="outlined" rounded="lg" class="pa-12 text-center border-dashed">
          <v-icon size="48" class="text-medium-emphasis mb-4">mdi-account-question-outline</v-icon>
          <p class="text-h6 text-medium-emphasis mb-1">Incomplete Records</p>
          <p class="text-body-2 text-medium-emphasis">
            This character's biographical data is currently restricted.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
/* Ensure the sidebar stays neatly tucked on the right */
.sticky-sidebar {
  position: sticky;
  top: 24px;
}

.summary__section {
  /* Ensure the section doesn't introduce unwanted vertical offsets */
  position: relative;
  width: 100%;
}

.section-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.8;
}

.section-label::after {
  content: '';
  flex: 1;
  height: 0.5px;
}

.summary__bio {
  line-height: 1.8;
  color: rgb(var(--v-theme-on-surface));
  /* Prevents text from feeling too wide and unreadable */
  max-width: 65ch;
}

/* Simplified CSS - BioDataCard handles the complex fact-item styles now */
.section-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.8;
  white-space: nowrap;
}

.section-label::after {
  content: '';
  flex: 1;
  height: 0.5px;
  background: rgba(var(--v-border-color), var(--v-border-opacity));
  margin-left: 8px; /* Space between text and line */
}

.summary__bio {
  line-height: 1.8;
  color: rgb(var(--v-theme-on-surface));
}

.occupation-block,
.role-item {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(var(--v-border-color), 0.1);
  background: rgba(var(--v-theme-surface-variant), 0.1);
}

.occupation-block__primary {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
}

.other-role-chip {
  font-size: 11px;
  background: rgba(var(--v-theme-surface-variant), 0.5);
  border-radius: 20px;
  padding: 2px 10px;
  border: 1px solid rgba(var(--v-border-color), 0.1);
}

.roles-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.explore-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.explore-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid rgba(var(--v-border-color), 0.2);
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  transition: all 0.2s ease;
}

.explore-chip:hover {
  background: rgba(var(--v-theme-primary), 0.08);
  border-color: rgb(var(--v-theme-primary));
}

.border-dashed {
  border-style: dashed !important;
}
</style>
