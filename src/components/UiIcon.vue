<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 18 },
})

const map = {
  '↗': 'exit',
  '✦': 'activity',
  '✿': 'flower',
  '✧': 'complete',
  '☾': 'moon',
  '☀': 'sun',
  '◒': 'twilight',
  '♡': 'heart',
  '♧': 'knock',
  '✉': 'mail',
  '⌕': 'search',
  '▣': 'phone',
  '⚿': 'key',
  '⌖': 'map',
  '♫': 'music',
  '☕': 'tea',
  '☂': 'umbrella',
  '◇': 'spark',
}

const iconId = computed(() => map[props.name] || props.name)
</script>

<template>
  <svg
    class="ui-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- Brand: little cat-ear rosette -->
    <template v-if="iconId === 'brand'">
      <path d="M5 12c0 4.2 3.1 7 7 7s7-2.8 7-7c0-1.6-.4-3-1.1-4.2L19 4l-3.6 1.7A7.3 7.3 0 0 0 12 5c-1.2 0-2.4.3-3.4.7L5 4l1.1 3.8A7.4 7.4 0 0 0 5 12Z" fill="currentColor" fill-opacity=".14" />
      <path d="M9.5 13.5c.8.8 1.6 1 2.5 1s1.7-.2 2.5-1" />
      <path d="M3 12.5h2.5M18.5 12.5H21M3.6 15l2.2-.5M18.2 14.5l2.2.5" />
      <circle cx="9.2" cy="11.2" r=".8" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="11.2" r=".8" fill="currentColor" stroke="none" />
    </template>

    <!-- Exit / Travel arch doorway -->
    <template v-else-if="iconId === 'exit'">
      <path d="M5 20V9a7 7 0 0 1 11.2-5.6" />
      <path d="M13 4h6v6" />
      <path d="M19 4 11 12" />
      <path d="M3 20h14" />
    </template>

    <!-- Activity / Shared moment star -->
    <template v-else-if="iconId === 'activity'">
      <path d="M12 2.5 14.4 9l6.6 2.5-6.6 2.5L12 20.5 9.6 14 3 11.5 9.6 9 12 2.5Z" fill="currentColor" fill-opacity=".18" />
    </template>

    <!-- Flower / Decorate / Garden -->
    <template v-else-if="iconId === 'flower'">
      <path d="M12 8.5c0-2.4 1.8-4 3.5-3s1.2 3.8-1 4.8c2.3.5 3.6 2.6 2.3 4.1s-3.9.4-4.8-1.6c-.9 2-3.5 3.1-4.8 1.6s0-3.6 2.3-4.1c-2.2-1-2.7-3.8-1-4.8s3.5.6 3.5 3Z" fill="currentColor" fill-opacity=".16" />
      <circle cx="12" cy="11" r="1.6" fill="currentColor" stroke="none" />
      <path d="M12 14.5V21" />
    </template>

    <!-- Complete / Sparkle -->
    <template v-else-if="iconId === 'complete' || iconId === 'spark'">
      <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" fill="currentColor" fill-opacity=".18" />
      <path d="M18.5 16v3M17 17.5h3" />
    </template>

    <!-- Sun / Morning -->
    <template v-else-if="iconId === 'sun' || iconId === 'settings'">
      <circle cx="12" cy="12" r="4.2" fill="currentColor" fill-opacity=".16" />
      <path d="M12 2.5v2.3M12 19.2v2.3M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
    </template>

    <!-- Twilight / Afternoon -->
    <template v-else-if="iconId === 'twilight'">
      <path d="M4 16h16" />
      <path d="M7 16a5 5 0 0 1 10 0" fill="currentColor" fill-opacity=".18" />
      <path d="M12 5v2.5M6.2 8.2l1.8 1.8M17.8 8.2 16 10M6.5 19.5h11" />
    </template>

    <!-- Moon / Night / Sleep -->
    <template v-else-if="iconId === 'moon'">
      <path d="M19 14.2A7.2 7.2 0 0 1 9.8 5a7.5 7.5 0 1 0 9.2 9.2Z" fill="currentColor" fill-opacity=".16" />
      <path d="M17.5 5v3M16 6.5h3" />
    </template>

    <!-- Heart / Bond -->
    <template v-else-if="iconId === 'heart'">
      <path d="M12 20s-7-4.5-8.5-9A4.8 4.8 0 0 1 12 6.8 4.8 4.8 0 0 1 20.5 11C19 15.5 12 20 12 20Z" fill="currentColor" fill-opacity=".18" />
    </template>

    <!-- Knock on door -->
    <template v-else-if="iconId === 'knock'">
      <rect x="6" y="3" width="12" height="18" rx="2" fill="currentColor" fill-opacity=".12" />
      <circle cx="12" cy="11" r="2.8" />
      <circle cx="12" cy="6.8" r=".9" fill="currentColor" stroke="none" />
      <path d="M3.5 9.5 5 11M20.5 9.5 19 11" />
    </template>

    <!-- Mail / Album / Postcard -->
    <template v-else-if="iconId === 'mail' || iconId === 'album'">
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" fill="currentColor" fill-opacity=".13" />
      <path d="m4.5 7.5 7.5 5.2 7.5-5.2" />
    </template>

    <!-- Search / Rental -->
    <template v-else-if="iconId === 'search'">
      <circle cx="10.5" cy="10.5" r="6" fill="currentColor" fill-opacity=".14" />
      <path d="m15 15 5 5" />
    </template>

    <!-- Phone -->
    <template v-else-if="iconId === 'phone'">
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.4" fill="currentColor" fill-opacity=".14" />
      <path d="M10.5 5.5h3M12 18.2h.01" />
    </template>

    <!-- Key -->
    <template v-else-if="iconId === 'key'">
      <circle cx="7.8" cy="15.2" r="4" fill="currentColor" fill-opacity=".16" />
      <path d="m10.7 12.3 8.8-8.8M16.5 6.5l2.5 2.5M14 9l2 2" />
    </template>

    <!-- Map / Lift directory -->
    <template v-else-if="iconId === 'map'">
      <path d="m3.5 6.5 5.5-2.5 6 2.5 5.5-2.5v13.5L15 20l-6-2.5-5.5 2.5V6.5Z" fill="currentColor" fill-opacity=".14" />
      <path d="M9 4v13.5M15 6.5V20" />
    </template>

    <!-- Music -->
    <template v-else-if="iconId === 'music'">
      <path d="M9 17.5V6.5l10-2v11" />
      <circle cx="6.8" cy="17.5" r="2.3" fill="currentColor" fill-opacity=".2" />
      <circle cx="16.8" cy="15.5" r="2.3" fill="currentColor" fill-opacity=".2" />
    </template>

    <!-- Tea / Cafe -->
    <template v-else-if="iconId === 'tea'">
      <path d="M4.5 11h11.5v3.5a5 5 0 0 1-5 5h-1.5a5 5 0 0 1-5-5V11Z" fill="currentColor" fill-opacity=".16" />
      <path d="M16 12h1.8a2.2 2.2 0 0 1 0 4.4H16" />
      <path d="M7.5 6.5c0-1 .8-1.5.8-2.5M11.5 6.5c0-1 .8-1.5.8-2.5" />
    </template>

    <!-- Umbrella / Rain -->
    <template v-else-if="iconId === 'umbrella'">
      <path d="M3.5 12a8.5 8.5 0 0 1 17 0H3.5Z" fill="currentColor" fill-opacity=".18" />
      <path d="M12 12v6.5a2 2 0 0 1-4 0M12 2.5v1" />
    </template>

    <!-- Menu hamburger -->
    <template v-else-if="iconId === 'menu'">
      <path d="M4.5 7h15M4.5 12h15M4.5 17h15" />
    </template>

    <!-- Pin -->
    <template v-else-if="iconId === 'pin'">
      <path d="M12 21s-6-5.3-6-10.2a6 6 0 1 1 12 0C18 15.7 12 21 12 21Z" fill="currentColor" fill-opacity=".18" />
      <circle cx="12" cy="10.5" r="2.1" fill="currentColor" stroke="none" />
    </template>

    <!-- Sliders / Audio & Language settings -->
    <template v-else-if="iconId === 'sliders'">
      <path d="M4 7h16M4 12h16M4 17h16" />
      <circle cx="9" cy="7" r="2" fill="currentColor" />
      <circle cx="15" cy="12" r="2" fill="currentColor" />
      <circle cx="10" cy="17" r="2" fill="currentColor" />
    </template>

    <!-- Arrows / Chevrons -->
    <template v-else-if="iconId === 'chevron'">
      <path d="m9 6 6 6-6 6" />
    </template>
    <template v-else-if="iconId === 'back'">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </template>
    <template v-else-if="iconId === 'swipe'">
      <path d="M7 12h10M10 9l-3 3 3 3M14 9l3 3-3 3" />
    </template>
  </svg>
</template>

<style scoped>
.ui-icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
