<script setup>
let seed = 13
const random = () => (seed = seed * 16807 % 2147483647) / 2147483647
const leaves = Array.from({length:150}, (_, i) => {
  const a = random()*2*Math.PI, r = Math.sqrt(random())
  return {x:669+Math.cos(a)*78*r, y:96+Math.sin(a)*64*r, color:['#8eaf78','#95b77b','#a8c789'][i%3]}
})
const grass = Array.from({length:85}, (_, i) => ({x:random()*800,y:226+random()*114,flower:i%4===0}))
  .filter(({x}) => x<=140 || x>=370)
</script>
<template>
  <g>
    <path d="M655 208l6-98h16l10 98Z" fill="#a48560"/>
    <ellipse v-for="(leaf,i) in leaves" :key="i" :cx="leaf.x" :cy="leaf.y" rx="17" ry="13" :fill="leaf.color"/>
    <g v-for="(blade,i) in grass" :key="i" :transform="`translate(${blade.x} ${blade.y})`">
      <path d="M0 0l-2 -5m2 5 3 -4" fill="none" stroke="#789a65" stroke-width="2"/>
      <circle v-if="blade.flower" cx="-2" cy="-6" r="3" fill="#fff2c4"/>
    </g>
  </g>
</template>
