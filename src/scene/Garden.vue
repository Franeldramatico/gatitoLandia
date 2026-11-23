<script setup>
import Foliage from './Foliage.vue'
defineProps({night:Boolean,period:Number,rainy:Boolean})
</script>
<template>
  <g>
    <rect width="800" height="340" :fill="night?'url(#dusk)':period===1?'url(#eveningSky)':'url(#sky)'"/>
    <circle cx="613" cy="44" r="20" :fill="night?'#fff3cb':'#fff2ba'"/>
    <!-- Staggered roofs beyond the courtyard. -->
    <g v-for="i in 12" :key="i" :transform="`translate(${i*65-65} ${69+(i*17)%33})`">
      <path d="M0 0h72v133H0Z" :fill="night?'#434d5e':'#9cadab'"/>
      <path d="M8 10h55m-55 16h55m-55 16h55" stroke="#dad4bb" stroke-width="3" stroke-dasharray="6 5"/>
    </g>
    <rect y="197" width="800" height="143" :fill="night?'#586953':'#9bae85'"/>
    <!-- Two connected apartment wings, with stacked private balconies. -->
    <g v-for="(wing,k) in [[-8,8,1],[361,46,.81]]" :key="k" :transform="`translate(${wing[0]} ${wing[1]}) scale(${wing[2]})`">
      <rect width="371" height="194" :fill="night?'#967f74':k?'#d9b59e':'#e6cdb0'"/>
      <rect width="371" height="194" fill="url(#brick)" opacity=".14"/>
      <path d="M0 3h371m-371 144h371" stroke="#947a68" stroke-width="5"/>
      <path d="M0 0h371m-371 145h371" stroke="#f6e4c4" stroke-width="3"/>
      <g v-for="r in 3" :key="r">
        <g v-for="c in 6" :key="c" :transform="`translate(${12+(c-1)*59} ${12+(r-1)*45})`">
          <rect width="40" height="29" rx="1" :fill="night?(r+c)%3?'#efce8b':'#586377':'url(#glass)'" stroke="#f6e6cd" stroke-width="3"/>
          <path d="M20 0v29M1 1l5 13 6-13m26 0-4 13-6-13" fill="#f6e3d1" stroke="#ba9f8f" stroke-width="1"/>
          <path d="M-4 20h49v13H-4Z" fill="#608177" fill-opacity=".18" stroke="#556f65" stroke-width="1.4"/>
          <path d="M2 21v11m7-11v11m7-11v11m7-11v11m7-11v11m7-11v11" stroke="#627c70"/>
          <path d="M-6 34h53" stroke="#998471" stroke-width="3"/>
          <g v-if="(r+c+k)%3===1"><rect x="23" y="22" width="15" height="5" fill="#a36352"/><path d="M24 22q-5-8 2-5 2-7 6-1 7-5 6 6" fill="#73936b"/><circle cx="30" cy="17" r="2" fill="#efaba1"/></g>
        </g>
      </g>
      <g v-for="x in [24,86,252,311]" :key="x">
        <rect :x="x" y="157" width="35" height="31" fill="#6e8e83" stroke="#f0dfc3" stroke-width="3"/>
        <path :d="`M${x+17} 157v31`" stroke="#e3d4b8" stroke-width="2"/>
      </g>
      <rect x="151" y="154" width="68" height="40" fill="#526c64" stroke="#b3977e" stroke-width="3"/>
      <path d="M185 154v40m-33-29h66" stroke="#ccbba1" stroke-width="2"/>
      <rect x="141" y="147" width="88" height="10" rx="2" fill="#3e6158"/>
      <text x="185" y="154.5" text-anchor="middle" font-size="6" fill="#fff0cc" letter-spacing="1">{{ k?'ALA ESTE':'VILLA BIGOTES' }}</text>
    </g>
    <!-- Paved communal terrace and paths from both entrances. -->
    <path d="M0 200h800v18H0Zm142 0h58l77 41 182-38h58l-196 56 175 81H336L0 214v-9l201 48Z" fill="#d5c7ae" stroke="#b2a38e" stroke-width="1"/>
    <path d="M0 207h800m-800 5h800" stroke="#f1e0bf" stroke-width="1" opacity=".65"/>
    <g v-for="(x,i) in [32,292,511]" :key="x" :transform="`translate(${x} ${215+i%2*9})`">
      <path d="M0 0h76l-6 14H8Z" fill="#b37d67" stroke="#846457"/>
      <path d="M-2 0q4-13 11-7 6-15 15-6 10-11 15-1 8-10 15-3 11-7 17 4 6-3 8 13Z" fill="#648469"/>
      <circle v-for="j in 9" :key="j" :cx="j*7" :cy="-4-(j*5)%8" r="2.3" :fill="j%2?'#edb6aa':'#fae7b6'"/>
    </g>
    <g transform="translate(433 207)">
      <path d="M1 0h55v6H1Zm0 9h55v5H1Z" fill="#ae8266" stroke="#715d51"/>
      <path d="M5 14v8m46-8v8M7-2v12m42-12v12" stroke="#53695e" stroke-width="2.6"/>
    </g>
    <Foliage/>
    <path v-if="rainy" d="M221 233q24-7 43-1-23 6-43 1m92 57q40-10 66-1-35 9-66 1" fill="#adc4bd" opacity=".68"/>
  </g>
</template>
