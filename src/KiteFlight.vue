<script setup>
import {ref,computed,onMounted,onUnmounted} from 'vue'
const props=defineProps({count:Number,en:Boolean})
const emit=defineEmits(['catch'])
const field=ref(null),x=ref(30),y=ref(60)
const gust=computed(()=>[[64,48],[32,72],[71,63]][props.count]||[50,50])
function steer(nx,ny){
 x.value=Math.max(6,Math.min(94,nx));y.value=Math.max(34,Math.min(90,ny))
 if(Math.hypot(x.value-gust.value[0],y.value-gust.value[1])<9)emit('catch')
}
function pointer(e){const r=field.value.getBoundingClientRect();steer((e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100)}
function keys(e){const d={ArrowLeft:[-4,0],ArrowRight:[4,0],ArrowUp:[0,-4],ArrowDown:[0,4]}[e.key];if(d){e.preventDefault();steer(x.value+d[0],y.value+d[1])}}
onMounted(()=>window.addEventListener('keydown',keys));onUnmounted(()=>window.removeEventListener('keydown',keys))
</script>
<template><div ref="field" class="kitefield" @pointerdown="pointer" @pointermove="e=>{if(e.buttons)pointer(e)}">
 <span class="gust" :style="{left:gust[0]+'%',top:gust[1]+'%'}">≈</span>
 <span class="kite" :style="{left:x+'%',top:y+'%'}">🪁</span>
 <small>{{ en?'Steer with the arrows or touch a gust':'Guía con las flechas o toca una corriente' }}</small>
</div></template>
<style scoped>.kitefield{position:absolute;inset:0;touch-action:none;cursor:crosshair}.kite,.gust{position:absolute;transform:translate(-50%,-50%);font-size:45px;pointer-events:none}.kite{transition:top .12s,left .12s}.gust{border:2px dashed #ffedb8;color:white;background:#527f91aa;border-radius:50%;width:66px;text-align:center}.kitefield small{position:absolute;bottom:6%;left:50%;transform:translateX(-50%);background:#fff2db;border-radius:14px;padding:8px 12px;text-align:center}</style>
