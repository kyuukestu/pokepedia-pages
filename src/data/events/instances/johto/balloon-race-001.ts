import type { EventInstance } from '@/types/events'

export default {
  id: 'balloon-race-001',
  eventId: 'balloon-race',
  location: 'Route 39 — North of Olivine City',

  members: [],

  calendar: {
    start: '2022-08-01T00:00:00',
    allDay: true,
  },
  statusOverride: 'postponed'
} satisfies EventInstance
