<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const currentOperations: FeatureItem[] = [
  {
    title: 'Tower Decommissioning',
    icon: 'mdi-crane',
    color: 'blue',
    description:
      'The "Incredible Machine" components have been stripped, reverting Altru Tower to a standard energy and communication hub.',
  },
  {
    title: 'Ecological Purity',
    icon: 'mdi-crystal-ball',
    color: 'blue',
    description:
      'Monitoring the influence of the Luminous Crystal to ensure the dark energy of the Shadow Crystal remains dormant.',
  },
  {
    title: 'Corporate Restructuring',
    icon: 'mdi-account-convert',
    color: 'blue',
    description:
      'Post-Blake Hall management is now overseen by a board of trustees in close cooperation with the Ranger Union.',
  },
  {
    title: 'The Almia Project',
    icon: 'mdi-map-check',
    color: 'blue',
    description:
      'A region-wide initiative to repurpose abandoned Altru/Dim Sun sites into public research and conservation centers.',
  },
]

const notableSites: FeatureItem[] = [
  {
    title: 'Altru Tower (Neutralized)',
    icon: 'mdi-tower-beach',
    color: 'blue',
    description:
      'No longer a tool for Pokémon control, it now serves as the primary relay for Almia’s peaceful energy grid.',
  },
  {
    title: 'Chroma Highlands Ruins',
    icon: 'mdi-fossil',
    color: 'blue',
    description:
      'A protected historical site where the true history of the Hall family and the Shadow Crystal was unearthed.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Altru Inc. (Reformed)"
      subtitle="From the brink of regional catastrophe to a cornerstone of Almia's reclamation and energy stability."
      icon="mdi-shield-check"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="blue-darken-2" variant="flat" size="small">Post-Crisis Recovery</v-chip>
          <v-chip color="blue-darken-2" variant="flat" size="small">Ranger-Supervised</v-chip>
          <v-chip variant="outlined" size="small">Headquarters: Pueltown Sector</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="A Legacy in Shadows" icon="mdi-history" color="blue">
        <p class="text-body-1 lh-lg mb-6">
          The true nature of Altru Inc. was revealed during the
          <strong>"Operation Brighton"</strong> crisis, when it was uncovered that the company
          served as the financial and technological front for <strong>Team Dim Sun</strong>.
          Following the defeat of the Incredible Machine and the subsequent disappearance of
          <strong>Blake Hall</strong> into the dark void, the company faced total collapse.
        </p>
        <p class="text-body-1 lh-lg mb-6">
          Today, Altru Inc. exists as a <strong>Reclamation Corporate Entity</strong>. Stripped of
          its paramilitary ambitions and its "Gigaremo" technology, the company’s vast resources are
          now dedicated to healing the scars left on the Almia region and its Pokémon.
        </p>
        <FeatureGrid :items="currentOperations" :cols="2" />
      </WikiCard>

      <WikiCard title="Site Reclamation" icon="mdi-map-marker-radius" color="blue">
        <p class="text-body-1 lh-lg mb-4">
          Under the supervision of the <strong>Ranger Union</strong>, several high-risk Altru
          locations have been repurposed. The Altru Tower, once a symbol of impending tyranny, has
          been purified by the <strong>Luminous Crystal</strong> and now provides clean, safe energy
          to every corner of Almia.
        </p>
        <v-divider class="border-opacity-75" :thickness="3" />

        <v-icon size="140" color="blue-darken-1" class="mx-auto d-flex flex-wrap justify-center"
          >mdi-image-filter-hdr</v-icon
        >
        <div class="text-caption mt-2 text-medium-emphasis mx-auto d-flex flex-wrap justify-center">
          The Chroma Highlands: Site of the Shadow Crystal’s Origin
        </div>
        <v-divider class="border-opacity-75" :thickness="3" />
        <br />
        <FeatureGrid :items="notableSites" :cols="2" />
      </WikiCard>

      <WikiCard title="The Dark Void Mystery" icon="mdi-incognito" color="blue">
        <p class="text-body-1 lh-lg mb-4">
          Despite the stabilization of the company, the mystery of
          <strong>Blake Hall</strong> remains. The dark void created by Darkrai at the tower’s
          summit remains a subject of intense scientific study by both Altru researchers and
          InterPol investigators.
        </p>

        <WikiCallout
          label="Ace Trainer Alert"
          icon="mdi-alert-decagram-outline"
          color="blue"
          class="mt-6"
        >
          Remnants of Team Dim Sun (The "Debonairs") are still occasionally sighted near abandoned
          Altru oil fields. Trainers are advised to report any "Miniremo" sightings to the nearest
          Ranger Base immediately.
        </WikiCallout>
      </WikiCard>

      <WikiAlert type="warning">
        Altru Inc. is currently operating under a <strong>Probationary Corporate Charter</strong>.
        All energy wave transmissions are monitored by the Ranger Union to prevent any recurrence of
        the Gigaremo incident.
      </WikiAlert>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

:deep(.feature-card) {
  border-style: dashed !important;
  background-color: rgba(var(--v-theme-blue-darken-2), 0.02);
}
</style>
