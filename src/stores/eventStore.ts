import { defineStore } from 'pinia'
import { eventInstances } from '@/data/events/instances'
import { EventInstance } from '@/types/events'
export const useEventStore = defineStore('events', {
  state: () => ({
    events: eventInstances as EventInstance[], // Type assertion for better IDE support
    currentRPDate: '2022-08-19T00:00:00',
  }),

  getters: {
    // Events that have started or already finished
    pastAndCurrentEvents: (state) => {
      return state.events.filter((e) => e.calendar.start <= state.currentRPDate)
    },

    // Events currently happening today
    activeEvents: (state) => {
      const today = state.currentRPDate
      return state.events.filter((event) => {
        const start = event.calendar.start
        const end = event.calendar.end || event.calendar.start
        return today >= start && today <= end
      })
    },

    // Events strictly in the future
    upcomingEvents: (state) => {
      const today = state.currentRPDate
      return state.events.filter((event) => event.calendar.start > today)
    },
  },

  actions: {
    advanceTimeline(newDate: string) {
      this.currentRPDate = newDate
    },

    // Helper to check status of a specific event (used in Search/Wiki cards)
    isEventActive(event: EventInstance): boolean {
      const today = this.currentRPDate
      const start = event.calendar.start
      const end = event.calendar.end || event.calendar.start
      return today >= start && today <= end
    },
  },
})
