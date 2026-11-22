const $=id=>document.getElementById(id);
// Árboles hechos de pinceladas, como el montículo del dibujo original.
let seed=17;
const rand=()=> (seed=seed*16807%2147483647)/2147483647;
function tree(x,y,k){
 let leaves='';
 for(let i=0;i<185;i++){
  const a=rand()*Math.PI*2,r=Math.sqrt(rand()),lx=Math.cos(a)*85*r,ly=Math.sin(a)*59*r;
  leaves+=`<ellipse cx="${lx}" cy="${ly}" rx="${9+rand()*11}" ry="${6+rand()*8}" fill="${['#779655','#89a762','#a8bd70','#b7c67c'][Math.floor(rand()*4)]}"/>`;
 }
 return `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-12 155 Q0 84 -8 36 L-38 4 L-31 1 L0 26 L27 -4 L33 0 L8 42 Q4 111 17 155Z" fill="#9b7756"/>${leaves}</g>`;
}
$('trees').innerHTML=tree(92,137,1.05)+tree(922,153,.87)+tree(3,100,1.4)+tree(1010,116,1.23);
// título, lugar, luz, poses, posiciones, objeto, narración y destinos
const pages={
 inicio:['Una puntada en el cielo','Prado del Dedal','día','mira','mira',39,61,'✧','A Franxito le cayó una estrella en la sopa. No quemaba. Tenía cuatro puntas y un ojal. Aranxita levantó la vista: del bolsillo de la luna colgaba un hilo suelto.\n—Se le ha caído un botón —dijo—. ¿Y dónde guardará los sueños esta noche?',[['Seguir el hilo plateado','hilo'],['Preguntarle al sauce','sauce']]],
 hilo:['Un hilo con hipo','Sendero de los grillos','día','susto','susto',31,66,'〰','El hilo daba un saltito a cada paso. ¡Hip! Era un grillo enredado, con tanto hipo que había perdido el compás. Franxito puso la oreja contra su barriga. Aranxita esperó al siguiente «hip» y soltó el nudo justo a tiempo.',[['Escuchar al grillo','grillo']]],
 grillo:['La canción más corta','Sendero de los grillos','ocaso','salta','salta',42,61,'♫','—No tengo bolsillos para pagaros —dijo el grillo—, pero os regalo un cri.\nEra una nota tan pequeña que cabía entre dos bigotes. Franxito la llevó allí, procurando no estornudar.',[['Subir hasta la luna','luna']]],
 sauce:['Un árbol del revés','Sauce de las cartas','día','duda','duda',29,48,'❧','Al sauce le crecían sobres en vez de hojas. Aranxita abrió el más pequeño. Dentro decía: «Querida luna, aquí abajo también nos da miedo la oscuridad». No tenía firma. Una raíz se encogió, tímida.',[['Contestarle a la raíz','carta']]],
 carta:['Correo de una sola hoja','Sauce de las cartas','ocaso','abrazo','amor',38,60,'❧','—A mí también —le confesó Aranxita a la raíz—. Por eso duermo con una patita fuera de la manta: así Franxito me encuentra.\nEl sauce dobló la carta en forma de barquito. «¿Se la lleváis?» Los dos asintieron.',[['Llevar la carta a la luna','luna']]],
 luna:['Lo que pesaba el bolsillo','Colina del Ojal','noche','paso','duda',38,63,'✧','La luna bajó el bolsillo hasta el pasto. Dentro había un solo sueño, hecho un ovillo. Aranxita acercó el botón al ojal. El sueño soltó un maullidito.\n—Creo que no quiere quedarse encerrado —susurró Franxito.',[['Dejar el bolsillo entreabierto','ventana'],['Hacerle una cama en el prado','cama']]],
 ventana:['Una ventana a medida','Balcón de la luna','noche','abrazo','amor',42,58,'✧','Cosieron el botón un poquito torcido, para que quedara una rendija. El sueño asomó la nariz. ¡Olía a sopa! Y así, desde aquella noche, quien mira la luna de lado puede ver un bigote salir de su bolsillo.',[]],
 cama:['Una cama para tres','Prado del Dedal','noche','duerme','duerme',41,56,'☾','Extendieron un pañuelo en el pasto. El sueño se acurrucó entre sus dos panzas y la luna les abrochó una esquina con el botón de estrella. Nunca se había visto una manta tan bien sujeta ni tres siestas tan redondas.',[]]
};
let trail=['inicio'];
function show(focus=false){
 const key=trail.at(-1),[title,place,time,f,a,x,y,prop,story,choices]=pages[key],end=!choices.length;
 $('scene').dataset.time=time;$('place').textContent='⌖  '+place;$('scene').setAttribute('aria-label',`${place}, de ${time}. Franxito y Aranxita ilustran la escena.`);
 for(const [id,cat,pose,pos] of [['fran','franxito',f,x],['aran','aranxita',a,y]]){
   $(id).src=`ilustraciones/${cat}-${pose}.png`;$(id).style.left=pos+'%';
 }
 $('prop').textContent=prop;$('chapter').textContent=end?'FIN DEL CUENTO':'CAPÍTULO '+['I','II','II','III'][trail.length-1];
 $('title').textContent=title;
 const keepsake=trail.includes('grillo')?(key==='ventana'?' Desde la rendija se oye todavía aquel cri diminuto.':' El cri de los bigotes de Franxito les cantó hasta que se durmieron.'):(key==='ventana'?' Por la rendija entró también la carta del sauce. La luna le contestó con un charquito de luz junto a su raíz.':' La luna leyó la carta del sauce y estiró su luz hasta la raíz, como una patita fuera de la manta.');
 $('text').textContent=story+(end?keepsake:'');$('actions').replaceChildren();
 for(const [label,next] of end?[['Volver a leer','inicio']]:choices){
  const b=document.createElement('button');b.textContent=label+'  →';b.onclick=()=>{trail=next==='inicio'?['inicio']:[...trail,next];show(true)};$('actions').append(b);
 }
 $('back').disabled=trail.length===1;$('page').textContent='Pág. '+String(trail.length).padStart(2,'0');if(focus)$('title').focus({preventScroll:true});
}
$('back').onclick=()=>{if(trail.length>1)trail.pop();show(true)};show();
