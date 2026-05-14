<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { AcademyMapConfig } from '@/types/institutions'

const props = defineProps<{
  config: AcademyMapConfig
  active?: string
}>()

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null

const refreshMap = () => {
  if (map) {
    map.invalidateSize()
    // Optional: Re-center the map when refreshed to ensure it's not lost in a 0x0 corner
    const academyBounds = L.latLngBounds(props.config.bounds)
    map.fitBounds(academyBounds)
  }
}
defineExpose({ refreshMap })

// Helper to define styles based on feature type
const getFeatureStyle = (type: string, customColor?: string) => {
  const styles: Record<string, any> = {
    grass: { color: '#81C784', fillColor: '#C8E6C9', fillOpacity: 0.8, weight: 1 },
    water: { color: '#4FC3F7', fillColor: '#81D4FA', fillOpacity: 0.7, weight: 1 },
    building: { color: '#37474F', fillColor: '#CFD8DC', fillOpacity: 1, weight: 2 },
    fountain: { color: '#0277BD', fillColor: '#4FC3F7', fillOpacity: 0.9, weight: 2 },
    gate: { color: '#263238', fillColor: '#546E7A', fillOpacity: 1, weight: 3 },
  }

  // 1. Grab the base style for the type, or a default fallback
  const baseStyle = {
    ...(styles[type] || { color: '#333', fillColor: '#999', fillOpacity: 0.5, weight: 1 }),
  }

  // 2. If a custom color was provided in the data, OVERRIDE the default
  if (customColor) {
    baseStyle.fillColor = customColor
    baseStyle.color = customColor // Optional: keeps the border the same as the fill
  }

  return baseStyle
}

/**
 * Generates points for a semi-circle
 * @param center [y, x]
 * @param radius
 * @param direction 'top' | 'bottom'
 */
const getSemiCirclePoints = (
  center: [number, number],
  radius: number,
  direction: 'left' | 'right',
): [number, number][] => {
  const points: [number, number][] = []
  const startAngle = direction === 'left' ? 180 : 0
  const endAngle = direction === 'left' ? 360 : 180

  for (let i = startAngle; i <= endAngle; i += 10) {
    const rad = (i * Math.PI) / 180
    // Swapping sin/cos and adjusting signs for a 90deg rotation
    points.push([center[0] + radius * Math.cos(rad), center[1] + radius * Math.sin(rad)])
  }
  return points
}

/**
 * Generates a capsule (stadium) shape with fixed coordinate dimensions
 */
const getCapsulePoints = (
  centerLine: [[number, number], [number, number]],
  radius: number,
): [number, number][] => {
  const [p1, p2] = centerLine
  const points: [number, number][] = []

  // Left Semi-circle
  for (let i = 180; i <= 360; i += 5) {
    const rad = (i * Math.PI) / 180
    points.push([p1[0] + radius * Math.cos(rad), p1[1] + radius * Math.sin(rad)])
  }

  // Right Semi-circle
  for (let i = 0; i <= 180; i += 5) {
    const rad = (i * Math.PI) / 180
    points.push([p2[0] + radius * Math.cos(rad), p2[1] + radius * Math.sin(rad)])
  }

  return points
}

