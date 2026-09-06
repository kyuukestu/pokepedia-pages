<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Calendar as VCalendar } from 'v-calendar'
import 'v-calendar/style.css'
import { type HydratedEvent } from '@/types/events'
import { getImageUrl } from '@/utils/path-resolvers'
import { useEventCalendar } from '../composables/useEventCalendar'

const props = defineProps<{
  modelValue: boolean
  selectedEvent: HydratedEvent | null
}>()

const emit = defineEmits(['update:modelValue'])

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const { formatDate, parseLocalDate, getCategoryColor } = useEventCalendar()

const calendarPage = ref<{ month: number; year: number }>({
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
})

watch(
  () => props.selectedEvent?.rawStart,
  (newStart) => {
    if (!newStart) return
    const targetDate = parseLocalDate(newStart)
    calendarPage.value = {
      month: targetDate.getMonth() + 1,
      year: targetDate.getFullYear(),
    }
  },
  { immediate: true },
)

const vCalendarAttributes = computed(() => {
  if (!props.selectedEvent) return []

  const startDate = parseLocalDate(props.selectedEvent.rawStart)
  const endDate = parseLocalDate(props.selectedEvent.rawEnd)
  const duration = props.selectedEvent.durationDays || 1

  return [
    {
      key: 'event-duration-range',
      highlight: {
        start: { fillMode: 'solid', color: 'amber' },
        base: { fillMode: 'light', color: 'amber' },
        end: { fillMode: 'solid', color: 'amber' },
      } as const,
      dates: [{ start: startDate, end: endDate }],
      popover: {
        label: `${props.selectedEvent.title} (${duration} ${duration === 1 ? 'Day' : 'Days'})`,
      },
    },
    {
      key: 'start-flag',
      dot: { color: 'amber' },
      dates: [startDate],
    },
  ]
})
</script>

<template>
  <v-dialog v-model="dialogOpen" max-width="650" :eager="false">
    <v-card v-if="selectedEvent" class="notebook-dialog-card overflow-hidden" elevation="12">
      <div class="position-relative">
        <v-img :src="getImageUrl(selectedEvent?.image)" height="200" cover class="align-end card-image">
          <div class="card-scrim pa-4 w-100">
            <div
              class="font-mono text-caption font-weight-bold text-uppercase tracking-wider mb-1"
              :style="{ color: `rgb(var(--v-theme-${getCategoryColor(selectedEvent?.category)}))` }"
            >
              // {{ selectedEvent?.category }}
            </div>

            <h2 class="text-h5 font-serif font-weight-bold text-high-emphasis lh-tight">
              {{ selectedEvent?.title }}
            </h2>
          </div>
        </v-img>
      </div>

      <v-card-text class="pa-6">
        <v-row class="ma-0 mb-4 notebook-dialog-details pa-3 ga-y-3">
          <v-col cols="4" class="pa-1">
            <div class="font-mono text-caption text-medium-emphasis text-uppercase">Start Date</div>
            <div class="font-mono text-body-2 font-weight-bold text-amber-lighten-2">
              {{ formatDate(selectedEvent?.rawStart) }}
            </div>
          </v-col>

          <v-col cols="4" class="pa-1">
            <div class="font-mono text-caption text-medium-emphasis text-uppercase">End Date</div>
            <div class="font-mono text-body-2 font-weight-bold text-amber-lighten-2">
              {{ formatDate(selectedEvent?.rawEnd) }}
            </div>
          </v-col>

          <v-col cols="4" class="pa-1">
            <div class="font-mono text-caption text-medium-emphasis text-uppercase">Duration</div>
            <div class="font-mono text-body-2 font-weight-bold text-high-emphasis">
              {{ selectedEvent?.durationDays }}
              {{ selectedEvent?.durationDays === 1 ? 'Day' : 'Days' }}
            </div>
          </v-col>

          <v-col cols="6" class="pa-1">
            <div class="font-mono text-caption text-medium-emphasis text-uppercase">Region(s)</div>
            <div class="font-mono text-body-2 font-weight-bold text-high-emphasis">
              {{ selectedEvent?.regionDisplay }}
            </div>
          </v-col>

          <v-col cols="6" class="pa-1">
            <div class="font-mono text-caption text-medium-emphasis text-uppercase">Location</div>
            <div class="font-mono text-body-2 font-weight-bold text-high-emphasis text-truncate">
              {{ selectedEvent?.location }}
            </div>
          </v-col>
        </v-row>

        <div v-if="dialogOpen && selectedEvent" class="v-calendar-notebook-container my-4 d-flex justify-center">
          <VCalendar
            :key="`vcal-${selectedEvent.id}-${selectedEvent.rawStart}`"
            v-model:page="calendarPage"
            :attributes="vCalendarAttributes"
            is-dark
            expanded
            transparent
            borderless
          />
        </div>

        <v-divider class="mb-4 notebook-divider" />

        <p class="text-body-2 text-medium-emphasis lh-relaxed font-sans">
          {{ selectedEvent?.description }}
        </p>
      </v-card-text>

      <v-card-actions class="pa-4 notebook-dialog-actions d-flex align-center">
        <v-btn
          variant="text"
          size="small"
          class="font-mono font-weight-bold text-uppercase"
          color="amber-lighten-2"
          :to="`/sandbox/events/${selectedEvent?.eventSlug}`"
        >
          Overview
        </v-btn>

        <v-spacer />

        <v-btn
          color="amber-lighten-2"
          variant="outlined"
          size="small"
          class="font-mono font-weight-bold text-uppercase px-4"
          :to="selectedEvent?.internalPath"
        >
          Full Instance Record
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.notebook-dialog-card {
  background: #121212 !important;
  border: 1px solid #3d332a !important;
  border-radius: 6px !important;
}

.notebook-dialog-details {
  background: rgba(255, 191, 0, 0.04);
  border: 1px solid rgba(255, 191, 0, 0.15);
  border-radius: 4px;
}

.card-scrim {
  background: linear-gradient(to top, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.4) 100%);
}

.v-calendar-notebook-container {
  background: rgba(20, 20, 20, 0.6);
  border: 1px solid rgba(255, 191, 0, 0.2);
  border-radius: 4px;
  padding: 8px;
}

.notebook-divider {
  border-color: rgba(255, 191, 0, 0.15) !important;
}

.notebook-dialog-actions {
  background: #181818;
  border-top: 1px solid #3d332a;
}

.lh-relaxed {
  line-height: 1.6;
}
</style>
