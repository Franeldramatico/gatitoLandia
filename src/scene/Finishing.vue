<script setup>
defineProps({ scene: String, night: Boolean, period: { type: Number, default: 0 }, rainy: Boolean })
</script>

<template>
  <!-- Arrival & Cover Exteriors -->
  <g v-if="['air', 'rail', 'cover'].includes(scene)">
    <g v-if="!night" opacity=".88">
      <use class="cloud-drift" href="#cloud" transform="translate(93 46) scale(1.3)" />
      <use class="cloud-drift slow" href="#cloud" transform="translate(356 63) scale(.67)" />
      <use class="cloud-drift" href="#cloud" transform="translate(657 37)" />
    </g>

    <g v-if="scene === 'cover'">
      <use href="#facade" transform="translate(390 65) scale(.78)" />
      <use href="#facade" transform="translate(490 7) scale(1.24)" />
      <use href="#awning" transform="translate(514 195) scale(.48)" />
      <use href="#fern" transform="translate(738 245) scale(1.5)" />
    </g>

    <!-- Airport Runway, Control Tower & Terminal -->
    <g v-else-if="scene === 'air'">
      <!-- Distant Airfield Horizon Silhouettes -->
      <path d="M0 226h800v22H0Z" fill="#a8b4ab" opacity=".45" />
      <path d="M460 226l14-18h8v18Zm18 0 11-14h6v14Z" fill="#899890" opacity=".6" />
      <path d="M0 248h800v92H0Z" fill="#c7bba6" />
      <path d="M0 262h800m-800 8h800" stroke="#f7ead0" stroke-width="2" opacity=".85" />
      <path d="M0 316h800" stroke="#f1e4c4" stroke-width="5" stroke-dasharray="59 30" />
      <!-- Runway Approach Lights -->
      <g v-for="(lx, idx) in [140, 260, 380, 500, 620]" :key="lx">
        <circle class="lamp-halo" :style="{ animationDelay: `${idx * 0.25}s` }" :cx="lx" cy="254" r="9" fill="url(#lampGlow)" />
        <circle :cx="lx" cy="254" r="2.6" fill="#ffe799" />
      </g>
      <!-- Control Tower -->
      <g transform="translate(52 104)">
        <path d="M12 120l6-74h22l6 74Z" fill="#ded0b4" stroke="#998a71" stroke-width="1.3" />
        <path d="M15 72h20m-22 24h24" stroke="#b3a286" stroke-width="1.2" />
        <path d="M8 46 0 27h56l-8 19Z" fill="url(#glass)" stroke="#5b7571" stroke-width="2" />
        <path d="M12 45 20 29h6L18 45Z" fill="#fffaf0" opacity=".4" />
        <path d="M14 46l4-19m20 0 4 19" stroke="#f7eed7" stroke-width="1.5" />
        <path d="M-5 24h66l-8-7H3Z" fill="#5e7c74" stroke="#455c56" stroke-width="1.2" />
        <path d="M28 17V2" stroke="#626b62" stroke-width="2" />
        <ellipse class="radar-spin" cx="28" cy="6" rx="8" ry="2.6" fill="none" stroke="#626b62" stroke-width="1.4" />
        <circle class="beacon-blink" cx="28" cy="1" r="2.8" fill="#e27a66" />
      </g>
      <!-- Curved Glass Terminal Canopy -->
      <g>
        <path d="M664 222h136v-72q-96-12-136 72Z" fill="url(#glass)" stroke="#faf1d7" stroke-width="4" />
        <path d="M676 218 712 162h16l-36 56Z" fill="#fffaf0" opacity=".28" />
        <path d="M707 171v51m41-63v63m39-66v66" stroke="#f2e8cf" stroke-width="3" />
        <path d="M664 222h136v7H664Z" fill="#9a8b77" />
      </g>
      <!-- Franxito's Travel Suitcase -->
      <g transform="translate(274 256)">
        <ellipse :cx="period === 1 ? 22 : 17" cy="24" rx="20" ry="3.5" fill="#463a33" opacity=".18" />
        <rect width="34" height="24" rx="4" fill="#5a7d72" stroke="#39534b" stroke-width="1.5" />
        <path d="M11 0v-5h12v5" fill="none" stroke="#473c33" stroke-width="2.2" />
        <path d="M8 0v24M26 0v24" stroke="#d9b778" stroke-width="1.5" />
      </g>
    </g>

    <!-- Midnight Station Canopy, Brick Arcade, Clock, Bench & Luggage -->
    <g v-else>
      <!-- Station Back Arcade & Tiled Dado behind Platform -->
      <rect x="28" y="14" width="714" height="214" fill="#323b50" opacity=".78" />
      <rect x="28" y="14" width="714" height="148" fill="url(#brick)" opacity=".45" />
      <g v-for="ax in [68, 228, 388, 548]" :key="ax">
        <path :d="`M${ax} 228V104a54 54 0 0 1 108 0v124Z`" fill="#262f42" stroke="#48536a" stroke-width="2" />
        <path :d="`M${ax + 12} 228V112a42 42 0 0 1 84 0v116Z`" fill="#1e2637" opacity=".7" />
      </g>
      <rect x="28" y="168" width="714" height="60" fill="#465359" opacity=".82" />
      <path d="M28 168h714" stroke="#8b9997" stroke-width="2.5" />

      <path d="M0 0h800v14H0Z" fill="#3b4459" />
      <path d="M23 14h8v214h-8Zm716 0h8v214h-8Z" fill="#3f495f" />
      <path d="M27 56q6-35 49-42M743 56q-10-35-53-42" fill="none" stroke="#5a657d" stroke-width="4" />
      <path d="M31 14q360 18 708 0" fill="none" stroke="#4f5970" stroke-width="2.5" />
      <use v-for="i in 3" :key="i" href="#lamp" :transform="`translate(${i * 223 - 75} 40)`" />

      <!-- Hanging Station Signboard & 00:18 Clock -->
      <g transform="translate(476 26)">
        <g class="pendulum-sway">
          <path d="M12 -12v12m88 -12v12" stroke="#4a5368" stroke-width="2" />
          <rect width="112" height="24" rx="4" fill="#384949" stroke="#d9b879" stroke-width="1.5" />
          <text x="56" y="16" text-anchor="middle" fill="#fff2cf" font-size="9.5" font-weight="700" letter-spacing="1.6">VILLA BIGOTES</text>
        </g>
      </g>
      <g transform="translate(626 42)">
        <path d="M0-28v12" stroke="#4a5368" stroke-width="2" />
        <circle r="15" fill="#fff5da" stroke="#555e70" stroke-width="3" />
        <path d="M0-9v9l5 3" fill="none" stroke="#303846" stroke-width="1.8" stroke-linecap="round" />
        <circle class="clock-pulse" r="1.8" fill="#b65d43" />
      </g>

      <!-- Low Station Mist Band over Cobbles -->
      <rect y="206" width="800" height="58" fill="url(#railMist)" pointer-events="none" />
      <path d="M0 268h800" stroke="#e4cb9d" stroke-width="3" stroke-dasharray="4 6" />
      <path d="M0 281h800v59H0Z" fill="url(#tiles)" opacity=".6" />
      <use href="#poster" transform="translate(686 128) scale(.92)" />

      <!-- Wooden Station Bench behind Aranxita (x=43% = 344) -->
      <g transform="translate(298 228)">
        <ellipse cx="46" cy="57" rx="48" ry="6" fill="#2c2a3a" opacity=".24" />
        <path d="M10 34v22m72-22v22" stroke="#4d3d35" stroke-width="4" stroke-linecap="round" />
        <rect x="4" y="4" width="84" height="19" rx="3" fill="#9c7358" stroke="#594133" stroke-width="1.5" />
        <path d="M4 13h84" stroke="#6f4f3c" stroke-width="1.5" />
        <rect x="0" y="25" width="92" height="10" rx="2" fill="#b48668" stroke="#594133" stroke-width="1.5" />
      </g>
      <!-- Aranxita's Vintage Leather Suitcase -->
      <g transform="translate(262 256)">
        <rect width="30" height="23" rx="4" fill="#a8644f" stroke="#5e362b" stroke-width="1.5" />
        <path d="M9 0v-5h12v5" fill="none" stroke="#47332b" stroke-width="2" />
        <path d="M7 0v23M23 0v23" stroke="#e4c283" stroke-width="1.4" />
      </g>
    </g>
  </g>

  <!-- Corner Shop & Reception Finishing -->
  <g v-else-if="['market', 'desk'].includes(scene)">
    <rect x="0" width="276" height="222" fill="url(#plaster)" />
    <rect width="276" height="222" fill="url(#brocade)" />
    <use href="#window" transform="translate(46 55) scale(2.3)" />
    <!-- Night overlay or daylight sunbeam over the arched window -->
    <path v-if="night" d="M46 188V101a46 46 0 0 1 92 0v87Z" fill="url(#nightGlass)" opacity=".65" />
    <path v-if="!night" d="M46 188l-46 92h142l46-92Z" :fill="period === 1 ? 'url(#amberBeam)' : 'url(#light)'" opacity=".52" />

    <path d="M0 249h800v91H0Z" fill="url(#tiles)" />
    <use href="#fern" transform="translate(211 231)" />
    <g v-for="i in 4" :key="i">
      <rect :x="310 + (i - 1) * 104" y="175" width="93" height="60" rx="3" fill="none" stroke="#d8b290" stroke-width="2" />
      <rect :x="316 + (i - 1) * 104" y="180" width="81" height="49" rx="2" fill="none" stroke="#8e6857" stroke-width="1.2" />
    </g>
    <use href="#lamp" transform="translate(483 30)" />
    <use href="#lamp" transform="translate(630 30)" />

    <g v-if="scene === 'market'">
      <use href="#awning" transform="translate(364 18) scale(2.25 1.1)" />
      <!-- Left Apothecary/Grocer Shelf behind counter -->
      <g transform="translate(296 86)">
        <rect width="78" height="6" rx="2" fill="url(#shelfWood)" stroke="#624433" stroke-width="1" />
        <rect x="8" y="-22" width="14" height="22" rx="3" fill="#7fa390" stroke="#537263" stroke-width="1" />
        <rect x="27" y="-17" width="13" height="17" rx="3" fill="#e5b877" stroke="#9e7642" stroke-width="1" />
        <rect x="46" y="-24" width="16" height="24" rx="4" fill="#cf7f6b" stroke="#8c4e41" stroke-width="1" />
        <circle cx="15" cy="-23" r="2.2" fill="#9a4434" />
        <circle cx="54" cy="-25" r="2.4" fill="#b65d43" />
        <rect x="11" y="-13" width="8" height="6" fill="#fcf3dc" />
        <rect x="30" y="-10" width="7" height="5" fill="#fcf3dc" />
        <rect x="49" y="-15" width="10" height="7" fill="#fcf3dc" />
      </g>
      <!-- Right Grocery Shelf + Wax Seals & Labels -->
      <g transform="translate(658 64)">
        <rect y="26" width="118" height="6" rx="2" fill="url(#shelfWood)" stroke="#624433" stroke-width="1" />
        <rect y="70" width="118" height="6" rx="2" fill="url(#shelfWood)" stroke="#624433" stroke-width="1" />
        <path d="M16 32v38m86-38v38" stroke="#6b4b38" stroke-width="2" opacity=".55" />
        <!-- Top shelf jars & bottles -->
        <path d="M12 26V8a4 4 0 0 1 8 0v18Z" fill="#6f9774" stroke="#476c4d" stroke-width="1" />
        <circle cx="16" cy="3" r="2" fill="#b65d43" />
        <path d="M26 26V4l3-4h4l3 4v22Z" fill="#88a87e" stroke="#4f6c48" stroke-width="1" />
        <rect x="44" y="6" width="18" height="20" rx="3" fill="#e29d6c" stroke="#99613a" stroke-width="1" />
        <rect x="47" y="13" width="12" height="6" rx="1" fill="#fcf3dc" />
        <rect x="68" y="10" width="16" height="16" rx="3" fill="#f7ead0" stroke="#bfa47d" stroke-width="1" />
        <rect x="90" y="6" width="18" height="20" rx="4" fill="#d97b62" stroke="#8f4c3c" stroke-width="1" />
        <rect x="93" y="13" width="12" height="6" rx="1" fill="#fcf3dc" />
        <!-- Lower shelf tins & bowls -->
        <rect x="14" y="52" width="22" height="18" rx="2" fill="#708f7c" stroke="#4a6354" stroke-width="1" />
        <rect x="18" y="58" width="14" height="6" rx="1" fill="#fcf3dc" />
        <rect x="44" y="54" width="20" height="16" rx="2" fill="#e5be76" stroke="#a68142" stroke-width="1" />
        <path d="M74 70a15 12 0 0 1 30 0Z" fill="#c7836c" stroke="#854f3f" stroke-width="1" />
      </g>
      <!-- Bread Basket & Baguettes -->
      <path d="M565 144h114l-10 22h-94Z" fill="#bd8c5a" stroke="#855c37" stroke-width="1.2" />
      <g v-for="i in 3" :key="i">
        <path :d="`M${548 + i * 30} 154q-4-34 8-44 14-3 12 44Z`" fill="#dfb274" stroke="#ab794e" stroke-width="1.3" />
        <path :d="`M${552 + i * 30} 133l9-6m-9 14 9-6`" stroke="#f8dda4" stroke-width="2.6" stroke-linecap="round" />
      </g>
      <!-- Wicker Produce Crate on Floor Beside Counter -->
      <g transform="translate(274 218)">
        <path d="M0 0h48l-4 28H4Z" fill="#b98a5b" stroke="#7d5837" stroke-width="1.2" />
        <path d="M3 10h42M4 19h40" stroke="#8c623d" stroke-width="1.1" />
        <rect x="17" y="12" width="14" height="7" rx="1" fill="#fcf3dc" />
        <circle cx="12" cy="-2" r="6" fill="#e5954b" /><circle cx="24" cy="-3" r="6" fill="#e5954b" /><circle cx="36" cy="-2" r="6" fill="#e5954b" />
      </g>
    </g>

    <g v-else>
      <use href="#poster" transform="translate(316 70)" />
      <!-- Key-Cubby & Mail Pigeonholes behind Reception -->
      <g transform="translate(658 54)">
        <rect width="118" height="88" rx="3" fill="#7d5c45" stroke="#573d2c" stroke-width="1.5" />
        <g v-for="row in 3" :key="'r' + row">
          <g v-for="col in 4" :key="'c' + col">
            <rect :x="8 + (col - 1) * 26" :y="8 + (row - 1) * 26" width="22" height="22" rx="1.5" fill="#4f3a2c" />
            <circle :cx="19 + (col - 1) * 26" :cy="15 + (row - 1) * 26" r="2" fill="#e5be76" />
            <rect v-if="(row + col) % 2 === 0" :x="11 + (col - 1) * 26" :y="20 + (row - 1) * 26" width="16" height="8" rx="1" fill="#fbf0d6" />
          </g>
        </g>
      </g>
      <!-- Reception Lamp & Guest Register -->
      <g transform="translate(612 134)">
        <circle class="lamp-halo" cy="4" r="24" fill="url(#lampGlow)" />
        <path d="M0 24V8" stroke="#85653d" stroke-width="2.5" />
        <ellipse cx="0" cy="24" rx="8" ry="2.5" fill="#85653d" />
        <path d="M-11 8q0-10 11-10t11 10Z" fill="#5e7f70" stroke="#e5be76" stroke-width="1.2" />
      </g>
      <rect x="667" y="146" width="48" height="8" rx="1.5" fill="#5e786d" stroke="#3f544b" stroke-width="1" />
      <rect x="672" y="137" width="44" height="7" rx="1.5" fill="#b77264" stroke="#7d4a40" stroke-width="1" />
      <!-- Lobby Clock -->
      <circle cx="257" cy="60" r="20" fill="#fcf2da" stroke="#8f7256" stroke-width="3.5" />
      <circle cx="257" cy="60" r="16" fill="none" stroke="#d3be98" stroke-width="1" />
      <path d="M257 48v12l8 4" fill="none" stroke="#5b4e3e" stroke-width="2" stroke-linecap="round" />
      <circle cx="257" cy="60" r="2" fill="#5b4e3e" />
    </g>
  </g>

  <!-- Hallway Finishing -->
  <g v-else-if="scene === 'hall'">
    <path d="M0 222h800v118H0Z" fill="url(#tiles)" opacity=".45" />
    <path d="M258 222h288l84 118H164Z" fill="url(#terracotta)" opacity=".9" />
    <path d="M268 224l-81 116m345-116 76 116" stroke="#f0d2a5" stroke-width="3" />
    <g v-for="x in [60, 585]" :key="x" :transform="`translate(${x} 46)`">
      <path d="M20 0q50-24 102 0" fill="#b49a7c" stroke="#8b735a" stroke-width="1.2" />
    </g>
    <use href="#fern" transform="translate(246 229) scale(.8)" />
    <use href="#lamp" transform="translate(408 29)" />
    <use href="#poster" transform="translate(498 87) scale(.82)" />
  </g>

  <!-- Café Finishing -->
  <g v-else-if="scene === 'cafe'">
    <use href="#awning" transform="translate(72 27) scale(2 1.05)" />
    <path d="M0 238h800v102H0Z" fill="url(#boards)" opacity=".35" />
    <g v-for="x in [125, 276]" :key="x">
      <path :d="`M${x} 182v47m-16 0h32`" stroke="#685646" stroke-width="4" stroke-linecap="round" />
      <ellipse :cx="x" cy="181" rx="38" ry="7.5" fill="#ba8c6c" stroke="#7d5c48" stroke-width="1.2" />
      <path :d="`M${x - 6} 167h12v11h-12Z`" fill="#fff4d8" stroke="#c3a885" stroke-width="1" />
    </g>
    <use href="#poster" transform="translate(390 81)" />
    <use href="#lamp" transform="translate(545 42)" />
    <use href="#lamp" transform="translate(668 42)" />
    <use href="#fern" transform="translate(740 243)" />
  </g>

  <!-- Rooftop Finishing -->
  <g v-else-if="scene === 'roof'">
    <path d="M0 229h800v111H0Z" fill="url(#boards)" opacity=".72" />
    <g v-if="rainy" opacity=".62">
      <ellipse cx="280" cy="272" rx="95" ry="11" fill="url(#wetReflect)" />
      <ellipse cx="560" cy="296" rx="115" ry="13" fill="url(#wetReflect)" />
    </g>
    <g v-if="period === 2" fill="#faf1c5">
      <circle
        v-for="i in 35"
        :key="i"
        :class="{ twinkle: i % 3 === 0 }"
        :style="i % 3 === 0 ? { animationDelay: `${(i % 6) * 0.5}s` } : undefined"
        :cx="(i * 117) % 800"
        :cy="(i * 73) % 115"
        :r="(i % 3) * 0.4 + 0.6"
      />
      <path d="M85 115l19-17 23 5 15-23" fill="none" stroke="#f7dfad" stroke-width=".9" stroke-dasharray="2 3" />
      <path class="shooting-star" d="M460 28l54 18" stroke="#fff6d4" stroke-width="1.5" stroke-linecap="round" />
    </g>
    <use href="#fern" transform="translate(49 218)" />
    <use href="#fern" transform="translate(747 220) scale(.8)" />
    <!-- Cozy Terrace Woven Blanket, Cushions & Floor Lantern -->
    <g transform="translate(456 266)">
      <path d="M0 18 18 0h108l-16 18Z" fill="#d99a7e" stroke="#f5dfbe" stroke-width="1.5" />
      <path d="M22 4h82M14 11h82" stroke="#f5dfbe" stroke-width="1" stroke-dasharray="4 3" opacity=".8" />
      <ellipse cx="32" cy="-2" rx="14" ry="7" fill="#709483" stroke="#4d6b5d" stroke-width="1.2" />
      <ellipse cx="86" cy="2" rx="13" ry="6.5" fill="#e5be76" stroke="#a68142" stroke-width="1.2" />
    </g>
    <g transform="translate(114 218)">
      <circle class="lamp-halo" cy="-6" r="22" fill="url(#lampGlow)" />
      <rect x="-7" y="-14" width="14" height="16" rx="2" fill="#ffeca8" stroke="#5d4d42" stroke-width="1.4" />
      <path d="M-9-14h18l-9-6Z" fill="#5d4d42" />
    </g>
    <g transform="translate(570 182) rotate(-21)">
      <path d="M0 0l-16-25 19-15 14 25Z" fill="#d9947b" stroke="#855143" stroke-width="1.2" />
      <path d="M0 0l-16-25 19-15Z" fill="#f3c584" opacity=".6" />
      <path d="M0 0l3-40m-19 15 33 10" stroke="#fff0cf" stroke-width="1.2" fill="none" />
      <path d="M0 0q7 17-6 27" stroke="#886f70" stroke-width="1.3" fill="none" />
    </g>
  </g>

  <!-- Garden Finishing -->
  <g v-else-if="scene === 'garden'">
    <use v-if="period < 2" class="cloud-drift" href="#cloud" transform="translate(358 43)" />
    <use v-if="period < 2" class="cloud-drift slow" href="#cloud" transform="translate(52 56) scale(.73)" />
    <use href="#awning" transform="translate(135 125) scale(.35)" />
    <use href="#awning" transform="translate(289 125) scale(.35)" />
    <path d="M48 208q76-21 144-7m88 4q77-18 113-15" stroke="#6f966d" stroke-width="9" stroke-linecap="round" fill="none" />
    <g v-for="i in 38" :key="i" :transform="`translate(${(i * 113) % 800} ${258 + (i * 29) % 80}) scale(${0.45 + (i % 4) * 0.12})`">
      <path d="M0 1q-1 7 2 11" fill="none" stroke="#607e5c" stroke-width="2" />
      <g fill="#fcf0d1">
        <ellipse cy="-3" rx="2.2" ry="3.2" />
        <ellipse cx="3" rx="3.2" ry="2.2" />
        <ellipse cx="-3" rx="3.2" ry="2.2" />
      </g>
      <circle r="1.8" fill="#d19a4c" />
    </g>
  </g>
</template>
