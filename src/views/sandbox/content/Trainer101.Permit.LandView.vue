<script setup lang="ts">
import PermitClassCard from '@/components/cards/PermitClassCard.vue'
import SectionWrapped from '@/components/SectionWrapped.vue'

const permitCards = [
  {
    title: 'Class A',
    subtitle: 'Advanced Permit',
    description: 'Heavy or Specialized Mounts: Rhydon, Mudsdale, Arcanine.',
    image: 'https://www.serebii.net/swordshield/pokemon/750.png',
  },
  {
    title: 'Class B',
    subtitle: 'Intermediate Permit',
    description: 'Mid-weight Mounts: Rapidash, Zebstrika, Leafeon.',
    image: 'https://www.serebii.net/swordshield/pokemon/637.png',
  },
  {
    title: 'Class C',
    subtitle: 'Beginner Permit',
    description: 'Light Mounts: Gogoat, Deerling, Ponyta.',
    image: 'https://www.serebii.net/swordshield/pokemon/673.png',
  },
]

const prerequisites = [
  { text: 'Valid Trainer ID', icon: 'mdi-identifier' },
  {
    text: 'Certified Ground Mount Pokémon',
    icon: 'mdi-paw',
    isExpanded: false,
    children: [
      { text: 'Fitness and Endurance Standards Met', icon: 'mdi-run' },
      { text: 'Temperament Approved for Passenger Use', icon: 'mdi-emoticon-outline' },
    ],
  },
  {
    text: 'No history of abuse or reckless riding violations',
    icon: 'mdi-alert-circle',
  },
  {
    text: 'Trainer Health Clearance',
    icon: 'mdi-hospital-box',
    isExpanded: false,
    children: [
      { text: 'Valid Medical Certificate (Renewed Biennially)', icon: 'mdi-hospital' },
      { text: 'Psych-Eval (Renewed Quinquennially)', icon: 'mdi-brain' },
    ],
  },
]

const steps = [
  {
    title: 'Application Submission',
    text: 'Submit GMOL application via PLGA portal or local Pokémon Center.',
    icon: 'mdi-file-upload',
  },
  {
    title: 'Ground Safety School',
    text: 'Courses in traffic laws, public safety, Pokémon handling, and route etiquette.',
    icon: 'mdi-school',
  },
  {
    title: 'Riding Hours Requirement',
    text: 'Complete supervised trail hours under certified instructors.',
    icon: 'mdi-horse-variant',
    isExpanded: false,
    children: [
      {
        title: 'Class A',
        text: '60 hours (incl. load-bearing, terrain training)',
        icon: 'mdi-clock',
      },
      { title: 'Class B', text: '30 hours (incl. traffic navigation)', icon: 'mdi-clock' },
      { title: 'Class C', text: '10 hours (basic certification)', icon: 'mdi-clock' },
    ],
  },
  {
    title: 'Examinations',
    text: 'Pass theoretical and practical tests (min. 80% score)',
    icon: 'mdi-clipboard-check',
  },
  {
    title: 'Registration and Certification',
    text: 'Digital GMOL issued, Pokémon registration in League Mount Registry.',
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
      { text: 'GMOLs are valid for 5 years; Pokémon require health evaluation every 2 years.' },
    ],
  },
  {
    title: 'Renewal',
    icon: 'mdi-autorenew',
    color: 'success',
    isExpanded: true,
    children: [
      { text: 'Short refresher on new regulations' },
      { text: 'Updated trainer and mount health clearances' },
    ],
  },
  {
    title: 'Suspension',
    icon: 'mdi-cancel',
    color: 'orange',
    isExpanded: true,
    children: [
      { text: 'Mount neglect or mistreatment' },
      { text: 'Endangering public safety (e.g. reckless riding)' },
      { text: 'Use under the influence' },
    ],
  },
  {
    title: 'Revocation',
    icon: 'mdi-close-thick',
    color: 'error',
    isExpanded: true,
    children: [
      { text: 'Repeat safety violations' },
      { text: 'Illegal racing or unauthorized use in restricted areas' },
      { text: 'Failure to re-certify after suspension' },
    ],
  },
]

