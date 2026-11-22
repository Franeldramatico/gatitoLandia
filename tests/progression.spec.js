import { test, expect } from '@playwright/test'
import { useStory } from '../src/useStory.js'

for(const actor of [0,1])test(`Ruta ${actor?18:15}: de desconocidos a casados sin modificar los puntos`,()=>{
 const v=useStory({lang:'en'})
 const finish=()=>{while(v.dialog.value)v.next()}
 const pick=(label)=>{const n=v.nodes.value.find(n=>n.label===label);expect(n,`${v.s.scene}: ${label}`).toBeTruthy();n.run();if(v.mini.value)v.collect(true);finish()}
 v.start(actor);pick(actor?'Check phone':'Find a rental');pick('Ask the receptionist')
 if(actor)pick('Gather the oranges')
 else{pick('To the hallway');pick('Knock on 18')}
 pick('Garden')
 const visit=new Set()
 for(let i=0;i<500&&v.level.value<100;i++){
   const a=v.nodes.value.find(n=>n.icon==='✦')
   if(a){visit.add(v.s.scene);pick(a.label)}
   else pick(v.nodes.value.find(n=>n.label.startsWith('Meet at')).label)
 }
 expect(v.level.value).toBe(100)
 expect(visit.has('roof')).toBeTruthy()
 // Use the kite before leaving the roof, including its accessible completion.
 if(v.s.scene==='roof'){const kite=v.nodes.value.find(n=>n.label.toLowerCase().includes('kite'));if(kite)pick(kite.label)}
 if(v.s.scene!=='garden'){pick('Hallway');pick('Garden')}
 pick('Get married');expect(v.s.wed).toBe(true)
 expect(v.s.album.map(c=>c.id)).toEqual(expect.arrayContaining(['hello','bond25','bond50','bond75','wedding']))
})
