<script setup lang="ts">
const permitCards = [
  {
    title: 'Class A',
    subtitle: 'Advanced Permit',
    description: 'Expert: Rangers, S.E.R.E.',
    image:
      'https://static.pokemonpets.com/images/monsters-images-800-800/2398-Shiny-Staraptor.webp',
  },
  {
    title: 'Class B',
    subtitle: 'Intermediate Permit',
    description: 'Advanced: Aces, Sky Trainers.',
    image: 'https://www.pngplay.com/wp-content/uploads/12/Staravia-Pokemon-Download-Free-PNG.png',
  },
  {
    title: 'Class C',
    subtitle: 'Beginner Permit',
    description: 'Standard: Typical Trainer.',
    image: 'https://static.wikia.nocookie.net/legendsofthemultiuniverse/images/a/a1/396-Starly.png',
  },
]

const prerequisites = [
  { text: 'Valid Trainer ID', icon: 'mdi-identifier' },
  {
    text: 'Flight Certified Pokémon',
    icon: 'mdi-feather',
    isExpanded: false,
    children: [
      { text: 'Pokémon meets fitness standards', icon: 'mdi-google-fit' },
      { text: 'Pokémon satisfies temperament requirements', icon: 'mdi-emoticon-outline' },
    ],
  },
  {
    text: 'No outstanding flight-related infractions or Pokémon abuse charges',
    icon: 'mdi-account-alert',
  },
  {
    text: 'Trainer Health Clearance',
    icon: 'mdi-hospital-box',
    isExpanded: false,
    children: [
      { text: 'Valid Medical Certificate (Renewed Biennally)', icon: 'mdi-hospital-box' },
      { text: 'Psych-Eval (Renewed Quinquennially)', icon: 'mdi-brain' },
    ],
  },
]

const steps = [
  {
    title: 'Application Submission',
    text: 'Submit FMOL application via HPLAA portal or authorized Pokémon Center.',
    icon: 'mdi-file-upload',
  },
  {
    title: 'Ground School',
    text: 'Complete courses on airspace law, safety protocols, Pokémon care, radio and IFF operation.',
    icon: 'mdi-school',
  },
  {
    title: 'Practical Flight Training',
    text: 'Satisfy a minimum number of hours spent in the air',
    icon: 'mdi-feather',
    isExpanded: false,
    children: [
      {
        title: 'Class A',
        text: '50 hours (incl. solo, weather drills)',
        icon: 'mdi-feather',
      },
      {
        title: 'Class B',
        text: '25 hours (incl. solo, weather drills)',
        icon: 'mdi-feather',
      },
      {
        title: 'Class C',
        text: '10 hours minimum',
        icon: 'mdi-feather',
      },
    ],
  },
  {
    title: 'Examinations',
    text: '80% passing score, Assessed by HPLAA Flight Examiner',
    icon: 'mdi-account-check',
  },
  {
    title: 'Registration and Certification',
    text: 'Digital FMOL, Pokémon transponder ID, and registry upload.',
    icon: 'mdi-certificate',
  },
]

const tenets = [
  {
    title: 'Validity',
    icon: 'mdi-check-underline',
    color: 'info',
    isExpanded: true,
    children: [
      {
        text: 'FMOLs are valid for 4 years.',
      },
      {
        text: 'Pokémon require health evaluations every 2 years.',
      },
    ],
  },
  {
    title: 'Renewal',
    icon: 'mdi-autorenew',
    color: 'success',
    isExpanded: true,
    children: [
      {
        text: 'Refresher course on laws and safety',
      },
      {
        text: 'Submit updated health clearances',
      },
      {
        text: 'Simplified flight check if inactive over 2 years',
      },
    ],
  },
  {
    title: 'Suspension',
    icon: 'mdi-cancel',
    color: 'orange',
    isExpanded: true,
    children: [
      {
        text: 'Violation of airspace or safety laws',
      },
      {
        text: 'Neglect or harm to flying mount',
      },
      {
        text: 'Flying under influence',
      },
    ],
  },
  {
    title: 'Revocation',
    icon: 'mdi-close-thick',
    color: 'error',
    isExpanded: true,
    children: [
      {
        text: 'Repeated violation of airspace or safety laws',
      },
      {
        text: 'Repeated Neglect or harm to flying mount',
      },
      {
        text: 'Repeated Flying under influence',
      },
      {
        text: 'Repeated ATC complaints',
      },
    ],
  },
]

