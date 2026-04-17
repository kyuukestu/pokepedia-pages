<script setup lang="ts">
import WikiHero from '@/components/sections/WikiHero.vue'
import WikiCard from '@/components/wiki/WikiCard.vue'
import WikiCallout from '@/components/wiki/WikiCallout.vue'
import WikiAlert from '@/components/wiki/WikiAlert.vue'
import RuleList, { type Rule } from '@/components/wiki/RuleList.vue' // Ensure this is imported
import { useSandboxRules } from '@/stores/SandboxRulesStore'

// Interface check: icon, color, title, description
const rules: Rule[] = useSandboxRules().rules
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      title="Rules & Guidelines"
      subtitle="The core laws of the Sandbox that keep the adventure fair and fun for everyone."
      icon="mdi-gavel"
      pattern="pokeball"
    >
      <template #chips>
        <div class="mt-4 d-flex justify-center flex-wrap gap-2">
          <v-chip color="red-darken-2" variant="flat" size="small">Core Rules</v-chip>
          <v-chip color="red-darken-2" variant="outlined" size="small">Moderator Enforced</v-chip>
          <v-chip variant="tonal" size="small">Last Updated: 2026</v-chip>
        </div>
      </template>
    </WikiHero>

    <v-container max-width="1200">
      <WikiCard title="Overview" icon="mdi-information-outline" color="red">
        <p class="text-body-1 lh-lg mb-4">
          These rules establish the baseline expectations for all participants in the RP. They are
          designed to maintain fairness, clarity, and a shared understanding of how the world
          operates.
        </p>

        <WikiCallout label="Guiding Principle" icon="mdi-compass-outline" color="red">
          This RP prioritizes <strong>collaborative storytelling</strong>. Rules exist to support
          that goal, ensuring everyone has space to contribute to the world.
        </WikiCallout>
      </WikiCard>

      <WikiCard title="The Core Tenets" icon="mdi-format-list-checks" color="red">
        <p class="text-body-1 lh-lg mb-6">
          Click on a rule to expand it and read the full details.
        </p>

        <RuleList :rules="rules" class="mb-6" />

        <WikiAlert type="error">
          Repeated disregard for these standards or a poor attitude toward fellow players will
          result in swift removal from the RP. No exceptions.
        </WikiAlert>
      </WikiCard>
    </v-container>
  </v-container>
</template>

<style scoped>
.lh-lg {
  line-height: 1.8;
}
</style>
