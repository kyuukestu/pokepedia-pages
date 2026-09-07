import { computed, type ComputedRef } from 'vue'
import { useEventStore } from '@/stores/eventStore'
import { eventDefinitions } from '@/data/events/definitions'
import { type HydratedEvent } from '@/types/events'
import { useEventCalendar } from './useEventCalendar'

export function useEventHydration() {
  const eventStore = useEventStore()
  const { getDurationDays, formatEventRegions, getStatus } = useEventCalendar()

  const currentRPDate = computed(() => eventStore.currentRPDate)

  const hydratedEvents = computed<HydratedEvent[]>(() => {
    return eventStore.events.map((instance) => {
      const definition = eventDefinitions.find((d) => d.id === instance.eventId)
      const baseTitle = instance?.title || definition?.title || 'Unknown Event'

      const start = instance.calendar.start
      const end = instance.calendar.end || instance.calendar.start
      const durationDays = getDurationDays(start, instance.calendar.end)
      const displayTitle = durationDays > 1 ? ` ${baseTitle} [${durationDays}D]` : baseTitle

      const payload = {
        id: instance.id,
        eventSlug: instance.eventId,
        title: displayTitle,
        location: instance.location,
        regions: instance.region || [],
        regionDisplay: formatEventRegions(instance.region),
        image: instance?.image || definition?.image || '',
        category: definition?.category || 'other',
        description: instance.description || definition?.description || 'No Description.',
        internalPath: `/sandbox/events/${instance.eventId}/${instance.id}`,
        rawStart: start,
        rawEnd: end,
        start,
        allDay: true,
        durationDays,
        classNames: ['milestone-event-card', `cat-${definition?.category || 'default'}`],
      }

      return {
        ...payload,
        extendedProps: { ...payload },
      }
    })
  })

  const activeEvents: ComputedRef<HydratedEvent[]> = computed(() =>
    hydratedEvents.value
      .filter((e) => getStatus(e, currentRPDate.value) !== 'completed')
      .sort((a, b) => a.rawStart.localeCompare(b.rawStart)),
  )

  const pastEvents: ComputedRef<HydratedEvent[]> = computed(() =>
    hydratedEvents.value
      .filter((e) => getStatus(e, currentRPDate.value) === 'completed')
      .sort((a, b) => b.rawStart.localeCompare(a.rawStart)),
  )

  return {
    currentRPDate,
    hydratedEvents,
    activeEvents,
    pastEvents,
  }
}
