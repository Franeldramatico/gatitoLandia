<script setup>
// The original HTML draws this nave with JavaScript. Its rendered vector
// artwork is embedded so album exports and the portable edition keep it too.
import cathedral from './catedral.svg?inline'
</script>
<template>
  <g class="wedding-cathedral">
    <image :href="cathedral" width="800" height="340" preserveAspectRatio="none"/>
    <defs>
      <g id="pew-posy">
        <path d="M0 0q-12-16-15-11-1 6 12 12-18-4-19 1 6 4 21 1 11-12 16-9-1 7-12 10" fill="#769277"/>
        <path d="M-3 4l-5 17 5-3 2 3 3-16 4 12 3-2 3 2L5 3Z" fill="#edc7b8"/>
        <g v-for="(p,i) in [[-6,-3],[4,-4],[-1,2]]" :key="i" :transform="`translate(${p})`">
          <path d="M-5 0q-2-4 2-5 3-3 5 0 5 0 3 4 2 4-3 5-4 2-5-2Z" :fill="i===1?'#f5c5ba':'#fff2d7'"/>
          <path d="M-2-1q4-3 4 1l-3 1" fill="none" stroke="#c88c80" stroke-width=".7"/>
        </g>
      </g>
    </defs>
    <g v-for="(y,i) in [285,300,318]" :key="y">
      <use v-for="x in [323,477]" :key="x" href="#pew-posy" :transform="`translate(${x} ${y}) scale(${.53+i*.12})`"/>
    </g>
    <g fill="#f5cebf" opacity=".9">
      <ellipse v-for="i in 25" :key="i" :cx="354+(i*37)%92" :cy="282+(i*17)%58" rx="1.7" ry=".8"/>
    </g>
  </g>
</template>
