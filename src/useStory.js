import {computed,reactive,ref,watch} from 'vue'
import { options } from './neighborhood.js'
import {barrio,extras,rain} from './barrio.js'

const key='villa:postales:1'
export const titles={
  air:['Aeropuerto','Airport'],rail:['Estación de medianoche','Midnight station'],desk:['Recepción','Reception'],
  room:['Departamento','Apartment'],hall:['Pasillo','Hallway'],market:['Almacén','Corner shop'],
  garden:['Jardín','Garden'],roof:['Azotea','Rooftop'],cafe:['Café','Café'],guest:['Casa del vecino','Neighbour’s home'],glass:['Invernadero','Greenhouse']
}
const blank=()=>({actor:0,scene:'air',day:1,period:0,met:false,bag:false,key:false,decor:0,bought:false,points:0,wed:false,recent:[],album:[],gift:false,x:43,y:83,...extras()})
export function useStory(prefs){
  const t=(a,b)=>prefs.lang==='en'?b:a
  const s=reactive(blank()),page=ref('menu'),saved=ref(false),dialog=ref(null)
  const slots=reactive([null,null]),mini=ref(null),map=ref(false)
  function load(k){try{return JSON.parse(localStorage.getItem(k))}catch{return null}}
  for(const i of [0,1]){const v=load(key+':'+i);if(v?.scene in titles)slots[i]=v}
  const legacy=load(key);if(legacy?.scene in titles&&!slots[legacy.actor])slots[legacy.actor]=legacy
  function store(){const v=JSON.parse(JSON.stringify(s));slots[s.actor]=v;saved.value=true;try{localStorage.setItem(key+':'+s.actor,JSON.stringify(v))}catch{}}
  function resume(i){if(!slots[i])return;Object.assign(s,blank(),slots[i]);page.value='play';saved.value=true}
  // Los pasos se guardan al detenerse, no en cada fotograma del paseo.
  watch(s,(_,__,cleanup)=>{const timer=setTimeout(store,180);cleanup(()=>clearTimeout(timer))},{flush:'post'})
  const name=computed(()=>s.actor?'Aranxita':'Franxito'),unit=computed(()=>s.actor?18:15)
  const place=computed(()=>t(...titles[s.scene])+(s.scene==='room'?' '+unit.value:''))
  const level=computed(()=>Math.floor(s.points/10))
  const bond=computed(()=>s.wed?t('Casados','Married'):level.value>=75?t('Novios','Dating'):level.value>=50?t('Haciéndose ojitos','Sweethearts'):level.value>=25?t('Mejores amigos','Best friends'):s.met?t('Amigos','Friends'):t('Por conocerse','Strangers'))
  function go(id){dialog.value=null;s.scene=id;s.x=43;s.y=84}
  function start(i){Object.assign(s,blank(),{actor:i,period:i?2:0});go(i?'rail':'air');page.value='play';store()}
  function card(id,es,en){if(!s.album.some(c=>c.id===id))s.album.push({id,es,en,day:s.day,scene:s.scene})}
  function encounter(){s.met=true;card('hello',s.actor?'Una naranja me llevó hasta el 15.':'La pantufla que vivía en el pasillo.',s.actor?'An orange led me to number 15.':'The slipper that lived in the hallway.')}
  function game(kind,done){mini.value={kind,count:0,done}}
  function collect(skip=false){const g=mini.value;if(!g)return;if(skip||++g.count===3){mini.value=null;g.done()}}
  function say(lines,end){dialog.value={lines,i:0,end}}
  function next(){const d=dialog.value;if(!d)return;if(++d.i>=d.lines.length){dialog.value=null;d.end?.()}}
  const line=computed(()=>dialog.value?.lines[dialog.value.i])
  const other=computed(()=>s.actor?'Franxito':'Aranxita')
  const destination=computed(()=>s.dateDay===s.day&&s.period===s.datePeriod?'cafe':['garden','cafe','roof'][(s.day-1+s.period)%3])
  const showOther=computed(()=>s.scene==='hall'&&(s.actor&&s.key&&!s.bag||line.value?.[0]==='other')||s.met&&(s.scene===destination.value||['glass','guest'].includes(s.scene)||line.value?.[0]==='other'||s.scene==='market'&&s.bag&&!s.gift))
  const nodes=computed(()=>{
    const list=[]
    const node=(x,y,es,en,run,icon='◇')=>list.push({x,y,label:t(es,en),run,icon})
    const exit=(x,y,id,es,en)=>node(x,y,es??titles[id][0],en??titles[id][1],()=>go(id),'↗')
    const me=(es,en)=>['me',t(es,en)], them=(es,en)=>['other',t(es,en)], obj=(es,en)=>['object',t(es,en)]
    const activity=(x,y,id,bonus=0)=>{
      const pool=options(s.scene==='roof'?'roof':s.scene==='cafe'?'cafe':'garden',false,level.value,prefs.lang==='en')
      const a=pool.find(v=>v.id===id)
      if(!a||(id==='kite'&&rain(s.day)))return
      if(destination.value!==s.scene)return
      const perform=()=>{
        const gain=Math.max(2,8-3*s.recent.filter(k=>k===id).length)+bonus
        const lines=a.lines.map((v,i)=>[i%2?'other':'me',v])
        say([...lines,['me',t(`Qué bonito compartir esto. +${gain} de vínculo.`,`I’m glad we did this together. +${gain} bond.`)]],()=>{
          const old=level.value;s.points=Math.min(1000,s.points+gain);s.recent=[id,...s.recent].slice(0,5)
          for(const [n,es,en] of [[25,'Te hice una copia de mi llave. Por si un día necesitas un lugar tranquilo.','I made you a spare key. In case you ever need a quiet place.'],[50,'Iba a mirar las estrellas, pero llevo un rato mirándote a ti.','I came to watch the stars, but I keep looking at you.'],[75,'¿La próxima merienda cuenta como cita? Porque a mí me gustaría.','Could our next picnic be a date? I would like that.']]){
            if(old<n&&level.value>=n){card('bond'+n,es,en);say([them(es,en),me('Voy a guardar este momento.','I want to remember this moment.')])}
          }
          if(id==='kite')card('kite','Una cola de tela sobre los tejados.','A ribbon tail above the rooftops.')
          s.period=Math.min(2,s.period+1)
        })
      };node(x,y,a.name,a.name,id==='kite'?()=>game('kite',perform):perform,'✦')
    }
    switch(s.scene){
      case 'air':node(71,55,'Buscar alquiler','Find a rental',()=>say([me('Franxito guarda su tarjeta de embarque. Necesita una dirección que escribir al dorso.','Franxito pockets his boarding pass. He needs an address to write on the back.'),obj('Viviendas Bigotes. Queda un estudio libre; pase por recepción.','Whiskers Apartments. One studio available; please visit reception.')],()=>go('desk')),'⌕');break
      case 'rail':node(50,67,'Mirar el celular','Check phone',()=>say([me('Aranxita se frota un ojo. Casi se pasa de estación.','Aranxita rubs one eye. She nearly missed her stop.'),obj('Alquiler cerca de la estación. Recepción abierta de noche.','Flat near the station. Reception open at night.'),me('A dos calles… Por favor, que todavía esté libre.','Two streets away… Please still be available.')],()=>go('desk')),'▣');break
      case 'desk':node(64,51,'Hablar con recepción','Ask the receptionist',()=>say([obj(`Está libre el ${unit.value}. Ventana al patio y una llave que se atasca un poquito.`,`Number ${unit.value} is free. Courtyard view, slightly sticky key.`),me('¿Así, girando despacito?','Like this, turning it gently?'),obj('Exacto. Esta es tu casa.','Exactly. Welcome home.')],()=>{s.key=true;go(s.actor?'hall':'room')}),'⚿');break
      case 'room':
        exit(17,55,'hall','Salir al pasillo','To the hallway')
        if(s.decor<12)node(73,62,`Decorar · ${s.decor}/12`,`Decorate · ${s.decor}/12`,()=>{s.decor=Math.min(12,s.decor+1)},'✿')
        else node(73,62,'Habitación completa','Room complete',()=>{},'✧')
        node(49,85,'Dormir','Sleep',()=>say([me('Cierra los ojos. Al otro lado de la pared, alguien también apaga la luz.','Eyes closed. Across the wall, someone else switches off the light.')],()=>{s.day++;s.period=0;s.x=43;s.y=84;if(s.dateDay===s.day)say([me(s.datePeriod?'Esta tarde hay merienda en el café.':'Esta mañana hay una silla para mí en el café.',s.datePeriod?'Our café date is this afternoon.':'There’s a seat waiting for me at the café this morning.')])}),'☾')
        if(!s.actor)exit(78,35,'market','Ir de compras','Go shopping')
        break
      case 'hall':
        if(s.actor&&!s.bag){node(70,76,'Recoger las naranjas','Gather the oranges',()=>game('orange',()=>say([me('¡Espera! Yo alcanzo la que rueda hacia la escalera.','Wait! I’ll catch the one rolling towards the stairs.'),them('Soy Franxito, del 15… Mi bolsa eligió un mal día para aprender a volar.','I’m Franxito, number 15… Bad day for my bag to learn to fly.'),me('Aranxita, del 18. Repartimos el peso y llegamos juntos.','Aranxita, number 18. Let’s share the load and walk together.')],()=>{s.bag=true;encounter()})),'♡');break}
        exit(s.actor?81:16,46,'room',`Depto. ${unit.value}`,`No. ${unit.value}`)
        if(!s.actor&&!s.met)node(81,46,'Llamar al 18','Knock on 18',()=>say([['door',t('¡Ya voy! Un segundo, no encuentro la otra pantufla.','Coming! One second, I can’t find my other slipper.')],them('¡Hola! Soy Aranxita. ¿Eres el nuevo vecino?','Hello! I’m Aranxita. Are you the new neighbour?'),me('Franxito, del 15. Solo venía a saludar… y creo que esa pantufla está aquí fuera.','Franxito, number 15. Just saying hello… and I think your slipper is out here.')],encounter),'♧')
        if(s.met)node(s.actor?16:81,46,'Leer la nota','Read the note',()=>say([obj(`«Estoy en: ${titles[destination.value][0]}. Ven si quieres». —${other.value}`,`“At the ${titles[destination.value][1].toLowerCase()}. Come find me.” —${other.value}`)]),'✉')
        exit(49,54,'market');if(s.met){exit(22,81,'garden');exit(78,82,'roof')}break
      case 'market':
        if(s.bag&&!s.gift)node(37,68,'Una mandarina','A mandarin',()=>say([them('Guardé la de la hojita para ti. La otra vez tú recogiste las mías.','I saved the one with the leaf for you. Last time you picked mine up.')],()=>{s.gift=true;card('fruit','La mandarina que volvió.','The mandarin that came back.')}),'♡')
        node(70,52,'Comprar provisiones','Buy groceries',()=>say([obj('Pan calentito y dos mandarinas. La de la hojita es la más dulce.','Warm bread and two mandarins. The one with the leaf is sweeter.')],()=>{s.bought=true}),'✿')
        exit(18,72,'hall');if(s.met)exit(79,83,'cafe');break
      case 'garden':activity(68,63,'clover',1);activity(27,63,'seed',1);exit(18,83,'hall');exit(80,82,'cafe')
        if(level.value===100&&!s.wed)node(49,46,'Casarse','Get married',()=>say([them('¿En el mismo árbol donde empezó todo?','By the same tree where it all began?'),me('Aquí mismo. Sí, contigo.','Right here. Yes, with you.')],()=>{s.wed=true;card('wedding','Sí, bajo nuestro árbol.','Yes, beneath our tree.')}),'♡');break
      case 'roof':activity(68,34,'stars',3);activity(24,62,'kite',3);exit(17,84,'hall');break
      case 'cafe':activity(70,55,'tea',2);activity(32,52,'order',2);exit(17,83,'hall');break
    }
    if(['garden','roof','cafe'].includes(s.scene)&&s.scene!==destination.value)
      exit(54,57,destination.value,`Buscar en ${titles[destination.value][0]}`,`Meet at the ${titles[destination.value][1]}`)
    barrio({s,node,exit,say,me,them,obj,card,go,map,nearby:s.scene===destination.value})
    return list
  })
  function move(x,y){if(!dialog.value){s.x=Math.max(9,Math.min(91,x));s.y=Math.max(68,Math.min(94,y))}}
  function restore(v){Object.assign(s,blank(),v);page.value='play';store()}
  return {s,page,saved,slots,resume,store,mini,map,restore,collect,dialog,line,nodes,name,unit,place,bond,level,other,showOther,start,next,move,t}
}
