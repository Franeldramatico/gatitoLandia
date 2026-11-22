<script setup>
import {reactive,computed,ref,watch,onMounted,onUnmounted,nextTick,defineAsyncComponent} from 'vue'
import {useStory,titles} from './useStory.js'
import {fieldSound} from './soundscape.js'
import MenuArt from './MenuArt.vue'
import portraitF from './portraits/retrato-franxito.webp?inline'
import portraitA from './portraits/retrato-aranxita.webp?inline'
import {objects,blocked,pathTo} from './paths.js'
import {rain} from './barrio.js'
const Illustration=defineAsyncComponent(()=>import('./scene/Illustration.vue'))
const KiteFlight=defineAsyncComponent(()=>import('./KiteFlight.vue'))
const Directory=defineAsyncComponent(()=>import('./Directory.vue'))
import './postales.css'
import './living.css'
const prefs=reactive({lang:'es',volume:35,ambient:22,voice:35,text:100})
try{Object.assign(prefs,JSON.parse(localStorage.getItem('villaPrefs')))}catch{}
watch(prefs,()=>{document.documentElement.lang=prefs.lang;try{localStorage.setItem('villaPrefs',JSON.stringify(prefs))}catch{}},{immediate:true})
const {s,page,slots,resume,store,mini,map,restore,collect,dialog,line,nodes,name,unit,place,bond,level,other,showOther,start,next,move,t}=useStory(prefs)
const assets=import.meta.glob('../habitantes/*.png',{eager:true,import:'default'})
const img=(n,p)=>assets[`../habitantes/${n.toLowerCase()}-${p}.png`]
const play=computed(()=>page.value==='play')
const night=computed(()=>s.scene==='rail'||s.period===2)
const companionX=computed(()=>s.scene==='hall'?76:64)
const moving=ref(false),bubble=ref(null),world=ref(null),replace=ref(null)
const camera=ref(null),album=ref(false),offset=ref(0),stageWidth=ref(innerWidth),stride=ref(false)
const photo=ref(false),pending=ref(null),notice=ref(''),offline=ref(false)
const sceneArt=computed(()=>s.scene==='guest'?'room':s.scene==='glass'?'garden':s.scene)
async function saveCopy(v){const {download}=await import('./keepsakes.js');download(new Blob([JSON.stringify({version:1,route:v})],{type:'application/json'}),`villa-${v.actor?'18':'15'}-dia-${v.day}.json`)}
async function readCopy(e){try{const f=e.target.files[0];if(!f)return;if(f.size>200000)throw Error();const {decodeSave}=await import('./keepsakes.js');pending.value=decodeSave(await f.text());notice.value=''}catch{notice.value=t('No se reconoce esta partida.','Unrecognized save file.')}finally{e.target.value=''}}
async function shoot(){try{const {photograph}=await import('./keepsakes.js');await photograph(world.value,camera.value.scrollLeft,camera.value.clientWidth,`${place.value} · ${t('Día','Day')} ${s.day} · Villa Bigotes`)}catch{notice.value=t('No se pudo crear la postal.','Could not create the postcard.')}}
async function cacheGame(){try{if(!import.meta.env.PROD)throw Error('dev');if(!('serviceWorker' in navigator))throw Error();await navigator.serviceWorker.register(import.meta.env.BASE_URL+'sw.js');const reg=await navigator.serviceWorker.ready
 await new Promise((ok,bad)=>{const ch=new MessageChannel();ch.port1.onmessage=e=>e.data==='ok'?ok():bad();reg.active.postMessage('download',[ch.port2])});offline.value=true;notice.value=t('Listo sin red. Puedes instalarlo desde el menú del navegador.','Ready offline. Install it from your browser menu.')
 }catch(e){notice.value=e.message==='dev'?t('Disponible en la versión de producción (npm run preview).','Available in the production preview.'):t('Descarga incompleta. Inténtalo con conexión.','Download incomplete. Try again online.')}}
