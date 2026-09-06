import { type AllRegions } from '@/types/region'
import { type EventStatus } from '@/types/events'

export function useEventCalendar() {
  function formatEventRegions(regions?: AllRegions[]): string {
    if (!regions || regions.length === 0) return 'UNKNOWN'
    if (regions.length === 1) return regions[0]
    return 'MULTIPLE'
  }

  function parseLocalDate(dateStr: string): Date {
    if (!dateStr) return new Date()
    const cleanDateStr = dateStr.split('T')[0]
    const [year, month, day] = cleanDateStr.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  function getDurationDays(startStr: string, endStr?: string): number {
    if (!endStr || startStr === endStr) return 1
    const s = parseLocalDate(startStr)
    const e = parseLocalDate(endStr)
    const diffTime = Math.abs(e.getTime() - s.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  function formatDate(value: unknown): string {
    if (!value) return 'N/A'
    if (value instanceof Date && !isNaN(value.getTime())) {
      return value.toLocaleDateString()
    }
    const parsed = new Date(value as string)
    if (isNaN(parsed.getTime())) return 'N/A'
    return parsed.toLocaleDateString()
  }

  function getCategoryColor(category?: string): string {
    const colors: Record<string, string> = {
      ecological: 'teal-lighten-2',
      tournament: 'amber-lighten-2',
      festival: 'purple-lighten-2',
      contest: 'pink-lighten-2',
      competition: 'orange-lighten-2',
      other: 'grey-lighten-1',
    }
    return colors[category?.toLowerCase() || ''] || 'amber-lighten-2'
  }

  function getStatus(event: { rawStart: string; rawEnd: string }, currentRPDate: string): EventStatus {
    if (currentRPDate > event.rawEnd) return 'completed'
    if (currentRPDate >= event.rawStart && currentRPDate <= event.rawEnd) return 'ongoing'
    return 'upcoming'
  }

  return {
    formatEventRegions,
    parseLocalDate,
    getDurationDays,
    formatDate,
    getCategoryColor,
    getStatus,
  }
}
