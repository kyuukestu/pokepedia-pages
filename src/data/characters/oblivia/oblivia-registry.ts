import type { AnyCharacter } from '@/types/character'
// src/data/characters/registry.ts

const modules = import.meta.glob('@/data/characters/oblivia/(npc|oc)/**/index.ts', { eager: true })

// Now you can map it cleanly
export const ObliviaRegistry = Object.values(modules).map((mod) => {
  // Extract the default export from the index.ts file
  const data = (mod as { default: AnyCharacter }).default

  if (!data || !data.id) {
    console.warn('Malformed character module found:', mod)
    return null
  }

  return {
    ...data, // Captures id, name, region... PLUS badge/city if they exist
  }
}) as AnyCharacter[]
