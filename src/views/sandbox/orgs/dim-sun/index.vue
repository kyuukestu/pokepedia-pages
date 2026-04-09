<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import FeatureGrid, { type FeatureItem } from '@/components/wiki/FeatureGrid.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'

const techFocus: FeatureItem[] = [
  {
    title: 'Gigaremo Units',
    icon: 'mdi-radio-tower',
    color: 'amber-darken-4',
    description:
      "Massive stationary machines that emit hypnotic waves, overriding a Pokémon's willpower and forcing them into labor or combat.",
  },
  {
    title: 'Miniremo Portables',
    icon: 'mdi-remote',
    color: 'amber-darken-4',
    description:
      'Handheld versions of the Gigaremo technology, allowing Grunts to control individual Pokémon without the need for Poké Balls.',
  },
  {
    title: 'Wave Inversion',
    icon: 'mdi-waveform',
    color: 'amber-darken-4',
    description:
      'The science of "dimming" a Pokémon\'s spirit. Unlike Cipher’s Shadow tech, this is purely vibrational and temporary, yet physically taxing.',
  },
  {
    title: 'The Incredible Machine',
    icon: 'mdi-antenna',
    color: 'amber-darken-4',
    description:
      'The ultimate evolution of Dim Sun tech: Altru Tower converted into a region-wide hypnotic transmitter.',
  },
]

const leadership: FeatureItem[] = [
  {
    title: 'Blake Hall (The President)',
    icon: 'mdi-account-tie',
    color: 'amber-darken-4',
    description:
      'The mastermind who used Altru Inc. as a financial shell to fund Dim Sun’s global conquest. Vanished without a trace after an encounter with Darkrai.',
  },
  {
    title: 'The Sinis Trio',
    icon: 'mdi-triangle-outline',
    color: 'amber-darken-4',
    description:
      'Elite commanders Ice, Lavana, and Heath. Known for high-level tactical strikes and utilizing "extra-large" controlled Pokémon.',
  },
  {
    title: 'Mr. Kincaid',
    icon: 'mdi-triangle-outline',
    color: 'amber-darken-4',
    description:
      'The Vice President of Dim Sun who operated undercover as a teacher in the Ranger Academy.',
  },
]
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Team Dim Sun"
      subtitle="The defunct syndicate that sought to plunge Almia into eternal subservience through hypnotic technology."
      icon="mdi-white-balance-sunny"
      pattern="dots"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="amber-darken-4" variant="flat" size="small">Defunct Syndicate</v-chip>
          <v-chip color="grey-darken-4" variant="flat" size="small">Wave-Tech Specialists</v-chip>
          <v-chip variant="outlined" size="small">Origins: Altru Inc.</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="The Hypnotic Hegemony" icon="mdi-eye-off-outline" class="amber-darken-4">
        <p class="text-body-1 lh-lg mb-6">
          <strong>Team Dim Sun</strong> was a highly organized paramilitary group that operated as
          the clandestine arm of Altru Inc. Their philosophy was simple: absolute control. By
          utilizing specialized radio waves to "dim" the spirits of Pokémon, they bypassed the need
          for companionship or Poké Balls, turning the wildlife of Almia into an automated drone
          army.
        </p>

        <p class="text-body-1 lh-lg mb-6">
          Though twice-defeated, the remnants of Dim Sun lurk in the shadows, rebranding themselves
          as <strong>Team Debonair</strong>.
        </p>
        <FeatureGrid :items="techFocus" :cols="2" />
      </WikiCard>

      <WikiCard
        title="The Luminous Crystal"
        icon="mdi-rhombus-split"
        class="my-6 crystal-focus blue-lighten-3"
      >
        <v-row align="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 lh-lg mb-4">
              The antithesis of Dim Sun’s dark ambitions is the <strong>Luminous Crystal</strong>.
              Originally corrupted into the <strong>Shadow Crystal</strong> to power the Incredible
              Machine, it was purified by the three Tears of the Princes.
            </p>
            <p class="text-body-1 lh-lg">
              Currently, the Crystal is safely housed within the
              <strong>Reformed Altru Inc.</strong> headquarters. It serves as a massive purification
              beacon, emitting a "Capture Wave" that protects the region from residual dark energy
              and prevents the reactivation of any remaining Gigaremo units.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="text-center">
            <v-icon size="120" color="blue-lighten-4">mdi-crystal-ball</v-icon>
            <div class="text-caption mt-2 text-blue-lighten-4 font-weight-bold">
              Status: STABLE & PURIFIED
            </div>
          </v-col>
        </v-row>
      </WikiCard>

      <WikiCard title="High Command" icon="mdi-account-group" class="amber-darken-4">
        <p class="text-body-1 lh-lg mb-4">
          Dim Sun’s strength lay in its corporate backing. With access to Altru’s bottomless R&D
          budget, they developed technology that even the <strong>Ranger Union</strong> struggled to
          counter until the discovery of the Vorton and the Luminous Crystal.
        </p>
        <FeatureGrid :items="leadership" :cols="2" />
      </WikiCard>

      <WikiCallout label="Ranger Intelligence" icon="mdi-radar" class="mt-6 amber-darken-4">
        While Team Dim Sun is officially disbanded, rogue "Miniremo" units still circulate in the
        <strong>Black Market</strong>. In RP, these units can be found in the possession of
        poachers, requiring Rangers to use <strong>Target Clear</strong> to neutralize the machines
        before the Pokémon can be safely captured or assisted.
      </WikiCallout>

      <WikiAlert type="warning" class="mt-8">
        <strong>SAFETY ADVISORY:</strong> Interaction with unshielded Gigaremo waves can cause
        nausea and temporary disorientation in humans. Do not attempt to dismantle a unit without a
        certified Capture Styler or protective gear.
      </WikiAlert>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}

.crystal-focus {
  background: linear-gradient(
    135deg,
    rgba(187, 222, 251, 0.2) 0%,
    rgba(33, 33, 33, 0.6) 100%
  ) !important;
  border: 1px solid rgba(144, 202, 249, 0.5) !important;
}

:deep(.feature-card) {
  border-style: dashed !important;
  border-width: 1px;
  background-color: rgba(var(--v-theme-amber-darken-4), 0.05);
  border-color: rgba(var(--v-theme-amber-darken-4), 0.3) !important;
}
</style>
