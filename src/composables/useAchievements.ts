import { computed, type ComputedRef } from 'vue'
import type {
  BadgeCase,
  RibbonCase,
  CharacterBadgeDTO,
  CharacterRibbonDTO,
  AchievementSection,
} from '@/types/CharacterDashboard'

const EMPTY_ACHIEVEMENTS: AchievementSection = {
  badges: [],
  ribbons: [],
  tournament_results: [],
}

export function useAchievements(achievements: ComputedRef<AchievementSection | null>) {
  const safe = computed(() => achievements.value ?? EMPTY_ACHIEVEMENTS)

  const badgeCases = computed<BadgeCase[]>(() => {
    const grouped = new Map<string, CharacterBadgeDTO[]>()

    for (const badge of safe.value.badges) {
      const region = badge.region ?? 'Unknown Region'
      if (!grouped.has(region)) grouped.set(region, [])
      grouped.get(region)!.push(badge)
    }

    console.log('achievements:', safe)
    console.log('badges:', safe.value?.badges)

    return Array.from(grouped.entries()).map(([region, badges]) => ({
      region,
      badges,
    }))
  })

  const ribbonCases = computed<RibbonCase[]>(() => {
    const grouped = new Map<string, CharacterRibbonDTO[]>()

    for (const ribbon of safe.value.ribbons) {
      const key = ribbon.region_id ?? 'unknown'

      if (!grouped.has(key)) grouped.set(key, [])
      grouped.get(key)!.push(ribbon)
    }

    return Array.from(grouped.entries()).map(([regionId, ribbons]) => ({
      region: ribbons[0]?.region ?? 'Unknown Region',
      region_id: regionId,
      ribbons,
    }))
  })

  const tournamentResults = computed(() => {
    return safe.value.tournament_results
  })

  return {
    badgeCases,
    ribbonCases,
    tournamentResults,
  }
}
