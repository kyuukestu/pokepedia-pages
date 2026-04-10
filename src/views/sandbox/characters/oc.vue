<script setup lang="ts">
import { computed, provide } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import WikiHero from '@/components/sections/WikiHero.vue'
import CharacterSpeedDial from '@/components/nav/CharacterSpeedDial.vue'

const route = useRoute()
const category = 'oc'

const nameId = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments[3] || ''
})

/**
 * CLEANED: Ensure charBasePath has no double slashes or trailing slashes
 * this is the 'root-path' passed to the dial.
 */
const charBasePath = computed(() => {
  const path = `/sandbox/characters/${category}/${nameId.value}`.toLowerCase()
  return path.replace(/\/+/g, '/').replace(/\/$/, '')
})

const charDisplayName = computed(() =>
  nameId.value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
)

const profileLinks = computed(() => {
  const links: any[] = []

  links.push({
    title: 'Overview',
    to: charBasePath.value,
    icon: 'mdi-home-account',
  })

  // Normalize helper to keep search logic consistent
  const normalize = (p: string) => p.replace(/\/+/g, '/').replace(/\/$/, '')

  function findCharacterNode(nodes: any[], parentPath = ''): any {
    for (const node of nodes) {
      let currentPath = node.path.startsWith('/') ? node.path : `${parentPath}/${node.path}`
      currentPath = normalize(currentPath)

      if (currentPath === charBasePath.value) {
        return node
      }

      if (node.children) {
        const found = findCharacterNode(node.children, currentPath)
        if (found) return found
      }
    }
    return null
  }

  const charNode = findCharacterNode([...routes])

  if (charNode && charNode.children) {
    charNode.children.forEach((child: any) => {
      const isSubPage = child.path !== '' && child.path !== 'index' && !child.path.startsWith('_')

      if (isSubPage) {
        // CLEANED: Sanitize the destination URL
        const rawTo = `${charBasePath.value}/${child.path}`
        const cleanTo = rawTo.replace(/\/+/g, '/').replace(/\/$/, '')

        links.push({
          title: child.path.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          to: cleanTo,
          icon: getIconForPath(child.path),
        })
      }
    })
  }

  return links
})

provide('profileLinks', profileLinks)

function getIconForPath(path: string) {
  const p = path.toLowerCase()
  if (p.includes('pokemon')) return 'mdi-pokeball'
  if (p.includes('history')) return 'mdi-book-open-variant'
  if (p.includes('relation')) return 'mdi-account-group'
  if (p.includes('gallery')) return 'mdi-image-multiple'
  return 'mdi-folder-account'
}
</script>

<template>
  <v-container fluid class="pa-0">
    <WikiHero
      :title="charDisplayName"
      subtitle="Federation Database"
      icon="mdi-shield-account"
      color="amber-darken-3"
    />

    <v-container max-width="1200" class="py-6">
      <RouterView :key="nameId" />
    </v-container>

    <CharacterSpeedDial :links="profileLinks" :root-path="charBasePath" />
  </v-container>
</template>
