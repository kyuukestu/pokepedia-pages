export function getImageUrl(path: string, isOC: boolean, charId?: string, region?: string): string {
  if (!path || path.startsWith('http')) return path
  const base = import.meta.env.BASE_URL
  return isOC
    ? `${base}/assets/characters/oc/${charId}/${path}`.replace(/\/+/g, '/')
    : `${base}/assets/characters/npc/${region}/${path}`.replace(/\/+/g, '/')
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
