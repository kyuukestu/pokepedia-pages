<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const inspectionCriteria = [
  {
    title: 'Gym Quality Control',
    icon: 'mdi-clipboard-check',
    color: 'amber-darken-3',
    description: 'Evaluating the physical condition, safety protocols, and puzzle difficulty of official regional Gyms.'
  },
  {
    title: 'Leader Competency',
    icon: 'mdi-account-star',
    color: 'amber-darken-3',
    description: 'Assessing if a Leader provides a fair but challenging battle that appropriately tests a Trainer’s growth.'
  },
  {
    title: 'External Auditing',
    icon: 'mdi-gavel',
    color: 'amber-darken-3',
    description: 'Investigating reports of unethical behavior, including refusal of challenges or unauthorized use of legendary/banned Pokémon.'
  },
  {
    title: 'Standardization',
    icon: 'mdi-file-certificate',
    color: 'amber-darken-3',
    description: 'Ensuring that Gym badges remain a consistent and valid mark of a Trainer\'s qualification for the League.'
  }
]

const inspectorRoles = [
  {
    title: 'The Agency Joys',
    icon: 'mdi-nurse',
    color: 'pink-darken-1',
    description: 'While many Nurse Joys manage Pokémon Centers, high-ranking members of the Joy family serve as elite Field Inspectors for the PIA.'
  },
  {
    title: 'League Liaisons',
    icon: 'mdi-handshake',
    color: 'blue-grey-darken-3',
    description: 'Working directly with the Elite Four to coordinate the replacement of decommissioned Gym Leaders.'
  }
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Pokémon Inspection Agency"
      subtitle="The regulatory authority ensuring the integrity, strength, and ethics of the Regional Gym circuit."
      icon="mdi-briefcase-search"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="amber-darken-3" variant="flat" size="small">Regulatory Body</v-chip>
          <v-chip color="blue-grey-darken-3" variant="flat" size="small">League Affiliate</v-chip>
          <v-chip variant="outlined" size="small">Office: Regional Capitals</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The Standard of Excellence" icon="mdi-shield-check" class="amber-darken-3">
        <p class="text-body-1 lh-lg mb-6">
          The <strong>Pokémon Inspection Agency (PIA)</strong> acts as the "checks and balances" for the 
          Pokémon League. While the League manages the tournaments and Elite Four, the PIA ensures that 
          the <strong>Gym Leaders</strong>—the gatekeepers of the League—remain qualified. They conduct 
          surprise inspections and "shadow battles" to verify that Leaders are teaching and testing 
          Trainers effectively.
        </p>
        <FeatureGrid :items="inspectionCriteria" :cols="2" />
      </WikiCard>

      <WikiCard title="Decertification Protocols" icon="mdi-close-octagon" class="my-6 audit-focus red-darken-4">
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg mb-4">
              The PIA holds the power to <strong>permanently close</strong> a Gym. Reasons for decertification include:
              persistent losses to subpar Trainers, neglect of Gym facilities, or a Leader’s lack of 
              professionalism. If a Gym is closed, the PIA manages the search for a new Leader or 
              redesignates the town’s League status.
            </p>
            
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="140" color="amber-darken-3">mdi-stamper</v-icon>
            <div class="text-caption mt-2 text-medium-emphasis">Official PIA Seal of Approval</div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard title="Agency Personnel" icon="mdi-account-tie" class="amber-darken-3">
        <p class="text-body-1 lh-lg mb-4">
          PIA Inspectors are often elite-level Trainers themselves. They must be capable of battling 
          a Gym Leader at full strength to gauge their true potential. High-ranking <strong>Nurse Joys</strong> 
          are frequently recruited due to their unparalleled knowledge of Pokémon health and 
          fair-play ethics.
        </p>
        <FeatureGrid :items="inspectorRoles" :cols="2" />
      </WikiCard>

    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.audit-focus {
  background: linear-gradient(135deg, rgba(255, 111, 0, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%) !important;
  border-left: 4px solid #FF8F00 !important;
}

:deep(.feature-card) {
  border-style: solid !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-amber-darken-3), 0.02);
  border-color: rgba(var(--v-theme-amber-darken-3), 0.2) !important;
}
</style>