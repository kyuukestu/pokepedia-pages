<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const permitClasses = [
  {
    title: 'Class A (Heavy/Rough)',
    image: 'https://www.serebii.net/swordshield/pokemon/750.png', // Mudsdale
    color: 'amber',
    description:
      'Mastery of heavy-load and terrain-altering mounts like Mudsdale or Aggron. Required for mountain passes and desert crossings.',
  },
  {
    title: 'Class B (High-Speed)',
    image: 'https://www.serebii.net/swordshield/pokemon/059.png', // Volcarona (placeholder for Zebstrika/Arcanine)
    color: 'amber',
    description:
      'Standard for high-velocity mounts such as Arcanine or Zebstrika. Focuses on braking and collision avoidance at 60+ mph.',
  },
  {
    title: 'Class C (Commuter)',
    image: 'https://www.serebii.net/swordshield/pokemon/673.png', // Gogoat
    color: 'amber',
    description:
      'Light mounts like Gogoat or Deerling. Restricted to paved roads, flat grasslands, and designated urban parkways.',
  },
]

const steps = [
  {
    title: 'Application',
    icon: 'mdi-form-select',
    text: 'Submit TP application via TLA portal or at any major Land-Route Rest Stop.',
  },
  {
    title: 'Terrain School',
    icon: 'mdi-image-filter-hdr',
    text: 'Courses on soil stability, gradient management, and wild Pokémon right-of-way.',
  },
  {
    title: 'Field Drills',
    icon: 'mdi-run-fast',
    text: 'Logged hours focusing on mount stamina management and emergency stop techniques.',
  },
  {
    title: 'Certification',
    icon: 'mdi-license',
    text: 'Issuance of Digital TP and mount-ready identification harness.',
  },
]

const operationalGuidelines = [
  {
    title: 'Trail Compliance',
    description:
      'Stay on marked trails to prevent soil erosion and habitat destruction in protected nature reserves.',
    icon: 'mdi-sign-direction',
    color: 'green',
  },
  {
    title: 'Night Visibility',
    description:
      'Mounts must be equipped with luminous tack or reflective gear when operating on public roads after dusk.',
    icon: 'mdi-brightness-6',
    color: 'amber',
  },
  {
    title: 'Load Regulation',
    description:
      'Weight limits must be strictly followed based on mount species to prevent spinal injury and exhaustion.',
    icon: 'mdi-weight',
    color: 'red',
  },
  {
    title: 'Urban Etiquette',
    description:
      'Full stop required at all pedestrian crossings; mounts must be kept in "Low-Impact" gait within city limits.',
    icon: 'mdi-city',
    color: 'blue',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Terrestrial Permits (TP)"
      subtitle="The governing standard for land-based mount transit under the Terrestrial Licensing Authority."
      icon="mdi-terrain"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="amber-darken-4" variant="flat" size="small">Land Authority</v-chip>
          <v-chip color="brown-darken-1" variant="flat" size="small">Transit Code</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Terrestrial Classifications" icon="mdi-slope-uphill" class="amber-darken-4">
        <p class="text-body-1 lh-lg mb-6">
          The <strong>Terrestrial Licensing Authority (TLA)</strong> manages all non-aquatic,
          non-aerial movement. Unlike other permits, TP focuses heavily on
          <strong>Gait Control</strong> and <strong>Environmental Impact</strong> to ensure that
          heavy mounts do not damage infrastructure or fragile ecosystems.
        </p>
        <FeatureGrid :items="permitClasses" :cols="3" />
      </WikiCard>

      <v-row class="my-6">
        <v-col cols="12" md="6">
          <WikiCard title="Trainer Eligibility" icon="mdi-account-check" class="brown-darken-3">
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-identifier">
                <v-list-item-title>Valid Trainer ID</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-shoe-print">
                <v-list-item-title>Ground Navigation Cert</v-list-item-title>
                <v-list-item-subtitle>Basic map-reading and GPS operation</v-list-item-subtitle>
              </v-list-item>
              <v-list-item prepend-icon="mdi-medical-bag">
                <v-list-item-title>Mount First Aid</v-list-item-title>
                <v-list-item-subtitle
                  >Knowledge of Potion application for hoof/paw care</v-list-item-subtitle
                >
              </v-list-item>
            </v-list>
          </WikiCard>
        </v-col>
        <v-col cols="12" md="6">
          <WikiCard title="Mount Standards" icon="mdi-shield-check" class="grey-darken-3">
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-scaling-bathroom">
                <v-list-item-title>Weight-to-Rider Ratio</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-heart-flash">
                <v-list-item-title>Stamina Stress Test</v-list-item-title>
                <v-list-item-subtitle>Conducted at any TLA-authorized stable</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </WikiCard>
        </v-col>
      </v-row>

      <WikiCard title="Certification Pipeline" icon="mdi-walk" class="mb-6 amber-darken-4">
        <v-timeline side="end" align="start">
          <v-timeline-item
            v-for="(step, i) in steps"
            :key="i"
            dot-color="amber-darken-3"
            size="small"
          >
            <div class="d-flex flex-column">
              <strong class="text-subtitle-1">{{ step.title }}</strong>
              <span class="text-body-2 text-medium-emphasis">{{ step.text }}</span>
            </div>
          </v-timeline-item>
        </v-timeline>
      </WikiCard>

      <WikiCard
        title="Operational Guidelines"
        icon="mdi-clipboard-alert"
        class="dark-focus mt-6 grey-darken-4"
      >
        <FeatureGrid :items="operationalGuidelines" :cols="2" />
      </WikiCard>

      <div class="d-flex justify-center my-8">
        <v-btn
          prepend-icon="mdi-license"
          color="amber-darken-4"
          variant="elevated"
          size="large"
          to="/sandbox/trainer-101/permits"
          rounded="lg"
          elevation="4"
        >
          Return to Permit Hub
        </v-btn>
      </div>

      <WikiAlert type="warning" class="mt-8" icon="mdi-alert-circle">
        <strong>TERRAIN NOTICE:</strong> Off-road operation of Class-A mounts in
        <strong>Ecology Protection Zones</strong> (EPZs) without a Special Endorsement carries a
        fine of up to ₽10,000 and immediate permit suspension.
      </WikiAlert>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}
.dark-focus {
  background: linear-gradient(
    135deg,
    rgba(255, 193, 7, 0.05) 0%,
    rgba(0, 0, 0, 0.05) 100%
  ) !important;
  border: 1px solid rgba(255, 193, 7, 0.2) !important;
}
:deep(.feature-card) {
  border: 1px solid rgba(var(--v-theme-amber-darken-4), 0.15) !important;
  background-color: rgba(var(--v-theme-amber-darken-4), 0.02) !important;
}
</style>
