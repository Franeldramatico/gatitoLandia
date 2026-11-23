// Small stories share the same clock, place and postcard album as the main route.
export const extras=()=>({decorDay:0,decorToday:0,dateDay:0,datePeriod:0,teaKnown:false,seedDay:0,flower:false,mailDay:0,reply:false,song:false,visit:false,ritual:0})
export const rain=day=>day%3===2
export function barrio({s,node,exit,say,me,them,obj,card,go,map,nearby}){
 const moment=s.actor?0:1, drink=s.actor?['té con canela','cinnamon tea']:['leche con vainilla','vanilla milk']
 const finish=(id,es,en)=>card(id,es,en)
 if(s.scene==='hall'){
   node(49,30,'Plano del ascensor','Lift directory',()=>{map.value=true},'⌖')
   if(s.met){
     node(31,59,s.mailDay?'Abrir buzón':'Enviar un dibujo',s.mailDay?'Open mailbox':'Mail a drawing',()=>{
       if(!s.mailDay)say([me('Dibuja dos bigotes en el sobre y lo desliza en la ranura.','Two whiskers on the envelope, then into the slot it goes.')],()=>s.mailDay=s.day)
       else if(s.day>s.mailDay)say([obj('«Guardé tu dibujo. Te mando la otra mitad: éramos dos gatos, ¿ves?»','“I kept your drawing. Here’s the other half: it was two cats, see?”')],()=>{s.reply=true;finish('letter','Un dibujo a dos patas.','One drawing, two paws.')})
       else say([me('Todavía huele a tinta fresca. Mañana volveré.','The ink still smells fresh. I’ll come back tomorrow.')])
     },'✉')
     if(s.visit)exit(69,64,'guest','Visitar al vecino','Visit neighbour')
   }
 }
 if(s.scene==='room'){
   node(29,43,'Tras la pared','Through the wall',()=>say(s.actor?
     [me('Tararea la canción del tren. En el 18 las paredes devuelven un eco menos solitario.','She hums the train song. The walls of number 18 answer with a less lonely echo.')]:
     [me('Desde el 15 oye tres notas. El tren ya se fue, pero alguien sigue cantando su canción.','From number 15 he hears three notes. The train has left, but someone still sings its song.')],
     ()=>{s.song=true;finish('song',s.actor?'Canté para hacerme compañía.':'Alguien cantaba al otro lado.',s.actor?'I sang to keep myself company.':'Someone sang on the other side.')}),'♫')
   if(s.wed&&s.ritual!==s.day&&s.day%7===1){
     for(const [x,flat] of [[25,15],[68,18]])node(x,78,flat===15?'Desayuno en el 15':'Regar en el 18',flat===15?'Breakfast at 15':'Water plants at 18',()=>{go(flat===(s.actor?18:15)?'room':'guest');say([them(flat===15?'Hice dos tostadas. La tuya tiene un corazón de mermelada.':'Nuestra planta tiene otra hoja. Mira, del lado de tu ventana.',flat===15?'Two slices of toast. Yours has a jam heart.':'Our plant grew another leaf. Look, on your window side.')],()=>{s.ritual=s.day;finish('sunday'+s.day,'Un domingo de dos.','Sunday for two.')})},'♡')
   }
 }
 if(s.scene==='guest'){
   exit(17,55,'hall');node(68,48,s.actor?'El viejo billete':'El disco del tren',s.actor?'The old ticket':'The train record',()=>say([them(s.actor?'Al dorso del billete escribí mi nueva dirección. Luego añadí la tuya.':'Escucha la tercera nota. Esa era la que se oía desde el pasillo.',s.actor?'I wrote my new address on the ticket. Then I added yours.':'Listen to the third note. That’s the one you heard from the hallway.')],()=>finish('guest','Una puerta abierta.','An open door.')),'♫')
 }
 if(s.scene==='garden'){
   if(!s.seedDay)node(47,71,'Sembrar una margarita','Sow a daisy',()=>say([me('Una semilla y un traguito de agua. Aquí, junto al sendero.','One seed and a sip of water. Right beside the path.')],()=>s.seedDay=s.day),'✿')
   else if(!s.flower)node(47,71,s.day>s.seedDay?'Regalar la primera flor':'Ver la semilla',s.day>s.seedDay?'Give the first flower':'Check the seed',()=>s.day>s.seedDay?say([them('¿La plantaste tú? Voy a guardarla entre las páginas de mi libro.','You grew this? I’ll press it in my book.')],()=>{s.flower=true;finish('flower','Una flor del sendero.','A flower from the path.')}):say([me('La tierra está húmeda. Le daré una noche.','The soil is damp. I’ll give it a night.')]),'✿')
 }
 if(['roof','garden','cafe'].includes(s.scene)&&s.met&&nearby){
   if(s.dateDay<s.day)node(41,29,'Invitar a merendar','Plan a picnic',()=>say([me('¿Mañana en el café?','Tomorrow at the café?'),them(moment?'¡Sí! Mejor por la tarde, cuando entra el sol.':'Por la mañana puedo. Te guardo una silla.',moment?'Yes! Afternoon is better, when the sun comes in.':'Morning works. I’ll save you a chair.')],()=>{s.dateDay=s.day+1;s.datePeriod=moment}),'♡')
   if(!s.visit&&s.met&&s.points>=25)node(47,47,'Una invitación a casa','An invitation home',()=>say([them('Ven a casa cuando quieras. Hay algo que me gustaría enseñarte.','Come over whenever you like. There’s something I’d like to show you.')],()=>s.visit=true),'⚿')
 }
 if(s.scene==='cafe'){
   if(!s.teaKnown)node(51,71,'Descubrir su bebida','Discover their drink',()=>say([them(`Siempre pido ${drink[0]}. Me recuerda a casa.`,`I always order ${drink[1]}. It reminds me of home.`)],()=>s.teaKnown=true),'☕')
   else node(51,71,`Pedir ${drink[0]} para dos`,`Order ${drink[1]} for two`,()=>say([them('Te acordaste. Ni siquiera tuve que mirar la carta.','You remembered. I didn’t even need the menu.')],()=>finish('drink','Dos tazas conocidas.','Two familiar cups.')),'☕')
   if(s.dateDay===s.day)node(62,35,'Nuestra merienda','Our picnic',()=>{s.period=s.datePeriod;say([them('Dejé libre la silla de la ventana, como prometí.','I kept the window seat free, as promised.')],()=>{s.dateDay=0;finish('picnic','La cita de la ventana.','Our window-seat date.')})},'♡')
 }
 if(s.scene==='roof'&&rain(s.day))exit(34,56,'glass','Refugiarse de la lluvia','Shelter from the rain')
 if(s.scene==='glass'){
   exit(18,79,'roof');node(65,56,'Escuchar el techo','Listen to the roof',()=>say([them('Aquí cada gota tiene una nota distinta. ¿Oyes la maceta de latón?','Every drop plays a different note. Hear the brass pot?'),me('La cometa puede esperar. Quiero oír el estribillo.','The kite can wait. I want to hear the chorus.')],()=>finish('rain','La canción del invernadero.','The greenhouse song.')),'☂')
 }
}
