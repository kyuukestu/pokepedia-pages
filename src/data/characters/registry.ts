import type { AnyCharacter } from '@/types/character'
// src/data/characters/registry.ts

const modules = import.meta.glob('@/data/characters/**/index.ts', { eager: true })

// Now you can map it cleanly
export const autoRegistry = Object.values(modules).map((mod) => {
  // Extract the default export from the index.ts file
  const data = (mod as { default: AnyCharacter }).default

  return {
    ...data, // Captures id, name, region... PLUS badge/city if they exist
  }
}) as AnyCharacter[]