const guidelines = [
  {
    text: 'Operate only in designated flight zones',
    icon: 'mdi-map-marker',
    color: 'primary',
  },
  {
    text: 'Equip mounts with night-time lighting',
    icon: 'mdi-weather-night',
    color: 'indigo',
  },
  {
    text: 'Use radio and IFF equipment',
    icon: 'mdi-radio-tower',
    color: 'teal',
  },
  {
    text: 'Follow ATC instructions',
    icon: 'mdi-airplane',
    color: 'blue',
  },
  {
    text: 'No operation under influence',
    icon: 'mdi-liquor',
    color: 'red',
  },
  {
    text: 'Carry first-aid, comms, emergency gear',
    icon: 'mdi-hospital-box',
    color: 'green',
  },
  {
    text: 'Mounts must broadcast unique ID during flight',
    icon: 'mdi-broadcast',
    color: 'orange',
  },
]

const provisions = [
  {
    title: 'Juvenile Operators',
    text: 'Children aged 8-10 may apply for a Limited Learner Permit under supervision and distance/altitude limits.',
    icon: 'mdi-human-male-child',
  },
  {
    title: 'Trainers or Pokémon with Special Needs',
    text: 'Custom accommodations for physical, sensory, or medical needs can be requested.',
    icon: 'mdi-human-wheelchair',
  },
]
</script>

