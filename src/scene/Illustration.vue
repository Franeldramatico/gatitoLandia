<script setup>
import Street from './Street.vue'
import Garden from './Garden.vue'
import Wedding from './Wedding.vue'
import receptionist from '../portraits/recepcionista.webp?inline'
import PrintStudio from './PrintStudio.vue'
import Finishing from './Finishing.vue'

defineProps({
  scene: String,
  night: Boolean,
  period: { type: Number, default: 0 },
  decor: Number,
  bag: Boolean,
  bought: Boolean,
  actor: Number,
  day: Number,
  plant: Number,
  furniture: Array,
  greenhouse: Boolean,
  rainy: Boolean,
})
</script>

<template>
  <svg
    class="illustration"
    :data-decor="scene === 'room' ? decor : undefined"
    viewBox="0 0 800 340"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2=".25" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stop-color="#84bcc7" />
        <stop offset="54%" stop-color="#cbe0cc" />
        <stop offset="100%" stop-color="#ffebd0" />
      </linearGradient>
      <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e294d" />
        <stop offset="56%" stop-color="#586086" />
        <stop offset="100%" stop-color="#bc9aa1" />
      </linearGradient>
      <pattern id="paper" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="2" r=".6" fill="#5b493c" opacity=".2" />
        <circle cx="5.5" cy="6" r=".45" fill="#7d644f" opacity=".16" />
      </pattern>
    </defs>

    <PrintStudio />

    <Wedding v-if="scene === 'wedding'" />
    <Garden v-else-if="scene === 'garden'" :night="night" :period="period" :rainy="rainy" />
    <Street v-else-if="['hall', 'roof', 'cafe'].includes(scene)" :place="scene === 'hall' ? 'lobby' : scene" :period="period" />

    <!-- Airport, Midnight Station & Cover Skyline -->
    <g v-else-if="['air', 'rail', 'cover'].includes(scene)">
      <rect width="800" height="340" :fill="night ? 'url(#dusk)' : period === 1 ? 'url(#eveningSky)' : 'url(#sky)'" />
      <circle class="sun-halo" cx="601" cy="64" r="68" :fill="night ? 'url(#moonGlow)' : 'url(#sunGlow)'" />
      <circle cx="601" cy="64" r="27" :fill="night ? '#fff1c2' : '#fff6cf'" />
      <g v-if="night" fill="#fff3cf">
        <circle
          v-for="i in 53"
          :key="i"
          :class="{ twinkle: i % 3 === 0 }"
          :style="i % 3 === 0 ? { animationDelay: `${(i % 7) * 0.42}s` } : undefined"
          :cx="(i * 79) % 800"
          :cy="(i * 47) % 170"
          :r="i % 3 === 0 ? 1.4 : 0.7"
        />
        <path class="shooting-star" d="M210 34l52 16" stroke="#fff6d4" stroke-width="1.5" stroke-linecap="round" />
      </g>

      <!-- Distant Hills & Architectural Skyline -->
      <path d="M0 194Q110 109 215 170T421 148T640 161T800 135V280H0Z" :fill="night ? '#4d5b73' : '#a8c2a8'" />
      <g v-for="i in 18" :key="i" :transform="`translate(${i * 48 - 60} ${142 + (i * 47) % 48})`">
        <path
          :d="i % 3 === 0 ? 'M0 14 20 0 40 14V88H0Z' : 'M0 0h40v88H0Z'"
          :fill="night ? '#3c465d' : '#85a297'"
        />
        <rect x="7" y="18" width="6" height="8" rx="1" :fill="night ? '#f4d99b' : '#f4e1b8'" :opacity="i % 2 ? .9 : .55" />
        <rect x="24" y="18" width="6" height="8" rx="1" :fill="night ? '#f4d99b' : '#f4e1b8'" :opacity="i % 2 ? .6 : .85" />
        <rect x="7" y="34" width="6" height="8" rx="1" :fill="night ? '#f4d99b' : '#f4e1b8'" opacity=".65" />
      </g>

      <rect y="230" width="800" height="110" :fill="night ? '#827680' : '#cabca5'" />
      <path d="M0 245h800" stroke="#f4d7a0" stroke-width="4" />

      <!-- Airplane Arrival -->
      <g v-if="scene === 'air'" class="plane">
        <path d="M88 178l47 7 74-9q18-1 26 6-4 8-22 9l-74 4-44-6-19-20 9-1Z" fill="#fff9e6" stroke="#6c756d" stroke-width="1.8" />
        <path d="M145 186l-30-24 12-2 52 24m-22 4-24 15 13 1 38-16" fill="#be7c6d" stroke="#855146" stroke-width="1.2" />
        <path d="M180 181l36-1" stroke="#5d8389" stroke-width="3" stroke-dasharray="5 3" />
        <circle cx="138" cy="196" r="3" fill="#4f5650" /><circle cx="202" cy="192" r="3" fill="#4f5650" />
      </g>

      <!-- Midnight Train Arrival with Sweeping Headlight & Steam -->
      <g v-else-if="scene === 'rail'" class="train">
        <!-- Sweeping Headlight Beam -->
        <polygon class="headlight-beam" points="602,194 795,154 795,232 602,202" fill="url(#headlight)" />
        <path d="M-52 124h595q36 0 54 29l24 41q10 21-17 26H-52Z" fill="url(#jade)" stroke="#3e525f" stroke-width="2.5" />
        <path d="M-50 189h656l6 12H-50Z" fill="#e5b092" />
        <path d="M-50 205h656" stroke="#f7dbb7" stroke-width="2" />
        <!-- Warm Illuminated Passenger Windows -->
        <g v-for="i in 10" :key="i" :transform="`translate(${i * 52 - 45} 142)`">
          <rect width="38" height="36" rx="6" fill="#4e676a" />
          <rect x="2.5" y="2.5" width="33" height="31" rx="4" fill="url(#gold)" />
          <path d="M5 3h9L5 22Zm26 0h4L19 31h-4Z" fill="#fff7dc" opacity=".4" />
        </g>
        <!-- Carriage Open Doorway Highlight -->
        <rect x="218" y="140" width="36" height="72" rx="4" fill="#ffe8ac" fill-opacity=".28" stroke="#f6deb1" stroke-width="1.5" />
        <path d="M546 140q21 2 34 23l10 17h-46Z" fill="url(#glass)" stroke="#5b7271" stroke-width="2" />
        <path d="M551 146l20 12m-12-16l17 10" stroke="#fffaf0" stroke-width="1.8" stroke-linecap="round" opacity=".52" />
        <rect x="595" y="194" width="15" height="6" rx="3" fill="#fff5c4" />
        <path d="M-10 220h590" stroke="#3c404e" stroke-width="7" />
        <path d="M-10 128h548" stroke="#d5dbb8" stroke-width="3" />
        <!-- Soft Steam Puffs -->
        <g fill="#f6f1e6" opacity=".45" class="train-steam">
          <circle cx="150" cy="218" r="10" /><circle cx="170" cy="221" r="14" /><circle cx="380" cy="220" r="12" /><circle cx="404" cy="222" r="9" />
        </g>
      </g>

      <!-- Aranxita's Phone on Midnight Platform -->
      <g v-if="scene === 'rail'" transform="translate(396 226) rotate(9)">
        <rect width="19" height="30" rx="3.5" fill="#363d48" stroke="#232830" stroke-width="1" />
        <rect x="2.5" y="3" width="14" height="21" rx="2" fill="#f9ebc0" />
        <path d="M5 9h9m-9 4h6m-6 4h8" stroke="#998a6d" stroke-width="1.2" stroke-linecap="round" />
        <circle cx="9.5" cy="26.5" r="1.1" fill="#fff" />
      </g>

      <!-- Airport Wayfinding Post -->
      <g v-if="scene === 'air'" transform="translate(545 133)">
        <path d="M24 0v100" stroke="#6d7063" stroke-width="5" stroke-linecap="round" />
        <rect width="98" height="44" rx="5" fill="#4d7367" stroke="#37544b" stroke-width="1.5" />
        <path d="M28 28V19l8-6 8 6v9h-5v-5h-6v5Z" fill="#fff4d6" />
        <path d="M56 22h16m-5-5 5 5-5 5" fill="none" stroke="#fff4d6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </g>

    <!-- ====================================================================== -->
    <!-- APARTMENT (15 / 18 / GUEST): TWO COHESIVE ZONES (SALA + HABITACIÓN)     -->
    <!-- ====================================================================== -->
    <g v-else-if="scene === 'room'">
      <!-- Sala Back Wall (Left: 0..466) -->
      <rect width="466" height="225" fill="url(#plaster)" />
      <path d="M128 134q16-4 28 2M418 88q12 4 20-2" fill="none" stroke="#9e8669" stroke-width=".75" opacity=".45" />
      <rect x="108" y="185" width="358" height="32" fill="#dec8a6" />
      <path d="M108 185h358" stroke="#f7ebd2" stroke-width="3" />
      <path d="M108 183h358" stroke="#fff9eb" stroke-width="1" opacity=".55" />

      <!-- Habitación / Dormitorio Accent Wall (Right: 466..800) -->
      <rect x="466" y="0" width="334" height="225" :fill="actor === 1 ? '#e6dad4' : '#d8dfd1'" />
      <rect x="466" y="0" width="334" height="185" fill="url(#brocade)" opacity=".45" />
      <rect x="466" y="185" width="334" height="32" :fill="actor === 1 ? '#d3c1ba' : '#c3cbb9'" />
      <path d="M466 185h334" stroke="#f6ebd3" stroke-width="3" />
      <path d="M466 183h334" stroke="#fff9eb" stroke-width="1" opacity=".55" />

      <!-- Top Crown Cornice Molding -->
      <rect x="96" y="0" width="704" height="7" fill="#ebe0c7" />
      <path d="M96 7h704" stroke="#cbb598" stroke-width="1" />
      <!-- Synchronized Sala Wall Clock -->
      <g transform="translate(424 56)">
        <circle cx="1" cy="2" r="16" fill="#463a33" opacity=".14" />
        <circle r="15.5" fill="#fff7e2" stroke="#8d6b4c" stroke-width="2.5" />
        <circle r="12.5" fill="none" stroke="#dcc6a1" stroke-width=".8" />
        <path d="M0-11v2M11 0h-2M0 11v-2M-11 0h2" stroke="#9c8062" stroke-width="1.2" stroke-linecap="round" />
        <line x1="0" y1="0" x2="0" y2="-6.5" stroke="#425148" stroke-width="1.8" stroke-linecap="round" :transform="`rotate(${period === 2 ? -52.5 : period === 1 ? 165 : -90})`" />
        <line x1="0" y1="0" x2="0" y2="-9.5" stroke="#b65d43" stroke-width="1.4" stroke-linecap="round" :transform="`rotate(${period === 2 ? 90 : period === 1 ? 180 : 0})`" />
        <circle r="1.6" fill="#425148" />
      </g>

      <!-- Left Angled Entry Wall & Apartment Door -->
      <path d="M0 0l108 54v166L0 274Z" fill="#d5c1a8" />
      <path d="M0 258l108-51h692v15H108L0 274Z" fill="#b4977b" opacity=".65" />
      <path d="M20 66l68 20v144l-68 28Z" fill="#99735d" stroke="#6f5241" stroke-width="2" />
      <path d="M28 82l52 15v118l-52 21Z" fill="none" stroke="#bc997f" stroke-width="1.5" />
      <circle cx="75" cy="171" r="4.2" fill="url(#gold)" stroke="#886534" stroke-width="1" />
      <!-- Coat Peg & Scarf near Door -->
      <circle cx="96" cy="116" r="2.5" fill="#705a49" />
      <path d="M96 118q-4 14 2 24" fill="none" :stroke="actor === 1 ? '#c67c6f' : '#6c8d7c'" stroke-width="4" stroke-linecap="round" />

      <!-- Continuous Herringbone Wood Floor Across Sala & Habitación -->
      <path d="M0 274l108-56h692v122H0Z" fill="url(#boards)" />
      <path d="M0 274l108-56h692" fill="none" stroke="#f4e2c2" stroke-width="5" />
      <!-- Threshold Strip Between Sala & Habitación -->
      <path d="M466 218l-14 122" stroke="#b69374" stroke-width="3" opacity=".7" />

      <!-- Warm Floor Reflections at Evening/Night -->
      <g v-if="period >= 1" opacity=".45">
        <ellipse cx="295" cy="270" rx="115" ry="22" fill="url(#lampGlow)" />
        <ellipse v-if="decor >= 4" cx="520" cy="252" rx="60" ry="14" fill="url(#lampGlow)" />
      </g>

      <!-- Sala Window (225..365) — Time-of-Day Aware + Courtyard View -->
      <rect x="225" y="42" width="140" height="106" :fill="night ? 'url(#nightGlass)' : period === 1 ? 'url(#eveningSky)' : 'url(#glass)'" stroke="#fbf0d7" stroke-width="8" />
      <path d="M229 144q22-30 52-18t54-12 26 24v6H229Z" :fill="night ? '#283948' : '#7ea27e'" opacity=".45" />
      <circle v-if="night" cx="332" cy="68" r="10" fill="#fff2c2" opacity=".9" />
      <circle v-if="night" class="twinkle" cx="255" cy="64" r="1.4" fill="#fff5cf" />
      <circle v-if="night" class="twinkle" style="animation-delay: .8s" cx="288" cy="78" r="1.1" fill="#fff5cf" />
      <path d="M236 58l28-14h16l-44 26Z" fill="#fffaf0" opacity=".24" />
      <path d="M295 40v110m-70-54h140" stroke="#fff3db" stroke-width="4.5" />

      <!-- Habitación / Bedroom Window (602..694) — Time-of-Day Aware + Courtyard View -->
      <rect x="602" y="44" width="92" height="102" :fill="night ? 'url(#nightGlass)' : period === 1 ? 'url(#eveningSky)' : 'url(#glass)'" stroke="#fbf0d7" stroke-width="7" />
      <path d="M606 142q18-24 44-14t40-10v24Z" :fill="night ? '#283948' : '#7ea27e'" opacity=".42" />
      <circle v-if="night" class="twinkle" cx="634" cy="68" r="1.3" fill="#fff5cf" />
      <circle v-if="night" class="twinkle" style="animation-delay: 1.1s" cx="668" cy="84" r="1.4" fill="#fff5cf" />
      <path d="M648 42v106m-46-52h92" stroke="#fff3db" stroke-width="4" />

      <!-- Architectural Partition Archway Between Sala & Habitación (x=456..478) -->
      <path d="M456 0h22v218h-22Z" fill="#efe2ca" stroke="#cbb598" stroke-width="1.5" />
      <path d="M460 0h5v218h-5Z" fill="#ccb598" opacity=".45" />
      <path d="M446 0q10 24 10 48v-48Zm42 0q-10 24-10 48v-48Z" fill="#e8d9be" />
      <path d="M456 185h22v33h-22Z" fill="#cbb394" />

      <!-- Window Light Beams (Day & Golden Hour) -->
      <g v-if="!night">
        <path d="M225 150l-92 128h154l78-128Z" :fill="period === 1 ? 'url(#amberBeam)' : 'url(#light)'" />
        <path d="M602 148l-68 118h112l48-118Z" :fill="period === 1 ? 'url(#amberBeam)' : 'url(#light)'" opacity=".75" />
        <g class="motes" fill="#fff8dc" opacity=".65">
          <circle cx="242" cy="196" r="1.6" /><circle cx="268" cy="214" r="1.2" /><circle cx="222" cy="232" r="1.8" /><circle cx="624" cy="198" r="1.4" />
        </g>
      </g>

      <!-- Ceiling Pendant Lamp in Sala -->
      <use href="#lamp" transform="translate(295 36) scale(1.05)" />

      <!-- ================================================================== -->
      <!-- 12 CUMULATIVE, GROUNDED, NON-OVERLAPPING DECOR ITEMS (SALA+CUARTO) -->
      <!-- ================================================================== -->

      <!-- Paso 1: La Cama en la Habitación (x=556..726, y=166..256) -->
      <g v-if="decor >= 1">
        <ellipse cx="641" cy="256" rx="88" ry="11" fill="#463a33" opacity=".16" />
        <!-- Wooden Headboard with Vertical Spindle Trim -->
        <rect x="558" y="162" width="166" height="44" rx="5" fill="#9a7257" stroke="#6c4d3a" stroke-width="2" />
        <rect x="568" y="170" width="146" height="24" rx="3" fill="#af8466" />
        <path d="M590 170v24m25-24v24m26-24v24m26-24v24m25-24v24" stroke="#855e45" stroke-width="1.5" opacity=".55" />
        <!-- Bed Legs -->
        <path d="M564 242v14m154-14v14" stroke="#6c4d3a" stroke-width="6" stroke-linecap="round" />
        <!-- Mattress & Pillows -->
        <rect x="556" y="196" width="170" height="32" rx="6" fill="#fcf3dc" stroke="#cfc0a2" stroke-width="1.5" />
        <rect x="570" y="182" width="54" height="20" rx="8" fill="#fff9ea" stroke="#d5c7aa" stroke-width="1.5" />
        <rect x="658" y="182" width="54" height="20" rx="8" fill="#fff9ea" stroke="#d5c7aa" stroke-width="1.5" />
        <!-- Woven Quilt / Duvet (Personalized per Cat) -->
        <path
          d="M556 212h170v30a5 5 0 0 1-5 5H561a5 5 0 0 1-5-5Z"
          :fill="actor === 1 ? 'url(#quiltRose)' : 'url(#quiltSage)'"
          :stroke="actor === 1 ? '#92574c' : '#567162'"
          stroke-width="2"
        />
        <path d="M556 212h170v8H556Z" :fill="actor === 1 ? '#e4b3a5' : '#b7ccb8'" />
        <path v-if="period >= 1 || night" d="M562 162h158" stroke="#ffd995" stroke-width="1.6" opacity=".52" />
        <!-- Wooden Footboard Trim -->
        <rect x="554" y="242" width="174" height="7" rx="2" fill="#8d664d" stroke="#614432" stroke-width="1.2" />
      </g>

      <!-- Paso 2: Alfombra Tejida de la Sala (x=186..404, y=248..296) -->
      <g v-if="decor >= 2">
        <ellipse cx="295" cy="274" rx="112" ry="25" fill="#4e4036" opacity=".12" />
        <ellipse
          cx="295"
          cy="272"
          rx="110"
          ry="24"
          :fill="actor === 1 ? '#c89b8d' : '#85a495'"
          :stroke="actor === 1 ? '#f3dfc9' : '#ebe3c7'"
          stroke-width="2.5"
        />
        <ellipse
          cx="295"
          cy="272"
          rx="92"
          ry="17"
          fill="none"
          :stroke="actor === 1 ? '#f5e6d6' : '#f4eed9'"
          stroke-width="1.4"
          stroke-dasharray="5 4"
        />
      </g>

      <!-- Paso 3: Sofá de la Sala bajo el Ventanal (x=200..386, y=168..248) -->
      <g v-if="decor >= 3">
        <ellipse cx="293" cy="248" rx="94" ry="9" fill="#463a33" opacity=".18" />
        <path d="M214 236l-4 14m166-14 4 14" stroke="#6e5342" stroke-width="5.5" stroke-linecap="round" />
        <path
          d="M200 222q10-38 68-38h50q58 0 68 38l-10 16H210Z"
          :fill="actor === 1 ? '#7e93a1' : '#85a08f'"
          :stroke="actor === 1 ? '#576b78' : '#5e7868'"
          stroke-width="2.2"
        />
        <path d="M216 216q6-24 42-24h70q36 0 42 24v11H216Z" :fill="actor === 1 ? '#ccd6dc' : '#c6d2ae'" />
        <rect x="224" y="200" width="22" height="17" rx="5" fill="#ecc4a7" stroke="#c29374" stroke-width="1.2" />
        <rect x="340" y="200" width="22" height="17" rx="5" fill="#ecc4a7" stroke="#c29374" stroke-width="1.2" />
        <path d="M218 227h150" :stroke="actor === 1 ? '#576b78' : '#5e7868'" stroke-width="1.8" />
        <path v-if="period >= 1 || night" d="M254 185h78" stroke="#ffd995" stroke-width="1.5" stroke-linecap="round" opacity=".48" />
      </g>

      <!-- Paso 4: Mesita de Noche y Lámpara Cálida en la Habitación (x=492..546, y=188..248) -->
      <g v-if="decor >= 4">
        <ellipse cx="519" cy="249" rx="28" ry="5" fill="#463a33" opacity=".16" />
        <path d="M500 238v11m38-11v11" stroke="#6b503e" stroke-width="3.5" stroke-linecap="round" />
        <rect x="494" y="204" width="50" height="34" rx="3" fill="#be906b" stroke="#7d5b44" stroke-width="1.6" />
        <rect x="500" y="210" width="38" height="11" rx="1.5" fill="#d3a680" />
        <circle cx="519" cy="215.5" r="2" fill="#f2d085" />
        <!-- Glowing Bedside Lamp -->
        <circle cx="519" cy="180" r="32" fill="url(#lampGlow)" />
        <path d="M519 204v-15" stroke="#7b614b" stroke-width="2.5" />
        <ellipse cx="519" cy="204" rx="7" ry="2.5" fill="#8f7258" />
        <path d="M507 189l5-15h14l5 15Z" fill="#fce8b8" stroke="#c29e68" stroke-width="1.4" />
        <path v-if="period >= 1 || night" d="M498 204h42" stroke="#ffd995" stroke-width="1.4" opacity=".5" />
      </g>

      <!-- Paso 5: Cortinas de Lino en Ambas Ventanas -->
      <g v-if="decor >= 5">
        <!-- Sala Curtains -->
        <path d="M210 37h170" stroke="#7d614d" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="210" cy="37" r="3" fill="#dfc07e" /><circle cx="380" cy="37" r="3" fill="#dfc07e" />
        <path d="M214 39q11 52 6 110h16q-3-54 0-110Z" fill="#f4e6ca" stroke="#c9b492" stroke-width="1" />
        <path d="M350 39q3 54 0 110h16q-5-58 6-110Z" fill="#f4e6ca" stroke="#c9b492" stroke-width="1" />
        <!-- Habitación Curtains -->
        <path d="M588 39h120" stroke="#7d614d" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="588" cy="39" r="3" fill="#dfc07e" /><circle cx="708" cy="39" r="3" fill="#dfc07e" />
        <path d="M592 41q9 50 5 106h14q-3-52 0-106Z" fill="#f4e6ca" stroke="#c9b492" stroke-width="1" />
        <path d="M685 41q3 52 0 106h14q-4-56 5-106Z" fill="#f4e6ca" stroke="#c9b492" stroke-width="1" />
      </g>

      <!-- Paso 6: Estantería con Libros en la Sala (x=398..450, y=110..226) -->
      <g v-if="decor >= 6">
        <rect x="398" y="110" width="52" height="116" rx="3" fill="#9c7357" stroke="#694b38" stroke-width="1.8" />
        <rect x="403" y="116" width="42" height="28" fill="#6b5040" />
        <rect x="403" y="149" width="42" height="28" fill="#6b5040" />
        <rect x="403" y="182" width="42" height="28" fill="#6b5040" />
        <!-- Books & Trinkets -->
        <rect x="406" y="122" width="7" height="22" rx="1" fill="#c77b6c" />
        <rect x="414" y="125" width="6" height="19" rx="1" fill="#e6be78" />
        <rect x="421" y="121" width="7" height="23" rx="1" fill="#7fa290" />
        <rect x="406" y="156" width="8" height="21" rx="1" fill="#7c96aa" />
        <rect x="415" y="158" width="6" height="19" rx="1" fill="#d9967a" />
        <circle cx="433" cy="171" r="5" fill="#f3dfc0" />
        <rect x="406" y="190" width="22" height="8" rx="1" fill="#d8b47c" />
        <rect x="406" y="199" width="26" height="9" rx="1" fill="#789885" />
      </g>

      <!-- Paso 7: Plantas de Interior (Habitación esquina derecha + sobre estantería) -->
      <g v-if="decor >= 7">
        <!-- Tall Bedroom Fiddle Plant -->
        <g transform="translate(758 228)">
          <ellipse cx="0" cy="4" rx="22" ry="5" fill="#463a33" opacity=".16" />
          <path d="M0-24l-2-58m1 36q-26-26-33-14 6 22 33 23m0-21q6-34 24-30 5 20-24 38m-1 0q22-22 34-10-7 17-34 18" fill="#6e926b" stroke="#4b6c4c" stroke-width="1.2" />
          <path d="M-16-24h32l-6 26h-20Z" fill="url(#terracotta)" stroke="#885346" stroke-width="1.2" />
          <path d="M-18-24h36v6h-36Z" fill="#e1a588" stroke="#9a6250" stroke-width="1" />
        </g>
        <!-- Small Trailing Fern on Top of Bookshelf -->
        <g transform="translate(424 110) scale(.62)">
          <path d="M-14-23h28l-5 23H-9Z" fill="url(#terracotta)" />
          <path d="M0-22q-20-32-30-28 4 21 30 28Zm0 0q18-28 31-23-4 19-31 23Zm0 0q-8-38-1-48 12 24 1 48Z" fill="#7aa178" stroke="#4f7254" stroke-width="1.3" />
        </g>
      </g>

      <!-- Paso 8: Cuadros Enmarcados (Sala + Habitación) -->
      <g v-if="decor >= 8">
        <!-- Sala Wall Art -->
        <g transform="translate(132 68) rotate(-2)">
          <rect width="54" height="40" rx="2" fill="#f7ead0" stroke="#8f7254" stroke-width="3" />
          <rect x="5" y="5" width="44" height="30" fill="#c3d4bf" />
          <path d="M7 31l12-14 9 9 9-12 10 17Z" fill="#6d8a78" />
          <circle cx="38" cy="12" r="4.5" fill="#e4ae76" />
        </g>
        <!-- Bedroom Wall Art above Nightstand -->
        <g transform="translate(496 68)">
          <rect width="46" height="56" rx="2" fill="#fcf3dc" stroke="#8f7254" stroke-width="3" />
          <rect x="5" y="5" width="36" height="46" :fill="actor === 1 ? '#e3cfd1' : '#cfdce0'" />
          <circle cx="23" cy="22" r="9" fill="#f6dda5" />
          <path d="M7 46q16-14 32 0Z" fill="#72907e" />
        </g>
      </g>

      <!-- Paso 9: Alfombra Mullida de Dormitorio, Manta Tejida y Pantuflas -->
      <g v-if="decor >= 9">
        <ellipse cx="628" cy="268" rx="102" ry="20" fill="#f4ead3" stroke="#cbb896" stroke-width="2" />
        <ellipse cx="628" cy="268" rx="84" ry="14" fill="none" stroke="#d8c6a6" stroke-width="1.2" stroke-dasharray="4 3" />
        <!-- Folded Knit Throw across Foot of Bed -->
        <rect x="556" y="232" width="170" height="11" rx="3" :fill="actor === 1 ? '#f4d9be' : '#e6cf98'" stroke="#b69b72" stroke-width="1" />
        <!-- Cozy Cat Slippers by the Bed -->
        <ellipse cx="592" cy="266" rx="7" ry="3.5" fill="#b97b68" />
        <ellipse cx="608" cy="268" rx="7" ry="3.5" fill="#b97b68" />
      </g>

      <!-- Paso 10: Mesita de Centro con Tetera y Libro Abierto (sobre alfombra de sala) -->
      <g v-if="decor >= 10" transform="translate(293 252)">
        <ellipse cx="0" cy="18" rx="44" ry="7" fill="#463a33" opacity=".16" />
        <path d="M-28 5v12m56-12v12" stroke="#6f5341" stroke-width="3.5" stroke-linecap="round" />
        <ellipse cx="0" cy="2" rx="44" ry="9" fill="#be906b" stroke="#7d5b44" stroke-width="1.5" />
        <!-- Teapot & Cups -->
        <circle cx="-14" cy="-5" r="7" fill="#e6b877" stroke="#9e7642" stroke-width="1.2" />
        <path d="M-21-7q-5-3-2-6m12 6q5-2 4-6" fill="none" stroke="#9e7642" stroke-width="1.5" />
        <path class="steam" d="M-14-14q2-4 0-7" fill="none" stroke="#ffffff" stroke-width="1.4" opacity=".7" />
        <!-- Open Book -->
        <path d="M4 0l14-4 14 4-14 4Z" fill="#fff7e2" stroke="#b69f7d" stroke-width="1" />
        <path d="M18-4v8" stroke="#b69f7d" stroke-width="1" />
      </g>

      <!-- Paso 11: Rincón de Lectura — Sillón y Lámpara de Pie (x=114..186) -->
      <g v-if="decor >= 11">
        <!-- Standing Brass Floor Lamp -->
        <g transform="translate(120 130)">
          <ellipse cx="0" cy="112" rx="11" ry="3.5" fill="#8b6e49" />
          <path d="M0 112V18" stroke="#8b6e49" stroke-width="2.5" />
          <circle cx="0" cy="16" r="24" fill="url(#lampGlow)" />
          <path d="M-12 20l4-16h16l4 16Z" fill="#fbe7b5" stroke="#b8945e" stroke-width="1.4" />
        </g>
        <!-- Reading Armchair -->
        <g transform="translate(132 192)">
          <ellipse cx="26" cy="56" rx="28" ry="6" fill="#463a33" opacity=".16" />
          <path d="M8 46v10m36-10v10" stroke="#6b503e" stroke-width="4" stroke-linecap="round" />
          <path
            d="M4 34q2-28 22-28t22 28l-4 14H8Z"
            :fill="actor === 1 ? '#b98376' : '#c4986c'"
            :stroke="actor === 1 ? '#87584e' : '#8f6a45'"
            stroke-width="2"
          />
          <rect x="10" y="28" width="32" height="12" rx="4" fill="#f3dfc0" />
        </g>
      </g>

      <!-- Paso 12: Guirnalda de Luces Cálidas y Planta Colgante -->
      <g v-if="decor >= 12">
        <!-- Hanging Planter beside Sala Window -->
        <g transform="translate(200 40)" class="sway-gentle">
          <path d="M0-40V14" stroke="#8b7358" stroke-width="1.5" />
          <path d="M-11 14h22l-4 14h-14Z" fill="url(#terracotta)" stroke="#885346" stroke-width="1" />
          <path d="M-8 14q-12 10-8 22m8-22q4 14 0 24m8-24q12 10 8 22" fill="none" stroke="#6c9168" stroke-width="2.2" stroke-linecap="round" />
        </g>
        <!-- Festoon Fairy Lights Across Archway & Bedroom -->
        <path d="M466 30q84 36 168 4t156 12" fill="none" stroke="#85735c" stroke-width="1.4" />
        <g v-for="(pt, idx) in [[492, 40], [528, 49], [568, 50], [608, 42], [652, 34], [696, 38], [738, 44], [774, 46]]" :key="idx">
          <circle class="lamp-halo" :style="{ animationDelay: `${idx * 0.3}s` }" :cx="pt[0]" :cy="pt[1]" r="10" fill="url(#lampGlow)" />
          <circle :cx="pt[0]" :cy="pt[1]" r="2.8" :fill="idx % 2 ? '#ffe5a3' : '#fff6cf'" />
        </g>
      </g>
    </g>

    <!-- Reception & Corner Shop Main Counter -->
    <g v-else>
      <rect width="800" height="340" fill="#ebe0c7" />
      <rect x="276" y="0" width="524" height="156" fill="url(#plaster)" />
      <rect x="276" y="0" width="524" height="156" fill="url(#brocade)" opacity=".55" />
      <path d="M312 110q14-4 24 2M710 42q11 4 19-1" fill="none" stroke="#9e8669" stroke-width=".75" opacity=".45" />
      <!-- Crown Trim & Wainscoting behind Counter -->
      <rect x="276" y="0" width="524" height="8" fill="#dfd0b2" />
      <rect x="276" y="150" width="524" height="72" fill="#d3bd9e" />
      <path d="M276 150h524" stroke="#f7ebd2" stroke-width="4" />
      <path d="M276 148h524" stroke="#fff9eb" stroke-width="1" opacity=".55" />
      <path d="M276 155h524" stroke="#9e8266" stroke-width="1.2" />
      <rect y="222" width="800" height="118" fill="#bb9d85" />
      <g fill="none" stroke="#b3987a" stroke-width="1.2" opacity=".55">
        <rect v-for="i in 6" :key="i" :x="292 + (i - 1) * 84" y="162" width="68" height="48" rx="2" />
      </g>

      <g :transform="scene === 'desk' ? 'translate(88 -15) scale(.82 .72)' : undefined">
      <rect x="392" y="50" width="252" height="86" rx="5" fill="#463a33" opacity=".14" />
      <rect x="390" y="48" width="252" height="85" rx="4" fill="#567367" stroke="#ecd9b7" stroke-width="7" />
      <rect x="399" y="57" width="234" height="67" rx="2" fill="none" stroke="#85a295" stroke-width="1.2" />
      <text x="516" y="96" fill="#fbf0d2" text-anchor="middle" font-size="18" font-weight="600" letter-spacing="3.5" font-family="Fraunces, Georgia, serif">
        {{ scene === 'desk' ? 'VILLA BIGOTES' : 'MERCADO' }}
      </text>
      </g>
      <image v-if="scene === 'desk'" :href="receptionist" x="508" y="87" width="68" height="92" />
      <path d="M300 164h429v84H300Z" fill="url(#walnut)" stroke="#62463a" stroke-width="1.5" />
      <path d="M290 158h449v12H290Z" rx="3" fill="#6f5349" stroke="#4f3a32" stroke-width="1.2" />
      <path d="M294 158h441" stroke="#c9ae92" stroke-width="1" opacity=".5" />
      <g v-if="scene === 'desk'">
        <path d="M475 157h40" stroke="#7d643d" stroke-width="3" stroke-linecap="round" />
        <path d="M479 155a16 16 0 0 1 32 0Z" fill="url(#gold)" stroke="#927038" stroke-width="1.2" />
        <path d="M495 137v-4" stroke="#796542" stroke-width="3" stroke-linecap="round" />
        <circle cx="495" cy="132" r="2.5" fill="#e8c780" />
      </g>
      <g v-else>
        <path d="M396 146h156l-8 14H404Z" fill="#b7885a" stroke="#7d5837" stroke-width="1.2" />
        <g v-for="i in 15" :key="i">
          <circle :cx="412 + (i % 8) * 18" :cy="150 - Math.floor(i / 8) * 11" r="9" fill="#e5954b" stroke="#b96d32" stroke-width="1" />
          <circle :cx="409 + (i % 8) * 18" :cy="147 - Math.floor(i / 8) * 11" r="2.2" fill="#ffd28e" opacity=".75" />
        </g>
      </g>
    </g>

    <Finishing v-if="scene !== 'wedding' && scene !== 'room'" :scene="scene" :night="night" :period="period" :rainy="rainy" />

    <!-- Café Shelf & Flower Vase -->
    <g v-if="scene === 'cafe'">
      <path d="M80 55h280v14H80Z" fill="#8b7063" />
      <path v-if="night" d="M80 65h280v85H80Z" fill="url(#boards)" />
      <g v-else-if="day > 1">
        <rect x="153" y="167" width="19" height="16" rx="3" fill="#fff3cf" stroke="#ccb78e" stroke-width="1" />
        <path d="M160 167v-21" stroke="#688d6e" stroke-width="2" />
        <circle cx="160" cy="146" r="5.5" fill="#e39d9e" />
        <circle cx="160" cy="146" r="2" fill="#fff0b8" />
      </g>
    </g>

    <!-- Spilled Oranges & Torn Bag in Hallway -->
    <g v-if="bag">
      <path d="M530 250l35 6-9 19-35-9Z" fill="#b39064" stroke="#7d603f" stroke-width="1.2" />
      <g v-for="i in 4" :key="i">
        <circle :cx="540 + i * 10" :cy="269 + (i % 2) * 5" r="5.5" fill="#e49243" stroke="#b36829" stroke-width=".9" />
        <ellipse :cx="542 + i * 10" :cy="263 + (i % 2) * 5" rx="2.5" ry="1.2" fill="#6f9a66" transform="rotate(-15)" />
      </g>
    </g>

    <rect width="800" height="340" fill="url(#paper)" pointer-events="none" />

    <!-- Rain Streaks, Wet Ground Reflections & Ripples -->
    <g v-if="rainy" class="rain-layer">
      <g opacity=".62">
        <ellipse cx="180" cy="292" rx="38" ry="6" fill="url(#wetReflect)" />
        <ellipse cx="470" cy="274" rx="46" ry="7" fill="url(#wetReflect)" />
        <ellipse cx="640" cy="308" rx="34" ry="5" fill="url(#wetReflect)" />
      </g>
      <g class="rain-fall" stroke="#dcecf4" stroke-width="1.3" opacity=".68" stroke-linecap="round">
        <path v-for="i in 36" :key="'r1-' + i" :d="`M${(i * 137) % 800} ${(i * 71) % 340}l-4 11`" />
      </g>
      <g class="rain-fall delayed" stroke="#e4f2f8" stroke-width="1.15" opacity=".52" stroke-linecap="round">
        <path v-for="i in 30" :key="'r2-' + i" :d="`M${(i * 173 + 23) % 800} ${(i * 89 + 19) % 340}l-4 10`" />
      </g>
      <g fill="none" stroke="#e4f2f8" stroke-width="1">
        <ellipse class="ripple" cx="180" cy="290" rx="10" ry="2.5" />
        <ellipse class="ripple" style="animation-delay: .55s" cx="470" cy="272" rx="12" ry="3" />
        <ellipse class="ripple" style="animation-delay: 1.1s" cx="640" cy="306" rx="9" ry="2.2" />
      </g>
    </g>

    <!-- Conservatory Greenhouse -->
    <g v-if="greenhouse">
      <path d="M85 258V87L396 18l319 69v171Z" fill="#cde5d1" fill-opacity=".86" stroke="#6a887b" stroke-width="8" stroke-linejoin="round" />
      <path d="M85 87h630M396 18v240m-170-56V58m323 144V58" fill="none" stroke="#7f9f92" stroke-width="4.5" />
      <path d="M120 120 180 60m360 110 85-85" stroke="#ffffff" stroke-width="5" opacity=".25" stroke-linecap="round" />
      <use v-for="i in 7" :key="i" href="#fern" :transform="`translate(${i * 73 + 86} 231)`" />
    </g>

    <!-- Garden Planted Daisy Progress -->
    <g v-if="scene === 'garden' && plant" transform="translate(376 245)">
      <ellipse rx="20" ry="6.5" fill="#8f6b4f" stroke="#6c4f39" stroke-width="1" />
      <path v-if="plant >= 2" d="M0 0q-4-10 0-23m-1 14q-15 1-14-9 11-1 14 9" fill="#6d9970" stroke="#4f7b5d" stroke-width="1.3" />
      <g v-if="plant === 3">
        <ellipse v-for="i in 6" :key="i" cx="0" cy="-29" rx="3.2" ry="6.5" :transform="`rotate(${i * 60} 0 -23)`" fill="#fff6cf" stroke="#e4cfa0" stroke-width=".6" />
        <circle cy="-23" r="4.2" fill="#e0a94f" />
      </g>
    </g>

    <!-- Dynamic Café Tables / Bedroom Pouf / Garden Ferns -->
    <g v-for="r in furniture" :key="r.x" :transform="`translate(${r.x * 8} ${r.y * 3.4})`">
      <g v-if="scene === 'cafe'">
        <path d="M-32 0v-25m63 25v-25" stroke="#6e5344" stroke-width="5.5" stroke-linecap="round" />
        <ellipse cy="-29" rx="46" ry="12" fill="#be926f" stroke="#7f5c49" stroke-width="1.4" />
        <path d="M-8-42h14v13H-8Z" fill="#fff5db" stroke="#cbb28a" stroke-width="1" />
      </g>
      <use v-else-if="scene === 'room'" href="#pouf" />
      <use v-else href="#fern" />
    </g>
    <!-- Two-Tier Sunlit Motes & Nocturnal Fireflies -->
    <g v-if="!night && ['room', 'cafe', 'garden'].includes(scene)" class="motes" fill="#fff7d4" pointer-events="none">
      <g class="motes-far" opacity=".5">
        <circle v-for="i in 6" :key="'mtf' + i" :cx="(i * 127 + 30) % 760" :cy="54 + (i * 37) % 180" r="1.1" />
      </g>
      <g class="motes-near" opacity=".82">
        <circle v-for="i in 6" :key="'mtn' + i" :cx="(i * 113 + 75) % 750" :cy="78 + (i * 31) % 160" r="1.8" />
      </g>
    </g>
    <g v-if="night && ['garden', 'roof'].includes(scene)" class="fireflies" pointer-events="none">
      <g v-for="i in 9" :key="'ff' + i" :transform="`translate(${(i * 91 + 35) % 760} ${110 + (i * 37) % 165})`">
        <circle r="6" fill="url(#lampGlow)" />
        <circle r="1.6" fill="#fff3b5" />
      </g>
    </g>
  </svg>
</template>
