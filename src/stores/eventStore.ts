import { defineStore } from 'pinia'
import { eventList } from '@/data/event-list'
import type { CalendarEvent } from '@/data/event-list'

export const useEventStore = defineStore('events', {
  state: () => ({
    events: eventList as CalendarEvent[], // Type assertion for better IDE support
    currentRPDate: '2022-08-19T00:00:00',
  }),

  getters: {
    // Events that have started or already finished
    pastAndCurrentEvents: (state) => {
      return state.events.filter((e) => e.start <= state.currentRPDate)
    },

    // Events currently happening today
    activeEvents: (state) => {
      const today = state.currentRPDate
      return state.events.filter((event) => {
        const start = event.start
        const end = event.end || event.start
        return today >= start && today <= end
      })
    },

    // Events strictly in the future
    upcomingEvents: (state) => {
      const today = state.currentRPDate
      return state.events.filter((event) => event.start > today)
    },
  },

  actions: {
    advanceTimeline(newDate: string) {
      this.currentRPDate = newDate
    },

    // Helper to check status of a specific event (used in Search/Wiki cards)
    isEventActive(event: CalendarEvent): boolean {
      const today = this.currentRPDate
      const start = event.start
      const end = event.end || event.start
      return today >= start && today <= end
    },
  },
})