<template>
  <v-container class="pa-6" fluid>
    <!-- Hero Header -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card class="pa-8 text-center" elevation="8" rounded="xl" color="primary" variant="flat">
          <v-icon size="80" color="white" class="mb-4">mdi-airplane-takeoff</v-icon>
          <h1 class="text-h3 font-weight-bold text-white mb-2">Flying Mount Licensing Permits</h1>
          <p class="text-h5 text-blue-lighten-4 mb-0">Guidelines for Acquisition (FMOL)</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Definitions Section -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card class="pa-6" elevation="4" rounded="lg">
          <v-card-title class="text-h4 font-weight-bold mb-6 d-flex align-center">
            <v-icon color="info" size="large" class="mr-3">mdi-book-open-page-variant</v-icon>
            Key Definitions
          </v-card-title>

          <v-row>
            <v-col cols="12" md="4">
              <v-card variant="tonal" color="primary" class="pa-5 h-100" elevation="2">
                <div class="d-flex align-center mb-3">
                  <v-icon color="primary" size="large" class="mr-3">mdi-dragon</v-icon>
                  <h3 class="text-h6 font-weight-bold">Flying Mount</h3>
                </div>
                <p class="text-body-1 mb-0">
                  Any living creature, Pokémon or otherwise, capable of carrying human passengers or
                  cargo through the air.
                </p>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card variant="tonal" color="secondary" class="pa-5 h-100" elevation="2">
                <div class="d-flex align-center mb-3">
                  <v-icon color="secondary" size="large" class="mr-3">mdi-account</v-icon>
                  <h3 class="text-h6 font-weight-bold">Private Citizen</h3>
                </div>
                <p class="text-body-1 mb-0">
                  Any individual not operating a flying mount as part of a commercial, government,
                  or military operation.
                </p>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card variant="tonal" color="accent" class="pa-5 h-100" elevation="2">
                <div class="d-flex align-center mb-3">
                  <v-icon color="accent" size="large" class="mr-3">mdi-map-marker-radius</v-icon>
                  <h3 class="text-h6 font-weight-bold">Flight Zone</h3>
                </div>
                <p class="text-body-1 mb-0">
                  Airspace designated for flying mounts; categorized by wild-pokemon danger level
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Section 1: Purpose and Scope -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <v-card-title class="text-h4 font-weight-bold mb-4 d-flex align-center">
            <v-icon color="primary" size="large" class="mr-3">mdi-target</v-icon>
            Section 1: Purpose and Scope
          </v-card-title>

          <v-card-text class="pa-0">
            <div class="text-body-1 mb-4 text-high-emphasis">
              This document outlines the procedures, requirements, and expectations for individuals
              seeking to obtain an
              <v-chip color="primary" variant="outlined" size="small" class="mx-1"
                >Aviation Permit (AP)</v-chip
              >
              under the authority of the
              <v-chip color="secondary" variant="outlined" size="small" class="mx-1"
                >Pokémon League Aviation Authority (PLAA)</v-chip
              >.
            </div>
            <div class="text-body-1 text-medium-emphasis">
              These guidelines apply to all <strong>Private Citizens</strong> who hold a
              <strong>Trainer ID</strong> and to other categories of applicants seeking
              certification for non-commercial, civil aviation using Pokémon.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Section 2: License Classification -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <v-card-title class="text-h4 font-weight-bold mb-6 d-flex align-center">
            <v-icon color="primary" size="large" class="mr-3">mdi-certificate</v-icon>
            Section 2: License Classification
          </v-card-title>

          <v-row class="mb-6">
            <v-col v-for="(permit, i) in permitCards" :key="i" cols="12" md="4">
              <PermitClassCard
                :title="permit.title"
                :subtitle="permit.subtitle"
                :description="permit.description"
                :image="permit.image"
              />
            </v-col>
          </v-row>

          <v-alert type="warning" variant="tonal" prominent border="start" class="mt-4">
            <template #title>
              <span class="font-weight-bold">Special Endorsements Available</span>
            </template>

            <div class="text-body-1 mb-3">
              Additional endorsements such as <em>Cargo Transport</em>,
              <em>Weather Hazard Operation</em>, or <em>Aerial Rescue</em> may be added after
              specialized training.
            </div>

            <v-btn
              variant="outlined"
              color="warning"
              prepend-icon="mdi-open-in-new"
              href="trainers101.aviation-permit.classifications.md"
              target="_blank"
            >
              View Full Classification Details
            </v-btn>
          </v-alert>
        </v-card>
      </v-col>
    </v-row>

    <!-- Section 3: Eligibility Criteria -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <v-card-title class="text-h4 font-weight-bold mb-6 d-flex align-center">
            <v-icon color="primary" size="large" class="mr-3">mdi-account-check</v-icon>
            Section 3: Eligibility Criteria
          </v-card-title>

          <v-row>
            <v-col cols="12" lg="5">
              <v-card variant="outlined" class="pa-5 h-100" elevation="1">
                <v-card-title class="text-h6 pb-3 d-flex align-center">
                  <v-icon color="success" class="mr-2">mdi-cake-variant</v-icon>
                  Age Requirements
                </v-card-title>

                <v-list class="bg-transparent">
                  <v-list-item class="px-0">
                    <template #prepend>
                      <v-avatar color="success" size="small">
                        <span class="text-white font-weight-bold">10</span>
                      </v-avatar>
                    </template>
                    <v-list-item-title class="ml-3">
                      Minimum age of <strong>ten (10)</strong> for Class C License
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item class="px-0">
                    <template #prepend>
                      <v-avatar color="primary" size="small">
                        <span class="text-white font-weight-bold">12</span>
                      </v-avatar>
                    </template>
                    <v-list-item-title class="ml-3">
                      Minimum age of <strong>twelve (12)</strong> for Class A License
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

            <v-col cols="12" lg="7">
              <v-card variant="outlined" class="pa-5 h-100" elevation="1">
                <v-card-title class="text-h6 pb-3 d-flex align-center">
                  <v-icon color="warning" class="mr-2">mdi-clipboard-check</v-icon>
                  Prerequisites
                </v-card-title>

                <v-expansion-panels variant="accordion" class="bg-transparent d-flex justify-start">
                  <template v-for="(item, i) in prerequisites" :key="i">
                    <v-expansion-panel v-if="item.children">
                      <v-expansion-panel-title>
                        <div class="d-flex align-start">
                          <v-icon :icon="item.icon" class="mr-3"></v-icon>
                          {{ item.text }}
                        </div>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-list density="compact" class="bg-transparent">
                          <v-list-item
                            v-for="(child, j) in item.children"
                            :key="`child-${i}-${j}`"
                            :prepend-icon="child.icon"
                            class="pl-8"
                          >
                            {{ child.text }}
                          </v-list-item>
                        </v-list>
                      </v-expansion-panel-text>
                    </v-expansion-panel>

                    <v-list-item v-else :prepend-icon="item.icon" class="mb-2">
                      {{ item.text }}
                    </v-list-item>
                  </template>
                </v-expansion-panels>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Section 4: Licensing Process -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <v-card-title class="text-h4 font-weight-bold mb-6 d-flex align-center">
            <v-icon color="primary" size="large" class="mr-3">mdi-progress-check</v-icon>
            Section 4: Licensing Process
          </v-card-title>

          <v-timeline side="end" class="pa-4">
            <v-timeline-item
              v-for="(step, i) in steps"
              :key="i"
              :dot-color="i === 0 ? 'primary' : 'grey-lighten-2'"
              size="large"
            >
              <template #icon>
                <v-icon :icon="step.icon" size="small"></v-icon>
              </template>

              <v-card variant="outlined" class="pa-4" elevation="2">
                <v-card-title class="text-h6 font-weight-bold pb-2">
                  Step {{ i + 1 }}: {{ step.title }}
                </v-card-title>
                <v-card-text class="pa-0 mb-3">
                  {{ step.text }}
                </v-card-text>

                <div v-if="step.children">
                  <v-divider class="my-3"></v-divider>
                  <v-card variant="tonal" color="grey-lighten-4" class="pa-3">
                    <v-card-subtitle class="font-weight-bold pb-2"
                      >Training Hours by Class:</v-card-subtitle
                    >
                    <v-row>
                      <v-col
                        v-for="(child, j) in step.children"
                        :key="`child-${i}-${j}`"
                        cols="12"
                        sm="4"
                      >
                        <v-icon start :icon="child.icon"></v-icon>
                        <strong>{{ child.title }}:</strong>

                        <v-card-text>{{ child.text }}</v-card-text>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-col>
    </v-row>

    <!-- Section 5: License Validity, Renewal, and Revocation -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <v-card-title class="text-h4 font-weight-bold mb-6 d-flex align-center">
            <v-icon color="primary" size="large" class="mr-3">mdi-file-document-multiple</v-icon>
            Section 5: License Validity, Renewal, and Revocation
          </v-card-title>

          <v-row>
            <v-col v-for="(tenet, i) in tenets" :key="i" cols="12" sm="6" md="3">
              <v-card variant="tonal" :color="tenet.color" class="pa-4 h-100" elevation="3">
                <v-card-title class="text-h6 pb-3 d-flex align-center">
                  <v-icon :color="tenet.color" class="mr-2" size="large">{{ tenet.icon }}</v-icon>
                  {{ tenet.title }}
                </v-card-title>

                <v-list density="compact" class="bg-transparent">
                  <v-list-item
                    v-for="(child, j) in tenet.children"
                    :key="`child-${i}-${j}`"
                    class="px-0 py-1"
                  >
                    <template #prepend>
                      <v-icon size="small" :color="tenet.color">mdi-circle-small</v-icon>
                    </template>
                    <span class="text-body-2">
                      {{ child.text }}
                    </span>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Section 6: Guidelines for Operations -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <v-card-title class="text-h4 font-weight-bold mb-6 d-flex align-center">
            <v-icon color="primary" size="large" class="mr-3">mdi-list-status</v-icon>
            Section 6: Guidelines for Operations
          </v-card-title>

          <v-row>
            <v-col v-for="(guideline, i) in guidelines" :key="i" cols="12" sm="6" lg="4">
              <v-card
                variant="outlined"
                class="pa-4 h-100 hover-card"
                elevation="1"
                :color="guideline.color"
              >
                <div class="d-flex align-center">
                  <v-avatar :color="guideline.color" size="large" class="mr-4">
                    <v-icon color="white" :icon="guideline.icon"></v-icon>
                  </v-avatar>
                  <div class="flex-grow-1">
                    <p class="text-body-1 mb-0 font-weight-medium">
                      {{ guideline.text }}
                    </p>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Section 7: Special Provisions -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card class="pa-6" elevation="3" rounded="lg">
          <v-card-title class="text-h4 font-weight-bold mb-6 d-flex align-center">
            <v-icon color="primary" size="large" class="mr-3">mdi-star-circle</v-icon>
            Section 7: Special Provisions
          </v-card-title>

          <v-row>
            <v-col v-for="(provision, i) in provisions" :key="i" cols="12" md="6">
              <v-card variant="tonal" color="secondary" class="pa-5 h-100" elevation="2">
                <v-card-title class="text-h6 pb-3 d-flex align-center">
                  <v-icon color="secondary" class="mr-3" size="large">{{ provision.icon }}</v-icon>
                  {{ provision.title }}
                </v-card-title>
                <v-card-text class="pa-0 text-body-1">
                  {{ provision.text }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Footer -->
    <v-row>
      <v-col cols="12">
        <v-card class="pa-6 text-center" variant="tonal" color="grey-lighten-4" elevation="2">
          <v-icon color="primary" size="60" class="mb-3">mdi-shield-airplane</v-icon>
          <h3 class="text-h6 font-weight-bold mb-2">Pokémon League Aviation Authority (PLAA)</h3>
          <p class="text-body-2 text-medium-emphasis mb-0">
            Ensuring Safe Skies for Trainers and Their Flying Partners
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.hover-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.hover-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.12),
    0 4px 8px rgba(0, 0, 0, 0.08) !important;
}

ul {
  padding-left: 1.5rem;
}
</style>
