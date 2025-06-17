<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDate } from 'vuetify'

const calendar = ref()

const currentDate = ref([new Date('2022-07-01')])
interface CalendarEvent {
  title: string
  start: Date
  end: Date
  color: string
  allDay: boolean
}
const events = ref<CalendarEvent[]>([])

const sandboxEvents = {
  title: 'Test',
  start: new Date('2022-08-13'),
  end: new Date('2022-08-13'),
  color: 'blue',
  allDay: false,
}

onMounted(() => {
  const adapter = useDate()
  fetchSandboxEvents({
    start: adapter.startOfDay(adapter.startOfMonth(new Date())) as Date,
    end: adapter.endOfDay(adapter.endOfMonth(new Date())) as Date,
  })
})

function fetchSandboxEvents({ start, end }: { start: Date; end: Date }) {
  const _events = []
  _events.push(sandboxEvents)
  events.value = _events
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
        v-model="currentDate"
        :events="events"
        color="primary"
        type="month"
      ></v-calendar>
    </v-sheet>
  </v-container>
</template>
