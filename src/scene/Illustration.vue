<script setup>
import Street from './Street.vue'
import Garden from './Garden.vue'
import PrintStudio from './PrintStudio.vue'
import Finishing from './Finishing.vue'
defineProps({scene:String,night:Boolean,decor:Number,bag:Boolean,bought:Boolean,actor:Number,day:Number,plant:Number,furniture:Array,greenhouse:Boolean,rainy:Boolean})
</script>
<template>
<svg class="illustration" :data-decor="scene==='room'?decor:undefined" viewBox="0 0 800 340" preserveAspectRatio="none" aria-hidden="true">
 <defs>
  <linearGradient id="sky" x2=".2" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="#99cad3"/><stop offset="1" stop-color="#ffead0"/></linearGradient>
  <linearGradient id="dusk" x2="0" y2="1"><stop stop-color="#252f57"/><stop offset="1" stop-color="#ae96a1"/></linearGradient>
  <pattern id="paper" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="2" r=".55" fill="#5b493c" opacity=".23"/></pattern>
 </defs>
 <PrintStudio/>
 <Garden v-if="scene==='garden'"/>
 <Street v-else-if="['hall','roof','cafe'].includes(scene)" :place="scene==='hall'?'lobby':scene"/>
 <g v-else-if="['air','rail','cover'].includes(scene)">
  <rect width="800" height="340" :fill="night?'url(#dusk)':'url(#sky)'"/>
  <circle cx="601" cy="64" r="29" :fill="night?'#fff0bf':'#fff4cb'"/>
  <g v-if="night" fill="#fff1cc"><circle v-for="i in 53" :key="i" :cx="i*79%800" :cy="i*47%170" :r="i%3===0?1.4:.7"/></g>
  <path d="M0 194Q110 109 215 170T421 148T640 161T800 135V280H0" :fill="night?'#56647c':'#adc5ad'"/>
  <g v-for="i in 19" :key="i" :transform="`translate(${i*48-60} ${145+(i*47)%49})`"><rect width="39" height="83" :fill="night?'#454e67':'#8fa99e'"/><path d="M8 10h5v7H8zm16 0h5v7h-5zM8 28h5v7H8z" fill="#f4ddb0"/></g>
  <rect y="230" width="800" height="110" :fill="night?'#8c8089':'#cbbda6'"/><path d="M0 245h800" stroke="#f4d49d" stroke-width="5"/>
  <g v-if="scene==='air'" class="plane"><path d="M88 178l47 7 74-9q18-1 25 6-4 7-21 8l-74 4-44-6-18-19 8-1z" fill="#fff8df" stroke="#777e77" stroke-width="2"/><path d="M145 186l-30-24 12-2 52 24m-22 4-24 15 13 1 38-16" fill="#bc8172"/><path d="M180 181l36-1" stroke="#688b91" stroke-width="3" stroke-dasharray="5 3"/><circle cx="138" cy="196" r="3"/><circle cx="202" cy="192" r="3"/></g>
  <g v-else-if="scene==='rail'" class="train">
   <path d="M-52 126h595q36 0 53 28l24 40q10 21-17 26H-52z" fill="url(#jade)" stroke="#445865" stroke-width="2.5"/>
   <path d="M-50 189h655l6 12H-50z" fill="#e4b295"/><path d="M-50 205h655" stroke="#f7dbb7" stroke-width="2"/>
   <g v-for="i in 10" :key="i" :transform="`translate(${i*52-45} 143)`"><rect width="38" height="35" rx="6" fill="#5c7477"/><rect x="2" y="2" width="34" height="30" rx="4" fill="url(#gold)"/><path d="M5 3l9 0-9 19zm26 0h4L19 31h-4z" fill="#fff5d6" opacity=".38"/></g>
   <path d="M546 141q21 2 34 23l10 16h-46z" fill="url(#glass)" stroke="#647b7a" stroke-width="2"/><rect x="595" y="194" width="14" height="6" rx="3" fill="#fff4c1"/>
   <path d="M-10 220h590" stroke="#424554" stroke-width="7"/><path d="M-10 130h548" stroke="#d3d9b6" stroke-width="3"/>
  </g>
  <g v-if="scene==='rail'" transform="translate(390 221) rotate(9)"><rect width="18" height="29" rx="3" fill="#3f4551"/><rect x="2" y="3" width="14" height="21" rx="2" fill="#f4e6b4"/><circle cx="9" cy="26" r="1" fill="#fff"/></g>
  <g v-if="scene==='air'" transform="translate(545 133)"><path d="M24 0v100" stroke="#77796c" stroke-width="5"/><rect width="96" height="43" rx="4" fill="#54796d"/><text x="48" y="27" text-anchor="middle" fill="#fff4d6">⌂ →</text></g>
 </g>
 <g v-else-if="scene==='room'">
  <rect width="800" height="340" fill="url(#plaster)"/><path d="M0 0l149 60v157L0 275z" fill="#d4c1a8"/><path d="M0 275l150-62h650v127H0" fill="#cba98c"/>
  <path v-for="i in 10" :key="i" :d="`M${i*125-250} 340l${(380-i*80)*.32} -125`" stroke="#bd997e" fill="none"/>
  <rect x="379" y="43" width="181" height="109" fill="#a4c8c6" stroke="#fcf1d9" stroke-width="9"/><path d="M470 41v113m-90-55h180" stroke="#fff2db" stroke-width="5"/>
  <path d="M380 153l-129 135h178l131-135z" fill="#ffe8aa" opacity=".31"/>
  <path d="M25 70l72 21v141l-72 28z" fill="#ad8872"/><circle cx="82" cy="173" r="4" fill="#e9c58b"/>
  <Finishing scene="room"/>
  <!-- The apartment is a persistent 12-step furnishing journey, not a 3-state toggle. -->
  <g v-if="decor>=1">
   <ellipse cx="544" cy="279" rx="116" ry="24" fill="#594c4438"/>
   <path d="M435 256q12-39 80-39h53q48 1 62 39l-13 18H448z" fill="#91a998" stroke="#708777" stroke-width="3"/>
   <path d="M453 249q5-26 45-26h59q34 0 44 27v11H453z" fill="#c8d2ad"/><path d="M457 258h160" stroke="#718976" stroke-width="2"/>
   <path d="M455 269l-5 20m160-20 5 20" stroke="#866b56" stroke-width="6"/>
  </g>
  <g v-if="decor>=2">
   <ellipse cx="325" cy="282" rx="86" ry="19" fill="#574a4233"/>
   <path d="M247 254q17-21 78-21 55 0 78 21l-11 27H257z" fill="#ca9c8c" stroke="#ad7f73" stroke-width="2"/>
   <path d="M264 250q18-14 59-13 44 1 61 14z" fill="#f1d7bd"/>
  </g>
  <g v-if="decor>=3">
   <path d="M566 221l-3-61m0 34q-33-33-39-20 8 26 39 28m0-25q5-39 26-36 6 22-26 44m-1 0q25-27 40-13-8 21-41 22" fill="#7d9e78"/>
   <path d="M544 220h46l-7 33h-34z" fill="#bd816b"/><path d="M541 220h52v8h-52z" fill="#e1a588"/>
   <ellipse cx="566" cy="258" rx="34" ry="6" fill="#62544925"/>
  </g>
  <g v-if="decor>=4" transform="translate(219 89) rotate(-5)">
   <rect width="57" height="39" rx="2" fill="#f6e8c9" stroke="#a78969" stroke-width="3"/><rect x="5" y="5" width="47" height="29" fill="#bfd0bb"/>
   <path d="M7 30l13-14 10 10 9-12 12 16" fill="#728e7c"/><circle cx="39" cy="12" r="5" fill="#e2ac75"/>
   <text x="7" y="49" font-size="8" fill="#6f6655">{{ actor===0?'ARRIVAL · 15':'HOME · 18' }}</text>
  </g>
  <g v-if="decor>=5">
   <path d="M676 217v-31a20 20 0 0 1 40 0v31z" fill="#85a9a0" stroke="#fbf0d7" stroke-width="5"/>
   <path d="M696 167v50m-20-26h40" stroke="#fbf0d7" stroke-width="3"/>
   <path d="M667 221h58" stroke="#a98169" stroke-width="4"/>
  </g>
  <g v-if="decor>=6">
   <path d="M494 206h94v9h-94z" fill="#907565"/>
   <path d="M502 203v-34h79v34" fill="#c18b70" stroke="#9d735f" stroke-width="3"/>
   <path d="M510 168q27 12 61 0v26h-61z" fill="#e8c6a3"/>
   <path d="M499 213l-4 26m94-26 4 26" stroke="#876b55" stroke-width="5"/>
  </g>
  <g v-if="decor>=7">
   <rect x="174" y="202" width="48" height="34" rx="2" fill="#f1e3c4" stroke="#987b62" stroke-width="3"/>
   <path d="M181 228l12-14 8 8 8-10 8 16z" fill="#77977e"/>
   <rect x="194" y="228" width="11" height="8" fill="#9a8168"/>
  </g>
  <g v-if="decor>=8">
   <path d="M340 214h30v24h-30z" fill="#dfbb81"/><path d="M345 209q9-17 20 0m-14-8q4-8 9 0" fill="none" stroke="#738f77" stroke-width="4"/>
   <path d="M355 214v-7" stroke="#745b48" stroke-width="2"/>
  </g>
  <g v-if="decor>=9" transform="translate(434 182)">
   <path d="M0 25h54v33H0z" fill="#c7a47b"/><path d="M-4 25h62L47 16H7z" fill="#f0dfbd"/>
   <path d="M7 58v8m38-8v8" stroke="#876c52" stroke-width="3"/>
   <rect x="13" y="9" width="24" height="16" rx="3" fill="#d4a975"/><path d="M19 9V4h12v5" fill="none" stroke="#9c7857" stroke-width="2"/>
  </g>
  <g v-if="decor>=10">
   <path d="M88 193h62v55H88z" fill="#f7e9c9" stroke="#ab906f" stroke-width="4"/>
   <path d="M97 233l13-17 8 9 10-12 14 20z" fill="#82a08a"/>
   <circle cx="132" cy="210" r="6" fill="#e3ae76"/>
  </g>
  <g v-if="decor>=11">
   <path d="M631 130l2 60m-1-37q-23-23-34-14 8 20 34 22m0-17q10-25 24-21 2 16-24 28m1 0q21-15 30-5-8 14-30 14" fill="#799875"/>
   <path d="M617 188h38l-6 25h-27z" fill="#b77b65"/>
  </g>
  <g v-if="decor>=12">
   <path d="M106 262h136v12H106z" fill="#cfb28b"/><path d="M112 274v14m123-14v14" stroke="#846b55" stroke-width="5"/>
   <path d="M118 258v-18q0-11 11-11h22q11 0 11 11v18m29 0v-18q0-11 11-11h22q11 0 11 11v18" fill="#a7b9a0" stroke="#7f9785" stroke-width="3"/>
   <path d="M124 252h32m39 0h32" stroke="#e9dabe" stroke-width="3"/>
   <g v-for="i in 6" :key="i"><circle :cx="480+(i*31%190)" :cy="72+(i*43%71)" r="3.5" :fill="i%2?'#d8ae71':'#f1dfac'"/><circle :cx="480+(i*31%190)" :cy="72+(i*43%71)" r="8" fill="#e4ca9166"/></g>
   <path d="M561 155l-4-50m0 25q-25-25-33-14 7 17 33 18m0-19q9-22 20-17 2 14-20 24" fill="#749471"/>
   <path d="M546 155h31l-5 17h-21z" fill="#ba8065"/>
  </g>
 </g>
 <g v-else>
  <rect width="800" height="340" fill="#d9cab2"/><rect y="222" width="800" height="118" fill="#bb9d85"/>
  <path v-for="i in 22" :key="i" :d="`M${i*39} 0v220`" stroke="#bcad96" opacity=".4"/>
  <rect x="390" y="48" width="252" height="85" rx="4" fill="#657e72" stroke="#e8d6b4" stroke-width="7"/>
  <text x="516" y="95" fill="#f8edcd" text-anchor="middle" font-size="18" letter-spacing="3">{{ scene==='desk'?'VILLA BIGOTES':'MERCADO' }}</text>
  <path d="M300 164h429v84H300z" fill="#ac816e"/><path d="M290 158h449v12H290z" fill="#785d54"/>
  <g v-if="scene==='desk'"><path d="M479 155a16 16 0 0 1 32 0z" fill="#d3b773"/><path d="M495 137v-4" stroke="#796542" stroke-width="3"/></g>
  <g v-else><circle v-for="i in 15" :key="i" :cx="412+(i%8)*18" :cy="151-Math.floor(i/8)*11" r="9" fill="#df985a"/></g>
 </g>
 <Finishing v-if="scene!=='room'" :scene="scene" :night="night"/>
 <g v-if="scene==='cafe'"><path d="M80 55h280v14H80z" fill="#957c70"/><path v-if="night" d="M80 65h280v85H80z" fill="url(#boards)"/><g v-else-if="day>1"><rect x="153" y="167" width="19" height="16" rx="3" fill="#fff1cb"/><path d="M160 167v-21" stroke="#739578"/><circle cx="160" cy="146" r="5" fill="#dca1a2"/></g></g>
 <g v-if="bag"><path d="M530 250l35 6-9 19-35-9z" fill="#a78860"/><circle v-for="i in 4" :key="i" :cx="540+i*10" :cy="269+i%2*5" r="5" fill="#d98e43"/></g>
 <rect width="800" height="340" fill="url(#paper)" pointer-events="none"/>
 <g v-if="rainy" stroke="#dcecf4" opacity=".65"><path v-for="i in 66" :key="i" :d="`M${i*137%800} ${i*71%340}l-4 9`"/></g>
 <g v-if="greenhouse"><path d="M85 258V87L396 18l319 69v171z" fill="#c9e1cd" fill-opacity=".88" stroke="#749184" stroke-width="8"/><path d="M85 87l630 0M396 18v238m-170-54V58m323 144V58" fill="none" stroke="#88a69a" stroke-width="5"/><use v-for="i in 7" :key="i" href="#fern" :transform="`translate(${i*73+86} 231)`"/></g>
 <g v-if="scene==='garden'&&plant" transform="translate(376 245)"><ellipse rx="19" ry="6" fill="#967155"/><path v-if="plant>=2" d="M0 0q-4-10 0-23m-1 14q-15 1-14-9 11-1 14 9" fill="#6f9972" stroke="#599277"/><g v-if="plant===3"><ellipse v-for="i in 6" :key="i" cx="0" cy="-29" rx="3" ry="6" :transform="`rotate(${i*60} 0 -23)`" fill="#fff4cc"/><circle cy="-23" r="4" fill="#dba74f"/></g></g>
 <g v-for="r in furniture" :key="r.x" :transform="`translate(${r.x*8} ${r.y*3.4})`"><g v-if="scene==='cafe'"><path d="M-32 0v-25m63 25v-25" stroke="#8c6955" stroke-width="6"/><ellipse cy="-29" rx="46" ry="12" fill="#bc906d" stroke="#926d59"/><path d="M-8-42h14v13H-8z" fill="#fff4d9"/></g><use v-else href="#fern"/></g>
</svg>
</template>
