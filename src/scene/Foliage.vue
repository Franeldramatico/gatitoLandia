<script setup>
let seed = 13
const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647

const backLeaves = Array.from({ length: 55 }, (_, i) => {
  const a = random() * 2 * Math.PI
  const r = Math.sqrt(random())
  return {
    x: 669 + Math.cos(a) * 82 * r,
    y: 96 + Math.sin(a) * 66 * r,
    rx: 16 + random() * 8,
    ry: 13 + random() * 6,
    color: i % 2 ? '#5e8462' : '#698f69',
  }
})

const midLeaves = Array.from({ length: 65 }, (_, i) => {
  const a = random() * 2 * Math.PI
  const r = Math.sqrt(random()) * 0.92
  return {
    x: 667 + Math.cos(a) * 74 * r,
    y: 91 + Math.sin(a) * 58 * r,
    rx: 15 + random() * 6,
    ry: 12 + random() * 5,
    color: ['#7da270', '#8bb078', '#98bd82'][i % 3],
  }
})

const topLeaves = Array.from({ length: 32 }, (_, i) => {
  const a = random() * 2 * Math.PI
  const r = Math.sqrt(random()) * 0.72
  return {
    x: 660 + Math.cos(a) * 62 * r,
    y: 78 + Math.sin(a) * 44 * r,
    rx: 12 + random() * 5,
    ry: 9 + random() * 4,
    color: i % 2 ? '#aed08e' : '#b8d796',
  }
})

const treeBlossoms = Array.from({ length: 14 }, () => {
  const a = random() * 2 * Math.PI
  const r = 0.25 + random() * 0.65
  return {
    x: 665 + Math.cos(a) * 65 * r,
    y: 92 + Math.sin(a) * 48 * r,
  }
})

const grass = Array.from({ length: 85 }, (_, i) => ({
  x: random() * 800,
  y: 226 + random() * 114,
  flower: i % 4 === 0,
  tint: i % 8 === 0 ? '#f6d2c4' : '#fff3c4',
})).filter(({ x }) => x <= 140 || x >= 370)
</script>

<template>
  <g>
    <!-- Tree Ground Shadow -->
    <ellipse cx="671" cy="212" rx="78" ry="12" fill="#465c44" opacity=".22" />

    <!-- Textured Trunk & Branches -->
    <path d="M651 211q8-48 9-105h18q3 58 14 105q-20 4-41 0Z" fill="#8f6d4f" stroke="#6c503a" stroke-width="1.3" />
    <path d="M664 134q-24-22-36-34m44 28q26-18 39-30" fill="none" stroke="#856448" stroke-width="6" stroke-linecap="round" />
    <path d="M663 196q2-34 3-76" fill="none" stroke="#ab8866" stroke-width="3" opacity=".55" />

    <!-- Layered Canopy (gentle breeze sway) -->
    <g class="canopy-sway">
      <ellipse v-for="(l, i) in backLeaves" :key="'b' + i" :cx="l.x" :cy="l.y" :rx="l.rx" :ry="l.ry" :fill="l.color" />
      <ellipse v-for="(l, i) in midLeaves" :key="'m' + i" :cx="l.x" :cy="l.y" :rx="l.rx" :ry="l.ry" :fill="l.color" />
      <ellipse v-for="(l, i) in topLeaves" :key="'t' + i" :cx="l.x" :cy="l.y" :rx="l.rx" :ry="l.ry" :fill="l.color" />
      <circle v-for="(b, i) in treeBlossoms" :key="'bl' + i" :cx="b.x" :cy="b.y" r="3.2" fill="#fff4cf" opacity=".9" />
    </g>

    <!-- Grass Tufts & Meadow Blooms -->
    <g v-for="(blade, i) in grass" :key="'g' + i" :transform="`translate(${blade.x} ${blade.y})`">
      <path d="M0 0l-3-6m3 6 0-7m0 7 3.5-5" fill="none" stroke="#6d905d" stroke-width="1.8" stroke-linecap="round" />
      <g v-if="blade.flower">
        <circle cx="-2" cy="-7" r="3.2" :fill="blade.tint" />
        <circle cx="-2" cy="-7" r="1.2" fill="#dba24b" />
      </g>
    </g>
  </g>
</template>
