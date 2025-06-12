<script setup lang="ts">
import PermitClassCard from '@/components/PermitClassCard.vue'
import SectionWrapped from '@/components/SectionWrapped.vue'

const permitCards = [
  {
    title: 'Class A',
    subtitle: 'Advanced Permit',
    description: 'This is a description.',
    image:
      'https://static.pokemonpets.com/images/monsters-images-800-800/2398-Shiny-Staraptor.webp',
    isVisible: false,
    expandDescription: 'This is a description.',
  },
  {
    title: 'Class B',
    subtitle: 'Intermediate Permit',
    description: 'Middle Permit',
    image: 'https://www.pngplay.com/wp-content/uploads/12/Staravia-Pokemon-Download-Free-PNG.png',
  },
  {
    title: 'Class C',
    subtitle: 'Beginner Permit',
    description: 'Standard permit.',
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
    icon: 'mdi-account-cog',
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
        text: 'FMOLs are valid for 4 years; Pokémon require health evaluations every 2 years.',
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
  },
  {
    text: 'Equip mounts with night-time lighting',
    icon: 'mdi-weather-night',
  },
  {
    text: 'Use radio and IFF equipment',
    icon: 'mdi-radio-tower',
  },
  {
    text: 'Follow ATC instructions',
    icon: 'mdi-airplane',
  },
  {
    text: 'No operation under influence',
    icon: 'mdi-liquor',
  },
  {
    text: 'Carry first-aid, comms, emergency gear',
    icon: 'mdi-hospital-box',
  },
  {
    text: 'Mounts must broadcast unique ID during flight',
    icon: 'mdi-broadcast',
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

    <v-divider class="my-4" />

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
