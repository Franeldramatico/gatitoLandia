<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({ count: Number, en: Boolean })
const emit = defineEmits(['catch'])
const field = ref(null)
const x = ref(30)
const y = ref(60)
const gust = computed(() => [[64, 48], [32, 72], [71, 63]][props.count] || [50, 50])

function steer(nx, ny) {
  x.value = Math.max(6, Math.min(94, nx))
  y.value = Math.max(34, Math.min(90, ny))
  if (Math.hypot(x.value - gust.value[0], y.value - gust.value[1]) < 11) emit('catch')
}

function pointer(e) {
  const r = field.value.getBoundingClientRect()
  steer(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100)
}

function keys(e) {
  const d = { ArrowLeft: [-4, 0], ArrowRight: [4, 0], ArrowUp: [0, -4], ArrowDown: [0, 4] }[e.key]
  if (d) {
    e.preventDefault()
    steer(x.value + d[0], y.value + d[1])
  }
}

onMounted(() => window.addEventListener('keydown', keys))
onUnmounted(() => window.removeEventListener('keydown', keys))
</script>

<template>
  <div
    ref="field"
    class="kitefield"
    @pointerdown="pointer"
    @pointermove="e => { if (e.buttons) pointer(e) }"
  >
    <!-- Swirling Wind Gust SVG -->
    <div class="gust" :style="{ left: gust[0] + '%', top: gust[1] + '%' }" aria-hidden="true">
      <svg width="72" height="72" viewBox="0 0 68 68" fill="none">
        <circle cx="34" cy="34" r="30" fill="#467282" fill-opacity=".68" stroke="#ffefc4" stroke-width="2" stroke-dasharray="6 5" />
        <path
          d="M17 28h24a5 5 0 1 0-4-8M14 36h31a4.5 4.5 0 1 1-3.5 7.3M20 44h16"
          stroke="#fff8e0"
          stroke-width="2.4"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <!-- Custom Illustrated Kite SVG -->
    <div class="kite" :style="{ left: x + '%', top: y + '%' }" aria-hidden="true">
      <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
        <path d="M28 4 48 22 28 44 8 22Z" fill="#d97b62" stroke="#fff4d6" stroke-width="2" stroke-linejoin="round" />
        <path d="M28 4 48 22 28 24Z" fill="#f0bd74" />
        <path d="M28 24 8 22 28 44Z" fill="#7aa696" />
        <path d="M28 4v40M8 22h40" stroke="#fff6de" stroke-width="1.6" />
        <path d="M28 44q6 7-3 12t4 8" stroke="#fff2cf" stroke-width="1.8" stroke-linecap="round" />
        <path d="M23 53l5 2-4 3Z" fill="#f0bd74" />
      </svg>
    </div>

    <small>{{ en ? 'Steer with the arrows or touch a gust' : 'Guía con las flechas o toca una corriente' }}</small>
  </div>
</template>

<style scoped>
.kitefield {
  position: absolute;
  inset: 0;
  touch-action: none;
  cursor: crosshair;
}
.kite,
.gust {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  display: grid;
  place-items: center;
}
.kite {
  transition: top 0.12s ease-out, left 0.12s ease-out;
  filter: drop-shadow(0 6px 8px rgba(24, 34, 46, 0.28));
}
.gust {
  animation: pulseGust 1.8s ease-in-out infinite alternate;
}
@keyframes pulseGust {
  from { transform: translate(-50%, -50%) scale(0.95); }
  to { transform: translate(-50%, -50%) scale(1.06); }
}
.kitefield small {
  position: absolute;
  bottom: max(18px, env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  max-width: 88vw;
  background: #fff7e6;
  border: 1px solid rgba(48, 68, 62, 0.2);
  border-radius: 10px;
  padding: 8px 14px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(34, 48, 44, 0.14);
}
@media (prefers-reduced-motion: reduce) {
  .gust { animation: none; }
}
</style>
