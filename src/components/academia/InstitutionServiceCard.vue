<script setup lang="ts">
import type { Institution } from '@/types/institutions'

defineProps<{
  institution: Institution
}>()
</script>

<template>
  <v-card
    class="institution-card border-sm rounded-xl overflow-hidden"
    variant="flat"
    elevation="0"
  >
    <!-- Header Image with Overlay -->
    <v-img :src="institution.image" height="220" cover class="align-end text-white">
      <div
        class="fill-height bg-linear-to-t from-black/80 to-transparent d-flex flex-column justify-end pa-6"
      >
        <v-chip
          size="x-small"
          color="primary"
          variant="flat"
          class="text-uppercase font-weight-black mb-2 align-self-start"
        >
          {{ institution.category }}
        </v-chip>
        <h2 class="text-h5 font-weight-black text-uppercase leading-tight">
          {{ institution.name }}
        </h2>
      </div>
    </v-img>

    <v-card-text class="pa-6">
      <!-- Location & Specialization -->
      <div class="d-flex align-center ga-2 mb-4 opacity-70">
        <v-icon size="small">mdi-map-marker-outline</v-icon>
        <span class="text-caption font-weight-bold text-uppercase tracking-widest">
          {{ institution.location.city }}, {{ institution.location.region }}
        </span>
      </div>

      <p class="text-body-2 mb-6 line-clamp-3 opacity-80">
        {{ institution.description }}
      </p>

      <!-- Specialties Tags -->
      <div class="d-flex flex-wrap ga-2 mb-6">
        <v-chip
          v-for="spec in institution.specialties"
          :key="spec"
          size="x-small"
          variant="tonal"
          class="rounded-lg border-thin"
        >
          {{ spec }}
        </v-chip>
      </div>

      <v-divider class="mb-6 opacity-10" />

      <!-- Enrollment Benefits Section -->
      <div class="enrollment-box pa-4 rounded-lg bg-surface-variant/20 border-thin">
        <div class="d-flex align-center justify-space-between mb-3">
          <span class="text-overline font-weight-black leading-none">Enrollment Benefits</span>
          <v-icon
            v-if="institution.enrollment"
            :color="institution.enrollment.isOpen ? 'success' : 'error'"
            size="small"
          >
            {{ institution.enrollment.isOpen ? 'mdi-check-decagram' : 'mdi-lock-outline' }}
          </v-icon>
        </div>

        <ul v-if="institution.enrollment" class="pa-0 ma-0 list-none">
          <li
            v-for="benefit in institution.enrollment.benefits"
            :key="benefit"
            class="d-flex align-center ga-2 text-caption mb-1"
          >
            <v-icon color="primary" size="10">mdi-square</v-icon>
            {{ benefit }}
          </li>
        </ul>
      </div>
    </v-card-text>

    <!-- Navigation -->
    <v-card-actions class="pa-6 pt-0">
      <v-btn
        block
        color="primary"
        variant="flat"
        size="large"
        class="rounded-lg font-weight-black"
        :to="`/sandbox/academia/${institution.id}`"
      >
        VIEW FACILITY DETAILS
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.institution-card {
  background: rgb(var(--v-theme-surface)) !important;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
}

.institution-card:hover {
  transform: translateY(-4px);
  border-color: rgba(var(--v-theme-primary), 0.4) !important;
}

.bg-gradient-to-t {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
}

.list-none {
  list-style: none;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