onMounted(() => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value, {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 2,
    // --- GRANULAR ZOOM SETTINGS ---
    zoomSnap: 0.1, // The map will "snap" to these increments (0.1, 0.2, etc)
    zoomDelta: 0.5, // How much the zoom changes when using keyboard/buttons
    wheelPxPerZoomLevel: 120, // Increase this number to slow down the mouse wheel
    // ------------------------------
    center: [0, 0],
    zoom: 1,
    attributionControl: false,
  })

  // 1. Set the view and bounds
  map.fitBounds(props.config.bounds)

  // 1. Convert the raw array to a Leaflet Bounds object
  const academyBounds = L.latLngBounds(props.config.bounds)

  // 2. Center the map using the object's center, but pick your own zoom level
  map.setView(academyBounds.getCenter(), 0.5)

  // 2. Render Features (Shapes)
  props.config.features.forEach((f) => {
    let layer: L.Layer

    // 1. Handle Pokeballs
    if (f.type === 'pokeball') {
      const center = f.points[0]
      const radius = 8

      // Field Midline
      L.polyline(
        [
          [center[0] - 25, center[1]],
          [center[0] + 25, center[1]],
        ],
        {
          color: '#333',
          weight: 2,
        },
      ).addTo(map!)

      // Rotated Poké Ball Halves
      L.polygon(getSemiCirclePoints(center, radius, 'left'), {
        fillOpacity: 1,
        fillColor: '#FF0000',
        color: '#333',
        weight: 2,
      }).addTo(map!)

      L.polygon(getSemiCirclePoints(center, radius, 'right'), {
        fillOpacity: 1,
        fillColor: '#FFFFFF',
        color: '#333',
        weight: 2,
      }).addTo(map!)

      L.circle(center, {
        radius: 2,
        fillColor: 'white',
        fillOpacity: 1,
        color: '#333',
        weight: 2,
      }).addTo(map!)

      return // Exit early for this feature
    }

    // 2. Handle the Track (The "Smooth Oval")
    if (f.type === 'path' && f.label.includes('Track')) {
      const trackCenterLine: [[number, number], [number, number]] = [
        [f.points[0][0], f.points[0][1]],
        [f.points[1][0], f.points[1][1]],
      ]

      // Outer Track (Fixed radius of 30 units)
      L.polygon(getCapsulePoints(trackCenterLine, 30), {
        fillColor: '#AF4448',
        fillOpacity: 1,
        color: '#333',
        weight: 2,
      }).addTo(map!)

      // Inner Lane Line (Fixed radius of 28 units)
      L.polygon(getCapsulePoints(trackCenterLine, 28), {
        fillColor: 'transparent',
        color: 'white',
        weight: 1,
        dashArray: '5, 10',
        interactive: false, // So it doesn't block tooltips
      }).addTo(map!)

      return // Prevent default polyline rendering
    }

    // 3. Handle Standard Paths
    else if (f.type === 'path') {
      layer = L.polyline(f.points, {
        color: '#ECEFF1',
        weight: 12,
        lineCap: 'square',
      })
    }
    // 4. Handle Polygons (Buildings/Grass/Courts)
    else {
      layer = L.polygon(f.points, getFeatureStyle(f.type, f.color))
    }

    // Finalize layer (Add tooltips/popups)
    if (map && layer) {
      layer
        .addTo(map)
        .bindTooltip(`<strong>${f.label}</strong>`, {
          sticky: true,
          direction: 'top',
          className: 'custom-tooltip',
        })
        .bindPopup(`<strong>${f.label}</strong><br>${f.description}`)
    }
  })

  // 3. Render POIs (Specific Interaction Markers)
  props.config.pois.forEach((poi) => {
    if (map) {
      L.circleMarker(poi.coords, {
        radius: 6,
        fillColor: '#FF5252',
        color: 'white',
        weight: 2,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup(`<b>${poi.label}</b><br>${poi.description}`)
    }
  })
})

watch(
  () => props.active,
  async (newVal) => {
    if (newVal === 'interactive') {
      await nextTick()
      // Give the CSS transitions a moment to finish before calculating size
      setTimeout(() => {
        refreshMap()
      }, 200)
    }
  },
)

onUnmounted(() => {
  if (map) map.remove()
})
</script>

<template>
  <div class="academy-map-wrapper border-sm rounded-xl overflow-hidden shadow-inner">
    <div ref="mapContainer" class="map-viewport"></div>
  </div>
</template>

<style scoped>
.academy-map-wrapper {
  display: block;
  width: 100%;
  height: 600px;
}

.map-viewport {
  height: 600px;
  width: 100%;
  background: #f8f9fa; /* Clean "paper" background */
}

/* Custom Tooltip Styling */
:deep(.custom-tooltip) {
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: white !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 4px 8px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 12px !important;
}

:deep(.leaflet-container) {
  cursor: crosshair !important;
}

/* This will smoothly round the corners of all polygons on the map */
:deep(.leaflet-zoom-animated path) {
  stroke-linejoin: round;
  stroke-linecap: round;
}
</style>
