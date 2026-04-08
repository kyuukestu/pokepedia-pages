<script setup lang="ts">
import { useTheme } from 'vuetify'
import { ref } from 'vue'

const theme = useTheme()

interface Rule {
  icon: string
  color: string
  title: string
  description?: string
}

defineProps({
  rules: {
    type: Array as () => Rule[],
    required: true,
  },
})

const expanded = ref<number | null>(null)

function toggle(index: number) {
  expanded.value = expanded.value === index ? null : index
}

function iconColor(color: string): string {
  const dark = theme.current.value.dark
  const map: Record<string, { light: string; dark: string }> = {
    red: { light: 'red-darken-2', dark: 'red-accent-2' },
    blue: { light: 'blue-darken-2', dark: 'cyan-accent-2' },
    green: { light: 'green-darken-2', dark: 'green-accent-2' },
    amber: { light: 'amber-darken-2', dark: 'amber-accent-2' },
  }
  return dark ? (map[color]?.dark ?? 'grey') : (map[color]?.light ?? 'grey')
}
</script>

<template>
  <div class="rule-list" :class="theme.current.value.dark ? 'rule-list--dark' : 'rule-list--light'">
    <template v-for="(rule, index) in rules" :key="index">
      <div
        class="rule-item"
        :class="{ 'rule-item--expanded': expanded === index }"
        @click="rule.description ? toggle(index) : null"
        :style="{ cursor: rule.description ? 'pointer' : 'default' }"
      >
        <!-- Rule header row -->
        <div class="rule-item__header">
          <v-icon :color="iconColor(rule.color)" size="20" class="rule-item__icon">
            {{ rule.icon }}
          </v-icon>
          <span class="rule-item__title text-body-1 font-weight-medium">{{ rule.title }}</span>
          <v-icon
            v-if="rule.description"
            size="18"
            class="rule-item__chevron"
            :class="{ 'rule-item__chevron--open': expanded === index }"
          >
            mdi-chevron-down
          </v-icon>
        </div>

        <!-- Expandable description -->
        <v-expand-transition>
          <div v-if="expanded === index && rule.description" class="rule-item__body text-body-2">
            {{ rule.description }}
          </div>
        </v-expand-transition>
      </div>

      <v-divider v-if="index < rules.length - 1" />
    </template>
  </div>
</template>

<style scoped>
.rule-list {
  border-radius: 10px;
  overflow: hidden;
}

.rule-list--light {
  background: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.07);
}

.rule-list--dark {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.rule-item {
  padding: 14px 18px;
  transition: background 0.15s ease;
}

.rule-list--light .rule-item:hover {
  background: rgba(0, 0, 0, 0.03);
}

.rule-list--dark .rule-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.rule-item__header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rule-item__icon {
  flex-shrink: 0;
}

.rule-item__title {
  flex: 1;
}

.rule-item__chevron {
  flex-shrink: 0;
  opacity: 0.5;
  transition: transform 0.2s ease;
}

.rule-item__chevron--open {
  transform: rotate(180deg);
  opacity: 1;
}

.rule-item__body {
  margin-top: 8px;
  padding-left: 32px;
  line-height: 1.7;
  opacity: 0.8;
}
</style>
