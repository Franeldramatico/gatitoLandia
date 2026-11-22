<script setup>defineProps({place:String})</script>
<template>
  <g v-if="place==='lobby'">
    <rect width="800" height="340" fill="url(#plaster)"/><rect width="800" height="140" fill="url(#brocade)"/><path d="M0 142h800v80H0" fill="#b5bca2"/><path d="M0 142h800" stroke="#ece0c2" stroke-width="5"/><path d="M0 220h800v120H0" fill="#c5b099"/>
    <g v-for="(x,i) in [60,585]" :key="x" :transform="`translate(${x} 48)`">
      <rect width="140" height="177" rx="6" fill="#8d725c"/><rect x="7" y="7" width="126" height="170" fill="#94ac99"/>
      <text x="70" y="51" text-anchor="middle" fill="#374c41" font-size="24">{{ i?18:15 }}</text><circle cx="112" cy="102" r="6" fill="#f6d68e"/>
    </g>
    <rect x="335" y="42" width="134" height="182" rx="4" fill="#887f76"/><path d="M343 51h118v170H343z" fill="#bbc3bd"/><path d="M402 51v170" stroke="#747e79"/><rect x="384" y="20" width="36" height="15" rx="4" fill="#49584e"/><text x="402" y="32" text-anchor="middle" fill="#ffdc99">▲</text>
    <ellipse cx="403" cy="264" rx="142" ry="23" fill="#ad826c"/>
  </g>
  <g v-else-if="place==='cafe'">
    <rect width="800" height="340" fill="#f4d7be"/><rect y="212" width="800" height="128" fill="#cbac8f"/>
    <rect x="80" y="41" width="280" height="124" rx="10" fill="#b7d6cb" stroke="#916f5b" stroke-width="7"/>
    <path v-for="i in 8" :key="i" :d="`M${42+i*36} 30h36l5 40q-21 15-41 0z`" :fill="i%2?'#c47b70':'#fff0cb'"/>
    <rect x="470" y="120" width="275" height="100" rx="8" fill="#9f7965"/><rect x="457" y="112" width="300" height="14" rx="6" fill="#684f45"/>
    <g v-for="x in [520,580,640]" :key="x"><rect :x="x" y="90" width="24" height="22" rx="6" fill="#fff4d9"/><circle :cx="x+24" cy="99" r="6" fill="none" stroke="#fff4d9" stroke-width="4"/></g>
  </g>
  <g v-else>
    <rect width="800" height="340" fill="url(#dusk)"/><circle cx="650" cy="53" r="37" fill="#fff1c2" opacity=".12"/><circle cx="650" cy="53" r="26" fill="#ffe8b5"/>
    <g v-for="i in 14" :key="i"><rect :x="i*64-68" :y="95+i*19%80" width="62" height="120" fill="#697993"/><rect :x="i*64-45" :y="110+i*19%80" width="9" height="12" fill="#edd7ab"/></g>
    <rect y="202" width="800" height="138" fill="#bfaaa0"/><path d="M0 157H800M0 200H800" stroke="#676b76" stroke-width="6"/>
    <path v-for="i in 16" :key="i" :d="`M${i*50} 157v45`" stroke="#676b76" stroke-width="4"/>
    <path d="M0 10Q400 110 800 10" fill="none" stroke="#545562" stroke-width="2"/>
    <circle v-for="i in 15" :key="i" :cx="i*50" :cy="14+200*(i/16)*(1-i/16)" r="4" fill="#fff1ba"/>
  </g>
</template>
