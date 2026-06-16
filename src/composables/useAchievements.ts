import { computed, unref, ComputedRef } from 'vue'
import type { Ref } from 'vue'
import type {
  BadgeCase,
  RibbonCase,
  AchievementBadgeDTO,
  AchievementRibbonDTO,
} from '@/types/CharacterDashboard'

type AchievementLike = {
  badges: AchievementBadgeDTO[]
  ribbons: AchievementRibbonDTO[]
  tournament_results: {
    event_id: string
    placement: string
  }[]
}

export function useAchievements(
  achievements: Ref<AchievementLike | null> | ComputedRef<AchievementLike | null>,
) {
  const badgeCases = computed<BadgeCase[]>(() => {
    const a = unref(achievements)
    if (!a) return []

    const grouped = new Map<string, AchievementBadgeDTO[]>()

    for (const badge of a.badges ?? []) {
      const region = badge.region ?? 'Unknown Region'
      if (!grouped.has(region)) grouped.set(region, [])
      grouped.get(region)!.push(badge)
    }

    console.log('achievements:', a)
    console.log('badges:', a?.badges)

    return Array.from(grouped.entries()).map(([region, badges]) => ({
      region,
      badges,
    }))
  })

  const ribbonCases = computed<RibbonCase[]>(() => {
    const a = unref(achievements)
    if (!a) return []

    return [
      {
        category: 'Ribbons',
        ribbons: a.ribbons ?? [],
      },
    ]
  })

  return {
    badgeCases,
    ribbonCases,
  }
}
