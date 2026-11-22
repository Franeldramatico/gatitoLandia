<script setup>
defineProps({ place: String, period: { type: Number, default: 0 } })
</script>

<template>
  <!-- Hallway / Lobby -->
  <g v-if="place === 'lobby'">
    <rect width="800" height="340" fill="url(#plaster)" />
    <rect width="800" height="142" fill="url(#brocade)" />
    <!-- Crown Ceiling Trim -->
    <rect width="800" height="8" fill="#dfd0b2" />
    <path d="M0 8h800" stroke="#bba889" stroke-width="1.2" />

    <path d="M0 142h800v80H0Z" fill="url(#sageWall)" />
    <path d="M0 142h800" stroke="#fbf1d9" stroke-width="5" />
    <path d="M0 140h800" stroke="#fff9eb" stroke-width="1" opacity=".55" />
    <path d="M0 146h800" stroke="#85967e" stroke-width="1.5" />
    <rect x="0" y="216" width="800" height="7" fill="#9c8067" />
    <path d="M0 216h800" stroke="#e4cfb1" stroke-width="1" opacity=".5" />
    <!-- Subtle Plaster Hairlines -->
    <path d="M18 72q14-3 26 2M734 86q12 4 22-1" fill="none" stroke="#9e8669" stroke-width=".7" opacity=".45" />

    <g fill="none" stroke="#8a9d85" stroke-width="1.5" opacity=".7">
      <rect x="18" y="156" width="32" height="50" rx="2" />
      <rect x="218" y="156" width="98" height="50" rx="2" />
      <rect x="488" y="156" width="80" height="50" rx="2" />
      <rect x="742" y="156" width="42" height="50" rx="2" />
    </g>
    <path d="M0 222h800v118H0Z" fill="url(#tiles)" />

    <!-- Warm Brass Wall Sconces -->
    <g v-for="sx in [266, 528]" :key="sx" :transform="`translate(${sx} 102)`">
      <circle class="lamp-halo" cy="4" r="28" fill="url(#lampGlow)" />
      <path d="M-2 0h4v12h-4Z" fill="#9a753d" />
      <path d="M-9 2l3-10h12l3 10Z" fill="#fff0be" stroke="#b59052" stroke-width="1.2" />
    </g>

    <!-- Doormats (Depto 15 & 18) -->
    <g transform="translate(88 228)">
      <path d="M6 0h76l10 14H-4Z" fill="#5e7f70" stroke="#425e52" stroke-width="1.2" />
      <path d="M12 4h64l6 6H6Z" fill="none" stroke="#c8d6c2" stroke-width="1" stroke-dasharray="3 2" />
    </g>
    <g transform="translate(612 228)">
      <path d="M6 0h76l10 14H-4Z" fill="#b8715f" stroke="#7d4a3d" stroke-width="1.2" />
      <path d="M12 4h64l6 6H6Z" fill="none" stroke="#f2d5bd" stroke-width="1" stroke-dasharray="3 2" />
    </g>

    <!-- Apartment Doors 15 and 18 -->
    <g v-for="(x, i) in [60, 585]" :key="x" :transform="`translate(${x} 46)`">
      <rect x="3" y="4" width="142" height="176" rx="6" fill="#423631" opacity=".16" />
      <rect width="142" height="178" rx="6" fill="#886a54" stroke="#624b3c" stroke-width="1.5" />
      <rect x="8" y="8" width="126" height="170" rx="3" fill="#89a693" stroke="#6c8976" stroke-width="1.5" />
      <rect x="18" y="18" width="106" height="68" rx="2" fill="#94b09e" stroke="#6f8d79" stroke-width="1.5" />
      <rect x="18" y="96" width="106" height="70" rx="2" fill="#94b09e" stroke="#6f8d79" stroke-width="1.5" />
      <rect x="48" y="28" width="46" height="26" rx="4" fill="url(#gold)" stroke="#8c6936" stroke-width="1.2" />
      <text x="71" y="47" text-anchor="middle" fill="#354239" font-size="18" font-weight="700" font-family="Fraunces, Georgia, serif">{{ i ? 18 : 15 }}</text>
      <circle cx="71" cy="70" r="3" fill="#4f5f56" stroke="#e4c587" stroke-width="1.2" />
      <rect x="49" y="128" width="44" height="8" rx="2" fill="url(#gold)" stroke="#886634" stroke-width="1" />
      <circle cx="112" cy="104" r="6" fill="url(#gold)" stroke="#886634" stroke-width="1.2" />
    </g>

    <!-- Art Deco Elevator -->
    <g transform="translate(333 40)">
      <rect x="3" y="4" width="136" height="180" rx="5" fill="#3f3a35" opacity=".16" />
      <rect width="136" height="184" rx="4" fill="#7c756d" stroke="#57514b" stroke-width="1.6" />
      <rect x="9" y="9" width="118" height="173" fill="#b4bdb7" stroke="#5b6660" stroke-width="1.5" />
      <path d="M68 9v173" stroke="#5e6862" stroke-width="2.5" />
      <rect x="22" y="26" width="34" height="58" rx="2" fill="#c7d5d0" stroke="#75847e" stroke-width="1.5" />
      <rect x="80" y="26" width="34" height="58" rx="2" fill="#c7d5d0" stroke="#75847e" stroke-width="1.5" />
      <!-- Angled Elevator Glass Reflections -->
      <path d="M25 46l18-17h8L25 56Zm58 2 20-19h7L83 56Z" fill="#fffaf0" opacity=".42" />
      <path d="M40-20h56a6 6 0 0 1 6 6v14H34v-14a6 6 0 0 1 6-6Z" fill="#42544a" stroke="#c8a86b" stroke-width="1.5" />
      <path d="M68-14l-6 8h12Z" fill="#ffdf94" />
      <rect x="142" y="98" width="12" height="24" rx="3" fill="url(#gold)" stroke="#8a6835" stroke-width="1" />
      <circle cx="148" cy="110" r="2.6" fill="#fff5cc" />
    </g>

    <ellipse cx="403" cy="272" rx="146" ry="25" fill="#4e3d35" opacity=".14" />
    <ellipse cx="403" cy="270" rx="142" ry="23" fill="url(#terracotta)" stroke="#f0d5ab" stroke-width="2.5" />
    <ellipse cx="403" cy="270" rx="122" ry="16" fill="none" stroke="#f5dfbb" stroke-width="1.2" stroke-dasharray="4 3" />
  </g>

  <!-- Neighborhood Café -->
  <g v-else-if="place === 'cafe'">
    <rect width="800" height="340" fill="#f5dec6" />
    <rect width="800" height="8" fill="#dfd0b2" />
    <rect y="150" width="800" height="70" fill="#dcc3a3" />
    <path d="M0 150h800" stroke="#fbf1d9" stroke-width="4" />
    <path d="M0 148h800" stroke="#fff9eb" stroke-width="1" opacity=".55" />
    <rect y="218" width="800" height="122" fill="url(#boards)" />

    <!-- Large Café Front Window (Period-aware exterior view) -->
    <g transform="translate(80 41)">
      <rect width="280" height="128" rx="12" :fill="period === 2 ? 'url(#nightGlass)' : period === 1 ? 'url(#sunsetGlass)' : 'url(#glass)'" stroke="#866451" stroke-width="7" />
      <circle v-if="period === 2" cx="220" cy="34" r="10" fill="#fff2c2" opacity=".85" />
      <!-- Exterior Streetlamp & Trees -->
      <path d="M252 128V52" stroke="#455359" stroke-width="3" opacity=".55" />
      <circle v-if="period >= 1" class="lamp-halo" cx="252" cy="48" r="16" fill="url(#lampGlow)" />
      <circle cx="252" cy="48" r="4" fill="#ffefc2" opacity=".88" />
      <path d="M22 128V20a18 18 0 0 1 36 0v108" :fill="period === 2 ? '#364b4b' : '#89aa8a'" opacity=".28" />
      <circle cx="96" cy="96" r="28" :fill="period === 2 ? '#35494a' : '#799c7c'" opacity=".34" />
      <path d="M140 0v128M0 64h280" stroke="#f8edd2" stroke-width="3" />
      <path d="M18 22 68 0h26L18 46Zm96 68 88-68h24l-88 68Z" fill="#fffaf0" opacity=".28" />
    </g>
    <!-- Sunbeam in Daytime Café -->
    <path v-if="period < 2" d="M84 168l-65 112h280l60-112Z" fill="url(#light)" :opacity="period === 1 ? 0.8 : 0.6" />

    <!-- Chalkboard Menu -->
    <g transform="translate(382 48)">
      <rect width="70" height="96" rx="3" fill="#7c5d49" />
      <rect x="5" y="5" width="60" height="86" fill="#3a4c44" />
      <path d="M14 20h42M14 34h32M14 48h38M14 62h24M14 74h34" stroke="#f3e6c8" stroke-width="2" stroke-linecap="round" opacity=".78" />
      <circle cx="52" cy="70" r="4.5" fill="none" stroke="#f3c584" stroke-width="1.3" opacity=".8" />
    </g>

    <!-- Back Bar Timber Shelf & Labeled Jars -->
    <g transform="translate(476 62)">
      <rect x="0" y="18" width="246" height="6" rx="2" fill="url(#shelfWood)" stroke="#624433" stroke-width="1" />
      <path d="M22 24v8m198-8v8" stroke="#624433" stroke-width="3" stroke-linecap="round" />
      <!-- Jars & Tea Tins with Mini Labels & Wax Seals -->
      <rect x="16" y="-4" width="16" height="22" rx="3" fill="#7ea390" stroke="#537263" stroke-width="1" />
      <rect x="19" y="4" width="10" height="6" rx="1" fill="#fcf3dc" />
      <circle cx="24" cy="-5" r="2.2" fill="#b65d43" />
      <rect x="38" y="0" width="14" height="18" rx="3" fill="#e5b877" stroke="#9e7642" stroke-width="1" />
      <rect x="41" y="6" width="8" height="5" rx="1" fill="#fcf3dc" />
      <rect x="58" y="-6" width="16" height="24" rx="4" fill="#df9b7a" stroke="#9b5f48" stroke-width="1" />
      <rect x="61" y="3" width="10" height="7" rx="1" fill="#fcf3dc" />
      <circle cx="66" cy="-7" r="2.3" fill="#9a4434" />
      <rect x="150" y="2" width="13" height="16" rx="2" fill="#fcf3dc" stroke="#b99c7b" stroke-width="1" />
      <path d="M153 8h7" stroke="#b65d43" stroke-width="1.2" />
      <rect x="168" y="2" width="13" height="16" rx="2" fill="#fcf3dc" stroke="#b99c7b" stroke-width="1" />
      <path d="M171 8h7" stroke="#5e7f70" stroke-width="1.2" />
      <path d="M204 18l4-18h10l4 18Z" fill="#a2c4bc" opacity=".82" stroke="#658880" stroke-width="1" />
    </g>

    <!-- Espresso Counter -->
    <g transform="translate(462 114)">
      <rect x="4" y="8" width="282" height="104" rx="6" fill="url(#walnut)" stroke="#5c4136" stroke-width="1.5" />
      <rect x="20" y="28" width="74" height="68" rx="3" fill="none" stroke="#c39270" stroke-width="1.5" opacity=".55" />
      <rect x="108" y="28" width="74" height="68" rx="3" fill="none" stroke="#c39270" stroke-width="1.5" opacity=".55" />
      <rect x="196" y="28" width="74" height="68" rx="3" fill="none" stroke="#c39270" stroke-width="1.5" opacity=".55" />
      <rect x="-6" y="-4" width="304" height="14" rx="5" fill="#f7ebd2" stroke="#856855" stroke-width="1.5" />
      <!-- Warm Nocturnal Rim on Counter Edge -->
      <path v-if="period >= 1" d="M-2-4h296" stroke="#ffdf9e" stroke-width="1.6" opacity=".62" />
      <rect x="198" y="-46" width="58" height="42" rx="4" fill="#c9ab78" stroke="#755c3c" stroke-width="1.5" />
      <rect x="206" y="-36" width="42" height="14" rx="2" fill="#4f6d63" />
      <circle cx="216" cy="-29" r="3" fill="#fff1c4" />
      <circle cx="238" cy="-29" r="3" fill="#fff1c4" />
      <g v-for="cx in [46, 92]" :key="cx">
        <rect :x="cx" y="-22" width="20" height="18" rx="4" fill="#fff6df" stroke="#b99c7b" stroke-width="1.2" />
        <path :d="`M${cx+20} -18a5 5 0 0 1 0 10`" fill="none" stroke="#fff6df" stroke-width="3" />
        <path class="steam" :d="`M${cx+7} -27q2-4 0-7m6 7q2-4 0-7`" fill="none" :stroke="period === 2 ? '#d7e3f5' : period === 1 ? '#ffe4bd' : '#ffffff'" stroke-width="1.4" opacity=".75" />
      </g>
      <path d="M138 -4a22 22 0 0 1 44 0Z" fill="#dcece7" fill-opacity=".65" stroke="#fff6df" stroke-width="1.5" />
      <!-- Angled Pastry Cloche Reflection -->
      <path d="M144 -10q8-12 18-13" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".55" />
      <circle cx="160" cy="-28" r="3" fill="#e6c483" />
      <ellipse cx="160" cy="-10" rx="11" ry="5" fill="#cf8a56" />
    </g>
  </g>

  <!-- Rooftop Terrace -->
  <g v-else>
    <rect width="800" height="340" :fill="period === 2 ? 'url(#dusk)' : period === 1 ? 'url(#sunsetSky)' : 'url(#sky)'" />
    <circle class="sun-halo" cx="650" cy="54" r="70" :fill="period === 2 ? 'url(#moonGlow)' : 'url(#sunGlow)'" />
    <circle cx="650" cy="54" r="25" :fill="period === 2 ? '#fff4cf' : '#fff5ca'" />
    <g v-if="period === 2">
      <circle cx="642" cy="48" r="4" fill="#e8d8ab" opacity=".45" />
      <circle cx="658" cy="60" r="6" fill="#e8d8ab" opacity=".35" />
    </g>

    <!-- Distant Rooftop Water Tower -->
    <g transform="translate(86 64)" :opacity="period === 2 ? .55 : .42" :fill="period === 2 ? '#4a5a75' : '#859b99'">
      <path d="M4 62l8-28m22 28-8-28M10 48h18" stroke="currentColor" stroke-width="2" />
      <rect x="6" y="10" width="26" height="24" rx="2" />
      <path d="M3 10 19 0l16 10Z" />
    </g>

    <!-- Distant TV Antennas & Terrace Clothesline -->
    <g :stroke="period === 2 ? '#45546e' : '#7b9294'" stroke-width="1.4" stroke-linecap="round" opacity=".7">
      <path d="M292 96V74m-9 6 18-3m-15 8 12-2" />
      <path d="M738 104V84m-8 5 16-3" />
      <path d="M326 116q47 11 94-2" fill="none" stroke-width="1.1" />
      <path d="M342 120l2 9h8l-1-9Zm24 2v11h10l-1-10Z" :fill="period === 2 ? '#596b88' : '#e6d8be'" stroke="none" opacity=".7" />
    </g>

    <g :fill="period === 2 ? '#4f5f7a' : period === 1 ? '#7d7f91' : '#8da7a5'">
      <rect x="10" y="102" width="54" height="110" />
      <path d="M120 120 152 90l32 30v90h-64Z" />
      <rect x="260" y="96" width="66" height="115" />
      <rect x="420" y="112" width="58" height="100" />
      <path d="M555 110 590 84l35 26v100h-70Z" />
      <rect x="705" y="104" width="68" height="108" />
    </g>
    <!-- Period-Tinted Chimney Smoke Wisps -->
    <g class="smoke-wisp" :fill="period === 2 ? '#c8d6ef' : period === 1 ? '#f8c8bc' : '#fff7e2'" opacity=".34">
      <circle cx="276" cy="82" r="5" /><circle cx="282" cy="70" r="7" />
    </g>
    <g v-for="i in 12" :key="i">
      <rect :x="i*68-42" :y="112+(i*23)%65" width="56" height="112" :fill="period === 2 ? '#637490' : period === 1 ? '#8f8c96' : '#9bb3b0'" />
      <rect :class="{ 'window-pulse': period === 2 && i % 4 === 0 }" :x="i*68-28" :y="124+(i*23)%65" width="9" height="12" rx="1" fill="#f7dca4" :opacity="period === 2 ? .9 : .55" />
      <rect :x="i*68-10" :y="124+(i*23)%65" width="9" height="12" rx="1" fill="#f7dca4" :opacity="period === 2 ? .6 : .4" />
      <rect :class="{ 'window-pulse': period === 2 && i % 3 === 1 }" :x="i*68-28" :y="146+(i*23)%65" width="9" height="12" rx="1" fill="#f7dca4" :opacity="period === 2 ? .7 : .45" />
    </g>

    <rect y="202" width="800" height="138" fill="#baa59b" />
    <rect y="198" width="800" height="10" fill="#a28b80" />
    <path d="M0 158h800M0 198h800" stroke="#585e6b" stroke-width="5" />
    <path v-for="i in 17" :key="'r' + i" :d="`M${(i-1)*50} 158v40`" stroke="#585e6b" stroke-width="3.5" />

    <!-- Festoon Fairy Lights -->
    <path d="M0 12Q400 108 800 12" fill="none" stroke="#484b58" stroke-width="2" />
    <g v-for="i in 15" :key="'l' + i">
      <circle v-if="period >= 1" class="lamp-halo" :cx="i*50" :cy="16+192*(i/16)*(1-i/16)" r="16" fill="url(#lampGlow)" />
      <circle :cx="i*50" :cy="16+192*(i/16)*(1-i/16)" r="4.2" fill="#fff2bc" />
    </g>
  </g>
</template>
