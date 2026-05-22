import { Dex } from '@pkmn/dex'

export function getCharImageUrl(
  path: string,
  isOC: boolean,
  charId?: string,
  region?: string,
): string {
  if (!path || path.startsWith('http')) return path
  const base = import.meta.env.BASE_URL
  return isOC
    ? `${base}/assets/characters/oc/${charId}/${path}`.replace(/\/+/g, '/')
    : `${base}/assets/characters/npc/${region}/${path}`.replace(/\/+/g, '/')
}

export function getImageUrl(path: string): string {
  if (!path || path.startsWith('http')) return path
  const base = import.meta.env.BASE_URL
  return `${base}/assets/${path}`.replace(/\/+/g, '/')
}

export function getRibbonUrl(path: string, region: string): string {
  if (!path || path.startsWith('http')) return ''
  const base = import.meta.env.BASE_URL
  // Standardizing path: /assets/ribbons/hoenn/cool-ribbon.png
  return `${base}/assets/ribbons/${region}/${path}`.replace(/\/+/g, '/')
}

export function getBadgeUrl(path: string, region: string): string {
  if (!path || path.startsWith('http')) return ''
  const base = import.meta.env.BASE_URL
  return `${base}/assets/badges/${region}/${path}`.replace(/\/+/g, '/')
}

export function getPokemonSprite(
  pokemon: string,
  isShiny: boolean = false,
  bw_icon: boolean = false,
): string {
  if (!pokemon) return ''

  const normalizedKey = pokemon.toLowerCase().replace(/[^a-z0-9]/g, '')

  const speciesData = Dex.species.get(normalizedKey)

  const dexNumber = speciesData?.num ?? 0

  return bw_icon
    ? `/assets/pokemon/bwicons/${String(dexNumber)}.png`
    : `/assets/pokemon/${isShiny ? 'home-centered-shiny' : 'home-centered'}/${pokemon}.png`
}
