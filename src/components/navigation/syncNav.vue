<script setup lang="ts">
const syncLinks = [
  { title: 'Setting', icon: 'mdi-pokeball' },
  { title: 'Fortitude', icon: 'mdi-arm-flex' },
  { title: 'Sync Events', icon: 'mdi-calendar' },
  { title: 'Swarms', icon: 'mdi-routes-clock' },
  { title: 'PokeJobs', icon: 'mdi-briefcase' },
  { title: 'Vocations', icon: 'mdi-toolbox' },
  { title: 'PokeAcademy', icon: 'mdi-certificate' },
]

const generatedSyncLinks = syncLinks.map((link) => ({
  title: link.title,
  value: link.title.toLowerCase().replace(' ', '-'),
  to: `/sync/${link.title.toLowerCase().replace(' ', '-')}`,
  icon: link.icon,
}))
</script>

<template>
  <v-list-group prepend-icon="mdi-menu" value="sync">
    <template v-slot:activator="{ props }">
      <v-list-item title="PokéSync" value="sync" v-bind="props" />
    </template>
    <v-list-item
      v-for="link in generatedSyncLinks"
      :key="link.value"
      :prepend-icon="link.icon"
      :title="link.title"
      :value="link.value"
      :to="link.to"
    />
  </v-list-group>
</template>
