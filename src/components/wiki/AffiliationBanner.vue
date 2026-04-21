<script setup lang="ts">
// components/character/AffiliationBanner.vue

interface AffiliationRole {
  title: string
  status?: 'active' | 'former'
}

interface Affiliation {
  orgId: string
  roles?: AffiliationRole[]
}

defineProps<{
  affiliation: Affiliation
}>()

function formatOrgName(orgId: string): string {
  return orgId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
</script>

<template>
  <div class="aff-banner" :class="{ 'aff-banner--has-roles': affiliation.roles?.length }">
    <div class="aff-banner__inner">
      <div class="aff-banner__icon-wrap">
        <div class="aff-banner__icon-container">
          <v-icon size="26" color="primary">mdi-account-group-outline</v-icon>
        </div>
      </div>

      <div class="aff-banner__content">
        <div class="aff-banner__header">
          <span class="aff-banner__top-label">Primary Affiliation</span>
        </div>

        <div class="aff-banner__main">
          <h3 class="aff-banner__org">{{ formatOrgName(affiliation.orgId) }}</h3>

          <div v-if="affiliation.roles?.length" class="aff-banner__roles">
            <span
              v-for="(role, i) in affiliation.roles"
              :key="i"
              class="role-chip"
              :class="role.status === 'former' ? 'role-chip--former' : 'role-chip--active'"
            >
              <v-icon v-if="role.status !== 'former'" size="10" class="me-1">mdi-circle</v-icon>
              {{ role.title }}
              <span v-if="role.status === 'former'" class="role-chip__status">Former</span>
            </span>
          </div>
        </div>
      </div>

      <v-icon class="aff-banner__watermark">mdi-office-building-marker-outline</v-icon>
    </div>
  </div>
</template>

<style scoped>
.aff-banner {
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 16px;
  /* Glassmorphism matching LeagueBanner */
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-surface-bright), 0.7) 0%,
    rgba(var(--v-theme-surface-variant), 0.3) 100%
  );
  border: 1px solid rgba(var(--v-border-color), 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  /* Left accent using the Primary theme color */
  box-shadow: inset 4px 0 0 0 rgb(var(--v-theme-primary));
}

.aff-banner:hover {
  transform: translateY(-2px);
  box-shadow:
    inset 4px 0 0 0 rgb(var(--v-theme-primary)),
    0 6px 16px rgba(0, 0, 0, 0.1);
}

.aff-banner__inner {
  display: flex;
  align-items: center;
  padding: 18px 20px;
  gap: 18px;
  flex: 1;
  z-index: 1;
}

/* ── Icon Visuals ────────────────────────────────────────────── */
.aff-banner__icon-container {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(var(--v-theme-surface));
  border-radius: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(var(--v-border-color), 0.08);
}

/* ── Typography ────────────────────────────────────────────────── */
.aff-banner__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.aff-banner__top-label {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 2px;
  display: block;
}

.aff-banner__org {
  font-size: 18px;
  font-weight: 900;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* ── Roles & Chips ─────────────────────────────────────────────── */
.aff-banner__roles {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.role-chip {
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.role-chip--active {
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
}

.role-chip--former {
  background: rgba(var(--v-theme-on-surface), 0.05);
  border: 1px solid rgba(var(--v-border-color), 0.12);
}

.role-chip__status {
  font-size: 8px;
  opacity: 0.6;
  margin-left: 6px;
  padding-left: 6px;
  border-left: 1px solid rgba(var(--v-border-color), 0.2);
}

/* ── Background Decoration ─────────────────────────────────────── */
.aff-banner__watermark {
  position: absolute;
  right: -10px;
  bottom: -15px;
  font-size: 90px !important;
  opacity: 0.03;
  transform: rotate(-15deg);
  pointer-events: none;
}

.v-theme--dark .aff-banner {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-surface-light), 0.4) 0%,
    rgba(var(--v-theme-surface), 0.2) 100%
  );
}
</style>
