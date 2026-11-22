<template>
 <defs>
  <linearGradient id="plaster" x2=".9" y2=".85"><stop stop-color="#faf0d4"/><stop offset=".5" stop-color="#e4cfaa"/><stop offset="1" stop-color="#c4afa0"/></linearGradient>
  <linearGradient id="walnut" x2="0" y2="1"><stop stop-color="#bd8a67"/><stop offset="1" stop-color="#795550"/></linearGradient>
  <linearGradient id="jade" x2="1" y2=".9"><stop stop-color="#a9c7ad"/><stop offset=".55" stop-color="#759a89"/><stop offset="1" stop-color="#51756e"/></linearGradient>
  <linearGradient id="glass" x2="1" y2="1"><stop stop-color="#82b5ba"/><stop offset=".58" stop-color="#d2dbc1"/><stop offset="1" stop-color="#fae4b6"/></linearGradient>
  <linearGradient id="gold" x2="0" y2="1"><stop stop-color="#fff0bc"/><stop offset=".5" stop-color="#e4bd78"/><stop offset="1" stop-color="#b78b54"/></linearGradient>
  <linearGradient id="light" x2=".9" y2="1"><stop stop-color="#fff1ba" stop-opacity=".65"/><stop offset="1" stop-color="#fff0bc" stop-opacity="0"/></linearGradient>
  <pattern id="boards" width="130" height="22" patternUnits="userSpaceOnUse" patternTransform="skewX(-26)"><rect width="130" height="22" fill="#cdab8e"/><path d="M0 0h130M0 0v11m64 0v11M0 11h130" fill="none" stroke="#99745f" stroke-width=".65"/><path d="M8 6q19-2 33 0t23-1m14 12q12-2 31 0" stroke="#ead0a9" fill="none" stroke-width=".8"/></pattern>
  <pattern id="tiles" width="52" height="28" patternUnits="userSpaceOnUse"><rect width="52" height="28" fill="#ddc8a9"/><path d="M26 0 52 14 26 28 0 14Z" fill="#c7ab92"/><path d="M26 7l11 7-11 6-11-6z" fill="none" stroke="#e5d3b8" stroke-width=".8"/></pattern>
  <pattern id="brocade" width="28" height="26" patternUnits="userSpaceOnUse"><path d="M14 3q-9 6 0 12 9-6 0-12zm0 13v4" fill="none" stroke="#9a805d" opacity=".2" stroke-width=".7"/></pattern>
  <g id="fern"><ellipse cy="2" rx="23" ry="4" fill="#473e3e" opacity=".15"/><path d="M-14-23h28l-5 25H-9z" fill="#c17e63"/><path d="M-16-24h32v5h-32z" fill="#e0a487"/><g fill="#789776" stroke="#507766" stroke-width="1.3"><path d="M0-22q-20-38-31-37 2 24 31 37zm0 0q0-37 18-46 5 28-18 46zm0 0q13-23 32-18-6 15-32 18zm0 0q-10-42-4-52 13 26 4 52z"/></g></g>
  <g id="lamp"><path d="M0-36v15" stroke="#745f53" stroke-width="2"/><ellipse cy="-3" rx="7" ry="7" fill="#ffe7a7"/><path d="M-17-6q2-9 13-14h8q11 5 13 14z" fill="#587a70"/><path d="M-17-6h34" stroke="#d7bb81" stroke-width="2"/></g>
  <g id="awning"><path d="M0 0h144l8 21H-8z" fill="#f8e2bf"/><path v-for="i in 4" :key="i" :d="`M${(i-1)*36} 0h18l1 21h-20z`" fill="#b9756b"/><path d="M-8 21q10 9 20 0 10 9 20 0 10 9 20 0 10 9 20 0 10 9 20 0 10 9 20 0 10 9 20 0 10 9 20 0" fill="#ead0aa" stroke="#a98b70" stroke-width="1.3"/></g>
  <g id="cloud" fill="#fff6df"><path d="M0 15q3-10 16-9 4-15 19-12 11 0 14 11 10-8 20 1 12-3 17 9z"/></g>
  <g id="window"><path d="M0 58V20a20 20 0 0 1 40 0v38z" fill="url(#glass)" stroke="#f9ecd1" stroke-width="4"/><path d="M20 0v58M1 25h39" stroke="#fcf1d5" stroke-width="2"/><path d="M-4 59h48" stroke="#a7826a" stroke-width="4"/></g>
  <g id="poster"><rect width="42" height="58" rx="2" fill="#ad896c"/><rect x="3" y="3" width="36" height="52" fill="#fcf1ce"/><circle cx="26" cy="18" r="7" fill="#dc9b71"/><path d="M6 39l11-17 8 10 5-5 7 12z" fill="#73988b"/><path d="M10 44h22m-19 4h16" stroke="#a18d70" stroke-width="1.4"/></g>
  <g id="facade"><path d="M-6 60l98-50 94 50v126H-6z" fill="url(#plaster)"/><path d="M-18 57L91 0l110 57-4 9L91 17-13 67z" fill="#a66961"/><path d="M0 120h184M0 125h184" stroke="#b79879"/><use v-for="i in 6" :key="i" href="#window" :transform="`translate(${12+((i-1)%3)*59} ${60+Math.floor((i-1)/3)*61}) scale(.69)`"/><path d="M0 181h184v7H0z" fill="#ba997a"/></g>
 </defs>
</template>