let timer,audio,frame=0,last=0,goal=null,returnLabel='',ambience,travelled=0
const held=new Set(),facing=ref(1)
const pose=computed(()=>line.value?.[0]==='me'?'quieta':moving.value?'camina':s.scene==='rail'?'sienta':'quieta')
const flip=computed(()=>facing.value*(s.actor&&pose.value==='camina'?-1:1))
function sound(knock=false){
  try{audio??=new AudioContext();audio.resume().catch(()=>{});if(!prefs.volume)return
    for(let i=0;i<(knock?2:1);i++){const o=audio.createOscillator(),g=audio.createGain(),at=audio.currentTime+i*.16;o.type=knock?'triangle':'sine';o.frequency.value=knock?135:660;g.gain.setValueAtTime(.001,at);g.gain.exponentialRampToValueAtTime(prefs.volume*.0008,at+.012);g.gain.exponentialRampToValueAtTime(.0001,at+.13);o.connect(g).connect(audio.destination);o.start(at);o.stop(at+.14)}
  }catch{}
}
function select(i){sound();if(slots[i]){replace.value=i;return}start(i)}
function walk(x,y){if(dialog.value||blocked(s,x,y))return;if(x!==s.x)facing.value=Math.sign(x-s.x);travelled+=Math.hypot(x-s.x,y-s.y);stride.value=Math.floor(travelled/2)%2===1;move(x,y);moving.value=true;clearTimeout(timer);timer=setTimeout(()=>moving.value=false,160)}
function approach(x,y,done){stop();const path=pathTo(s,x,y);if(!path.length)return;goal={...path.shift(),path,done};last=performance.now();frame=requestAnimationFrame(step)}
function point(e){const r=world.value.getBoundingClientRect();approach((e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100)}
function activate(n){returnLabel=n.label;approach(n.x,Math.max(72,n.y+8),()=>{sound(n.icon==='♧');n.run()})}
function syncCamera(){offset.value=camera.value?.scrollLeft??0;stageWidth.value=world.value?.offsetWidth??innerWidth}
function pan(){if(!camera.value)return;syncCamera();if(stageWidth.value>innerWidth){camera.value.scrollLeft=s.x/100*stageWidth.value-innerWidth/2;syncCamera()}}
function project(x){return x/100*stageWidth.value-offset.value}
const anchor=computed(()=>{
  const who=line.value?.[0]
  return who==='me'?[s.x,s.y-24]:who==='other'?[companionX.value,59]:who==='door'?[81,42]:s.scene==='rail'?[50,62]:[65,48]
})
const bubbleX=computed(()=>`clamp(min(43vw, 183px), ${project(anchor.value[0])}px, calc(100vw - min(43vw, 183px)))`)
const speaker=computed(()=>({me:name.value,other:other.value,door:t('Detrás de la puerta','Behind the door'),object:s.scene==='rail'?t('Celular','Phone'):s.scene==='desk'?t('Recepción','Reception'):place.value})[line.value?.[0]])
function step(stamp){
 frame=0
 if((!held.size&&!goal)||!play.value||dialog.value||mini.value||album.value)return
 const dx=Number(held.has('ArrowRight'))-Number(held.has('ArrowLeft')),dy=Number(held.has('ArrowDown'))-Number(held.has('ArrowUp'))
 const dt=Math.min(.04,Math.max(.001,(stamp-last)/1000)),len=Math.hypot(dx,dy)||1
 const speed=Math.min(innerWidth,innerHeight)*.68,w=stageWidth.value,h=world.value?.offsetHeight||innerHeight
 if(goal){const ax=(goal.x-s.x)*w/100,ay=(goal.y-s.y)*h/100,dist=Math.hypot(ax,ay),k=Math.min(1,speed*dt/(dist||1))
    walk(s.x+(goal.x-s.x)*k,s.y+(goal.y-s.y)*k);pan()
    if(k===1){if(goal.path.length)Object.assign(goal,goal.path.shift());else{const done=goal.done;stop();done?.();return}}
 }else if(dx||dy){walk(s.x+dx*speed*dt/len/w*100,s.y+dy*speed*dt/len/h*100);pan()}
 last=stamp;frame=requestAnimationFrame(step)
}
function stop(){goal=null;held.clear();cancelAnimationFrame(frame);frame=0;clearTimeout(timer);moving.value=false}
function release(e){if(held.delete(e.key)&&!held.size)stop()}
function keyboard(e){
 if(!play.value||dialog.value||mini.value||album.value||map.value||photo.value||e.altKey||e.metaKey||e.ctrlKey)return
  if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();goal=null;held.add(e.key);if(!frame){last=performance.now()-16;step(performance.now())}}
}
watch(line,async v=>{
  if('speechSynthesis' in window){
    window.speechSynthesis.cancel()
    if(v?.[0]==='door'&&prefs.voice){
      const voice=new SpeechSynthesisUtterance(v[1]);voice.lang=prefs.lang==='en'?'en-US':'es-ES'
      voice.volume=prefs.voice/100;voice.rate=.95;window.speechSynthesis.speak(voice)
    }
  }
  await nextTick()
  if(v){if(camera.value){camera.value.scrollLeft=anchor.value[0]/100*stageWidth.value-innerWidth/2;syncCamera()}bubble.value?.focus({preventScroll:true})}
  else if(play.value){const buttons=[...world.value.querySelectorAll('.node')];(buttons.find(b=>b.textContent.includes(returnLabel))||buttons[0])?.focus()}
})
watch([page,dialog,map,photo,()=>s.scene],stop)
watch(play,v=>{if(v)for(const p of ['camina','quieta','pasito','habla']){const i=new Image();i.src=img(name.value,p)}})
function flush(){if(play.value)store()}
watch([page,()=>s.scene],async()=>{await nextTick();pan()})
watch([page,()=>s.scene,()=>s.period,()=>prefs.ambient],()=>{clearInterval(ambience);if(play.value){const ring=()=>{if(!document.hidden)fieldSound(audio,s.scene,s.period,prefs.ambient)};ring();ambience=setInterval(ring,5400)}})
onMounted(()=>{window.addEventListener('resize',pan);window.addEventListener('pagehide',flush);window.addEventListener('keydown',keyboard);window.addEventListener('keyup',release);window.addEventListener('blur',stop)})
onUnmounted(()=>{clearInterval(ambience);window.removeEventListener('resize',pan);window.removeEventListener('pagehide',flush);window.removeEventListener('keydown',keyboard);window.removeEventListener('keyup',release);window.removeEventListener('blur',stop);stop()})
</script>
<template>
<main class="viewport" :class="{playing:play}" :style="{'--reading':prefs.text/100}">
 <template v-if="!play">
   <MenuArt/><div class="wash"></div>
  <header class="mast"><strong>✿ GatitoLandia</strong><span>{{ t('COLECCIÓN DE POSTALES','POSTCARD COLLECTION') }} · 01</span></header>
  <div class="cover" :inert="page==='settings'||replace!==null">
   <div class="intro"><div class="kicker">✧ &nbsp; {{ t('HISTORIAS DEL EDIFICIO','BUILDING STORIES') }}</div>
    <h1>Villa<br><em>Bigotes</em></h1><p>{{ t('Dos llaves. Un pasillo. Dos maneras de llegar a casa.','Two keys. One hallway. Two ways to come home.') }}</p>
    <p class="slot-tip">{{ t('Cada postal guarda su propia historia.','Each postcard keeps its own story.') }}</p>
    <button class="quiet" @click="page='settings';sound()">☼ {{ t('Sonido e idioma','Sound and language') }}</button>
   </div>
   <div class="routes"><div class="kicker">{{ t('INICIAR PARTIDA · ELIGE TU POSTAL','START GAME · PICK A POSTCARD') }}</div>
    <button v-for="(cat,i) in ['Franxito','Aranxita']" :key="cat" class="ticket" :class="{lunar:i}" @click="select(i)">
      <span class="stamp">{{ i?'☾':'☀' }}</span><img :src="i?portraitA:portraitF" alt="">
      <span class="ticketcopy"><small>{{ i?t('TREN NOCTURNO','NIGHT TRAIN'):t('VUELO DE LLEGADA','ARRIVAL FLIGHT') }} · {{ i?'18':'15' }}</small><b>{{ cat }}</b><i v-if="slots[i]">{{ t('Día','Day') }} {{ slots[i].day }} · {{ t(...titles[slots[i].scene]) }} →</i><i v-else>{{ i?t('La última estación','The last station'):t('Un billete de ida','A one-way ticket') }} →</i></span>
    </button>
   </div>
  </div>
  <div v-if="page==='settings'||replace!==null" class="veil"><section class="sheet" role="dialog" aria-modal="true" :aria-label="t('Opciones','Options')">
    <template v-if="replace!==null"><h2>{{ replace?'Aranxita':'Franxito' }}</h2><p>{{ t('Puedes continuar esta postal o volver al día de la llegada. Reiniciar sustituye solo esta ruta.','Continue this postcard or return to arrival day. Restart replaces this route only.') }}</p>
    <button class="ink" @click="resume(replace);replace=null">{{ t('Continuar','Continue') }}</button><button @click="saveCopy(slots[replace])">{{ t('Exportar copia','Export save') }}</button><button @click="start(replace);replace=null">{{ t('Reiniciar ruta','Restart route') }}</button><button @click="replace=null">{{ t('Volver','Back') }}</button></template>
   <template v-else><small>VILLA BIGOTES</small><h2>{{ t('Ajustes','Settings') }}</h2>
    <label>{{ t('Idioma','Language') }} <select v-model="prefs.lang"><option value="es">Español</option><option value="en">English</option></select></label>
     <label>{{ t('Efectos','Effects') }} · {{ prefs.volume }}% <input type="range" v-model.number="prefs.volume" @change="sound()" /></label>
     <label>{{ t('Ambiente','Ambience') }} · {{ prefs.ambient }}% <input type="range" v-model.number="prefs.ambient"/></label>
     <label>{{ t('Voz','Voice') }} · {{ prefs.voice }}% <input type="range" v-model.number="prefs.voice"/></label>
     <label>{{ t('Tamaño del texto','Text size') }} · {{ prefs.text }}% <input type="range" min="90" max="150" step="10" v-model.number="prefs.text"/></label>
     <label>{{ t('Importar copia','Import save') }} <input type="file" accept=".json" @change="readCopy"></label>
     <p v-if="pending">{{ pending.actor?'Aranxita':'Franxito' }} · {{ t('Día','Day') }} {{ pending.day }} · {{ t(...titles[pending.scene]) }}
     <button @click="restore(pending);pending=null">{{ t('Usar esta copia y reemplazar esa ruta','Use this copy and replace its slot') }}</button><button @click="pending=null">{{ t('Cancelar','Cancel') }}</button></p>
     <button @click="cacheGame" :disabled="offline">{{ t('Descargar para jugar sin red','Download for offline play') }}</button><p role="status">{{ notice }}</p>
     <button class="ink" @click="page='menu';pending=null;sound()">← {{ t('Volver','Back') }}</button>
   </template>
  </section></div>
 </template>
 <template v-else>
    <div ref="camera" class="camera-scroll" :inert="album||map||!!mini||!!dialog" @scroll.passive="syncCamera"><div ref="world" class="world" :style="photo?{width:'max(115vw,calc(100dvh * 800 / 340))'}:{}" :class="{evening:s.period===1,nocturne:night}" @click.self="!photo&&point($event)">
     <Illustration :key="s.scene" :scene="sceneArt" :greenhouse="s.scene==='glass'" :rainy="rain(s.day)&&['glass','roof','garden'].includes(s.scene)" :plant="s.seedDay?(s.day>s.seedDay?(s.flower?2:3):1):0" :furniture="objects(s)" :night="night" :actor="s.scene==='guest'?1-s.actor:s.actor" :day="s.day" :decor="s.scene==='guest'?3:s.decor" :bag="s.scene==='hall'&&s.actor&&!s.bag" :bought="s.bought"/>
   <div v-if="night&&s.scene!=='rail'" class="moonlight"></div>
     <div class="actor controlled" :class="{walking:moving,speaking:line?.[0]==='me',listening:line?.[0]==='other'}" :style="{left:s.x+'%',top:s.y+'%','--face':dialog&&showOther?(s.x<companionX?1:-1):flip}">
      <img :src="img(name,moving&&stride?'pasito':pose)" :alt="name"><img v-if="line?.[0]==='me'" :src="img(name,'habla')" alt="" class="talkframe">
   </div>
    <div v-if="showOther" class="actor" :class="{speaking:line?.[0]==='other',shy:dialog&&s.scene==='hall'&&s.actor&&!s.bag&&line?.[0]==='other',greeting:dialog&&s.scene==='market'&&!s.gift}" :style="{left:companionX+'%',top:'83%',transform:`translate(-50%,-100%) scaleX(${s.x<companionX?-1:1})`}"><img :src="img(other,'quieta')" :alt="other"><img v-if="line?.[0]==='other'" :src="img(other,'habla')" alt="" class="talkframe"></div>
    <template v-if="!dialog&&!photo"><button v-for="n in nodes" :key="s.scene+n.label" class="node" :disabled="moving" :style="{left:n.x+'%',top:n.y+'%'}" @click="activate(n)"><i>{{ n.icon }}</i><span>{{ n.label }}</span></button></template>
   </div></div>
   <button v-if="line" ref="bubble" class="speech" :style="{left:bubbleX,top:anchor[1]+'%','--tip':`clamp(10%, calc(50% + ${project(anchor[0])}px - ${bubbleX}), 90%)`}" @click="next();sound()"><small>{{ speaker }}</small><span aria-live="polite">{{ line[1] }}</span><b>›</b></button>
    <div v-if="!photo" class="hud"><small>{{ name }} · {{ t('DÍA','DAY') }} {{ s.day }} · {{ ['☀','◒','☾'][s.period] }}</small><h2>{{ place }}</h2><span>{{ bond }} · ♡ {{ level }}/100</span><small class="pan-tip">↔ {{ t('Desliza para explorar','Swipe to explore') }}</small></div>
    <button v-if="!photo" class="homebtn" :aria-label="t('Menú principal','Main menu')" :disabled="!!dialog||!!mini||album||map" @click="store();page='menu';sound()">☰</button>
    <button v-if="!photo" class="album-btn" :disabled="!!dialog||!!mini||album||map" @click="stop();album=true">✉ {{ t('Álbum','Album') }} · {{ s.album.length }}</button>
    <div v-if="map" class="veil"><Directory :t="t" :met="s.met" @close="map=false"/></div>
    <div v-if="photo" class="photo-tools"><label>{{ t('Encuadre','Frame') }} <input type="range" min="0" max="100" value="50" @input="camera.scrollLeft=(world.offsetWidth-camera.clientWidth)*$event.target.value/100"></label><button @click="shoot">{{ t('Descargar postal','Download postcard') }}</button><button @click="photo=false">{{ t('Volver','Back') }}</button><small role="status">{{ notice }}</small></div>
   <div v-if="album" class="veil"><section role="dialog" aria-modal="true" class="sheet album"><small>{{ name }}</small><h2>{{ t('Mis postales','My postcards') }}</h2>
    <p v-if="!s.album.length">{{ t('La primera postal llega al conocer a tu vecino.','Meet your neighbour to collect your first postcard.') }}</p>
    <article v-for="c in s.album" :key="c.id"><small>{{ t('Día','Day') }} {{ c.day }} · {{ t(...titles[c.scene]) }}</small><p>{{ t(c.es,c.en) }}</p></article>
     <button @click="album=false;photo=true;notice=''">{{ t('Modo postal','Postcard mode') }}</button><button class="ink" @click="album=false">{{ t('Cerrar','Close') }}</button></section></div>
   <div v-if="mini" class="miniworld" role="group" :aria-label="t('Minijuego','Minigame')">
    <div class="minihelp"><b>{{ mini.kind==='kite'?t('Atrapa tres corrientes de aire','Catch three gusts'):t('Recoge las tres naranjas','Catch the three oranges') }}</b> · {{ mini.count }}/3
     <button @click="collect(true)">{{ t('Resolver sin perseguir','Finish without chasing') }}</button></div>
    <KiteFlight v-if="mini.kind==='kite'" :count="mini.count" :en="prefs.lang==='en'" @catch="collect()"/>
    <button v-else :key="mini.count" class="collectible" :aria-label="t('Recoger naranja','Catch orange')" :style="{left:[25,62,44][mini.count]+'%',top:74+mini.count%2*8+'%'}" @click="collect()">🍊</button>
   </div>
 </template>
</main>
</template>
