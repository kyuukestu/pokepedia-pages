<script setup lang="ts">
import { useRoute } from 'vue-router'
import { eventDefinitions, eventInstances } from '@/data/event-list'

const route = useRoute()
const params = route.params as { slug: string }
const slug = params.slug

const definition = eventDefinitions.find((d) => d.slug === slug)
const instances = eventInstances
  .filter((i) => i.eventSlug === slug)
  .sort((a, b) => b.start.localeCompare(a.start))
</script>
<template>
  <v-container v-if="definition" max-width="1400" class="py-12 px-6">
    <v-row class="fill-height">
      <!-- Left Column: Lore & Details -->
      <v-col cols="12" md="7" lg="7" class="pe-md-10">
        <v-btn
          variant="text"
          prepend-icon="mdi-arrow-left"
          to="/sandbox/events"
          class="mb-8 px-0 text-none font-weight-bold"
          color="primary"
          size="small"
        >
          BACK TO DIRECTORY
        </v-btn>

        <header class="mb-10">
          <div class="text-overline text-primary mb-2 letter-spacing-2">Event Profile</div>
          <h1 class="text-h2 font-weight-black mb-4">{{ definition.title }}</h1>

          <div class="d-flex align-center gap-3">
            <v-chip color="primary" variant="flat" rounded="lg" class="font-weight-bold">
              {{ definition.category }}
            </v-chip>
            <v-chip variant="outlined" rounded="lg" prepend-icon="mdi-map-marker-outline">
              {{ definition.region }}
            </v-chip>
          </div>
        </header>

        <article class="lore-content">
          <p class="text-body-1 text-high-emphasis">
            {{ definition.generalDescription }}
          </p>

          <v-divider class="my-10" />

          <div class="d-flex align-center justify-space-between">
            <div class="text-caption text-medium-emphasis">Source: Official Regional Records</div>
            <v-btn
              v-if="definition.bulba"
              :href="definition.bulba"
              target="_blank"
              variant="outlined"
              prepend-icon="mdi-book-open-variant"
              rounded="pill"
              size="small"
            >
              Bulbapedia
            </v-btn>
          </div>
        </article>
      </v-col>

      <!-- The Vertical Divider (Hidden on mobile) -->
      <div class="d-none d-md-block vertical-separator"></div>

      <!-- Right Column: Full-Height Timeline -->
      <v-col cols="12" md="5" lg="4" class="ps-md-10">
        <div class="timeline-container">
          <div class="d-flex align-center mb-8">
            <v-icon color="primary" class="me-3">mdi-hexagon-multiple-outline</v-icon>
            <h3 class="text-h6 font-weight-bold letter-spacing-1">CHRONOLOGY</h3>
          </div>

          <div v-if="instances.length > 0" class="sleek-timeline">
            <div v-for="inst in instances" :key="inst.instanceId" class="timeline-entry">
              <div class="rail">
                <div :class="['dot', inst.status]"></div>
                <div class="line"></div>
              </div>

              <RouterLink :to="`/sandbox/events/${slug}/${inst.instanceId}`" class="entry-content">
                <div class="d-flex flex-column">
                  <span class="entry-date">{{ inst.start.split('T')[0] }}</span>
                  <span class="entry-title">{{ inst.location }}</span>
                </div>

                <v-spacer />

                <v-chip
                  v-if="inst.status === 'upcoming'"
                  size="x-small"
                  color="success"
                  variant="tonal"
                  class="font-weight-bold"
                >
                  LIVE
                </v-chip>
              </RouterLink>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Column Definition */
.vertical-separator {
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(var(--v-border-color), 0.2) 15%,
    rgba(var(--v-border-color), 0.2) 85%,
    transparent 100%
  );
  margin: 20px 0;
}

.lore-content p {
  line-height: 2;
  font-size: 1.125rem !important;
  color: rgba(var(--v-theme-on-surface), 0.87);
}

/* Timeline Layout */
.timeline-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sleek-timeline {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.timeline-entry {
  display: flex;
  align-items: stretch;
  min-height: 60px; /* Taller entries for better vertical spacing */
}

/* The Rail */
.rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30px;
  margin-right: 16px;
}

.dot {
  width: 10px;
  height: 10px;
  border: 2px solid rgb(var(--v-theme-surface));
  border-radius: 50%;
  background: rgba(var(--v-theme-on-surface), 0.15);
  z-index: 2;
  transition: all 0.3s ease;
  margin-top: 6px;
}

.dot.upcoming {
  background: rgb(var(--v-theme-success));
  box-shadow: 0 0 0 4px rgba(var(--v-theme-success), 0.1);
}

.line {
  flex-grow: 1;
  width: 1px;
  background: rgba(var(--v-border-color), 0.15);
  margin: 4px 0;
}

.timeline-entry:last-child .line {
  display: none;
}

/* The Content */
.entry-content {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 8px 16px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex: 1;
  border: 1px solid transparent;
  margin-bottom: 8px;
}

.entry-date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.entry-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(var(--v-theme-on-surface), 0.8);
}

/* Hover States */
.timeline-entry:hover .dot {
  transform: scale(1.4);
  background: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 6px rgba(var(--v-theme-primary), 0.1);
}

.timeline-entry:hover .entry-content {
  background: rgb(var(--v-theme-surface));
  border-color: rgba(var(--v-theme-primary), 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateX(8px);
}

.letter-spacing-2 {
  letter-spacing: 2px;
}
</style>
