<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDate } from 'vuetify'

const calendar = ref()

const today = ref([new Date()])
interface CalendarEvent {
  title: string
  start: Date
  end: Date
  color: string
  allDay: boolean
}
const events = ref<CalendarEvent[]>([])
const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
const names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']

onMounted(() => {
  const adapter = useDate()
  fetchEvents({
    start: adapter.startOfDay(adapter.startOfMonth(new Date())) as Date,
    end: adapter.endOfDay(adapter.endOfMonth(new Date())) as Date,
  })
})
function fetchEvents({ start, end }: { start: Date; end: Date }) {
  const _events = []
  const min = start
  const max = end
  const days = (max.getTime() - min.getTime()) / 86400000
  const eventCount = rnd(days, days + 20)
  for (let i = 0; i < eventCount; i++) {
    const allDay = rnd(0, 3) === 0
    const firstTimestamp = rnd(min.getTime(), max.getTime())
    const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
    const second = new Date(first.getTime() + secondTimestamp)
    _events.push({
      title: names[rnd(0, names.length - 1)],
      start: first,
      end: second,
      color: colors[rnd(0, colors.length - 1)],
      allDay: !allDay,
    })
  }
  events.value = _events
}
function rnd(a: number, b: number): number {
  return Math.floor((b - a + 1) * Math.random()) + a
}
</script>

<template>
  <h1>Event Page</h1>
  Events will populate calendar here.

  <!-- TODO: Populate with actual events, make them clickable; throw up an overlay on click with an info blurb and provide a link to an extended event page. -->
  <v-container fluid>
    <v-sheet
      class="mx-auto"
      max-height="600"
      max-width="800"
      style="overflow-y: scroll; scrollbar-width: none"
    >
      <v-calendar
        ref="calendar"
        v-model="today"
        :events="events"
        color="primary"
        type="month"
      ></v-calendar>
    </v-sheet>
  </v-container>
</template>
