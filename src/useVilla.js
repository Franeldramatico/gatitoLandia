import { computed, reactive, ref, watch } from 'vue'
import { places, options } from './neighborhood.js'

const key='villaBigotesEdificio', stages=[[0,'Amigos','Friends'],[25,'Mejores amigos','Best friends'],[50,'Haciéndose ojitos','Sweet on each other'],[75,'Novios','Dating']]
export const names=['Franxito','Aranxita']
export function useVilla(settings){
  const t=(es,en)=>settings.lang==='en'?en:es
  const placeName=id=>places[id][settings.lang==='en'?1:0]
  const game=reactive({xp:0,points:0,energy:80,hour:9,home:false,wed:false,pose:'quieta',msg:'Dos amigos, una casita y toda la tarde por delante.',actor:0,spots:[352,480],poses:['quieta','quieta'],recent:[]})
  Object.assign(game,{place:'lobby',started:false,met:false,depth:[0,0]})
  const fresh=JSON.stringify(game)
  try{
    const old=JSON.parse(localStorage.getItem(key))
    if(old){Object.assign(game,old); game.points=old.points??old.xp*10}
  }catch{}
  watch(game,()=>{try{localStorage.setItem(key,JSON.stringify(game))}catch{}})
  const bond=computed(()=>game.wed?t('Casados','Married'):stages.filter(([min])=>min<=game.xp).at(-1)[settings.lang==='en'?2:1])
  const milestone=computed(()=>{
    const next=stages.find(([min])=>min>game.xp)
    return next?`${t('Nivel','Level')} ${next[0]} · ${t(next[1],next[2])}`:game.wed?t('♡ Una vida juntos.','♡ A life together.'):t('Nivel 100 · Boda en el jardín','Level 100 · Garden wedding')
  })
  const tab=ref('lugar'), talk=ref(null)
  const activities=computed(()=>options(game.place,tab.value==='charla',game.xp,settings.lang==='en'))
  const novelty=a=>a.solo||a.id==='meet'?0:Math.max(2,10-4*game.recent.filter(id=>id===a.id).length)+places[game.place][2]
  function meet(){
    const f=game.actor===0
    const lines=f?[t('¡Tu llave! Casi se cuela por el hueco del ascensor.','Your key! It nearly fell down the lift shaft.'),t('¡Gracias! Soy Aranxita, del 18.','Thanks! I’m Aranxita, from number 18.'),t('Franxito, del 15. Creo que esta llave quería presentarnos.','Franxito, number 15. I think this key wanted us to meet.')]:
      [t('¡Ay! Mi llave…','Oh! My key…'),t('La tengo. Soy Franxito, vivo en el 15.','Got it. I’m Franxito. I live at number 15.'),t('Aranxita, del 18. ¡Menuda manera de conocer a un vecino!','Aranxita, number 18. What a way to meet a neighbour!')]
    play({id:'meet',name:t('Un encuentro casual','A chance encounter'),energy:0,hours:0,pose:'quieta',lines,replies:[]})
  }
  function start(actor){
    Object.assign(game,JSON.parse(fresh),{actor,started:true});talk.value=null;tab.value='lugar';meet()
  }
  function play(a){
    if(talk.value||game.energy+a.energy<0)return
    game.poses[game.actor]=a.pose
    if(!a.solo){
      const middle=Math.max(125,Math.min(675,game.spots[game.actor]))
      game.spots=[middle-56,middle+56];game.poses=[a.pose,a.pose]
    }
    talk.value={a,lines:[...a.lines],index:0,choice:false,answered:false}
  }
  const speaker=computed(()=>talk.value?(game.actor+(talk.value.a.solo?0:talk.value.index))%2:null)
  function finish(){
    const {a}=talk.value, earned=novelty(a), before=bond.value
    game.energy=Math.min(100,game.energy+a.energy);game.hour+=a.hours
    game.points=Math.min(1000,game.points+earned);game.xp=Math.floor(game.points/10)
    if(!a.solo)game.recent=[a.id,...game.recent].slice(0,5)
    if(a.id==='meet')game.met=true
    game.msg=a.id==='meet'?t('Ahora se conocen.','Now they know each other.'):`${a.name} · +${earned} ${t('puntos','points')}.`+(before!==bond.value?` ♡ ${bond.value}`:'')
    talk.value=null
  }
  function advance(){
    const t=talk.value;if(!t||t.choice)return
    if(t.index+1<t.lines.length)t.index++
    else if(t.a.replies.length&&!t.answered)t.choice=true
    else finish()
  }
  function answer(reply){
    const t=talk.value;if(!t?.choice)return
    t.lines.push(...reply.slice(1));t.choice=false;t.answered=true;t.index++
  }
  function move(x,dy=0){
    if(talk.value)return
    game.spots[game.actor]=Math.max(66,Math.min(734,x));game.poses[game.actor]='camina'
    game.depth[game.actor]=Math.max(-40,Math.min(18,game.depth[game.actor]+dy))
    game.msg=''
  }
  function travel(id){
    if(talk.value||!places[id])return
    game.place=id;game.home=id==='apartment';game.poses=['camina','camina'];game.spots=[352,480];game.depth=[0,0];tab.value='lugar';game.msg=''
  }
  const canMarry=computed(()=>!game.wed&&game.place==='garden'&&game.xp===100)
  function marry(){
    if(!canMarry.value||talk.value)return
    game.wed=true;game.hour+=2;game.poses=['feliz','feliz'];game.msg=t('Bajo el árbol intercambian anillitos de trébol. ¡Recién casados!','Under the tree they exchange clover rings. Just married!')
  }
  return {game,bond,milestone,activities,play,travel,canMarry,marry,talk,speaker,advance,answer,move,tab,novelty,t,placeName,start,meet}
}
