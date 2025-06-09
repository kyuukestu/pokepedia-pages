<script setup lang="ts">
const sandboxLinks = [
  { title: 'Trainer 101', icon: 'mdi-pokemon-go' },
  { title: 'Regions', icon: 'mdi-map' },
  { title: 'Law Enforcement', icon: 'mdi-police-badge' },
  { title: 'Supervisory Boards', icon: 'mdi-account-group' },
  { title: 'PokeCorp', icon: 'mdi-bank' },
  { title: 'PokeAcademia', icon: 'mdi-school' },
  { title: 'PokeTech', icon: 'mdi-laptop' },
  { title: 'Sandbox Events', icon: 'mdi-calendar' },
  { title: 'Characters', icon: 'mdi-account' },
  { title: 'Misc', icon: 'mdi-help-circle' },
]

const generatedSandboxLinks = sandboxLinks.map((link) => ({
  title: link.title,
  value: link.title.toLowerCase().replace(' ', '-'),
  to: `/sandbox/${link.title.toLowerCase().replace(' ', '-')}`,
  icon: link.icon,
}))

// console.log(generatedSandboxLinks)
</script>

<template>
  <v-list-group prepend-icon="mdi-menu" value="sandbox">
    <template v-slot:activator="{ props }">
      <v-list-item title="PokéSandbox" value="sandbox" v-bind="props" />
    </template>
    <v-list-item
      v-for="link in generatedSandboxLinks"
      :key="link.value"
      :prepend-icon="link.icon"
      :title="link.title"
      :value="link.value"
      :to="link.to"
    />
  </v-list-group>
</template>
