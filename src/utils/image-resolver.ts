export function characterImageResolver(src?: string | null): string {
  if (!src) return '/images/fallback.png'
  if (src.startsWith('http')) return src
  return `/images/characters/${src}`
}