const guidelines = [
  { text: 'Use only designated trails or roadways', icon: 'mdi-map-marker-path' },
  {
    text: 'Mount must wear visibility gear during low-light conditions',
    icon: 'mdi-weather-night',
  },
  { text: 'Maintain proper speed and spacing in shared spaces', icon: 'mdi-speedometer' },
  { text: 'Carry emergency contact and medical gear', icon: 'mdi-medical-bag' },
  { text: 'No riding under influence of substances', icon: 'mdi-glass-wine' },
  { text: 'Mount must have ID tag or embedded chip', icon: 'mdi-qrcode-scan' },
]

const provisions = [
  {
    title: 'Juvenile Riders',
    text: 'Ages 7–9 may acquire Limited Learner Permits for low-speed Pokémon (Class C only).',
    icon: 'mdi-human-child',
  },
  {
    title: 'Special Needs Riders',
    text: 'Modified tack and mounting aids available for qualified trainers.',
    icon: 'mdi-wheelchair-accessibility',
  },
]
</script>
<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col cols="12">
        <div class="text-h5 font-weight-bold mb-4">
          Guidelines for the Acquisition of Flying Mount Licensing Permits (FMOL)
        </div>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <v-alert type="info" variant="tonal" max-width="750">
      <v-row>
        <v-col cols="12">
          <div class="text-h5 font-weight-bold mb-4">Definitions</div>
          <div class="text-body-1 mb-2">
            <strong>"Flying Mount"</strong> refers to any living creature, Pokémon or otherwise,
            capable of carrying human passengers or cargo through the air.
          </div>
          <v-divider class="my-4" />
          <div class="text-body-1 mb-2">
            <strong>"Private Citizen"</strong> refers to any individual not operating a flying mount
            as part of a commercial, government, or military operation.
          </div>
          <v-divider class="my-4" />

          <div class="text-body-1 mb-2">
            <strong>"Flight Zone"</strong> refers to the airspace designated for the use of flying
            mounts, which is separate from airspace designated for conventional aircraft.
          </div>
        </v-col>
      </v-row>
    </v-alert>

    <!-- Section 1 -->
    <v-row>
      <v-col cols="12">
        <SectionWrapped title="Section 1" subtitle="Purpose and Scope">
          <div class="text-body-1 mb-2">
            This document outlines the procedures, requirements, and expectations for individuals
            seeking to obtain an
            <strong>Aviation Permit (AP)</strong> under the authority of the
            <strong>Pokémon League Aviation Authority (PLAA)</strong>.
          </div>
          <div class="text-body-1 mb-2">
            These guidelines apply to all <strong>Private Citizens</strong> who hold a
            <strong>Trainer ID</strong> and to other categories of applicants seeking certification
            for non-commercial, civil aviation using Pokémon.
          </div>
        </SectionWrapped>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Section 2 -->
    <v-row>
      <v-col cols="12">
        <SectionWrapped title="Section 2" subtitle="License Classification">
          <v-container
            fluid
            class="Btn-Container mx-auto d-flex flex-row flex-wrap pl-5 pr-5"
            height="fit-content"
          >
            <PermitClassCard
              v-for="(permit, i) in permitCards"
              :key="i"
              :title="permit.title"
              :subtitle="permit.subtitle"
              :description="permit.description"
              :image="permit.image"
            />
          </v-container>
          <v-alert type="error" variant="tonal" title="Move this to Licence Classifications Page">
            <div class="text-body-1 mb-2">
              Special Endorsements (e.g., <em>Cargo Transport</em>,
              <em>Weather Hazard Operation</em>, or <em>Aerial Rescue</em>) may be added after
              additional specialized training.
            </div>
            <div class="text-body-1">
              <a href="trainers101.aviation-permit.classifications.md" target="_blank"
                >AV License Classification</a
              >
            </div>
          </v-alert>
        </SectionWrapped>
      </v-col>
    </v-row>

    <!-- Section 3 -->
    <v-row>
      <v-col cols="12">
        <SectionWrapped title="Section 3" subtitle="Eligibility Criteria">
          <div class="text-subtitle-1 font-weight-medium mb-1">Age Requirements</div>

          <li>Minimum age of <strong>ten (10)</strong> for Class C License</li>
          <li>Minimum age of <strong>twelve (12) </strong> for Class A License</li>

          <div class="text-subtitle-1 font-weight-medium mt-4 mb-1">Prerequisites</div>
          <v-list density="compact" nav>
            <template v-for="(item, i) in prerequisites" :key="i">
              <v-list-group v-if="item.children" v-model="item.isExpanded">
                <template #activator="{ props }">
                  <v-list-item v-bind="props" :prepend-icon="item.icon">
                    {{ item.text }}
                  </v-list-item>
                </template>

                <v-list-item
                  v-for="(child, j) in item.children"
                  :key="`child-${i}-${j}`"
                  :prepend-icon="child.icon"
                >
                  {{ child.text }}
                </v-list-item>
              </v-list-group>

              <v-list-item v-else :prepend-icon="item.icon">
                {{ item.text }}
              </v-list-item>
            </template>
          </v-list>
        </SectionWrapped>
      </v-col>
    </v-row>

    <!-- Section 4 -->
    <v-row>
      <v-col cols="12">
        <SectionWrapped title="Section 4" subtitle="Licensing Process">
          <v-list density="compact" nav>
            <template v-for="(step, i) in steps" :key="i">
              <v-list-group v-if="step.children" v-model="step.isExpanded">
                <template #activator="{ props }">
                  <v-list-item v-bind="props" :prepend-icon="step.icon" :title="step.title">
                    {{ step.text }}
                  </v-list-item>
                </template>

                <v-list-item
                  v-for="(child, j) in step.children"
                  :key="`child-${i}-${j}`"
                  :prepend-icon="child.icon"
                  :title="child.title"
                >
                  {{ child.text }}
                </v-list-item>
              </v-list-group>

              <v-list-item v-else :prepend-icon="step.icon" :title="step.title">
                {{ step.text }}
              </v-list-item>
            </template>
          </v-list>
        </SectionWrapped>
      </v-col>
    </v-row>

    <!-- Section 5 -->
    <v-row>
      <v-col cols="12">
        <SectionWrapped title="Section 5" subtitle="License Validity, Renewal, and Revocation">
          <v-list density="compact" nav>
            <template v-for="(tenet, i) in tenets" :key="i">
              <v-list-group v-if="tenet.children" v-model="tenet.isExpanded">
                <template #activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    :prepend-icon="tenet.icon"
                    :title="tenet.title"
                    :color="tenet.color"
                  >
                  </v-list-item>
                </template>

                <v-list-item v-for="(child, j) in tenet.children" :key="`child-${i}-${j}`">
                  {{ child.text }}
                </v-list-item>
              </v-list-group>

              <v-list-item
                v-else
                :prepend-icon="tenet.icon"
                :title="tenet.title"
                :color="tenet.color"
              >
              </v-list-item>
            </template>
          </v-list>
        </SectionWrapped>
      </v-col>
    </v-row>

    <!-- Section 6 -->
    <v-row>
      <v-col cols="12">
        <SectionWrapped title="Section 6" subtitle="Guidelines for Operations">
          <v-list density="compact" nav v-for="(guideline, i) in guidelines" :key="i">
            <v-list-item :prepend-icon="guideline.icon">{{ guideline.text }}</v-list-item>
          </v-list>
        </SectionWrapped>
      </v-col>
    </v-row>

    <!-- Section 7 -->
    <v-row>
      <v-col cols="12">
        <SectionWrapped title="Section 7" subtitle="Special Provisions">
          <v-list density="compact" nav v-for="(provision, i) in provisions" :key="i">
            <v-list-item :prepend-icon="provision.icon" :title="provision.title">{{
              provision.text
            }}</v-list-item>
          </v-list>
        </SectionWrapped>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
ul {
  padding-left: 1.5rem;
}

.Btn-Container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  max-width: 950px;
  height: 300px;
}
</style>
