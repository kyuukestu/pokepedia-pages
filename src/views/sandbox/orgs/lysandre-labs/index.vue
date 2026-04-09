<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'

const labInitiatives = [
  {
    title: 'Holocaster Network',
    icon: 'mdi-video-wireless',
    color: 'amber-darken-2',
    description:
      'The global standard in 3D holographic communication. Currently being updated to include DexNav-style environmental scanning.',
  },
  {
    title: 'Infinite Energy Storage',
    icon: 'mdi-battery-charging-100',
    color: 'amber-darken-2',
    description:
      'Repurposing Team Flare’s energy tech to power the Lumiose City grid sustainably without Pokémon life-force extraction.',
  },
  {
    title: 'Mega Evolution Study',
    icon: 'mdi-dna',
    color: 'amber-darken-2',
    description:
      'A collaborative effort with the Professor to map the resonance between Key Stones and Mega Stones.',
  },
  {
    title: 'Urban Connectivity',
    icon: 'mdi-city-variant',
    color: 'amber-darken-2',
    description:
      'Integrating the city’s underground plazas and transit systems with real-time holographic data feeds.',
  },
]

const historicalNotes = [
  {
    title: 'The Underground Labs',
    icon: 'mdi-layers-triple-outline',
    color: 'red-darken-4',
    description:
      'The sprawling subsurface levels once housed the Ultimate Weapon’s control systems. These levels are now sealed or converted into high-security data vaults.',
  },
  {
    title: 'Lysandre’s Research',
    icon: 'mdi-brain',
    color: 'red-darken-4',
    description:
      'While his motives were catastrophic, Lysandre’s breakthroughs in long-distance holographic projection remain the foundation of modern Kalosian tech.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Lysandre Labs"
      subtitle="The nexus of Kalosian innovation, pioneering holographic communication and advanced urban energy solutions."
      icon="mdi-microscope"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="amber-darken-2" variant="flat" size="small">Holocaster HQ</v-chip>
          <v-chip color="blue-grey-darken-3" variant="flat" size="small">Civil Engineering</v-chip>
          <v-chip variant="outlined" size="small">Location: Lumiose City (North Boulevard)</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Holographic Revolution" icon="mdi-orbit" class="amber-darken-2">
        <p class="text-body-1 lh-lg mb-6">
          <strong>Lysandre Labs</strong> is the birthplace of the <strong>Holocaster</strong>, the
          device that redefined communication in the Kalos region. Originally patented by Lysandre
          himself, the device utilizes a proprietary frequency to project life-sized, real-time 3D
          images. Following the reorganization of the labs, the Holocaster has been updated with
          <strong>Nouveau Flare</strong> security protocols to prevent the mass-surveillance
          exploits of the past.
        </p>
        <FeatureGrid :items="labInitiatives" :cols="2" />
      </WikiCard>

      <WikiCard
        title="From Weaponry to Utility"
        icon="mdi-atom"
        class="my-6 tech-focus blue-grey-darken-4"
      >
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg mb-4">
              The labs were built on the cutting edge of <strong>Infinite Energy</strong> research.
              While this research was once used to power the Ultimate Weapon, current lab directives
              focus on "Clean Reversion"—extracting energy from natural geological heat and solar
              radiation to provide Lumiose with near-limitless power without harming Pokémon.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="140" class="amber-darken-2">mdi-access-point-network</v-icon>
            <div class="text-caption mt-2 text-medium-emphasis">Main Holocaster Relay Station</div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard title="Legacy Systems" icon="mdi-archive-outline" class="red-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          Underneath the gleaming office floors of the North Boulevard facility lie the remnants of
          the old Flare regime. While the labs have been "sanitized," International Police still
          maintain a small presence to monitor the
          <strong>Five Scientists'</strong> encrypted data remnants.
        </p>
        <FeatureGrid :items="historicalNotes" :cols="2" />
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.tech-focus {
  background: linear-gradient(
    135deg,
    rgba(255, 193, 7, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  ) !important;
  border-left: 4px solid #ffb300 !important;
}

:deep(.feature-card) {
  border-style: solid !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-amber-darken-2), 0.02);
  border-color: rgba(var(--v-theme-amber-darken-2), 0.2) !important;
}
</style>
