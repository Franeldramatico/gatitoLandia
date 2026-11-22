<script setup>defineProps({scene:String,night:Boolean})</script>
<template>
 <g v-if="['air','rail','cover'].includes(scene)">
  <g v-if="!night" opacity=".83"><use href="#cloud" transform="translate(93 46) scale(1.3)"/><use href="#cloud" transform="translate(356 63) scale(.67)"/><use href="#cloud" transform="translate(657 37)"/></g>
  <g v-if="scene==='cover'"><use href="#facade" transform="translate(390 65) scale(.78)"/><use href="#facade" transform="translate(490 7) scale(1.24)"/><use href="#awning" transform="translate(514 195) scale(.48)"/><use href="#fern" transform="translate(738 245) scale(1.5)"/></g>
  <g v-else-if="scene==='air'">
   <path d="M0 248h800v92H0" fill="#c7bba5"/><path d="M0 262h800m-800 8h800" stroke="#f6e7be" stroke-width="2"/><path d="M0 316h800" stroke="#eee0bc" stroke-width="5" stroke-dasharray="59 30"/>
   <g transform="translate(54 110)"><path d="M10 113l6-72h21l7 72z" fill="#d9c9aa"/><path d="M8 41 0 24h54l-8 17z" fill="url(#glass)" stroke="#66817d" stroke-width="2"/><path d="M-5 21h64l-8-6H5z" fill="#6d8a81"/><path d="M27 15V0" stroke="#6c7468"/></g>
   <path d="M668 219h132v-66q-92-11-132 66z" fill="url(#glass)" stroke="#faf1d7" stroke-width="4"/><path d="M707 173v45m41-59v59m39-62v62" stroke="#f0e6cd" stroke-width="3"/>
  </g>
  <g v-else>
   <path d="M0 0h800v13H0zM23 12h7v216h-7zm717 0h7v216h-7z" fill="#414b60"/><path d="M27 55q6-34 48-42M743 55q-10-34-52-42" fill="none" stroke="#576176" stroke-width="4"/>
   <use v-for="i in 3" :key="i" href="#lamp" :transform="`translate(${i*223-75} 39)`"/><path d="M0 268h800" stroke="#dcc29b" stroke-width="3" stroke-dasharray="3 6"/>
   <path d="M0 281h800v59H0" fill="url(#tiles)" opacity=".55"/><use href="#poster" transform="translate(688 132) scale(.9)"/>
  </g>
 </g>
 <g v-else-if="scene==='room'">
  <path d="M0 275l150-62h650v127H0" fill="url(#boards)"/><path d="M0 274l149-62h651" fill="none" stroke="#f3dfbc" stroke-width="6"/>
  <path d="M380 152l-118 140h182l117-140z" fill="url(#light)"/><path d="M369 156h202" stroke="#94785f" stroke-width="5"/>
  <path d="M379 43h182v7H379z" fill="#ab8c71"/><path d="M386 53l-11 78m28-78-11 62" stroke="#f8f0d2" opacity=".55" stroke-width="4"/>
  <use href="#lamp" transform="translate(277 38) scale(1.1)"/>
 </g>
 <g v-else-if="['market','desk'].includes(scene)">
  <rect x="0" width="276" height="222" fill="url(#plaster)"/><rect width="276" height="222" fill="url(#brocade)"/>
  <use href="#window" transform="translate(46 55) scale(2.3)"/><path d="M0 249h800v91H0z" fill="url(#tiles)"/><use href="#fern" transform="translate(211 231)"/>
  <g v-for="i in 4" :key="i"><rect :x="310+(i-1)*104" y="175" width="93" height="60" rx="3" fill="none" stroke="#d5ae8d" stroke-width="2"/><rect :x="316+(i-1)*104" y="180" width="81" height="49" rx="2" fill="none" stroke="#956f5e"/></g>
  <use href="#lamp" transform="translate(483 30)"/><use href="#lamp" transform="translate(630 30)"/>
  <g v-if="scene==='market'"><use href="#awning" transform="translate(364 18) scale(2.25 1.1)"/><g v-for="i in 3" :key="i"><path :d="`M${548+i*30} 154q-4-33 7-42 14-3 12 42z`" fill="#ddb37a" stroke="#b88560"/><path :d="`M${551+i*30} 134l9-6m-9 14 9-6`" stroke="#f6d99e" stroke-width="3"/></g></g>
  <g v-else><use href="#poster" transform="translate(316 70)"/><path d="M667 146h48v8h-48zm5-9h44v6h-44z" fill="#657f74"/><circle cx="257" cy="60" r="19" fill="#fcf1d8" stroke="#9c8063" stroke-width="3"/><path d="M257 48v12l8 4" fill="none" stroke="#796a54" stroke-width="2"/></g>
 </g>
 <g v-else-if="scene==='hall'">
  <path d="M0 222h800v118H0" fill="url(#tiles)"/><path d="M258 222h288l84 118H164z" fill="#a87468"/><path d="M268 224l-81 116m345-116 76 116" stroke="#e7c699" stroke-width="3"/>
  <g v-for="x in [60,585]" :key="x" :transform="`translate(${x} 48)`"><rect x="14" y="12" width="112" height="66" fill="none" stroke="#d7dec1" stroke-width="2"/><rect x="16" y="88" width="108" height="77" fill="none" stroke="#65877a" stroke-width="2"/><path d="M20 2q48-25 99 0" fill="#ae9578"/></g>
  <use href="#fern" transform="translate(246 229) scale(.8)"/><use href="#lamp" transform="translate(408 29)"/><use href="#poster" transform="translate(498 87) scale(.82)"/>
 </g>
 <g v-else-if="scene==='cafe'">
  <use href="#awning" transform="translate(72 27) scale(2 1.05)"/><path d="M0 238h800v102H0z" fill="url(#boards)"/>
  <g v-for="x in [125,276]" :key="x"><path :d="`M${x} 182v47m-16 0h32`" stroke="#766451" stroke-width="4"/><ellipse :cx="x" cy="181" rx="37" ry="7" fill="#b48869"/><path :d="`M${x-6} 167h12v11h-12z`" fill="#fff1d3"/></g>
  <use href="#poster" transform="translate(390 81)"/><use href="#lamp" transform="translate(545 42)"/><use href="#lamp" transform="translate(668 42)"/><use href="#fern" transform="translate(740 243)"/>
 </g>
 <g v-else-if="scene==='roof'">
  <path d="M0 229h800v111H0z" fill="url(#boards)" opacity=".68"/><g fill="#faf1c5"><circle v-for="i in 35" :key="i" :cx="i*117%800" :cy="i*73%115" :r="i%3*.4+.55"/></g>
  <path d="M85 115l19-17 23 5 15-23" fill="none" stroke="#f7dfad" stroke-width=".8" stroke-dasharray="2 3"/><use href="#fern" transform="translate(49 218)"/><use href="#fern" transform="translate(747 220) scale(.8)"/>
  <g transform="translate(570 182) rotate(-21)"><path d="M0 0l-16-25 19-15 14 25z" fill="#d89b83"/><path d="M0 0l3-40m-19 15 33 10" stroke="#ffe5be" fill="none"/><path d="M0 0q7 17-6 27" stroke="#886f70" fill="none"/></g>
 </g>
 <g v-else-if="scene==='garden'">
  <use href="#cloud" transform="translate(358 43)"/><use href="#cloud" transform="translate(52 56) scale(.73)"/>
  <use href="#awning" transform="translate(135 125) scale(.35)"/><use href="#awning" transform="translate(289 125) scale(.35)"/>
  <path d="M48 208q76-21 144-7m88 4q77-18 113-15" stroke="#7da279" stroke-width="9" fill="none"/>
  <g v-for="i in 38" :key="i" :transform="`translate(${(i*113)%800} ${258+i*29%80}) scale(${.45+i%4*.12})`"><path d="M0 1q-1 7 2 11" fill="none" stroke="#688564" stroke-width="2"/><g fill="#fbdfbc"><ellipse cy="-3" rx="2" ry="3"/><ellipse cx="3" rx="3" ry="2"/><ellipse cx="-3" rx="3" ry="2"/></g><circle r="1.8" fill="#c69555"/></g>
 </g>
</template>
