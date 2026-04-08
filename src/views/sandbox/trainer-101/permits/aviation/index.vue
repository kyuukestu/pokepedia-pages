<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'
import starly from '@/assets/396-Starly.webp'
import staravia from '@/assets/397-Staravia.png'
import staraptor from '@/assets/398-Staraptor.webp'

const permitClasses = [
  {
    title: 'Class A (Elite)',
    image: staraptor,
    color: 'indigo-darken-3',
    description:
      'Advanced permit for Rangers, S.E.R.E. specialists, and competitive Sky Trainers. Requires 50+ flight hours.',
  },
  {
    title: 'Class B (Inter)',
    image: staravia,
    color: 'indigo-darken-1',
    description:
      'Standard for Battle Frontier Aces and commercial couriers. Requires 25 flight hours and solo weather drills.',
  },
  {
    title: 'Class C (Basic)',
    image: starly,
    color: 'blue-darken-1',
    description:
      'The standard civilian license for typical trainers. Requires 10 minimum flight hours and basic safety certs.',
  },
]

const steps = [
  {
    title: 'Application',
    icon: 'mdi-file-upload',
    text: 'Submit FMOL application via AAA portal or authorized Pokémon Center.',
  },
  {
    title: 'Ground School',
    icon: 'mdi-school',
    text: 'Complete courses on airspace law, Beacon operation, and Pokémon physiological care.',
  },
  {
    title: 'Flight Drills',
    icon: 'mdi-feather',
    text: 'Satisfy minimum air hours based on class (10h, 25h, or 50h).',
  },
  {
    title: 'Examination',
    icon: 'mdi-account-check',
    text: '80% passing score assessed by an AAA-certified Flight Examiner.',
  },
  {
    title: 'Registration',
    icon: 'mdi-certificate',
    text: 'Digital permit issuance and transponder ID registry upload.',
  },
]

const maintenanceRules = [
  { text: 'FMOL validity: 4 Years', icon: 'mdi-calendar-clock' },
  { text: 'Health Evals: 2 Years', icon: 'mdi-heart-pulse' },
  { text: 'Psych-Eval: 5 Years', icon: 'mdi-brain' },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Flying Mount Licensing (FMOL)"
      subtitle="The International Standard for Aviation Permits (AP) under the Aviation Authority Alliance."
      icon="mdi-badge-account-horizontal"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="indigo-darken-2" variant="flat" size="small">Civil Certification</v-chip>
          <v-chip color="blue-darken-1" variant="flat" size="small">Flight Safety Code</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Permit Classifications" icon="mdi-layers-triple" class="indigo-darken-2">
        <p class="text-body-1 lh-lg mb-6">
          The AAA categorizes licenses based on the complexity of the mount and the environmental
          hazards of the flight zone. Obtaining a higher-tier permit grants access to restricted
          airspace and high-velocity flight corridors.
        </p>
        <FeatureGrid :items="permitClasses" :cols="3" />
      </WikiCard>

      <v-row class="my-6">
        <v-col cols="12" md="6">
          <WikiCard title="Eligibility Criteria" icon="mdi-account-check" class="blue-darken-3">
            <v-list density="compact" bg-color="transparent">
              <v-list-item prepend-icon="mdi-identifier">
                <v-list-item-title>Valid Trainer ID</v-list-item-title>
                <v-list-item-subtitle
                  >Must be in good standing with the League</v-list-item-subtitle
                >
              </v-list-item>
              <v-list-item prepend-icon="mdi-cake-variant">
                <v-list-item-title>Age: 10+ (Class C) / 12+ (Class A)</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-emoticon-outline">
                <v-list-item-title>Mount Temperament Clearance</v-list-item-title>
              </v-list-item>
            </v-list>
          </WikiCard>
        </v-col>
        <v-col cols="12" md="6">
          <WikiCard title="Health & Maintenance" icon="mdi-hospital-box" class="indigo-darken-2">
            <v-list density="compact" bg-color="transparent">
              <v-list-item
                v-for="rule in maintenanceRules"
                :key="rule.text"
                :prepend-icon="rule.icon"
              >
                {{ rule.text }}
              </v-list-item>
            </v-list>
            <v-divider class="my-2" />
            <p class="text-caption px-4">
              Biennial medical certificates are mandatory for all Class A/B operators.
            </p>
          </WikiCard>
        </v-col>
      </v-row>

      <WikiCard
        title="The Certification Pipeline"
        icon="mdi-sign-direction"
        class="mb-6 indigo-darken-2"
      >
        <v-timeline side="end" align="start">
          <v-timeline-item
            v-for="(step, i) in steps"
            :key="i"
            dot-color="indigo-darken-2"
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
        icon="mdi-clipboard-list"
        class="dark-focus blue-grey-darken-4"
      >
        <v-row>
          <v-col cols="12" md="7">
            <ul class="text-body-1 lh-lg mt-2">
              <li>
                <strong>Beacon Active:</strong> Mounts must broadcast unique transponder IDs at all
                times.
              </li>
              <li>
                <strong>Zone Compliance:</strong> Operatate only in designated flight corridors.
              </li>
              <li>
                <strong>Night Gear:</strong> Mounts must be equipped with approved signaling lights.
              </li>
              <li>
                <strong>Zero Tolerance:</strong> No operation under the influence of mind-altering
                substances.
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="5" class="d-flex justify-center align-center">
            <v-icon size="120" color="indigo-lighten-4" class="opacity-30"
              >mdi-shield-airplane</v-icon
            >
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCallout label="Violation Protocols" icon="mdi-alert-octagon" class="mt-6 red-darken-3">
        Failure to follow ATC instructions or neglect of a flying mount leads to immediate
        <strong>Suspension</strong>. Repeated violations or flying in restricted military airspace
        result in permanent <strong>Revocation</strong> of all AAA permits.
      </WikiCallout>
      <div class="d-flex justify-center my-8">
        <v-btn
          prepend-icon="mdi-license"
          color="blue-darken-1"
          variant="elevated"
          size="large"
          to="/sandbox/trainer-101/permits"
          rounded="lg"
          elevation="4"
        >
          Return to Permit Hub
        </v-btn>
      </div>
      <WikiAlert type="info" border="start" class="mt-8">
        <strong>SPECIAL PROVISIONS:</strong> Children aged 8-10 may apply for
        <strong>Limited Learner Permits</strong>
        for low-altitude flight under the direct supervision of (at least) a Class-B holder.
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
    rgba(26, 35, 126, 0.05) 0%,
    rgba(0, 0, 0, 0.05) 100%
  ) !important;
  border: 1px solid rgba(63, 81, 181, 0.2) !important;
}
:deep(.feature-card) {
  border: 1px solid rgba(var(--v-theme-indigo-darken-2), 0.2) !important;
  background-color: rgba(var(--v-theme-indigo-darken-2), 0.02) !important;
}
</style>
