<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'

import { ref } from 'vue'
import { VueFlow, type NodeMouseEvent } from '@vue-flow/core'

import { rangerNodes, rangerEdges } from '@/data/rangers'

import RangerRankNode from '@/components/rangers/RangerRankNode.vue'
import RangerTrackNode from '@/components/rangers/RangerTrackNode.vue'
import RangerInfoPanel from '@/components/rangers/RangerInfoPanel.vue'

import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

const selectedRank = ref(null)

const rangerRoles: FeatureItem[] = [
  {
    title: 'Disaster Relief',
    icon: 'mdi-fire-truck',
    color: 'green',
    description:
      'Deploying to rescue both humans and Pokémon from natural catastrophes like forest fires, floods, or avalanches.',
  },
  {
    title: 'Habitat Protection',
    icon: 'mdi-shield-check',
    color: 'green',
    description:
      'Patrolling protected zones to prevent illegal poaching, habitat destruction, and other environmental crimes.',
  },
  {
    title: 'Eco-Restoration',
    icon: 'mdi-leaf',
    color: 'green',
    description:
      'Leading efforts to restore damaged ecosystems and rehabilitating injured wild Pokémon back into their homes.',
  },
  {
    title: 'Conflict Mediation',
    icon: 'mdi-account-group',
    color: 'green',
    description:
      'Acting as neutral parties to resolve territorial disputes between wild Pokémon and expanding human settlements.',
  },
]

function handleNodeClick({ node }: NodeMouseEvent) {
  selectedRank.value = node.data
}
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Pokémon Rangers"
      subtitle="Guardians of the wild and protectors of the natural balance between humans and Pokémon."
      icon="mdi-shield-nature"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap ga-2">
          <v-chip color="green-darken-2" variant="flat" size="small" class="font-mono text-caption">
            International Union
          </v-chip>
          <v-chip color="green-darken-2" variant="flat" size="small" class="font-mono text-caption">
            Nature Conservation
          </v-chip>
          <v-chip variant="outlined" size="small" class="font-mono text-caption">
            Independent Authority
          </v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200" class="py-10">
      <!-- Section 1: The Mission -->
      <WikiCard title="Overview" icon="mdi-earth" color="green">
        <p class="text-body-1 lh-relaxed text-high-emphasis">
          The <strong>Ranger Union</strong> is the governing organization that oversees the
          activities of Pokémon Rangers. A Pokémon Ranger is a specialized class of operative whose
          goals and methods define their unique relationship with Pokémon. Using the <strong>Capture Stylus</strong>,
          Rangers build temporary partnerships with wild Pokémon to clear obstacles, resolve crises, and protect natural habitats without traditional capture or coercion.
        </p>
      </WikiCard>

      <!-- Section 2: Primary Duties -->
      <WikiCard title="Duties" icon="mdi-format-list-checks" color="green" class="mt-10">
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          The responsibilities of a Ranger are extensive, centered around environmental protection and public safety:
        </p>
        <FeatureGrid :items="rangerRoles" :cols="2" default-color="green" />
      </WikiCard>

      <!-- Section 3: Progression & Hierarchy Flow -->
      <WikiCard title="Rank Progression" icon="mdi-medal-outline" color="green" class="mt-10">
        <p class="text-body-1 lh-relaxed mb-6 text-high-emphasis">
          Rangers gain experience by completing field assignments and official Union Quests.
          Advancement into higher tiers requires undertaking a <strong>Promotion Quest</strong> designed to evaluate tactical judgment, survival skills, and leadership under pressure.
        </p>

        <div class="text-overline text-medium-emphasis mb-3 d-flex align-center ga-2 font-mono">
          <v-icon size="14" color="green-darken-2">mdi-sitemap</v-icon>
          Ranger Ranks
        </div>

        <!-- VueFlow Interactive Hierarchy Container -->
        <div class="ranger-hierarchy mb-2">
          <div class="ranger-hierarchy__graph">
            <VueFlow
              :nodes="rangerNodes"
              :edges="rangerEdges"
              :fit-view-on-init="true"
              :fit-view-options="{ padding: 0.2, includeHiddenNodes: true }"
              :nodes-draggable="false"
              :pan-on-drag="false"
              :zoom-on-scroll="false"
              :prevent-scrolling="false"
              :elements-selectable="true"
              @node-click="handleNodeClick"
            >
              <template #node-ranger="props">
                <RangerRankNode v-bind="props" />
              </template>
            
              <template #node-track="props">
                <RangerTrackNode v-bind="props" />
              </template>
            </VueFlow>
          </div>

          <div class="ranger-hierarchy__info">
            <RangerInfoPanel :rank="selectedRank" />
          </div>
        </div>
      </WikiCard>

      <!-- Section 4: Recruitment CTA -->
      <WikiCard title="Career Rangers" icon="mdi-account-plus-outline" color="green" class="mt-10">
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-relaxed mb-0 text-high-emphasis">
              Ready to defend nature and maintain harmony between civilization and wild Pokémon?
              The Ranger Academy is accepting new recruits for the upcoming term.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-md-end text-center">
            <v-btn
              size="large"
              color="green-darken-2"
              variant="flat"
              prepend-icon="mdi-file-document-edit-outline"
              to="/sandbox/orgs/ranger-union/recruitment"
              class="font-mono font-weight-bold"
            >
              View Recruitment Info
            </v-btn>
          </v-col>
        </v-row>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.font-mono {
  font-family: 'JetBrains Mono', monospace, sans-serif;
}

.lh-relaxed {
  line-height: 1.75;
}

/* Ranger Hierarchy VueFlow Layout */
.ranger-hierarchy {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 20px;
  min-height: 720px;
}

.ranger-hierarchy__graph {
  min-width: 0;
  min-height: 720px;
  border-radius: 8px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  background: rgba(var(--v-theme-surface), 0.5);
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Change cursor from drag/grab to standard pointer */
:deep(.vue-flow__pane),
:deep(.vue-flow__node) {
  cursor: pointer !important;
}

.ranger-hierarchy__info {
  min-width: 0;
}

/* VueFlow Canvas Customization */
:deep(.vue-flow__viewport) {
  transform-origin: center;
}

:deep(.vue-flow__edge-path) {
  stroke: rgba(var(--v-theme-green-darken-2), 0.6);
  stroke-width: 2;
}

/* VueFlow Canvas & Edge Customization */
:deep(.vue-flow__viewport) {
  transform-origin: center;
}

/* Edge Lines */
:deep(.vue-flow__edge-path) {
  stroke: rgb(var(--v-theme-primary)) !important;
  stroke-width: 3px !important;
  stroke-opacity: 0.85 !important;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.25));
  transition: stroke 0.2s ease, stroke-width 0.2s ease;
}

/* Edge Hover / Selection States */
:deep(.vue-flow__edge:hover .vue-flow__edge-path),
:deep(.vue-flow__edge.selected .vue-flow__edge-path) {
  stroke: rgb(var(--v-theme-success)) !important;
  stroke-width: 4px !important;
  stroke-opacity: 1 !important;
}

/* Edge Markers (Arrows) */
:deep(.vue-flow__edge-marker) {
  fill: rgb(var(--v-theme-primary)) !important;
}

:deep(.vue-flow__edge:hover .vue-flow__edge-marker),
:deep(.vue-flow__edge.selected .vue-flow__edge-marker) {
  fill: rgb(var(--v-theme-success)) !important;
}

@media (max-width: 960px) {
  .ranger-hierarchy {
    grid-template-columns: 1fr;
  }

  .ranger-hierarchy__info {
    order: -1;
  }
}
</style>
