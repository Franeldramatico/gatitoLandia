<script setup>
import {computed,ref} from 'vue'
import Garden from './Garden.vue'
import Interior from './Interior.vue'
import Street from './Street.vue'
const props=defineProps({game:Object,speaker:Number,en:Boolean,label:String})
const emit=defineEmits(['travel','move'])
const svg=ref(null)
const sprites=import.meta.glob('../../habitantes/*.png',{eager:true,import:'default'})
const sprite=(cat,pose)=>sprites[`../../habitantes/${cat}-${pose}.png`]
const cats=['franxito','aranxita']
const zoom=computed(()=>{
  if(props.speaker==null)return 'translate(0px,0px) scale(1)'
  const z=1.55, x=props.game.spots[props.speaker]
  return `translate(${Math.max(800*(1-z),Math.min(0,400-x*z))}px,-160px) scale(${z})`
})
function walk(e){
  const pt=new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.value.getScreenCTM().inverse())
  emit('move',pt.x)
}
</script>
<template>
  <div id="world">
    <svg ref="svg" viewBox="0 0 800 340" role="img" :aria-label="label" @click="walk">
      <g class="camera" :style="{transform:zoom}">
        <Interior v-if="game.home"/><Garden v-else-if="game.place==='garden'"/><Street v-else :place="game.place"/>
        <g v-for="(cat,i) in cats" :key="cat" class="walker" :style="{transform:`translate(${game.spots[i]}px,${game.depth[i]}px)`}">
          <ellipse cy="305" rx="38" ry="5" fill="#58634a" opacity=".2"/>
          <g :key="game.spots[i]+':'+game.poses[i]" :class="{step:game.poses[i]==='camina',bounce:game.poses[i]==='feliz'}">
            <image :href="sprite(cat,speaker===i?'quieta':game.poses[i])" x="-80" y="197" width="160" height="109" preserveAspectRatio="xMidYMax meet"/>
            <image v-if="speaker===i" class="mouth" :href="sprite(cat,'habla')" x="-80" y="197" width="160" height="109" preserveAspectRatio="xMidYMax meet"/>
          </g>
        </g>
      </g>
    </svg>
    <span id="clock">{{ en?'Day':'Día' }} {{ 1+Math.floor(game.hour/24) }} · {{ String(game.hour%24).padStart(2,'0') }}:00</span>
    <span class="location">{{ label }}</span>
  </div>
</template>
<style scoped>
#world{aspect-ratio:800/340}.location{position:absolute;right:12px;top:12px;background:#fff8e8ed;border-radius:18px;padding:7px 12px;font-size:13px}svg{cursor:crosshair}.camera{transition:transform .65s ease-in-out}.walker{transition:transform .18s ease-out}.mouth{animation:speak .32s steps(1,end) 7;opacity:0}.step{animation:hop .18s ease-in-out 3}.bounce{animation:hop .35s ease-in-out 2}
@keyframes speak{0%,65%{opacity:1}40%,85%{opacity:0}}
@keyframes hop{50%{transform:translateY(-5px) rotate(1deg)}}
@media(prefers-reduced-motion:reduce){.camera,.walker{transition:none}.camera{transform:none!important}.step,.bounce,.mouth{animation:none}}
</style>
