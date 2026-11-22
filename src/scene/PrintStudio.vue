<template>
  <defs>
    <!-- Atmospheric & Surface Gradients -->
    <linearGradient id="plaster" x1="0" y1="0" x2=".65" y2="1">
      <stop offset="0%" stop-color="#fbf3df" />
      <stop offset="55%" stop-color="#ead7b8" />
      <stop offset="100%" stop-color="#cfb89e" />
    </linearGradient>
    <linearGradient id="sageWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c3ceb8" />
      <stop offset="100%" stop-color="#9fb096" />
    </linearGradient>
    <linearGradient id="walnut" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c6916b" />
      <stop offset="55%" stop-color="#9e6d53" />
      <stop offset="100%" stop-color="#6b4a40" />
    </linearGradient>
    <linearGradient id="jade" x1="0" y1="0" x2=".9" y2="1">
      <stop offset="0%" stop-color="#b4d0b2" />
      <stop offset="55%" stop-color="#7fa390" />
      <stop offset="100%" stop-color="#4e716a" />
    </linearGradient>
    <linearGradient id="terracotta" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cf8673" />
      <stop offset="60%" stop-color="#b36b5c" />
      <stop offset="100%" stop-color="#8b4f45" />
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#76adb4" />
      <stop offset="48%" stop-color="#cde0cc" />
      <stop offset="100%" stop-color="#fce8bd" />
    </linearGradient>
    <linearGradient id="nightGlass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#22314d" />
      <stop offset="65%" stop-color="#354868" />
      <stop offset="100%" stop-color="#5a6583" />
    </linearGradient>
    <linearGradient id="sunsetGlass" x1="0" y1="0" x2=".8" y2="1">
      <stop offset="0%" stop-color="#7d8fb2" />
      <stop offset="50%" stop-color="#e5b398" />
      <stop offset="100%" stop-color="#ffd99e" />
    </linearGradient>
    <linearGradient id="sunsetSky" x1="0" y1="0" x2=".3" y2="1">
      <stop offset="0%" stop-color="#617da6" />
      <stop offset="52%" stop-color="#de9f8a" />
      <stop offset="100%" stop-color="#f9dca6" />
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff4ca" />
      <stop offset="50%" stop-color="#e5be76" />
      <stop offset="100%" stop-color="#ae7f46" />
    </linearGradient>
    <linearGradient id="light" x1=".1" y1="0" x2=".9" y2="1">
      <stop offset="0%" stop-color="#fff4c4" stop-opacity=".62" />
      <stop offset="60%" stop-color="#fff0bc" stop-opacity=".22" />
      <stop offset="100%" stop-color="#fff0bc" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="eveningSky" x1="0" y1="0" x2=".15" y2="1">
      <stop offset="0%" stop-color="#6b789b" />
      <stop offset="48%" stop-color="#d49386" />
      <stop offset="100%" stop-color="#fadba8" />
    </linearGradient>
    <linearGradient id="railMist" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b8c9de" stop-opacity="0" />
      <stop offset="55%" stop-color="#cad7e8" stop-opacity=".24" />
      <stop offset="100%" stop-color="#dbe4f0" stop-opacity=".06" />
    </linearGradient>
    <linearGradient id="wetReflect" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffe7a6" stop-opacity=".42" />
      <stop offset="100%" stop-color="#ffe7a6" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="headlight" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fff5c0" stop-opacity=".75" />
      <stop offset="55%" stop-color="#ffe799" stop-opacity=".25" />
      <stop offset="100%" stop-color="#ffe799" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="amberBeam" x1=".1" y1="0" x2=".9" y2="1">
      <stop offset="0%" stop-color="#ffd58b" stop-opacity=".58" />
      <stop offset="65%" stop-color="#ffca7a" stop-opacity=".18" />
      <stop offset="100%" stop-color="#ffca7a" stop-opacity="0" />
    </linearGradient>
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff7d4" stop-opacity=".95" />
      <stop offset="45%" stop-color="#ffeab0" stop-opacity=".42" />
      <stop offset="100%" stop-color="#ffeab0" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff5d1" stop-opacity=".85" />
      <stop offset="45%" stop-color="#dce7f5" stop-opacity=".28" />
      <stop offset="100%" stop-color="#dce7f5" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="lampGlow" cx="50%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#ffe9a6" stop-opacity=".72" />
      <stop offset="55%" stop-color="#ffd98a" stop-opacity=".24" />
      <stop offset="100%" stop-color="#ffd98a" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="shelfWood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b98763" />
      <stop offset="100%" stop-color="#875d44" />
    </linearGradient>

    <!-- Textured Patterns -->
    <pattern id="boards" width="130" height="24" patternUnits="userSpaceOnUse" patternTransform="skewX(-24)">
      <rect width="130" height="24" fill="#cfa988" />
      <rect width="65" height="12" fill="#d9b797" fill-opacity=".52" />
      <rect x="65" y="12" width="65" height="12" fill="#c79e7d" fill-opacity=".42" />
      <path d="M0 0h130M0 0v12m65 0v12M0 12h130" fill="none" stroke="#97715a" stroke-width=".75" />
      <path d="M10 6q20-2 36 0t20-1M16 18q15-2 32 0t24 0" stroke="#edd3ae" fill="none" stroke-width=".85" opacity=".7" />
      <circle cx="4" cy="4" r=".7" fill="#7c5b48" opacity=".4" />
      <circle cx="69" cy="16" r=".7" fill="#7c5b48" opacity=".4" />
    </pattern>
    <pattern id="tiles" width="56" height="30" patternUnits="userSpaceOnUse">
      <rect width="56" height="30" fill="#e2ceb1" />
      <path d="M28 0 56 15 28 30 0 15Z" fill="#c8ac91" />
      <path d="M28 5 46 15 28 25 10 15Z" fill="#d3b99f" stroke="#ecddc3" stroke-width=".7" />
      <circle cx="28" cy="15" r="1.6" fill="#9a7b66" opacity=".45" />
    </pattern>
    <pattern id="brocade" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M16 4c-5 4-5 9 0 13 5-4 5-9 0-13Zm0 14v6M8 22c3-2 5-2 8 0m8 0c-3-2-5-2-8 0" fill="none" stroke="#937c5b" opacity=".2" stroke-width=".85" />
      <circle cx="16" cy="28" r="1" fill="#937c5b" opacity=".18" />
    </pattern>
    <pattern id="quiltSage" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="#7b9987" />
      <path d="M10 0 20 10 10 20 0 10Z" fill="none" stroke="#9eb8a8" stroke-width=".8" opacity=".65" />
      <circle cx="10" cy="10" r="1.1" fill="#e6edd8" opacity=".55" />
    </pattern>
    <pattern id="quiltRose" width="18" height="18" patternUnits="userSpaceOnUse">
      <rect width="18" height="18" fill="#c57e70" />
      <path d="M0 9h18M9 0v18" stroke="#df9e90" stroke-width=".75" opacity=".55" />
      <circle cx="4.5" cy="4.5" r="1" fill="#f7dfd2" opacity=".6" />
      <circle cx="13.5" cy="13.5" r="1" fill="#f7dfd2" opacity=".6" />
    </pattern>
    <pattern id="cobble" width="44" height="22" patternUnits="userSpaceOnUse">
      <rect width="44" height="22" fill="#c1b099" />
      <rect x="2" y="2" width="18" height="8" rx="3" fill="#ccbba4" stroke="#a6937c" stroke-width=".7" />
      <rect x="23" y="2" width="19" height="8" rx="3" fill="#c6b49d" stroke="#a6937c" stroke-width=".7" />
      <rect x="11" y="12" width="20" height="8" rx="3" fill="#cfbfa9" stroke="#a6937c" stroke-width=".7" />
      <rect x="-9" y="12" width="18" height="8" rx="3" fill="#c4b29a" stroke="#a6937c" stroke-width=".7" />
      <rect x="33" y="12" width="18" height="8" rx="3" fill="#c7b59d" stroke="#a6937c" stroke-width=".7" />
    </pattern>
    <pattern id="brick" width="32" height="16" patternUnits="userSpaceOnUse">
      <rect width="32" height="16" fill="#9c7065" opacity=".18" />
      <rect x="1" y="1" width="14" height="6" fill="#8b5c50" opacity=".16" />
      <rect x="17" y="9" width="14" height="6" fill="#b37c6d" opacity=".14" />
      <path d="M0 8h32M0 16h32M16 0v8M0 8v8M32 8v8" fill="none" stroke="#6f4d46" stroke-width=".7" opacity=".32" />
    </pattern>

    <!-- Reusable Illustrated Props -->
    <g id="fern">
      <ellipse cy="3" rx="25" ry="5" fill="#433834" opacity=".18" />
      <path d="M-14-23h28l-5 25H-9z" fill="url(#terracotta)" stroke="#8c5447" stroke-width="1" />
      <path d="M-16-25h32v6h-32z" rx="2" fill="#e1a486" stroke="#9f6452" stroke-width="1" />
      <path d="M-12-19h24" stroke="#f2c4a6" stroke-width="1" opacity=".6" />
      <g stroke="#476c5d" stroke-width="1.2" stroke-linejoin="round">
        <path d="M0-24q-23-34-34-31 4 24 34 31Z" fill="#698b6c" />
        <path d="M0-24q20-31 35-26-5 21-35 26Z" fill="#6d9170" />
        <path d="M0-24q-12-43-3-55 15 27 3 55Z" fill="#7fa37c" />
        <path d="M0-24q6-38 22-45 3 26-22 45Z" fill="#8bb084" />
        <path d="M0-24q-19-20-29-14 7 15 29 14Z" fill="#89ad82" />
      </g>
    </g>

    <g id="pouf">
      <ellipse cy="5" rx="21" ry="6" fill="#463a33" opacity=".18" />
      <ellipse cx="0" cy="-4" rx="19" ry="11" fill="#e0ba8a" stroke="#9a724b" stroke-width="1.3" />
      <path d="M-15-6q15 6 30 0m-27-5q12 5 24 0" fill="none" stroke="#c29564" stroke-width="1.3" />
      <ellipse cx="0" cy="-9" rx="11" ry="4.5" fill="#edd1a6" opacity=".65" />
    </g>

    <g id="lamp">
      <g class="pendulum-sway">
        <circle class="lamp-halo" cx="0" cy="4" r="36" fill="url(#lampGlow)" />
        <path d="M0-42v21" stroke="#665246" stroke-width="2" />
        <circle cx="0" cy="-21" r="2.6" fill="#d7b67a" />
        <ellipse cx="0" cy="-3" rx="6.5" ry="7" fill="#ffeca8" />
        <path d="M-19-5q3-11 14-16h10q11 5 14 16Z" fill="#4f7368" stroke="#39564e" stroke-width="1.2" />
        <path d="M-19-5h38" stroke="#e4c587" stroke-width="2.2" stroke-linecap="round" />
      </g>
    </g>

    <g id="awning">
      <path d="M-9 22h162v5H-9z" fill="#483b36" opacity=".16" />
      <path d="M0 0h144l9 22H-9z" fill="#faf0d5" stroke="#a5866b" stroke-width="1.2" />
      <path v-for="i in 4" :key="i" :d="`M${(i-1)*36} 0h18l1 22h-20z`" fill="#b66e63" />
      <path d="M-9 22q9 8 18 0t18 0 18 0 18 0 18 0 18 0 18 0 18 0 18 0" fill="#f3dfc0" stroke="#9e7f66" stroke-width="1.3" />
    </g>

    <g id="cloud">
      <path d="M4 17q2-10 15-9 5-15 20-12 11 0 15 10 9-7 19 2 11-2 15 9Z" fill="#e9dfc7" opacity=".6" transform="translate(2 3)" />
      <path d="M0 16q3-11 16-10 4-15 20-12 11 0 14 11 10-8 20 1 12-3 17 10Z" fill="#fff9ea" />
    </g>

    <g id="window">
      <path d="M-4 58V21a24 24 0 0 1 48 0v37z" fill="#705949" opacity=".15" transform="translate(2 3)" />
      <path d="M0 58V20a20 20 0 0 1 40 0v38z" fill="url(#glass)" stroke="#fbf0d6" stroke-width="4.5" />
      <circle cx="11" cy="48" r="8" fill="#6f9473" opacity=".32" />
      <circle cx="29" cy="46" r="10" fill="#7fa580" opacity=".28" />
      <path d="M6 20L20 6l4 4L6 28Zm8 22L34 22l4 4L14 48Z" fill="#fffaf0" opacity=".42" />
      <path d="M20 0v58M1 25h39" stroke="#fcf2d9" stroke-width="2.2" />
      <path d="M-5 58h50v5H-5z" rx="2" fill="#b38c72" stroke="#856552" stroke-width="1" />
    </g>

    <g id="poster">
      <rect x="2" y="3" width="44" height="60" rx="2" fill="#463a33" opacity=".16" />
      <rect width="44" height="60" rx="2" fill="#9c795e" stroke="#6f5441" stroke-width="1.2" />
      <rect x="3.5" y="3.5" width="37" height="53" fill="#fcf3d7" />
      <rect x="6.5" y="6.5" width="31" height="33" fill="#e7efe5" />
      <circle cx="27" cy="17" r="6.5" fill="#e09a6c" />
      <path d="M6.5 39.5 17 22l7 9 5-5 8.5 13.5Z" fill="#6b9384" />
      <path d="M11 45h22m-18 4h14" stroke="#99856a" stroke-width="1.4" stroke-linecap="round" />
    </g>

    <g id="facade">
      <path d="M-6 60 92 10l94 50v126H-6z" fill="url(#plaster)" stroke="#b3987c" stroke-width="1.2" />
      <!-- Roof & Chimney -->
      <path d="M138 14h18v30h-18z" fill="#b57d6a" stroke="#7d5246" stroke-width="1.2" />
      <path d="M135 12h24v5h-24z" fill="#8c5c4f" />
      <path d="M-18 57 91 0l110 57-5 10L91 17-13 67Z" fill="url(#terracotta)" stroke="#7f493f" stroke-width="1.4" />
      <path d="M-8 59 91 9l98 50" fill="none" stroke="#e4a490" stroke-width="1.5" opacity=".7" />
      <!-- Cornice & Moldings -->
      <path d="M0 119h184v5H0z" fill="#d9c1a3" stroke="#ac8d70" stroke-width=".9" />
      <use v-for="i in 6" :key="i" href="#window" :transform="`translate(${12+((i-1)%3)*59} ${60+Math.floor((i-1)/3)*61}) scale(.69)`" />
      <!-- Wrought-iron balcony rail on upper middle -->
      <path d="M68 103h48v9H68z" fill="none" stroke="#495750" stroke-width="1.5" />
      <path d="M76 103v9m8-9v9m8-9v9m8-9v9m8-9v9" stroke="#495750" stroke-width="1.1" />
      <path d="M0 181h184v7H0z" fill="#b89879" />
    </g>
  </defs>
</template>
