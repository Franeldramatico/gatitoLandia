<script setup>
import { computed } from 'vue'
import Foliage from './Foliage.vue'

const props = defineProps({
  night: Boolean,
  period: { type: Number, default: 0 },
  rainy: Boolean,
})

const skyFill = computed(() =>
  props.night ? 'url(#dusk)' : props.period === 1 ? 'url(#sunsetSky)' : 'url(#sky)',
)
const windowFill = computed(() => (props.night ? '#ffdf9b' : 'url(#glass)'))
const smokeFill = computed(() => (props.night ? '#c8d6ef' : props.period === 1 ? '#f8c8bc' : '#fff7e2'))
</script>

<template>
  <g>
    <!-- Sky & Sun / Moon -->
    <rect width="800" height="340" :fill="skyFill" />
    <circle class="sun-halo" cx="628" cy="58" r="84" :fill="night ? 'url(#moonGlow)' : 'url(#sunGlow)'" />
    <circle cx="628" cy="58" r="25" :fill="night ? '#fff1c2' : '#fff6cf'" />
    <g v-if="night" fill="#fff4cf" class="twinkle-group">
      <circle
        v-for="i in 34"
        :key="i"
        :class="{ twinkle: i % 3 === 0 }"
        :style="i % 3 === 0 ? { animationDelay: `${(i % 7) * 0.45}s` } : undefined"
        :cx="(i * 97) % 800"
        :cy="(i * 43) % 140"
        :r="i % 3 === 0 ? 1.4 : 0.75"
      />
      <path class="shooting-star" d="M150 38l48 16" stroke="#fff6d4" stroke-width="1.6" stroke-linecap="round" />
    </g>

    <!-- Layered Hills & Distant Cypresses -->
    <path d="M0 176Q160 72 390 156T800 124V340H0Z" :fill="night ? '#45575c' : '#adc69b'" />
    <g :fill="night ? '#36494b' : '#7fa27e'" opacity=".78" class="sway-gentle">
      <path d="M465 148q5-34 10 0Zm18 4q4-26 8 0Zm255-14q6-38 12 0Z" />
    </g>
    <path d="M0 206Q300 144 800 182V340H0Z" fill="url(#jade)" />

    <!-- Stone Garden Wall Behind Cottage -->
    <path d="M0 198h800v18H0Z" fill="#d3c2a4" opacity=".68" />
    <path d="M0 198h800v18H0Z" fill="url(#brick)" opacity=".45" />
    <path d="M0 198h800" stroke="#a69578" stroke-width="1.5" opacity=".7" />

    <!-- Garden Cottage -->
    <g>
      <ellipse
        :cx="period === 1 ? 256 : period === 2 ? 236 : 242"
        cy="214"
        rx="146"
        ry="9"
        fill="#41523f"
        :opacity="night ? .26 : .18"
      />
      <!-- Chimney with subtle brick pattern & period-tinted smoke -->
      <g class="smoke-wisp" :fill="smokeFill" :opacity="night ? .34 : .46">
        <circle cx="323" cy="22" r="5" /><circle cx="328" cy="11" r="7" opacity=".7" />
      </g>
      <path d="M311 76V36h25v60Z" fill="url(#terracotta)" stroke="#75493f" stroke-width="1.5" />
      <path d="M311 76V36h25v60Z" fill="url(#brick)" />
      <rect x="307" y="33" width="33" height="6" rx="1.5" fill="#8b554a" />
      <path d="M110 212V116L240 39l129 77v96Z" fill="url(#plaster)" stroke="#9e876d" stroke-width="1.8" stroke-linejoin="round" />
      <!-- Artisanal Plaster Hairline Detail -->
      <path d="M126 176q12-4 22 2m192-12q10 5 18 0" fill="none" stroke="#a68f74" stroke-width=".75" opacity=".55" />
      <rect x="110" y="196" width="259" height="16" fill="#c7b59a" stroke="#99846c" stroke-width="1.2" />
      <path d="M110 118h259" stroke="#a68a6e" stroke-width="2.5" opacity=".6" />
      <path d="M84 121 236 25q4-3 8 0l151 96-13 13-142-86-143 86Z" fill="url(#terracotta)" stroke="#76443b" stroke-width="1.8" stroke-linejoin="round" />
      <path d="M98 122 240 36l141 86" fill="none" stroke="#e9ad97" stroke-width="1.5" opacity=".65" />
      <circle cx="240" cy="84" r="14" :fill="windowFill" stroke="#fbf0d7" stroke-width="3" />
      <path d="M240 70v28m-14-14h28" stroke="#fbf0d7" stroke-width="1.5" />
      <!-- Arched Door & Porch Lantern -->
      <path d="M213 212v-54a27 27 0 0 1 54 0v54Z" fill="#6b9182" stroke="#f8ebd0" stroke-width="3.5" />
      <path d="M220 212v-52a20 20 0 0 1 40 0v52" fill="none" stroke="#4f7265" stroke-width="1.5" />
      <circle cx="255" cy="179" r="3.2" fill="#f6d579" stroke="#8f6c31" stroke-width=".8" />
      <circle v-if="night || period === 1" class="lamp-halo" cx="277" cy="154" r="22" fill="url(#lampGlow)" />
      <rect x="273" y="148" width="8" height="11" rx="2" fill="#ffeaa8" stroke="#5c4738" stroke-width="1.2" />
      <g v-for="wx in [135, 293]" :key="wx">
        <rect :x="wx - 9" y="138" width="8" height="40" rx="1" fill="#6d8d7a" />
        <rect :x="wx + 49" y="138" width="8" height="40" rx="1" fill="#6d8d7a" />
        <rect :x="wx" y="138" width="48" height="40" rx="2" :fill="windowFill" stroke="#fbf0d7" stroke-width="3" />
        <path :d="`M${wx + 24} 138v40M${wx} 158h48`" stroke="#fbf0d7" stroke-width="1.8" />
        <rect :x="wx - 4" y="177" width="56" height="8" rx="2" fill="#b47b64" stroke="#855644" stroke-width="1" />
        <circle :cx="wx + 6" cy="175" r="4" fill="#6f976f" />
        <circle :cx="wx + 16" cy="173" r="4" fill="#ea9f8d" />
        <circle :cx="wx + 26" cy="174" r="4.2" fill="#fff0bc" />
        <circle :cx="wx + 37" cy="173" r="4" fill="#ea9f8d" />
        <circle :cx="wx + 45" cy="175" r="3.8" fill="#6f976f" />
      </g>
    </g>

    <!-- Winding Cobble / Gravel Garden Path -->
    <path d="M214 212q56 15-34 48t-26 80h218q-126-50-72-82t-40-46Z" fill="#e4d4b0" stroke="#c3b08a" stroke-width="1.5" />
    <g fill="#d0bd98" opacity=".7">
      <ellipse cx="232" cy="235" rx="12" ry="4" />
      <ellipse cx="204" cy="256" rx="15" ry="4.5" />
      <ellipse cx="195" cy="285" rx="18" ry="5" />
      <ellipse cx="242" cy="306" rx="16" ry="4.5" />
      <ellipse cx="212" cy="326" rx="20" ry="5" />
    </g>

    <!-- Garden Wooden Bench -->
    <g transform="translate(490 202)">
      <ellipse :cx="period === 1 ? 35 : 28" cy="32" rx="30" ry="4.5" fill="#41523f" :opacity="night ? .24 : .16" />
      <path d="M4 22v10m48-10v10" stroke="#6f5343" stroke-width="3" stroke-linecap="round" />
      <rect x="2" y="2" width="52" height="12" rx="2" fill="#be8d6a" stroke="#7c5b46" stroke-width="1.2" />
      <path d="M2 8h52" stroke="#8c6750" stroke-width="1" />
      <rect x="0" y="15" width="56" height="7" rx="2" fill="#cfa07c" stroke="#7c5b46" stroke-width="1.2" />
    </g>

    <Foliage />

    <!-- Falling Meadow & Tree Blossoms in Sunny Weather -->
    <g v-if="!night && !rainy" pointer-events="none">
      <ellipse v-for="i in 7" :key="'pet' + i" class="petal-fall" :style="{ animationDelay: `${i * 0.9}s` }" :cx="580 + i * 24" :cy="115 + (i % 3) * 18" rx="3" ry="1.8" :fill="i % 2 ? '#fbe2d4' : '#fff5cf'" opacity=".85" />
    </g>
  </g>
</template>
