<script setup>
defineProps({ lunar: Boolean })
</script>

<template>
  <svg class="illustration cover-art" :class="{ 'is-lunar': lunar }" viewBox="0 0 800 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="ms" x1="0" y1="0" x2=".35" y2="1">
        <stop offset="0%" stop-color="#8ec1c7" />
        <stop offset="52%" stop-color="#d7e4ce" />
        <stop offset="100%" stop-color="#f8dfb9" />
      </linearGradient>
      <linearGradient id="msNight" x1="0" y1="0" x2=".25" y2="1">
        <stop offset="0%" stop-color="#202d4d" />
        <stop offset="56%" stop-color="#47557a" />
        <stop offset="100%" stop-color="#9e8797" />
      </linearGradient>
      <radialGradient id="msSun" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fff8d6" stop-opacity=".95" />
        <stop offset="50%" stop-color="#ffeab3" stop-opacity=".35" />
        <stop offset="100%" stop-color="#ffeab3" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="msMoon" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fff5d1" stop-opacity=".92" />
        <stop offset="50%" stop-color="#dbe7f7" stop-opacity=".32" />
        <stop offset="100%" stop-color="#dbe7f7" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="msHillFar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#9db9ab" />
        <stop offset="100%" stop-color="#7f9f92" />
      </linearGradient>
      <linearGradient id="msHillNear" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#88a98e" />
        <stop offset="100%" stop-color="#6b8b76" />
      </linearGradient>
      <linearGradient id="msWallWarm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f6e5c7" />
        <stop offset="100%" stop-color="#dcc19b" />
      </linearGradient>
      <linearGradient id="msWallSage" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e5e6d2" />
        <stop offset="100%" stop-color="#c4ccb5" />
      </linearGradient>
      <linearGradient id="msRoof" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#c67d6e" />
        <stop offset="100%" stop-color="#96564c" />
      </linearGradient>
      <linearGradient id="msWindowGlow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#8fb8b6" />
        <stop offset="60%" stop-color="#d8e3cd" />
        <stop offset="100%" stop-color="#f7dfb1" />
      </linearGradient>
      <linearGradient id="msWindowLit" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffefba" />
        <stop offset="100%" stop-color="#f2b866" />
      </linearGradient>
      <pattern id="msTiles" width="26" height="14" patternUnits="userSpaceOnUse">
        <rect width="26" height="14" fill="#cbb699" />
        <rect x="1" y="1" width="11" height="5" rx="2" fill="#d7c4a9" />
        <rect x="14" y="1" width="11" height="5" rx="2" fill="#d1bd9f" />
        <rect x="7" y="8" width="12" height="5" rx="2" fill="#d9c6ab" />
        <rect x="-5" y="8" width="10" height="5" rx="2" fill="#cfbba0" />
        <rect x="21" y="8" width="10" height="5" rx="2" fill="#cfbba0" />
      </pattern>
    </defs>

    <!-- Sky & Sun / Lunar Twilight Crossfade -->
    <rect width="800" height="340" fill="url(#ms)" />
    <rect class="cover-night-sky" width="800" height="340" fill="url(#msNight)" />

    <circle class="sun-halo" cx="645" cy="58" r="94" fill="url(#msSun)" />
    <circle cx="645" cy="58" r="29" fill="#fff6cf" />

    <g class="cover-night-stars" fill="#fff4cf">
      <circle class="sun-halo" cx="645" cy="58" r="98" fill="url(#msMoon)" />
      <circle cx="645" cy="58" r="27" fill="#fff3c7" />
      <circle v-for="s in 24" :key="'st' + s" class="twinkle" :style="{ animationDelay: `${(s % 6) * 0.4}s` }" :cx="(s * 97 + 30) % 790" :cy="(s * 43 + 12) % 135" :r="s % 3 === 0 ? 1.4 : 0.85" />
    </g>

    <!-- Soft Layered Drifting Clouds -->
    <g fill="#fff8e8" opacity=".84">
      <path class="cloud-drift" d="M120 62q4-11 18-10 5-16 22-13 12 0 15 12 11-7 21 2 11-2 15 9Z" />
      <path class="cloud-drift slow" d="M350 48q3-9 14-8 4-13 17-10 9 0 12 9 8-6 16 2 9-2 12 7Z" opacity=".72" />
      <path class="cloud-drift" d="M510 78q3-8 12-7 3-11 15-8 8 0 10 8 7-5 14 1 8-2 10 6Z" opacity=".62" />
    </g>

    <!-- Distant Gliding Swallows -->
    <g class="bird-glide" fill="none" stroke="#5f7e78" stroke-width="1.4" stroke-linecap="round" opacity=".62">
      <path d="M542 46q5-5 10 0 5-5 10 0" />
      <path d="M572 34q4-4 8 0 4-4 8 0" />
      <path d="M506 54q3.5-3.5 7 0 3.5-3.5 7 0" opacity=".75" />
    </g>

    <!-- Distant Hills & Cypresses -->
    <path d="M0 198Q145 106 340 172T700 138L800 124V340H0Z" fill="url(#msHillFar)" />
    <g fill="#6d8c7b" class="sway-gentle">
      <path d="M180 165q5-36 10 0Z" />
      <path d="M198 168q4-28 8 0Z" />
      <path d="M742 150q6-42 12 0Z" />
      <path d="M760 154q5-32 10 0Z" />
    </g>
    <path d="M0 226Q220 175 460 212T800 185V340H0Z" fill="url(#msHillNear)" />

    <!-- Villa Bigotes Townhouses (3 distinct structures) -->
    <!-- Left Building -->
    <g transform="translate(268 78)">
      <rect x="110" y="14" width="16" height="32" fill="#b47566" stroke="#7c4e44" stroke-width="1.2" />
      <rect x="107" y="11" width="22" height="5" rx="1" fill="#88574c" />
      <path d="M0 64 72 6l72 58v134H0Z" fill="url(#msWallSage)" stroke="#8c9581" stroke-width="1.2" />
      <path d="M-12 61 72-3l84 64-6 9L72 10-6 70Z" fill="url(#msRoof)" stroke="#754139" stroke-width="1.3" />
      <path d="M0 122h144v4H0Z" fill="#b3baa3" />
      <!-- Tiny Perched Cat Silhouette on Left Roof Edge -->
      <path d="M24 38q0-6 4-7l1-4 3 3 3-3 1 4q4 1 4 7Z" fill="#515c56" opacity=".82" />
      <g v-for="n in 6" :key="n" :transform="`translate(${16+((n-1)%3)*44} ${72+Math.floor((n-1)/3)*56})`">
        <path d="M0 36V12a12 12 0 0 1 24 0v24Z" fill="url(#msWindowGlow)" stroke="#fbf1d8" stroke-width="3" />
        <path v-if="n !== 2" class="window-lit" d="M0 36V12a12 12 0 0 1 24 0v24Z" fill="url(#msWindowLit)" stroke="#fbf1d8" stroke-width="3" />
        <path d="M12 0v36M0 18h24" stroke="#fbf1d8" stroke-width="1.5" />
        <path d="M-3 36h30v4H-3Z" fill="#9ea691" />
      </g>
    </g>

    <!-- Right Building -->
    <g transform="translate(572 64)">
      <rect x="20" y="16" width="14" height="28" fill="#b47566" stroke="#7c4e44" stroke-width="1.2" />
      <path d="M0 64 74 8l74 56v144H0Z" fill="url(#msWallWarm)" stroke="#b39a7d" stroke-width="1.2" />
      <path d="M-12 60 74-2l86 62-6 9L74 11-6 69Z" fill="url(#msRoof)" stroke="#754139" stroke-width="1.3" />
      <g v-for="n in 6" :key="n" :transform="`translate(${16+((n-1)%3)*46} ${74+Math.floor((n-1)/3)*58})`">
        <path d="M0 36V12a12 12 0 0 1 24 0v24Z" fill="url(#msWindowGlow)" stroke="#fcf3dc" stroke-width="3" />
        <path v-if="n !== 4" class="window-lit" d="M0 36V12a12 12 0 0 1 24 0v24Z" fill="url(#msWindowLit)" stroke="#fcf3dc" stroke-width="3" />
        <path d="M12 0v36M0 18h24" stroke="#fcf3dc" stroke-width="1.5" />
        <rect x="-4" y="34" width="32" height="5" rx="1" fill="#b57d68" />
        <circle cx="4" cy="33" r="2.5" fill="#6f9471" /><circle cx="12" cy="32" r="3" fill="#e59d88" /><circle cx="20" cy="33" r="2.5" fill="#6f9471" />
      </g>
    </g>

    <!-- Center Hero Building (Villa Bigotes Main Facade) -->
    <g transform="translate(414 42)">
      <!-- Drop shadow on flanking facades -->
      <rect x="-8" y="64" width="176" height="170" fill="#46423a" opacity=".12" />
      <g class="smoke-wisp" fill="#fff7e2" opacity=".46">
        <circle cx="33" cy="-2" r="5" /><circle cx="38" cy="-11" r="6.5" opacity=".7" /><circle cx="34" cy="-22" r="4.5" opacity=".5" />
      </g>
      <rect x="24" y="10" width="18" height="38" fill="#b47566" stroke="#7c4e44" stroke-width="1.2" />
      <rect x="21" y="7" width="24" height="5" rx="1" fill="#88574c" />
      <path d="M0 68 84 6l84 62v162H0Z" fill="url(#msWallWarm)" stroke="#b39a7d" stroke-width="1.3" />
      <!-- Gable cat-ear finial -->
      <path d="M77 4l3-7 4 4 4-4 3 7" fill="#9a5c50" stroke="#754139" stroke-width="1" />
      <path d="M-14 65 84-3l98 68-6 10L84 11-8 75Z" fill="url(#msRoof)" stroke="#754139" stroke-width="1.4" />
      <path d="M-4 66 84 6l88 60" fill="none" stroke="#e4a995" stroke-width="1.5" opacity=".7" />
      <!-- Attic bullseye window -->
      <circle cx="84" cy="40" r="11" fill="#ffefc2" stroke="#fcf3dc" stroke-width="3" />
      <path d="M84 29v22M73 40h22" stroke="#fcf3dc" stroke-width="1.5" />
      <!-- Moldings -->
      <rect x="-3" y="130" width="174" height="5" rx="1" fill="#cbb190" />
      <rect x="-3" y="196" width="174" height="5" rx="1" fill="#cbb190" />
      <!-- Windows with Shutters -->
      <g v-for="n in 6" :key="n" :transform="`translate(${18+((n-1)%3)*52} ${78+Math.floor((n-1)/3)*64})`">
        <rect x="-7" y="10" width="6" height="28" rx="1" fill="#708f7c" />
        <rect x="25" y="10" width="6" height="28" rx="1" fill="#708f7c" />
        <path d="M0 38V12a12 12 0 0 1 24 0v26Z" fill="url(#msWindowGlow)" stroke="#fcf3dc" stroke-width="3" />
        <path class="window-lit" d="M0 38V12a12 12 0 0 1 24 0v26Z" fill="url(#msWindowLit)" stroke="#fcf3dc" stroke-width="3" />
        <path d="M12 0v38M0 19h24" stroke="#fcf3dc" stroke-width="1.5" />
      </g>
      <!-- Center Wrought-Iron Balcony -->
      <g transform="translate(60 112)">
        <rect x="-4" y="0" width="44" height="12" fill="none" stroke="#424f49" stroke-width="1.6" />
        <path d="M3 0v12M10 0v12M17 0v12M25 0v12M32 0v12" stroke="#424f49" stroke-width="1.2" />
      </g>
      <!-- Arched Entrance & Awning -->
      <path d="M68 230v-32a16 16 0 0 1 32 0v32Z" fill="#5b7a6e" stroke="#f7ebd2" stroke-width="3" />
      <g transform="translate(56 196)">
        <path d="M0 0h56l4 11H-4Z" fill="#fbf0d6" />
        <path d="M0 0h14l1 11H-1Zm28 0h14l1 11H27Z" fill="#b96f64" />
      </g>
    </g>

    <!-- Climbing Foliage & Courtyard Flowers -->
    <g fill="#6c8d6a" opacity=".9" class="sway-gentle">
      <circle cx="385" cy="256" r="18" /><circle cx="405" cy="248" r="22" /><circle cx="422" cy="258" r="15" />
      <circle cx="678" cy="252" r="21" /><circle cx="702" cy="242" r="26" /><circle cx="728" cy="255" r="18" />
    </g>
    <g fill="#85a67f" class="sway-gentle">
      <circle cx="394" cy="254" r="12" /><circle cx="704" cy="246" r="16" />
    </g>
    <g fill="#f9d8c0">
      <circle cx="392" cy="248" r="2.6" /><circle cx="408" cy="242" r="2.8" /><circle cx="694" cy="244" r="2.8" /><circle cx="715" cy="239" r="2.5" />
    </g>

    <!-- Courtyard Butterflies -->
    <g class="butterfly-float" transform="translate(402 228)">
      <path d="M0 0c-3-4-7-2-5 2 1 1 3 1 5-2Zm0 0c3-4 7-2 5 2-1 1-3 1-5-2Z" fill="#fbe2c8" stroke="#c8836b" stroke-width=".7" />
    </g>
    <g class="butterfly-float slow" transform="translate(706 220)">
      <path d="M0 0c-3-3.5-6-1.5-4.5 1.8 1 1 2.8.8 4.5-1.8Zm0 0c3-3.5 6-1.5 4.5 1.8-1 1-2.8.8-4.5-1.8Z" fill="#ffeeb5" stroke="#c59956" stroke-width=".7" />
    </g>

    <!-- Garden Wall & Wrought-Iron Street Lantern -->
    <path d="M250 262h550v26H250Z" fill="#dfd0b5" stroke="#b39c7f" stroke-width="1.2" />
    <path d="M246 259h558v6H246Z" fill="#cbb494" />
    <g transform="translate(744 176)">
      <path d="M0 84V14" stroke="#424f49" stroke-width="3.2" />
      <path d="M-8 14h16l-3-10h-10Z" fill="#ffefb8" stroke="#424f49" stroke-width="1.5" />
      <circle class="lamp-halo" cx="0" cy="9" r="16" fill="#ffe79e" opacity=".42" />
      <circle class="cover-lantern-night" cx="0" cy="9" r="26" fill="url(#msSun)" />
    </g>

    <!-- Cobblestone Foreground -->
    <path d="M0 282q260-28 800-4v62H0Z" fill="url(#msTiles)" />
    <path d="M0 282q260-28 800-4" fill="none" stroke="#9e876d" stroke-width="2" />
  </svg>
</template>
