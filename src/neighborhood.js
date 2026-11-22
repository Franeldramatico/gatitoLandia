import { casa, patio, chats } from './activities.js'

export const places={
  lobby:['Vestíbulo','Lobby',0], apartment:['Departamento','Apartment',0],
  garden:['Jardín común','Shared garden',1], cafe:['Café de la esquina','Corner café',2],
  roof:['Azotea','Rooftop',3]
}
const outing=(id,name,energy,pose,lines)=>({id,name,energy,hours:1,pose,lines,replies:[],solo:false})
const local={
  lobby:[outing('mail','Ordenar las cartas',-4,'sienta',['Esta carta dice «para el vecino que silba».','¡Entonces es para el ascensor! Siempre silba al llegar.']),outing('lift','Esperar el ascensor',3,'quieta',['¿Siempre tarda tanto?','Depende. Hoy no me importa que tarde.'])],
  cafe:[outing('tea','Compartir una merienda',8,'sienta',['Solo queda una medialuna.','Por suerte, una medialuna tiene dos puntitas.']),outing('order','Adivinar su bebida',-5,'feliz',['A ver si acierto: leche tibia con canela.','¿Se me nota por los bigotes?'])],
  roof:[outing('stars','Buscar constelaciones',-5,'sienta',['Esas tres estrellas parecen llaves.','Quizá el cielo también tenga departamentos.']),outing('kite','Volar una cometa',-12,'feliz',['¡Suelta un poquito más de hilo!','Desde aquí parece que el edificio tiene cola.'])],
  garden:patio,apartment:casa
}
// English copy follows the same activity IDs, speaker order and branching paths.
const en={
  mail:['Sort the mail','This letter says “for the neighbour who whistles.”','Then it’s for the lift! It always whistles when it gets here.'],
  lift:['Wait for the lift','Does it always take this long?','It depends. Today I don’t mind waiting.'],
  tea:['Share a snack','There’s only one croissant left.','Lucky for us, a croissant has two ends.'],
  order:['Guess their drink','Let me guess: warm milk with cinnamon.','Did my whiskers give it away?'],
  stars:['Find constellations','Those three stars look like keys.','Maybe the sky has apartments too.'],
  kite:['Fly a kite','Let out a little more string!','From here it looks like the building has a tail.'],
  clover:['Look for clovers','This one has three leaves. Shall we let it grow?','Yes. This big leaf can be its little roof.'],
  race:['Race to the tree','The finish line is that shadow. On three!','The shadow is moving! This race has legs.'],
  cloud:['Imagine cloud shapes','That cloud looks like… what do you see?'],
  seed:['Plant a seed','I’ll bury it here. Shall we give it a name?','Captain Pip. First explorer under the garden.'],
  leaf:['Collect leaves','This leaf looks like a little ear. I’ll keep it in my corner.'],
  nap:['Bask in the sun','I’ll close just one eye… The other will watch the butterflies.'],
  cookies:['Bake cookies','The recipe says a pinch. A pinch of what?','Patience. Keep your paw out of the oven!'],
  fort:['Build a blanket fort','Hold the blanket and I’ll add another cushion.','Done. There’s room for two and a tiny secret.'],
  paint:['Paint a portrait','Just the whiskers left. Can you hold still?','I can feel that paintbrush tickling me from here!'],
  story:['Make up a story','Once there was a door so small that only one thing could fit…'],
  read:['Read by the window','Someone left a floury paw print for a bookmark.'],
  sleep:['Take a nap','One pillow for my head and one for my ideas.'],
  hello:['Ask about their day','What was the best part of your day?'],
  joke:['Tell a joke','What does a famous cat sign?','A paw-trait?','A meow-tograph!'],
  secret:['Share a secret','Sometimes I practice saying hello in the window.','No wonder your reflection looks so happy to see you.'],
  date:['Plan a date','I reserved the best view in the neighbourhood.','The spot next to you?','That’s the one. And it’s yours.']
}
const answers={
  cloud:[['A fish in boots','A fish in boots!','Then raindrops must be its footsteps.'],['Our home','Our home, with wings.','If it lands, let’s leave it some milk.']],
  story:[['A sigh','A sigh on tiptoe.','On the other side it found a sleepy yawn.'],['An ant','An ant in a hat.','It had to take its hat off to fit!']],
  hello:[['Something small','The crunch of the first cookie.','Let’s split the next one.'],['Being here','This moment, I think.','Then let’s stay a little longer.']]
}
export function options(place,chat,level,english){
  const list=chat?chats.slice(0,level>=75?4:level>=25?3:2):local[place]
  return english?list.map(a=>({...a,name:en[a.id][0],lines:en[a.id].slice(1),replies:answers[a.id]||[]})):list
}
